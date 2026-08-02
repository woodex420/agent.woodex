"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Proof Stack — reviews, numbers, named quotes.
 * Every claim has proof within one scroll.
 */
const REVIEWS = [
  {
    quote:
      "They handed over on a Tuesday. We moved 180 staff in on the Wednesday. Everything worked. I've never seen that before.",
    name: "Ayesha Malik",
    role: "COO, Systems Ltd",
    project: "22,000 sqft IT floor",
  },
  {
    quote:
      "The Friday Report is the reason we hired them. Three months in, my board knew exactly what was happening every week — including the bad weeks.",
    name: "Omar Sheikh",
    role: "Director, Nishat Hospitality",
    project: "HQ fit-out",
  },
  {
    quote:
      "I built three homes before. Woodex was the first one that actually looked like the pictures. Not close. Like the pictures.",
    name: "Fatima Riaz",
    role: "Homeowner",
    project: "DHA Phase 5 residence",
  },
];

const METRICS = [
  { n: "240+", l: "Projects delivered since 2014" },
  { n: "98%", l: "Handover on contract date" },
  { n: "4.9/5", l: "Average client rating" },
  { n: "72%", l: "Revenue from repeat/referral" },
];

export default function ProofStack() {
  return (
    <section className="section-pad bg-[var(--graphite-900)] text-white relative noise overflow-hidden">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="kicker text-[var(--oak-300)] mb-5" aria-hidden>
              <span className="w-8 h-px bg-[var(--oak-400)]" />
              Proof, not adjectives
            </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-8">
              Don't read our<br />
              <span className="italic-serif text-[var(--oak-300)]">marketing copy.</span>
              <br />
              Read our clients.
            </h2>
            <p className="text-white/70 text-lg max-w-md leading-relaxed mb-8">
              We're not the cheapest studio in Lahore. We're the one that hands over on the date in the contract,
              matches the render you approved, and texts you back.
            </p>
            <Link href="/portfolio" className="text-[var(--oak-300)] text-sm uppercase tracking-widest font-medium hover:underline">
              See the full portfolio →
            </Link>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {/* Metrics grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10 rounded-sm">
              {METRICS.map((m, i) => (
                <motion.div
                  key={m.l}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 border-r border-b md:border-b-0 border-white/10 last:border-r-0 md:[&:nth-child(2)]:border-r md:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <div className="font-display text-4xl md:text-5xl text-[var(--oak-300)] leading-none mb-2">{m.n}</div>
                  <div className="text-xs text-white/60 leading-relaxed">{m.l}</div>
                </motion.div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="space-y-5">
              {REVIEWS.map((r, i) => (
                <motion.figure
                  key={r.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-white/10 p-7 md:p-9 rounded-sm bg-white/[0.02] relative"
                >
                  <span className="absolute -top-4 left-6 text-[var(--oak-400)] font-display text-7xl leading-none" aria-hidden>
                    &ldquo;
                  </span>
                  <blockquote className="font-display text-xl md:text-2xl leading-snug mb-6 text-white/90">
                    {r.quote}
                  </blockquote>
                  <figcaption className="flex items-end justify-between gap-4 flex-wrap pt-4 border-t border-white/10">
                    <div>
                      <div className="font-medium">{r.name}</div>
                      <div className="text-sm text-white/60">{r.role}</div>
                    </div>
                    <div className="text-xs uppercase tracking-widest text-[var(--oak-300)]">{r.project}</div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>

            {/* Google badge */}
            <div className="flex items-center gap-4 pt-4 text-white/60 text-sm">
              <div className="flex items-center gap-1 text-[var(--oak-300)]">
                {[0,1,2,3,4].map((i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
                ))}
              </div>
              <span>4.9 from 137 Google reviews · 150+ target end-Q4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
