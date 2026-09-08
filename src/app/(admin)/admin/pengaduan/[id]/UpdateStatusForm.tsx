'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { updateComplaintStatus } from '@/server/admin-actions';
import { AdminSelectField, AdminTextAreaField } from '@/components/admin/AdminFormField';

const STATUS_OPTIONS = [
  { value: 'RECEIVED', label: 'Diterima' },
  { value: 'REVIEWED', label: 'Diperiksa' },
  { value: 'PROCESSING', label: 'Diproses' },
  { value: 'RESOLVED', label: 'Selesai' },
  { value: 'CLOSED', label: 'Ditutup' },
];

interface Props {
  complaintId: string;
  currentStatus: string;
}

export function UpdateStatusForm({ complaintId, currentStatus }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);
      const newStatus = String(formData.get('status'));
      const note = formData.get('note') as string | null;

      await updateComplaintStatus(complaintId, newStatus as 'RECEIVED' | 'REVIEWED' | 'PROCESSING' | 'RESOLVED' | 'CLOSED', note || undefined);
      setSuccess(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengubah status.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl border border-border bg-white p-6">
      <h3 className="font-serif text-base font-bold text-navy-900 mb-4">Ubah Status</h3>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 mb-4">{error}</div>}
      {success && <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700 mb-4">Status berhasil diperbarui.</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <AdminSelectField
          label="Status Baru"
          name="status"
          required
          options={STATUS_OPTIONS}
          defaultValue={currentStatus}
        />
        <AdminTextAreaField
          label="Catatan (Opsional)"
          name="note"
          placeholder="Tambahkan catatan tindak lanjut..."
          rows={2}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f6bb0] transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {isSubmitting && <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>}
            Perbarui Status
          </button>
        </div>
      </form>
    </div>
  );
}
