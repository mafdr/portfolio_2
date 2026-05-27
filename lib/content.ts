/**
 * Manuel Reis Portfolio — Contenido
 * Toda la data del sitio en un solo lugar. Edita aquí y se actualiza
 * en todas las secciones.
 */

export type Project = {
  slug: string;
  title: string;
  client: string;
  type: string;
  year: string;
  description: string;
  cover?: string;       // ruta a /public/...
  coverAccent?: string; // color de fondo del placeholder (CSS var o hex)
};

export const projects: Project[] = [
  {
    slug: 'emerald-clinical',
    title: 'Emerald Clinical',
    client: 'Clinical practice',
    type: 'Branding · Identity',
    year: '2024',
    description:
      'Identity system for a clinical practice — visual language built around trust, precision and a calm green palette.',
    coverAccent: 'linear-gradient(135deg, #1b3a0d 0%, #5a7a00 100%)',
  },
  {
    slug: 'humanly',
    title: 'Humanly',
    client: 'Internal HR SaaS',
    type: 'UX · UI',
    year: '2025',
    description:
      'A web platform where HR teams and employees manage data, request vacations and review reports — designed to simplify what used to be friction.',
    coverAccent: 'linear-gradient(135deg, #d3fa53 0%, #a8d31b 100%)',
  },
  {
    slug: 'rotki',
    title: 'Rotki',
    client: 'Rotki',
    type: 'UX · UI',
    year: '2026',
    description:
      'Online open-source portfolio for crypto — designing clarity into a notoriously noisy data domain.',
    coverAccent: 'linear-gradient(135deg, #0a0a0a 0%, #21211f 100%)',
  },
  {
    slug: 'nonetop',
    title: 'Nonetop',
    client: 'Finance app',
    type: 'UX · UI',
    year: '2026',
    description:
      'A finance app focused on cutting cognitive overhead — money decisions made with confidence, not anxiety.',
    coverAccent: 'linear-gradient(135deg, #f0f2e9 0%, #d3fa53 100%)',
  },
];

export const heroRotatingWords = [
  'designer.',
  'product thinker.',
  'lisbon-based.',
  'available.',
];

export const about = {
  paragraphs: [
    "Hi, I'm a UX/UI Designer, and I solve problems for a living — the kind where complexity turns into intuitive experiences, messy flows become clear, and \"this feels confusing\" becomes \"this just makes sense.\"",
    "For the past 9 years, I've been designing digital products end-to-end — from understanding problems and mapping flows to crafting interfaces and prototyping ideas. I care about building experiences that feel simple, thoughtful, and genuinely useful.",
    "Outside of design, I spend my time reading, cycling around Lisbon, experimenting with clay, or playing video games. I grew up with The Legend of Zelda, which probably explains my love for well-crafted worlds, smart systems, and thoughtful interaction design.",
  ],
  tools: ['Figma', 'Webflow', 'Adobe', 'Maze', 'Miro', 'Framer', 'Antigravity'],
};

export const hobbies = [
  { label: 'Cycling',     variant: 'cycling' as const },
  { label: 'Reading',     variant: 'reading' as const },
  { label: 'Video games', variant: 'gaming'  as const },
  { label: 'Clay',        variant: 'clay'    as const },
];

export const contact = {
  email: 'mafdr101@gmail.com',
  location: 'Lisbon, Portugal',
  available: true,
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/' },
    // añade más cuando los tengas
  ],
};

export const profile = {
  name: 'Manuel Reis',
  role: 'Senior UX/UI Designer',
  shortBio: '9 years building digital products end-to-end.',
};

// Logos de clientes para el marquee. Texto-only por ahora (puedes
// reemplazar por <img src="/logos/..."> cuando los tengas)
export const clients = [
  'Emerald Clinical', 'Humanly', 'Rotki', 'Nonetop',
  'Studio North', 'Atelier Mira', 'Helix Labs', 'Public House',
  'Acme Co', 'Field Notes',
];
