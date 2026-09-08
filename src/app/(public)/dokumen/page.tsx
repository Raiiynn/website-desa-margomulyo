import React from 'react';
import type { Metadata } from 'next';
import { listPublishedDocuments } from '@/server/queries/transparency';
import { DokumenView } from './DokumenView';

/**
 * Server shell for the document archive.
 *
 * The filtering UI is client-side, so the page is split: this component reads
 * the database, DokumenView keeps the search and category state. The split
 * exists because a client component cannot import the server-only query layer.
 */

export const metadata: Metadata = {
  title: 'Dokumen Publik',
};

export const revalidate = 300;

export default async function DokumenPage() {
  const documents = await listPublishedDocuments();
  return <DokumenView DOCUMENTS={documents} />;
}
