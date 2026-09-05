import 'server-only';

import { db } from '@/server/db';

/**
 * Padukuhan queries.
 *
 * DESIGN_REFERENCE §4 treats the 13 padukuhan as a spine: the same entity is
 * an administrative unit, a potential profile, a project location and a
 * complaint domicile. These functions are the one way to read it.
 *
 * `rwCount` / `rtCount` are exposed as they are stored — NULL. SOURCE_DATA
 * conflict C05 withholds them because pages 2 and 3 of the source disagree on
 * 9 of 13 padukuhan and neither reconciles with the stated 86 RT total. The
 * UI must render nothing when they are null; it must not substitute a zero.
 */

export interface PadukuhanSummary {
  id: string;
  number: number;
  name: string;
  slug: string;
  isHistoricalCore: boolean;
  potentialSummary: string | null;
  rwCount: number | null;
  rtCount: number | null;
}

export async function listPadukuhan(): Promise<PadukuhanSummary[]> {
  const rows = await db.padukuhan.findMany({
    orderBy: { number: 'asc' },
    select: {
      id: true,
      number: true,
      name: true,
      slug: true,
      isHistoricalCore: true,
      potentialSummary: true,
      rwCount: true,
      rtCount: true,
    },
  });
  return rows;
}

export async function getPadukuhanBySlug(
  slug: string,
): Promise<PadukuhanSummary | null> {
  return db.padukuhan.findUnique({
    where: { slug },
    select: {
      id: true,
      number: true,
      name: true,
      slug: true,
      isHistoricalCore: true,
      potentialSummary: true,
      rwCount: true,
      rtCount: true,
    },
  });
}

/**
 * Options for the "Padukuhan Domisili" field on the citizen contact form
 * (source p7, a required field with 13 options).
 */
export async function listPadukuhanOptions(): Promise<
  { id: string; name: string }[]
> {
  return db.padukuhan.findMany({
    orderBy: { number: 'asc' },
    select: { id: true, name: true },
  });
}
