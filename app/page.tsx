import { Nav } from '@/components/sections/nav';
import { Hero } from '@/components/sections/hero';
import { ClientMarquee } from '@/components/sections/client-marquee';
import { SelectedWork } from '@/components/sections/selected-work';
import { About } from '@/components/sections/about';
import { Footer } from '@/components/sections/footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SelectedWork />
        <ClientMarquee />
        <About />
      </main>
      <Footer />
    </>
  );
}
