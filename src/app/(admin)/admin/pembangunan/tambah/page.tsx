'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createProject } from '@/server/admin-actions';
import { AdminFormField, AdminTextAreaField, AdminSelectField } from '@/components/admin/AdminFormField';

const STATUS_OPTIONS = [
  { value: 'PLANNED', label: 'Rencana' },
  { value: 'IN_PROGRESS', label: 'Berjalan' },
  { value: 'COMPLETED', label: 'Selesai' },
];
const PUBLISH_OPTIONS = [
  { value: 'DRAFT', label: 'Draf' },
  { value: 'PUBLISHED', label: 'Terbit' },
];

export default function TambahPembangunanPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const formData = new FormData(e.currentTarget);
      await createProject(formData);
      router.push('/admin/pembangunan');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan proyek.');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/pembangunan" className="text-text-muted hover:text-text-strong transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 className="font-serif text-2xl font-bold text-navy-900">Tambah Proyek</h1>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-white p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <AdminFormField label="Kode Proyek" name="code" required placeholder="FIS-01/26" />
          <AdminFormField label="Slug (URL)" name="slug" required placeholder="saluran-irigasi-fis01" />
          <AdminFormField label="Tahun Anggaran" name="fiscalYear" type="number" required defaultValue={2026} />
        </div>

        <AdminFormField label="Nama Proyek" name="title" required placeholder="Pembangunan Saluran Irigasi" />
        <AdminTextAreaField label="Deskripsi" name="description" required placeholder="Deskripsi proyek pembangunan..." rows={3} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <AdminFormField label="Lokasi" name="locationLabel" required placeholder="Padukuhan Mangsel & Sompokan" />
          <AdminFormField label="Sumber Dana" name="fundingSourceLabel" required placeholder="Dana Desa & Swadaya" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <AdminFormField label="Anggaran (Rp)" name="budgetAmount" type="number" required placeholder="250000000" />
          <AdminFormField label="Progres Fisik (%)" name="physicalProgress" type="number" defaultValue={0} />
          <AdminSelectField label="Status Proyek" name="status" options={STATUS_OPTIONS} defaultValue="PLANNED" />
        </div>

        <AdminSelectField label="Status Publikasi" name="publishStatus" options={PUBLISH_OPTIONS} defaultValue="DRAFT" />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Link href="/admin/pembangunan" className="rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-medium text-text-strong hover:bg-band transition-colors">Batal</Link>
          <button type="submit" disabled={isSubmitting} className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f6bb0] transition-colors disabled:opacity-60 flex items-center gap-2">
            {isSubmitting && <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>}
            Simpan Proyek
          </button>
        </div>
      </form>
    </div>
  );
}
