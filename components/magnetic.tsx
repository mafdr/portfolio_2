'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Magnetic
 *
 * Wrapper que hace que el elemento "persiga" al cursor cuando está cerca.
 * Cuando el mouse sale, vuelve con un easing elástico.
 *
 * Uso:
 *   <Magnetic strength={0.4}>
 *     <button>Hover me</button>
 *   </Magnetic>
 *
 * strength: 0–1. 0.3 = sutil, 0.5 = notorio, 0.7+ = exagerado.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced) return;

    const wrap = wrapRef.current;
    if (!wrap) return;

    const inner = wrap.firstElementChild as HTMLElement | null;

    function onMouseMove(e: MouseEvent) {
      const rect = wrap!.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(wrap!, {
        x: x * strength,
        y: y * strength,
        duration: 0.6,
        ease: 'power3.out',
      });
      if (inner) {
        gsap.to(inner, {
          x: x * strength * 0.5,
          y: y * strength * 0.5,
          duration: 0.6,
          ease: 'power3.out',
        });
      }
    }

    function onMouseLeave() {
      gsap.to(wrap!, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });
      if (inner) {
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
        });
      }
    }

    wrap.addEventListener('mousemove', onMouseMove);
    wrap.addEventListener('mouseleave', onMouseLeave);

    return () => {
      wrap.removeEventListener('mousemove', onMouseMove);
      wrap.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength]);

  return (
    <span
      ref={wrapRef}
      className={className}
      style={{ display: 'inline-block', willChange: 'transform' }}
    >
      {children}
    </span>
  );
}
