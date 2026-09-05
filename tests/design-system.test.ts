import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(join(root, dir))) {
    const full = join(root, dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(relative(root, full)));
    } else if (entry.endsWith('.tsx')) {
      out.push(relative(root, full).split(sep).join('/'));
    }
  }
  return out;
}

const read = (f: string) => readFileSync(join(root, f), 'utf8');
const files = [...walk('src/app'), ...walk('src/components')];
const all = files.map((file) => ({ file, source: read(file) }));

/**
 * Design-system discipline.
 *
 * docs/DESIGN_REFERENCE.md §8 lists the visual patterns the reference is
 * defined against, and §2 defines the token scale. Both were bypassed once
 * already — 898 hex literals against 2 token usages, plus gradients and
 * glassmorphism — so these are regression guards, not style preferences.
 */

describe('rejected visual patterns stay out', () => {
  it.each(['bg-gradient-', 'backdrop-blur', 'rounded-2xl', 'rounded-3xl'])(
    'no %s anywhere in the UI',
    (pattern) => {
      const offenders = all.filter((f) => f.source.includes(pattern)).map((f) => f.file);
      expect(offenders).toEqual([]);
    },
  );
});

describe('colour flows through the token scale', () => {
  const RAW_TEXT_COLOUR = /text-\[#[0-9a-fA-F]{6}\]/;
  const FAILING_COLOUR = /text-\[#(9e7b36|8991a1|94a3b8)\]/i;

  it('no raw hex is used for text colour', () => {
    // A hex literal silently opts out of the AA-corrected tokens, which is
    // exactly how the contrast failures returned last time.
    const offenders = all.filter((f) => RAW_TEXT_COLOUR.test(f.source)).map((f) => f.file);
    expect(offenders).toEqual([]);
  });

  it('the inaccessible reference values are never hardcoded', () => {
    // #9E7B36 fails AA as small text on every ground it is used on;
    // #8991A1 is 3.17:1 and #94A3B8 is 2.56:1 on white.
    for (const { file, source } of all) {
      expect(FAILING_COLOUR.test(source), `${file} hardcodes a failing colour`).toBe(false);
    }
  });

  it('uses radius tokens rather than arbitrary pixel values', () => {
    const offenders = all.filter((f) => /rounded-\[\d+px\]/.test(f.source)).map((f) => f.file);
    expect(offenders).toEqual([]);
  });
});

describe('homepage follows the reference composition', () => {
  const home = read('src/app/(public)/page.tsx');

  it('keeps the reference section order', () => {
    // Reference page 1: hero, stat strip, sambutan, mengenal kalurahan,
    // berita, layanan, potensi, transparansi, CTA.
    const order = [...home.matchAll(/\{\/\* \d\. ([A-Z][^*]+?)\s*\*\/\}/g)].map((m) =>
      (m[1] ?? '').split('(')[0]?.trim(),
    );
    expect(order).toEqual([
      'HERO SECTION',
      'OVERLAPPING STAT STRIP',
      'SAMBUTAN LURAH',
      'MENGENAL KALURAHAN — WILAYAH',
      'BERITA & INFORMASI TERKINI',
      'LAYANAN PUBLIK',
      'POTENSI UNGGULAN MARGOMULYO',
      'TRANSPARANSI — TIGA PINTU',
      'AJAKAN ADUAN & ASPIRASI',
    ]);
  });

  it('alternates white and pale-blue section bands (P02)', () => {
    const bands = [
      ...home.matchAll(/<section className="[^"]*?(bg-navy-900|bg-band-alt|bg-band|bg-white)/g),
    ].map((m) => m[1]);
    expect(bands.length).toBeGreaterThan(4);
    for (let i = 1; i < bands.length; i += 1) {
      expect(bands[i], `two ${bands[i]} sections in a row`).not.toBe(bands[i - 1]);
    }
  });

  it('lets the stat strip overlap only from md upward (P03)', () => {
    // A negative margin at 320px crowds the hero copy and risks clipping.
    expect(home).toContain('md:-mt-12');
    expect(home).not.toMatch(/"[^"]*\s-mt-12/);
  });

  it('does not duplicate detail that lives on its own page', () => {
    // The full APBKal breakdown belongs on /transparansi/apbkal and the
    // five-gate cycle on /transparansi, exactly as the reference splits them.
    expect(home).not.toContain('BUDGET_REVENUE_LINES');
    expect(home).not.toContain('BUDGET_CYCLE_STAGES');
  });

  it('withholds the fourth territory card (conflict C05)', () => {
    // The reference renders "86 RT — Rukun Tetangga" here; the source
    // contradicts itself on the figure. Comments explaining the withholding
    // are stripped first — only rendered markup is checked.
    const markup = home
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, '') // JSX comments
      .replace(/^\s*\/\/.*$/gm, ''); // line comments
    expect(markup).not.toContain('86 RT');
    expect(markup).not.toContain('Rukun Tetangga');
  });
});

describe('the accountability timeline is a timeline (P10)', () => {
  const page = read('src/app/(public)/transparansi/page.tsx');

  it('uses an ordered list, because the gates are a sequence', () => {
    expect(page).toMatch(/<ol[^>]*>/);
  });

  it('draws a rail on both axes so it reads as connected', () => {
    expect(page).toContain('hidden lg:block absolute');
    expect(page).toContain('lg:hidden absolute');
  });

  it('rotates to vertical rather than shrinking five columns', () => {
    expect(page).toContain('lg:grid lg:grid-cols-5');
  });
});

describe('responsive safety', () => {
  it('pins no element to a fixed pixel width', () => {
    for (const { file, source } of all) {
      const fixed = source.match(/(?<!max-)\bw-\[\d{3,}px\]/g) ?? [];
      expect(fixed, `${file} uses a fixed width`).toEqual([]);
    }
  });

  it('every multi-column grid declares a responsive step', () => {
    for (const { file, source } of all) {
      for (const cls of source.match(/className="[^"]*"/g) ?? []) {
        const multiColumn = /\bgrid-cols-[2-9]\b/.test(cls);
        const responsive = /(sm|md|lg|xl):grid-cols/.test(cls);
        expect(
          multiColumn && !responsive,
          `${file} has a non-responsive grid: ${cls.slice(0, 80)}`,
        ).toBe(false);
      }
    }
  });

  it('keeps nowrap content inside a scrollable container', () => {
    for (const { file, source } of all) {
      if (!source.includes('whitespace-nowrap')) continue;
      expect(source, `${file} may clip long labels`).toContain('overflow-x-auto');
    }
  });
});
