import React from 'react';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-[10px] select-none';

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5 font-semibold',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-navy-900 text-white hover:bg-[#00172e] active:bg-[#001224] focus-visible:outline-blue-700 shadow-sm',
    secondary:
      'bg-blue-700 text-white hover:bg-[#0f6bb0] active:bg-[#01528b] focus-visible:outline-navy-900 shadow-sm',
    outline:
      'border border-border bg-white text-text-strong hover:bg-band hover:border-field-border active:bg-surface-tint focus-visible:outline-blue-700',
    gold:
      'bg-gold-600 text-white hover:bg-gold-750 active:bg-[#7b6028] focus-visible:outline-gold-600 shadow-sm',
    ghost:
      'text-blue-700 hover:bg-surface-tint active:bg-[#e4effa] focus-visible:outline-blue-700',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
