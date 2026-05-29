'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { projects } from '@/lib/content';
import { SpinningCursor } from '@/components/spinning-cursor';

/**
 * Selected Work — cards expansibles
 *
 * - Título centrado con jerarquía (PROJECTS grande + "that I'm proud of" serif italic)
 * - 4 cards verticales en fila. Hover: la activa crece (34%), las otras se encogen (22%)
 * - La imagen funciona como máscara (alto fijo, solo cambia ancho)
 * - Info (año, tipo, descripción) aparece como overlay sobre la imagen en hover
 * - Animación de entrada escalonada al hacer scroll
 */
export function SelectedWork() {
  return (
    <section
      id="work"
      className="px-6 md:px-8 lg:px-12 py-20 md:py-32 border-t border-border-subtle"
    >
      {/* Título centrado con jerarquía */}
      <motion.h2
        className="text-center mb-16 md:mb-20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="block font-display uppercase leading-[0.95] tracking-tight text-fg"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}>
          Projects
        </span>
        <span className="block font-serif italic text-fg-muted leading-tight"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.8rem)', marginTop: 4 }}>
          that I&apos;m proud of
        </span>
      </motion.h2>

      {/* Cards expansibles */}
      <div className="works-row">
        {projects.map((project, i) => (
          <motion.article
            key={project.slug}
            className="work-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              href={`/work/${project.slug}`}
              className="work-card__link"
              data-cursor="hide"
            >
              <div className="work-card__label">{project.title}</div>
              <div className="work-card__media">
                <img
                  className="work-card__img"
                  src={project.cover}
                  alt={project.title}
                />
                <div className="work-card__overlay">
                  <div className="work-card__meta">
                    <span>{project.year}</span>
                    <span>{project.type}</span>
                  </div>
                  <p className="work-card__desc">{project.description}</p>
                </div>
                <SpinningCursor text="VIEW PROJECT · " repeat={2} />
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
