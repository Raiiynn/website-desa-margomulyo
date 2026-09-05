'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { DEVELOPMENT_PROJECTS, formatRupiah } from '@/data/fixtures';
import { MapPin } from '@/components/ui/Icons';

type ProjectFilter = 'ALL' | 'COMPLETED' | 'IN_PROGRESS' | 'PLANNED';

export default function PembangunanPage() {
  const [filter, setFilter] = useState<ProjectFilter>('ALL');

  const filteredProjects = DEVELOPMENT_PROJECTS.filter((p) => {
    if (filter === 'ALL') return true;
    return p.status === filter;
  });

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Transparansi', href: '/transparansi' },
            { label: 'Proyek Pembangunan' },
          ]}
        />

        {/* Page Header */}
        <div className="mt-4 max-w-3xl mb-12">
          <Badge variant="blue" className="mb-3">
            Infrastruktur & Swakelola Warga
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Paket Kegiatan Pembangunan Fisik
          </h1>
          <p className="mt-4 text-base text-text-body leading-relaxed">
            Pengawasan pelaksanaan proyek infrastruktur desa TA 2026. Seluruh
            pekerjaan dilaksanakan secara transparan oleh Tim Pelaksana Kegiatan
            (TPK) bersama masyarakat di masing-masing padukuhan.
          </p>
        </div>

        {/* Filter Chips (Pattern P10) */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 whitespace-nowrap">
          {[
            { key: 'ALL', label: 'Semua Proyek' },
            { key: 'COMPLETED', label: 'Tuntas Selesai (100%)' },
            { key: 'IN_PROGRESS', label: 'Sedang Berjalan' },
            { key: 'PLANNED', label: 'Direncanakan' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key as ProjectFilter)}
              className={`px-4 py-2 rounded-card text-xs font-semibold transition-all ${
                filter === item.key
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white text-text-body border border-border hover:bg-band'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Project Tracker Cards Grid (Pattern P10) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {filteredProjects.map((project) => {
            const isCompleted = project.status === 'COMPLETED';
            const isPlanned = project.status === 'PLANNED';

            return (
              <div
                key={project.code}
                className={`rounded-card border bg-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 ${
                  isCompleted
                    ? 'border-green-700/30 hover:border-green-700'
                    : 'border-border hover:border-field-border hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Code and Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-surface-tint px-2.5 py-1 rounded border border-border-accent">
                      {project.code}
                    </span>

                    <Badge
                      variant={
                        isCompleted ? 'green' : isPlanned ? 'muted' : 'blue'
                      }
                    >
                      {project.status === 'COMPLETED'
                        ? 'Tuntas 100%'
                        : project.status === 'IN_PROGRESS'
                        ? 'Sedang Berjalan'
                        : 'Direncanakan'}
                    </Badge>
                  </div>

                  <h2 className="font-serif text-xl font-bold text-navy-900 leading-snug">
                    {project.title}
                  </h2>

                  <p className="mt-2 text-xs text-text-body leading-relaxed">
                    {project.description}
                  </p>

                  {/* Lokasi & Anggaran */}
                  <div className="mt-5 pt-4 border-t border-border space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted flex items-center gap-1.5">
                        <MapPin size={14} className="text-blue-700" />
                        <span>Lokasi:</span>
                      </span>
                      <span className="font-semibold text-text-strong text-right">
                        {project.locationLabel}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Alokasi Anggaran:</span>
                      <span className="font-mono font-bold text-navy-900">
                        {formatRupiah(project.budgetAmount)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Pelaksana Kegiatan:</span>
                      <span className="font-semibold text-text-strong">
                        Tim Pelaksana Kegiatan (TPK)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar Track */}
                <div className="mt-6 pt-4 border-t border-border space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-text-muted">Kemajuan Fisik:</span>
                    <span
                      className={`font-mono text-sm ${
                        isCompleted
                          ? 'text-green-800'
                          : isPlanned
                          ? 'text-text-muted'
                          : 'text-blue-700'
                      }`}
                    >
                      {project.physicalProgress}%
                    </span>
                  </div>

                  <div className="h-2 w-full bg-band rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-green-700'
                          : isPlanned
                          ? 'bg-[#cbd5e1]'
                          : 'bg-blue-700'
                      }`}
                      style={{ width: `${project.physicalProgress}%` }}
                    />
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[11px] text-text-muted">
                    <span>Sumber Dana: {project.fundingSourceLabel}</span>
                    <span>Tahun Anggaran 2026</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
