import React from 'react';

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  badge?: string;
  isCompleted?: boolean;
  isCurrent?: boolean;
}

export function NumberedProcessRow({
  steps,
  className = '',
}: {
  steps: ProcessStep[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        const numStr = String(step.number).padStart(2, '0');

        return (
          <div
            key={step.number}
            className={`relative rounded-[12px] border p-6 flex flex-col justify-between transition-all duration-200 bg-white ${
              isLast
                ? 'border-gold-600/40 shadow-sm'
                : step.isCurrent
                ? 'border-blue-700 shadow-sm'
                : 'border-border'
            }`}
          >
            <div>
              {/* Step indicator and badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span
                  className={`font-serif text-2xl font-bold ${
                    isLast
                      ? 'text-gold-750'
                      : step.isCurrent
                      ? 'text-blue-700'
                      : 'text-text-muted'
                  }`}
                >
                  {numStr}
                </span>
                {step.badge && (
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isLast
                        ? 'bg-gold-600/15 text-gold-750'
                        : step.isCurrent
                        ? 'bg-surface-tint text-blue-700'
                        : 'bg-[#f1f5f9] text-text-muted'
                    }`}
                  >
                    {step.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h4 className="text-base font-semibold text-text-strong tracking-tight">
                {step.title}
              </h4>

              {/* Description */}
              <p className="mt-2 text-xs text-text-body leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
