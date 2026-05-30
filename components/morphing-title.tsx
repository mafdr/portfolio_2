'use client';

import { useEffect, useRef } from 'react';

/**
 * MorphingTitle
 *
 * Texto gigante (Archivo Black) que morfea entre varias palabras
 * con efecto de fusión (blur + SVG threshold filter), estilo Magic UI.
 *
 * Ritmo normal: ~1.5s visible por palabra + 0.6s de transición.
 */

const TEXTS = ['Manuel', 'Reis', 'Designer', 'Lisbon', 'UX / UI'];
const MORPH_TIME = 600;   // ms de transición
const COOLDOWN_TIME = 1500; // ms visible por palabra

export function MorphingTitle() {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t1 = text1Ref.current;
    const t2 = text2Ref.current;
    if (!t1 || !t2) return;

    // Si reduced-motion: mostrar solo "Manuel" estático
    if (reduced) {
      t1.textContent = 'Manuel';
      t1.style.opacity = '100%';
      t1.style.filter = '';
      t2.style.opacity = '0%';
      return;
    }

    let textIndex = TEXTS.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = COOLDOWN_TIME;
    let rafId = 0;

    t1.textContent = TEXTS[textIndex % TEXTS.length];
    t2.textContent = TEXTS[(textIndex + 1) % TEXTS.length];

    function setMorph(fraction: number) {
      t2!.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      t2!.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      const inv = 1 - fraction;
      t1!.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      t1!.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
      t1!.textContent = TEXTS[textIndex % TEXTS.length];
      t2!.textContent = TEXTS[(textIndex + 1) % TEXTS.length];
    }

    function doMorph() {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / MORPH_TIME;
      if (fraction > 1) {
        cooldown = COOLDOWN_TIME;
        fraction = 1;
      }
      setMorph(fraction);
    }

    function doCooldown() {
      morph = 0;
      t2!.style.filter = '';
      t2!.style.opacity = '100%';
      t1!.style.filter = '';
      t1!.style.opacity = '0%';
    }

    function animate() {
      rafId = requestAnimationFrame(animate);
      const newTime = new Date();
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      cooldown -= dt * 1000;
      if (cooldown <= 0) {
        if (cooldown === 0 || morph === 0) {
          textIndex++;
        }
        doMorph();
      } else {
        doCooldown();
      }
    }
    animate();

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <h1 className="hero-radd__title hero-radd__title--morph">
        <span ref={text1Ref} />
        <span ref={text2Ref} />
      </h1>

      {/* Filtro SVG que crea el efecto de fusión */}
      <svg className="morph-filter" aria-hidden="true">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
