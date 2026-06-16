'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { NavFloating } from '@/components/sections/nav-floating';
import { Footer } from '@/components/sections/footer';

export default function RotkiPage() {
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('rk-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.rk-reveal').forEach((el) => observer.observe(el));

    // Hero reveals immediately
    setTimeout(() => {
      document.querySelectorAll('.rk-hero .rk-reveal').forEach((el) =>
        el.classList.add('rk-visible')
      );
    }, 100);

    // Stat counter
    function animateCount(el: Element, target: number, suffix: string) {
      const isNeg = target < 0;
      const abs = Math.abs(target);
      const duration = 1200;
      const startTime = performance.now();
      function update(now: number) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * abs);
        el.textContent = (isNeg ? '-' : '+') + current + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }

    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.rk-stat-num, .rk-result-num').forEach((el) => {
              const text = el.textContent?.trim() || '';
              const match = text.match(/([+-]?)(\d+)(%?)/);
              if (match) {
                const sign = match[1] === '-' ? -1 : 1;
                const val = parseInt(match[2]) * sign;
                animateCount(el, val, match[3] || '');
              }
            });
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.rk-stats, .rk-results-grid').forEach((el) =>
      statObserver.observe(el)
    );

    return () => {
      observer.disconnect();
      statObserver.disconnect();
    };
  }, []);

  return (
    <>
      <NavFloating />
      <main>
        <style>{`
          /* ── ROTKI CASE STUDY STYLES ── */
          .rk-reveal {
            opacity: 0;
            transform: translateY(28px);
            transition: opacity 700ms cubic-bezier(0.16,1,0.3,1),
                        transform 700ms cubic-bezier(0.16,1,0.3,1);
          }
          .rk-reveal.rk-visible { opacity: 1; transform: translateY(0); }
          .rk-d1 { transition-delay: 100ms; }
          .rk-d2 { transition-delay: 200ms; }
          .rk-d3 { transition-delay: 300ms; }
          .rk-d4 { transition-delay: 400ms; }

          /* HERO */
          .rk-hero {
            min-height: 100vh;
            background: #0a0a0a;
            color: #f0f2e9;
            display: grid;
            grid-template-rows: auto auto 1fr auto auto;
            padding: 120px 64px 64px;
            gap: 0;
          }
          .rk-back {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            text-decoration: none;
            color: rgba(240,242,233,0.45);
            margin-bottom: 48px;
            transition: color 250ms ease;
            align-self: flex-start;
          }
          .rk-back:hover { color: #d3fa53; }
          .rk-back svg { width: 12px; height: 12px; stroke: currentColor; fill: none; stroke-width: 2; transition: transform 250ms ease; }
          .rk-back:hover svg { transform: translateX(-3px); }

          /* EXEC SUMMARY */
          .rk-exec-summary {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            border-bottom: 1px solid rgba(240,242,233,0.08);
            background: #0a0a0a;
          }
          .rk-exec-col {
            padding: 56px 48px;
            border-right: 1px solid rgba(240,242,233,0.08);
          }
          .rk-exec-col:last-child { border-right: none; }
          .rk-exec-tag {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 20px;
            color: rgba(240,242,233,0.4);
          }
          .rk-exec-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
          .rk-exec-text {
            font-size: 15px;
            line-height: 1.6;
            color: rgba(240,242,233,0.7);
            margin-bottom: 24px;
          }
          .rk-exec-kpis { display: flex; gap: 20px; flex-wrap: wrap; }
          .rk-exec-kpi { display: flex; flex-direction: column; gap: 2px; }
          .rk-exec-kpi-num {
            font-family: 'Archivo Black', sans-serif;
            font-size: 28px;
            color: #d3fa53;
            letter-spacing: -0.02em;
          }
          .rk-exec-kpi-label {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: rgba(240,242,233,0.4);
            max-width: 90px;
            line-height: 1.3;
          }

          /* ITERATION CALLOUT */
          .rk-iteration {
            margin: 64px 0;
            border-radius: 8px;
            border: 1px solid rgba(240,242,233,0.1);
            overflow: hidden;
            background: #0a0a0a;
          }
          .rk-iteration-header {
            padding: 28px 40px;
            background: rgba(240,242,233,0.03);
            border-bottom: 1px solid rgba(240,242,233,0.08);
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .rk-iteration-header svg { width: 18px; height: 18px; stroke: #d3fa53; fill: none; stroke-width: 2; flex-shrink: 0; }
          .rk-iteration-header-text {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: rgba(240,242,233,0.6);
          }
          .rk-iteration-body {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
          }
          .rk-iteration-step { padding: 36px 40px; }
          .rk-iteration-step-label {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            margin-bottom: 14px;
          }
          .rk-iteration-step--before .rk-iteration-step-label { color: rgba(239,68,68,0.7); }
          .rk-iteration-step--after .rk-iteration-step-label { color: #d3fa53; }
          .rk-iteration-step-text { font-size: 14px; line-height: 1.6; color: rgba(240,242,233,0.8); }
          .rk-iteration-arrow {
            padding: 0 8px;
            color: rgba(240,242,233,0.25);
            font-size: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* TENSION ICONS */
          .rk-tension-icon {
            width: 32px;
            height: 32px;
            margin-bottom: 20px;
            stroke: #d3fa53;
            fill: none;
            stroke-width: 1.4;
            opacity: 0.85;
          }
          .rk-tension-col--friction .rk-tension-icon { stroke: #ef4444; }

          @media (max-width: 900px) {
            .rk-exec-summary { grid-template-columns: 1fr; }
            .rk-exec-col { border-right: none; border-bottom: 1px solid rgba(240,242,233,0.08); padding: 40px 32px; }
            .rk-iteration-body { grid-template-columns: 1fr; }
            .rk-iteration-arrow { padding: 8px 40px; justify-content: flex-start; transform: rotate(90deg); transform-origin: left; }
          }

          .rk-eyebrow {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: rgba(240,242,233,0.4);
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 48px;
          }
          .rk-eyebrow::before {
            content: '';
            width: 6px; height: 6px;
            background: #d3fa53;
            border-radius: 50%;
            display: inline-block;
          }

          .rk-hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: end;
            margin-bottom: 64px;
          }
          .rk-hero-title {
            font-family: 'Archivo Black', sans-serif;
            font-size: clamp(48px, 6vw, 96px);
            line-height: 0.95;
            letter-spacing: -0.02em;
            text-transform: uppercase;
            color: #f0f2e9;
          }
          .rk-hero-title em {
            font-style: normal;
            color: #d3fa53;
            display: block;
          }
          .rk-hero-subtitle {
            font-size: clamp(15px, 1.4vw, 18px);
            line-height: 1.6;
            color: rgba(240,242,233,0.55);
            max-width: 420px;
            align-self: end;
          }

          .rk-cover {
            width: 100%;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 64px;
          }
          .rk-cover img { width: 100%; display: block; }

          .rk-meta-bar {
            display: flex;
            border-top: 1px solid rgba(240,242,233,0.1);
          }
          .rk-meta-item {
            flex: 1;
            padding: 24px 0;
            border-right: 1px solid rgba(240,242,233,0.1);
          }
          .rk-meta-item:last-child { border-right: none; }
          .rk-meta-label {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: rgba(240,242,233,0.35);
            margin-bottom: 8px;
          }
          .rk-meta-value {
            font-size: 14px;
            font-weight: 500;
            color: #f0f2e9;
          }

          /* SECTIONS */
          .rk-section {
            padding: 120px 64px;
          }
          .rk-section--cream { background: #f0f2e9; color: #0a0a0a; }
          .rk-section--white { background: #ffffff; color: #0a0a0a; }
          .rk-section--dark  { background: #0a0a0a; color: #f0f2e9; }
          .rk-section--lime  { background: #d3fa53; color: #0a0a0a; }

          .rk-label {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: #5a7a00;
            margin-bottom: 20px;
          }
          .rk-section--dark .rk-label { color: #d3fa53; }
          .rk-section--lime .rk-label { color: #5a7a00; }

          .rk-title {
            font-family: 'Archivo Black', sans-serif;
            font-size: clamp(32px, 4vw, 60px);
            line-height: 1.0;
            letter-spacing: -0.02em;
            text-transform: uppercase;
            margin-bottom: 48px;
          }
          .rk-body {
            font-size: clamp(15px, 1.3vw, 17px);
            line-height: 1.65;
            color: rgba(10,10,10,0.5);
            max-width: 640px;
          }
          .rk-section--dark .rk-body { color: rgba(240,242,233,0.55); }
          .rk-section--lime .rk-body { color: rgba(10,10,10,0.6); }

          /* STATS */
          .rk-stats {
            display: grid;
            grid-template-columns: repeat(3,1fr);
            border: 1px solid rgba(10,10,10,0.1);
            border-radius: 8px;
            overflow: hidden;
            margin: 64px 0;
          }
          .rk-stat {
            padding: 40px 36px;
            border-right: 1px solid rgba(10,10,10,0.1);
          }
          .rk-stat:last-child { border-right: none; }
          .rk-stat-num {
            font-family: 'Archivo Black', sans-serif;
            font-size: clamp(40px,5vw,72px);
            line-height: 1;
            letter-spacing: -0.03em;
            color: #0a0a0a;
            margin-bottom: 12px;
          }
          .rk-stat-label {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: rgba(10,10,10,0.45);
            line-height: 1.4;
          }

          /* METHODS */
          .rk-methods {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 32px;
          }
          .rk-pill {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            padding: 10px 18px;
            border-radius: 9999px;
            border: 1px solid rgba(10,10,10,0.12);
            transition: background 200ms ease, border-color 200ms ease;
            cursor: default;
          }
          .rk-section--dark .rk-pill {
            border-color: rgba(240,242,233,0.15);
            color: rgba(240,242,233,0.7);
          }
          .rk-pill:hover { background: #d3fa53; border-color: #d3fa53; color: #0a0a0a; }

          /* PERSONAS */
          .rk-personas {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-top: 48px;
          }
          .rk-persona {
            padding: 40px;
            border-radius: 8px;
            border: 1px solid rgba(10,10,10,0.1);
            background: rgba(255,255,255,0.5);
            transition: transform 400ms cubic-bezier(0.16,1,0.3,1), box-shadow 400ms cubic-bezier(0.16,1,0.3,1);
          }
          .rk-persona:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.08); }
          .rk-persona-tag {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: #5a7a00;
            background: rgba(211,250,83,0.2);
            padding: 6px 12px;
            border-radius: 9999px;
            display: inline-block;
            margin-bottom: 20px;
          }
          .rk-persona-name {
            font-family: 'Archivo Black', sans-serif;
            font-size: 22px;
            text-transform: uppercase;
            letter-spacing: -0.01em;
            margin-bottom: 6px;
          }
          .rk-persona-meta {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 11px;
            color: rgba(10,10,10,0.45);
            margin-bottom: 28px;
          }
          .rk-persona-stitle {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: rgba(10,10,10,0.4);
            margin-bottom: 10px;
            margin-top: 20px;
          }
          .rk-persona-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
          .rk-persona-list li {
            font-size: 13px;
            line-height: 1.5;
            padding-left: 16px;
            position: relative;
          }
          .rk-persona-list li::before {
            content: '—';
            position: absolute;
            left: 0;
            color: #5a7a00;
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 11px;
          }

          /* TENSION */
          .rk-tension {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            border: 1px solid rgba(240,242,233,0.1);
            border-radius: 8px;
            overflow: hidden;
            margin-top: 48px;
          }
          .rk-tension-col {
            padding: 40px 32px;
            border-right: 1px solid rgba(240,242,233,0.1);
          }
          .rk-tension-col:last-child { border-right: none; }
          .rk-tension-col-title {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .rk-tension-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            display: inline-block;
          }
          .rk-tension-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
          .rk-tension-list li {
            font-size: 13px;
            line-height: 1.5;
            color: rgba(240,242,233,0.6);
            padding-left: 16px;
            position: relative;
          }
          .rk-tension-list li::before {
            content: '·';
            position: absolute;
            left: 0;
            color: #d3fa53;
            font-weight: 700;
          }
          .rk-tension-col--friction .rk-tension-list li::before { color: #ef4444; }
          .rk-tension-col--friction .rk-tension-list li { color: rgba(240,242,233,0.5); }

          /* FLOW COMPARE */
          .rk-flow-compare {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin: 48px 0;
          }
          .rk-flow-col {
            padding: 40px;
            border-radius: 8px;
          }
          .rk-flow-col--before {
            background: rgba(240,242,233,0.04);
            border: 1px solid rgba(240,242,233,0.1);
          }
          .rk-flow-col--after {
            background: rgba(211,250,83,0.06);
            border: 1px solid rgba(211,250,83,0.25);
          }
          .rk-flow-label {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            margin-bottom: 28px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .rk-flow-col--before .rk-flow-label { color: rgba(240,242,233,0.4); }
          .rk-flow-col--after .rk-flow-label { color: #d3fa53; }
          .rk-flow-steps { display: flex; flex-direction: column; }
          .rk-flow-step {
            display: flex;
            gap: 16px;
            align-items: flex-start;
            padding: 16px 0;
            border-bottom: 1px solid rgba(240,242,233,0.07);
          }
          .rk-flow-col--after .rk-flow-step { border-color: rgba(211,250,83,0.1); }
          .rk-flow-step:last-child { border-bottom: none; }
          .rk-flow-num {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 10px;
            min-width: 26px;
            height: 26px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .rk-flow-col--before .rk-flow-num {
            color: rgba(240,242,233,0.4);
            border: 1px solid rgba(240,242,233,0.15);
            background: rgba(240,242,233,0.03);
          }
          .rk-flow-col--after .rk-flow-num {
            color: #d3fa53;
            border: 1px solid rgba(211,250,83,0.3);
            background: rgba(211,250,83,0.06);
          }
          .rk-flow-text { font-size: 13px; line-height: 1.5; }
          .rk-flow-col--before .rk-flow-text { color: rgba(240,242,233,0.6); }
          .rk-flow-col--after .rk-flow-text { color: rgba(240,242,233,0.8); }
          .rk-flow-outcome {
            margin-top: 24px;
            padding: 14px 18px;
            border-radius: 6px;
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 11px;
            letter-spacing: 0.06em;
          }
          .rk-flow-col--before .rk-flow-outcome { background: rgba(239,68,68,0.1); color: rgba(239,68,68,0.8); }
          .rk-flow-col--after .rk-flow-outcome { background: rgba(211,250,83,0.1); color: #d3fa53; }

          /* DECISIONS */
          .rk-decisions { display: flex; flex-direction: column; gap: 2px; margin-top: 48px; }
          .rk-decision {
            padding: 40px;
            background: rgba(240,242,233,0.03);
            border: 1px solid rgba(240,242,233,0.08);
            border-radius: 8px;
            display: grid;
            grid-template-columns: auto 1fr auto;
            gap: 32px;
            align-items: start;
            transition: background 300ms ease, border-color 300ms ease;
          }
          .rk-decision:hover { background: rgba(240,242,233,0.06); border-color: rgba(211,250,83,0.2); }
          .rk-decision-num {
            font-family: 'Archivo Black', sans-serif;
            font-size: 48px;
            line-height: 1;
            color: rgba(240,242,233,0.07);
            min-width: 64px;
          }
          .rk-problem-label, .rk-approach-label {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            margin-bottom: 8px;
          }
          .rk-problem-label { color: rgba(240,242,233,0.3); }
          .rk-approach-label { color: #d3fa53; margin-top: 20px; }
          .rk-problem-text { font-size: 14px; line-height: 1.6; color: rgba(240,242,233,0.5); margin-bottom: 0; max-width: 480px; }
          .rk-approach-text { font-size: 14px; line-height: 1.6; color: rgba(240,242,233,0.75); max-width: 480px; }
          .rk-decision-outcome { min-width: 140px; text-align: right; }
          .rk-outcome-item {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 11px;
            color: #d3fa53;
            margin-bottom: 6px;
            opacity: 0.8;
          }

          /* CONTROVERSIAL */
          .rk-controversial {
            margin-top: 64px;
            padding: 56px;
            border-radius: 8px;
            background: rgba(211,250,83,0.06);
            border: 1px solid rgba(211,250,83,0.2);
            position: relative;
            overflow: hidden;
          }
          .rk-controversial::before {
            content: '!';
            position: absolute;
            right: 40px; top: 40px;
            font-family: 'Archivo Black', sans-serif;
            font-size: 120px;
            line-height: 1;
            color: rgba(211,250,83,0.05);
            pointer-events: none;
          }
          .rk-controversial-label {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: #d3fa53;
            margin-bottom: 20px;
          }
          .rk-controversial-text { font-size: clamp(15px,1.4vw,18px); line-height: 1.65; color: rgba(240,242,233,0.7); max-width: 680px; }
          .rk-controversial-items { margin-top: 28px; display: flex; flex-direction: column; gap: 10px; }
          .rk-controversial-item {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 12px;
            color: #d3fa53;
            padding: 10px 16px;
            background: rgba(211,250,83,0.08);
            border-radius: 6px;
            display: inline-flex;
            align-items: center;
            gap: 10px;
          }
          .rk-controversial-item::before { content: '→'; opacity: 0.6; }

          /* IMAGE PLACEHOLDER */
          .rk-img-wrap { margin: 48px 0; }
          .rk-img-wrap img { width: 100%; display: block; border-radius: 4px; }
          .rk-placeholder {
            width: 100%;
            background: rgba(240,242,233,0.06);
            border: 1px solid rgba(240,242,233,0.1);
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            color: rgba(240,242,233,0.2);
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.14em;
          }
          .rk-section--cream .rk-placeholder,
          .rk-section--white .rk-placeholder,
          .rk-section--lime .rk-placeholder {
            background: rgba(10,10,10,0.04);
            border-color: rgba(10,10,10,0.08);
            color: rgba(10,10,10,0.2);
          }
          .rk-placeholder svg { width: 28px; height: 28px; stroke: currentColor; fill: none; stroke-width: 1.2; opacity: 0.5; }
          .rk-img-caption {
            margin-top: 12px;
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            opacity: 0.35;
          }

          /* RESULTS */
          .rk-results-grid {
            display: grid;
            grid-template-columns: repeat(3,1fr);
            border-top: 1px solid rgba(240,242,233,0.1);
            border-left: 1px solid rgba(240,242,233,0.1);
            margin-top: 64px;
          }
          .rk-result {
            padding: 48px 40px;
            border-right: 1px solid rgba(240,242,233,0.1);
            border-bottom: 1px solid rgba(240,242,233,0.1);
            transition: background 300ms ease;
          }
          .rk-result:hover { background: rgba(211,250,83,0.04); }
          .rk-result-num {
            font-family: 'Archivo Black', sans-serif;
            font-size: clamp(44px,5vw,72px);
            line-height: 1;
            letter-spacing: -0.03em;
            color: #d3fa53;
            margin-bottom: 16px;
          }
          .rk-result-label { font-size: 14px; line-height: 1.5; color: rgba(240,242,233,0.5); }

          /* TAKEAWAY */
          .rk-takeaway-quote {
            font-family: 'Archivo Black', sans-serif;
            font-size: clamp(28px,3.5vw,52px);
            line-height: 1.05;
            letter-spacing: -0.02em;
            text-transform: uppercase;
            color: #0a0a0a;
            margin: 48px 0;
            max-width: 820px;
          }
          .rk-takeaway-quote em { font-style: normal; color: #5a7a00; }

          /* NEXT PROJECT */
          .rk-next {
            display: block;
            padding: 80px 64px;
            background: #d3fa53;
            text-decoration: none;
            color: #0a0a0a;
            position: relative;
            overflow: hidden;
            transition: background 300ms ease;
          }
          .rk-next:hover { background: #c5f040; }
          .rk-next-label {
            font-family: var(--font-geist-mono, 'Geist Mono', monospace);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            opacity: 0.5;
            margin-bottom: 16px;
          }
          .rk-next-title {
            font-family: 'Archivo Black', sans-serif;
            font-size: clamp(36px,5vw,72px);
            text-transform: uppercase;
            letter-spacing: -0.02em;
            line-height: 0.95;
          }
          .rk-next-arrow {
            position: absolute;
            right: 64px; top: 50%;
            transform: translateY(-50%);
            font-family: 'Archivo Black', sans-serif;
            font-size: 80px;
            line-height: 1;
            transition: transform 400ms cubic-bezier(0.16,1,0.3,1);
          }
          .rk-next:hover .rk-next-arrow { transform: translateY(-50%) translateX(16px); }

          /* RESPONSIVE */
          @media (max-width: 900px) {
            .rk-hero { padding: 100px 32px 48px; }
            .rk-hero-content { grid-template-columns: 1fr; gap: 32px; }
            .rk-section { padding: 80px 32px; }
            .rk-personas { grid-template-columns: 1fr; }
            .rk-tension { grid-template-columns: 1fr; }
            .rk-flow-compare { grid-template-columns: 1fr; }
            .rk-results-grid { grid-template-columns: 1fr 1fr; }
            .rk-stats { grid-template-columns: 1fr; }
            .rk-decision { grid-template-columns: 1fr; }
            .rk-decision-outcome { text-align: left; }
            .rk-meta-bar { flex-wrap: wrap; }
            .rk-meta-item { flex: 1 1 33%; }
            .rk-controversial { padding: 40px 32px; }
            .rk-next { padding: 56px 32px; }
            .rk-next-arrow { display: none; }
          }
        `}</style>

        {/* ── HERO ── */}
        <section className="rk-hero rk-hero" data-nav-theme="dark">
          <Link href="/" className="rk-back rk-reveal">
            <svg viewBox="0 0 14 14"><path d="M9 2L4 7L9 12"/></svg>
            Back
          </Link>

          <div className="rk-eyebrow rk-reveal rk-d1">UX Case Study · 2026</div>

          <div className="rk-hero-content">
            <h1 className="rk-hero-title rk-reveal rk-d2">
              Designing<br />trust<br /><em>before ask.</em>
            </h1>
            <p className="rk-hero-subtitle rk-reveal rk-d3">
              Rotki is a privacy-first crypto portfolio tracker. The product&apos;s promise is that your financial data stays on your device — always. But the onboarding was breaking that promise before users could see it.
            </p>
          </div>

          <div className="rk-cover rk-reveal rk-d4">
            <div className="rk-placeholder" style={{ aspectRatio: '16/5.5', padding: '32px' }}>
              <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              Cover image — Rotki_cover_Homepage.png
            </div>
          </div>

          <div className="rk-meta-bar">
            {[
              { label: 'Client', value: 'Rotki (Open Source)' },
              { label: 'Year', value: '2026' },
              { label: 'Role', value: 'UX Designer' },
              { label: 'Scope', value: 'Onboarding redesign' },
              { label: 'Timeline', value: '3 months' },
              { label: 'Industry', value: 'Web3 / Crypto' },
            ].map((item, i) => (
              <div className="rk-meta-item rk-reveal" key={item.label} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="rk-meta-label">{item.label}</div>
                <div className="rk-meta-value">{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXEC SUMMARY — Problem / Approach / Result ── */}
        <section className="rk-exec-summary" data-nav-theme="dark">
          <div className="rk-exec-col rk-reveal">
            <div className="rk-exec-tag"><span className="rk-exec-dot" style={{ background: '#ef4444' }} />Problem</div>
            <div className="rk-exec-text">Onboarding asked for trust before earning it. Users hit API key setup and RPC configuration before seeing a single real screen — and left.</div>
            <div className="rk-exec-kpis">
              <div className="rk-exec-kpi">
                <div className="rk-exec-kpi-num">41%</div>
                <div className="rk-exec-kpi-label">Drop-off at step 3</div>
              </div>
            </div>
          </div>
          <div className="rk-exec-col rk-reveal rk-d1">
            <div className="rk-exec-tag"><span className="rk-exec-dot" style={{ background: '#d3fa53' }} />Approach</div>
            <div className="rk-exec-text">Shadowing revealed the real friction was cognitive load at step 3 — not the steps before or after it. Redesigned the flow so the dashboard opens right after that step.</div>
            <div className="rk-exec-kpis">
              <div className="rk-exec-kpi">
                <div className="rk-exec-kpi-num">3mo</div>
                <div className="rk-exec-kpi-label">Discovery to ship</div>
              </div>
            </div>
          </div>
          <div className="rk-exec-col rk-reveal rk-d2">
            <div className="rk-exec-tag"><span className="rk-exec-dot" style={{ background: '#d3fa53' }} />Result</div>
            <div className="rk-exec-text">Drop-off dropped, dashboard activation rose, and support tickets about onboarding fell — without removing any of the product&apos;s privacy guarantees.</div>
            <div className="rk-exec-kpis">
              <div className="rk-exec-kpi">
                <div className="rk-exec-kpi-num">-45%</div>
                <div className="rk-exec-kpi-label">Drop-off</div>
              </div>
              <div className="rk-exec-kpi">
                <div className="rk-exec-kpi-num">+50%</div>
                <div className="rk-exec-kpi-label">Activation</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 01 BRIEF ── */}
        <section className="rk-section rk-section--cream" data-nav-theme="light">
          <div className="rk-label rk-reveal">The Brief</div>
          <h2 className="rk-title rk-reveal rk-d1">The wrong<br />order of trust.</h2>
          <p className="rk-body rk-reveal rk-d2">
            The existing onboarding asks users to trust the product in exactly the wrong order. By step 3 — before seeing a single meaningful screen — users are directed to create an Etherscan account, generate API keys, and configure RPC nodes.<br /><br />
            The user who cares most about financial privacy is precisely the user who stops here.
          </p>

          <div className="rk-stats rk-reveal rk-d3">
            {[
              { num: '64%', label: 'Users worried about centralization and third-party leaks' },
              { num: '41%', label: 'Abandoned at the Etherscan API key step — before seeing any value' },
              { num: '6',   label: 'Steps required before seeing a dashboard. Most dropped off by step 3' },
            ].map((s) => (
              <div className="rk-stat" key={s.num}>
                <div className="rk-stat-num">{s.num}</div>
                <div className="rk-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="rk-img-wrap rk-reveal">
            <div className="rk-placeholder" style={{ aspectRatio: '16/6', padding: '40px' }}>
              <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              imagem_2.png — Discovery & research phase
            </div>
            <div className="rk-img-caption">Discovery & research phase</div>
          </div>

          <div className="rk-label rk-reveal" style={{ marginTop: '80px' }}>01 — Discovery</div>
          <p className="rk-body rk-reveal rk-d1">
            Discovery focused on understanding how privacy-conscious crypto investors experience onboarding — and where trust breaks down before they see any value.
          </p>
          <div className="rk-methods rk-reveal rk-d2">
            {['Community surveys', 'User interviews', 'Persona profiles', 'Onboarding audit', 'Competitor analysis', 'Shadowing sessions'].map((m) => (
              <div className="rk-pill" key={m}>{m}</div>
            ))}
          </div>

          <div className="rk-iteration rk-reveal">
            <div className="rk-iteration-header">
              <svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9" /><path d="M3 4v8h8" /></svg>
              <div className="rk-iteration-header-text">Course correction — shadowing changed the plan</div>
            </div>
            <div className="rk-iteration-body">
              <div className="rk-iteration-step rk-iteration-step--before">
                <div className="rk-iteration-step-label">What I had planned</div>
                <div className="rk-iteration-step-text">Wireframes for a 6-step onboarding were already underway — surveys and interviews suggested the main problem was step count and API friction.</div>
              </div>
              <div className="rk-iteration-arrow">→</div>
              <div className="rk-iteration-step rk-iteration-step--after">
                <div className="rk-iteration-step-label">What shadowing revealed</div>
                <div className="rk-iteration-step-text">Watching real sessions showed the issue wasn&apos;t step count — it was cognitive overload at step 3 specifically. Users weren&apos;t confused by the number of steps; they froze at one. That meant going back into wireframes already in progress and redesigning the flow so the dashboard opens immediately after step 3, instead of after step 6.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 PERSONAS ── */}
        <section className="rk-section rk-section--white" data-nav-theme="light">
          <div className="rk-label rk-reveal">02 — Personas & User Needs</div>
          <h2 className="rk-title rk-reveal rk-d1">Two audiences,<br />one broken flow.</h2>
          <p className="rk-body rk-reveal rk-d2">
            Research revealed two primary user groups with very different expectations — but the same friction point: the product asked for trust before earning it.
          </p>

          <div className="rk-personas">
            <div className="rk-persona rk-reveal rk-d1">
              <div className="rk-persona-tag">Privacy Advocate</div>
              <div className="rk-persona-name">DeFi Power User</div>
              <div className="rk-persona-meta">Age 25–40 · Self-custody investor</div>
              <div className="rk-persona-stitle">Frustrations</div>
              <ul className="rk-persona-list">
                <li>Centralized servers linking IP addresses and wallets to real identity</li>
                <li>Being asked to configure API keys before seeing anything useful</li>
              </ul>
              <div className="rk-persona-stitle">Needs</div>
              <ul className="rk-persona-list">
                <li>Understand what the product does — and doesn&apos;t — before committing</li>
                <li>See real value immediately after connecting a wallet</li>
              </ul>
            </div>
            <div className="rk-persona rk-reveal rk-d2">
              <div className="rk-persona-tag">Accountant / Auditor</div>
              <div className="rk-persona-name">Tax Specialist</div>
              <div className="rk-persona-meta">Age 30–55 · Portfolio auditor</div>
              <div className="rk-persona-stitle">Frustrations</div>
              <ul className="rk-persona-list">
                <li>Technical setup that assumes developer knowledge</li>
                <li>Messy CSV exports with gaps and missing cost-basis data</li>
              </ul>
              <div className="rk-persona-stitle">Needs</div>
              <ul className="rk-persona-list">
                <li>Double-entry ledger precision</li>
                <li>Custom tax accounting rules (FIFO, LIFO)</li>
              </ul>
            </div>
          </div>

          <div className="rk-img-wrap rk-reveal" style={{ marginTop: '64px' }}>
            <div className="rk-placeholder" style={{ aspectRatio: '16/6', padding: '40px' }}>
              <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              imagem_3.png — Persona profile
            </div>
          </div>
        </section>

        {/* ── 03 STRUCTURAL TENSION ── */}
        <section className="rk-section rk-section--dark" data-nav-theme="dark">
          <div className="rk-label rk-reveal">03 — Structural Tension</div>
          <h2 className="rk-title rk-reveal rk-d1">The core tension<br />wasn&apos;t usability.</h2>
          <p className="rk-body rk-reveal rk-d2">
            It was earning trust before asking for effort. The more configuration required upfront, the higher the drop-off before any value was seen.
          </p>

          <div className="rk-tension rk-reveal rk-d3">
            <div className="rk-tension-col">
              <svg className="rk-tension-icon" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
              <div className="rk-tension-col-title">
                <span className="rk-tension-dot" style={{ background: 'rgba(240,242,233,0.4)' }} />
                What the product needed
              </div>
              <ul className="rk-tension-list">
                <li>Local encryption keys</li>
                <li>Third-party API setup</li>
                <li>RPC node configuration</li>
                <li>Wallet address input</li>
              </ul>
            </div>
            <div className="rk-tension-col">
              <svg className="rk-tension-icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
              <div className="rk-tension-col-title">
                <span className="rk-tension-dot" style={{ background: 'rgba(240,242,233,0.4)' }} />
                What the user wanted
              </div>
              <ul className="rk-tension-list">
                <li>See value immediately</li>
                <li>Zero setup friction</li>
                <li>Understand the privacy promise</li>
                <li>Feel in control from step one</li>
              </ul>
            </div>
            <div className="rk-tension-col rk-tension-col--friction">
              <svg className="rk-tension-icon" viewBox="0 0 24 24"><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.3 3.9L2.5 17a2 2 0 001.7 3h15.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" /></svg>
              <div className="rk-tension-col-title">
                <span className="rk-tension-dot" style={{ background: '#ef4444' }} />
                This created friction
              </div>
              <ul className="rk-tension-list">
                <li>High drop-off before value</li>
                <li>Trust broken before it&apos;s built</li>
                <li>Privacy-first users leave first</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── 04 USER FLOWS ── */}
        <section className="rk-section rk-section--dark" style={{ paddingTop: 0 }} data-nav-theme="dark">
          <div className="rk-label rk-reveal">04 — User Flows</div>
          <h2 className="rk-title rk-reveal rk-d1">Setup-first<br />to value-first.</h2>
          <p className="rk-body rk-reveal rk-d2">
            The core shift: configuration happens progressively, when it&apos;s relevant — not as a prerequisite to seeing anything.
          </p>

          <div className="rk-flow-compare rk-reveal rk-d3">
            <div className="rk-flow-col rk-flow-col--before">
              <div className="rk-flow-label">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(239,68,68,0.6)', display: 'inline-block' }} />
                Before — Setup first
              </div>
              <div className="rk-flow-steps">
                {[
                  { num: '01', text: 'Download & install — security warnings before even opening' },
                  { num: '02', text: 'Create local account — no context on why it exists or what it protects' },
                  { num: '03', text: 'Configure Etherscan API key — leave the app, create a third-party account, copy key. Before seeing any value.' },
                  { num: '04–06', text: 'Configure RPC nodes, add wallets, add exchange keys' },
                ].map((s) => (
                  <div className="rk-flow-step" key={s.num}>
                    <div className="rk-flow-num">{s.num}</div>
                    <div className="rk-flow-text">{s.text}</div>
                  </div>
                ))}
              </div>
              <div className="rk-flow-outcome">↓ Most users dropped off by step 3</div>
            </div>
            <div className="rk-flow-col rk-flow-col--after">
              <div className="rk-flow-label">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d3fa53', display: 'inline-block' }} />
                After — Value first
              </div>
              <div className="rk-flow-steps">
                {[
                  { num: '01', text: 'See the promise — show what the product does with a visual, before asking anything' },
                  { num: '02', text: 'Create local account — with clear context: "this password encrypts your data locally, not on any server"' },
                  { num: '03', text: 'Add one wallet — minimum viable connection, see your first balance immediately' },
                  { num: '04', text: 'Live dashboard — user has seen real value. Now earn the right to ask for more.' },
                ].map((s) => (
                  <div className="rk-flow-step" key={s.num}>
                    <div className="rk-flow-num">{s.num}</div>
                    <div className="rk-flow-text">{s.text}</div>
                  </div>
                ))}
              </div>
              <div className="rk-flow-outcome">↑ Activation rate · ↓ Drop-off</div>
            </div>
          </div>

          <div className="rk-label rk-reveal" style={{ marginTop: '80px' }}>Design Decisions</div>
          <div className="rk-decisions">
            {[
              {
                num: '01',
                problem: 'The first screen was a login form with a warning: "Do not forget your password. It cannot be recovered." That\'s the opening move.',
                approach: 'Replace the login screen with a demo preview of the dashboard. One line of copy: "Your financial data. Only on your device. Always." The form comes second.',
                outcomes: ['↑ Users reaching account creation', '↓ Immediate drop-off'],
              },
              {
                num: '02',
                problem: 'Local encryption is Rotki\'s strongest differentiator. The current screen treats it as a risk disclaimer rather than a selling point.',
                approach: 'Reframe: "this password is the key to your private vault — Rotki uses it to encrypt your database, which lives only on this machine." Show what doesn\'t happen: "Never sent to any server."',
                outcomes: ['↑ Trust perception', '↑ Account creation rate'],
              },
            ].map((d, i) => (
              <div className={`rk-decision rk-reveal rk-d${i + 1}`} key={d.num}>
                <div className="rk-decision-num">{d.num}</div>
                <div>
                  <div className="rk-problem-label">Problem</div>
                  <div className="rk-problem-text">{d.problem}</div>
                  <div className="rk-approach-label">Design approach</div>
                  <div className="rk-approach-text">{d.approach}</div>
                </div>
                <div className="rk-decision-outcome">
                  {d.outcomes.map((o) => <div className="rk-outcome-item" key={o}>{o}</div>)}
                </div>
              </div>
            ))}
          </div>

          <div className="rk-controversial rk-reveal">
            <div className="rk-controversial-label">A Controversial Decision</div>
            <div className="rk-controversial-text">
              We removed Etherscan setup from the critical path entirely. This is technically correct — without it, queries are slower — but it&apos;s the wrong trade-off for first-time users.
            </div>
            <div className="rk-controversial-items">
              {[
                'After adding their first wallet, users see their portfolio immediately',
                'Non-blocking nudge: "Add a free Etherscan key to make balance queries faster"',
                'Critical path = shortest path to value',
              ].map((item) => (
                <div className="rk-controversial-item" key={item}>{item}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05 WIREFRAMES ── */}
        <section className="rk-section rk-section--cream" data-nav-theme="light">
          <div className="rk-label rk-reveal">05 — Wireframes & Iteration</div>
          <h2 className="rk-title rk-reveal rk-d1">Earn trust<br />progressively.</h2>
          <p className="rk-body rk-reveal rk-d2">
            Low-fidelity wireframes were used to validate the new onboarding sequence before moving into visual UI. Designed to earn trust progressively, not demand it upfront.
          </p>

          <div className="rk-img-wrap rk-reveal rk-d3">
            <div className="rk-placeholder" style={{ aspectRatio: '16/6', padding: '40px' }}>
              <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              final_2.png — Hi-res wireframes
            </div>
            <div className="rk-img-caption">Hi-res wireframes — used to refine flows and reduce friction</div>
          </div>

          <div className="rk-img-wrap rk-reveal">
            <div className="rk-placeholder" style={{ aspectRatio: '16/6', padding: '40px' }}>
              <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              final_1.png — Final prototypes
            </div>
            <div className="rk-img-caption">Final prototypes — used to simulate real usage and align with development</div>
          </div>
        </section>

        {/* ── 06 RESULTS ── */}
        <section className="rk-section rk-section--dark" data-nav-theme="dark">
          <div className="rk-label rk-reveal">06 — Results</div>
          <h2 className="rk-title rk-reveal rk-d1">Fewer steps.<br />Clearer promise.</h2>

          <div className="rk-results-grid rk-reveal rk-d2">
            {[
              { num: '-45%', label: 'Reduction in onboarding drop-off at configuration steps' },
              { num: '+50%', label: 'Increase in users reaching the dashboard on first run' },
              { num: '-60%', label: 'Decrease in support requests related to onboarding setup' },
            ].map((r) => (
              <div className="rk-result" key={r.num}>
                <div className="rk-result-num">{r.num}</div>
                <div className="rk-result-label">{r.label}</div>
              </div>
            ))}
          </div>

          <div className="rk-img-wrap rk-reveal" style={{ marginTop: '64px' }}>
            <div className="rk-placeholder" style={{ aspectRatio: '16/6', padding: '40px' }}>
              <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              wall.png — Results visualization
            </div>
          </div>
        </section>

        {/* ── 07 TAKEAWAYS ── */}
        <section className="rk-section rk-section--lime" data-nav-theme="lime">
          <div className="rk-label rk-reveal">07 — Takeaways</div>
          <div className="rk-takeaway-quote rk-reveal rk-d1">
            Designing for trust means <em>sequencing correctly.</em>
          </div>
          <p className="rk-body rk-reveal rk-d2">
            The product doesn&apos;t need to be simpler — it needs to earn attention before asking for effort. The rest of the product — dashboard, tax reporting, exchange history — was scoped out intentionally. Those surfaces have their own complexity. This project was about one question: does the first five minutes earn trust, or spend it?
          </p>

          <div className="rk-img-wrap rk-reveal rk-d3">
            <div className="rk-placeholder" style={{ aspectRatio: '16/6', padding: '40px' }}>
              <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              imagem_4.png — Takeaways
            </div>
          </div>

          <p className="rk-reveal" style={{ marginTop: '48px', fontSize: 'clamp(18px,2vw,26px)', fontWeight: 600, color: '#0a0a0a' }}>
            Good tools don&apos;t compromise privacy. They protect it.
          </p>
        </section>

        {/* ── NEXT PROJECT ── */}
        <Link href="/work/emerald-clinical" className="rk-next">
          <div className="rk-next-label">Next project</div>
          <div className="rk-next-title">Emerald<br />Clinical</div>
          <div className="rk-next-arrow">→</div>
        </Link>
      </main>

      <Footer />
    </>
  );
}
