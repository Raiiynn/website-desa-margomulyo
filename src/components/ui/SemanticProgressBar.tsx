import React from 'react';

export interface SemanticProgressBarProps {
  label: string;
  percentage: number;
  description?: string;
  targetPercentage?: number;
  statusNote?: string;
  variant?: 'blue' | 'green' | 'gold';
  className?: string;
}

export function SemanticProgressBar({
  label,
  percentage,
  description,
  targetPercentage,
  statusNote,
  variant = 'blue',
  className = '',
}: SemanticProgressBarProps) {
  const colorMap = {
    blue: 'bg-blue-700',
    green: 'bg-green-700',
    gold: 'bg-gold-600',
  };

  const clampedPercent = Math.min(Math.max(percentage, 0), 100);

  return (
    <div
      className={`rounded-card border border-border bg-white p-6 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-text-strong tracking-tight">
            {label}
          </h4>
          {description && (
            <p className="mt-1 text-xs text-text-body">{description}</p>
          )}
        </div>
        <span className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
          {percentage}%
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className={`h-full transition-all duration-500 rounded-full ${colorMap[variant]}`}
          style={{ width: `${clampedPercent}%` }}
        />
      </div>

      {/* Contextual status note */}
      {(targetPercentage !== undefined || statusNote) && (
        <div className="mt-3 flex items-center justify-between flex-wrap gap-2 text-xs text-text-muted">
          {targetPercentage !== undefined && (
            <span>Target Tahapan: {targetPercentage}%</span>
          )}
          {statusNote && (
            <span className="font-medium text-green-800">{statusNote}</span>
          )}
        </div>
      )}
    </div>
  );
}
