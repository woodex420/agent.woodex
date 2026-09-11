"use client";
import { useEffect } from "react";

/**
 * ScrollReveal — implements the DESIGN.md `[data-anim]` hook contract:
 *   data-anim="fade" | "up" | "left" | "right" | "scale" | "clip"
 * Adds `.in` class when element enters viewport (uses IntersectionObserver).
 * Use CSS transitions defined in globals.css.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-anim]"));
    if (reduced) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const delay = (e.target as HTMLElement).getAttribute("data-delay");
            if (delay) {
              setTimeout(() => e.target.classList.add("in"), parseInt(delay, 10));
            } else {
              e.target.classList.add("in");
            }
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
