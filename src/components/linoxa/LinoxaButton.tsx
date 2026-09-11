"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "dark" | "cream" | "outline";
type Size = "sm" | "md" | "lg";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  magnetic?: boolean;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

/**
 * LinoxaButton — exact Linoxa pill: tall navy (or cream) capsule with
 * circular arrow icon at the trailing end (up-right diagonal arrow).
 */
const LinoxaButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(function LinoxaButton(
  { variant = "dark", size = "md", href, magnetic, children, className, target, rel, ...rest },
  ref
) {
  const sizeCls =
    size === "sm" ? "btn-sm" :
    size === "lg" ? "btn-lg" : "";

  const classes = cn("btn", `btn-${variant}`, sizeCls, className);

  const arrow = (
    <span className="linoxa-circle" aria-hidden>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 13L13 3M13 3H5M13 3v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  if (href) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes}
         data-magnetic={magnetic ? "" : undefined} target={target} rel={rel}>
        <span>{children}</span>{arrow}
      </a>
    );
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} className={classes}
            data-magnetic={magnetic ? "" : undefined} {...rest}>
      <span>{children}</span>{arrow}
    </button>
  );
});

export default LinoxaButton;
