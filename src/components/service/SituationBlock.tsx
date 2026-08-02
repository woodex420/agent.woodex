"use client";

import { motion } from "framer-motion";

export default function SituationBlock({ heading, body }: { heading: string; body: string[] }) {
  return (
    <section id="situation" className="section-pad bg-[var(--bg)]">
      <div className="container-x grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-4">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            The situation
          </div>
        </div>
        <div className="lg:col-span-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[var(--fs-h2)] leading-[1.05] mb-8"
          >
            {heading}
          </motion.h2>
          <div className="space-y-5 text-lg text-[var(--fg-muted)] leading-relaxed max-w-3xl">
            {body.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
