import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const at = (path: string) => new URL(path, new URL('..', import.meta.url));
const read = (path: string) => readFileSync(at(path), 'utf8');

const schema = read('prisma/schema.prisma');

const migrationDir = 'prisma/migrations';
const migrations = readdirSync(at(migrationDir))
  .filter((entry) => !entry.startsWith('.') && entry !== 'migration_lock.toml')
  .sort();
const migrationSql = migrations
  .map((dir) => read(`${migrationDir}/${dir}/migration.sql`))
  .join('\n');

/**
 * Schema and migration invariants.
 *
 * These run without a database connection, so they hold in CI and on a clean
 * checkout. Behaviour that genuinely needs Postgres — applying the migration,
 * running the seed, exercising constraints — is covered separately once a
 * reachable database is configured.
 */

describe('migrations', () => {
  it('has at least one migration', () => {
    expect(migrations.length).toBeGreaterThan(0);
  });

  it('creates every model declared in the schema', () => {
    const models = [...schema.matchAll(/^model\s+(\w+)/gm)].map((m) => m[1]);
    expect(models.length).toBeGreaterThan(30);

    const mapped = [...schema.matchAll(/@@map\("([^"]+)"\)/g)].map((m) => m[1]);
    for (const table of mapped) {
      expect(migrationSql).toContain(`CREATE TABLE "${table}"`);
    }
  });

  it('creates every enum declared in the schema', () => {
    const enums = [...schema.matchAll(/^enum\s+(\w+)/gm)].map((m) => m[1]);
    for (const name of enums) {
      expect(migrationSql).toContain(`CREATE TYPE "${name}"`);
    }
  });

  it('declares foreign keys rather than relying on application code', () => {
    const count = (migrationSql.match(/FOREIGN KEY/g) ?? []).length;
    expect(count).toBeGreaterThanOrEqual(30);
  });
});

describe('integrity constraints live in the database', () => {
  it('enforces the publishing workflow', () => {
    expect(migrationSql).toContain('news_published_requires_timestamp');
    expect(migrationSql).toContain('pages_published_requires_timestamp');
  });

  it('enforces the budget arithmetic identity', () => {
    expect(migrationSql).toContain('budget_net_financing_identity');
    expect(migrationSql).toMatch(
      /"netFinancing"\s*=\s*"financingReceipts"\s*-\s*"financingOutlays"/,
    );
  });

  it('requires every budget line to carry a figure or the source label', () => {
    expect(migrationSql).toContain('budget_line_has_a_figure');
  });

  it('bounds percentages and progress', () => {
    expect(migrationSql).toContain('budget_line_percentage_in_range');
    expect(migrationSql).toContain('project_progress_in_range');
    expect(migrationSql).toContain('project_completed_is_full');
  });

  it('keeps complaint timestamps consistent with status', () => {
    expect(migrationSql).toContain('complaint_resolved_at_requires_status');
    expect(migrationSql).toContain('complaint_closed_at_requires_status');
    expect(migrationSql).toContain('complaint_history_is_a_transition');
  });
});

describe('complaint privacy is structural', () => {
  const complaintModel = schema.slice(
    schema.indexOf('model Complaint {'),
    schema.indexOf('model ComplaintAttachment {'),
  );

  it('offers no public/publish switch that could be flipped by accident', () => {
    expect(complaintModel).not.toMatch(/\bisPublic\b/);
    expect(complaintModel).not.toMatch(/\bisPublished\b/);
    expect(complaintModel).not.toMatch(/\bpublishedAt\b/);
  });

  it('stores only a hash of the citizen tracking token', () => {
    expect(complaintModel).toMatch(/trackingTokenHash\s+String\s+@unique/);
    expect(complaintModel).not.toMatch(/trackingToken\s+String/);
  });

  it('caps the message length in the column, matching the source form', () => {
    expect(complaintModel).toMatch(/@db\.VarChar\(1000\)/);
  });

  it('keeps attachments in their own table, away from public media', () => {
    // A private attachment must not be reachable through the media library.
    expect(schema).toContain('model ComplaintAttachment');
    const mediaModel = schema.slice(
      schema.indexOf('model Media {'),
      schema.indexOf('model ServiceCategory {'),
    );
    expect(mediaModel).not.toMatch(/complaint/i);
  });

  it('cascades attachments and history with their complaint', () => {
    expect(schema).toMatch(
      /complaint\s+Complaint\s+@relation\(fields: \[complaintId\], references: \[id\], onDelete: Cascade\)/,
    );
  });
});

describe('audit trail survives user deletion', () => {
  it('nulls the actor instead of cascading the log away', () => {
    const auditModel = schema.slice(
      schema.indexOf('model AuditLog {'),
      schema.indexOf('enum ContentStatus'),
    );
    expect(auditModel).toMatch(/onDelete: SetNull/);
    expect(auditModel).not.toMatch(/onDelete: Cascade/);
  });

  it('snapshots the actor so the entry stays meaningful', () => {
    expect(schema).toMatch(/actorEmail\s+String\?/);
    expect(schema).toMatch(/actorName\s+String\?/);
  });
});

describe('money is never stored as a float', () => {
  it('uses Decimal(18,2) for every currency column', () => {
    const moneyFields = [
      'totalRevenue',
      'totalExpenditure',
      'financingReceipts',
      'financingOutlays',
      'netFinancing',
      'budgetAmount',
      'costRupiah',
      'cashAmount',
      'priceRupiah',
    ];
    for (const field of moneyFields) {
      const pattern = new RegExp(`${field}\\s+Decimal\\??[^\\n]*@db\\.Decimal\\(18, 2\\)`);
      expect(schema).toMatch(pattern);
    }
  });

  it('uses no Float or Int for currency', () => {
    expect(schema).not.toMatch(/\b(totalRevenue|budgetAmount|costRupiah)\s+(Float|Int)\b/);
  });
});

describe('withheld data is expressible but unset', () => {
  it('keeps per-padukuhan RW/RT columns nullable rather than zeroed', () => {
    expect(schema).toMatch(/rwCount\s+Int\?/);
    expect(schema).toMatch(/rtCount\s+Int\?/);
  });

  it('allows an official to exist without a known name', () => {
    const officialModel = schema.slice(
      schema.indexOf('model GovernmentOfficial {'),
      schema.indexOf('model LeadershipTerm {'),
    );
    expect(officialModel).toMatch(/name\s+String\?/);
  });

  it('allows a document to exist without a file or a size', () => {
    const documentModel = schema.slice(
      schema.indexOf('model Document {'),
      schema.indexOf('model LocalPotentialCategory {'),
    );
    expect(documentModel).toMatch(/sizeBytes\s+Int\?/);
    expect(documentModel).toMatch(/mediaId\s+String\?/);
  });
});

describe('prisma configuration', () => {
  it('reads connection details from the environment, never hardcoded', () => {
    expect(schema).toContain('env("DATABASE_URL")');
    expect(schema).toContain('env("DIRECT_URL")');
    expect(schema).not.toMatch(/postgres(ql)?:\/\/[^\n"]*:[^\n"@]*@/);
    expect(schema).not.toMatch(/supabase\.(co|com)/);
  });

  it('registers a seed command', () => {
    const pkg = JSON.parse(read('package.json')) as {
      prisma?: { seed?: string };
      scripts: Record<string, string>;
    };
    expect(pkg.prisma?.seed).toBe('tsx prisma/seed.ts');
    expect(pkg.scripts.build).toContain('prisma generate');
  });

  it('does not commit a generated client into source control', () => {
    expect(existsSync(at('src/generated'))).toBe(false);
  });
});
