import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/content';
import { Nav } from '@/components/sections/nav';
import { Footer } from '@/components/sections/footer';
import { Eyebrow } from '@/components/ui/eyebrow';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Nav />
      <main className="pt-32 pb-20">
        {/* Header del case */}
        <section className="px-6 md:px-8 lg:px-12 max-w-6xl mx-auto">
          <Eyebrow className="mb-6">
            <Link href="/" className="hover:text-fg transition-colors">
              ← Back to work
            </Link>
          </Eyebrow>

          <div className="mb-8">
            <div className="font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-4">
              {project.type} · {project.client} · {project.year}
            </div>
            <h1
              className="font-serif font-normal leading-none tracking-tighter text-fg mb-6"
              style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
            >
              {project.title}
            </h1>
            <p className="font-serif italic text-fg-muted max-w-3xl" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', lineHeight: 1.3 }}>
              {project.description}
            </p>
          </div>
        </section>

        {/* Cover hero */}
        <section className="px-6 md:px-8 lg:px-12 max-w-6xl mx-auto mt-12">
          <div
            className="aspect-[16/9] rounded-2xl overflow-hidden flex items-end justify-between p-8 md:p-12"
            style={{ background: project.coverAccent }}
          >
            <span
              className="font-serif italic text-neutral-950/40"
              style={{ fontSize: 'clamp(6rem, 14vw, 12rem)', lineHeight: 1 }}
            >
              {project.title.charAt(0)}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-950/60">
              Case study — coming in Phase 4
            </span>
          </div>
        </section>

        {/* Body placeholder */}
        <section className="px-6 md:px-8 lg:px-12 max-w-3xl mx-auto mt-16 md:mt-24">
          <div className="prose prose-lg text-fg-muted">
            <p className="text-md leading-relaxed">
              This case study is under construction. Detailed write-up, process visuals, and
              outcomes will be added in Phase 4 of the portfolio build.
            </p>
            <p className="text-md leading-relaxed mt-6">
              In the meantime, here's the project at a glance:
            </p>
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-border-subtle">
              <div>
                <dt className="font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-2">
                  Client
                </dt>
                <dd className="font-sans text-md text-fg">{project.client}</dd>
              </div>
              <div>
                <dt className="font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-2">
                  Discipline
                </dt>
                <dd className="font-sans text-md text-fg">{project.type}</dd>
              </div>
              <div>
                <dt className="font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-2">
                  Year
                </dt>
                <dd className="font-sans text-md text-fg">{project.year}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Next project */}
        <section className="px-6 md:px-8 lg:px-12 max-w-6xl mx-auto mt-24 md:mt-32 pt-16 border-t border-border-subtle">
          <div className="font-mono text-2xs uppercase tracking-widest text-fg-subtle mb-4">
            Next project
          </div>
          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex items-baseline gap-6 hover:gap-10 transition-all duration-base ease-out-expo"
          >
            <h2
              className="font-serif italic text-fg group-hover:text-accent-strong transition-colors duration-base"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
            >
              {nextProject.title}
            </h2>
            <span className="font-mono text-2xs uppercase tracking-widest text-fg-subtle">
              {nextProject.type}
            </span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
