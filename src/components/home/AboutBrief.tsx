"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from "framer-motion";

function Counter({ target, suffix = "", duration = 1600, decimals = 0 }: { target: number; suffix?: string | React.ReactNode; duration?: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const value = useMotionValue(0);
  const spring = useSpring(value, { damping: 40, stiffness: 120, mass: 0.8 });
  const [display, setDisplay] = useState(0);

  useEffect(() => { if (inView) value.set(target); }, [inView, target, value]);
  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(v));
    return unsub;
  }, [spring]);

  return <span ref={ref}>{display.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}{suffix as any}</span>;
}

/**
 * About Brief — parallax stack
 * A short, trust-building section immediately after the fold.
 * Uses the mirror→stakes→shift spine from copy rules.
 */
export default function AboutBrief() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);

  return (
    <section ref={ref} className="section-pad bg-[var(--bg)] relative">
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Parallax image stack */}
        <motion.div style={{ y: imgY }} className="lg:col-span-6 relative aspect-[4/5] overflow-hidden rounded-sm">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/about-craft.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          {/* Annotation */}
          <div className="absolute top-6 left-6 right-6 flex justify-between text-white/90 text-xs uppercase tracking-[0.25em]">
            <span>Est. 2014</span>
            <span>Lahore, PK</span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="font-display text-4xl italic-serif">Craft before brand.</div>
          </div>
          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="absolute left-6 bottom-6 md:left-auto md:-right-4 md:bottom-10 bg-[var(--surface-1)] border border-[var(--border)] p-5 md:p-6 shadow-[var(--shadow-lg)] w-[calc(100%-3rem)] md:w-[230px]"
          >
            <div className="font-display text-5xl text-[var(--oak-600)] leading-none"><Counter target={11} /><span className="text-[var(--fg)]">yrs</span></div>
            <div className="text-sm text-[var(--fg-muted)] mt-2">Designing and building spaces that actually get built — as drawn.</div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div style={{ y: textY }} className="lg:col-span-6">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-6">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            The problem with interiors
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-8">
            You don't fear <span className="italic-serif text-[var(--oak-600)]">bad taste.</span>
            <br />
            You fear <span className="italic-serif">the bill. The date. The surprise.</span>
          </h2>
          <div className="space-y-5 text-lg text-[var(--fg-muted)] leading-relaxed max-w-xl">
            <p>
              Most studios sell adjectives. Bespoke. Premium. Innovative. They show you a render,
              take a deposit, then start negotiating. The finish changes. The date moves. The bill grows.
            </p>
            <p>
              We sell <strong className="text-[var(--fg)]">certainty</strong>. You approve a photoreal 3D walkthrough.
              We lock the scope, the price, and the handover date — in writing. Then we build exactly that.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-[var(--border)]">
            {[
              { n: 240, suffix: "+", l: "Projects delivered" },
              { n: 98, suffix: "%", l: "On-time handover" },
              { n: 0, suffix: "", l: "Scope disputes, 2023-25" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-4xl md:text-5xl text-[var(--oak-600)] leading-none">
                  <Counter target={s.n} suffix={s.suffix} />
                </div>
                <div className="text-xs uppercase tracking-wider text-[var(--fg-muted)] mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
