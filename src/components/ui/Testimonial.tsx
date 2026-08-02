"use client";

import { cn } from "@/lib/utils";

type TestimonialProps = {
  quote: string;
  name: string;
  role: string;
  project?: string;
  className?: string;
  /** Inverted colour for dark sections */
  invert?: boolean;
};

/**
 * Reusable testimonial card — used on ProofStack and service/location pages.
 */
export default function Testimonial({ quote, name, role, project, className, invert }: TestimonialProps) {
  return (
    <figure
      className={cn(
        "relative rounded-sm p-7 md:p-9",
        invert
          ? "border border-white/10 bg-white/[0.02] text-white"
          : "border border-[var(--border)] bg-[var(--surface-1)] text-[var(--fg)] shadow-[var(--shadow-sm)]",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute -top-4 left-6 font-display text-7xl leading-none",
          invert ? "text-[var(--oak-400)]" : "text-[var(--oak-400)]"
        )}
      >
        &ldquo;
      </span>
      <blockquote className={cn("font-display text-xl md:text-2xl leading-snug mb-6", invert ? "text-white/95" : "text-[var(--fg)]")}>
        {quote}
      </blockquote>
      <figcaption className={cn("flex items-end justify-between gap-4 flex-wrap pt-4 border-t", invert ? "border-white/10" : "border-[var(--border)]")}>
        <div>
          <div className="font-medium">{name}</div>
          <div className={cn("text-sm", invert ? "text-white/60" : "text-[var(--fg-muted)]")}>{role}</div>
        </div>
        {project && (
          <div className={cn("text-xs uppercase tracking-widest", invert ? "text-[var(--oak-300)]" : "text-[var(--oak-600)]")}>
            {project}
          </div>
        )}
      </figcaption>
    </figure>
  );
}
