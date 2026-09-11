"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SectionFAQ({
  kicker = "FAQ", heading = "Questions, answered.", items, dark = false,
}: {
  kicker?: string; heading?: string; items: { q: string; a: string }[]; dark?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={`section-pad ${dark ? "bg-[var(--navy)] text-[var(--cream)]" : "bg-[var(--bg)]"}`}>
      <div className="container-x max-w-4xl">
        <span className="kicker mb-6 inline-flex" data-kicker-invert={dark||undefined}>{kicker}</span>
        <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-12">{heading}</h2>
        <div className="border-t border-current/15">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-current/15">
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between py-6 text-left gap-6 group">
                  <span className="font-display text-xl md:text-2xl leading-tight group-hover:text-[var(--wood-deep)] dark:group-hover:text-[var(--wood)] transition-colors">{it.q}</span>
                  <span className={`w-10 h-10 flex-shrink-0 rounded-full border border-current/30 flex items-center justify-center transition-transform ${isOpen ? "rotate-45" : ""}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.4, ease:[0.22,1,0.36,1] }} className="overflow-hidden">
                      <p className={`pb-6 pr-16 leading-relaxed ${dark ? "text-white/70" : "text-[var(--muted)]"}`}>{it.a}</p>
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
