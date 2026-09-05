import React from 'react';
import {
  DEMOGRAPHICS,
  STATISTICS_SOURCE_LABEL,
  formatNumber,
} from '@/data/fixtures';

export function StatStrip({ className = '' }: { className?: string }) {
  const stats = [
    {
      label: 'Jumlah Penduduk',
      value: formatNumber(DEMOGRAPHICS.totalPopulation),
      unit: 'Jiwa',
      note: `${formatNumber(DEMOGRAPHICS.malePopulation)} L / ${formatNumber(DEMOGRAPHICS.femalePopulation)} P`,
    },
    {
      label: 'Kepala Keluarga',
      value: formatNumber(DEMOGRAPHICS.households),
      unit: 'KK',
      note: 'Warga Terdata',
    },
    {
      label: 'Wilayah Padukuhan',
      value: DEMOGRAPHICS.padukuhanCount.toString(),
      unit: 'Padukuhan',
      note: `${DEMOGRAPHICS.rwCount} Rukun Warga (RW)`,
    },
    {
      label: 'Luas Kalurahan',
      value: DEMOGRAPHICS.areaHectares.replace('.', ','),
      unit: 'Hektar',
      note: 'Sleman Bagian Barat',
    },
  ];

  return (
    <div
      className={`relative z-20 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="rounded-[12px] border border-border bg-white p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,36,70,0.06)]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col ${idx > 0 ? 'sm:pl-6 lg:pl-8' : ''} ${
                idx > 1 ? 'pt-4 sm:pt-0' : ''
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                {stat.label}
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-navy-900">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-blue-700">
                  {stat.unit}
                </span>
              </div>
              <span className="mt-1 text-xs text-text-body">{stat.note}</span>
            </div>
          ))}
        </div>

        {/* Mandatory Provenance Line per SOURCE_DATA §6 Rule 4 */}
        <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex items-center justify-between flex-wrap gap-2 text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full bg-green-700"
              aria-hidden="true"
            />
            <span>{STATISTICS_SOURCE_LABEL}</span>
          </div>
          <span className="text-[11px] text-text-muted">Data Resmi Kalurahan</span>
        </div>
      </div>
    </div>
  );
}
