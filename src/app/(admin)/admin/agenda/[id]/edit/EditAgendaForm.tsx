'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { updateAgenda } from '@/server/admin-actions';
import { AdminFormField, AdminTextAreaField, AdminSelectField } from '@/components/admin/AdminFormField';

const STATUS_OPTIONS = [
  { value: 'DRAFT', label: 'Draf' },
  { value: 'PUBLISHED', label: 'Terbit' },
  { value: 'ARCHIVED', label: 'Arsip' },
];

function toLocalISO(d: Date | string): string {
  const date = new Date(d);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}

interface AgendaData {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  label: string | null;
  startsAt: Date | string;
  endsAt: Date | string | null;
  location: string | null;
  status: string;
}

export function EditAgendaForm({ agenda }: { agenda: AgendaData }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const formData = new FormData(e.currentTarget);
      await updateAgenda(agenda.id, formData);
      router.push('/admin/agenda');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan perubahan.');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/agenda" className="text-text-muted hover:text-text-strong transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 className="font-serif text-2xl font-bold text-navy-900">Edit Agenda</h1>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-white p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <AdminFormField label="Judul Kegiatan" name="title" required defaultValue={agenda.title} />
          <div className="space-y-1.5">
            <span className="block text-xs font-semibold text-text-strong uppercase tracking-wider">Slug</span>
            <div className="px-4 py-2.5 rounded-xl bg-band border border-border text-sm text-text-muted">{agenda.slug}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <AdminFormField label="Label" name="label" defaultValue={agenda.label ?? ''} />
          <AdminFormField label="Lokasi" name="location" defaultValue={agenda.location ?? ''} />
        </div>

        <AdminTextAreaField label="Deskripsi" name="description" defaultValue={agenda.description ?? ''} rows={3} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <AdminFormField label="Mulai" name="startsAt" type="datetime-local" required defaultValue={toLocalISO(agenda.startsAt)} />
          <AdminFormField label="Selesai" name="endsAt" type="datetime-local" defaultValue={agenda.endsAt ? toLocalISO(agenda.endsAt) : ''} />
          <AdminSelectField label="Status" name="status" options={STATUS_OPTIONS} defaultValue={agenda.status} />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Link href="/admin/agenda" className="rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-medium text-text-strong hover:bg-band transition-colors">Batal</Link>
          <button type="submit" disabled={isSubmitting} className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f6bb0] transition-colors disabled:opacity-60 flex items-center gap-2">
            {isSubmitting && <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>}
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
