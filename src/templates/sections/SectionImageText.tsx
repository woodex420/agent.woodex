"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

/** SectionImageText — block of text with optional number/label (no side image) */
export default function SectionImageText({
  kicker, heading, children, dark = false, eyebrow,
}: { kicker?: string; heading?: ReactNode; children?: ReactNode; dark?: boolean; eyebrow?: string }) {
  return (
    <section className={`section-pad ${dark ? "bg-[var(--navy)] text-[var(--cream)]" : "bg-[var(--bg)]"}`}>
      <div className="container-x grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          {eyebrow && <div className="font-mono text-xs text-[var(--wood)] tracking-widest mb-4">{eyebrow}</div>}
          {kicker && <span className="kicker mb-6 inline-flex" data-kicker-invert={dark||undefined}>{kicker}</span>}
        </div>
        <div className="lg:col-span-8 max-w-3xl">
          {heading && <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-8">{heading}</h2>}
          <div className={`text-lg leading-[1.7] space-y-5 ${dark ? "text-white/80" : "text-[var(--muted)]"}`}>{children}</div>
        </div>
      </div>
    </section>
  );
}
