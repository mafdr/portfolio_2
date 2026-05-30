'use client';

import { motion } from 'motion/react';

/**
 * Contact — sección final (fondo negro)
 *
 * - "Don't be boring," (light) + "LET'S WORK / TOGETHER" (Archivo Black lime)
 *   con shimmer + float independiente por línea
 * - 3 botones outline con icono: Email, Lisbon, LinkedIn
 *   hover: relleno lime explosivo, texto/icono negro, crecen; hermanos se encogen 30%
 * - Animación de entrada por bloques (escalonada, dinámica)
 * - data-cursor-theme="dark" → el cursor se invierte a lime sobre el negro
 */

const ease = [0.16, 1, 0.3, 1] as const;

export function Footer() {
  return (
    <footer
      id="contact"
      className="contact-section"
      data-cursor-theme="dark"
    >
      {/* Eyebrow */}
      <motion.div
        className="contact-section__eyebrow"
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease }}
      >
        Available for new projects
      </motion.div>

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
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.25, ease }}
            >
              Let&apos;s work
            </motion.span>
            <motion.span
              className="contact-section__line contact-section__line--2"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
            >
              together
            </motion.span>
          </span>
        </h2>

        <div className="contact-section__buttons">
          {[
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
          ].map((btn, i) => (
            <motion.a
              key={btn.label}
              href={btn.href}
              target={btn.href.startsWith('mailto') ? undefined : '_blank'}
              rel={btn.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="contact-section__btn"
              data-cursor="hover"
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.12, ease }}
            >
              <svg viewBox="0 0 24 24">{btn.svg}</svg>
              <span>{btn.label}</span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <motion.div
        className="contact-section__bottom"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 1, ease }}
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
