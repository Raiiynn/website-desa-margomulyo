import React from 'react';
import type { Metadata } from 'next';
import {
  listNewsCategories,
  listPublishedNews,
  listUpcomingAgenda,
} from '@/server/queries/content';
import { BeritaView } from './BeritaView';

/**
 * Server shell for the news index.
 *
 * The search and category filtering are client-side, so this component reads
 * the database and BeritaView keeps the interaction state. Only published
 * articles cross the boundary: the draft filter is the query, not the client.
 */

export const metadata: Metadata = {
  title: 'Berita & Informasi',
};

export const revalidate = 300;

export default async function BeritaPage() {
  const [newsPage, categories, agenda] = await Promise.all([
    listPublishedNews({ pageSize: 50 }),
    listNewsCategories(),
    listUpcomingAgenda(new Date()),
  ]);

  // categorySlug is flattened so the existing view markup is untouched.
  const articles = newsPage.items.map((item) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    bylineLabel: item.bylineLabel,
    publishedAt: item.publishedAt,
    categorySlug: item.category.slug,
  }));

  return (
    <BeritaView NEWS={articles} NEWS_CATEGORIES={categories} AGENDA={agenda} />
  );
}
