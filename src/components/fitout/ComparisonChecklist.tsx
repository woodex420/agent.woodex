"use client";

import { motion } from "framer-motion";

export default function ComparisonChecklist({
  included, excluded,
}: { included: string[]; excluded: string[] }) {
  return (
    <section className="section-pad bg-[var(--bg)]">
      <div className="container-x">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          Comparison checklist
        </div>
        <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-12 max-w-3xl">
          What's in.<br />
          <span className="italic-serif text-[var(--oak-600)]">What isn't. No footnotes.</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          <CheckColumn title="Included" items={included} included />
          <CheckColumn title="Excluded / quoted separately" items={excluded} />
        </div>
      </div>
    </section>
  );
}

function CheckColumn({ title, items, included = false }: { title: string; items: string[]; included?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-3 pb-4 mb-2 border-b border-[var(--border)]">
        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${included ? "bg-[var(--oak-500)] text-white" : "border border-[var(--border-strong)] text-[var(--fg-muted)]"}`}>
          {included ? "✓" : "×"}
        </span>
        <h3 className="font-display text-xl md:text-2xl">{title}</h3>
      </div>
      <ul className="divide-y divide-[var(--border)]">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: included ? -15 : 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="py-4 flex gap-4 items-start"
          >
            <span className={`mt-1 w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs ${included ? "text-[var(--oak-600)]" : "text-[var(--fg-subtle)]"}`}>
              {included ? "✓" : "○"}
            </span>
            <span className={`text-base md:text-lg leading-snug ${included ? "text-[var(--fg)]" : "text-[var(--fg-muted)]"}`}>{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
