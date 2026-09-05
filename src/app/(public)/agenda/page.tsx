import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { AGENDA, formatDateIndonesian } from '@/data/fixtures';
import { Calendar, MapPin } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Agenda Kalurahan',
  description:
    'Jadwal dan agenda kegiatan resmi Pemerintah Kalurahan Margomulyo, Seyegan, Sleman.',
};

export default function AgendaPage() {
  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Breadcrumbs items={[{ label: 'Agenda Kegiatan' }]} />

        {/* Page Header */}
        <div className="mt-4 max-w-3xl mb-12">
          <Badge variant="gold" className="mb-3">
            Jadwal Resmi Desa
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Agenda Kegiatan Kalurahan
          </h1>
          <p className="mt-4 text-base text-text-body leading-relaxed">
            Daftar agenda kegiatan kemasyarakatan, evaluasi desa budaya, rapat
            koordinasi pamong, serta jadwal musyawarah perencanaan pembangunan.
          </p>
        </div>

        {/* Agenda Cards List */}
        <div className="max-w-3xl space-y-6 mb-20">
          {AGENDA.map((item) => (
            <div
              key={item.slug}
              className="rounded-card border border-border bg-white p-6 sm:p-8 hover:border-field-border hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 text-xs text-blue-700 font-semibold mb-3">
                <Badge variant="blue">{item.label ?? 'Agenda Resmi'}</Badge>
                <span className="flex items-center gap-1 text-text-muted">
                  <Calendar size={14} />
                  <span>{formatDateIndonesian(item.startsAt)}</span>
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-900">
                {item.title}
              </h2>

              {item.location && (
                <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
                  <MapPin size={15} className="text-blue-700" />
                  <span>Lokasi: {item.location}</span>
                </div>
              )}

              {item.description && (
                <p className="mt-4 text-sm text-text-body leading-relaxed pt-3 border-t border-border">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
