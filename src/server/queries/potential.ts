import 'server-only';

import { ContentStatus } from '@prisma/client';

import { db } from '@/server/db';
import { optionalDecimalToString } from '@/server/serialize';

/**
 * Village potential and the UMKM directory.
 *
 * Both models carry a `status` publication gate, and both are filtered on
 * PUBLISHED here rather than in the page: FULL_BUILD §6 gives editors a
 * draft state, which is worthless if a public page can read around it.
 *
 * Two UMKM fields are stored NULL by the seed and must stay that way:
 *   * `dailyCapacityLabel` — SOURCE_DATA C09, the source prints 150 kg/hari on
 *     one page and 120+ kg/hari on another for the same business;
 *   * `whatsapp` — SOURCE_DATA C10, the number printed is the kalurahan's own
 *     hotline, so publishing it would route citizen orders to the government
 *     line.
 * They are returned as null and the UI must render nothing, not a placeholder.
 */

export interface LocalPotentialDto {
  slug: string;
  title: string;
  headline: string | null;
  description: string;
  highlight: string | null;
  category: { name: string; slug: string };
  padukuhan: { name: string; slug: string } | null;
}

export async function listPublishedPotentials(): Promise<LocalPotentialDto[]> {
  const rows = await db.localPotential.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: { sortOrder: 'asc' },
    include: {
      category: { select: { name: true, slug: true } },
      padukuhan: { select: { name: true, slug: true } },
    },
  });

  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    headline: row.headline,
    description: row.description,
    highlight: row.highlight,
    category: row.category,
    padukuhan: row.padukuhan,
  }));
}

export async function listPotentialCategories(): Promise<
  { name: string; slug: string; description: string | null }[]
> {
  return db.localPotentialCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { name: true, slug: true, description: true },
  });
}

export interface UmkmProductDto {
  name: string;
  description: string | null;
  /** Exact decimal string, or null where the source gave no price. */
  priceRupiah: string | null;
  priceUnit: string | null;
  packaging: string | null;
  badge: string | null;
}

export interface UmkmDto {
  slug: string;
  name: string;
  ownerName: string | null;
  summary: string;
  description: string | null;
  categoryLabel: string | null;
  padukuhan: { name: string; slug: string } | null;
  addressDetail: string | null;
  foundedYear: number | null;
  hasNib: boolean;
  pirtNumber: string | null;
  /** NULL by design — SOURCE_DATA C10. */
  whatsapp: string | null;
  socialMedia: string | null;
  /** NULL by design — SOURCE_DATA C09. */
  dailyCapacityLabel: string | null;
  ratingValue: string | null;
  ratingCount: number | null;
  workerCount: number | null;
  operatingHours: string | null;
  products: UmkmProductDto[];
}

export async function listPublishedUmkm(): Promise<UmkmDto[]> {
  const rows = await db.umkm.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: { sortOrder: 'asc' },
    include: {
      padukuhan: { select: { name: true, slug: true } },
      products: { orderBy: { sortOrder: 'asc' } },
    },
  });

  return rows.map((row) => ({
    slug: row.slug,
    name: row.name,
    ownerName: row.ownerName,
    summary: row.summary,
    description: row.description,
    categoryLabel: row.categoryLabel,
    padukuhan: row.padukuhan,
    addressDetail: row.addressDetail,
    foundedYear: row.foundedYear,
    hasNib: row.hasNib,
    pirtNumber: row.pirtNumber,
    whatsapp: row.whatsapp,
    socialMedia: row.socialMedia,
    dailyCapacityLabel: row.dailyCapacityLabel,
    // Not optionalDecimalToString: that helper is the money serialiser and
    // fixes to 2 dp, which would render a 4.9 rating as "4.90". ratingValue is
    // Decimal(2,1), so it carries its own precision.
    ratingValue: row.ratingValue === null ? null : row.ratingValue.toFixed(1),
    ratingCount: row.ratingCount,
    workerCount: row.workerCount,
    operatingHours: row.operatingHours,
    products: row.products.map((product) => ({
      name: product.name,
      description: product.description,
      priceRupiah: optionalDecimalToString(product.priceRupiah),
      priceUnit: product.priceUnit,
      packaging: product.packaging,
      badge: product.badge,
    })),
  }));
}
