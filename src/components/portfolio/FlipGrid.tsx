"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { PROJECTS, CATEGORIES, type Category } from "@/lib/content/projects";

/**
 * FLIP-animated filter grid (PRD §8 — Portfolio signature motion).
 * Click a category, cards animate to new positions with a smooth FLIP reflow.
 */
export default function FlipGrid() {
  const [filter, setFilter] = useState<Category>("All");

  const filtered = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section className="pb-20 md:pb-32">
      <div className="container-x">
        {/* Filters */}
        <LayoutGroup id="filter-bar">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-10 md:mb-14">
            {CATEGORIES.map((cat) => {
              const active = cat === filter;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="relative px-4 py-2 text-xs md:text-sm uppercase tracking-widest rounded-full border transition-colors duration-300"
                  style={{
                    borderColor: active ? "var(--fg)" : "var(--border)",
                    color: active ? "var(--bg)" : "var(--fg-muted)",
                    background: active ? "var(--fg)" : "transparent",
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-active"
                      className="absolute inset-0 rounded-full bg-[var(--fg)] -z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
            <span className="ml-auto text-xs font-mono text-[var(--fg-subtle)] hidden md:block">
              {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            </span>
          </div>
        </LayoutGroup>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                  layout: { type: "spring", stiffness: 260, damping: 28 },
                }}
                className="group"
              >
                <Link href={`/portfolio/${p.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ background: p.heroImg }}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute top-5 left-5 right-5 flex justify-between text-xs uppercase tracking-widest text-white/70">
                      <span>{p.category}</span>
                      <span>{p.year}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-display text-2xl md:text-3xl leading-tight mb-2 group-hover:text-[var(--oak-200)] transition-colors">
                        {p.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-white/70">
                        <span>{p.location}</span>
                        <span>{p.area}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
