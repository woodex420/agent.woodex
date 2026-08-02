"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Week } from "@/lib/content/services";

export default function TimelineRail({ weeks }: { weeks: Week[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" ref={ref} className="section-pad bg-[var(--bg)]">
      <div className="container-x">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          The week-by-week
        </div>
        <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-16 max-w-3xl">
          Six phases.<br />
          <span className="italic-serif text-[var(--oak-600)]">One Gantt. One date in bold.</span>
        </h2>

        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border)]">
            <motion.div style={{ scaleY }} className="absolute top-0 left-0 w-full h-full bg-[var(--oak-500)] origin-top" />
          </div>

          <ol className="space-y-10 md:space-y-16">
            {weeks.map((w, i) => (
              <TimelineItem key={w.week} week={w} index={i} total={weeks.length} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ week, index, total }: { week: Week; index: number; total: number }) {
  const isLeft = index % 2 === 0;
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index / total) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid md:grid-cols-2 gap-4 md:gap-12"
    >
      {/* Dot */}
      <span className="absolute left-5 md:left-1/2 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--oak-500)] ring-4 ring-[var(--bg)] z-10" />

      {isLeft ? (
        <>
          <div className="pl-14 md:pl-0 md:pr-12 md:text-right">
            <TimelineCard week={week} align="right" />
          </div>
          <div className="hidden md:block" />
        </>
      ) : (
        <>
          <div className="hidden md:block" />
          <div className="pl-14 md:pl-12">
            <TimelineCard week={week} align="left" />
          </div>
        </>
      )}
    </motion.li>
  );
}

function TimelineCard({ week, align }: { week: Week; align: "left" | "right" }) {
  return (
    <div>
      <div className={`font-mono text-xs tracking-[0.25em] text-[var(--oak-600)] mb-2 ${align === "right" ? "md:text-right" : ""}`}>
        {week.week}
      </div>
      <h3 className="font-display text-2xl md:text-3xl leading-tight mb-2">{week.label}</h3>
      <p className="text-[var(--fg-muted)] leading-relaxed max-w-md md:ml-auto">{week.desc}</p>
    </div>
  );
}
