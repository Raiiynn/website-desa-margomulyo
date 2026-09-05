import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import {
  INSTITUTIONS,
  TYPED_LEADERSHIP_TERMS,
  OFFICIALS,
} from '@/data/fixtures';
import { ShieldCheck, CheckCircle } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Pemerintahan Desa',
  description:
    'Struktur organisasi Pamong Kalurahan Margomulyo, Badan Permusyawaratan Kalurahan (BPKal), Lembaga Kemasyarakatan, serta garis sejarah kepemimpinan.',
};

export default function PemerintahanPage() {
  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Breadcrumbs items={[{ label: 'Pemerintahan' }]} />

        {/* Page Header */}
        <div className="mt-4 max-w-3xl mb-12">
          <Badge variant="blue" className="mb-3">
            Pemerintahan & Pamong
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Pemerintahan Kalurahan Margomulyo
          </h1>
          <p className="mt-4 text-base text-text-body leading-relaxed">
            Susunan aparatur pamong kalurahan, seksi keprajan, lembaga
            kemasyarakatan kalurahan (LKK), Badan Permusyawaratan Kalurahan
            (BPKal), serta jejak sejarah lurah yang pernah memimpin Margomulyo.
          </p>
        </div>

        {/* 1. Pamong Kalurahan (Struktur Organisasi) */}
        <div className="mb-20">
          <SectionHeader
            eyebrow="Struktur Organisasi"
            title="Pamong Kalurahan Margomulyo"
            description="Aparatur penyelenggara pemerintahan desa berdasarkan tugas pokok dan fungsi tata kelola Keistimewaan Sleman."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFICIALS.map((official) => {
              const isLurah = official.kind === 'LURAH';
              const isNamed = official.name !== null;

              return (
                <div
                  key={official.positionTitle}
                  className={`rounded-card border p-6 flex flex-col justify-between bg-white transition-all ${
                    isLurah
                      ? 'border-navy-900 bg-band shadow-sm md:col-span-2 lg:col-span-3'
                      : 'border-border hover:border-field-border'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                        {official.positionAlias ?? official.kind}
                      </span>
                      {isLurah && <Badge variant="gold">Petahana 2021–2027</Badge>}
                    </div>

                    <h3 className={`font-bold text-navy-900 ${isLurah ? 'text-xl' : 'text-base'}`}>
                      {official.positionTitle}
                    </h3>

                    <div className="mt-2 text-sm font-semibold">
                      {isNamed ? (
                        <span className="text-green-700 font-medium flex items-center gap-1.5">
                          <CheckCircle size={15} />
                          <span>{official.name}</span>
                        </span>
                      ) : (
                        <span className="text-text-muted italic font-normal text-xs">
                          Pejabat Definitif Terverifikasi Kalurahan
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-xs text-text-body leading-relaxed">
                      {official.remit}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-text-muted">
                    <span>Kantor Balai Kalurahan</span>
                    <span>Seyegan, Sleman</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Lembaga Kemasyarakatan Kalurahan & BPKal */}
        <div className="mb-20">
          <SectionHeader
            eyebrow="Mitra Pembangunan"
            title="Lembaga Kalurahan & Kemitraan Warga"
            description="Badan Permusyawaratan Kalurahan (BPKal) dan Lembaga Kemasyarakatan Kalurahan (LKK) yang aktif mendampingi pamong."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSTITUTIONS.map((inst) => (
              <div
                key={inst.slug}
                className="rounded-card border border-border bg-white p-6 flex flex-col justify-between hover:border-field-border hover:shadow-sm transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
                    <span>{inst.kind}</span>
                    <Badge variant={inst.kind === 'BPKAL' ? 'gold' : 'blue'}>
                      {inst.alias ?? inst.kind}
                    </Badge>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-navy-900 tracking-tight">
                    {inst.name}
                  </h3>

                  <p className="mt-3 text-xs text-text-body leading-relaxed">
                    {inst.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-border text-xs text-green-800 font-medium flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  <span>Mitra Resmi Musrenbang Kalurahan</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Sejarah Kepemimpinan Lurah (Pattern P15 · Vertical timeline) */}
        <div className="mb-12">
          <SectionHeader
            eyebrow="Rekam Jejak"
            title="Garis Kepemimpinan Lurah Margomulyo"
            description="Daftar nama pemimpin Kalurahan Margomulyo sejak masa kemerdekaan tahun 1946 hingga masa jabatan petahana."
          />

          <div className="max-w-3xl mx-auto rounded-card border border-border bg-white p-6 sm:p-10 shadow-sm">
            <div className="relative border-l-2 border-border-accent ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
              {TYPED_LEADERSHIP_TERMS.map((term) => (
                <div key={term.sortOrder} className="relative group">
                  {/* Timeline dot */}
                  <span
                    className={`absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm ${
                      term.isIncumbent
                        ? 'bg-gold-600 ring-4 ring-gold-600/20'
                        : 'bg-blue-700'
                    }`}
                    aria-hidden="true"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-navy-900">
                        {term.name}
                      </h3>
                      <p className="text-xs text-text-body mt-0.5">
                        {term.description}
                      </p>
                    </div>

                    <div className="shrink-0 pt-1 sm:pt-0">
                      <span
                        className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full ${
                          term.isIncumbent
                            ? 'bg-gold-600/15 text-gold-750 border border-gold-600/30'
                            : 'bg-band text-text-muted'
                        }`}
                      >
                        {term.startYear} – {term.endYear}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
