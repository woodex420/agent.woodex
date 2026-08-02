"use client";

import { motion } from "framer-motion";

export default function CostBand({
  label, range, notes,
}: { label: string; range: string; notes: string[] }) {
  return (
    <section id="cost" className="section-pad bg-[var(--oak-500)] text-[var(--graphite-900)] relative noise">
      <div className="container-x grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] mb-5 text-[var(--graphite-900)]/70">
            <span className="w-8 h-px bg-[var(--graphite-900)]" />
            {label}
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[var(--fs-h1)] leading-[1] mb-6"
          >
            {range}
          </motion.h2>
          <p className="text-[var(--graphite-900)]/80 text-lg leading-relaxed max-w-md">
            No evasive "contact us for pricing." Ranges are current as of 2025 and tied to the scope above.
            Your fixed quote is delivered before any commitment.
          </p>
        </div>
        <div className="lg:col-span-7">
          <ul className="space-y-4">
            {notes.map((n, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-4 items-start p-5 bg-white/30 backdrop-blur-sm rounded-sm border border-[var(--graphite-900)]/15"
              >
                <span className="w-6 h-6 rounded-full bg-[var(--graphite-900)] text-[var(--oak-300)] flex items-center justify-center text-xs flex-shrink-0 font-mono">
                  {i + 1}
                </span>
                <p className="leading-relaxed">{n}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
