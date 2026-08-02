"use client";

import { motion } from "framer-motion";

/**
 * StudioMap — stylised address/map block (no external embed to avoid tracking/GDPR issues).
 * In Sprint 6 this can swap for a Google Maps embed; for now we do an on-brand card.
 */
export default function StudioMap() {
  return (
    <section id="map" className="py-24 bg-[var(--bg)]">
      <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-5">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            The studio
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
            Come see wood<br />
            <span className="italic-serif text-[var(--oak-600)]">being cut.</span>
          </h2>
          <p className="text-[var(--fg-muted)] text-lg leading-relaxed mb-8 max-w-md">
            We don't have a glass-fronted showroom on Main Boulevard. We have a workshop.
            You'll hear the saws, smell the finish, and see pieces that are going out to
            other clients the same week. Visits are by appointment so someone can actually
            walk you through.
          </p>

          <dl className="space-y-5 text-[var(--fg)]">
            <InfoRow k="Address">
              Woodex Interior Workshop<br />
              Plot 42, Sundar Industrial Road<br />
              Lahore, Pakistan
            </InfoRow>
            <InfoRow k="Hours">
              Monday–Saturday · 10am–7pm<br />
              Closed Sundays (family day)
            </InfoRow>
            <InfoRow k="Parking">
              Free on-site. Two covered bays reserved for clients.
            </InfoRow>
          </dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          {/* Stylised map card (placeholder for Google Maps embed) */}
          <div className="relative aspect-[4/3] bg-[var(--graphite-900)] text-white overflow-hidden noise">
            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--oak-400)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Roads (abstract) */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden>
              <path d="M0 180 L 400 140" stroke="rgba(255,255,255,0.15)" strokeWidth="12" fill="none" />
              <path d="M120 0 L 180 300" stroke="rgba(255,255,255,0.12)" strokeWidth="8" fill="none" />
              <path d="M260 0 L 280 300" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
              <path d="M0 80 L 400 100" stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none" />
            </svg>

            {/* Pin */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-[45%] top-[48%] -translate-x-1/2"
            >
              <div className="relative">
                <div className="w-5 h-5 rounded-full bg-[var(--oak-400)] ring-4 ring-[var(--oak-400)]/30" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--oak-400)]/20 animate-ping" />
              </div>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[var(--oak-500)] text-white text-xs uppercase tracking-widest px-3 py-1.5 font-medium">
                Woodex Studio
              </div>
            </motion.div>

            <div className="absolute bottom-4 md:bottom-6 left-4 right-4 md:left-6 md:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
              <div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-[var(--oak-300)] mb-1">Sundar Industrial Road</div>
                <div className="font-display text-lg md:text-xl text-white leading-tight">20 min from DHA · 25 min from Gulberg</div>
              </div>
              <a
                href="https://maps.google.com/?q=Lahore+Sundar+Road"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] md:text-xs uppercase tracking-widest border border-white/30 px-3 py-2 md:px-4 hover:bg-[var(--oak-500)] hover:border-[var(--oak-500)] transition whitespace-nowrap"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoRow({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-1 sm:gap-6 pt-4 border-t border-[var(--border)]">
      <dt className="text-xs uppercase tracking-widest text-[var(--fg-subtle)] pt-0 sm:pt-1">{k}</dt>
      <dd className="text-base leading-relaxed">{children}</dd>
    </div>
  );
}
