# Manuel Reis — Portfolio

> Personal portfolio site. Next.js 15 + TypeScript + Tailwind + Motion + GSAP.

**Status:** Phase 2 — Motion Core ✓

---

## 🚀 Quick start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## 📁 Estructura

```
portfolio/
├── app/
│   ├── layout.tsx                  ← Root con AppShell
│   ├── page.tsx                    ← Home one-pager
│   ├── globals.css                 ← Tokens + estilos de motion
│   └── work/[slug]/page.tsx        ← Case study dinámico
├── components/
│   ├── app-shell.tsx               ← Wrapper: Loader + Cursor + Lenis
│   ├── loader.tsx                  ← 🆕 Loader inicial (logo + cortina)
│   ├── custom-cursor.tsx           ← 🆕 Cursor custom con states
│   ├── magnetic.tsx                ← 🆕 Wrapper magnetic hover
│   ├── split-text.tsx              ← 🆕 Text reveal palabra por palabra
│   ├── parallax.tsx                ← 🆕 Scroll-driven parallax bidireccional
│   ├── lenis-provider.tsx          ← Smooth scroll
│   ├── sections/
│   │   ├── nav.tsx                 ← + data-cursor
│   │   ├── hero.tsx                ← + Magnetic + SplitText
│   │   ├── selected-work.tsx       ← + Parallax + data-cursor="view"
│   │   ├── client-marquee.tsx
│   │   ├── about.tsx               ← + SplitText
│   │   └── footer.tsx              ← + Magnetic en mail
│   └── ui/                         ← Button, Pill, Eyebrow, Logo
├── lib/
│   ├── content.ts                  ← ⭐ Todo el contenido editable
│   └── cn.ts
└── public/
```

---

## 🎬 Motion implementado

### Phase 1 (foundation)
- ✅ Hero: nombre + palabras rotativas
- ✅ Scroll reveals con Motion
- ✅ Marquee criss-cross
- ✅ Hobby pills con spring
- ✅ Mail copy-to-clipboard
- ✅ Lenis smooth scroll

### Phase 2 (motion core) 🆕
- ✅ **Loader inicial** (~2s) — logo "M" se dibuja por trazos + cortina lime
- ✅ **Custom cursor** con states:
  - dot pequeño instantáneo + círculo grande con lerp
  - `data-cursor="hover"` → estado sutil
  - `data-cursor="link"` → lime + blend-difference (botones)
  - `data-cursor="view"` → gigante con label "View" (project cards)
- ✅ **Magnetic hover** en CTAs del hero y mail del footer
- ✅ **Text reveals palabra por palabra** (GSAP) en hero y about
- ✅ **Parallax bidireccional** en project cards (números y años en direcciones opuestas)
- ✅ Todo respeta `prefers-reduced-motion` y `touch devices`

---

## 🎮 Cómo añadir/modificar motion

### Añadir magnetic a un botón
```tsx
import { Magnetic } from '@/components/magnetic';

<Magnetic strength={0.4}>
  <button data-cursor="link">Click me</button>
</Magnetic>
```
`strength`: 0.3 sutil · 0.5 notorio · 0.7+ exagerado

### Text reveal en cualquier párrafo
```tsx
import { SplitText } from '@/components/split-text';

<SplitText as="p" className="text-3xl">
  Tu texto. Soporta <strong>negritas</strong> y <em>cursivas</em>.
</SplitText>
```

### Parallax en un elemento
```tsx
import { Parallax } from '@/components/parallax';

<div className="card">  {/* Trigger */}
  <Parallax strength={-0.5}>  {/* Sube */}
    <h1>01</h1>
  </Parallax>
  <Parallax strength={0.6}>  {/* Baja */}
    <span>2024</span>
  </Parallax>
</div>
```
Para crear **depth real**: dos Parallax con strengths opuestos en el mismo contenedor.

### Cursor custom en cualquier elemento
```tsx
<a href="#" data-cursor="hover">Link sutil</a>
<button data-cursor="link">Botón con lime</button>
<article data-cursor="view" data-cursor-label="Open">Card</article>
```

### Desactivar el loader (durante desarrollo)
En `components/app-shell.tsx`, comenta la línea `<Loader ... />`.

---

## ✏️ Editar contenido

99% del contenido vive en `lib/content.ts`. Edita ahí.

---

## 🛣️ Próximas fases

### Phase 3 — Motion avanzado
- [ ] WebGL distortion en imágenes de project covers (Three.js + shader)
- [ ] Scroll horizontal en sección de skills/process
- [ ] View Transitions API entre home y case study
- [ ] Page transitions cinemáticas

### Phase 4 — Case studies
- [ ] Template MDX
- [ ] 4 case studies completos
- [ ] Navegación next/prev

---

## 📦 Stack

- Next.js 15 · React 19 · TypeScript 5
- Tailwind CSS 3.4
- Motion 11 (animaciones React)
- GSAP 3 + ScrollTrigger (motion avanzado)
- Lenis (smooth scroll)
- Geist · Instrument Serif (fonts)

---

## 🚀 Deploy

```bash
npx vercel
# o push a GitHub + connect en vercel.com
```

Made with care · Manuel Reis · 2026
