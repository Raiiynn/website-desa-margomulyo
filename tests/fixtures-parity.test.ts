import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import * as fixtures from '../src/data/fixtures';
import * as access from '../prisma/seed-data/access';
import * as content from '../prisma/seed-data/content';
import * as potential from '../prisma/seed-data/potential';
import * as transparency from '../prisma/seed-data/transparency';
import * as village from '../prisma/seed-data/village';

/**
 * Fixture parity guard.
 *
 * `src/data/fixtures.ts` is an INTERIM build-time content source: the database
 * has never been reachable, so pages read the same constants the seed writes.
 * That is only safe while the two cannot drift.
 *
 * These tests fail the moment a fixture stops matching its seed-data origin —
 * which would mean the public site is showing something the database would
 * not, i.e. content outside the docs/SOURCE_DATA.md publication gate.
 *
 * When the data layer is wired up and fixtures.ts is deleted, delete this file.
 */

const seed = { ...access, ...content, ...potential, ...transparency, ...village } as Record<
  string,
  unknown
>;

const RE_EXPORTED = [
  'AGENDA', 'BUDGET', 'BUDGET_CYCLE_STAGES', 'BUDGET_EXPENDITURE_ALLOCATION_LINES',
  'BUDGET_EXPENDITURE_BIDANG_LINES', 'BUDGET_FINANCING_LINES', 'BUDGET_REALIZATION',
  'BUDGET_REVENUE_LINES', 'DEMOGRAPHICS', 'DEVELOPMENT_PROJECTS', 'DOCUMENTS',
  'EDUCATION_LEVELS', 'GOVERNANCE_PILLARS', 'INSTITUTIONS', 'LEADERSHIP_TERMS',
  'LOCAL_POTENTIAL_CATEGORIES', 'LOCAL_POTENTIALS', 'MISSIONS', 'NEWS',
  'NEWS_CATEGORIES', 'OCCUPATIONS', 'OFFICIALS', 'PADUKUHAN', 'PERMISSIONS',
  'RELIGIONS', 'ROLES', 'SERVICE_CATEGORIES', 'SERVICE_CHANNELS',
  'SERVICE_PROCEDURE_STEPS', 'SERVICES', 'SITE_SETTINGS',
  'STATISTICS_REFERENCE_DATE', 'STATISTICS_SOURCE_LABEL', 'UMKM',
] as const;

describe('fixtures re-export seed data unchanged', () => {
  it.each(RE_EXPORTED)('%s is identical to its seed-data origin', (name) => {
    const fromFixtures = (fixtures as unknown as Record<string, unknown>)[name];
    expect(fromFixtures, `${name} missing from seed-data`).toBeDefined();
    expect(fromFixtures).toEqual(seed[name]);
  });

  it('introduces no data of its own', () => {
    // Anything exported beyond the re-exports must be a helper, never content.
    const allowedExtras = new Set([
      'TYPED_PADUKUHAN', 'TYPED_LEADERSHIP_TERMS', 'getSetting',
      'formatRupiah', 'formatCompactRupiah', 'formatNumber', 'formatDateIndonesian',
    ]);
    const extras = Object.keys(fixtures).filter(
      (key) => !RE_EXPORTED.includes(key as (typeof RE_EXPORTED)[number]),
    );
    for (const key of extras) {
      expect(allowedExtras.has(key), `unexpected export "${key}" in fixtures`).toBe(true);
    }
  });

  it('the typed aliases wrap the same rows', () => {
    expect(fixtures.TYPED_PADUKUHAN).toEqual(village.PADUKUHAN);
    expect(fixtures.TYPED_LEADERSHIP_TERMS).toEqual(village.LEADERSHIP_TERMS);
  });
});

describe('fixtures declare their interim status', () => {
  const source = readFileSync(new URL('../src/data/fixtures.ts', import.meta.url), 'utf8');

  it('is marked as interim so it is not mistaken for the final architecture', () => {
    expect(source).toContain('INTERIM BUILD-TIME CONTENT SOURCE');
  });

  it('points at the server data layer that replaces it', () => {
    expect(source).toContain('@/server/queries');
  });
});

describe('published content only reaches the public site', () => {
  it('the two truncated-headline articles remain unpublished', () => {
    // SOURCE_DATA V11 — a truncated headline is not the article's title.
    const drafts = fixtures.NEWS.filter((n) => n.status === 'DRAFT');
    expect(drafts).toHaveLength(2);
  });

  it('getSetting returns verified values and never invents one', () => {
    expect(fixtures.getSetting('village.sambutanQuote')).toContain(
      'Selamat datang di website resmi Kalurahan Margomulyo',
    );
    // An unknown key must yield the caller's default, not a fabricated string.
    expect(fixtures.getSetting('village.doesNotExist')).toBe('');
    expect(fixtures.getSetting('village.doesNotExist', 'fallback')).toBe('fallback');
  });
});
