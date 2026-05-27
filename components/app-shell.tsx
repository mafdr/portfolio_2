'use client';

import { useState } from 'react';
import { Loader } from '@/components/loader';
import { CustomCursor } from '@/components/custom-cursor';
import { LenisProvider } from '@/components/lenis-provider';

/**
 * AppShell
 *
 * Componente cliente que envuelve toda la app y monta:
 * - Loader (se desmonta solo al terminar)
 * - CustomCursor (activo solo en desktop)
 * - LenisProvider (smooth scroll)
 *
 * Es cliente porque Loader y CustomCursor lo son, y necesitamos
 * que el layout principal pueda quedarse server-side.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <LenisProvider>
      <Loader onComplete={() => setLoaderDone(true)} />
      <CustomCursor />
      {/* El contenido siempre se monta. El loader simplemente está encima. */}
      {children}
    </LenisProvider>
  );
}
