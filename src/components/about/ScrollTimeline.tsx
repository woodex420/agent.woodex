"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * ScrollTimeline — horizontal scroll-reveal of 12 years of milestones.
 * Signature motion: sticky container with year dot markers scrolling left
 * along a horizontal path as the user scrolls vertically.
 */
const MILESTONES = [
  { yr: "2014", title: "First workshop", body: "4,200 sqft on Multan Road. 12 carpenters, 1 designer (the founder). First job: a 2,800 sqft office in Gulberg." },
  { yr: "2016", title: "First café", body: "Butt Sweets' DHA flagship. 1,400 sqft, 7 weeks on site. We learned how fast F&B has to open — and how brutal a missed date is." },
  { yr: "2017", title: "In-house 3D", body: "Hired a full-time 3D artist. Stopped outsourcing renders. That's when 'approve it in 3D — get exactly that' became possible, not a slogan." },
  { yr: "2018", title: "20-job year", body: "Crossed 20 projects in 12 months. Hired a dedicated project manager. Moved the workshop to 11,000 sqft on Sundar Road." },
  { yr: "2020", title: "Lockdown pivot", body: "Lost 4 hospitality projects in 72 hours. Launched turnkey residential. Built 38 homes in 18 months from a single WhatsApp group." },
  { yr: "2022", title: "Corporate programme", body: "Signed ongoing fit-outs with two of Pakistan's top-10 banks. Started the Friday Report — one page, every Friday, no exceptions." },
  { yr: "2023", title: "100th project", body: "HBL Model Town branch. Handed over on day 62 of a 62-day schedule. 0 punch-list items above 150mm." },
  { yr: "2024", title: "Published pricing", body: "Stopped hiding prices. First studio in Lahore to publish real per-sqft bands and a 3D studio price list." },
  { yr: "2025", title: "240+ and counting", body: "34 people on payroll. 240+ projects delivered. 98% on-time. 0 scope disputes in 28 months. Still writing the date in bold." },
];

export default function ScrollTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const barX = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[var(--graphite-900)] text-white relative overflow-hidden">
      <div className="container-x">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--oak-300)] mb-6">
          <span className="w-8 h-px bg-[var(--oak-400)]" />
          Twelve years in
        </div>
        <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] max-w-3xl mb-16">
          The milestones <span className="italic-serif text-[var(--oak-300)]">no one puts on a plaque.</span>
        </h2>
      </div>

      {/* Horizontal timeline track */}
      <div className="relative">
        <div className="container-x">
          {/* Track */}
          <div className="relative h-px bg-white/15 mb-12">
            <motion.div
              className="absolute left-0 top-0 h-px bg-[var(--oak-400)] origin-left"
              style={{ width: barX }}
            />
          </div>
        </div>

        <div className="container-x grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-x-6 gap-y-14">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.yr}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              className="relative"
            >
              <div className="absolute -top-[calc(3rem+1px)] left-0 w-2.5 h-2.5 rounded-full bg-[var(--oak-400)] ring-4 ring-[var(--graphite-900)]" />
              <div className="font-mono text-xs text-[var(--oak-300)] tracking-widest mb-3">{m.yr}</div>
              <h3 className="font-display text-xl leading-tight mb-3 text-white">{m.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{m.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
