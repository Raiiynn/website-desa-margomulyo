import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));
const at = (path: string) => new URL(path, new URL('..', import.meta.url));
const read = (path: string) => readFileSync(at(path), 'utf8');

describe('route-group structure', () => {
  // MASTER_PROMPT.md §4 requires public and administrative surfaces to stay
  // clearly separated while sharing one domain model. Route groups are how
  // that separation is expressed; collapsing them is a regression.
  it.each([
    'src/app/layout.tsx',
    'src/app/(public)/layout.tsx',
    'src/app/(public)/page.tsx',
    'src/app/(admin)/layout.tsx',
    'src/app/(admin)/admin/page.tsx',
    'src/app/api/health/route.ts',
  ])('has %s', (path) => {
    expect(existsSync(at(path))).toBe(true);
  });

  it('keeps the admin group out of the public group', () => {
    expect(existsSync(at('src/app/(public)/admin'))).toBe(false);
  });

  it('declares the document language as Indonesian', () => {
    // WCAG 2.2 AA: the content is Indonesian (DESIGN_REFERENCE §5.3, A09).
    expect(read('src/app/layout.tsx')).toMatch(/lang=\{SITE\.lang\}/);
  });

  it('excludes the admin surface from search indexing', () => {
    expect(read('src/app/(admin)/layout.tsx')).toMatch(/index:\s*false/);
  });
});

describe('Phase 0 governance documents', () => {
  // These are the content and design gates. Deleting or emptying one would
  // silently remove the guardrail that keeps fabricated government data out
  // of the platform, so their presence is asserted, not assumed.
  it.each([
    'docs/SOURCE_DATA.md',
    'docs/DESIGN_REFERENCE.md',
    'docs/ARCHITECTURE.md',
    'docs/adr/0001-stack.md',
    'docs/adr/0002-database-auth-storage.md',
    'docs/source/CHECKSUMS.txt',
  ])('has %s', (path) => {
    expect(existsSync(at(path))).toBe(true);
  });

  it('keeps the source checksum aligned across the register and the script', () => {
    const checksum = read('docs/source/CHECKSUMS.txt').trim().split(/\s+/)[0];
    expect(checksum).toMatch(/^[0-9a-f]{64}$/);
    expect(read('docs/SOURCE_DATA.md')).toContain(checksum);
    expect(read('scripts/render-source.py')).toContain(checksum);
  });

  it('still records every conflict and verification item', () => {
    const register = read('docs/SOURCE_DATA.md');
    const conflicts = new Set(register.match(/\*\*C\d{2}\*\*/g) ?? []);
    const verifications = new Set(register.match(/\*\*V\d{2}\*\*/g) ?? []);
    expect(conflicts.size).toBe(13);
    expect(verifications.size).toBe(19);
  });
});

describe('secret hygiene', () => {
  it('ships an env template containing only placeholders', () => {
    const template = read('.env.example');
    // A real Supabase key is a JWT or an sb_ token; a real connection string
    // carries credentials. None of those may ever land in the template.
    expect(template).not.toMatch(/eyJ[A-Za-z0-9_-]{20,}/);
    expect(template).not.toMatch(/sb_(secret|publishable)_/);
    expect(template).toMatch(/SUPABASE_SERVICE_ROLE_KEY="YOUR-/);
  });

  it('never exposes the service-role key to the browser', () => {
    // NEXT_PUBLIC_ is inlined into the client bundle. The service-role key
    // bypasses RLS entirely (ADR-0002), so the prefix must never appear.
    expect(read('.env.example')).not.toMatch(/NEXT_PUBLIC_SUPABASE_SERVICE/);
  });

  it('ignores the real env file and the large source artifacts', () => {
    const ignored = read('.gitignore');
    for (const pattern of ['.env', 'docs/source/*.pdf', 'docs/source/renders/']) {
      expect(ignored).toContain(pattern);
    }
  });

  it('has no .env committed to the working tree', () => {
    expect(existsSync(new URL('.env', `file://${root.replace(/\\/g, '/')}`))).toBe(
      false,
    );
  });
});
