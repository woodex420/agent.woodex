"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

/** SectionGrid — auto-grid of cards with consistent gaps */
export default function SectionGrid({
  kicker, heading, children, cols = 3, dark = false,
}: { kicker?: string; heading?: ReactNode; children: ReactNode; cols?: 2|3|4; dark?: boolean; }) {
  const colCls = cols === 2 ? "md:grid-cols-2" : cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <section className={`section-pad ${dark ? "bg-[var(--navy)] text-[var(--cream)]" : "bg-[var(--bg)]"}`}>
      <div className="container-x">
        {(kicker || heading) && (
          <div className="max-w-2xl mb-12 md:mb-16">
            {kicker && <span className="kicker mb-6 inline-flex" data-kicker-invert={dark || undefined}>{kicker}</span>}
            {heading && <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">{heading}</h2>}
          </div>
        )}
        <div className={`grid ${colCls} gap-px ${dark ? "bg-white/10" : "bg-[var(--border)]"} border ${dark ? "border-white/10" : "border-[var(--border)]"}`}>
          {children}
        </div>
      </div>
    </section>
  );
}

/** Grid card cell */
export function GridCell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
      className={`bg-[var(--bg)] p-7 md:p-8 min-h-[220px] ${className}`}>
      {children}
    </motion.div>
  );
}
