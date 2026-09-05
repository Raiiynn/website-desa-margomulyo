import 'server-only';

import { ContentStatus } from '@prisma/client';

import { db } from '@/server/db';
import { dateToIso, optionalDateToIso } from '@/server/serialize';

/**
 * News, agenda and public-service queries.
 *
 * Every function filters on `status = PUBLISHED`. Draft, in-review and
 * archived rows never leave this module — the publishing workflow in
 * FULL_BUILD §6 is meaningless if a public page can read a draft.
 *
 * Counts are always derived from real rows. SOURCE_DATA conflicts C02 and C04
 * record the source claiming 28 services and 24 articles while documenting 7
 * of each, so no total is ever hardcoded.
 */

/** Average Indonesian reading speed, words per minute. */
const WORDS_PER_MINUTE = 200;

/**
 * Reading time is DERIVED, never stored: SOURCE_DATA V10 records the source
 * contradicting itself (3 minutes on one page, 4 on another for one article).
 */
function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export interface NewsListItem {
  slug: string;
  title: string;
  excerpt: string;
  category: { name: string; slug: string };
  publishedAt: string | null;
  readingMinutes: number;
  coverImage: { path: string; alt: string | null } | null;
}

export interface NewsListPage {
  items: NewsListItem[];
  /** Real row count, not a figure from the concept. */
  total: number;
  page: number;
  pageSize: number;
}

export async function listPublishedNews(options?: {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
}): Promise<NewsListPage> {
  const page = Math.max(1, options?.page ?? 1);
  const pageSize = Math.min(50, Math.max(1, options?.pageSize ?? 10));
  const categorySlug = options?.categorySlug;

  const where = {
    status: ContentStatus.PUBLISHED,
    ...(categorySlug === undefined ? {} : { category: { slug: categorySlug } }),
  };

  const [rows, total] = await Promise.all([
    db.news.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        category: { select: { name: true, slug: true } },
        coverMedia: { select: { path: true, alt: true } },
      },
    }),
    db.news.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      category: row.category,
      publishedAt: optionalDateToIso(row.publishedAt),
      readingMinutes: readingMinutes(row.body),
      coverImage: row.coverMedia,
    })),
    total,
    page,
    pageSize,
  };
}

export interface NewsDetail extends NewsListItem {
  body: string;
  bylineLabel: string | null;
}

export async function getPublishedNewsBySlug(
  slug: string,
): Promise<NewsDetail | null> {
  const row = await db.news.findFirst({
    where: { slug, status: ContentStatus.PUBLISHED },
    include: {
      category: { select: { name: true, slug: true } },
      coverMedia: { select: { path: true, alt: true } },
    },
  });
  if (row === null) return null;

  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    bylineLabel: row.bylineLabel,
    category: row.category,
    publishedAt: optionalDateToIso(row.publishedAt),
    readingMinutes: readingMinutes(row.body),
    coverImage: row.coverMedia,
  };
}

export async function listNewsCategories(): Promise<
  { name: string; slug: string; isFilter: boolean }[]
> {
  return db.newsCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { name: true, slug: true, isFilter: true },
  });
}

export interface AgendaItem {
  slug: string;
  title: string;
  description: string | null;
  label: string | null;
  startsAt: string;
  endsAt: string | null;
  isAllDay: boolean;
  location: string | null;
}

export async function listUpcomingAgenda(from: Date): Promise<AgendaItem[]> {
  const rows = await db.agenda.findMany({
    where: {
      status: ContentStatus.PUBLISHED,
      OR: [{ startsAt: { gte: from } }, { endsAt: { gte: from } }],
    },
    orderBy: { startsAt: 'asc' },
  });

  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    description: row.description,
    label: row.label,
    startsAt: dateToIso(row.startsAt),
    endsAt: optionalDateToIso(row.endsAt),
    isAllDay: row.isAllDay,
    location: row.location,
  }));
}

export interface ServiceListItem {
  slug: string;
  code: string | null;
  badge: string | null;
  name: string;
  description: string;
  requirements: string;
  duration: string;
  output: string;
  method: string;
  /** Exact decimal string. Every documented service is "0.00". */
  costRupiah: string;
  procedure: string | null;
  category: { name: string; slug: string };
}

export async function listPublishedServices(
  categorySlug?: string,
): Promise<ServiceListItem[]> {
  const rows = await db.service.findMany({
    where: {
      status: ContentStatus.PUBLISHED,
      ...(categorySlug === undefined ? {} : { category: { slug: categorySlug } }),
    },
    orderBy: { sortOrder: 'asc' },
    include: { category: { select: { name: true, slug: true } } },
  });

  return rows.map((row) => ({
    slug: row.slug,
    code: row.code,
    badge: row.badge,
    name: row.name,
    description: row.description,
    requirements: row.requirements,
    duration: row.duration,
    output: row.output,
    method: row.method,
    costRupiah: row.costRupiah.toFixed(2),
    procedure: row.procedure,
    category: row.category,
  }));
}

export async function getPublishedServiceBySlug(
  slug: string,
): Promise<ServiceListItem | null> {
  const rows = await listPublishedServices();
  return rows.find((row) => row.slug === slug) ?? null;
}

export async function listServiceCategories(): Promise<
  { name: string; slug: string; description: string | null }[]
> {
  return db.serviceCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { name: true, slug: true, description: true },
  });
}

export async function listServiceProcedureSteps(): Promise<
  { stepNumber: number; title: string; description: string; outcome: string | null }[]
> {
  return db.serviceProcedureStep.findMany({
    orderBy: { stepNumber: 'asc' },
    select: {
      stepNumber: true,
      title: true,
      description: true,
      outcome: true,
    },
  });
}

export async function listServiceChannels(): Promise<
  { name: string; description: string }[]
> {
  return db.serviceChannel.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { name: true, description: true },
  });
}
