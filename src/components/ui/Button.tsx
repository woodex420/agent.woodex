"use client";

import Link from "next/link";
import { forwardRef, ButtonHTMLAttributes, ReactNode, useState, AnchorHTMLAttributes, useEffect } from "react";
import { cn } from "@/lib/utils";

type Variant = "liquid" | "ghost" | "outline" | "dark" | "glass" | "inline";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  magnetic?: boolean;
  children: ReactNode;
  href?: string;
  target?: string;
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };
type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href"> & {
    href: string;
  };

type Props = ButtonProps | AnchorProps;

/**
 * Button System v2 — Woodex Interior
 * Renders <button> or Next <Link> depending on href.
 */
const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  (props, ref) => {
    const {
      variant = "liquid",
      size = "md",
      loading = false,
      icon,
      iconRight,
      magnetic = false,
      className,
      children,
    } = props as CommonProps & { className?: string };

    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isTouch, setIsTouch] = useState(false);
    useEffect(() => {
      const mq = window.matchMedia("(pointer: coarse)");
      const update = () => setIsTouch(mq.matches);
      update();
      mq.addEventListener?.("change", update);
      return () => mq.removeEventListener?.("change", update);
    }, []);
    const enableMagnetic = magnetic && !isTouch;

    const sizeClasses = {
      sm: "px-4 py-2 text-[0.8125rem] gap-2",
      md: "px-6 py-3 text-sm gap-2.5",
      lg: "px-8 py-4 text-[0.95rem] gap-3",
    }[size];

    const base =
      "relative inline-flex items-center justify-center font-medium tracking-wide uppercase " +
      "rounded-full overflow-hidden select-none transition-[transform,color] duration-300 ease-[var(--ease-out-quart)] " +
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] " +
      "disabled:opacity-50 disabled:cursor-not-allowed will-change-transform";

    function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
      if (!enableMagnetic) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setOffset({ x: x * 0.25, y: y * 0.35 });
    }
    function handleMouseLeave() {
      setOffset({ x: 0, y: 0 });
    }

    const style = enableMagnetic
      ? { transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }
      : undefined;

    // Default arrow drift — if children ends in → and no iconRight provided, drift the trailing arrow
    const childText = typeof children === "string" ? children : "";
    const trailingArrow = !iconRight && childText.trim().endsWith("→");
    const content = trailingArrow ? childText.trim().slice(0, -1).trim() : children;

    const innerContent = (state: "liquid" | "outline" | "ghost" | "dark" | "glass" | "inline") => {
      const arrowEl = (
        <span className="arrow" aria-hidden>
          {iconRight ? iconRight : "→"}
        </span>
      );

      if (state === "liquid") {
        return (
          <>
            <span
              aria-hidden
              className="absolute inset-0 -z-10 bg-[var(--oak-500)] dark:bg-[var(--oak-400)] translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0"
            />
            <span className="relative z-10 flex items-center gap-inherit group-hover:text-white transition-colors duration-500">
              {loading ? <Spinner /> : icon}
              <span>{content}</span>
              {(iconRight || trailingArrow) && arrowEl}
            </span>
          </>
        );
      }
      if (state === "outline" || state === "ghost") {
        return (
          <span className="relative flex items-center gap-inherit">
            {loading ? <Spinner /> : icon}
            <span>{content}</span>
            {(iconRight || trailingArrow) && arrowEl}
          </span>
        );
      }
      if (state === "dark") {
        return (
          <>
            <span
              aria-hidden
              className="absolute inset-0 -z-10 bg-white translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0"
            />
            <span className="relative z-10 flex items-center gap-inherit group-hover:text-[var(--graphite-900)] transition-colors duration-500">
              {loading ? <Spinner /> : icon}
              <span>{content}</span>
              {(iconRight || trailingArrow) && arrowEl}
            </span>
          </>
        );
      }
      if (state === "glass") {
        return (
          <>
            <span
              aria-hidden
              className="absolute inset-0 -z-10 bg-white/12 backdrop-blur-md border border-white/30 group-hover:bg-white/25 group-hover:border-white/60 transition-all duration-500"
            />
            <span className="relative z-10 flex items-center gap-inherit text-white">
              {loading ? <Spinner /> : icon}
              <span>{content}</span>
              {(iconRight || trailingArrow) && arrowEl}
            </span>
          </>
        );
      }
      return (
        <span className="relative flex items-center gap-inherit">
          {loading ? <Spinner /> : icon}
          <span>{content}</span>
          {(iconRight || trailingArrow) && arrowEl}
        </span>
      );
    };

    if ("href" in props && props.href) {
      const { href, target, variant: _v, size: _s, loading: _l, icon: _i, iconRight: _ir, magnetic: _m, className: _c, children: _ch, ...rest } = props as AnchorProps;
      const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
      const classes = cn(
        base,
        sizeClasses,
        "group",
        variant === "liquid" && "border border-[var(--border-strong)] text-[var(--fg)] bg-transparent isolation-auto hover:border-[var(--oak-500)]",
        variant === "outline" && "border border-[var(--border-strong)] text-[var(--fg)] hover:border-[var(--oak-500)] hover:text-[var(--oak-600)]",
        variant === "ghost" && "text-[var(--fg)] hover:text-[var(--oak-600)] px-2 after:absolute after:left-2 after:right-2 after:bottom-2 after:h-px after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100",
        variant === "dark" && "border border-white/30 text-white hover:border-white",
        variant === "glass" && "text-white border-0 p-0",
        variant === "inline" && "inline-flex items-center gap-1.5 text-[var(--fg)] underline-offset-4 hover:underline decoration-[var(--oak-500)]",
        className
      );
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={style}
            className={classes}
            {...rest}
          >
            {innerContent(variant)}
          </a>
        );
      }
      return (
        <Link
          ref={ref as any}
          href={href}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={undefined}
          style={style}
          className={classes}
          data-magnetic={magnetic || undefined}
          {...rest}
        >
          {innerContent(variant)}
        </Link>
      );
    }

    const { variant: _v, size: _s, loading: _l, icon: _i, iconRight: _ir, magnetic: _m, className: _c, children: _ch, href: _h, ...rest } = props as ButtonProps;

    const classes = cn(
      base,
      sizeClasses,
      "group",
      variant === "liquid" && "border border-[var(--border-strong)] text-[var(--fg)] bg-transparent isolation-auto hover:border-[var(--oak-500)]",
      variant === "outline" && "border border-[var(--border-strong)] text-[var(--fg)] hover:border-[var(--oak-500)] hover:text-[var(--oak-600)]",
      variant === "ghost" && "text-[var(--fg)] hover:text-[var(--oak-600)] px-2 after:absolute after:left-2 after:right-2 after:bottom-2 after:h-px after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100",
      variant === "dark" && "border border-white/30 text-white hover:border-white",
      variant === "glass" && "text-white border-0 p-0",
      variant === "inline" && "inline-flex items-center gap-1.5 text-[var(--fg)] underline-offset-4 hover:underline decoration-[var(--oak-500)]",
      className
    );

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className={classes}
        data-magnetic={magnetic || undefined}
        {...rest}
      >
        {innerContent(variant)}
      </button>
    );
  }
) as React.ForwardRefExoticComponent<(ButtonProps | AnchorProps) & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;

Button.displayName = "Button";

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default Button;
