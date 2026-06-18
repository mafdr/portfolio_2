'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/logo';

/**
 * NavFloating
 *
 * Nav fijo (logo izq + menú der) que acompaña el scroll y adapta sus
 * colores al fondo de la sección visible:
 *  - 'lime'  → texto negro (hero, about)
 *  - 'light' → texto negro, menú con fondo oscuro translúcido (work, marquee)
 *  - 'dark'  → texto cream/lime (contact)
 *
 * En páginas de proyecto (/work/...) el primer item del menú cambia
 * de "Work" a "Home" y enlaza a la homepage.
 */

const HOME_ITEMS = [
  { label: 'Work',    href: '#work' },
  { label: 'About',   href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const PROJECT_ITEMS = [
  { label: 'Home',    href: '/' },
  { label: 'About',   href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

type Theme = 'lime' | 'light' | 'dark';

export function NavFloating() {
  const [theme, setTheme] = useState<Theme>('lime');
  const menuRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  const isProject = pathname.startsWith('/work/');
  const NAV_ITEMS = isProject ? PROJECT_ITEMS : HOME_ITEMS;

  useEffect(() => {
    const zones = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav-theme]')
    );
    if (!zones.length) return;

    function onScroll() {
      const probe = 80;
      let current: Theme = 'lime';
      for (const z of zones) {
        const rect = z.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) {
          current = (z.dataset.navTheme as Theme) || 'lime';
          break;
        }
      }
      setTheme(current);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
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

  return (
    <header className={`nav-float nav-float--${theme}`}>
      <a href="/" className="nav-float__brand" data-cursor="hover">
        <Logo size={40} />
        <span>Manuel Reis</span>
      </a>
      <nav className="nav-float__menu" ref={menuRef} onMouseLeave={hideIndicator}>
        <span className="nav-float__indicator" ref={indicatorRef} />
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            data-cursor="hover"
            onMouseEnter={(e) => moveIndicator(e.currentTarget)}
          >
            <span className="nav-float__label">{item.label}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
