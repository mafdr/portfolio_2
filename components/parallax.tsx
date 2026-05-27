'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Parallax
 *
 * Mueve un elemento en Y a medida que el contenedor scrollea por el viewport.
 *
 * strength positivo → sube al hacer scroll hacia abajo
 * strength negativo → baja al hacer scroll hacia abajo
 *
 * Para crear DEPTH real: pon dos Parallax con strengths opuestos en el mismo
 * card (ej. uno con 0.5 y otro con -0.5).
 *
 * Uso:
 *   <div className="card">
 *     <Parallax strength={-0.5}>
 *       <span>01</span>
 *     </Parallax>
 *     <Parallax strength={0.6}>
 *       <span>2024</span>
 *     </Parallax>
 *   </div>
 */
export function Parallax({
  children,
  strength = 0.4,
  triggerSelector,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  /** Selector del elemento que actúa como trigger (default: el contenedor padre). */
  triggerSelector?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    const trigger = triggerSelector
      ? (el.closest(triggerSelector) as HTMLElement | null)
      : (el.parentElement as HTMLElement | null);
    if (!trigger) return;

    const anim = gsap.fromTo(
      el,
      { yPercent: strength * 50 },
      {
        yPercent: -strength * 50,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      }
    );

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === trigger) st.kill();
      });
    };
  }, [strength, triggerSelector]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', willChange: 'transform' }}
    >
      {children}
    </span>
  );
}
