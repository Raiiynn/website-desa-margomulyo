/**
 * INTERIM BUILD-TIME CONTENT SOURCE — NOT THE FINAL ARCHITECTURE.
 *
 * This module re-exports the verified seed-data constants VERBATIM. It adds no
 * data of its own; every value is traceable to docs/SOURCE_DATA.md §3 through
 * prisma/seed-data/*. `tests/fixtures-parity.test.ts` asserts that parity and
 * will fail if this file ever starts diverging from the seed.
 *
 * WHY IT EXISTS
 * The Supabase database has never been reachable from this environment (the
 * direct host resolves IPv6-only with no route; the pooler rejects the tenant),
 * so the migration has not been applied and the seed has not been run. Rather
 * than block the UI, pages read the same verified constants the seed writes.
 *
 * WHAT THIS COSTS
 * Content is compiled in at build time, so the admin CMS cannot change the
 * public site. That is acceptable only until the database is reachable.
 *
 * HOW IT GETS REPLACED
 * The server-only data layer already exists and returns the same shapes:
 *   src/server/queries/{padukuhan,content,transparency,profile}.ts
 * Once a working connection string is configured, pages become async server
 * components importing from '@/server/queries/*' instead of here, and this
 * module is deleted. Nothing else needs to change — which is exactly why the
 * parity test matters.
 *
 * DO NOT add values here that are not already in prisma/seed-data/*.
 * Governed by docs/SOURCE_DATA.md and docs/DESIGN_REFERENCE.md.
 */

import {
  PERMISSIONS,
  ROLES,
} from '../../prisma/seed-data/access';
import {
  AGENDA,
  NEWS,
  NEWS_CATEGORIES,
  SERVICE_CATEGORIES,
  SERVICE_CHANNELS,
  SERVICE_PROCEDURE_STEPS,
  SERVICES,
} from '../../prisma/seed-data/content';
import {
  LOCAL_POTENTIAL_CATEGORIES,
  LOCAL_POTENTIALS,
  UMKM,
} from '../../prisma/seed-data/potential';
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
} from '../../prisma/seed-data/transparency';
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
  SITE_SETTINGS,
  STATISTICS_REFERENCE_DATE,
  STATISTICS_SOURCE_LABEL,
} from '../../prisma/seed-data/village';

export interface PadukuhanItem {
  number: number;
  name: string;
  slug: string;
  potentialSummary: string;
  isHistoricalCore?: boolean;
}

export interface LeadershipTermItem {
  sortOrder: number;
  name: string;
  description: string;
  startYear: number;
  endYear: number;
  isIncumbent?: boolean;
}

export const TYPED_PADUKUHAN: PadukuhanItem[] = PADUKUHAN as unknown as PadukuhanItem[];
export const TYPED_LEADERSHIP_TERMS: LeadershipTermItem[] =
  LEADERSHIP_TERMS as unknown as LeadershipTermItem[];

export {
  AGENDA,
  BUDGET,
  BUDGET_CYCLE_STAGES,
  BUDGET_EXPENDITURE_ALLOCATION_LINES,
  BUDGET_EXPENDITURE_BIDANG_LINES,
  BUDGET_FINANCING_LINES,
  BUDGET_REALIZATION,
  BUDGET_REVENUE_LINES,
  DEMOGRAPHICS,
  DEVELOPMENT_PROJECTS,
  DOCUMENTS,
  EDUCATION_LEVELS,
  GOVERNANCE_PILLARS,
  INSTITUTIONS,
  LEADERSHIP_TERMS,
  LOCAL_POTENTIAL_CATEGORIES,
  LOCAL_POTENTIALS,
  MISSIONS,
  NEWS,
  NEWS_CATEGORIES,
  OCCUPATIONS,
  OFFICIALS,
  PADUKUHAN,
  PERMISSIONS,
  RELIGIONS,
  ROLES,
  SERVICE_CATEGORIES,
  SERVICE_CHANNELS,
  SERVICE_PROCEDURE_STEPS,
  SERVICES,
  SITE_SETTINGS,
  STATISTICS_REFERENCE_DATE,
  STATISTICS_SOURCE_LABEL,
  UMKM,
};

// Helper lookup for quick site settings
export const getSetting = (key: string, defaultValue = ''): string => {
  const setting = SITE_SETTINGS.find((s) => s.key === key);
  return setting ? setting.value : defaultValue;
};

// Formatting utilities for presentation (currency, dates, numbers)
export function formatRupiah(amountString: string | null): string {
  if (!amountString) return 'Rp 0';
  const num = parseFloat(amountString);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatCompactRupiah(amountString: string | null): string {
  if (!amountString) return 'Rp 0';
  const num = parseFloat(amountString);
  if (num >= 1_000_000_000) {
    return `Rp ${(num / 1_000_000_000).toLocaleString('id-ID', { maximumFractionDigits: 2 })} Miliar`;
  }
  if (num >= 1_000_000) {
    return `Rp ${(num / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 0 })} Juta`;
  }
  return formatRupiah(amountString);
}

export function formatNumber(val: number): string {
  return new Intl.NumberFormat('id-ID').format(val);
}

export function formatDateIndonesian(dateString: string): string {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}
