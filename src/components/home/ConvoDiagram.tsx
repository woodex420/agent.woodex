"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Coordinated-Conversation Diagram
 * Explains the Friday Report cadence — who talks to whom, on what day.
 * Scroll-drawn connecting lines.
 */
const NODES = [
  { label: "You (client)", side: "left", day: "Anytime", color: "var(--oak-300)" },
  { label: "Project Lead", side: "right", day: "Daily", color: "var(--oak-400)" },
  { label: "Site Supervisor", side: "left", day: "Daily", color: "var(--oak-500)" },
  { label: "3D Studio", side: "right", day: "Pre-build", color: "var(--oak-600)" },
  { label: "The Friday Report", side: "left", day: "Friday · 4pm", color: "var(--accent)" },
];

export default function ConvoDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 40%"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="section-pad bg-[var(--bg-elevated)] border-y border-[var(--border)] relative">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            How communication works
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
            One point of contact.<br />
            <span className="italic-serif text-[var(--oak-600)]">One report. Every Friday.</span>
          </h2>
          <p className="text-[var(--fg-muted)] text-lg leading-relaxed mb-6 max-w-md">
            You don't have to chase three WhatsApp groups, the contractor, the carpenter, and the electrician.
            You get a project lead and a one-page report at 4pm every Friday until handover.
          </p>
          <ul className="space-y-3 text-[var(--fg)]">
            {[
              "Direct phone/WhatsApp to your project lead — not a call center.",
              "Named site supervisor you meet on day one.",
              "Friday report: shipped · shipping · budget · risks · photos.",
              "Zero 'I'll get back to you' loops over 48 hours.",
            ].map((b) => (
              <li key={b} className="flex gap-3 text-base">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--oak-500)] flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7 relative min-h-[520px]">
          {/* SVG connecting lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden>
            <motion.path
              d="M100 60 C 220 60, 300 140, 300 140 M300 140 C 220 140, 100 220, 100 220 M100 220 C 220 220, 300 300, 300 300 M300 300 C 220 300, 100 380, 100 380"
              stroke="var(--oak-400)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 4"
              pathLength={1}
              style={{ pathLength: draw, opacity: 0.6 }}
              strokeLinecap="round"
            />
          </svg>

          <div className="relative h-full flex flex-col justify-between py-4">
            {NODES.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, x: n.side === "left" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`flex ${n.side === "left" ? "justify-start" : "justify-end"}`}
              >
                <div className={`w-[78%] md:w-[68%] border border-[var(--border)] bg-[var(--surface-1)] rounded-sm p-5 shadow-[var(--shadow-sm)] relative`}>
                  <span
                    className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[var(--bg)] ${n.side === "left" ? "-right-1.5" : "-left-1.5"}`}
                    style={{ background: n.color }}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-display text-xl leading-tight">{n.label}</div>
                    <div className="text-xs uppercase tracking-widest text-[var(--fg-subtle)] whitespace-nowrap">{n.day}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
