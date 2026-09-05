import React from 'react';

export type BadgeVariant = 'navy' | 'blue' | 'gold' | 'green' | 'muted' | 'outline';

export function Badge({
  children,
  variant = 'blue',
  className = '',
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  const variantStyles: Record<BadgeVariant, string> = {
    navy: 'bg-navy-900 text-white',
    blue: 'bg-surface-tint text-blue-700 border border-border-accent',
    gold: 'bg-gold-600/10 text-gold-750 border border-gold-600/30',
    green: 'bg-green-700/10 text-green-800 border border-green-700/30',
    muted: 'bg-[#f4f7fa] text-text-muted border border-border',
    outline: 'border border-border text-text-strong bg-white',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
