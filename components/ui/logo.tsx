import { cn } from '@/lib/cn';

type LogoProps = {
  className?: string;
  size?: number;
};

/**
 * Logo personal de Manuel Reis.
 * SVG vectorial con currentColor para que herede el color del texto.
 * viewBox original: 163.8 x 117.2 (ratio ~1.4:1)
 */
export function Logo({ className, size = 28 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size * (117.2 / 163.8)}
      viewBox="0 0 163.8 117.2"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-label="Manuel Reis"
    >
      <path d="M99.3,93.8l-2-4.9,1.8,4.5c0,.1.1.2.2.4Z" />
      <path d="M158.6,102.4L122.2,8.6c-.7-1.7-2.3-2.8-4.1-2.8h-41.4c0,.1,6.4,16.5,6.4,16.5,0,0,0,.2.1.3l32.3,83.2c.7,1.7,2.3,2.8,4.1,2.8h35c3.1,0,5.3-3.1,4.1-6Z" />
      <path d="M105,107.8h0s-3.9-9.7-3.9-9.7l-1.7-4.3c0-.1-.2-.2-.2-.3l-1.8-4.5L66.2,8.6c-.7-1.7-2.3-2.8-4.1-2.8H27.1c-3.1,0-5.3,3.1-4.1,6l20.1,51.8c.7,1.7-.6,3.5-2.4,3.5H9.6c-2.4,0-4.4,2-4.4,4.4v32.5c0,2.4,2,4.4,4.4,4.4h32.5c2.5,0,4.4-2,4.4-4.4v-23.5c0-1.7,2.3-2.1,2.9-.5l9.9,25.6c.7,1.7,2.3,2.8,4.1,2.8h41.7l-.3-.7Z" />
    </svg>
  );
}
