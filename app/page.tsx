import { Hero } from '@/components/sections/hero';
import { ClientMarquee } from '@/components/sections/client-marquee';
import { SelectedWork } from '@/components/sections/selected-work';
import { About } from '@/components/sections/about';
import { Footer } from '@/components/sections/footer';
import { NavFloating } from '@/components/sections/nav-floating';

/**
 * Home
 *
 * Efecto "cortina" (sticky stack) en dos transiciones:
 * 1. Hero → SelectedWork: el Hero queda sticky detrás y SelectedWork sube y lo tapa.
 * 2. (Work+Marquee) → About: quedan sticky detrás y About sube y los tapa.
 *
 * Cada bloque "cubierto" va en un wrapper sticky (top:0, z-index bajo).
 * El bloque que cubre tiene fondo sólido y z-index mayor.
 */
export default function HomePage() {
  return (
    <>
      <NavFloating />
      <main>
        {/* Bloque 1: Hero — sticky, será cubierto por SelectedWork */}
        <div className="stack-sticky" style={{ zIndex: 1 }}>
          <Hero />
        </div>

        {/* Bloque 2: SelectedWork+Marquee — cubre el Hero Y queda sticky para que About lo cubra */}
        <div className="stack-sticky stack-cover" style={{ zIndex: 2 }}>
          <SelectedWork />
          <ClientMarquee />
        </div>

        {/* Bloque 3: About — sube y cubre Work+Marquee */}
        <div className="stack-cover" style={{ zIndex: 3 }}>
          <About />
        </div>
      </main>
      <Footer />
    </>
  );
}
