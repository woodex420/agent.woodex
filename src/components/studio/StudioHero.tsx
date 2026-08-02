"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";

export default function StudioHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const divider = useTransform(scrollYProgress, [0, 1], ["15%", "90%"]);
  const beforeClip = useTransform(divider, (v) => `inset(0 ${100 - parseFloat(v)}% 0 0)`);
  const afterScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative min-h-[150vh] bg-[var(--graphite-950)] text-white">
      <div className="h-screen sticky top-0 overflow-hidden">
        {/* After: photoreal render */}
        <motion.div
          style={{ scale: afterScale }}
          className="absolute inset-0 bg-cover bg-center"
        >
          <div className="absolute inset-0"
               style={{ background: "linear-gradient(135deg,rgba(15,15,15,0.55),rgba(65,45,25,0.45)),url(/images/svc-residential.jpg) center/cover" }} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

        {/* Before: wireframe SVG */}
        <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: beforeClip }}>
          <div className="absolute inset-0 bg-[var(--graphite-950)]" />
          <svg className="absolute inset-0 w-full h-full opacity-70" aria-hidden preserveAspectRatio="xMidYMid slice" viewBox="0 0 1000 600">
            <defs>
              <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--oak-400)" strokeWidth="0.5"/>
              </pattern>
              <pattern id="gm" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M200 0 L0 0 0 200" fill="none" stroke="var(--oak-400)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g)"/>
            <rect width="100%" height="100%" fill="url(#gm)"/>
            <g stroke="var(--oak-300)" strokeWidth="1.2" fill="none">
              <rect x="100" y="100" width="800" height="400" />
              <rect x="100" y="100" width="300" height="400" />
              <line x1="100" y1="340" x2="400" y2="340"/>
              <line x1="400" y1="340" x2="900" y2="340"/>
              <rect x="140" y="140" width="220" height="160"/>
              <rect x="440" y="140" width="180" height="160"/>
              <rect x="660" y="140" width="200" height="160"/>
              <circle cx="760" cy="420" r="40" />
              <rect x="440" y="390" width="420" height="100" opacity="0.7"/>
            </g>
          </svg>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)" }}/>
        </motion.div>

        {/* Divider + handle */}
        <motion.div
          style={{ left: divider }}
          className="absolute top-0 bottom-0 w-px bg-[var(--oak-400)] z-10"
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[var(--oak-500)] text-[var(--graphite-900)] flex items-center justify-center shadow-xl">
            <span className="flex gap-0.5 text-lg font-bold"><span>‹</span><span>›</span></span>
          </div>
          <div className="absolute top-10 left-2 text-[10px] font-mono tracking-widest text-[var(--oak-300)] whitespace-nowrap">
            WIRE · Day 4
          </div>
        </motion.div>

        {/* Content */}
        <div className="absolute inset-0 container-x flex flex-col justify-end pb-20">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--oak-300)] mb-6">
            <span className="w-10 h-px bg-[var(--oak-400)]" />
            Woodex 3D Studio
          </div>
          <h1 className="font-display text-[var(--fs-display)] leading-[0.96] max-w-5xl mb-6">
            Renders so precise<br />
            <span className="italic-serif text-[var(--oak-200)]">we guarantee them.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed font-light mb-10">
            An in-house team of 3D artists who sit two desks from our build team. What you approve on screen
            is what you walk into on handover day — or we rebuild it at our cost.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Button variant="dark" size="lg" magnetic href="#pricing">
              See published pricing →
            </Button>
            <a href="/consultation" className="inline-flex items-center gap-3 text-white/80 hover:text-white transition">
              <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-sm">🎬</span>
              <span className="text-sm uppercase tracking-widest">Watch a walkthrough</span>
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 right-[var(--gutter)] text-xs uppercase tracking-widest text-white/50">
          Scroll to render
        </div>
      </div>
    </section>
  );
}
