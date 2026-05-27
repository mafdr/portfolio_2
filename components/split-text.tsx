'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SplitText
 *
 * Envuelve cada palabra en spans y las anima desde y:110% a 0 con stagger.
 * Trigger: cuando entra al viewport (con scroll).
 *
 * Uso:
 *   <SplitText as="p" className="text-3xl">
 *     Tu párrafo aquí.
 *   </SplitText>
 *
 * Soporta <strong> y <em> dentro del texto, preservándolos.
 */
type SplitTextProps = {
  children: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div';
  className?: string;
  /** Delay base antes de empezar (s). Default 0. */
  delay?: number;
  /** Tiempo entre palabras (s). Default 0.025. */
  stagger?: number;
  /** Duración de cada palabra (s). Default 0.8. */
  duration?: number;
  /** Si true, dispara inmediatamente sin esperar scroll. */
  immediate?: boolean;
};

export function SplitText({
  children,
  as = 'p',
  className,
  delay = 0,
  stagger = 0.025,
  duration = 0.8,
  immediate = false,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as any;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      // Sin animación: mostrar el texto tal cual
      el.innerHTML = children;
      return;
    }

    // Tokenizar preservando <strong> y <em>
    const html = children;
    const placeholders: { tag: string; content: string }[] = [];
    let counter = 0;

    const stripped = html.replace(
      /<(strong|em)>(.*?)<\/\1>/g,
      (_m, tag, content) => {
        placeholders.push({ tag, content });
        return `|||TAG${counter++}|||`;
      }
    );

    const tokens = stripped.split(/(\s+)/);
    const wrapped = tokens
      .map((t) => {
        if (/^\s+$/.test(t) || t === '') return t;
        const placeholderMatch = t.match(/\|\|\|TAG(\d+)\|\|\|/);
        if (placeholderMatch) {
          const ph = placeholders[parseInt(placeholderMatch[1])];
          const innerWords = ph.content.split(/(\s+)/);
          const innerWrapped = innerWords
            .map((w) =>
              /^\s+$/.test(w) || w === ''
                ? w
                : `<span class="split-word"><span class="split-word__inner">${w}</span></span>`
            )
            .join('');
          return `<${ph.tag}>${innerWrapped}</${ph.tag}>`;
        }
        return `<span class="split-word"><span class="split-word__inner">${t}</span></span>`;
      })
      .join('');

    el.innerHTML = wrapped;

    const words = el.querySelectorAll<HTMLElement>('.split-word__inner');
    gsap.set(words, { y: '110%' });

    const anim = gsap.to(words, {
      y: '0%',
      duration,
      stagger,
      delay,
      ease: 'power4.out',
      ...(immediate
        ? {}
        : {
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }),
    });

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [children, delay, stagger, duration, immediate]);

  return <Tag ref={ref as any} className={cn(className)} />;
}
