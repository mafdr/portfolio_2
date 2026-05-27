'use client';

import { motion } from 'motion/react';
import { about, hobbies } from '@/lib/content';
import { Pill } from '@/components/ui/pill';
import { SplitText } from '@/components/split-text';

export function About() {
  return (
    <section
      id="about"
      className="relative px-6 md:px-8 lg:px-12 py-24 md:py-40 border-t border-border-subtle overflow-hidden"
    >
      {/* ──────────────────────────────────────────────
          SECTION HEADER · numero arriba
          ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16 md:mb-24">
          <div className="font-mono text-2xs uppercase tracking-widest text-fg-subtle">
            02 / About
          </div>
          <div className="font-mono text-2xs uppercase tracking-widest text-fg-subtle hidden md:block">
            Lisbon · 2026
          </div>
        </div>

        {/* ──────────────────────────────────────────────
            STATEMENT GIGANTE (full width)
            ────────────────────────────────────────────── */}
        <motion.h2
          className="font-serif font-normal leading-[0.95] tracking-tighter text-fg mb-20 md:mb-32 max-w-5xl"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          On <em className="italic text-accent-strong">making</em> things that{' '}
          <em className="italic text-accent-strong">make sense</em>.
        </motion.h2>

        {/* ──────────────────────────────────────────────
            CONTENT GRID · ahora sí 12 cols pero con min-w-0
            ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-20 md:mb-32">
          {/* Label columna izquierda */}
          <div className="md:col-span-3">
            <div className="md:sticky md:top-24">
              <div className="font-mono text-2xs uppercase tracking-widest text-fg-subtle">
                — Bio
              </div>
            </div>
          </div>

          {/* Párrafos a la derecha. min-w-0 evita overflow */}
          <div className="md:col-span-9 min-w-0 space-y-8 max-w-3xl">
            {about.paragraphs.map((p, i) => (
              <SplitText
                key={i}
                as="p"
                className="text-lg md:text-xl text-fg leading-relaxed"
                stagger={0.015}
                duration={0.7}
              >
                {p}
              </SplitText>
            ))}
          </div>
        </div>

        {/* ──────────────────────────────────────────────
            TOOLS · grid limpio con jerarquía
            ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-20 md:mb-32 pt-12 md:pt-16 border-t border-border-subtle">
          <div className="md:col-span-3">
            <div className="font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-2">
              — Tools
            </div>
            <div className="text-sm text-fg-subtle">
              Daily drivers
            </div>
          </div>

          <div className="md:col-span-9 min-w-0">
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {about.tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  className="font-serif text-2xl md:text-3xl italic text-fg-muted hover:text-fg transition-colors duration-fast"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  data-cursor="hover"
                >
                  {tool}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────
            OFF-HOURS · pills
            ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 pt-12 md:pt-16 border-t border-border-subtle">
          <div className="md:col-span-3">
            <div className="font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-2">
              — Off-hours
            </div>
            <div className="text-sm text-fg-subtle">
              When not designing
            </div>
          </div>

          <div className="md:col-span-9 min-w-0">
            <div className="flex flex-wrap gap-2">
              {hobbies.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <Pill variant={h.variant} dot>
                    {h.label}
                  </Pill>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
