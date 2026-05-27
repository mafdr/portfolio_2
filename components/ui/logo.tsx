import { cn } from '@/lib/cn';

type LogoProps = {
  className?: string;
  size?: number;
};

export function Logo({ className, size = 28 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 100 70"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-label="Manuel Reis"
    >
      {/* Stylized "M" — basado en logo principal de Manuel */}
      <path d="M5 65 L 25 5 L 38 5 L 58 65 L 47 65 L 32 22 L 17 65 Z" />
      <path d="M55 65 L 75 5 L 95 5 L 95 65 L 85 65 L 85 25 L 70 65 Z" />
    </svg>
  );
}
