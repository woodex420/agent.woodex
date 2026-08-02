"use client";

import { MotionConfig as FMotionConfig } from "framer-motion";
import { useReducedMotion } from "@/hooks/useIsTouch";
import { ReactNode } from "react";

/**
 * Applies reducedMotion to every Framer Motion element on the tree,
 * without having to thread the hook into every component.
 */
export default function AppMotionConfig({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <FMotionConfig transition={reduced ? { duration: 0 } : undefined}>
      {children}
    </FMotionConfig>
  );
}
