'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom Cursor
 *
 * - Dot pequeño que sigue al mouse de forma instantánea
 * - Círculo grande con lerp (suavizado, 0.15)
 * - States según el atributo `data-cursor` del elemento bajo el mouse:
 *    - 'hover' → círculo crece ligero, fondo translúcido
 *    - 'link'  → círculo crece, fondo lime con blend-difference (ideal para botones)
 *    - 'view'  → círculo gigante con label "View" (para project cards)
 *
 * Solo se activa en desktop (hover + fine pointer) y respeta reduced-motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced) return;

    const dot = dotRef.current;
    const circle = circleRef.current;
    const label = labelRef.current;
    if (!dot || !circle || !label) return;

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
        cursorVisible = true;
      }
    }

    function onMouseLeave() {
      circle!.classList.add('is-hidden');
      cursorVisible = false;
    }

    function animate() {
      // Dot: instantáneo
      dot!.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;

      // Círculo: lerp
      const lerp = 0.15;
      circlePos.x += (mouse.x - circlePos.x) * lerp;
      circlePos.y += (mouse.y - circlePos.y) * lerp;
      circle!.style.transform = `translate(${circlePos.x}px, ${circlePos.y}px) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    // Delegación de eventos: detectar [data-cursor] sin tener que añadir listener a cada uno
    function onPointerOver(e: PointerEvent) {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (!target) return;
      const state = target.getAttribute('data-cursor');
      circle!.classList.remove('is-hover', 'is-link', 'is-view');
      if (state === 'view') {
        const customLabel = target.getAttribute('data-cursor-label') || 'View';
        label!.textContent = customLabel;
      }
      circle!.classList.add(`is-${state}`);
    }

    function onPointerOut(e: PointerEvent) {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (!target) return;
      const related = (e.relatedTarget as HTMLElement | null)?.closest('[data-cursor]');
      if (related === target) return; // todavía dentro
      circle!.classList.remove('is-hover', 'is-link', 'is-view');
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
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-circle is-hidden" ref={circleRef} aria-hidden="true">
        <span className="cursor-circle__label" ref={labelRef}>
          View
        </span>
      </div>
    </>
  );
}
