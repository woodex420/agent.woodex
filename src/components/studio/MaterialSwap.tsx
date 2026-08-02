"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Material = {
  id: string;
  label: string;
  note: string;
  swatch: string; // CSS color/gradient
  bg: string;
};

const MATERIALS: Material[] = [
  {
    id: "oak",
    label: "Natural Oak",
    note: "Matte oiled oak, warm grain. Our default for residential and warm commercial.",
    swatch: "linear-gradient(135deg,#b9915d,#7a5530)",
    bg: "linear-gradient(135deg,rgba(30,22,15,0.55),rgba(80,55,30,0.5)),url(/images/svc-residential.jpg)",
  },
  {
    id: "walnut",
    label: "Smoked Walnut",
    note: "Darker, moodier, formal. Boardrooms, libraries, executive floors.",
    swatch: "linear-gradient(135deg,#553522,#2e1b10)",
    bg: "linear-gradient(135deg,rgba(10,10,10,0.7),rgba(40,25,15,0.5)),url(/images/svc-corporate.jpg)",
  },
  {
    id: "white-oak",
    label: "White Oak Light",
    note: "Scandinavian-bright, white-oiled. Small spaces, retail, cafés.",
    swatch: "linear-gradient(135deg,#e2d2b4,#c1a87c)",
    bg: "linear-gradient(135deg,rgba(25,20,15,0.5),rgba(90,70,45,0.4)),url(/images/portfolio-cafe.jpg)",
  },
  {
    id: "travertine",
    label: "Travertine + Brass",
    note: "Premium reception, feature walls, hospitality.",
    swatch: "linear-gradient(135deg,#d7c7a6,#b39758)",
    bg: "linear-gradient(135deg,rgba(15,15,15,0.55),rgba(90,65,30,0.5)),url(/images/portfolio-hbl.jpg)",
  },
];

export default function MaterialSwap() {
  const [active, setActive] = useState(0);
  const m = MATERIALS[active];
  return (
    <section className="section-pad bg-[var(--graphite-900)] text-white">
      <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--oak-300)] mb-5">
            <span className="w-8 h-px bg-[var(--oak-400)]" />
            Material swap
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
            Try four finishes<br />
            <span className="italic-serif text-[var(--oak-300)]">before we order a thing.</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
            Every concept package includes material variants — we swap finishes in the render so you see
            your space, not a mood board. These are four of the finishes you'll pick between on any project.
          </p>
          {/* Horizontal tab bar on mobile, vertical list on md+ */}
          <div className="flex md:hidden gap-2 overflow-x-auto pb-2 -mx-2 px-2 mb-2" role="tablist">
            {MATERIALS.map((mat, i) => {
              const isActive = i === active;
              return (
                <button
                  key={mat.id + "-mob"}
                  onClick={() => setActive(i)}
                  className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border text-xs uppercase tracking-widest whitespace-nowrap transition-colors ${isActive ? "border-[var(--oak-400)] bg-white/10 text-[var(--oak-300)]" : "border-white/15 text-white/70"}`}
                  aria-selected={isActive}
                  role="tab"
                >
                  <span className="w-5 h-5 rounded-sm flex-shrink-0" style={{ background: mat.swatch }} />
                  {mat.label}
                </button>
              );
            })}
          </div>

          <div className="hidden md:block space-y-2">
            {MATERIALS.map((mat, i) => {
              const isActive = i === active;
              return (
                <button
                  key={mat.id}
                  onClick={() => setActive(i)}
                  className={`w-full flex items-center gap-4 p-4 text-left border rounded-sm transition-all ${isActive ? "border-[var(--oak-400)] bg-white/5" : "border-white/10 hover:border-white/30"}`}
                  aria-selected={isActive}
                  role="tab"
                >
                  <span className="w-10 h-10 rounded-sm flex-shrink-0" style={{ background: mat.swatch }} />
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-lg">{mat.label}</div>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-sm text-white/60 mt-1"
                      >{mat.note}</motion.div>
                    )}
                  </div>
                  <span className={`text-xs uppercase tracking-widest ${isActive ? "text-[var(--oak-300)]" : "text-white/30"}`}>
                    {isActive ? "Active" : `0${i + 1}`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile active note */}
          <div className="md:hidden mt-3 p-4 border border-white/10 rounded-sm bg-white/5">
            <div className="font-display text-lg text-white mb-1">{m.label}</div>
            <p className="text-sm text-white/70 m-0">{m.note}</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={m.id}
                className="absolute inset-0 bg-cover bg-center"
                style={{ background: m.bg }}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-xs uppercase tracking-widest text-[var(--oak-300)] mb-2">Render · {m.label}</div>
              <div className="font-display text-2xl md:text-3xl italic-serif max-w-md">
                {m.note}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
