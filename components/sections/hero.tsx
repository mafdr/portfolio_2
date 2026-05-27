'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Button } from '@/components/ui/button';
import { Magnetic } from '@/components/magnetic';
import { SplitText } from '@/components/split-text';
import { heroRotatingWords, profile } from '@/lib/content';

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % heroRotatingWords.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-8 lg:px-12 pt-32 pb-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <Eyebrow withDot>Available for work · 2026</Eyebrow>
      </motion.div>

      {/* Titular: parte 1 con SplitText, parte 2 con rotador */}
      <h1 className="font-serif font-normal text-fg mt-6 leading-[0.95] tracking-tighter">
        <SplitText
          as="span"
          className="block"
          delay={0.2}
          stagger={0.08}
          duration={1}
          immediate
        >
          {`${profile.name},`}
        </SplitText>

        <motion.span
          className="block relative overflow-hidden italic text-accent-strong"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(3rem, 11vw, 10rem)',
            height: '1.05em',
          }}
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              className="absolute left-0 top-0 whitespace-nowrap"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {heroRotatingWords[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </h1>

      <style jsx>{`
        h1 :global(.split-word) { font-size: clamp(3rem, 11vw, 10rem); }
      `}</style>

      <motion.div
        className="mt-10 flex flex-col gap-7 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-md md:text-lg text-fg-muted leading-relaxed">
          {profile.role} based in Lisbon — {profile.shortBio}
        </p>
        <div className="flex flex-wrap gap-3">
          <Magnetic strength={0.4}>
            <Button
              variant="primary"
              data-cursor="link"
              onClick={() =>
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View selected work →
            </Button>
          </Magnetic>
          <Magnetic strength={0.3}>
            <Button
              variant="secondary"
              data-cursor="link"
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Get in touch
            </Button>
          </Magnetic>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-2xs uppercase tracking-widest text-fg-subtle flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span>Scroll</span>
        <motion.div
          className="w-px h-8 bg-fg-subtle origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
