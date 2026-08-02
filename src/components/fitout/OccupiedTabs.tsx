"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function OccupiedTabs({
  occupied, empty,
}: { occupied: string; empty: string }) {
  const [tab, setTab] = useState<"occupied" | "empty">("occupied");
  return (
    <section className="py-16 md:py-24 bg-[var(--bg)]">
      <div className="container-x">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          How we deliver
        </div>
        <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-8 max-w-2xl">
          Delivering around you,<br />
          <span className="italic-serif text-[var(--oak-600)]">or into an empty shell.</span>
        </h2>

        <div className="inline-flex border border-[var(--border-strong)] rounded-full p-1 mb-10">
          {([
            { id: "occupied", label: "Occupied space" },
            { id: "empty", label: "Empty shell" },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative px-6 py-2.5 text-xs uppercase tracking-widest rounded-full transition-colors duration-300",
                tab === t.id ? "text-[var(--bg)]" : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
              )}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-[var(--fg)] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2"
            >
              <p className="text-lg text-[var(--fg-muted)] leading-relaxed mb-6">
                {tab === "occupied" ? occupied : empty}
              </p>
              <ul className="space-y-3">
                {(tab === "occupied"
                  ? ["After-hours and weekend crews", "Sealed hoardings with dust extraction", "Corridor and shared-space protection", "5pm noise cutoff, daily cleanup"]
                  : ["Parallel trades, fastest timeline", "No hoarding or dust containment needed", "Earlier furniture/joinery delivery", "Most cost-effective approach"]
                ).map((item) => (
                  <li key={item} className="flex gap-3 text-[var(--fg)]">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--oak-500)] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="lg:col-span-3 relative aspect-[4/3] rounded-sm overflow-hidden"
               style={{ background: tab === "occupied"
                 ? "linear-gradient(135deg,rgba(30,25,20,0.55),rgba(75,55,35,0.5)),url(/images/svc-commercial.jpg) center/cover"
                 : "linear-gradient(135deg,rgba(20,20,20,0.55),rgba(75,55,30,0.4)),url(/images/before-space.jpg) center/cover" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="text-xs uppercase tracking-widest text-[var(--oak-300)] mb-1">
                {tab === "occupied" ? "Delivery mode" : "Delivery mode"}
              </div>
              <div className="font-display text-3xl italic-serif">
                {tab === "occupied" ? "Around your team" : "Empty shell"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
