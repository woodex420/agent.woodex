"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ContactFAQ — objection-killer FAQ (the actual anxieties people have before contacting).
 * Data lives in `@/lib/content/faqs` so server pages can reuse it for JSON-LD.
 */
import { CONTACT_FAQS as FAQS } from "@/lib/content/faqs";

export { CONTACT_FAQS } from "@/lib/content/faqs";

export default function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-32 bg-[var(--bg-subtle)]">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-5">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            Before you call
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
            The things<br />
            <span className="italic-serif text-[var(--oak-600)]">you're wondering.</span>
          </h2>
          <p className="text-[var(--fg-muted)] text-lg leading-relaxed max-w-md">
            Six objections we hear every week, answered as plainly as we can.
            If yours isn't here, WhatsApp us — we'll answer it the same way.
          </p>
        </div>

        <div className="lg:col-span-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-6 flex items-start justify-between gap-6 group"
                >
                  <div className="flex gap-5 items-start">
                    <span className="font-mono text-xs text-[var(--oak-500)] mt-2 tracking-widest flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl leading-tight group-hover:text-[var(--oak-600)] transition-colors">
                      {f.q}
                    </h3>
                  </div>
                  <span
                    className={`w-8 h-8 rounded-full border border-[var(--border-strong)] flex items-center justify-center flex-shrink-0 transition-transform duration-500 ${isOpen ? "rotate-45 bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]" : ""}`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pl-[3.25rem] pr-10 text-[var(--fg-muted)] text-lg leading-relaxed max-w-2xl">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
