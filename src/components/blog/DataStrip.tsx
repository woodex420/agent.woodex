"use client";

import { motion } from "framer-motion";

/**
 * DataStrip — proprietary-data band reinforcing that the blog uses real numbers.
 * Per PRD AIO/GEO goal: we publish our own internal data, not generic advice.
 */
const STATS = [
  { n: "240+", l: "Projects in our dataset" },
  { n: "11", l: "Years of weekly cost tracking" },
  { n: "98%", l: "On-time handover rate" },
  { n: "PKR 0", l: "Paywall / signup required" },
];

export default function DataStrip() {
  return (
    <section className="py-24 bg-[var(--graphite-900)] text-white noise">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--oak-300)] mb-5">
              <span className="w-8 h-px bg-[var(--oak-400)]" />
              Why these numbers are real
            </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] text-white mb-6">
              We write from our<br /><span className="italic-serif text-[var(--oak-300)]">own invoices.</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Every cost per sqft, every timeline, every material price in this journal
              comes from a quote we sent or a bill we paid in the last 24 months. We
              don't aggregate from other blogs and we don't use AI to guess ranges.
              When numbers change (marble prices rose 18% in 2024) we update the article.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {STATS.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[var(--graphite-900)] p-8 flex flex-col justify-between"
              >
                <div className="font-display text-5xl md:text-6xl text-[var(--oak-300)] leading-none">{s.n}</div>
                <div className="text-xs uppercase tracking-widest text-white/60 mt-6 leading-snug">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
