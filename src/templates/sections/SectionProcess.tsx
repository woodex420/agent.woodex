"use client";
import { motion } from "framer-motion";

/** SectionProcess — numbered step cards (horizontal on desktop, stacked on mobile) */
export default function SectionProcess({
  kicker = "The Process", heading = "From first conversation to final handover.",
  steps, dark = false,
}: { kicker?: string; heading?: string; steps: { n: string; title: string; body: string }[]; dark?: boolean }) {
  return (
    <section className={`section-pad ${dark ? "bg-[var(--navy)] text-[var(--cream)]" : "bg-[var(--bg)]"}`}>
      <div className="container-x">
        <div className="max-w-2xl mb-14">
          <span className="kicker mb-6 inline-flex" data-kicker-invert={dark||undefined}>{kicker}</span>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">{heading}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-current/10 border border-current/10">
          {steps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.07, ease:[0.22,1,0.36,1] }}
              className={`p-7 md:p-8 min-h-[240px] flex flex-col ${dark ? "bg-[var(--navy)]" : "bg-[var(--bg)]"}`}>
              <div className="font-mono text-xs text-[var(--wood)] tracking-widest mb-6">{s.n}</div>
              <h3 className="font-display text-xl md:text-[1.35rem] leading-tight mb-3">{s.title}</h3>
              <p className={`text-sm leading-relaxed flex-1 ${dark ? "text-white/70" : "text-[var(--muted)]"}`}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
