'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-sans font-semibold leading-none rounded-full transition-all duration-fast ease-out-expo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-40 disabled:cursor-not-allowed';

    const variants = {
      primary:   'bg-accent text-fg-on-accent hover:bg-accent-hover active:bg-accent-press',
      secondary: 'bg-transparent text-fg border border-border-strong hover:bg-bg-muted',
      ghost:     'bg-transparent text-fg hover:bg-bg-muted',
      dark:      'bg-bg-inverse text-fg-inverse hover:bg-neutral-800',
    };

    const sizes = {
      sm: 'text-xs px-4 py-2',
      md: 'text-sm px-5 py-3',
      lg: 'text-base px-6 py-4',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
