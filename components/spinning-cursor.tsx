'use client';

import { useRef, useEffect } from 'react';

/**
 * SpinningCursor
 *
 * Texto curvo (en círculo) que gira en loop y SIGUE al cursor dentro
 * de su contenedor padre. Sin fondo — solo el texto lime.
 *
 * Uso: poner dentro de un contenedor position:relative.
 * Se activa con la clase 'is-active' en el contenedor padre (via hover).
 *
 * El componente escucha mousemove en su parentElement y se posiciona
 * siguiendo el cursor. Al salir, el contenedor padre quita 'is-active'.
 */
export function SpinningCursor({
  text = 'MANUEL REIS · ',
  repeat = 2,
}: {
  text?: string;
  repeat?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    let targetX = 0, targetY = 0, curX = 0, curY = 0, rafId = 0;
    let active = false;

    function onMove(e: MouseEvent) {
      const rect = parent!.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (!active) {
        // Snap inmediato al entrar para que no "vuele" desde una esquina
        curX = targetX;
        curY = targetY;
        active = true;
      }
    }
    function onEnter() {
      el!.style.opacity = '1';
    }
    function onLeave() {
      el!.style.opacity = '0';
      active = false;
    }

    function animate() {
      curX += (targetX - curX) * 0.18;
      curY += (targetY - curY) * 0.18;
      if (el) el.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    }

    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseenter', onEnter);
    parent.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseenter', onEnter);
      parent.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const full = text.repeat(repeat);
  const chars = full.split('');
  const anglePerChar = 360 / chars.length;

  return (
    <div className="spin-cursor" ref={ref} aria-hidden="true">
      <div className="spin-cursor__rotor">
        {chars.map((char, i) => (
          <span key={i} style={{ transform: `rotate(${i * anglePerChar}deg)` }}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
