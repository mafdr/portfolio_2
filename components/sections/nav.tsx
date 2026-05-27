'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Logo } from '@/components/ui/logo';

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 lg:px-12 py-5 backdrop-blur-md"
      style={{
        background: 'color-mix(in oklab, var(--bg) 75%, transparent)',
      }}
    >
      <div className="flex items-center justify-between gap-6">
        {/* Logo + nombre */}
        <Link
          href="/"
          data-cursor="hover"
          className="flex items-center gap-3 text-fg hover:text-accent-strong transition-colors duration-fast"
        >
          <Logo size={24} />
          <span className="font-mono text-2xs uppercase tracking-widest hidden sm:inline">
            Manuel Reis
          </span>
        </Link>

        {/* Nav items */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor="hover"
              className="font-mono text-2xs uppercase tracking-widest px-3 py-2 rounded-full text-fg-muted hover:text-fg hover:bg-bg-muted transition-all duration-fast"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
