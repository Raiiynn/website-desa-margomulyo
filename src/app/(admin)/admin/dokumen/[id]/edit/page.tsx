import React from 'react';
import { getDocumentById } from '@/server/admin-actions';
import { notFound } from 'next/navigation';
import { EditDocumentForm } from './EditDocumentForm';

interface Props { params: Promise<{ id: string }> }

export default async function EditDokumenPage({ params }: Props) {
  const { id } = await params;
  let doc;
  try { doc = await getDocumentById(id); } catch {
    return <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800"><strong>Database belum terhubung.</strong></div>;
  }
  if (!doc) notFound();
  return <EditDocumentForm document={doc} />;
}
