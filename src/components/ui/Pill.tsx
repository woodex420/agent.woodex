"use client";

import { cn } from "@/lib/utils";

type PillProps = {
  children: React.ReactNode;
  tone?: "default" | "oak" | "outline" | "dark";
  size?: "sm" | "md";
  className?: string;
};

/**
 * Pill / tag component for service tags, project categories, labels.
 */
export default function Pill({ children, tone = "default", size = "sm", className }: PillProps) {
  const base = "inline-flex items-center gap-1.5 uppercase tracking-widest font-medium rounded-full whitespace-nowrap";
  const sizes = size === "sm" ? "text-[10px] px-2.5 py-1" : "text-xs px-3.5 py-1.5";
  const tones = {
    default: "bg-[var(--bg-subtle)] text-[var(--fg-muted)] border border-[var(--border)]",
    oak: "bg-[var(--oak-500)]/10 text-[var(--oak-700)] border border-[var(--oak-500)]/30",
    outline: "bg-transparent text-[var(--fg-muted)] border border-[var(--border-strong)]",
    dark: "bg-[var(--graphite-900)] text-white border border-transparent",
  };
  return <span className={cn(base, sizes, tones[tone], className)}>{children}</span>;
}
