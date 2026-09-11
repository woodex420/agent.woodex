"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "dark" | "light" | "cream" | "outline-cream" | "outline-navy" | "wood";
type Size = "sm" | "md" | "lg";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  magnetic?: boolean;
  children: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

/**
 * LinoxaButton — Linoxa pill with circular-arrow hover (DESIGN.md).
 * Dual-label hover: label slides, arrow rotates -45deg.
 */
const LinoxaButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(function LinoxaButton(
  { variant = "dark", size = "md", href, magnetic, children, iconRight, className, target, rel, ...rest },
  ref
) {
  const sizeCls =
    size === "sm" ? "text-[0.7rem] px-4 py-2 gap-2" :
    size === "lg" ? "text-[0.82rem] px-6 py-4 gap-3.5" :
                   "text-[0.76rem] px-5 py-3 gap-3";

  const arrowSize =
    size === "sm" ? "w-9 h-9" :
    size === "lg" ? "w-[3rem] h-[3rem]" :
                   "w-11 h-11";

  const classes = cn(
    "btn group relative overflow-hidden",
    `btn-${variant}`,
    sizeCls,
    "data-[magnetic=true]:transition-transform duration-300",
    className
  );

  const arrow = iconRight ?? (
    <span className={cn("linoxa-arrow", arrowSize)} aria-hidden>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-[-45deg]">
        <path d="M2 12L12 2M12 2H4M12 2v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        data-magnetic={magnetic ? "" : undefined}
        target={target}
        rel={rel}
      >
        <span className="relative z-10 transition-transform duration-500 group-hover:-translate-x-1">{children}</span>
        {arrow}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      data-magnetic={magnetic ? "" : undefined}
      {...rest}
    >
      <span className="relative z-10 transition-transform duration-500 group-hover:-translate-x-1">{children}</span>
      {arrow}
    </button>
  );
});

export default LinoxaButton;
