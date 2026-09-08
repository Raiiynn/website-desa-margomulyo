'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { updateDocument } from '@/server/admin-actions';
import { AdminFormField, AdminTextAreaField, AdminSelectField } from '@/components/admin/AdminFormField';

const CATEGORY_OPTIONS = [
  { value: 'APBKAL', label: 'APBKal' },
  { value: 'RKPKAL', label: 'RKPKal' },
  { value: 'RPJMKAL', label: 'RPJMKal' },
  { value: 'LPPKAL', label: 'LPPKal' },
  { value: 'PERKAL', label: 'Perkal' },
  { value: 'LAKIP', label: 'LAKIP' },
];

const STATUS_OPTIONS = [
  { value: 'DRAFT', label: 'Draf' },
  { value: 'PUBLISHED', label: 'Terbit' },
  { value: 'ARCHIVED', label: 'Arsip' },
];

interface DocumentData {
  id: string; title: string; slug: string; category: string;
  categoryLabel: string | null; year: number | null;
  description: string | null; status: string;
}

export function EditDocumentForm({ document: doc }: { document: DocumentData }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const formData = new FormData(e.currentTarget);
      await updateDocument(doc.id, formData);
      router.push('/admin/dokumen');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan perubahan.');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/dokumen" className="text-text-muted hover:text-text-strong transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 className="font-serif text-2xl font-bold text-navy-900">Edit Dokumen</h1>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-white p-6 space-y-5">
        <AdminFormField label="Judul Dokumen" name="title" required defaultValue={doc.title} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <AdminSelectField label="Kategori" name="category" required options={CATEGORY_OPTIONS} defaultValue={doc.category} />
          <AdminFormField label="Label Kategori" name="categoryLabel" defaultValue={doc.categoryLabel ?? ''} />
          <AdminFormField label="Tahun" name="year" type="number" defaultValue={doc.year ?? undefined} />
        </div>

        <AdminTextAreaField label="Deskripsi" name="description" defaultValue={doc.description ?? ''} rows={3} />
        <AdminSelectField label="Status" name="status" options={STATUS_OPTIONS} defaultValue={doc.status} />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Link href="/admin/dokumen" className="rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-medium text-text-strong hover:bg-band transition-colors">Batal</Link>
          <button type="submit" disabled={isSubmitting} className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f6bb0] transition-colors disabled:opacity-60 flex items-center gap-2">
            {isSubmitting && <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>}
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
