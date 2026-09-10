import React from 'react';
import Link from 'next/link';
import { ArrowRight } from './Icons';

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
  align?: 'left' | 'center';
  eyebrowColor?: 'blue' | 'gold';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  linkHref,
  linkLabel,
  align = 'left',
  eyebrowColor = 'blue',
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12 ${className}`}
    >
      <div className={`max-w-2xl ${isCenter ? 'mx-auto text-center' : ''}`}>
        {/* Eyebrow label. The concept's P01 triad puts a short rule before this
            label; it is deliberately dropped in production — see
            docs/DESIGN_REFERENCE.md §7. Not a heading (§5, A-level outline
            rule): the serif <h2> below owns the section's place in the outline. */}
        <p
          className={`text-xs font-semibold tracking-wider uppercase mb-3 ${
            eyebrowColor === 'gold' ? 'text-gold-750' : 'text-blue-700'
          }`}
        >
          {eyebrow}
        </p>

        {/* Serif headline */}
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-navy-900 tracking-tight leading-tight">
          {title}
        </h2>

        {/* Sans deck / description */}
        {description && (
          <p className="mt-3 text-base text-text-body leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Optional right-aligned link */}
      {linkHref && linkLabel && (
        <div className="shrink-0 pt-2 md:pt-0">
          <Link
            href={linkHref}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-navy-900 transition-colors"
          >
            <span>{linkLabel}</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      )}
    </div>
  );
}
