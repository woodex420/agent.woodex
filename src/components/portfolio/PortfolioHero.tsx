"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";

/**
 * Counter hero with live-animated numbers (PRD §8).
 */
function Counter({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const value = useMotionValue(0);
  const spring = useSpring(value, { damping: 40, stiffness: 120, mass: 0.8 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) value.set(target);
  }, [inView, target, value]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return () => unsub();
  }, [spring]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

export default function PortfolioHero() {
  return (
    <section className="pt-[calc(var(--nav-h)+3rem)] pb-16 md:pb-24 bg-[var(--bg)]">
      <div className="container-x">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-6">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          Selected work
        </div>
        <h1 className="font-display text-[var(--fs-display)] leading-[0.96] max-w-5xl mb-10">
          240+ projects.<br />
          <span className="italic-serif text-[var(--oak-600)]">Seven on this page.</span>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[var(--border)] rounded-sm max-w-4xl">
          {[
            { n: 240, s: "+", l: "Projects since 2014" },
            { n: 1200000, s: "+ sqft", l: "Delivered" },
            { n: 98, s: "%", l: "On the contract date" },
            { n: 72, s: "%", l: "Revenue from repeat / referral" },
          ].map((c) => (
            <div key={c.l} className="p-6 border-r border-b md:border-b-0 border-[var(--border)] last:border-r-0 [&:nth-child(2)]:border-r">
              <div className="font-display text-4xl md:text-5xl text-[var(--oak-600)] leading-none mb-2">
                <Counter target={c.n} suffix={c.s} />
              </div>
              <div className="text-[11px] uppercase tracking-widest text-[var(--fg-subtle)]">{c.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
