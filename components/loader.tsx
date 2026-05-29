'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Loader / Intro Animation — Slot Machine
 *
 * - Pantalla negra al inicio (slots invisibles)
 * - Cada letra de MANUEL / REIS es un "slot" con un reel de caracteres
 *   aleatorios que rota verticalmente hasta detenerse en la letra correcta
 * - Algunos caracteres random aparecen en lime durante el roll, el final en blanco
 * - Letter-spacing animado de +0.2em → 0 durante el roll
 * - Labels editoriales arriba/abajo (fade in)
 * - Glitch A (RGB split) al final, justo antes de revelar el sitio
 * - Transición rápida al hero
 *
 * Respeta prefers-reduced-motion (salta directo al sitio).
 */

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const REEL_LENGTH = 14;

type SlotData = {
  finalChar: string;
  chars: { char: string; isAccent: boolean; isFinal: boolean }[];
};

function buildSlots(text: string): SlotData[] {
  return text.split('').map((finalChar) => {
    const chars: SlotData['chars'] = [];
    for (let i = 0; i < REEL_LENGTH - 1; i++) {
      chars.push({
        char: ALPHABET[Math.floor(Math.random() * ALPHABET.length)],
        isAccent: Math.random() < 0.3,
        isFinal: false,
      });
    }
    chars.push({ char: finalChar, isAccent: false, isFinal: true });
    return { finalChar, chars };
  });
}

export function Loader({ onComplete }: { onComplete?: () => void }) {
  const [isDone, setIsDone] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);
  const wordManuelRef = useRef<HTMLDivElement>(null);
  const wordReisRef = useRef<HTMLDivElement>(null);
  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Construir los slots una sola vez
  const [manuelSlots] = useState(() => buildSlots('MANUEL'));
  const [reisSlots] = useState(() => buildSlots('REIS'));
  const allSlots = [...manuelSlots, ...reisSlots];

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    const intro = introRef.current;
    const wordManuel = wordManuelRef.current;
    const wordReis = wordReisRef.current;
    if (!intro || !wordManuel || !wordReis) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    document.body.style.overflow = 'hidden';
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // Reflow
    void intro.offsetWidth;

    // Revelar labels editoriales
    timeouts.push(setTimeout(() => intro.classList.add('is-revealing'), 150));

    // Letter-spacing closing
    timeouts.push(
      setTimeout(() => {
        wordManuel.style.transition = '';
        wordReis.style.transition = '';
        wordManuel.classList.add('is-closing');
        wordReis.classList.add('is-closing');
      }, 100)
    );

    // Animar cada slot
    allSlots.forEach((slot, i) => {
      const delay = i * 70;
      const duration = 1200 + Math.random() * 400;
      const targetY = -(slot.chars.length - 1);
      timeouts.push(
        setTimeout(() => {
          const reel = reelRefs.current[i];
          if (!reel) return;
          reel.classList.add('is-rolling');
          reel.style.transition = `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
          reel.style.transform = `translateY(${targetY}em)`;
        }, delay)
      );
    });

    const lastSlotStart = (allSlots.length - 1) * 70;
    const lastSlotDuration = 1600;
    const totalDuration = lastSlotStart + lastSlotDuration - 400;

    // Glitch A justo antes del fade
    const lines = intro.querySelector('.intro__lines');
    timeouts.push(
      setTimeout(() => {
        if (!lines) return;
        lines.classList.remove('glitch-active');
        void (lines as HTMLElement).offsetWidth;
        lines.classList.add('glitch-active');
      }, totalDuration - 200)
    );

    // Fade out + completar
    timeouts.push(
      setTimeout(() => {
        intro.style.transition = 'opacity 200ms cubic-bezier(0.83, 0, 0.17, 1)';
        intro.style.opacity = '0';
        intro.style.pointerEvents = 'none';
        document.body.style.overflow = '';
        onComplete?.();
        // Desmontar tras el fade
        setTimeout(() => setIsDone(true), 250);
      }, totalDuration)
    );

    return () => {
      timeouts.forEach(clearTimeout);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isDone) return null;

  let slotIndex = 0;

  return (
    <div className="intro" ref={introRef}>
      <div className="intro__top">
        <span>Manuel Reis · Portfolio</span>
        <span>2026</span>
      </div>
      <span
        className="intro__dot"
        style={{ position: 'absolute', top: 48, left: '50%', transform: 'translateX(-50%)' }}
      />

      <div className="intro__lines">
        <div className="intro__word intro__word--manuel" ref={wordManuelRef}>
          {manuelSlots.map((slot, i) => {
            const idx = slotIndex++;
            return (
              <div className="slot" key={`m-${i}`}>
                <span className="slot__sizer">{slot.finalChar}</span>
                <div
                  className="slot__reel"
                  ref={(el) => {
                    reelRefs.current[idx] = el;
                  }}
                >
                  {slot.chars.map((c, j) => (
                    <span
                      key={j}
                      className={
                        'slot__char' +
                        (c.isFinal ? ' slot__char--final' : '') +
                        (c.isAccent ? ' slot__char--accent' : '')
                      }
                    >
                      {c.char}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="intro__word intro__word--reis" ref={wordReisRef}>
          {reisSlots.map((slot, i) => {
            const idx = slotIndex++;
            return (
              <div className="slot" key={`r-${i}`}>
                <span className="slot__sizer">{slot.finalChar}</span>
                <div
                  className="slot__reel"
                  ref={(el) => {
                    reelRefs.current[idx] = el;
                  }}
                >
                  {slot.chars.map((c, j) => (
                    <span
                      key={j}
                      className={
                        'slot__char' +
                        (c.isFinal ? ' slot__char--final' : '') +
                        (c.isAccent ? ' slot__char--accent' : '')
                      }
                    >
                      {c.char}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <span
        className="intro__dot"
        style={{ position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)' }}
      />
      <div className="intro__bottom">
        <span>Senior UX/UI Designer</span>
        <span>Lisbon — 09</span>
      </div>
    </div>
  );
}
