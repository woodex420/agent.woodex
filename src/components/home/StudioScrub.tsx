"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

/**
 * 3D Studio — Wireframe → Render Scrub
 * Scroll-driven section that drags a divider across the same "scene" from
 * wireframe (left) to photoreal render (right) as you scroll. Promotes
 * the in-house 3D Studio sub-brand from the homepage.
 */
export default function StudioScrub() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Divider position: 0% → 100% as you scroll through section
  const divider = useTransform(scrollYProgress, [0.15, 0.85], ["12%", "88%"]);
  const clip = useTransform(divider, (v) => `inset(0 ${100 - parseFloat(v)}% 0 0)`);
  const labelOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section ref={ref} className="relative bg-[var(--graphite-950)] text-white overflow-hidden">
      <div className="container-x section-pad">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Copy */}
          <div className="lg:col-span-4 z-10">
            <div className="kicker text-[var(--oak-300)] mb-5">
              In-house 3D Studio
            </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
              Wireframe.<br />
              <span className="italic-serif text-[var(--oak-300)]">Render. Reality.</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Most studios outsource renders to a freelancer who never sees the site.
              Our 3D team sits two desks from our build team. They share Slack channels,
              site visits, and accountability. The render is not a sales pitch — it's a
              <strong className="text-white"> construction document.</strong>
            </p>
            <ul className="space-y-3 mb-8 text-white/85">
              {[
                "Photoreal walkthroughs you can move through",
                "Material-swap previews before anything is ordered",
                "Contractual match guarantee — it's in the SOW",
              ].map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--oak-400)] flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link href="/3d-studio" className="inline-flex items-center gap-2 text-[var(--oak-300)] text-sm uppercase tracking-widest font-medium hover:gap-4 transition-all">
              Tour the 3D Studio →
            </Link>
          </div>

          {/* Scrub visual */}
          <div className="lg:col-span-8 relative">
            <motion.div
              style={{ rotate: badgeRotate }}
              className="absolute -top-6 -left-6 md:-top-10 md:-left-10 z-20 bg-[var(--oak-500)] text-[var(--graphite-900)] px-4 py-2 text-xs uppercase tracking-[0.25em] font-medium rounded-sm shadow-[var(--shadow-lg)]"
            >
              Scroll to reveal ↓
            </motion.div>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm shadow-[var(--shadow-lg)] noise">
              {/* "Render" side (right) — photoreal imagery */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/hero-residential.jpg)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

              {/* "Wireframe" side (left) — revealed via clip-path */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: clip }}
              >
                {/* Wireframe aesthetic: darkened + SVG grid overlay simulating blueprint */}
                <div
                  className="absolute inset-0 bg-[var(--graphite-950)]"
                />
                <svg className="absolute inset-0 w-full h-full opacity-60" aria-hidden>
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--oak-400)" strokeWidth="0.6"/>
                    </pattern>
                    <pattern id="grid-major" width="200" height="200" patternUnits="userSpaceOnUse">
                      <path d="M 200 0 L 0 0 0 200" fill="none" stroke="var(--oak-400)" strokeWidth="1.2"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)"/>
                  <rect width="100%" height="100%" fill="url(#grid-major)"/>
                  {/* Outline room geometry */}
                  <g stroke="var(--oak-300)" strokeWidth="1.4" fill="none">
                    <rect x="8%" y="15%" width="84%" height="70%" />
                    <rect x="8%" y="15%" width="35%" height="70%" />
                    <rect x="45%" y="15%" width="25%" height="45%" />
                    <line x1="8%" y1="55%" x2="45%" y2="55%" />
                    <line x1="70%" y1="55%" x2="92%" y2="55%" />
                    <rect x="50%" y="22%" width="15%" height="30%" />
                    <circle cx="78%" cy="70%" r="6%" />
                    <rect x="75%" y="22%" width="12%" height="18%" opacity="0.6"/>
                  </g>
                  {/* Dimensions */}
                  <g stroke="var(--oak-400)" strokeWidth="0.6" fill="var(--oak-400)" fontFamily="monospace" fontSize="11">
                    <line x1="8%" y1="92%" x2="92%" y2="92%" strokeDasharray="2 2"/>
                    <text x="50%" y="98%" textAnchor="middle">8.5m</text>
                  </g>
                </svg>
                {/* Soft vignette */}
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)" }}/>
              </motion.div>

              {/* Divider line + handle */}
              <motion.div
                style={{ left: divider }}
                className="absolute top-0 bottom-0 w-px bg-[var(--oak-400)] z-10"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--oak-500)] text-[var(--graphite-900)] flex items-center justify-center shadow-[var(--shadow-lg)]">
                  <span className="flex gap-0.5 text-lg font-bold">
                    <span>‹</span><span>›</span>
                  </span>
                </div>
              </motion.div>

              {/* Labels */}
              <motion.div style={{ opacity: labelOpacity }} className="absolute top-5 left-5 text-xs uppercase tracking-[0.25em] text-[var(--oak-300)] font-mono">
                Wireframe · Day 4
              </motion.div>
              <motion.div style={{ opacity: labelOpacity }} className="absolute top-5 right-5 text-xs uppercase tracking-[0.25em] text-white/80 font-mono">
                Render · Day 14
              </motion.div>
              <motion.div style={{ opacity: labelOpacity }} className="absolute bottom-5 left-5 right-5 flex justify-between text-xs uppercase tracking-widest text-white/50">
                <span>Plan</span>
                <span>Approved</span>
                <span>Built</span>
              </motion.div>
            </div>

            {/* Caption */}
            <div className="mt-6 flex items-start gap-4 text-sm text-white/60 max-w-xl">
              <span className="font-mono text-[var(--oak-400)] text-xs mt-1">01 / 01</span>
              <p>
                Drag this imaginary divider (it moves as you scroll) — that's what our guarantee
                looks like. Left is what we propose. Right is what you approve. Reality lands on
                the right side.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
