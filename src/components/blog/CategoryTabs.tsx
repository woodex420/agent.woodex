"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { POSTS, CATEGORY_META, PostCategory, formatDate } from "@/lib/content/posts";

type Filter = PostCategory | "all";
const FILTERS: Filter[] = ["all", "costs", "timelines", "materials", "case-studies", "process", "guides"];

export default function CategoryTabs() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = filter === "all" ? POSTS : POSTS.filter((p) => p.category === filter);

  return (
    <section className="py-20 bg-[var(--bg-subtle)]">
      <div className="container-x">
        {/* Tabs — horizontal scroll on mobile */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 -mx-2 px-2 mb-10 md:mb-12 border-b border-[var(--border)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x" data-lenis-prevent>
          {FILTERS.map((f) => {
            const active = filter === f;
            const label = f === "all" ? "All writing" : CATEGORY_META[f].label;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative whitespace-nowrap px-3 md:px-4 py-3 text-xs md:text-sm uppercase tracking-widest transition-colors flex-shrink-0 touch-manipulation ${active ? "text-[var(--fg)]" : "text-[var(--fg-muted)] hover:text-[var(--fg)]"}`}
              >
                {label}
                {active && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute left-2 right-2 -bottom-px h-0.5 bg-[var(--oak-500)]"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.article
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                className="group"
              >
                <Link href={`/blog/${p.category}/${p.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--graphite-200)] mb-5">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                      style={{ backgroundImage: `url(${p.image})` }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[var(--bg)]/90 backdrop-blur text-[var(--fg)] text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium">
                        {CATEGORY_META[p.category].label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[var(--fg-subtle)] mb-3">
                    <span>{formatDate(p.date)}</span>
                    <span>·</span>
                    <span>{p.readTime} min</span>
                  </div>
                  <h3 className="font-display text-2xl leading-tight mb-3 group-hover:text-[var(--oak-600)] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[var(--fg-muted)] leading-relaxed mb-4 line-clamp-2">{p.deck}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[var(--graphite-900)] text-[var(--oak-300)] font-display flex items-center justify-center text-xs">
                      {p.author.initials}
                    </div>
                    <span className="text-sm text-[var(--fg-subtle)]">{p.author.name}</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
