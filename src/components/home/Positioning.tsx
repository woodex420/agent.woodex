"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Section 02 — Positioning (PRD "More than interior design")
 * THINK / DESIGN / BUILD triad (PRD says Design/Build/Deliver; we adopt T/D/B to match
 * the studio's "think first" philosophy).
 */
const PILLARS = [
  {
    num: "01",
    title: "Think",
    eyebrow: "STRATEGY",
    body: "Workplace strategy, brief development and space planning. We work out what the space has to do before we draw a single line.",
  },
  {
    num: "02",
    title: "Design",
    eyebrow: "CONCEPT TO DOCS",
    body: "Interior design, 3D visualisation, technical drawings, material schedules and BIM coordination. You approve in 3D — what you see is what gets built.",
  },
  {
    num: "03",
    title: "Build",
    eyebrow: "FIT-OUT TO HANDOVER",
    body: "Fit-out, civil works, procurement, joinery and project management under one coordinated process — with a Friday report at 4pm every week.",
  },
];

export default function Positioning() {
  return (
    <section className="section-pad bg-[var(--bg)] relative">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="kicker mb-6">More than interior design</span>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
              We take projects
              <span className="italic-serif text-[var(--brass)]"> from idea to reality.</span>
            </h2>
            <p className="text-[var(--fg-muted)] text-lg leading-[1.65] max-w-lg">
              From early planning and spatial strategy to design, technical coordination
              and execution, Woodex brings the critical stages of a project together
              under one accountable team.
            </p>
            <Link
              href="/process"
              className="group mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-widest font-medium text-[var(--fg)] hover:text-[var(--brass)] transition-colors"
            >
              How we work <span className="arrow">→</span>
            </Link>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[var(--bg)] p-7 md:p-8 flex flex-col min-h-[280px] group hover:bg-[var(--bg-subtle)] transition-colors"
              >
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--brass)] mb-5 flex items-center gap-3">
                  <span className="font-mono text-sm text-[var(--fg-subtle)] tabular-nums">{p.num}</span>
                  <span className="w-6 h-px bg-[var(--brass)]/50" />
                  {p.eyebrow}
                </div>
                <h3 className="font-display text-3xl md:text-4xl mb-4 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-[var(--fg-muted)] text-[0.95rem] leading-relaxed flex-1">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
