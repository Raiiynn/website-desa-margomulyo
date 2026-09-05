import React from 'react';
import Link from 'next/link';
import { ChevronRight } from './Icons';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  className = '',
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs text-text-muted py-3 overflow-x-auto whitespace-nowrap ${className}`}
    >
      <ol className="flex items-center gap-1.5 list-none m-0 p-0">
        <li>
          <Link
            href="/"
            className="hover:text-blue-700 transition-colors focus-visible:outline-2"
          >
            Beranda
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronRight size={14} className="text-text-muted" />
              {isLast || !item.href ? (
                <span
                  className="font-medium text-text-strong"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-blue-700 transition-colors focus-visible:outline-2"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
