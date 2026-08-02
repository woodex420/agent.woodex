"use client";

import { motion } from "framer-motion";
import type { ServiceContent } from "@/lib/content/services";

/**
 * Answer-Capsule + Structured Fact Table
 * PRD: "feeds SEO + AI Overviews + GEO simultaneously".
 * Appears above the fold on every service/location page.
 */
export default function AnswerCapsule({ service }: { service: ServiceContent }) {
  const { answerCapsule } = service;
  return (
    <section id="answer" className="py-16 md:py-20 border-y border-[var(--border)] bg-[var(--surface-1)]">
      <div className="container-x grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--oak-600)] mb-4">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            Quick answer
          </div>
          <h2 className="font-display text-2xl md:text-3xl leading-tight">
            {answerCapsule.question}
          </h2>
        </div>
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl leading-relaxed text-[var(--fg)] font-light mb-8 max-w-3xl"
          >
            {answerCapsule.shortAnswer}
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[var(--border)] rounded-sm overflow-hidden">
            {answerCapsule.facts.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 bg-[var(--bg)] border-r border-b md:border-b-0 border-[var(--border)] last:border-r-0 md:[&:nth-child(-n+2)]:border-b-0 md:[&:nth-child(2)]:border-r"
              >
                <div className="font-display text-2xl md:text-3xl text-[var(--oak-600)] leading-tight">{f.value}</div>
                <div className="text-[11px] uppercase tracking-widest text-[var(--fg-subtle)] mt-2">{f.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
