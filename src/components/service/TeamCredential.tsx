"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import type { TeamCredential } from "@/lib/content/services";

export default function TeamCredential({
  team, cta,
}: { team: TeamCredential; cta: { line: string; button: string; href: string } }) {
  return (
    <section id="team" className="section-pad bg-[var(--bg)] border-t border-[var(--border)]">
      <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="aspect-[4/5] rounded-sm relative overflow-hidden"
               style={{ background: "linear-gradient(135deg,var(--oak-300),var(--oak-600),var(--oak-800))" }}>
            {/* Abstract portrait placeholder — replaced with real headshot later */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 250" aria-hidden>
              <circle cx="100" cy="90" r="45" fill="rgba(255,255,255,0.2)" />
              <path d="M30 250 C 30 170, 170 170, 170 250 Z" fill="rgba(255,255,255,0.2)" />
            </svg>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="font-display text-3xl italic-serif">{team.name}</div>
              <div className="text-sm text-white/70 uppercase tracking-widest mt-1">{team.role}</div>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            Your lead
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
            One person to <span className="italic-serif text-[var(--oak-600)]">call.</span>
            <br />Not a call centre.
          </h2>
          <div className="flex items-center gap-3 mb-8">
            <div className="font-display text-2xl">{team.name}</div>
            <span className="text-sm text-[var(--fg-muted)]">— {team.role}</span>
          </div>
          <p className="text-lg text-[var(--fg-muted)] leading-relaxed max-w-2xl mb-8">
            {team.note}
          </p>
          <p className="font-display text-2xl md:text-3xl leading-tight max-w-2xl mb-8 italic-serif">
            "{cta.line}"
          </p>
          <Button variant="liquid" size="lg" magnetic href={cta.href}>
            {cta.button} →
          </Button>
        </div>
      </div>
    </section>
  );
}
