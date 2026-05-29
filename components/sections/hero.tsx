'use client';

import { useRef } from 'react';
import { Logo } from '@/components/ui/logo';
import { SpinningCursor } from '@/components/spinning-cursor';
import { MorphingTitle } from '@/components/morphing-title';

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Hero() {
  const menuRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

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
    <section className="hero-radd" id="top">
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
        <MorphingTitle />

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
          <SpinningCursor text="MANUEL REIS · " repeat={2} />
        </div>
      </div>
    </section>
  );
}
