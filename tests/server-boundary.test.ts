import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));

function walk(dir: string): string[] {
  const absolute = join(root, dir);
  const out: string[] = [];
  for (const entry of readdirSync(absolute)) {
    const full = join(absolute, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(relative(root, full)));
    } else if (/\.tsx?$/.test(entry)) {
      out.push(relative(root, full).replace(/\\/g, '/'));
    }
  }
  return out;
}

const serverFiles = walk('src/server');
const appFiles = walk('src/app');
const read = (path: string) => readFileSync(join(root, path), 'utf8');

/**
 * Server/client boundary.
 *
 * Phase 2 requirement §8: verify that server-only data access cannot
 * accidentally become client code.
 *
 * The real enforcement is the `server-only` package — importing it into a
 * client component fails the build. These tests guard the invariant that makes
 * that enforcement work: every module in src/server must actually carry the
 * import, and no client component may reach into it.
 */

describe('src/server modules are server-only', () => {
  it('contains modules to check', () => {
    expect(serverFiles.length).toBeGreaterThan(0);
  });

  it.each(serverFiles)('%s imports server-only', (file) => {
    expect(read(file)).toMatch(/^import 'server-only';/m);
  });

  it.each(serverFiles)('%s is not a client component', (file) => {
    expect(read(file)).not.toMatch(/^\s*['"]use client['"]/m);
  });
});

describe('the database client has exactly one entry point', () => {
  it('is the only module constructing a PrismaClient', () => {
    const constructing = serverFiles.filter((file) => read(file).includes('new PrismaClient('));
    expect(constructing).toEqual(['src/server/db.ts']);
  });

  it('is never instantiated inside the app tree', () => {
    for (const file of appFiles) {
      expect(read(file)).not.toContain('new PrismaClient(');
    }
  });

  it('is never imported directly by a route or page', () => {
    // Pages go through src/server/queries/*, which is the reviewable surface.
    for (const file of appFiles) {
      expect(read(file)).not.toMatch(/from '@prisma\/client'/);
      expect(read(file)).not.toMatch(/from '@\/server\/db'/);
    }
  });
});

describe('no client component reaches the data layer', () => {
  const clientComponents = [...appFiles, ...walk('src/lib')].filter((file) =>
    /^\s*['"]use client['"]/m.test(read(file)),
  );

  it('client components never import from @/server', () => {
    for (const file of clientComponents) {
      expect(read(file)).not.toMatch(/from '@\/server/);
    }
  });

  it('src/lib stays free of database imports', () => {
    // src/lib is shared by both runtimes, so it must never pull in Prisma.
    for (const file of walk('src/lib')) {
      expect(read(file)).not.toMatch(/@prisma\/client/);
      expect(read(file)).not.toMatch(/from '@\/server/);
    }
  });
});

describe('secrets never reach the client bundle', () => {
  const clientVisible = /process\.env\.NEXT_PUBLIC_[A-Z_]+/g;

  it('exposes no privileged variable through a NEXT_PUBLIC_ name', () => {
    const forbidden = /NEXT_PUBLIC_[A-Z_]*(SERVICE_ROLE|SECRET|PASSWORD|DATABASE|DIRECT_URL)/;
    for (const file of [...appFiles, ...serverFiles, ...walk('src/lib')]) {
      expect(read(file)).not.toMatch(forbidden);
    }
  });

  it('reads privileged variables only inside src/server', () => {
    const privileged = /process\.env\.(DATABASE_URL|DIRECT_URL|SUPABASE_SERVICE_ROLE_KEY|COMPLAINT_TOKEN_SECRET)/;
    for (const file of [...appFiles, ...walk('src/lib')]) {
      expect(read(file)).not.toMatch(privileged);
    }
  });

  it('only ever reads NEXT_PUBLIC_ variables outside the server directory', () => {
    for (const file of [...appFiles, ...walk('src/lib')]) {
      const content = read(file);
      const envReads = content.match(/process\.env\.[A-Z_]+/g) ?? [];
      const publicReads = content.match(clientVisible) ?? [];
      const nodeEnv = envReads.filter((r) => r === 'process.env.NODE_ENV');
      expect(envReads.length).toBe(publicReads.length + nodeEnv.length);
    }
  });
});
