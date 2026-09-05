import 'server-only';

import { ContentStatus, type BudgetLineKind } from '@prisma/client';

import { db } from '@/server/db';
import {
  decimalToString,
  optionalDateToIsoDay,
  optionalDecimalToString,
} from '@/server/serialize';

/**
 * Transparency queries: APBKal, realisation, development projects, documents.
 *
 * Every money value crosses this boundary as an exact decimal STRING. A
 * transparency portal that rounds a budget figure is worse than one that shows
 * nothing, so no rupiah value is ever converted to a JS number here.
 *
 * Two SOURCE_DATA rules are enforced structurally rather than left to the UI:
 *
 *   * Budget lines carry `amount` OR `amountLabel`. The five-bidang lines for
 *     Pemberdayaan and Penanggulangan were published only as rounded figures
 *     ("Rp 391 Jt"), so their exact amount is null and the source's own text
 *     is returned instead. Callers must render `amountLabel` when `amount` is
 *     null rather than inventing precision.
 *
 *   * Expenditure is published in two different groupings over the same total.
 *     They are returned under separate keys so they can never be summed
 *     together by accident.
 */

export interface BudgetLineDto {
  label: string;
  amount: string | null;
  amountLabel: string | null;
  percentage: string | null;
}

export interface BudgetDto {
  fiscalYear: number;
  totalRevenue: string;
  totalExpenditure: string;
  financingReceipts: string;
  financingOutlays: string;
  netFinancing: string;
  balanceLabel: string | null;
  basis: string | null;
  revenue: BudgetLineDto[];
  /** The four-line allocation view. */
  expenditureByAllocation: BudgetLineDto[];
  /** The five-bidang Permendagri classification of the same total. */
  expenditureByBidang: BudgetLineDto[];
  realizations: {
    period: string;
    physicalPercent: string | null;
    physicalTargetPercent: string | null;
    physicalNote: string | null;
    cashPercent: string | null;
    cashAmount: string | null;
  }[];
  cycleStages: {
    stageNumber: number;
    name: string;
    description: string;
    statusLabel: string;
  }[];
}

export async function getPublishedBudget(
  fiscalYear: number,
): Promise<BudgetDto | null> {
  const budget = await db.budget.findFirst({
    where: { fiscalYear, status: ContentStatus.PUBLISHED },
    include: {
      lines: { orderBy: { sortOrder: 'asc' } },
      realizations: { orderBy: { period: 'asc' } },
      cycleStages: { orderBy: { stageNumber: 'asc' } },
    },
  });
  if (budget === null) return null;

  const pick = (kind: BudgetLineKind): BudgetLineDto[] =>
    budget.lines
      .filter((line) => line.kind === kind)
      .map((line) => ({
        label: line.label,
        amount: optionalDecimalToString(line.amount),
        amountLabel: line.amountLabel,
        percentage: optionalDecimalToString(line.percentage),
      }));

  return {
    fiscalYear: budget.fiscalYear,
    totalRevenue: decimalToString(budget.totalRevenue),
    totalExpenditure: decimalToString(budget.totalExpenditure),
    financingReceipts: decimalToString(budget.financingReceipts),
    financingOutlays: decimalToString(budget.financingOutlays),
    netFinancing: decimalToString(budget.netFinancing),
    balanceLabel: budget.balanceLabel,
    basis: budget.basis,
    revenue: pick('REVENUE'),
    expenditureByAllocation: pick('EXPENDITURE_ALLOCATION'),
    expenditureByBidang: pick('EXPENDITURE_BIDANG'),
    realizations: budget.realizations.map((r) => ({
      period: r.period,
      physicalPercent: optionalDecimalToString(r.physicalPercent),
      physicalTargetPercent: optionalDecimalToString(r.physicalTargetPercent),
      physicalNote: r.physicalNote,
      cashPercent: optionalDecimalToString(r.cashPercent),
      cashAmount: optionalDecimalToString(r.cashAmount),
    })),
    cycleStages: budget.cycleStages.map((s) => ({
      stageNumber: s.stageNumber,
      name: s.name,
      description: s.description,
      statusLabel: s.statusLabel,
    })),
  };
}

/** Fiscal years that actually have published data (SOURCE_DATA V13). */
export async function listPublishedBudgetYears(): Promise<number[]> {
  const rows = await db.budget.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: { fiscalYear: 'desc' },
    select: { fiscalYear: true },
  });
  return rows.map((row) => row.fiscalYear);
}

export interface ProjectDto {
  code: string;
  slug: string;
  title: string;
  description: string;
  locationLabel: string;
  padukuhan: { name: string; slug: string }[];
  budgetAmount: string;
  fundingSourceLabel: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
  physicalProgress: number;
  financialProgress: number | null;
  targetLabel: string | null;
  note: string | null;
}

export async function listPublishedProjects(
  fiscalYear?: number,
): Promise<ProjectDto[]> {
  const rows = await db.developmentProject.findMany({
    where: {
      publishStatus: ContentStatus.PUBLISHED,
      ...(fiscalYear === undefined ? {} : { fiscalYear }),
    },
    orderBy: { code: 'asc' },
    include: {
      padukuhan: { include: { padukuhan: { select: { name: true, slug: true } } } },
    },
  });

  return rows.map((row) => ({
    code: row.code,
    slug: row.slug,
    title: row.title,
    description: row.description,
    locationLabel: row.locationLabel,
    padukuhan: row.padukuhan.map((link) => link.padukuhan),
    budgetAmount: decimalToString(row.budgetAmount),
    fundingSourceLabel: row.fundingSourceLabel,
    status: row.status,
    physicalProgress: row.physicalProgress,
    financialProgress: row.financialProgress,
    targetLabel: row.targetLabel,
    note: row.note,
  }));
}

export interface DocumentDto {
  slug: string;
  title: string;
  category: string;
  categoryLabel: string | null;
  year: number | null;
  description: string | null;
  fileType: string | null;
  /** Null for every seeded document — SOURCE_DATA V05 withholds file sizes. */
  sizeBytes: number | null;
  /** Null while the actual files do not exist — SOURCE_DATA V04. */
  isDownloadable: boolean;
  publishedAt: string | null;
}

export async function listPublishedDocuments(): Promise<DocumentDto[]> {
  const rows = await db.document.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: [{ year: 'desc' }, { title: 'asc' }],
    select: {
      slug: true,
      title: true,
      category: true,
      categoryLabel: true,
      year: true,
      description: true,
      fileType: true,
      sizeBytes: true,
      mediaId: true,
      publishedAt: true,
    },
  });

  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    category: row.category,
    categoryLabel: row.categoryLabel,
    year: row.year,
    description: row.description,
    fileType: row.fileType,
    sizeBytes: row.sizeBytes,
    isDownloadable: row.mediaId !== null,
    publishedAt: optionalDateToIsoDay(row.publishedAt),
  }));
}
