'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Loader inicial
 * - Logo "M" se dibuja por trazos (stroke-dashoffset)
 * - Logo se llena con lime
 * - Cortina lime barre desde abajo, revela el sitio, sale por arriba
 * - Duración total: ~2s
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
      setIsDone(true);
      onComplete?.();
      return;
    }

    // ⚠️ Guard: verificar que todos los refs existen antes de animar
    const path1 = path1Ref.current;
    const path2 = path2Ref.current;
    const curtain = curtainRef.current;
    const loader = loaderRef.current;

    if (!path1 || !path2 || !curtain || !loader) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setIsDone(true);
        onComplete?.();
      },
    });

    tl.fromTo(
      [path1, path2],
      { strokeDashoffset: 400, fill: 'transparent' },
      {
        strokeDashoffset: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        stagger: 0.08,
      }
    );
    tl.to(
      [path1, path2],
      {
        fill: 'var(--accent)',
        duration: 0.25,
        ease: 'power2.out',
      },
      '-=0.2'
    );
    tl.to(
      curtain,
      {
        y: '0%',
        duration: 0.5,
        ease: 'power3.inOut',
      },
      '-=0.1'
    );
    tl.to(
      loader,
      {
        opacity: 0,
        duration: 0.2,
        pointerEvents: 'none',
      },
      '-=0.35'
    );
    tl.to(
      curtain,
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
