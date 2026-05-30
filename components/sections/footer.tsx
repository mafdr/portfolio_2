'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

/**
 * Contact — sección final (fondo negro)
 *
 * - "Don't be boring," + "LET'S WORK / TOGETHER" (lime, animadas por separado)
 * - 4 botones: Email, Lisbon, LinkedIn, CV
 *   hover: relleno lime, texto/icono negro y crecen; hermanos se encogen (vía estado)
 * - Nombre gigante MANUEL REIS de fondo tras los botones (Archivo Black)
 * - Animación de entrada por bloques
 */

const ease = [0.16, 1, 0.3, 1] as const;

const BUTTONS = [
  {
    href: 'mailto:mafdr101@gmail.com',
    label: 'Email',
    svg: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
  {
    href: 'https://maps.google.com/?q=Lisbon,Portugal',
    label: 'Lisbon, PT',
    svg: (
      <>
        <path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/manuel-reis-8537a1b6/',
    label: 'LinkedIn',
    svg: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 13v4" />
      </>
    ),
  },
  {
    href: '/cv.pdf',
    label: 'CV',
    svg: (
      <>
        <path d="M14 3v5h5" />
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M9 13h6M9 17h6M9 9h1" />
      </>
    ),
  },
];

export function Footer() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <footer id="contact" className="contact-section" data-cursor-theme="dark" data-nav-theme="dark">
      {/* Centro */}
      <div className="contact-section__center">
        <h2 className="contact-section__title">
          <motion.span
            className="contact-section__title-top"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            Don&apos;t be boring,
          </motion.span>

          <span className="contact-section__title-main">
            <motion.span
              className="contact-section__line contact-section__line--1"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.25, ease }}
            >
              Let&apos;s work
            </motion.span>
            <motion.span
              className="contact-section__line contact-section__line--2"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
            >
              together
            </motion.span>
          </span>
        </h2>

        <div
          className="contact-section__buttons"
          onMouseLeave={() => setHovered(null)}
        >
          {BUTTONS.map((btn, i) => {
            const isHovered = hovered === i;
            const isDimmed = hovered !== null && hovered !== i;
            return (
              <motion.a
                key={btn.label}
                href={btn.href}
                target={btn.href.startsWith('mailto') || btn.href.startsWith('/') ? undefined : '_blank'}
                rel={btn.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={
                  'contact-section__btn' +
                  (isHovered ? ' is-active' : '') +
                  (isDimmed ? ' is-dimmed' : '')
                }
                data-cursor="hover"
                onMouseEnter={() => setHovered(i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.1, ease }}
              >
                <svg viewBox="0 0 24 24">{btn.svg}</svg>
                <span>{btn.label}</span>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Nombre gigante de fondo */}
      <div className="contact-section__bigname" aria-hidden="true">
        Manuel Reis
      </div>

      {/* Bottom */}
      <motion.div
        className="contact-section__bottom"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 1.1, ease }}
      >
        <div>
          <strong>Manuel Reis</strong>
          <br />
          Senior UX/UI Designer
        </div>
        <div style={{ textAlign: 'right' }}>
          <strong>© 2026</strong>
          <br />
          All rights reserved
        </div>
      </motion.div>
    </footer>
  );
}
