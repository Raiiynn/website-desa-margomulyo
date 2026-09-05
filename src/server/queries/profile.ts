import 'server-only';

import { db } from '@/server/db';
import { dateToIsoDay, optionalDecimalToString } from '@/server/serialize';

/**
 * Village profile, government structure and demographic statistics.
 *
 * SOURCE_DATA §6 rule 4: provenance travels with statistics. The snapshot DTO
 * therefore always carries `referenceDate` and `sourceLabel` — the
 * "per 1 September 2026 · Sistem Informasi Kalurahan (SIK) Sleman" line cannot
 * be separated from the figures it describes.
 *
 * Two absences are deliberate and must not be "fixed" by adding a total:
 *   * religion counts sum to 14.364 against a population of 14.384 (C06);
 *   * education categories sum to 13.796 (C07), and the two SD-level rows are
 *     withheld entirely because the source shows identical values on bars of
 *     visibly different length.
 * Both are returned as itemised lists with no computed total.
 */

export interface DemographicsDto {
  referenceDate: string;
  sourceLabel: string;
  totalPopulation: number;
  malePopulation: number;
  femalePopulation: number;
  households: number;
  householdsMaleHead: number;
  householdsFemaleHead: number;
  vulnerablePeople: number | null;
  vulnerablePercent: string | null;
  completionPercent: string | null;
  areaHectares: string;
  padukuhanCount: number;
  rwCount: number;
  /** Null by design — SOURCE_DATA C05 withholds the disputed 86 RT total. */
  rtCount: number | null;
  religions: { religion: string; people: number; percentage: string | null }[];
  educations: {
    level: string;
    people: number;
    percentage: string | null;
    isTertiary: boolean;
  }[];
  /** Explicitly a top-5 list in the source. Never total it. */
  occupations: { occupation: string; people: number; rank: number }[];
}

export async function getPublishedDemographics(): Promise<DemographicsDto | null> {
  const snapshot = await db.demographicSnapshot.findFirst({
    where: { isPublished: true },
    orderBy: { referenceDate: 'desc' },
    include: {
      religions: { orderBy: { sortOrder: 'asc' } },
      educations: { orderBy: { sortOrder: 'asc' } },
      occupations: { orderBy: { rank: 'asc' } },
    },
  });
  if (snapshot === null) return null;

  return {
    referenceDate: dateToIsoDay(snapshot.referenceDate),
    sourceLabel: snapshot.sourceLabel,
    totalPopulation: snapshot.totalPopulation,
    malePopulation: snapshot.malePopulation,
    femalePopulation: snapshot.femalePopulation,
    households: snapshot.households,
    householdsMaleHead: snapshot.householdsMaleHead,
    householdsFemaleHead: snapshot.householdsFemaleHead,
    vulnerablePeople: snapshot.vulnerablePeople,
    vulnerablePercent: optionalDecimalToString(snapshot.vulnerablePercent),
    completionPercent: optionalDecimalToString(snapshot.completionPercent),
    areaHectares: snapshot.areaHectares.toFixed(2),
    padukuhanCount: snapshot.padukuhanCount,
    rwCount: snapshot.rwCount,
    rtCount: snapshot.rtCount,
    religions: snapshot.religions.map((r) => ({
      religion: r.religion,
      people: r.people,
      percentage: optionalDecimalToString(r.percentage),
    })),
    educations: snapshot.educations.map((e) => ({
      level: e.level,
      people: e.people,
      percentage: optionalDecimalToString(e.percentage),
      isTertiary: e.isTertiary,
    })),
    occupations: snapshot.occupations.map((o) => ({
      occupation: o.occupation,
      people: o.people,
      rank: o.rank,
    })),
  };
}

export interface OfficialDto {
  kind: string;
  positionTitle: string;
  positionAlias: string | null;
  remit: string | null;
  /**
   * NULL for every position except the Lurah and one Kasi.
   * SOURCE_DATA V01: the source verifies the offices, not their occupants.
   * The UI must show the office without inventing a name.
   */
  name: string | null;
  padukuhan: { name: string; slug: string } | null;
}

export async function listActiveOfficials(): Promise<OfficialDto[]> {
  const rows = await db.governmentOfficial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: { padukuhan: { select: { name: true, slug: true } } },
  });

  // `internalNote` is intentionally not selected: it carries open verification
  // questions for staff and must never reach a public page.
  return rows.map((row) => ({
    kind: row.kind,
    positionTitle: row.positionTitle,
    positionAlias: row.positionAlias,
    remit: row.remit,
    name: row.name,
    padukuhan: row.padukuhan,
  }));
}

export async function listLeadershipTerms(): Promise<
  {
    name: string;
    description: string | null;
    startYear: number;
    endYear: number;
    isIncumbent: boolean;
  }[]
> {
  return db.leadershipTerm.findMany({
    orderBy: { sortOrder: 'asc' },
    select: {
      name: true,
      description: true,
      startYear: true,
      endYear: true,
      isIncumbent: true,
    },
  });
}

export async function listInstitutions(): Promise<
  { kind: string; name: string; slug: string; alias: string | null; description: string }[]
> {
  return db.villageInstitution.findMany({
    orderBy: { sortOrder: 'asc' },
    select: {
      kind: true,
      name: true,
      slug: true,
      alias: true,
      description: true,
    },
  });
}

export async function listMissions(): Promise<
  { number: number; label: string; title: string; description: string }[]
> {
  return db.villageMission.findMany({
    orderBy: { number: 'asc' },
    select: { number: true, label: true, title: true, description: true },
  });
}

export async function listGovernancePillars(): Promise<
  { name: string; description: string }[]
> {
  return db.governancePillar.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { name: true, description: true },
  });
}

/** Public settings only. `isPublic = false` rows never leave the server. */
export async function getPublicSettings(): Promise<Record<string, string>> {
  const rows = await db.siteSetting.findMany({
    where: { isPublic: true },
    select: { key: true, value: true },
  });
  return Object.fromEntries(rows.map((row) => [row.key, row.value]));
}
