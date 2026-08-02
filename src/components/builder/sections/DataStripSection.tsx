"use client";

import { motion } from "framer-motion";

type Item = { value: string; label: string };

export default function DataStripSection({
  eyebrow,
  items,
  theme = "paper",
}: {
  eyebrow?: string;
  items?: Item[];
  theme?: "paper" | "graphite" | "oak";
}) {
  const themeClass =
    theme === "graphite"
      ? "bg-[var(--graphite-900)] text-white"
      : theme === "oak"
      ? "bg-[var(--oak-500)] text-[var(--graphite-900)]"
      : "bg-[var(--bg-subtle)] text-[var(--fg)]";

  const fallback: Item[] = [
    { value: "11", label: "Years operating" },
    { value: "240+", label: "Projects delivered" },
    { value: "98%", label: "On-time handover" },
    { value: "4.9/5", label: "Client rating" },
  ];
  const list = items && items.length >= 3 ? items : fallback;

  return (
    <section className={`py-14 md:py-20 ${themeClass}`}>
      <div className="container-x">
        {eyebrow && (
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] mb-8 opacity-70">
            <span className={`w-8 h-px ${theme === "graphite" ? "bg-[var(--oak-400)]" : "bg-current"}`} />
            {eyebrow}
          </div>
        )}
        <div className={`grid grid-cols-2 md:grid-cols-${Math.min(list.length, 4)} gap-8 md:gap-10`}>
          {list.map((x, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-display text-4xl md:text-6xl leading-none mb-2">{x.value}</div>
              <div className="text-xs uppercase tracking-widest opacity-70 mt-2">{x.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
