"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * WorkshopEssay — photo essay of the workshop / site craft.
 * Signature motion: clipped photos that reveal on scroll with slight parallax.
 * Reuses existing imagery rather than generating new images.
 */
const SHOTS = [
  {
    src: "/images/about-craft.jpg",
    caption: "Sundar Road workshop, 2025. 11,000 sqft of saws, benches and drying timber.",
    meta: "Carpentry · Day 03",
    align: "left",
  },
  {
    src: "/images/workshop-detail.jpg",
    caption: "Ustad Saqib's 2mm rule. If a joint is off by more than 2mm, it doesn't leave the workshop.",
    meta: "Finishing · Day 11",
    align: "right",
  },
  {
    src: "/images/svc-residential.jpg",
    caption: "Hand-finished walnut veneer on a DHA Phase 6 study. Two coats of matte PU, 24 hours between.",
    meta: "Finishing · Day 61",
    align: "left",
  },
  {
    src: "/images/svc-corporate.jpg",
    caption: "Boardroom joinery pre-built in the workshop, then assembled on site in 90 minutes. No on-site surprises.",
    meta: "Install · Day 74",
    align: "right",
  },
];

export default function WorkshopEssay() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[var(--bg-subtle)] overflow-hidden">
      <div className="container-x">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-5">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          Where it gets made
        </div>
        <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] max-w-3xl mb-16 md:mb-24">
          Two hundred feet of <span className="italic-serif text-[var(--oak-600)]">sawdust and deadlines.</span>
        </h2>

        <div className="space-y-24 md:space-y-32">
          {SHOTS.map((s, i) => {
            const isRight = s.align === "right";
            return (
              <motion.figure
                key={s.src}
                initial={{ opacity: 0, y: 40, clipPath: isRight ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
                whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className={`grid md:grid-cols-12 gap-6 items-center ${isRight ? "md:flex-row-reverse" : ""}`}
              >
                <div className={`md:col-span-8 ${isRight ? "md:col-start-5" : ""}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--graphite-200)]">
                    <motion.div
                      style={{ y }}
                      className="absolute inset-0 scale-110 bg-cover bg-center"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${s.src})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </motion.div>
                    <div className="absolute top-4 left-4 text-white/90 font-mono text-xs tracking-widest uppercase">
                      {s.meta}
                    </div>
                  </div>
                </div>
                <figcaption className={`md:col-span-3 ${isRight ? "md:col-start-1 md:row-start-1" : "md:col-start-10"}`}>
                  <div className="font-mono text-xs text-[var(--oak-500)] tracking-widest mb-3">
                    Frame {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="font-display text-lg leading-snug text-[var(--fg)]">{s.caption}</p>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
