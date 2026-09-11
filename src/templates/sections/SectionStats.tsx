"use client";
import { motion } from "framer-motion";

/** SectionStats — metric grid (numbers) */
export default function SectionStats({
  items, dark = false,
}: { items: { num: string; label: string; }[]; dark?: boolean }) {
  return (
    <section className={`py-14 md:py-20 border-y ${dark ? "bg-[var(--navy)] text-[var(--cream)] border-white/10" : "bg-[var(--bg-subtle)] border-[var(--border)]"}`}>
      <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {items.map((it, i) => (
          <motion.div key={it.label} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.08, ease:[0.22,1,0.36,1] }}>
            <div className={`font-display text-4xl md:text-5xl lg:text-6xl tracking-tight tabular-nums ${dark ? "text-[var(--cream)]" : "text-[var(--navy)]"}`}>{it.num}</div>
            <div className={`text-[10px] md:text-xs uppercase tracking-[0.22em] mt-2 ${dark ? "text-white/55" : "text-[var(--muted)]"}`}>{it.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
