'use client';

import { motion } from 'motion/react';
import { about } from '@/lib/content';

/**
 * About — "WHO / AM I?" estilo poster (Valorant-like)
 *
 * - Fondo lime, texto negro
 * - WHO (SVG) arriba, AM I? (SVG) abajo
 * - Bio (3 párrafos) centrada, con bolds en palabras clave
 * - 6 stickers flotando con animaciones de hover individuales:
 *   book (wiggle), cat (tilt cool), suelto (lift), mario (pop),
 *   idesign (speech pop), zelda (flip horizontal)
 * - WHO entra desde la izquierda, AM I? desde la derecha, bio fade-in
 */

const STICKERS = [
  { cls: 'book',    src: '/stickers/book.png' },
  { cls: 'cat',     src: '/stickers/cat.png' },
  { cls: 'design',  src: '/stickers/suelto.png' },
  { cls: 'mario',   src: '/stickers/mario.png' },
  { cls: 'idesign', src: '/stickers/design.png' },
  { cls: 'zelda',   src: '/stickers/zelda.png' },
];

export function About() {
  return (
    <section id="about" className="about-section">
      {/* Stickers flotando */}
      {STICKERS.map((s) => (
        <div key={s.cls} className={`sticker sticker--${s.cls}`}>
          <img src={s.src} alt="" />
        </div>
      ))}

      {/* WHO */}
      <motion.div
        className="about-section__word about-section__word--top"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 676.2 142.6" xmlns="http://www.w3.org/2000/svg" aria-label="Who">
          <path d="M233.6,125.7l-57.5-66.2h-.9l29.3,66.2h-38.8L20.1,16.9h59.3l71.1,61.6h.8l-30.4-61.6h56.2l50.8,61.6h.8l-10.1-61.6h56.7l-3.1,108.7h-38.8.2Z" />
          <path d="M384.9,125.7l11.6-41.3h-47.9l-2.6,41.3h-35.3l-14.9-108.7h57l-2.5,39.7h54l11.2-39.7h57l-52.3,108.7h-35.3Z" />
          <path d="M655.2,29.4c4.2,9.6-5.7,23.5-28.8,41.9-23.1,18.3-46.5,32.3-69.4,41.9-21.7,9.6-41.6,14.4-60.3,14.4s-29.7-4.8-33.7-14.3c-5.1-9.5-2.6-23.5,8.2-42,10.9-18.4,26.8-32.4,48.5-42,22.9-9.5,50.1-14.3,80.9-14.3s49.3,4.8,54.5,14.4h0ZM545.5,47.9c-9.3,4.5-16.9,10.6-23,18.3l-8,10.1c-6.1,7.7-8.6,13.8-7.6,18.3.8,4.5,5.4,6.8,14,6.8s17.4-2.3,26.6-6.8c9.4-4.5,18.3-10.6,26.4-18.3l10.7-10.1c8.1-7.7,11.7-13.8,10.7-18.3-1.2-4.5-7.5-6.8-18.7-6.8s-21.6,2.3-31.1,6.8h0Z" />
        </svg>
      </motion.div>

      {/* Bio central */}
      <motion.div
        className="about-section__bio"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <p>
          Hi, I&apos;m a <strong>UX/UI Designer</strong>, and I solve problems for a living
          &mdash; the kind where complexity turns into intuitive experiences, messy flows
          become clear, and &quot;this feels confusing&quot; becomes &quot;this just makes sense.&quot;
        </p>
        <p>
          For the past <strong>9 years</strong>, I&apos;ve been designing digital products{' '}
          <strong>end-to-end</strong> &mdash; from understanding problems and mapping flows to
          crafting interfaces and prototyping ideas. I care about building experiences that
          feel simple, thoughtful, and genuinely useful.
        </p>
        <p>
          Outside of design, I spend my time reading, cycling around Lisbon, experimenting
          with clay, or playing video games. I grew up with <strong>The Legend of Zelda</strong>,
          which probably explains my love for well-crafted worlds, smart systems, and
          thoughtful interaction design.
        </p>
      </motion.div>

      {/* AM I? */}
      <motion.div
        className="about-section__word about-section__word--bottom"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 676.2 142.6" xmlns="http://www.w3.org/2000/svg" aria-label="Am I">
          <path d="M164.2,125.6l3.7-15.3h-60.8l-22.9,15.3H23.7L198.7,16.9h40.6l-12.5,108.7h-62.6,0ZM141.6,85.9h33.9l17.1-38.7h-.8l-50.2,38.7Z" />
          <path d="M407.2,125.6l-7.8-39.2c-1-4.8-1.7-9.8-2.2-14.9s-.9-9.4-1.1-12.9-.4-5.7-.4-6.6h-.8l-18.4,73.7h-46.3l-18.1-73.5h-.8c0,.9-.2,3.1-.4,6.6-.1,3.4-.5,7.7-1,12.8-.5,5.1-1.2,10.1-2.2,14.9l-8.1,39.2h-54.3l44.6-108.7h49.3l17,62.7h.9l15.5-62.7h47.6l45.6,108.7h-58.6Z" />
          <path d="M593.4,125.6l-97.8-108.7h34.9l122,108.7h-59.1Z" />
        </svg>
      </motion.div>
    </section>
  );
}
