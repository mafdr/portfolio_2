'use client';

import { motion } from 'motion/react';
import { clientLogos, skills } from '@/lib/content';

/**
 * Client Marquee — doble fila en loop
 * - Fila 1: logos de clientes (PNG), se mueve hacia la IZQUIERDA
 * - Fila 2: skills en sans/mono UPPERCASE, se mueve hacia la DERECHA
 * - Espacio vertical compacto
 */
export function ClientMarquee() {
  const logosDoubled = [...clientLogos, ...clientLogos];
  const skillsDoubled = [...skills, ...skills];

  return (
    <section
      aria-label="Brands I've collaborated with"
      className="border-y border-border-subtle py-10 md:py-14 bg-bg-surface overflow-hidden"
    >
      {/* Etiqueta */}
      <div className="px-6 md:px-8 lg:px-12 mb-8">
        <div className="font-mono text-2xs uppercase tracking-widest text-fg-subtle">
          Brands I&apos;ve collaborated with
        </div>
      </div>

      {/* Fila 1 — logos, hacia la izquierda */}
      <div className="relative flex overflow-hidden items-center">
        <motion.div
          className="flex shrink-0 items-center gap-32 md:gap-48 pr-32 md:pr-48"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {logosDoubled.map((logo, i) => (
            <img
              key={`logo-${i}`}
              src={logo.src}
              alt={logo.alt}
              className="shrink-0 h-7 md:h-9 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-base"
              style={{ maxWidth: 160 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Fila 2 — skills, hacia la derecha */}
      <div className="relative flex overflow-hidden mt-7">
        <motion.div
          className="flex shrink-0 gap-10 md:gap-14 pr-10 md:pr-14"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        >
          {skillsDoubled.map((skill, i) => (
            <span
              key={`skill-${i}`}
              className="font-mono uppercase tracking-widest text-fg-muted/55 shrink-0 flex items-center gap-10 md:gap-14"
              style={{ fontSize: 'clamp(0.875rem, 1.4vw, 1.125rem)' }}
            >
              {skill}
              <span className="text-accent-strong/40">/</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
