"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky section-dots navigation (PRD §8 signature motion for service pages).
 * Shows on right side on desktop, tracks active section as user scrolls.
 */
const SECTIONS = [
  { id: "situation", label: "Situation" },
  { id: "answer", label: "Quick answer" },
  { id: "scope", label: "Scope" },
  { id: "timeline", label: "Timeline" },
  { id: "cost", label: "Cost" },
  { id: "proof", label: "Proof" },
  { id: "faqs", label: "FAQs" },
  { id: "team", label: "Team" },
];

export default function SectionDots() {
  const [active, setActive] = useState("situation");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  function go(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      aria-label="Page sections"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            className="group flex items-center gap-3"
            aria-label={`Jump to ${s.label}`}
          >
            <span
              className={cn(
                "text-[10px] uppercase tracking-[0.2em] font-mono transition-all duration-300 whitespace-nowrap",
                isActive ? "opacity-100 text-[var(--oak-600)] translate-x-0" : "opacity-0 translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
              )}
            >
              {s.label}
            </span>
            <span
              className={cn(
                "block rounded-full transition-all duration-400",
                isActive ? "w-2.5 h-2.5 bg-[var(--oak-500)]" : "w-1.5 h-1.5 bg-[var(--fg-subtle)] group-hover:bg-[var(--fg-muted)]"
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}
