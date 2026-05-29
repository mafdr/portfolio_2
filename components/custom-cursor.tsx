'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom Cursor
 *
 * - Arrow SVG (apunta a la izquierda) que sigue el mouse instantáneo
 * - Círculo outline alrededor con lerp (suavizado, 0.15)
 * - States según el atributo `data-cursor` del elemento bajo el mouse:
 *    - 'hover' → cambio sutil del círculo
 *    - 'link'  → círculo crece y se llena lime con blend-difference (botones)
 *    - 'view'  → círculo gigante con label "View" + flecha oculta (cards)
 *
 * Solo se activa en desktop (hover + fine pointer) y respeta reduced-motion.
 */
export function CustomCursor() {
  const arrowRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced) return;

    const arrow = arrowRef.current;
    const circle = circleRef.current;
    const label = labelRef.current;
    if (!arrow || !circle || !label) return;

    document.documentElement.classList.add('has-custom-cursor');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const circlePos = { x: mouse.x, y: mouse.y };
    let cursorVisible = false;
    let rafId = 0;

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!cursorVisible) {
        circle!.classList.remove('is-hidden');
        arrow!.classList.remove('is-hidden');
        cursorVisible = true;
      }
    }

    function onMouseLeave() {
      circle!.classList.add('is-hidden');
      arrow!.classList.add('is-hidden');
      cursorVisible = false;
    }

    function animate() {
      // Arrow: instantáneo. Mantenemos el scaleX(-1) para que apunte a la izquierda.
      arrow!.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%) scaleX(-1)`;

      // Círculo: lerp suavizado
      const lerp = 0.15;
      circlePos.x += (mouse.x - circlePos.x) * lerp;
      circlePos.y += (mouse.y - circlePos.y) * lerp;
      circle!.style.transform = `translate(${circlePos.x}px, ${circlePos.y}px) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    // Delegación: detectar [data-cursor] en todo el documento
    function onPointerOver(e: PointerEvent) {
      // Detección de tema oscuro: si el elemento (o un ancestro) marca fondo oscuro
      const darkZone = (e.target as HTMLElement).closest('[data-cursor-theme="dark"]');
      if (darkZone) {
        document.documentElement.classList.add('cursor-on-dark');
      } else {
        document.documentElement.classList.remove('cursor-on-dark');
      }

      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (!target) return;
      const state = target.getAttribute('data-cursor');
      circle!.classList.remove('is-hover', 'is-link', 'is-view', 'is-hide');
      document.documentElement.classList.remove(
        'cursor-state-hover', 'cursor-state-link', 'cursor-state-view', 'cursor-state-hide'
      );
      if (state === 'view') {
        const customLabel = target.getAttribute('data-cursor-label') || 'View';
        label!.textContent = customLabel;
      }
      circle!.classList.add(`is-${state}`);
      document.documentElement.classList.add(`cursor-state-${state}`);
    }

    function onPointerOut(e: PointerEvent) {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (!target) return;
      const related = (e.relatedTarget as HTMLElement | null)?.closest('[data-cursor]');
      if (related === target) return;
      circle!.classList.remove('is-hover', 'is-link', 'is-view', 'is-hide');
      document.documentElement.classList.remove(
        'cursor-state-hover', 'cursor-state-link', 'cursor-state-view', 'cursor-state-hide'
      );
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      document.documentElement.classList.remove('has-custom-cursor');
      document.documentElement.classList.remove('cursor-state-hover', 'cursor-state-link', 'cursor-state-view');
    };
  }, []);

  return (
    <>
      {/* Flecha orgánica apuntando a la izquierda */}
      <svg
        ref={arrowRef}
        className="cursor-arrow is-hidden"
        viewBox="0 0 32 32"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M27.5 4.8
             C 28.2 4.3, 28.9 4.8, 28.7 5.7
             L 22.5 26.5
             C 22.2 27.5, 21 27.6, 20.5 26.7
             L 16.5 19.8
             C 16.2 19.3, 15.7 19, 15.1 19
             L 6.5 18.2
             C 5.5 18.1, 5.2 16.9, 6 16.4 Z"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Círculo outline alrededor */}
      <div className="cursor-circle is-hidden" ref={circleRef} aria-hidden="true">
        <span className="cursor-circle__label" ref={labelRef}>
          View
        </span>
      </div>
    </>
  );
}
