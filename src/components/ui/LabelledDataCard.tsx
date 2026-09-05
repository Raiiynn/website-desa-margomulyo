import React from 'react';
import Link from 'next/link';
import { Badge } from './Badge';
import { ArrowRight } from './Icons';

export interface LabelledDataCardProps {
  title: string;
  category?: string;
  description: string;
  badge?: string;
  code?: string | null;
  items?: Array<{
    label: string;
    value: string;
  }>;
  href?: string;
  actionLabel?: string;
  className?: string;
}

export function LabelledDataCard({
  title,
  category,
  description,
  badge,
  code,
  items = [],
  href,
  actionLabel = 'Lihat Persyaratan & Alur',
  className = '',
}: LabelledDataCardProps) {
  return (
    <div
      className={`flex flex-col justify-between rounded-[12px] border border-border bg-white p-6 transition-all duration-200 hover:border-field-border hover:shadow-[0_4px_20px_-4px_rgba(0,36,70,0.06)] ${className}`}
    >
      <div>
        {/* Header row: category + badge / code */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {category && (
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
              {category}
            </span>
          )}
          <div className="flex items-center gap-2">
            {code && (
              <span className="font-mono text-[11px] text-text-muted bg-band px-2 py-0.5 rounded border border-[#e2e8f0]">
                {code}
              </span>
            )}
            {badge && <Badge variant="green">{badge}</Badge>}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-text-strong tracking-tight group-hover:text-blue-700 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-text-body leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Labelled key-value pairs (persyaratan, durasi, dll) */}
        {items.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[#f1f5f9] space-y-2 text-xs">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-start justify-between gap-3 text-xs"
              >
                <span className="text-text-muted font-medium shrink-0">
                  {item.label}
                </span>
                <span className="text-text-strong text-right font-medium truncate max-w-[200px]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer action link */}
      {href && (
        <div className="mt-6 pt-4 border-t border-[#f1f5f9]">
          <Link
            href={href}
            className="group/link inline-flex items-center justify-between w-full text-xs font-semibold text-blue-700 hover:text-navy-900 transition-colors"
          >
            <span>{actionLabel}</span>
            <ArrowRight
              size={14}
              className="transition-transform group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      )}
    </div>
  );
}
