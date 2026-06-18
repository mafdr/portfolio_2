'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { NavFloating } from '@/components/sections/nav-floating';
import { Footer } from '@/components/sections/footer';

export default function HumanlyPage() {
  useEffect(() => {
    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hy-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.hy-reveal').forEach((el) => observer.observe(el));
    setTimeout(() => {
      document.querySelectorAll('.hy-hero .hy-reveal').forEach((el) => el.classList.add('hy-visible'));
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
        el.textContent = (isNeg ? '-' : '+') + Math.round(eased * abs) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.hy-stat-num, .hy-result-num, .hy-kpi-num').forEach((el) => {
              const text = el.textContent?.trim() || '';
              const match = text.match(/([+-]?)(\d+)(%?)/);
              if (match) {
                const sign = match[1] === '-' ? -1 : 1;
                animateCount(el, parseInt(match[2]) * sign, match[3] || '');
              }
            });
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('.hy-stats, .hy-results-grid, .hy-exec-summary').forEach((el) =>
      statObserver.observe(el)
    );

    return () => { observer.disconnect(); statObserver.disconnect(); };
  }, []);

  const PlaceholderIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.2, opacity: 0.4 }}>
      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
    </svg>
  );

  const DarkPlaceholder = ({ ratio, label }: { ratio: string; label: string }) => (
    <div style={{ aspectRatio: ratio, padding: '40px', background: 'rgba(240,242,233,0.04)', border: '1px solid rgba(240,242,233,0.08)', borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'rgba(240,242,233,0.2)', fontFamily: 'var(--font-geist-mono,monospace)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
      <PlaceholderIcon />{label}
    </div>
  );

  const LightPlaceholder = ({ ratio, label }: { ratio: string; label: string }) => (
    <div style={{ aspectRatio: ratio, padding: '40px', background: 'rgba(10,10,10,0.04)', border: '1px solid rgba(10,10,10,0.08)', borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'rgba(10,10,10,0.2)', fontFamily: 'var(--font-geist-mono,monospace)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
      <PlaceholderIcon />{label}
    </div>
  );

  return (
    <>
      <NavFloating />
      <main>
        <style>{`
          .hy-reveal { opacity:0; transform:translateY(28px); transition:opacity 700ms cubic-bezier(0.16,1,0.3,1),transform 700ms cubic-bezier(0.16,1,0.3,1); }
          .hy-reveal.hy-visible { opacity:1; transform:translateY(0); }
          .hy-d1{transition-delay:100ms} .hy-d2{transition-delay:200ms} .hy-d3{transition-delay:300ms} .hy-d4{transition-delay:400ms}

          /* HERO */
          .hy-hero { min-height:100vh; background:#0a0a0a; color:#f0f2e9; padding:120px 64px 64px; display:flex; flex-direction:column; }
          .hy-back { display:inline-flex; align-items:center; gap:8px; font-family:var(--font-geist-mono,monospace); font-size:10px; text-transform:uppercase; letter-spacing:0.14em; text-decoration:none; color:rgba(240,242,233,0.45); margin-bottom:48px; transition:color 250ms ease; align-self:flex-start; }
          .hy-back:hover { color:#d3fa53; }
          .hy-back svg { width:12px; height:12px; stroke:currentColor; fill:none; stroke-width:2; transition:transform 250ms ease; }
          .hy-back:hover svg { transform:translateX(-3px); }
          .hy-eyebrow { font-family:var(--font-geist-mono,monospace); font-size:11px; text-transform:uppercase; letter-spacing:0.14em; color:rgba(240,242,233,0.4); display:flex; align-items:center; gap:10px; margin-bottom:48px; }
          .hy-eyebrow::before { content:''; width:6px; height:6px; background:#d3fa53; border-radius:50%; display:inline-block; }
          .hy-hero-content { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:end; margin-bottom:64px; }
          .hy-title-main { font-family:'Archivo Black',sans-serif; font-size:clamp(48px,6vw,96px); line-height:0.95; letter-spacing:-0.02em; text-transform:uppercase; }
          .hy-title-main em { font-style:normal; color:#d3fa53; display:block; }
          .hy-subtitle { font-size:clamp(15px,1.4vw,18px); line-height:1.6; color:rgba(240,242,233,0.55); max-width:420px; align-self:end; }
          .hy-cover { width:100%; border-radius:4px; overflow:hidden; margin-bottom:64px; }
          .hy-meta-bar { display:flex; border-top:1px solid rgba(240,242,233,0.1); flex-wrap:wrap; }
          .hy-meta-item { flex:1; min-width:160px; padding:24px 0; border-right:1px solid rgba(240,242,233,0.1); }
          .hy-meta-item:last-child { border-right:none; }
          .hy-meta-label { font-family:var(--font-geist-mono,monospace); font-size:10px; text-transform:uppercase; letter-spacing:0.14em; color:rgba(240,242,233,0.35); margin-bottom:8px; }
          .hy-meta-value { font-size:14px; font-weight:500; color:#f0f2e9; }

          /* EXEC SUMMARY */
          .hy-exec-summary { display:grid; grid-template-columns:1fr 1fr 1fr; background:#0a0a0a; border-bottom:1px solid rgba(240,242,233,0.08); }
          .hy-exec-col { padding:56px 48px; border-right:1px solid rgba(240,242,233,0.08); }
          .hy-exec-col:last-child { border-right:none; }
          .hy-exec-tag { font-family:var(--font-geist-mono,monospace); font-size:10px; text-transform:uppercase; letter-spacing:0.16em; display:flex; align-items:center; gap:8px; margin-bottom:20px; color:rgba(240,242,233,0.4); }
          .hy-exec-dot { width:6px; height:6px; border-radius:50%; display:inline-block; }
          .hy-exec-text { font-size:15px; line-height:1.6; color:rgba(240,242,233,0.7); margin-bottom:24px; }
          .hy-exec-kpis { display:flex; gap:20px; flex-wrap:wrap; }
          .hy-exec-kpi { display:flex; flex-direction:column; gap:2px; }
          .hy-kpi-num { font-family:'Archivo Black',sans-serif; font-size:28px; color:#d3fa53; letter-spacing:-0.02em; }
          .hy-kpi-label { font-family:var(--font-geist-mono,monospace); font-size:9px; text-transform:uppercase; letter-spacing:0.08em; color:rgba(240,242,233,0.4); max-width:90px; line-height:1.3; }

          /* SECTIONS */
          .hy-section { padding:120px 64px; }
          .hy-section--cream { background:#f0f2e9; color:#0a0a0a; }
          .hy-section--dark  { background:#0a0a0a; color:#f0f2e9; }
          .hy-section--lime  { background:#d3fa53; color:#0a0a0a; }
          .hy-section--white { background:#fff; color:#0a0a0a; }
          .hy-label { font-family:var(--font-geist-mono,monospace); font-size:11px; text-transform:uppercase; letter-spacing:0.14em; color:#5a7a00; margin-bottom:20px; }
          .hy-section--dark .hy-label { color:#d3fa53; }
          .hy-section--lime .hy-label { color:#5a7a00; }
          .hy-sec-title { font-family:'Archivo Black',sans-serif; font-size:clamp(32px,4vw,60px); line-height:1.0; letter-spacing:-0.02em; text-transform:uppercase; margin-bottom:48px; }
          .hy-body { font-size:clamp(15px,1.3vw,17px); line-height:1.65; color:rgba(10,10,10,0.5); max-width:640px; }
          .hy-section--dark .hy-body { color:rgba(240,242,233,0.55); }
          .hy-section--lime .hy-body { color:rgba(10,10,10,0.6); }

          /* METHODS */
          .hy-methods { display:flex; flex-wrap:wrap; gap:10px; margin-top:32px; }
          .hy-pill { font-family:var(--font-geist-mono,monospace); font-size:11px; text-transform:uppercase; letter-spacing:0.1em; padding:10px 18px; border-radius:9999px; border:1px solid rgba(10,10,10,0.1); transition:background 200ms ease; cursor:default; }
          .hy-section--dark .hy-pill { border-color:rgba(240,242,233,0.15); color:rgba(240,242,233,0.7); }
          .hy-pill:hover { background:#d3fa53; border-color:#d3fa53; color:#0a0a0a; }

          /* DESIGN STAGES */
          .hy-stages { display:grid; grid-template-columns:repeat(4,1fr); border:1px solid rgba(10,10,10,0.1); border-radius:8px; overflow:hidden; margin-top:48px; }
          .hy-stage { padding:32px 28px; border-right:1px solid rgba(10,10,10,0.1); }
          .hy-stage:last-child { border-right:none; }
          .hy-stage-num { font-family:'Archivo Black',sans-serif; font-size:40px; line-height:1; letter-spacing:-0.03em; color:rgba(10,10,10,0.07); margin-bottom:12px; }
          .hy-stage-title { font-family:var(--font-geist-mono,monospace); font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:#5a7a00; margin-bottom:16px; }
          .hy-stage-list { list-style:none; display:flex; flex-direction:column; gap:8px; }
          .hy-stage-list li { font-size:13px; line-height:1.4; color:rgba(10,10,10,0.45); padding-left:14px; position:relative; }
          .hy-stage-list li::before { content:'—'; position:absolute; left:0; color:#5a7a00; font-family:var(--font-geist-mono,monospace); font-size:10px; }

          /* STATS */
          .hy-stats { display:grid; grid-template-columns:repeat(3,1fr); border:1px solid rgba(10,10,10,0.1); border-radius:8px; overflow:hidden; margin:64px 0; }
          .hy-stat { padding:40px 36px; border-right:1px solid rgba(10,10,10,0.1); }
          .hy-stat:last-child { border-right:none; }
          .hy-stat-num { font-family:'Archivo Black',sans-serif; font-size:clamp(40px,5vw,72px); line-height:1; letter-spacing:-0.03em; color:#0a0a0a; margin-bottom:12px; }
          .hy-stat-label { font-family:var(--font-geist-mono,monospace); font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:rgba(10,10,10,0.4); line-height:1.4; }

          /* PERSONAS */
          .hy-personas { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:48px; }
          .hy-persona { padding:40px; border-radius:8px; border:1px solid rgba(10,10,10,0.1); background:rgba(255,255,255,0.5); transition:transform 400ms cubic-bezier(0.16,1,0.3,1),box-shadow 400ms cubic-bezier(0.16,1,0.3,1); }
          .hy-persona:hover { transform:translateY(-6px); box-shadow:0 24px 60px rgba(0,0,0,0.08); }
          .hy-persona-tag { font-family:var(--font-geist-mono,monospace); font-size:10px; text-transform:uppercase; letter-spacing:0.14em; color:#5a7a00; background:rgba(211,250,83,0.2); padding:6px 12px; border-radius:9999px; display:inline-block; margin-bottom:20px; }
          .hy-persona-name { font-family:'Archivo Black',sans-serif; font-size:22px; text-transform:uppercase; letter-spacing:-0.01em; margin-bottom:6px; }
          .hy-persona-meta { font-family:var(--font-geist-mono,monospace); font-size:11px; color:rgba(10,10,10,0.45); margin-bottom:28px; }
          .hy-persona-stitle { font-family:var(--font-geist-mono,monospace); font-size:10px; text-transform:uppercase; letter-spacing:0.14em; color:rgba(10,10,10,0.4); margin-bottom:10px; margin-top:20px; }
          .hy-persona-list { list-style:none; display:flex; flex-direction:column; gap:8px; }
          .hy-persona-list li { font-size:13px; line-height:1.5; padding-left:16px; position:relative; }
          .hy-persona-list li::before { content:'—'; position:absolute; left:0; color:#5a7a00; font-family:var(--font-geist-mono,monospace); font-size:11px; }

          /* TENSION */
          .hy-tension { display:grid; grid-template-columns:1fr 1fr 1fr; border:1px solid rgba(240,242,233,0.08); border-radius:8px; overflow:hidden; margin-top:48px; }
          .hy-tension-col { padding:40px 32px; border-right:1px solid rgba(240,242,233,0.08); }
          .hy-tension-col:last-child { border-right:none; }
          .hy-tension-icon { width:32px; height:32px; margin-bottom:20px; stroke:#d3fa53; fill:none; stroke-width:1.4; opacity:0.85; }
          .hy-tension-col--friction .hy-tension-icon { stroke:#ef4444; }
          .hy-tension-col-title { font-family:var(--font-geist-mono,monospace); font-size:10px; text-transform:uppercase; letter-spacing:0.14em; margin-bottom:24px; display:flex; align-items:center; gap:8px; }
          .hy-tension-dot { width:6px; height:6px; border-radius:50%; display:inline-block; }
          .hy-tension-list { list-style:none; display:flex; flex-direction:column; gap:12px; }
          .hy-tension-list li { font-size:13px; line-height:1.5; color:rgba(240,242,233,0.6); padding-left:16px; position:relative; }
          .hy-tension-list li::before { content:'·'; position:absolute; left:0; color:#d3fa53; font-weight:700; }
          .hy-tension-col--friction .hy-tension-list li::before { color:#ef4444; }
          .hy-tension-col--friction .hy-tension-list li { color:rgba(240,242,233,0.5); }

          /* ITERATION */
          .hy-iteration { margin:64px 0; border-radius:8px; border:1px solid rgba(240,242,233,0.1); overflow:hidden; }
          .hy-iteration-header { padding:28px 40px; background:rgba(240,242,233,0.03); border-bottom:1px solid rgba(240,242,233,0.08); display:flex; align-items:center; gap:12px; }
          .hy-iteration-header svg { width:18px; height:18px; stroke:#d3fa53; fill:none; stroke-width:2; flex-shrink:0; }
          .hy-iteration-header-text { font-family:var(--font-geist-mono,monospace); font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:rgba(240,242,233,0.6); }
          .hy-iteration-body { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; }
          .hy-iteration-step { padding:36px 40px; }
          .hy-iteration-step-label { font-family:var(--font-geist-mono,monospace); font-size:10px; text-transform:uppercase; letter-spacing:0.14em; margin-bottom:14px; }
          .hy-iteration-step--before .hy-iteration-step-label { color:rgba(239,68,68,0.7); }
          .hy-iteration-step--after .hy-iteration-step-label { color:#d3fa53; }
          .hy-iteration-step-text { font-size:14px; line-height:1.6; color:rgba(240,242,233,0.8); }
          .hy-iteration-arrow { padding:0 8px; color:rgba(240,242,233,0.25); font-size:22px; display:flex; align-items:center; }

          /* USER FLOWS */
          .hy-flows { display:grid; grid-template-columns:1fr 1fr; gap:2px; margin-top:48px; }
          .hy-flow-card { padding:36px; background:rgba(240,242,233,0.03); border:1px solid rgba(240,242,233,0.08); border-radius:8px; transition:background 300ms ease,border-color 300ms ease; }
          .hy-flow-card:hover { background:rgba(240,242,233,0.06); border-color:rgba(211,250,83,0.2); }
          .hy-flow-num { font-family:'Archivo Black',sans-serif; font-size:40px; line-height:1; color:rgba(240,242,233,0.06); margin-bottom:16px; }
          .hy-flow-title { font-family:'Archivo Black',sans-serif; font-size:18px; text-transform:uppercase; letter-spacing:-0.01em; color:#f0f2e9; margin-bottom:8px; }
          .hy-flow-user { font-family:var(--font-geist-mono,monospace); font-size:10px; text-transform:uppercase; letter-spacing:0.12em; color:#d3fa53; opacity:0.7; margin-bottom:20px; }
          .hy-flow-label { font-family:var(--font-geist-mono,monospace); font-size:10px; text-transform:uppercase; letter-spacing:0.12em; color:rgba(240,242,233,0.3); margin-bottom:8px; margin-top:16px; }
          .hy-flow-text { font-size:13px; line-height:1.6; color:rgba(240,242,233,0.6); }
          .hy-flow-outcomes { display:flex; gap:10px; margin-top:20px; flex-wrap:wrap; }
          .hy-flow-outcome { font-family:var(--font-geist-mono,monospace); font-size:11px; padding:8px 14px; border-radius:9999px; background:rgba(211,250,83,0.08); color:#d3fa53; }

          /* CONTROVERSIAL */
          .hy-controversial { margin:64px 0; padding:56px; border-radius:8px; background:rgba(211,250,83,0.06); border:1px solid rgba(211,250,83,0.2); position:relative; overflow:hidden; }
          .hy-controversial::before { content:'!'; position:absolute; right:40px; top:40px; font-family:'Archivo Black',sans-serif; font-size:120px; line-height:1; color:rgba(211,250,83,0.05); pointer-events:none; }
          .hy-controversial-label { font-family:var(--font-geist-mono,monospace); font-size:10px; text-transform:uppercase; letter-spacing:0.16em; color:#d3fa53; margin-bottom:20px; }
          .hy-controversial-text { font-size:clamp(15px,1.4vw,18px); line-height:1.65; color:rgba(240,242,233,0.7); max-width:680px; margin-bottom:28px; }
          .hy-controversial-items { display:flex; flex-direction:column; gap:10px; }
          .hy-controversial-item { font-family:var(--font-geist-mono,monospace); font-size:12px; color:#d3fa53; padding:10px 16px; background:rgba(211,250,83,0.08); border-radius:6px; display:inline-flex; align-items:center; gap:10px; }
          .hy-controversial-item::before { content:'→'; opacity:0.6; }

          /* WIREFRAMES GRID */
          .hy-wireframes-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-top:48px; }

          /* UI GRID */
          .hy-ui-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-top:48px; }
          .hy-ui-item { border-radius:8px; overflow:hidden; }
          .hy-img-caption { margin-top:8px; font-family:var(--font-geist-mono,monospace); font-size:10px; text-transform:uppercase; letter-spacing:0.1em; opacity:0.35; }

          /* RESULTS */
          .hy-results-grid { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid rgba(240,242,233,0.1); border-left:1px solid rgba(240,242,233,0.1); margin-top:64px; }
          .hy-result { padding:48px 40px; border-right:1px solid rgba(240,242,233,0.1); border-bottom:1px solid rgba(240,242,233,0.1); transition:background 300ms ease; }
          .hy-result:hover { background:rgba(211,250,83,0.04); }
          .hy-result-num { font-family:'Archivo Black',sans-serif; font-size:clamp(44px,5vw,72px); line-height:1; letter-spacing:-0.03em; color:#d3fa53; margin-bottom:16px; }
          .hy-result-label { font-size:14px; line-height:1.5; color:rgba(240,242,233,0.5); }

          /* TAKEAWAY */
          .hy-takeaway-quote { font-family:'Archivo Black',sans-serif; font-size:clamp(28px,3.5vw,52px); line-height:1.05; letter-spacing:-0.02em; text-transform:uppercase; color:#0a0a0a; margin:48px 0; max-width:820px; }
          .hy-takeaway-quote em { font-style:normal; color:#5a7a00; }

          /* NEXT */
          .hy-next { display:block; padding:80px 64px; background:#d3fa53; text-decoration:none; color:#0a0a0a; position:relative; overflow:hidden; transition:background 300ms ease; }
          .hy-next:hover { background:#c5f040; }
          .hy-next-label { font-family:var(--font-geist-mono,monospace); font-size:11px; text-transform:uppercase; letter-spacing:0.14em; opacity:0.5; margin-bottom:16px; }
          .hy-next-title { font-family:'Archivo Black',sans-serif; font-size:clamp(36px,5vw,72px); text-transform:uppercase; letter-spacing:-0.02em; line-height:0.95; }
          .hy-next-arrow { position:absolute; right:64px; top:50%; transform:translateY(-50%); font-family:'Archivo Black',sans-serif; font-size:80px; transition:transform 400ms cubic-bezier(0.16,1,0.3,1); }
          .hy-next:hover .hy-next-arrow { transform:translateY(-50%) translateX(16px); }

          /* IMG WRAP */
          .hy-img-wrap { margin:48px 0; }

          /* RESPONSIVE */
          @media (max-width:900px) {
            .hy-hero { padding:100px 32px 48px; }
            .hy-hero-content { grid-template-columns:1fr; gap:32px; }
            .hy-section { padding:80px 32px; }
            .hy-exec-summary { grid-template-columns:1fr; }
            .hy-exec-col { border-right:none; border-bottom:1px solid rgba(240,242,233,0.08); padding:40px 32px; }
            .hy-personas,.hy-tension,.hy-flows { grid-template-columns:1fr; }
            .hy-ui-grid,.hy-wireframes-grid { grid-template-columns:1fr 1fr; }
            .hy-stages { grid-template-columns:1fr 1fr; }
            .hy-stats { grid-template-columns:1fr; }
            .hy-results-grid { grid-template-columns:1fr 1fr; }
            .hy-iteration-body { grid-template-columns:1fr; }
            .hy-iteration-arrow { padding:8px 40px; }
            .hy-next { padding:56px 32px; }
            .hy-next-arrow { display:none; }
          }
        `}</style>

        {/* ── HERO ── */}
        <section className="hy-hero" data-nav-theme="dark" data-cursor-theme="dark">
          <Link href="/" className="hy-back hy-reveal">
            <svg viewBox="0 0 14 14"><path d="M9 2L4 7L9 12" /></svg>
            Back
          </Link>
          <div className="hy-eyebrow hy-reveal hy-d1">UX/UI Case Study · 2025</div>
          <div className="hy-hero-content">
            <h1 className="hy-title-main hy-reveal hy-d2">
              Designed for<br />real workflows,<br /><em>not edge cases.</em>
            </h1>
            <p className="hy-subtitle hy-reveal hy-d3">
              Humanly is a centralised HR platform that brings payroll, time-off, incidents and internal resources into one calm, reliable experience — for employees and HR teams alike.
            </p>
          </div>
          <div className="hy-cover hy-reveal hy-d4">
            <DarkPlaceholder ratio="16/5.5" label="Hero laptop UI.png" />
          </div>
          <div className="hy-meta-bar">
            {[
              { label: 'Client',   value: 'Humanly' },
              { label: 'Year',     value: '2025' },
              { label: 'Role',     value: 'UX/UI Senior Designer' },
              { label: 'Scope',    value: 'UX/UI Design' },
              { label: 'Timeline', value: '2 months' },
              { label: 'Industry', value: 'HR Technology' },
            ].map((item, i) => (
              <div className="hy-meta-item hy-reveal" key={item.label} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="hy-meta-label">{item.label}</div>
                <div className="hy-meta-value">{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXEC SUMMARY ── */}
        <section className="hy-exec-summary" data-nav-theme="dark" data-cursor-theme="dark">
          <div className="hy-exec-col hy-reveal">
            <div className="hy-exec-tag"><span className="hy-exec-dot" style={{ background: '#ef4444' }} />Problem</div>
            <div className="hy-exec-text">HR tasks were scattered across tools and spreadsheets. Employees had no visibility over basic actions like time-off or payments — and HR was constantly firefighting avoidable requests.</div>
            <div className="hy-exec-kpis">
              <div className="hy-exec-kpi"><div className="hy-kpi-num">56%</div><div className="hy-kpi-label">Couldn&apos;t find basic HR info</div></div>
              <div className="hy-exec-kpi"><div className="hy-kpi-num">47%</div><div className="hy-kpi-label">Requests needed manual intervention</div></div>
            </div>
          </div>
          <div className="hy-exec-col hy-reveal hy-d1">
            <div className="hy-exec-tag"><span className="hy-exec-dot" style={{ background: '#d3fa53' }} />Approach</div>
            <div className="hy-exec-text">Shadowing real sessions revealed where employees froze. Card sorting helped define task categories that matched how people actually think — not how HR documents them.</div>
            <div className="hy-exec-kpis">
              <div className="hy-exec-kpi"><div className="hy-kpi-num">2mo</div><div className="hy-kpi-label">Discovery to rollout</div></div>
            </div>
          </div>
          <div className="hy-exec-col hy-reveal hy-d2">
            <div className="hy-exec-tag"><span className="hy-exec-dot" style={{ background: '#d3fa53' }} />Result</div>
            <div className="hy-exec-text">Support tickets dropped, daily active users rose, and task completion time fell — without removing the approval controls HR needed.</div>
            <div className="hy-exec-kpis">
              <div className="hy-exec-kpi"><div className="hy-kpi-num">-35%</div><div className="hy-kpi-label">Support tickets</div></div>
              <div className="hy-exec-kpi"><div className="hy-kpi-num">+42%</div><div className="hy-kpi-label">Daily active users</div></div>
            </div>
          </div>
        </section>

        {/* ── 01 DISCOVERY ── */}
        <section className="hy-section hy-section--cream" data-nav-theme="light">
          <div className="hy-label hy-reveal">The Brief</div>
          <h2 className="hy-sec-title hy-reveal hy-d1">One platform.<br />Zero excuses.</h2>
          <p className="hy-body hy-reveal hy-d2">
            HR tasks were distributed across multiple tools, spreadsheets and informal channels. Employees lacked visibility over basic actions — time-off balances, payslips, clock records — and HR was spending most of their time resolving requests that should have been self-serve.
          </p>

          <div className="hy-stages hy-reveal hy-d3">
            {[
              { num: '01', title: 'Research',   items: ['Competitor analysis', 'User pain points', 'Problem definition'] },
              { num: '02', title: 'UX Design',  items: ['Flows & IA', 'Wireframes', 'Validation'] },
              { num: '03', title: 'UI Design',  items: ['Visual system', 'Components', 'UI Kit'] },
              { num: '04', title: 'Adaptivity', items: ['Responsive logic', 'Accessibility', 'Platform consistency'] },
            ].map((s) => (
              <div className="hy-stage" key={s.num}>
                <div className="hy-stage-num">{s.num}</div>
                <div className="hy-stage-title">{s.title}</div>
                <ul className="hy-stage-list">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>

          <div className="hy-img-wrap hy-reveal" style={{ marginTop: '64px' }}>
            <LightPlaceholder ratio="16/6" label="Team collaboration image.png" />
          </div>

          <div className="hy-label hy-reveal" style={{ marginTop: '80px' }}>01 — Discovery</div>
          <p className="hy-body hy-reveal hy-d1">Discovery focused on understanding real HR workflows, everyday friction and how different roles interact with internal systems. The goal was clarity, not documentation for documentation&apos;s sake.</p>
          <div className="hy-methods hy-reveal hy-d2">
            {['Stakeholder interviews', 'Employee interviews', 'Personas', 'Process mapping', 'Competitive analysis', 'Card sorting', 'Shadowing sessions'].map((m) => (
              <div className="hy-pill" key={m}>{m}</div>
            ))}
          </div>
        </section>

        {/* ── 02 RESEARCH ── */}
        <section className="hy-section hy-section--white" data-nav-theme="light">
          <div className="hy-label hy-reveal">02 — Research & Insights</div>
          <h2 className="hy-sec-title hy-reveal hy-d1">The data confirmed<br />what felt obvious.</h2>
          <p className="hy-body hy-reveal hy-d2">Research revealed high context-switching, low task visibility and frustration around simple but frequent actions — things that should take seconds were taking days.</p>

          <div className="hy-stats hy-reveal hy-d3">
            {[
              { num: '56%', label: 'Employees struggled to find correct info for basic HR tasks' },
              { num: '47%', label: 'Requests required manual HR intervention due to unclear flows' },
              { num: '31%', label: 'Payroll issues caused by incorrect or incomplete employee input' },
            ].map((s) => (
              <div className="hy-stat" key={s.num}>
                <div className="hy-stat-num">{s.num}</div>
                <div className="hy-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 PERSONAS ── */}
        <section className="hy-section hy-section--cream" data-nav-theme="light">
          <div className="hy-label hy-reveal">03 — Personas & User Needs</div>
          <h2 className="hy-sec-title hy-reveal hy-d1">Two users.<br />One broken system.</h2>
          <p className="hy-body hy-reveal hy-d2">Two primary user groups were identified, each with very different expectations — but converging at the same point of frustration: the system made simple things hard.</p>

          <div className="hy-personas">
            <div className="hy-persona hy-reveal hy-d1">
              <div className="hy-persona-tag">Employee</div>
              <div className="hy-persona-name">Full-time employee</div>
              <div className="hy-persona-meta">Age 25–45 · Across departments</div>
              <div className="hy-persona-stitle">Frustrations</div>
              <ul className="hy-persona-list">
                <li>Not knowing where to find specific information</li>
                <li>Fear of making mistakes that affect payroll or time-off</li>
              </ul>
              <div className="hy-persona-stitle">Needs</div>
              <ul className="hy-persona-list">
                <li>Clear navigation and plain language</li>
                <li>Visibility over personal data and requests</li>
              </ul>
              <div className="hy-persona-stitle">Goal</div>
              <ul className="hy-persona-list">
                <li>Complete everyday HR tasks quickly and independently, with full confidence in the outcome</li>
              </ul>
            </div>
            <div className="hy-persona hy-reveal hy-d2">
              <div className="hy-persona-tag">HR Admin</div>
              <div className="hy-persona-name">HR Manager</div>
              <div className="hy-persona-meta">Age 30–55 · People Operations</div>
              <div className="hy-persona-stitle">Frustrations</div>
              <ul className="hy-persona-list">
                <li>Repetitive manual tasks and approval overload</li>
                <li>Managing approvals across disconnected tools</li>
              </ul>
              <div className="hy-persona-stitle">Needs</div>
              <ul className="hy-persona-list">
                <li>Clear overview and prioritization</li>
                <li>Control without micromanaging</li>
              </ul>
              <div className="hy-persona-stitle">Goal</div>
              <ul className="hy-persona-list">
                <li>Maintain accurate data and efficient workflows while reducing manual work and preventable errors</li>
              </ul>
            </div>
          </div>

          <div className="hy-img-wrap hy-reveal" style={{ marginTop: '48px' }}>
            <LightPlaceholder ratio="16/6" label="Persona Profile.png" />
          </div>
        </section>

        {/* ── 04 STRUCTURAL TENSION ── */}
        <section className="hy-section hy-section--dark" data-nav-theme="dark" data-cursor-theme="dark">
          <div className="hy-label hy-reveal">04 — Structural Tension</div>
          <h2 className="hy-sec-title hy-reveal hy-d1">The core tension<br />was control vs autonomy.</h2>
          <p className="hy-body hy-reveal hy-d2">The more control HR added, the more complex the flows became. The simpler the experience for employees, the less visibility HR felt they had. The challenge wasn&apos;t just simplifying screens — it was designing a system where autonomy didn&apos;t compromise accuracy.</p>

          <div className="hy-tension hy-reveal hy-d3">
            <div className="hy-tension-col">
              <svg className="hy-tension-icon" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
              <div className="hy-tension-col-title"><span className="hy-tension-dot" style={{ background: 'rgba(240,242,233,0.4)' }} />HR needed</div>
              <ul className="hy-tension-list">
                <li>Structured data input</li><li>Fewer input errors</li><li>Approval oversight</li><li>Compliance safety</li>
              </ul>
            </div>
            <div className="hy-tension-col">
              <svg className="hy-tension-icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
              <div className="hy-tension-col-title"><span className="hy-tension-dot" style={{ background: 'rgba(240,242,233,0.4)' }} />Employees wanted</div>
              <ul className="hy-tension-list">
                <li>Speed and directness</li><li>Clarity at every step</li><li>Fewer steps to complete</li><li>Full independence</li>
              </ul>
            </div>
            <div className="hy-tension-col hy-tension-col--friction">
              <svg className="hy-tension-icon" viewBox="0 0 24 24"><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.3 3.9L2.5 17a2 2 0 001.7 3h15.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" /></svg>
              <div className="hy-tension-col-title"><span className="hy-tension-dot" style={{ background: '#ef4444' }} />This created friction</div>
              <ul className="hy-tension-list">
                <li>Flows too long to complete</li><li>Employees gave up mid-task</li><li>HR still resolving avoidable issues</li>
              </ul>
            </div>
          </div>

          <div className="hy-iteration hy-reveal">
            <div className="hy-iteration-header">
              <svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9" /><path d="M3 4v8h8" /></svg>
              <div className="hy-iteration-header-text">Course correction — shadowing + card sorting changed the plan</div>
            </div>
            <div className="hy-iteration-body">
              <div className="hy-iteration-step hy-iteration-step--before">
                <div className="hy-iteration-step-label">What early research suggested</div>
                <div className="hy-iteration-step-text">Stakeholder interviews pointed to missing features and too many approval steps. The initial direction was to reduce the number of approvals and add more shortcuts.</div>
              </div>
              <div className="hy-iteration-arrow">→</div>
              <div className="hy-iteration-step hy-iteration-step--after">
                <div className="hy-iteration-step-label">What shadowing & card sorting revealed</div>
                <div className="hy-iteration-step-text">Watching real employees use the tool showed the actual problem: tasks were grouped by HR logic, not employee mental models. Card sorting sessions confirmed this — people expected &quot;request time-off&quot; under &quot;Me&quot;, not under &quot;HR Requests&quot;. That meant going back to remap the entire IA before touching a single wireframe.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 05 USER FLOWS & IA ── */}
        <section className="hy-section hy-section--dark" style={{ paddingTop: 0 }} data-nav-theme="dark" data-cursor-theme="dark">
          <div className="hy-label hy-reveal">05 — User Flows & IA</div>
          <h2 className="hy-sec-title hy-reveal hy-d1">If it can be<br />misunderstood, it will be.</h2>
          <p className="hy-body hy-reveal hy-d2">Key flows were designed to reduce steps, prevent errors and remove unnecessary decisions. Every flow was validated against the full employee journey to ensure consistency across touchpoints.</p>

          <div className="hy-flows">
            {[
              { num: '01', title: 'Request time-off', user: 'Employee', problem: 'Employees lacked clarity on available days, policies and approval status.', approach: 'Surface remaining balance upfront and clarify the approval flow before submission.', outcomes: ['↓ Clarification requests', '↑ Approval speed'] },
              { num: '02', title: 'View payslip', user: 'Employee', problem: 'Payslips were hard to find and difficult to understand once found.', approach: 'Centralize access and present a clear breakdown of earnings and deductions.', outcomes: ['↑ User confidence', '↓ Payroll questions'] },
              { num: '03', title: 'Payroll approval', user: 'HR Admin', problem: 'Approvals were delayed due to missing or incorrect employee data with no clear path to resolve it.', approach: 'Flag incomplete entries and support faster reviews with structured checklists and batch actions.', outcomes: ['↓ Processing time', '↓ Approval errors'] },
              { num: '04', title: 'Clock in / out', user: 'Employee', problem: 'Inconsistent tracking led to errors and manual payroll corrections downstream.', approach: 'Enable one-tap actions with clear feedback, visibility and gentle reminders.', outcomes: ['↑ Tracking accuracy', '↓ Admin corrections'] },
            ].map((f, i) => (
              <div className={`hy-flow-card hy-reveal hy-d${(i % 2) + 1}`} key={f.num}>
                <div className="hy-flow-num">{f.num}</div>
                <div className="hy-flow-title">{f.title}</div>
                <div className="hy-flow-user">User — {f.user}</div>
                <div className="hy-flow-label">Problem</div>
                <div className="hy-flow-text">{f.problem}</div>
                <div className="hy-flow-label">Design approach</div>
                <div className="hy-flow-text">{f.approach}</div>
                <div className="hy-flow-outcomes">
                  {f.outcomes.map((o) => <span className="hy-flow-outcome" key={o}>{o}</span>)}
                </div>
              </div>
            ))}
          </div>

          <div className="hy-img-wrap hy-reveal" style={{ marginTop: '48px' }}>
            <DarkPlaceholder ratio="16/6" label="User Flows Visualization.png" />
          </div>
          <div className="hy-img-wrap hy-reveal">
            <DarkPlaceholder ratio="16/6" label="Information Architecture Diagram.png" />
            <div className="hy-img-caption" style={{ color: 'rgba(240,242,233,0.3)' }}>Information architecture — task categories mapped to employee mental models</div>
          </div>

          <div className="hy-controversial hy-reveal">
            <div className="hy-controversial-label">A Controversial Decision</div>
            <div className="hy-controversial-text">We intentionally removed certain intermediate confirmation steps in time-off and payroll flows. This reduced friction and completion time, but initially raised concerns about error risk.</div>
            <div className="hy-controversial-items">
              {[
                'Inline validation replaced intermediate confirmation screens',
                'Contextual warnings surfaced only when genuinely needed',
                'Structured input fields prevented errors before they happened',
              ].map((item) => <div className="hy-controversial-item" key={item}>{item}</div>)}
            </div>
          </div>
        </section>

        {/* ── 06 WIREFRAMES ── */}
        <section className="hy-section hy-section--cream" data-nav-theme="light">
          <div className="hy-label hy-reveal">06 — Wireframes & Iteration</div>
          <h2 className="hy-sec-title hy-reveal hy-d1">Answer questions<br />before users ask them.</h2>
          <p className="hy-body hy-reveal hy-d2">Low-fidelity wireframes were used to validate structure and task completion before moving into UI. Each screen was tested against one question: does the user know what to do next without reading any labels twice?</p>

          <div className="hy-wireframes-grid hy-reveal hy-d3">
            {[
              { label: 'LO-RES Wireframes.png', caption: 'Lo-res — navigation & hierarchy' },
              { label: 'HI-RES Wireframes.png', caption: 'Hi-res — flows & UI decisions' },
              { label: 'Final prototypes.png',   caption: 'Prototypes — simulate real usage' },
            ].map((w) => (
              <div key={w.label}>
                <LightPlaceholder ratio="4/3" label={w.label} />
                <div className="hy-img-caption">{w.caption}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 07 UI DESIGN ── */}
        <section className="hy-section hy-section--dark" data-nav-theme="dark" data-cursor-theme="dark">
          <div className="hy-label hy-reveal">07 — UI Design</div>
          <h2 className="hy-sec-title hy-reveal hy-d1">Calm. Predictable.<br />Built for daily use.</h2>
          <p className="hy-body hy-reveal hy-d2">The interface was designed to feel consistent and efficient across repeated daily use — not impressive at first glance, but invisible after a week. Every component was built around the tasks people actually do, not the features the product could offer.</p>

          <div className="hy-ui-grid hy-reveal hy-d3">
            {[
              { label: 'Dashboard UI.png',  caption: 'Dashboard' },
              { label: 'Messages UI.png',   caption: 'Messages' },
              { label: 'Task List UI.png',  caption: 'Task List' },
              { label: 'Desktop App.png',   caption: 'Desktop App' },
              { label: 'Mobile App UI.png', caption: 'Mobile Companion' },
              { label: 'Settings UI.png',   caption: 'Settings' },
            ].map((item) => (
              <div className="hy-ui-item" key={item.label}>
                <DarkPlaceholder ratio="4/3" label={item.label} />
                <div className="hy-img-caption" style={{ color: 'rgba(240,242,233,0.3)' }}>{item.caption}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 08 RESULTS ── */}
        <section className="hy-section hy-section--dark" style={{ paddingTop: 0 }} data-nav-theme="dark" data-cursor-theme="dark">
          <div className="hy-label hy-reveal">08 — Results</div>
          <h2 className="hy-sec-title hy-reveal hy-d1">Less friction.<br />More time for real work.</h2>

          <div className="hy-results-grid hy-reveal hy-d2">
            {[
              { num: '-35%', label: 'Reduction in support tickets related to HR tasks' },
              { num: '+42%', label: 'Increase in daily active users within the first month' },
              { num: '-28%', label: 'Decrease in average task completion time' },
            ].map((r) => (
              <div className="hy-result" key={r.num}>
                <div className="hy-result-num">{r.num}</div>
                <div className="hy-result-label">{r.label}</div>
              </div>
            ))}
          </div>

          <div className="hy-img-wrap hy-reveal" style={{ marginTop: '64px' }}>
            <DarkPlaceholder ratio="16/6" label="Results Visualization.png" />
          </div>
        </section>

        {/* ── 09 TAKEAWAYS ── */}
        <section className="hy-section hy-section--lime" data-nav-theme="lime">
          <div className="hy-label hy-reveal">09 — Takeaways</div>
          <div className="hy-takeaway-quote hy-reveal hy-d1">
            Designing internal tools is about <em>respecting people&apos;s time.</em>
          </div>
          <p className="hy-body hy-reveal hy-d2" style={{ color: 'rgba(10,10,10,0.65)' }}>
            Humanly reinforced the importance of empathy, restraint and clarity in everyday software. The wins didn&apos;t come from adding features — they came from removing friction at exactly the right moments. Good tools don&apos;t demand attention. They earn trust.
          </p>
          <div className="hy-img-wrap hy-reveal hy-d3">
            <LightPlaceholder ratio="16/6" label="Takeaways.png" />
          </div>
        </section>

        {/* ── NEXT PROJECT ── */}
        <Link href="/work/rotki" className="hy-next">
          <div className="hy-next-label">Next project</div>
          <div className="hy-next-title">Rotki</div>
          <div className="hy-next-arrow">→</div>
        </Link>
      </main>

      <Footer />
    </>
  );
}
