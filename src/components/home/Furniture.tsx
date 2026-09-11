"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Section 09 — Woodex Furniture (PRD sister concern)
 * Deliberately not the primary message — a supporting ecosystem.
 */
export default function Furniture() {
  return (
    <section className="section-pad bg-[var(--bg)] relative overflow-hidden">
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 relative"
        >
          <div className="relative aspect-[5/4] rounded-[var(--r-lg)] overflow-hidden">
            <Image
              src="/images/svc-customfurniture.jpg"
              alt="Woodex Furniture — workshop-built joinery and custom pieces"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
          </div>
          {/* Workshop badge */}
          <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-[var(--r-md)] px-5 py-4 shadow-[var(--shadow-md)]">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--brass)] mb-1">Workshop</div>
            <div className="font-display text-lg leading-tight">Custom joinery,<br/>built off-site.</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <span className="kicker mb-6">Woodex Furniture</span>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
            A broader
            <span className="italic-serif text-[var(--brass)]"> Woodex ecosystem.</span>
          </h2>
          <p className="text-[var(--fg-muted)] text-lg leading-[1.6] mb-8 max-w-xl">
            Woodex Interior is supported by the Woodex Furniture ecosystem — providing access to
            custom furniture and joinery solutions that complement workplace and commercial projects.
            Coordinated delivery, single point of accountability, no colour-matching surprises.
          </p>

          <ul className="space-y-4 mb-10 max-w-lg">
            {[
              "Workstations, seating and storage for workplaces",
              "Reception desks, conference tables, credenzas",
              "Retail fixtures, display systems, cash counters",
              "2-year structural warranty on every piece",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 text-[var(--fg)]">
                <span className="w-5 h-5 rounded-full bg-[var(--brass)]/10 border border-[var(--brass)]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--brass)]" />
                </span>
                <span className="leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>

          <a
            href="/services/custom-furniture"
            className="group inline-flex items-center gap-3 px-6 py-4 rounded-full border border-[var(--border-strong)] text-[var(--fg)] text-xs uppercase tracking-widest font-medium hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)] transition-colors"
          >
            Explore Woodex Furniture <span className="arrow">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
