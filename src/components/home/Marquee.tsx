"use client";

import { motion } from "framer-motion";

/**
 * Trust marquee — client logos / proof strip.
 * Uses CSS @keyframes animation defined in globals for a perfectly seamless
 * gap-free loop — duplicate content, animate -50% over the duration, so the
 * second copy is pixel-identical where the loop resets.
 */
const LOGOS = [
  "Nishat Hospitality",
  "Packages Mall",
  "Gulberg Galleria",
  "LUMS",
  "HBL",
  "KFC Pakistan",
  "Systems Ltd",
  "IT Heights",
  "Packages Ltd",
  "Fauji Foundation",
  "Defence Raya",
  "Movenpick",
  "Arif Habib Group",
  "Service Industries",
];

export default function Marquee() {
  return (
    <section className="py-12 md:py-14 border-y border-[var(--border)] bg-[var(--surface-1)] overflow-hidden">
      <div className="container-x mb-5 md:mb-6">
        <div className="kicker text-[var(--fg-muted)]">
          Trusted by 120+ clients across Pakistan
        </div>
      </div>

      <style>{`
        @keyframes woodex-marquee-a {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-50%,0,0); }
        }
        @keyframes woodex-marquee-b {
          from { transform: translate3d(-50%,0,0); }
          to   { transform: translate3d(0,0,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .woodex-marquee-a, .woodex-marquee-b { animation: none !important; }
        }
      `}</style>

      <div className="woodex-marquee-a flex gap-8 md:gap-14 whitespace-nowrap will-change-transform"
           style={{ animation: "woodex-marquee-a 50s linear infinite", width: "max-content" }}>
        {[...LOGOS, ...LOGOS].map((name, i) => (
          <span key={i} className="font-display text-xl md:text-2xl lg:text-3xl text-[var(--fg-muted)]/70 hover:text-[var(--fg)] transition-colors flex-shrink-0">
            {name}
            <span className="mx-6 md:mx-10 text-[var(--oak-400)]/50">·</span>
          </span>
        ))}
      </div>

      <div className="woodex-marquee-b flex gap-8 md:gap-14 whitespace-nowrap will-change-transform mt-3"
           style={{ animation: "woodex-marquee-b 65s linear infinite", width: "max-content" }}>
        {[...LOGOS, ...LOGOS].map((name, i) => (
          <span key={i} className="font-display italic-serif text-lg md:text-xl lg:text-2xl text-[var(--fg-subtle)] flex-shrink-0">
            {name}
            <span className="mx-6 md:mx-10 text-[var(--oak-300)]/40">—</span>
          </span>
        ))}
      </div>
    </section>
  );
}
