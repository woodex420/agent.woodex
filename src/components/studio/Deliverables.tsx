"use client";

import { motion } from "framer-motion";

const DELIVERABLES = [
  { n: "01", t: "Mood boards", d: "Three material/atmosphere directions, informed by the site visit." },
  { n: "02", t: "2D Layouts", d: "Furniture plans, circulation, reflected ceiling, electrical." },
  { n: "03", t: "Photoreal 3D", d: "Walkthrough renders of every room at 4K — enough to spot the grain on the wood." },
  { n: "04", t: "360° panoramas", d: "Hosted links you can send to family / investors / your board." },
  { n: "05", t: "Material packages", d: "Physical finishes box delivered to your home or office." },
  { n: "06", t: "Construction drawings", d: "Joinery details, MEP coordination, setting-out — everything a builder needs." },
  { n: "07", t: "3D-to-build match", d: "Contractual guarantee that the finished space matches the approved render." },
  { n: "08", t: "Source files", d: "All source files are yours at handover — no hostage situations." },
];

export default function Deliverables() {
  return (
    <section className="section-pad bg-[var(--bg)]">
      <div className="container-x">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          Deliverables anatomy
        </div>
        <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-12 max-w-3xl">
          What you actually<br />
          <span className="italic-serif text-[var(--oak-600)]">walk away with.</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-[var(--border)]">
          {DELIVERABLES.map((d, i) => (
            <motion.div
              key={d.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 md:p-8 border-r border-b border-[var(--border)] min-h-[200px] flex flex-col justify-between hover:bg-[var(--surface-1)] transition-colors"
            >
              <div className="font-mono text-xs text-[var(--oak-600)] tracking-widest mb-4">{d.n}</div>
              <div>
                <h3 className="font-display text-xl leading-tight mb-2">{d.t}</h3>
                <p className="text-[var(--fg-muted)] text-sm leading-relaxed">{d.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
