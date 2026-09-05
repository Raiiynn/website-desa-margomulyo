import React from 'react';
import { HelpCircle } from './Icons';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`rounded-[12px] border border-dashed border-field-border bg-band p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto ${className}`}
    >
      <div className="h-12 w-12 rounded-full bg-border text-text-muted flex items-center justify-center mb-4">
        <HelpCircle size={24} />
      </div>
      <h3 className="text-base font-semibold text-text-strong tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-xs text-text-body max-w-md leading-relaxed">
        {description}
      </p>
      {actionLabel && actionHref && (
        <div className="mt-6">
          <Button href={actionHref} size="sm" variant="outline">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
