'use client';

import { useEffect, useRef } from 'react';
import { Logo } from '@/components/ui/logo';

/**
 * Hero — RADD style
 *
 * - Nav: logo (izq, grande) + menú pill con indicator deslizante (der)
 * - "MANUEL" gigante en Archivo Black
 * - Imagen cuadrada (hero_image_1) que cambia a hero_image_2 en hover
 * - Spinning text "MANUEL REIS ·" girando sobre la imagen en hover
 * - Parallax sutil del título al mover el mouse
 */

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

// Texto para el spinning circle
const SPIN_TEXT = 'MANUEL REIS · MANUEL REIS · ';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const hero = heroRef.current;
    const title = titleRef.current;
    if (!hero || !title) return;

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0, rafId = 0;

    function onMove(e: MouseEvent) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = -((e.clientX - cx) / cx) * 15;
      targetY = -((e.clientY - cy) / cy) * 8;
    }
    function animate() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (title) title.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafId = requestAnimationFrame(animate);
    }
    hero.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(animate);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

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

  // Construir las letras del spinning text en círculo
  const chars = SPIN_TEXT.split('');
  const anglePerChar = 360 / chars.length;

  return (
    <section ref={heroRef} className="hero-radd" id="top">
      <header className="hero-radd__nav">
        <a href="#top" className="hero-radd__brand" data-cursor="hover">
          <Logo size={44} />
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

      <div className="hero-radd__stage">
        <h1 className="hero-radd__title" ref={titleRef}>
          MANUEL
        </h1>

        <div className="hero-radd__image" data-cursor="hide">
          <img
            src="/hero_image_1.jpg"
            alt="Manuel Reis"
            className="hero-radd__img hero-radd__img--base"
          />
          <img
            src="/hero_image_2.jpg"
            alt="Manuel Reis"
            className="hero-radd__img hero-radd__img--hover"
          />

          {/* Spinning text que aparece en hover */}
          <div className="hero-radd__spin" aria-hidden="true">
            <div className="hero-radd__spin-inner">
              {chars.map((char, i) => (
                <span
                  key={i}
                  style={{
                    transform: `rotate(${i * anglePerChar}deg)`,
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
