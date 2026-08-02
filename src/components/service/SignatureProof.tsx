"use client";

import { motion } from "framer-motion";
import type { ServiceContent } from "@/lib/content/services";

/**
 * Signature Proof block — unique per service (per §8 Anti-Repetition).
 * One of three kinds: stats, caseStudy, guarantee.
 */
export default function SignatureProof({ proof }: { proof: ServiceContent["proof"] }) {
  return (
    <section id="proof" className="section-pad bg-[var(--graphite-900)] text-white relative noise overflow-hidden">
      <div className="container-x grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--oak-300)] mb-5">
            <span className="w-8 h-px bg-[var(--oak-400)]" />
            Proof
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
            {proof.heading}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-md">
            {proof.body}
          </p>

          {proof.kind === "guarantee" && proof.guarantee && (
            <div className="mt-8 inline-block border border-[var(--oak-400)] px-6 py-4 text-[var(--oak-300)] font-display text-xl italic-serif">
              {proof.guarantee}
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          {proof.kind === "stats" && proof.stats && (
            <div className="grid grid-cols-2 gap-0 border border-white/10 rounded-sm">
              {proof.stats.map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 border-r border-b border-white/10 last:border-r-0 [&:nth-child(-n+2)]:border-b-0 [&:nth-child(2)]:border-r md:[&:nth-child(2)]:border-r"
                >
                  <div className="font-display text-5xl md:text-6xl text-[var(--oak-300)] leading-none mb-3">{s.n}</div>
                  <div className="text-xs uppercase tracking-widest text-white/60">{s.l}</div>
                </motion.div>
              ))}
            </div>
          )}

          {proof.kind === "caseStudy" && proof.caseStudy && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] rounded-sm overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ background: proof.caseStudy.img }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              <div className="absolute top-6 left-6 right-6 flex justify-between text-xs uppercase tracking-widest text-white/70">
                <span>Case study</span>
                <span>{proof.caseStudy.tag}</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display text-3xl md:text-4xl leading-tight mb-3">{proof.caseStudy.title}</h3>
                <p className="text-white/80 leading-relaxed max-w-xl mb-4">{proof.caseStudy.body}</p>
                <div className="inline-block font-mono text-[var(--oak-300)] text-sm tracking-widest border-t border-[var(--oak-400)]/50 pt-3">
                  {proof.caseStudy.metric}
                </div>
              </div>
            </motion.div>
          )}

          {proof.kind === "guarantee" && (
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[var(--graphite-800)] flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 300" aria-hidden>
                <circle cx="200" cy="150" r="110" stroke="var(--oak-400)" strokeWidth="1.5" fill="none" />
                <circle cx="200" cy="150" r="80" stroke="var(--oak-400)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                <path d="M140 150 L180 190 L260 110" stroke="var(--oak-300)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="relative text-center px-10">
                <div className="font-display text-5xl md:text-7xl italic-serif text-[var(--oak-300)] leading-none mb-4">Match.</div>
                <div className="font-display text-5xl md:text-7xl italic-serif text-[var(--oak-300)] leading-none mb-6">Or rebuild.</div>
                <p className="text-white/60 max-w-sm mx-auto">
                  A guarantee in the SOW. Invoked twice in 11 years. Both rebuilt at our cost within a week.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
