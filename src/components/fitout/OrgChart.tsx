"use client";

import { motion } from "framer-motion";

export default function OrgChart({ team }: { team: { role: string; name: string; note: string }[] }) {
  return (
    <section className="section-pad bg-[var(--bg-subtle)]">
      <div className="container-x">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          Who's on site
        </div>
        <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-12 max-w-3xl">
          Five names.<br />
          <span className="italic-serif text-[var(--oak-600)]">One person who picks up.</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6">
          {team.map((m, i) => {
            const avGradients = [
              "linear-gradient(135deg, var(--oak-300), var(--oak-500))",
              "linear-gradient(135deg, var(--oak-400), var(--oak-600))",
              "linear-gradient(135deg, var(--oak-200), var(--oak-500))",
            ];
            return (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[var(--surface-1)] p-5 md:p-6 rounded-sm border border-[var(--border)]"
            >
              {/* Placeholder avatar */}
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full mb-4"
                   style={{ background: avGradients[i % avGradients.length] }}>
                <svg viewBox="0 0 64 64" className="w-full h-full text-[var(--graphite-900)]/70">
                  <circle cx="32" cy="26" r="10" fill="currentColor" opacity="0.4"/>
                  <path d="M12 58 C 12 44, 52 44, 52 58 Z" fill="currentColor" opacity="0.4"/>
                </svg>
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--oak-600)] mb-1">{m.role}</div>
              <div className="font-display text-xl mb-2">{m.name}</div>
              <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{m.note}</p>
            </motion.div>
            );
          })}
        </div>
        <p className="mt-10 text-[var(--fg-muted)] max-w-xl text-base">
          No call centres. No "the designer is in a meeting." You get names, mobile numbers, and
          a Friday Report signed by the project lead.
        </p>
      </div>
    </section>
  );
}
