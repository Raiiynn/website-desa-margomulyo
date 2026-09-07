import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));
const migrationsDir = join(root, 'prisma', 'migrations');

const RLS_MIGRATION = '20260907120000_rls_security';
const rlsSql = readFileSync(join(migrationsDir, RLS_MIGRATION, 'migration.sql'), 'utf8');
const schema = readFileSync(join(root, 'prisma', 'schema.prisma'), 'utf8');

/**
 * RLS declaration guard.
 *
 * These are static assertions over the migration, so they run in CI without a
 * database or network. They prove the protections are still *declared*;
 * `npm run db:verify:rls` proves the live database still *enforces* them.
 *
 * The exposure this guards against was real and verified: before this
 * migration the anon key could read the entire RBAC model, both unpublished
 * news articles and internal governance notes, and could issue writes.
 */

/**
 * Tables with no client-side consumer. Personal data, the authorization model,
 * the audit trail, storage paths, and migration metadata.
 */
const SENSITIVE_TABLES = [
  'users',
  'roles',
  'permissions',
  'role_permissions',
  'audit_logs',
  'complaints',
  'complaint_attachments',
  'complaint_status_history',
  'complaint_categories',
  'media',
  'development_project_updates',
  '_prisma_migrations',
];

/** Content whose visibility is gated on a publication state column. */
const PUBLICATION_GATED = [
  'news',
  'agenda',
  'pages',
  'services',
  'documents',
  'local_potentials',
  'umkm',
  'budgets',
];

describe('the RLS migration exists and is separate from the initial migration', () => {
  it('is a new migration, leaving the applied init migration untouched', () => {
    const dirs = readdirSync(migrationsDir).filter((d) => !d.startsWith('.'));
    expect(dirs).toContain('20260904160000_init');
    expect(dirs).toContain(RLS_MIGRATION);
  });

  it('never resets or drops the database', () => {
    // Matched as statements, not as words: this migration legitimately
    // mentions TRUNCATE while *revoking* that privilege, and DROP POLICY is
    // how the policy definitions stay idempotent.
    const destructive = rlsSql.match(/^\s*(DROP\s+(DATABASE|SCHEMA|TABLE)|TRUNCATE)\b/gim) ?? [];
    expect(destructive).toEqual([]);
  });
});

describe('the Data API write path is closed', () => {
  it('revokes every write privilege from anon and authenticated', () => {
    expect(rlsSql).toMatch(
      /REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER\s+ON ALL TABLES IN SCHEMA public FROM anon, authenticated;/,
    );
  });

  it('grants no write policy to anon anywhere', () => {
    // Every policy in this migration is FOR SELECT. An INSERT/UPDATE/DELETE
    // policy would mean a client-side write path was introduced.
    for (const kind of ['FOR INSERT', 'FOR UPDATE', 'FOR DELETE', 'FOR ALL']) {
      expect(rlsSql, `migration declares a ${kind} policy`).not.toContain(kind);
    }
  });

  it('closes future tables by default', () => {
    // Supabase default privileges are what exposed these tables originally.
    expect(rlsSql).toMatch(
      /ALTER DEFAULT PRIVILEGES IN SCHEMA public\s+REVOKE ALL ON TABLES FROM anon, authenticated;/,
    );
  });
});

describe('sensitive tables are unreachable through the Data API', () => {
  it.each(SENSITIVE_TABLES)('revokes all access to %s', (table) => {
    const revokeBlock = rlsSql.slice(
      rlsSql.indexOf('REVOKE ALL ON TABLE'),
      rlsSql.indexOf('FROM anon, authenticated;', rlsSql.indexOf('REVOKE ALL ON TABLE')),
    );
    expect(revokeBlock).toContain(`public.${table}`);
  });

  it.each(SENSITIVE_TABLES)('declares no read policy for %s', (table) => {
    // A policy would be meaningless without a grant, but its presence would
    // signal an intent to expose the table and invite someone to add one.
    const policyFor = new RegExp(`CREATE POLICY[^;]*ON public\\.${table}\\b`, 'i');
    expect(rlsSql, `${table} has a policy`).not.toMatch(policyFor);
  });
});

describe('RLS is enabled everywhere', () => {
  it('enables row level security across the whole schema', () => {
    expect(rlsSql).toContain('ENABLE ROW LEVEL SECURITY');
    expect(rlsSql).toMatch(/FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'/);
  });

  it('does not FORCE row level security', () => {
    // Prisma connects as the table owner. FORCE would subject the owner to
    // policies; the owner path is the authorized one and must stay clear.
    expect(rlsSql).not.toContain('FORCE ROW LEVEL SECURITY');
  });
});

describe('the publication gate is enforced at the database layer', () => {
  it.each(PUBLICATION_GATED)('%s is readable only when PUBLISHED', (table) => {
    const policy = rlsSql.match(
      new RegExp(`CREATE POLICY[^;]*ON public\\.${table}\\s+FOR SELECT[^;]*?;`, 's'),
    );
    expect(policy, `${table} has no SELECT policy`).not.toBeNull();
    expect(policy![0]).toContain(`'PUBLISHED'::"ContentStatus"`);
  });

  it('requires news to carry a publication timestamp as well as the status', () => {
    const policy = rlsSql.match(/CREATE POLICY "public reads published news"[^;]*;/s);
    expect(policy![0]).toContain('"publishedAt" IS NOT NULL');
  });

  it('gates child rows on the parent publication state', () => {
    // Otherwise an unpublished budget still exposes its line items.
    for (const [child, parent] of [
      ['budget_lines', 'budgets'],
      ['budget_realizations', 'budgets'],
      ['budget_cycle_stages', 'budgets'],
      ['umkm_products', 'umkm'],
    ]) {
      const policy = rlsSql.match(
        new RegExp(`CREATE POLICY[^;]*ON public\\.${child}\\s+FOR SELECT[^;]*?;`, 's'),
      );
      expect(policy, `${child} has no SELECT policy`).not.toBeNull();
      expect(policy![0]).toContain(`FROM public.${parent}`);
      expect(policy![0]).toContain(`'PUBLISHED'::"ContentStatus"`);
    }
  });

  it('gates row-flagged tables on their flag', () => {
    for (const [table, column] of [
      ['site_settings', '"isPublic" = true'],
      ['demographic_snapshots', '"isPublished" = true'],
      ['government_officials', '"isActive" = true'],
    ]) {
      const policy = rlsSql.match(
        new RegExp(`CREATE POLICY[^;]*ON public\\.${table}\\s+FOR SELECT[^;]*?;`, 's'),
      );
      expect(policy, `${table} has no SELECT policy`).not.toBeNull();
      expect(policy![0]).toContain(column);
    }
  });
});

describe('internal columns are withheld at the column level', () => {
  it('narrows government_officials to its public columns', () => {
    // RLS filters rows, not columns, so internalNote needs a column grant.
    expect(rlsSql).toContain('REVOKE SELECT ON TABLE public.government_officials');
    const grant = rlsSql.match(/GRANT SELECT \(([^)]*)\) ON TABLE public\.government_officials/s);
    expect(grant, 'no column-level grant found').not.toBeNull();
    expect(grant![1]).not.toContain('internalNote');
    expect(grant![1]).toContain('positionTitle');
  });

  it('keeps internalNote in the schema so the server can still read it', () => {
    expect(schema).toMatch(/internalNote\s+String\?/);
  });
});

describe('the server data path is unaffected', () => {
  it('keeps the server-only boundary intact', () => {
    const db = readFileSync(join(root, 'src', 'server', 'db.ts'), 'utf8');
    expect(db).toContain("import 'server-only'");
  });

  it('uses no Supabase client library, so the Data API is not an app path', () => {
    // The app reaches Postgres only through Prisma. If a Supabase client is
    // ever added, the policies above become load-bearing for the app itself
    // and this test should be revisited deliberately.
    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    expect(Object.keys(deps).filter((d) => d.startsWith('@supabase/'))).toEqual([]);
  });
});
