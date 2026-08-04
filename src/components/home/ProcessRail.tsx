"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Process Rail (flagship)
 * Horizontal scroll rail that reveals the 6-step process as you scroll down.
 */
const STEPS = [
  {
    n: "01",
    label: "Brief & Site Visit",
    days: "Day 0-3",
    title: "We come to you.",
    body: "A 45-minute walkthrough of the space. We take measurements, photos, and listen. No pitch. No upsell. Just your problem.",
  },
  {
    n: "02",
    label: "Concept & 3D",
    days: "Day 4-14",
    title: "You approve a walkthrough.",
    body: "Mood boards, 2D layouts, and a photoreal 3D render you can walk through. We iterate until you say 'that's it.'",
  },
  {
    n: "03",
    label: "Scope & Price",
    days: "Day 15-18",
    title: "Fixed price. Fixed date.",
    body: "An itemised quote with materials, quantities, and a Gantt chart with the handover date in bold. No asterisks.",
  },
  {
    n: "04",
    label: "Build",
    days: "Week 3 — End",
    title: "The Friday Report, every Friday at 4pm.",
    body: "One-page progress report: shipped this week, shipping next, photos, budget spent, risks. You always know.",
  },
  {
    n: "05",
    label: "3D Walk-Through",
    days: "Pre-handover",
    title: "Does it match the render?",
    body: "We walk the finished space side-by-side with the approved 3D. If anything doesn't match, we fix it before you sign off.",
  },
  {
    n: "06",
    label: "Handover & Year 1",
    days: "Day of + 365",
    title: "Keys, manual, warranty.",
    body: "Snag list resolved in 14 days. 12-month warranty on every finish. A 30-day check-in call. We don't vanish.",
  },
];

export default function ProcessRail() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);
  const lineScaleX = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section ref={ref} className="relative bg-[var(--bg)] max-md:hidden" style={{ height: `${STEPS.length * 90}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col py-[var(--nav-h)]">
        {/* Heading */}
        <div className="container-x pt-10 pb-8">
          <div className="kicker text-[var(--fg-muted)] mb-4">
            The Process
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] max-w-2xl text-balance">
            From first call to handover —<br />
            <span className="italic-serif text-[var(--oak-600)]">six steps, one timeline.</span>
          </h2>
        </div>

        {/* Horizontal rail */}
        <div className="relative flex-1 flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 lg:gap-8 pl-[4vw] pr-[20vw] will-change-transform">
            {STEPS.map((step, i) => (
              <StepCard key={step.n} step={step} i={i} total={STEPS.length} progress={scrollYProgress} />
            ))}
          </motion.div>
        </div>

        {/* Bottom progress bar */}
        <div className="container-x pb-8">
          <div className="h-px bg-[var(--border)] relative">
            <motion.div
              style={{ scaleX: lineScaleX }}
              className="absolute top-0 left-0 origin-left h-px bg-[var(--oak-500)] w-full"
            />
          </div>
          <div className="flex justify-between mt-3 text-xs uppercase tracking-widest text-[var(--fg-subtle)] font-mono">
            <span>Brief</span>
            <span>Handover</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Vertical stacked variant for mobile (no pinned horizontal scroll) */
export function ProcessRailMobile() {
  return (
    <section className="md:hidden section-pad bg-[var(--bg)]">
      <div className="container-x">
        <div className="mb-10">
          <div className="kicker text-[var(--fg-muted)] mb-4">
            The Process
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] text-balance">
            From first call to handover —<br />
            <span className="italic-serif text-[var(--oak-600)]">six steps, one timeline.</span>
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-[22px] top-2 bottom-2 w-px bg-[var(--border)]" />
          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div key={step.n} className="relative pl-14">
                <div className="absolute left-0 top-6 w-11 h-11 rounded-full bg-[var(--surface-1)] border border-[var(--border)] flex items-center justify-center font-mono text-xs text-[var(--oak-600)]">
                  {step.n}
                </div>
                <div className="border border-[var(--border)] rounded-sm bg-[var(--surface-1)] p-6 shadow-[var(--shadow-sm)]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">{step.label}</div>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--fg-subtle)] border border-[var(--border)] px-2.5 py-1 rounded-full">
                      {step.days}
                    </span>
                  </div>
                  <h3 className="font-display text-xl leading-tight mb-3">{step.title}</h3>
                  <p className="text-[var(--fg-muted)] text-[15px] leading-relaxed m-0">{step.body}</p>
                  {i === STEPS.length - 1 && (
                    <div className="mt-5 pt-5 border-t border-[var(--border)]">
                      <a href="/consultation" className="text-[var(--oak-600)] text-xs uppercase tracking-widest font-medium">
                        Start with step one →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  i,
  total,
  progress,
}: {
  step: (typeof STEPS)[number];
  i: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = i / total;
  const end = (i + 1) / total;
  const local = useTransform(progress, (v) => Math.max(0, Math.min(1, (v - start) / (end - start))));
  const scale = useTransform(local, [0, 0.3, 1], [0.94, 1, 1]);
  const opacity = useTransform(local, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.6]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="w-[70vw] sm:w-[55vw] lg:w-[38vw] xl:w-[30vw] flex-shrink-0 bg-[var(--surface-1)] border border-[var(--border)] rounded-sm p-8 md:p-10 shadow-[var(--shadow-sm)]"
    >
      <div className="flex items-start justify-between mb-8">
        <span className="font-mono text-sm text-[var(--oak-600)] tracking-widest">{step.n}</span>
        <span className="text-xs uppercase tracking-widest text-[var(--fg-subtle)] border border-[var(--border)] px-3 py-1 rounded-full">
          {step.days}
        </span>
      </div>
      <div className="text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-3">{step.label}</div>
      <h3 className="font-display text-2xl md:text-3xl leading-tight mb-4">{step.title}</h3>
      <p className="text-[var(--fg-muted)] leading-relaxed">{step.body}</p>
      {i === total - 1 && (
        <div className="mt-6 pt-6 border-t border-[var(--border)]">
          <a
            href="/consultation"
            className="text-[var(--oak-600)] text-sm uppercase tracking-widest font-medium hover:underline"
          >
            Start with step one →
          </a>
        </div>
      )}
    </motion.div>
  );
}
