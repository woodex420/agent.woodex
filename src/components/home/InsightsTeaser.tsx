"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Section 10 — Insights teaser (PRD)
 * Shows 3 editorial pillars + CTA; real blog cards will be wired in Sprint 4.
 */
const CATEGORIES = [
  { name: "Workplace Design", desc: "Offices, productivity, employee experience", href: "/insights" },
  { name: "Fit-Out Guides", desc: "Process, cost, timeline, procurement, execution", href: "/insights" },
  { name: "Commercial Interiors", desc: "Retail, hospitality, healthcare, case studies", href: "/insights" },
];

export default function InsightsTeaser() {
  return (
    <section className="section-pad bg-[var(--bg-subtle)]">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <span className="kicker mb-6">Insights</span>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">
              Thinking on
              <span className="italic-serif text-[var(--brass)]"> workplaces, design and build.</span>
            </h2>
          </div>
          <Link
            href="/insights"
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-widest font-medium text-[var(--fg)] hover:text-[var(--brass)] transition-colors shrink-0"
          >
            All insights <span className="arrow">→</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={c.href}
                className="group block bg-[var(--bg)] p-8 md:p-10 h-full hover:bg-[var(--bg-elevated)] transition-colors min-h-[220px]"
              >
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--brass)] mb-5">
                  Editorial
                </div>
                <h3 className="font-display text-2xl md:text-[1.75rem] leading-tight mb-4 tracking-tight">
                  {c.name}
                </h3>
                <p className="text-[var(--fg-muted)] leading-relaxed text-[0.95rem] mb-8">
                  {c.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--fg-subtle)] group-hover:text-[var(--brass)] transition-colors">
                  Read <span className="arrow">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
