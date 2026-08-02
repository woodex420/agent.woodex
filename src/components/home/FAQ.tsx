"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { HOME_FAQS as FAQS } from "@/lib/content/faqs";

export { HOME_FAQS } from "@/lib/content/faqs";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section-pad bg-[var(--bg)]">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            Straight answers
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
            The questions<br />
            <span className="italic-serif text-[var(--oak-600)]">you're Googling.</span>
          </h2>
          <p className="text-[var(--fg-muted)] text-lg leading-relaxed mb-6 max-w-md">
            Other studios hide pricing and timelines behind discovery calls. Here's what
            clients actually ask before they sign — and what we actually tell them.
          </p>
          <Link href="/consultation" className="text-[var(--oak-600)] text-sm uppercase tracking-widest font-medium hover:underline">
            Ask us anything →
          </Link>
        </div>

        <div className="lg:col-span-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-5 md:py-6 flex items-start justify-between gap-4 group min-h-[48px] touch-manipulation"
                >
                  <div className="flex gap-3 md:gap-5 items-start">
                    <span className="font-mono text-xs text-[var(--oak-500)] mt-2 tracking-widest flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-lg md:text-xl lg:text-2xl leading-tight group-hover:text-[var(--oak-600)] transition-colors">
                      {f.q}
                    </h3>
                  </div>
                  <span
                    className={`w-9 h-9 md:w-8 md:h-8 rounded-full border border-[var(--border-strong)] flex items-center justify-center flex-shrink-0 transition-transform duration-500 mt-1 ${isOpen ? "rotate-45 bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]" : ""}`}
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
                      <p className="pb-6 md:pb-7 pl-10 md:pl-[3.25rem] pr-0 md:pr-10 text-[var(--fg-muted)] text-base md:text-lg leading-relaxed max-w-2xl">
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
