"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Process Rail (flagship)
 * Horizontal scroll rail that reveals the 6-step process as you scroll down.
 */
/** PRD §8.7: Understand → Plan → Design → Build → Deliver */
const STEPS = [
  {
    n: "01",
    label: "Understand",
    days: "Day 0–3",
    title: "Requirements, goals, users, site, budget.",
    body: "A 45-minute walkthrough. We take measurements, photos and listen — goals, team size, workflow, brand, constraints. No pitch. No upsell.",
  },
  {
    n: "02",
    label: "Plan",
    days: "Day 4–10",
    title: "Space planning, workplace strategy, project direction.",
    body: "Capacity modelling, circulation, adjacencies and a strategic brief. We confirm the right problem before any design work begins.",
  },
  {
    n: "03",
    label: "Design",
    days: "Week 2–4",
    title: "Concept, materials, 3D, technical development.",
    body: "Mood boards, 2D layouts and a photoreal 3D walkthrough you approve. Drawings, material schedules and BOQ follow for sign-off.",
  },
  {
    n: "04",
    label: "Build",
    days: "Week 5 →",
    title: "Fit-out, procurement, coordination, execution.",
    body: "Joinery built off-site in our workshop during civil works. Friday Report at 4pm every week: shipped this week, next, photos, risks.",
  },
  {
    n: "05",
    label: "Deliver",
    days: "Handover + Year 1",
    title: "Quality control, completion, handover.",
    body: "We walk the finished space against the approved 3D. Snags resolved in 14 days. 2-year joinery warranty. 30-day check-in call. We don't vanish.",
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
        <div className="container-x pt-10 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="kicker text-[var(--fg-muted)] mb-4">
              The Process
            </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] max-w-2xl text-balance">
              From first conversation
              <span className="block italic-serif text-[var(--oak-600)]">to final handover.</span>
            </h2>
          </div>
          <a href="/consultation" className="group inline-flex items-center gap-3 text-sm uppercase tracking-widest font-medium text-[var(--fg)] hover:text-[var(--oak-600)] transition-colors shrink-0 pb-2">
            How we work <span className="arrow">→</span>
          </a>
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
            From first conversation
            <span className="block italic-serif text-[var(--oak-600)]">to final handover.</span>
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
