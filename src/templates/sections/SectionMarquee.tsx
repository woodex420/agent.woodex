"use client";

/** SectionMarquee — infinite horizontal logo/text ticker */
export default function SectionMarquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <section className={`py-14 border-y overflow-hidden ${dark ? "bg-[var(--navy)] text-[var(--cream)] border-white/10" : "bg-[var(--cream-2)] border-[var(--border)]"}`}>
      <style>{`
        @keyframes lx-marquee { from { transform: translate3d(0,0,0);} to { transform: translate3d(-50%,0,0);} }
        @media (prefers-reduced-motion:reduce) { .lx-marquee-track { animation: none !important; } }
      `}</style>
      <div className="lx-marquee-track flex gap-12 md:gap-16 whitespace-nowrap" style={{ animation: "lx-marquee 40s linear infinite", width: "max-content" }}>
        {[...items, ...items].map((name, i) => (
          <span key={i} className={`font-display text-xl md:text-3xl tracking-tight ${dark ? "text-white/60" : "text-[var(--muted)]"} flex-shrink-0 flex items-center gap-8 md:gap-14`}>
            {name}
            <span className={`${dark ? "text-[var(--wood)]/60" : "text-[var(--wood)]/50"}`}>·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
