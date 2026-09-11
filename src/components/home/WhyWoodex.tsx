"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Section 08 — Why Woodex (PRD)
 * Operational differentiators (no "quality/creativity/innovation" fluff).
 */
const REASONS = [
  {
    n: "01",
    title: "Design + Build Thinking",
    body: "Design decisions are developed with execution in mind. The team drawing the concept is the same team pricing it, planning it and building it.",
  },
  {
    n: "02",
    title: "Commercial Understanding",
    body: "Spaces are designed around business requirements — headcount, workflow, brand, customer flow and lease deadlines — not aesthetics alone.",
  },
  {
    n: "03",
    title: "One Coordinated Process",
    body: "Design, technical coordination, procurement and execution work toward one date on one Gantt. You have one project lead from brief to handover.",
  },
  {
    n: "04",
    title: "Visual Before Reality",
    body: "3D visualization shows you the exact space before construction. We contractually guarantee the render against the finished build.",
  },
  {
    n: "05",
    title: "Accountable Project Management",
    body: "Friday Report at 4pm every week. Itemised quotations, no lump sums. If we miss the contract date, we pay PKR 25,000 per week.",
  },
  {
    n: "06",
    title: "Workshop-Built Joinery",
    body: "Fixed joinery is built off-site in our own workshop during civil works — for quality control, timeline compression and 2-year warranty.",
  },
];

export default function WhyWoodex() {
  return (
    <section className="section-pad bg-[var(--surface-3)] text-[var(--fg-invert)] relative noise overflow-hidden">
      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-14 md:mb-20">
          <div className="lg:col-span-5">
            <span className="kicker text-[var(--oak-300)] mb-6" data-kicker-invert>
              Why Woodex
            </span>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">
              Why businesses
              <span className="block italic-serif text-[var(--oak-300)]">choose Woodex.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              Not a list of adjectives. These are operational choices — the things you feel
              in week six of a build when a vendor ducks a question and we don't.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[var(--charcoal)] p-7 md:p-8 min-h-[220px] flex flex-col hover:bg-[var(--walnut-deep)] transition-colors group"
            >
              <div className="font-mono text-xs text-[var(--brass)] tabular-nums mb-5">{r.n}</div>
              <h3 className="font-display text-xl md:text-[1.35rem] leading-tight mb-3 tracking-tight">
                {r.title}
              </h3>
              <p className="text-white/70 text-[0.92rem] leading-relaxed flex-1">{r.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <p className="text-white/60 text-sm max-w-lg">
            Still comparing? A 20-minute call is usually enough to tell if we're the right fit.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--brass)] text-white text-xs uppercase tracking-widest font-medium hover:bg-[var(--brass-deep)] transition-colors"
          >
            Book a qualification call <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
