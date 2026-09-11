"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Section 03 — Core Capabilities (10 services, grouped)
 * PRD heading: "One Team. Multiple Disciplines. One Clear Direction."
 */
const GROUPS = [
  {
    name: "Strategy & Planning",
    items: ["Workplace Strategy", "Space Planning", "Brief Development"],
  },
  {
    name: "Design",
    items: ["Interior Design", "Architectural Coordination"],
  },
  {
    name: "Visualization",
    items: ["3D Visualization", "BIM Services"],
  },
  {
    name: "Execution",
    items: ["Office Fit-Out", "Turnkey Fit-Out", "Civil Works"],
  },
  {
    name: "Delivery",
    items: ["Procurement", "Project Management"],
  },
];

export default function Capabilities() {
  return (
    <section className="section-pad bg-[var(--surface-3)] text-[var(--fg-invert)] relative noise overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="capgrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#capgrid)" />
        </svg>
      </div>

      <div className="container-x relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div className="max-w-2xl">
            <span className="kicker text-[var(--oak-300)] mb-6" data-kicker-invert>
              Core capabilities
            </span>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">
              One team. Multiple disciplines.
              <span className="block italic-serif text-[var(--oak-300)] mt-1">One clear direction.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-widest font-medium text-[var(--oak-300)] hover:text-white transition-colors shrink-0"
          >
            Explore all services <span className="arrow">→</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
          {GROUPS.map((g, i) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[var(--charcoal)] p-6 md:p-7 flex flex-col min-h-[240px] group hover:bg-[var(--walnut-deep)] transition-colors"
            >
              <div className="text-[10px] font-mono tabular-nums text-[var(--brass)] mb-6">
                0{i + 1}
              </div>
              <h3 className="font-display text-lg md:text-xl leading-tight mb-5 tracking-tight">
                {g.name}
              </h3>
              <ul className="space-y-2 text-sm text-white/70 flex-1">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 leading-snug">
                    <span className="text-[var(--brass)] mt-1.5 block w-1 h-1 rounded-full flex-shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
