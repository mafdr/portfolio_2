import { cn } from '@/lib/cn';

const DOT_COLORS = {
  default: 'bg-accent',
  cycling: 'bg-lime-500',
  reading: 'bg-accent-blue',
  gaming:  'bg-accent-purple',
  clay:    'bg-accent-clay',
} as const;

type PillProps = {
  children: React.ReactNode;
  variant?: keyof typeof DOT_COLORS;
  dot?: boolean;
  className?: string;
};

export function Pill({ children, variant = 'default', dot = false, className }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 bg-bg-surface text-fg',
        'border border-border rounded-full',
        'px-4 py-2 text-sm font-medium',
        className
      )}
    >
      {dot && (
        <span
          className={cn('w-2 h-2 rounded-full', DOT_COLORS[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
