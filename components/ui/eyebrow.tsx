import { cn } from '@/lib/cn';

type EyebrowProps = {
  children: React.ReactNode;
  withDot?: boolean;
  className?: string;
};

export function Eyebrow({ children, withDot = false, className }: EyebrowProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2',
        'font-mono text-2xs uppercase tracking-widest text-fg-muted',
        className
      )}
    >
      {withDot && (
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
      )}
      {children}
    </div>
  );
}
