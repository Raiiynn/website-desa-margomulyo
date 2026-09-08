import React from 'react';
import Link from 'next/link';
import { getComplaintById } from '@/server/admin-actions';
import { notFound } from 'next/navigation';
import { StatusBadge } from '@/components/admin/AdminTable';
import { UpdateStatusForm } from './UpdateStatusForm';

interface Props { params: Promise<{ id: string }> }

export default async function DetailPengaduanPage({ params }: Props) {
  const { id } = await params;
  let complaint;
  try { complaint = await getComplaintById(id); } catch {
    return <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800"><strong>Database belum terhubung.</strong></div>;
  }
  if (!complaint) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/pengaduan" className="text-text-muted hover:text-text-strong transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy-900">Detail Pengaduan</h1>
          <span className="font-mono text-xs text-text-muted">{complaint.reference}</span>
        </div>
      </div>

      {/* Complaint details card */}
      <div className="rounded-xl border border-border bg-white p-6 space-y-5">
        <div className="flex items-center justify-between">
          <StatusBadge status={complaint.status} />
          <span className="text-xs text-text-muted">
            {new Date(complaint.createdAt).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">Pelapor</span>
            <span className="text-sm font-medium text-text-strong">{complaint.reporterName}</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">Telepon</span>
            <span className="text-sm text-text-strong">{complaint.reporterPhone}</span>
          </div>
          {complaint.reporterEmail && (
            <div>
              <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">Email</span>
              <span className="text-sm text-text-strong">{complaint.reporterEmail}</span>
            </div>
          )}
          <div>
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">Padukuhan</span>
            <span className="text-sm text-text-strong">{complaint.padukuhan?.name ?? '—'}</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">Jenis</span>
            <span className="text-sm text-text-strong">{complaint.kind === 'PENGADUAN' ? 'Pengaduan' : 'Aspirasi'}</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">Kategori</span>
            <span className="text-sm text-text-strong">{complaint.category?.name ?? '—'}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block mb-2">Isi Pesan</span>
          <p className="text-sm text-text-body leading-relaxed bg-band rounded-xl p-4 border border-border">
            {complaint.message}
          </p>
        </div>

        {complaint.internalNotes && (
          <div className="pt-4 border-t border-border">
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block mb-2">Catatan Internal</span>
            <p className="text-sm text-text-body leading-relaxed">{complaint.internalNotes}</p>
          </div>
        )}
      </div>

      {/* Update status */}
      <UpdateStatusForm complaintId={complaint.id} currentStatus={complaint.status} />

      {/* Status history */}
      {complaint.history.length > 0 && (
        <div className="rounded-xl border border-border bg-white p-6">
          <h3 className="font-serif text-base font-bold text-navy-900 mb-4">Riwayat Status</h3>
          <div className="space-y-3">
            {complaint.history.map((entry) => (
              <div key={entry.id} className="flex items-start justify-between gap-4 p-3 rounded-xl bg-band border border-border text-xs">
                <div className="flex items-center gap-2">
                  {entry.fromStatus && <StatusBadge status={entry.fromStatus} />}
                  <span className="text-text-muted">→</span>
                  <StatusBadge status={entry.toStatus} />
                  {entry.note && <span className="text-text-body ml-2">— {entry.note}</span>}
                </div>
                <span className="text-text-muted shrink-0">
                  {new Date(entry.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
