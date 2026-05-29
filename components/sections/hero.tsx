'use client';

import { useEffect, useRef } from 'react';
import { Logo } from '@/components/ui/logo';

/**
 * Hero — RADD style
 *
 * - Nav arriba: logo (izq) + menú pill con indicator deslizante (der)
 * - "MANUEL" gigante en Archivo Black ocupando el ancho
 * - Imagen cuadrada (placeholder) centrada sobre el texto, con drop shadow
 *   y hover (scale + rotate)
 * - Parallax sutil del título al mover el mouse
 * - Breathing del letter-spacing (CSS)
 */

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Parallax del título
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const hero = heroRef.current;
    const title = titleRef.current;
    if (!hero || !title) return;

    let targetX = 0,
      targetY = 0,
      currentX = 0,
      currentY = 0;
    let rafId = 0;

    function onMove(e: MouseEvent) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = -((e.clientX - cx) / cx) * 15;
      targetY = -((e.clientY - cy) / cy) * 8;
    }

    function animate() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (title) {
        title.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
      rafId = requestAnimationFrame(animate);
    }

    hero.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      hero.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Menú indicator deslizante
  function moveIndicator(target: HTMLElement) {
    const menu = menuRef.current;
    const indicator = indicatorRef.current;
    if (!menu || !indicator) return;
    const menuRect = menu.getBoundingClientRect();
    const linkRect = target.getBoundingClientRect();
    indicator.style.left = `${linkRect.left - menuRect.left}px`;
    indicator.style.width = `${linkRect.width}px`;
    indicator.style.opacity = '1';
  }

  function hideIndicator() {
    const indicator = indicatorRef.current;
    if (indicator) indicator.style.opacity = '0';
  }

  return (
    <section ref={heroRef} className="hero-radd" id="top">
      {/* NAV */}
      <header className="hero-radd__nav">
        <a href="#top" className="hero-radd__brand" data-cursor="hover">
          <Logo size={26} />
          <span>Manuel Reis</span>
        </a>

        <nav className="hero-radd__menu" ref={menuRef} onMouseLeave={hideIndicator}>
          <span className="hero-radd__menu-indicator" ref={indicatorRef} />
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor="hover"
              onMouseEnter={(e) => moveIndicator(e.currentTarget)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      {/* STAGE */}
      <div className="hero-radd__stage">
        <h1 className="hero-radd__title" ref={titleRef}>
          MANUEL
        </h1>

        <div className="hero-radd__image" data-cursor="view" data-cursor-label="Manuel">
          {/* Placeholder — reemplazar por <img> cuando haya foto */}
          <span className="hero-radd__image-icon">img</span>
          <span className="hero-radd__image-label">Placeholder — 1:1</span>
        </div>
      </div>
    </section>
  );
}
