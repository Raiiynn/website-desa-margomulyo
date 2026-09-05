import React from 'react';

export function Container({
  children,
  className = '',
  as: Component = 'div',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Component
      className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
