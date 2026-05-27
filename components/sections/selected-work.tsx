'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Parallax } from '@/components/parallax';
import { projects } from '@/lib/content';

export function SelectedWork() {
  return (
    <section
      id="work"
      className="px-6 md:px-8 lg:px-12 py-20 md:py-32 border-t border-border-subtle"
    >
      <div className="flex items-baseline justify-between gap-4 mb-12 md:mb-16">
        <div>
          <div className="font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-3">
            01 / Selected work
          </div>
          <h2
            className="font-serif font-normal leading-tight tracking-tight text-fg"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Four projects, <em className="italic text-accent-strong">recent</em>.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {projects.map((project, i) => {
          const isLarge = i === 0 || i === 3;
          // Cada card alterna intensidades para que se sienta variado
          const numStrength = [-0.5, -0.6, -0.4, -0.5][i] ?? -0.5;
          const yearStrength = [0.6, 0.5, 0.7, 0.55][i] ?? 0.5;

          return (
            <motion.div
              key={project.slug}
              className={isLarge ? 'md:col-span-7' : 'md:col-span-5'}
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
                className="group block bg-bg-surface border border-border-subtle rounded-2xl overflow-hidden hover:border-border-strong transition-all duration-base ease-out-expo"
                data-cursor="view"
                data-cursor-label="View"
              >
                {/* Cover con parallax bidireccional */}
                <div
                  className={`relative overflow-hidden ${
                    isLarge ? 'aspect-[16/10]' : 'aspect-[4/3]'
                  }`}
                  style={{ background: project.coverAccent }}
                >
                  <div className="absolute inset-0 flex items-end justify-between p-6 md:p-8">
                    <Parallax strength={numStrength}>
                      <span
                        className="font-serif italic"
                        style={{
                          color: i === 2 ? 'rgba(211,250,83,0.3)' : 'rgba(10, 10, 10, 0.4)',
                          fontSize: 'clamp(4rem, 10vw, 8rem)',
                          lineHeight: 1,
                          display: 'inline-block',
                        }}
                      >
                        0{i + 1}
                      </span>
                    </Parallax>
                    <Parallax strength={yearStrength}>
                      <span
                        className="font-mono text-2xs uppercase tracking-widest"
                        style={{
                          color: i === 2 ? 'rgba(211,250,83,0.6)' : 'rgba(10, 10, 10, 0.6)',
                        }}
                      >
                        {project.year}
                      </span>
                    </Parallax>
                  </div>
                  <div className="absolute inset-0 bg-bg-inverse/0 group-hover:bg-bg-inverse/10 transition-colors duration-base pointer-events-none" />
                </div>

                <div className="p-5 md:p-7 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-2">
                      {project.type} · {project.client}
                    </div>
                    <h3 className="font-sans text-lg md:text-xl font-semibold text-fg mb-2 truncate">
                      {project.title}
                    </h3>
                    <p className="text-sm text-fg-muted leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-border group-hover:bg-accent group-hover:border-accent group-hover:-rotate-45 transition-all duration-base ease-out-expo">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
