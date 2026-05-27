'use client';

import { motion } from 'motion/react';
import { about, hobbies } from '@/lib/content';
import { Pill } from '@/components/ui/pill';
import { SplitText } from '@/components/split-text';

export function About() {
  return (
    <section
      id="about"
      className="px-6 md:px-8 lg:px-12 py-20 md:py-32 border-t border-border-subtle"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <div className="font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-3">
              02 / About
            </div>
            <motion.h2
              className="font-serif font-normal leading-tight tracking-tight text-fg"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              On <em className="italic text-accent-strong">making</em> things.
            </motion.h2>
          </div>
        </div>

        <div className="md:col-span-8 space-y-6">
          {about.paragraphs.map((p, i) => (
            <SplitText
              key={i}
              as="p"
              className="text-base md:text-md text-fg leading-relaxed"
              stagger={0.015}
              duration={0.7}
            >
              {p}
            </SplitText>
          ))}

          <motion.div
            className="pt-8 border-t border-border-subtle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-4">
              Tools of trade
            </div>
            <div className="flex flex-wrap gap-3">
              {about.tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  className="font-sans text-md md:text-lg text-fg-muted hover:text-fg transition-colors duration-fast cursor-default"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  data-cursor="hover"
                >
                  {tool}
                  {i < about.tools.length - 1 && (
                    <span className="text-fg-subtle ml-3">·</span>
                  )}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-4">
              Off-hours
            </div>
            <div className="flex flex-wrap gap-2">
              {hobbies.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.08,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <Pill variant={h.variant} dot>
                    {h.label}
                  </Pill>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
