'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { contact, profile } from '@/lib/content';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Magnetic } from '@/components/magnetic';

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      id="contact"
      className="bg-bg-inverse text-fg-inverse px-6 md:px-8 lg:px-12 pt-20 md:pt-32 pb-8 overflow-hidden"
    >
      {/* Eyebrow */}
      <div className="mb-12 md:mb-16">
        <Eyebrow withDot className="!text-neutral-300">
          {contact.available ? 'Available for new projects' : 'Currently booked'}
        </Eyebrow>
      </div>

      {/* CTA principal */}
      <div className="mb-16 md:mb-24">
        <p
          className="font-serif font-normal leading-[0.95] tracking-tighter mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Got something <em className="italic text-accent">to build</em>?
          <br />
          Let's talk.
        </p>

        {/* Mail clickeable enorme */}
        <Magnetic strength={0.2}>
          <motion.button
            onClick={handleCopyEmail}
            data-cursor="link"
            className="group relative inline-flex items-center gap-3 mt-4 font-serif italic text-accent hover:text-accent-hover transition-colors duration-base"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}
            whileHover={{ x: 8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
          {contact.email}
          <span className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-accent/30 group-hover:bg-accent group-hover:border-accent group-hover:text-fg-on-accent transition-all duration-base ease-out-expo">
            {copied ? (
              <CheckIcon />
            ) : (
              <CopyIcon />
            )}
          </span>
          <motion.span
            className="absolute -top-8 left-0 font-mono text-xs uppercase tracking-widest text-accent not-italic"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            Copied to clipboard
          </motion.span>
        </motion.button>
        </Magnetic>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-12 border-b border-neutral-800">
        <div>
          <div className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-3">
            Based in
          </div>
          <div className="font-sans text-md">{contact.location}</div>
        </div>
        <div>
          <div className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-3">
            Role
          </div>
          <div className="font-sans text-md">{profile.role}</div>
        </div>
        <div>
          <div className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-3">
            Local time
          </div>
          <LocalTime />
        </div>
        <div>
          <div className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-3">
            Elsewhere
          </div>
          <div className="flex flex-col gap-1">
            {contact.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="font-sans text-md hover:text-accent transition-colors duration-fast"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Nombre gigante */}
      <div className="overflow-hidden -mx-6 md:-mx-8 lg:-mx-12">
        <p
          className="font-serif italic text-fg-inverse leading-none whitespace-nowrap text-center select-none"
          style={{ fontSize: 'clamp(5rem, 20vw, 18rem)' }}
        >
          {profile.name}.
        </p>
      </div>

      {/* Copyright sutil */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 font-mono text-2xs uppercase tracking-widest text-neutral-500">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <span>Designed &amp; built with care · v1.0</span>
      </div>
    </footer>
  );
}

function LocalTime() {
  const [time, setTime] = useState('');

  if (typeof window !== 'undefined' && !time) {
    const update = () => {
      const t = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Europe/Lisbon',
        hour: '2-digit',
        minute: '2-digit',
      });
      setTime(t);
    };
    update();
    setInterval(update, 30000);
  }

  return <div className="font-sans text-md">{time || '—'} · Lisbon</div>;
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
