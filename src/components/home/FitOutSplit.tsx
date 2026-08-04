"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const PANELS = [
  {
    label: "Fit-Out",
    title: "The work happens while business keeps running.",
    body: "70% of our commercial projects are delivered in occupied spaces. Phased shifts, dust containment, and after-hours crews — your team keeps working while ours builds the next wing.",
    bg: "linear-gradient(135deg,rgba(20,20,20,0.55),rgba(50,35,20,0.5)),url(/images/svc-commercial.jpg)",
  },
  {
    label: "Week 2",
    title: "The Friday Report. Every Friday. At 4pm.",
    body: "One page. What shipped this week. What ships next. Photos. Budget spent. Risks flagged. No silence, no surprises — even when the news is awkward.",
    bg: "linear-gradient(135deg,rgba(15,15,15,0.6),rgba(60,42,26,0.4)),url(/images/about-craft.jpg)",
  },
  {
    label: "Week 6",
    title: "The 3D-to-build match is contractual.",
    body: "If the finished build doesn't match the approved render, we redo it at our cost. That clause has been invoked twice in 12 years. We've gotten sharper every time.",
    bg: "linear-gradient(160deg,rgba(5,5,5,0.7),rgba(60,45,30,0.4)),url(/images/hero-3d.jpg)",
  },
  {
    label: "Handover",
    title: "On the date. To the rupee. As drawn.",
    body: "98% of our projects hand over on the date in the contract. The remaining 2% moved because the client asked us to. Zero scope-creep disputes in 24 months.",
    bg: "linear-gradient(110deg,rgba(20,20,20,0.6),rgba(80,60,35,0.4)),url(/images/hero-turnkey.jpg)",
  },
];

export default function FitOutSplit() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // One MotionValue for which panel is active.
  const activeIndex = useTransform(scrollYProgress, (v) =>
    Math.min(PANELS.length - 1, Math.floor(v * PANELS.length + 0.001))
  );

  // Call each hook unconditionally at the top level, one per panel.
  // (Panel count is constant = 4, so this is rules-of-hooks safe.)
  const p0 = usePanelTransforms(scrollYProgress, activeIndex, 0, PANELS.length);
  const p1 = usePanelTransforms(scrollYProgress, activeIndex, 1, PANELS.length);
  const p2 = usePanelTransforms(scrollYProgress, activeIndex, 2, PANELS.length);
  const p3 = usePanelTransforms(scrollYProgress, activeIndex, 3, PANELS.length);
  const transforms = [p0, p1, p2, p3];

  return (
    <section ref={container} className="relative bg-[var(--graphite-900)] text-white">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-0 lg:min-h-[300vh]">
          <div className="py-24 lg:py-32 lg:pr-16 space-y-[60vh]">
            <div className="lg:sticky lg:top-1/2 lg:-translate-y-1/2 mb-12">
              <div className="kicker text-[var(--oak-300)] mb-5">
                The Fit-Out Method
              </div>
              <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">
                How we build without<br />
                <span className="italic-serif text-[var(--oak-300)]">breaking your business.</span>
              </h2>
            </div>

            {PANELS.map((p, i) => (
              <CopyPanel key={i} panel={p} t={transforms[i]} />
            ))}
          </div>

          <div className="lg:sticky lg:top-0 lg:h-screen flex items-center py-12 lg:py-0">
            <div className="relative w-full aspect-[4/5] max-h-[85vh] overflow-hidden rounded-sm noise">
              {PANELS.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    background: p.bg,
                    opacity: transforms[i].imgOpac,
                    scale: transforms[i].scale,
                  }}
                >
                  <div className="absolute inset-0 mix-blend-overlay opacity-20"
                       style={{ backgroundImage: "radial-gradient(circle at 40% 30%, rgba(210,187,142,0.4), transparent 60%)" }} />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="text-xs uppercase tracking-[0.3em] text-white/70 mb-2">{p.label}</div>
                    <div className="font-display text-2xl md:text-3xl italic-serif max-w-md">{p.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Hook that returns MotionValues for a panel's opacity, y, scale, and image-opacity.
 * Called at top level — one per fixed panel index.
 */
function usePanelTransforms(
  progress: MotionValue<number>,
  activeIndex: MotionValue<number>,
  i: number,
  total: number
) {
  const start = i / total;
  const end = (i + 1) / total;
  const local = useTransform(progress, (v) => Math.max(0, Math.min(1, (v - start) / (end - start))));
  const opac = useTransform(local, [0, 0.2, 0.8, 1], [0.25, 1, 1, 0.25]);
  const yy = useTransform(local, [0, 0.2, 0.8, 1], [30, 0, 0, -15]);
  const scale = useTransform(local, [0, 1], [1.08, 1.0]);
  const imgOpac = useTransform(activeIndex, (v) => (v === i ? 1 : 0));
  return { opac, yy, scale, imgOpac };
}

function CopyPanel({
  panel,
  t,
}: {
  panel: (typeof PANELS)[number];
  t: { opac: MotionValue<number>; yy: MotionValue<number> };
}) {
  return (
    <motion.div style={{ opacity: t.opac, y: t.yy }} className="max-w-lg">
      <div className="text-xs uppercase tracking-[0.3em] text-[var(--oak-300)] mb-4 flex items-center gap-3">
        <span className="w-6 h-px bg-[var(--oak-400)]" />
        {panel.label}
      </div>
      <h3 className="font-display text-2xl md:text-3xl leading-tight mb-4">{panel.title}</h3>
      <p className="text-white/70 text-lg leading-relaxed">{panel.body}</p>
    </motion.div>
  );
}
