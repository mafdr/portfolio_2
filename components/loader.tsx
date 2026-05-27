'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Loader inicial
 * - Logo "M" se dibuja por trazos (stroke-dashoffset)
 * - Logo se llena con lime
 * - Cortina lime barre desde abajo, revela el sitio, sale por arriba
 * - Duración total: ~2s
 *
 * Bloquea scroll mientras carga. Se desmonta al terminar.
 * Respeta prefers-reduced-motion.
 */
export function Loader({ onComplete }: { onComplete?: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      // Sin animación: ocultar de inmediato
      setIsDone(true);
      onComplete?.();
      return;
    }

    // Bloquear scroll mientras dura el loader
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setIsDone(true);
        onComplete?.();
      },
    });

    // Logo paths se dibujan
    tl.fromTo(
      [path1Ref.current, path2Ref.current],
      { strokeDashoffset: 400, fill: 'transparent' },
      {
        strokeDashoffset: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        stagger: 0.08,
      }
    );
    // Logo se llena
    tl.to(
      [path1Ref.current, path2Ref.current],
      {
        fill: 'var(--accent)',
        duration: 0.25,
        ease: 'power2.out',
      },
      '-=0.2'
    );
    // Cortina sube
    tl.to(
      curtainRef.current,
      {
        y: '0%',
        duration: 0.5,
        ease: 'power3.inOut',
      },
      '-=0.1'
    );
    // Loader fade
    tl.to(
      loaderRef.current,
      {
        opacity: 0,
        duration: 0.2,
        pointerEvents: 'none',
      },
      '-=0.35'
    );
    // Cortina sale
    tl.to(
      curtainRef.current,
      {
        y: '-100%',
        duration: 0.65,
        ease: 'power3.inOut',
      },
      '+=0.05'
    );

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <>
      <div className="loader" ref={loaderRef}>
        <svg className="loader__logo" viewBox="0 0 100 70">
          <path
            ref={path1Ref}
            d="M5 65 L 25 5 L 38 5 L 58 65 L 47 65 L 32 22 L 17 65 Z"
          />
          <path
            ref={path2Ref}
            d="M55 65 L 75 5 L 95 5 L 95 65 L 85 65 L 85 25 L 70 65 Z"
          />
        </svg>
      </div>
      <div className="loader__curtain" ref={curtainRef} />
    </>
  );
}
