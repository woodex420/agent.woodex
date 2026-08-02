"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ScopeMatrix({ included, optional }: { included: string[]; optional: string[] }) {
  return (
    <section id="scope" className="section-pad bg-[var(--bg-subtle)]">
      <div className="container-x">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          What's included
        </div>
        <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-12 max-w-3xl">
          The scope matrix.<br />
          <span className="italic-serif text-[var(--oak-600)]">No line items hidden in the footnotes.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <ScopeList
            title="Included in every quote"
            tag="Included"
            tagClass="bg-[var(--oak-500)] text-white"
            items={included}
            checkColor="var(--oak-500)"
          />
          <ScopeList
            title="Optional — quoted separately"
            tag="Optional"
            tagClass="border border-[var(--border-strong)] text-[var(--fg-muted)]"
            items={optional}
            checkColor="var(--fg-subtle)"
            optional
          />
        </div>
      </div>
    </section>
  );
}

function ScopeList({
  title, tag, tagClass, items, checkColor, optional,
}: { title: string; tag: string; tagClass: string; items: string[]; checkColor: string; optional?: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 pb-4 mb-2 border-b border-[var(--border)]">
        <h3 className="font-display text-xl md:text-2xl">{title}</h3>
        <span className={cn("text-[10px] uppercase tracking-widest px-3 py-1 rounded-full", tagClass)}>{tag}</span>
      </div>
      <ul className="divide-y divide-[var(--border)]">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: optional ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="py-4 flex gap-4 items-start"
          >
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              viewBox="0 0 24 24" fill="none" stroke={checkColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ stroke: checkColor }}
              aria-hidden
            >
              {optional ? <circle cx="12" cy="12" r="9" opacity="0.4" /> : <polyline points="20 6 9 17 4 12" />}
            </svg>
            <span className={cn("text-base md:text-lg leading-snug", optional ? "text-[var(--fg-muted)]" : "text-[var(--fg)]")}>
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
