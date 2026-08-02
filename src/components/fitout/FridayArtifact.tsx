"use client";

import { motion } from "framer-motion";
import type { FitOutContent } from "@/lib/content/fitout";

/**
 * Friday Report artifact — a literal facsimile of the one-page report clients get every Friday.
 * PRD requirement: "Friday Report artifact."
 */
export default function FridayArtifact({ report }: { report: FitOutContent["fridayReportSample"] }) {
  return (
    <section className="section-pad bg-[var(--graphite-900)] text-white">
      <div className="container-x grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--oak-300)] mb-5">
            <span className="w-8 h-px bg-[var(--oak-400)]" />
            The Friday Report
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
            One page.<br />
            <span className="italic-serif text-[var(--oak-300)]">Every Friday at 4pm.</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-4 max-w-md">
            No jargon. No "we'll circle back". Four sections — what shipped, what's shipping, where the
            budget is, what's at risk. Signed by your project lead. Sent to every stakeholder who wants it.
          </p>
          <p className="text-white/70 text-base leading-relaxed max-w-md">
            It's the single biggest reason clients say working with us feels different. They always know.
          </p>
        </div>

        {/* The artifact */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 bg-white text-[var(--graphite-900)] rounded-sm shadow-[var(--shadow-lg)] p-7 md:p-10 relative font-sans text-sm"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-[var(--border)] mb-5">
            <div>
              <div className="font-display text-xl leading-tight">Woodex Interior — Friday Report</div>
              <div className="text-xs text-[var(--fg-subtle)] mt-1 uppercase tracking-widest">{report.week} · Sent Fri 4:02pm</div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-widest text-[var(--fg-subtle)]">Status</div>
              <div className="inline-block mt-1 bg-[var(--success)] text-white text-xs uppercase tracking-widest px-2 py-0.5 rounded-full">On track</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-5">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--oak-600)] mb-2">✓ Shipped this week</div>
              <ul className="space-y-1.5">
                {report.shipped.map((s) => (
                  <li key={s} className="flex gap-2 text-[13px] leading-snug">
                    <span className="text-[var(--success)] mt-0.5">✓</span><span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--oak-600)] mb-2">→ Shipping next week</div>
              <ul className="space-y-1.5">
                {report.shipping.map((s) => (
                  <li key={s} className="flex gap-2 text-[13px] leading-snug">
                    <span className="text-[var(--oak-500)] mt-0.5">→</span><span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-5 border-t border-[var(--border)]">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--oak-600)] mb-2">Budget</div>
              <div className="text-[13px] font-medium">{report.budget}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--oak-600)] mb-2">Risks flagged</div>
              <div className="text-[13px] text-[var(--fg-muted)]">{report.risks}</div>
            </div>
          </div>

          {/* Photo strip */}
          <div className="mt-5 aspect-[21/6] rounded-sm bg-cover bg-center"
               style={{ background: report.photo }}>
            <div className="h-full w-full bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
              <span className="text-[10px] uppercase tracking-widest text-white/80">Site photos · attached separately · 8 images</span>
            </div>
          </div>

          {/* Sign-off */}
          <div className="mt-4 pt-4 border-t border-[var(--border)] flex justify-between items-center text-xs text-[var(--fg-subtle)]">
            <span>— Hamza Saeed, Project Lead</span>
            <span className="font-mono">FRY-06</span>
          </div>

          {/* Stamp */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 w-20 h-20 rounded-full border-2 border-[var(--oak-500)] text-[var(--oak-600)] flex items-center justify-center text-[9px] uppercase tracking-widest rotate-[-8deg] opacity-70 font-semibold text-center leading-tight">
            Friday<br/>4pm<br/>on time
          </div>
        </motion.div>
      </div>
    </section>
  );
}
