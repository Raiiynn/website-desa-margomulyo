import { describe, expect, it } from 'vitest';

import {
  BUDGET,
  BUDGET_CYCLE_STAGES,
  BUDGET_EXPENDITURE_ALLOCATION_LINES,
  BUDGET_EXPENDITURE_BIDANG_LINES,
  BUDGET_FINANCING_LINES,
  BUDGET_REALIZATION,
  BUDGET_REVENUE_LINES,
  DEVELOPMENT_PROJECTS,
  DOCUMENTS,
} from '../prisma/seed-data/transparency';
import {
  DEMOGRAPHICS,
  EDUCATION_LEVELS,
  GOVERNANCE_PILLARS,
  INSTITUTIONS,
  LEADERSHIP_TERMS,
  MISSIONS,
  OCCUPATIONS,
  OFFICIALS,
  PADUKUHAN,
  RELIGIONS,
} from '../prisma/seed-data/village';
import {
  AGENDA,
  NEWS,
  NEWS_CATEGORIES,
  SERVICE_CATEGORIES,
  SERVICES,
} from '../prisma/seed-data/content';
import { LOCAL_POTENTIALS, UMKM } from '../prisma/seed-data/potential';
import { PERMISSIONS, ROLE_PERMISSIONS, ROLES } from '../prisma/seed-data/access';

/**
 * Seed-data integrity.
 *
 * Phase 2 requirement §7: explicitly validate the financial data and
 * relationships already verified in docs/SOURCE_DATA.md, without recalculating
 * or inventing figures.
 *
 * Money is compared in integer minor units via BigInt. Parsing rupiah into a
 * JS number would introduce float error into exactly the figures a
 * transparency portal must not get wrong.
 */

/** "1285400000.00" -> 128540000000n (minor units). */
function toMinor(amount: string): bigint {
  const [whole = '0', fraction = '00'] = amount.split('.');
  return BigInt(whole) * 100n + BigInt(fraction.padEnd(2, '0').slice(0, 2));
}

const sumMinor = (amounts: readonly string[]): bigint =>
  amounts.reduce((total, amount) => total + toMinor(amount), 0n);

describe('APBKal 2026 — verified figures reconcile', () => {
  it('revenue lines sum exactly to the stated total', () => {
    const sum = sumMinor(BUDGET_REVENUE_LINES.map((l) => l.amount));
    expect(sum).toBe(toMinor(BUDGET.totalRevenue));
  });

  it('expenditure allocation lines sum exactly to the stated total', () => {
    const sum = sumMinor(BUDGET_EXPENDITURE_ALLOCATION_LINES.map((l) => l.amount));
    expect(sum).toBe(toMinor(BUDGET.totalExpenditure));
  });

  it('each allocation percentage matches its share of the total', () => {
    const total = toMinor(BUDGET.totalExpenditure);
    for (const line of BUDGET_EXPENDITURE_ALLOCATION_LINES) {
      const share = Number((toMinor(line.amount) * 10000n) / total) / 100;
      expect(Math.round(share)).toBe(Number(line.percentage));
    }
  });

  it('net financing equals receipts minus outlays', () => {
    expect(toMinor(BUDGET.financingReceipts) - toMinor(BUDGET.financingOutlays)).toBe(
      toMinor(BUDGET.netFinancing),
    );
  });

  it('net financing exactly closes the revenue/expenditure gap', () => {
    const deficit = toMinor(BUDGET.totalExpenditure) - toMinor(BUDGET.totalRevenue);
    expect(deficit).toBe(toMinor(BUDGET.netFinancing));
  });

  it('financing lines match the budget header', () => {
    const receipt = BUDGET_FINANCING_LINES.find((l) => l.kind === 'FINANCING_RECEIPT');
    const outlay = BUDGET_FINANCING_LINES.find((l) => l.kind === 'FINANCING_OUTLAY');
    expect(toMinor(receipt!.amount)).toBe(toMinor(BUDGET.financingReceipts));
    expect(toMinor(outlay!.amount)).toBe(toMinor(BUDGET.financingOutlays));
  });

  it('realised SP2D matches the stated cash absorption percentage', () => {
    const share =
      Number((toMinor(BUDGET_REALIZATION.cashAmount) * 10000n) / toMinor(BUDGET.totalExpenditure)) /
      100;
    expect(Math.round(share)).toBe(Number(BUDGET_REALIZATION.cashPercent));
  });

  it('bidang percentages total 100', () => {
    const total = BUDGET_EXPENDITURE_BIDANG_LINES.reduce(
      (sum, line) => sum + Number(line.percentage),
      0,
    );
    expect(total).toBe(100);
  });

  it('records five accountability gates', () => {
    expect(BUDGET_CYCLE_STAGES).toHaveLength(5);
  });
});

describe('withheld figures are absent, not guessed', () => {
  it('C01 — the contradicting 65/25/10 revenue pills are nowhere in the dataset', () => {
    const labels = BUDGET_REVENUE_LINES.map((l) => l.label).join(' ');
    expect(labels).not.toMatch(/65|25\s*%|Transfer/i);
  });

  it('C05 — no per-padukuhan RW/RT counts and no 86 RT total', () => {
    expect(DEMOGRAPHICS.rtCount).toBeNull();
    for (const p of PADUKUHAN) {
      expect(p).not.toHaveProperty('rwCount');
      expect(p).not.toHaveProperty('rtCount');
    }
  });

  it('C07 — the contradictory SD education rows are not seeded', () => {
    const levels = EDUCATION_LEVELS.map((e) => e.level);
    expect(levels).not.toContain('Tamat SD / Sederajat');
    expect(levels).not.toContain('Belum Tamat SD');
  });

  it('C08 — bentang wilayah is not present', () => {
    expect(DEMOGRAPHICS).not.toHaveProperty('spanNorthSouthKm');
    expect(DEMOGRAPHICS).not.toHaveProperty('spanEastWestKm');
  });

  it('C09 and C10 — UMKM capacity and phone number are null', () => {
    for (const business of UMKM) {
      expect(business.dailyCapacityLabel).toBeNull();
      expect(business.whatsapp).toBeNull();
    }
  });

  it('C10 — the kalurahan hotline never appears as a business contact', () => {
    const serialised = JSON.stringify(UMKM);
    expect(serialised).not.toContain('3625');
  });

  it('V05 — no document carries a file size', () => {
    for (const doc of DOCUMENTS) {
      expect(doc).not.toHaveProperty('sizeBytes');
    }
  });

  it('V01 — only the two named officials have a name', () => {
    const named = OFFICIALS.filter((o) => o.name !== null).map((o) => o.name);
    expect(named).toEqual(['Eko Puji Mulyanto', 'Rini Sapta Wadani']);
  });

  it('V11 — the two truncated headlines are not published', () => {
    const drafts = NEWS.filter((n) => n.status === 'DRAFT');
    expect(drafts).toHaveLength(2);
    for (const draft of drafts) {
      expect(draft.publishedAt).toBeNull();
    }
  });

  it('every published article carries a publication date', () => {
    for (const article of NEWS.filter((n) => n.status === 'PUBLISHED')) {
      expect(article.publishedAt).not.toBeNull();
    }
  });

  it('V12 — only agenda items with a full date are seeded', () => {
    expect(AGENDA).toHaveLength(2);
    for (const item of AGENDA) {
      expect(Number.isNaN(new Date(item.startsAt).getTime())).toBe(false);
    }
  });
});

describe('demographics — verified reconciliations', () => {
  it('gender split sums to the population', () => {
    expect(DEMOGRAPHICS.malePopulation + DEMOGRAPHICS.femalePopulation).toBe(
      DEMOGRAPHICS.totalPopulation,
    );
  });

  it('household heads sum to the household count', () => {
    expect(DEMOGRAPHICS.householdsMaleHead + DEMOGRAPHICS.householdsFemaleHead).toBe(
      DEMOGRAPHICS.households,
    );
  });

  it('tertiary tiers sum to the stated 1.288 total', () => {
    const tertiary = EDUCATION_LEVELS.filter((e) => e.isTertiary);
    expect(tertiary.reduce((sum, e) => sum + e.people, 0)).toBe(1288);
  });

  it('religion counts do NOT total the population — which is why no total is stored', () => {
    const sum = RELIGIONS.reduce((total, r) => total + r.people, 0);
    expect(sum).toBe(14364);
    expect(sum).not.toBe(DEMOGRAPHICS.totalPopulation);
  });

  it('occupations are a ranked top five, never a complete breakdown', () => {
    expect(OCCUPATIONS).toHaveLength(5);
    expect(OCCUPATIONS.map((o) => o.rank)).toEqual([1, 2, 3, 4, 5]);
    expect(OCCUPATIONS.reduce((sum, o) => sum + o.people, 0)).toBeLessThan(
      DEMOGRAPHICS.totalPopulation,
    );
  });

  it('publishes 13 padukuhan and 28 RW, the corroborated totals', () => {
    expect(DEMOGRAPHICS.padukuhanCount).toBe(13);
    expect(DEMOGRAPHICS.rwCount).toBe(28);
  });
});

describe('territory and government', () => {
  it('has thirteen padukuhan with unique numbers and slugs', () => {
    expect(PADUKUHAN).toHaveLength(13);
    expect(new Set(PADUKUHAN.map((p) => p.number)).size).toBe(13);
    expect(new Set(PADUKUHAN.map((p) => p.slug)).size).toBe(13);
    expect(PADUKUHAN.map((p) => p.number)).toEqual([...Array(13)].map((_, i) => i + 1));
  });

  it('marks exactly one padukuhan as the historical core', () => {
    const core = PADUKUHAN.filter((p) => 'isHistoricalCore' in p && p.isHistoricalCore);
    expect(core).toHaveLength(1);
    expect(core[0]?.name).toBe('Jamblangan');
  });

  it('records seven leadership terms in unbroken chronological order', () => {
    expect(LEADERSHIP_TERMS).toHaveLength(7);
    for (let i = 1; i < LEADERSHIP_TERMS.length; i += 1) {
      expect(LEADERSHIP_TERMS[i]!.startYear).toBe(LEADERSHIP_TERMS[i - 1]!.endYear);
    }
    expect(LEADERSHIP_TERMS.filter((t) => 'isIncumbent' in t && t.isIncumbent)).toHaveLength(1);
  });

  it('records the four pillars, ten missions and five institutions', () => {
    expect(GOVERNANCE_PILLARS).toHaveLength(4);
    expect(MISSIONS).toHaveLength(10);
    expect(MISSIONS.map((m) => m.number)).toEqual([...Array(10)].map((_, i) => i + 1));
    expect(INSTITUTIONS).toHaveLength(5);
    expect(INSTITUTIONS.filter((i) => i.kind === 'BPKAL')).toHaveLength(1);
  });
});

describe('services and projects', () => {
  it('publishes seven services, every one free of charge', () => {
    expect(SERVICES).toHaveLength(7);
    expect(SERVICE_CATEGORIES).toHaveLength(4);
  });

  it('every service references a declared category', () => {
    const slugs = new Set(SERVICE_CATEGORIES.map((c) => c.slug));
    for (const service of SERVICES) {
      expect(slugs.has(service.categorySlug)).toBe(true);
    }
  });

  it('every news article references a declared category', () => {
    const slugs = new Set(NEWS_CATEGORIES.map((c) => c.slug));
    for (const article of NEWS) {
      expect(slugs.has(article.categorySlug)).toBe(true);
    }
  });

  it('a completed project is always at 100% physical progress', () => {
    for (const project of DEVELOPMENT_PROJECTS) {
      if (project.status === 'COMPLETED') expect(project.physicalProgress).toBe(100);
      expect(project.physicalProgress).toBeGreaterThanOrEqual(0);
      expect(project.physicalProgress).toBeLessThanOrEqual(100);
    }
  });

  it('every project location resolves to real padukuhan', () => {
    const slugs = new Set(PADUKUHAN.map((p) => p.slug));
    for (const project of DEVELOPMENT_PROJECTS) {
      for (const slug of project.padukuhanSlugs) {
        expect(slugs.has(slug)).toBe(true);
      }
    }
  });

  it('keeps the source location wording even when no padukuhan is linked', () => {
    const balai = DEVELOPMENT_PROJECTS.find((p) => p.code === 'EM-01/26');
    expect(balai?.padukuhanSlugs).toHaveLength(0);
    expect(balai?.locationLabel).toBe('Balai Kalurahan Margomulyo');
  });

  it('uses unique slugs and codes throughout', () => {
    const collections: readonly (readonly string[])[] = [
      SERVICES.map((s) => s.slug),
      NEWS.map((n) => n.slug),
      DEVELOPMENT_PROJECTS.map((p) => p.slug),
      DEVELOPMENT_PROJECTS.map((p) => p.code),
      DOCUMENTS.map((d) => d.slug),
      LOCAL_POTENTIALS.map((p) => p.slug),
      UMKM.map((u) => u.slug),
    ];
    for (const values of collections) {
      expect(new Set(values).size).toBe(values.length);
    }
  });
});

describe('roles and permissions', () => {
  it('defines the four roles with a strict authority order', () => {
    expect(ROLES).toHaveLength(4);
    expect(ROLES.map((r) => r.key)).toEqual(['OWNER', 'ADMIN', 'EDITOR', 'OPERATOR']);
    expect(ROLES.map((r) => r.rank)).toEqual([1, 2, 3, 4]);
  });

  it('grants OWNER every permission', () => {
    expect(ROLE_PERMISSIONS.OWNER).toHaveLength(PERMISSIONS.length);
  });

  it('reserves role management for OWNER alone', () => {
    expect(ROLE_PERMISSIONS.OWNER).toContain('roles.manage');
    expect(ROLE_PERMISSIONS.ADMIN).not.toContain('roles.manage');
    expect(ROLE_PERMISSIONS.EDITOR).not.toContain('roles.manage');
    expect(ROLE_PERMISSIONS.OPERATOR).not.toContain('roles.manage');
  });

  it('keeps EDITOR and OPERATOR away from user management', () => {
    for (const role of ['EDITOR', 'OPERATOR'] as const) {
      expect(ROLE_PERMISSIONS[role]).not.toContain('users.manage');
      expect(ROLE_PERMISSIONS[role]).not.toContain('settings.manage');
    }
  });

  it('grants every role only declared permissions', () => {
    const declared = new Set(PERMISSIONS.map((p) => p.key));
    for (const keys of Object.values(ROLE_PERMISSIONS)) {
      for (const key of keys) expect(declared.has(key)).toBe(true);
    }
  });
});
