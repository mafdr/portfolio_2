'use client';

import { motion } from 'motion/react';
import { clients } from '@/lib/content';

export function ClientMarquee() {
  // Duplicamos los clientes para loop infinito sin saltos
  const doubled = [...clients, ...clients];

  return (
    <section
      aria-label="Trusted by"
      className="border-y border-border-subtle py-8 md:py-12 bg-bg-surface overflow-hidden"
    >
      {/* Etiqueta */}
      <div className="px-6 md:px-8 lg:px-12 mb-6">
        <div className="font-mono text-2xs uppercase tracking-widest text-fg-subtle">
          Trusted by
        </div>
      </div>

      {/* Fila 1 - hacia izquierda */}
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex shrink-0 gap-12 md:gap-16 pr-12 md:pr-16"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {doubled.map((client, i) => (
            <span
              key={`r1-${i}`}
              className="font-serif italic text-fg-muted/70 hover:text-fg transition-colors duration-fast shrink-0"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              {client}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Fila 2 - hacia derecha (criss-cross) */}
      <div className="relative flex overflow-hidden mt-2">
        <motion.div
          className="flex shrink-0 gap-12 md:gap-16 pr-12 md:pr-16"
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {doubled.map((client, i) => (
            <span
              key={`r2-${i}`}
              className="font-sans uppercase tracking-widest font-medium text-fg-muted/50 hover:text-fg transition-colors duration-fast shrink-0"
              style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}
            >
              {client}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
