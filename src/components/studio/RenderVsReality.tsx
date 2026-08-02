"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Render-vs-Reality rail.
 * Side-by-side pairs of 3D render vs finished photograph, with scroll-driven reveal.
 */
const PAIRS = [
  {
    label: "DHA Phase 5 Residence — Lounge",
    render: "linear-gradient(135deg,rgba(25,20,15,0.3),rgba(70,45,25,0.4)),url(/images/svc-residential.jpg)",
    reality: "linear-gradient(135deg,rgba(30,22,18,0.25),rgba(75,50,30,0.35)),url(/images/hero-residential.jpg)",
  },
  {
    label: "Systems Ltd — Open Plan Floor",
    render: "linear-gradient(135deg,rgba(10,10,10,0.3),rgba(40,30,20,0.4)),url(/images/svc-3d.jpg)",
    reality: "linear-gradient(135deg,rgba(15,15,15,0.25),rgba(50,35,20,0.35)),url(/images/after-space.jpg)",
  },
  {
    label: "Café Zouk — Dining",
    render: "linear-gradient(110deg,rgba(20,15,10,0.3),rgba(60,40,20,0.4)),url(/images/svc-retail.jpg)",
    reality: "linear-gradient(110deg,rgba(20,15,15,0.3),rgba(60,40,20,0.4)),url(/images/portfolio-cafe.jpg)",
  },
];

export default function RenderVsReality() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  return (
    <section ref={ref} className="section-pad bg-[var(--bg-subtle)]">
      <div className="container-x">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          Render vs. Reality
        </div>
        <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-12 max-w-3xl">
          On the left, the render.<br />
          <span className="italic-serif text-[var(--oak-600)]">On the right, what we built.</span>
        </h2>
        <motion.div style={{ y }} className="space-y-10 md:space-y-16">
          {PAIRS.map((p, i) => (
            <div key={p.label}>
              <div className="text-xs uppercase tracking-[0.25em] text-[var(--fg-subtle)] mb-3">{String(i + 1).padStart(2, "0")} · {p.label}</div>
              <div className="grid md:grid-cols-2 gap-3 md:gap-6">
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ background: p.render }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-white/70 bg-black/50 px-3 py-1 rounded-full">Render</div>
                </div>
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ background: p.reality }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 right-4 text-xs uppercase tracking-widest bg-[var(--oak-500)] text-[var(--graphite-900)] px-3 py-1 rounded-full">Built</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
