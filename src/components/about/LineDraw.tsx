"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Button from "@/components/ui/Button";

/**
 * LineDraw — closing signature block with a scroll-drawn SVG line
 * (Woodex mark) and a CTA pointing to consultation.
 * Signature motion: SVG path "draws" as the user scrolls the section into view.
 */
export default function LineDraw() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.3"] });
  const pathLen = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[var(--graphite-900)] text-white relative overflow-hidden noise">
      <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--oak-300)] mb-6">
            <span className="w-8 h-px bg-[var(--oak-400)]" />
            Ready when you are
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-8 text-white">
            Have a space in mind?<br />
            <span className="italic-serif text-[var(--oak-300)]">Let's draw it first.</span>
          </h2>
          <p className="text-white/75 text-lg leading-relaxed max-w-xl mb-10">
            Start with a 45-minute walkthrough — on site or on a video call. We'll take
            measurements, listen to what you actually need, and send you an itemised
            budget range in 48 hours. No pitch deck. No cold calls after.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/consultation" variant="dark" size="lg" magnetic>
              Book a walkthrough →
            </Button>
            <Button href="/services" variant="ghost" size="lg" className="text-white hover:text-[var(--oak-300)]">
              See what we build
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md text-sm">
            <div>
              <div className="font-display text-3xl text-[var(--oak-300)]">240+</div>
              <div className="text-white/60 text-xs uppercase tracking-widest mt-1">Projects</div>
            </div>
            <div>
              <div className="font-display text-3xl text-[var(--oak-300)]">98%</div>
              <div className="text-white/60 text-xs uppercase tracking-widest mt-1">On time</div>
            </div>
            <div>
              <div className="font-display text-3xl text-[var(--oak-300)]">11yr</div>
              <div className="text-white/60 text-xs uppercase tracking-widest mt-1">In Lahore</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-center items-center min-h-[480px]">
          {/* SVG line-draw mark — "W" monogram drawn on scroll */}
          <svg viewBox="0 0 400 400" className="w-full max-w-md text-[var(--oak-400)]" aria-hidden>
            {/* Outer frame */}
            <motion.rect
              x="20" y="20" width="360" height="360"
              fill="none" stroke="currentColor" strokeWidth="1"
              strokeDasharray="1 1"
              style={{ pathLength: pathLen }}
            />
            {/* W mark */}
            <motion.path
              d="M 80 140 L 140 270 L 200 180 L 260 270 L 320 140"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ pathLength: pathLen }}
            />
            {/* underline */}
            <motion.line
              x1="80" y1="310" x2="320" y2="310"
              stroke="currentColor" strokeWidth="1.5"
              style={{ pathLength: pathLen }}
            />
            {/* text */}
            <motion.text
              x="200" y="360" textAnchor="middle"
              fontFamily="Fraunces, serif" fontSize="18" fill="currentColor"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              WOODEX · EST. 2014 · LAHORE
            </motion.text>
          </svg>
        </div>
      </div>
    </section>
  );
}
