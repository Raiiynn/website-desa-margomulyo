import React from 'react';
import { getNewsById } from '@/server/admin-actions';
import { notFound } from 'next/navigation';
import { EditNewsForm } from './EditNewsForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBeritaPage({ params }: Props) {
  const { id } = await params;
  let news;

  try {
    news = await getNewsById(id);
  } catch {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
        <strong>Database belum terhubung.</strong> Pastikan DATABASE_URL sudah diisi.
      </div>
    );
  }

  if (!news) notFound();

  return <EditNewsForm news={news} />;
}
