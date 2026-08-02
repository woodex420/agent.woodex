"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Before/After slider with auto-demo (PRD requirement).
 * - Drag the handle to reveal
 * - Auto-plays a scrub when the component enters view (once)
 * - Keyboard/pointer accessible
 */
export default function BeforeAfter({
  before, after, caption,
}: { before: string; after: string; caption: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawPos = useMotionValue(0.5);
  const pos = useSpring(rawPos, { stiffness: 220, damping: 30 });

  // Pre-compute all MotionValues at top level (rules of hooks)
  const beforeClip = useTransform(pos, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`);
  const dividerLeft = useTransform(pos, (v) => `calc(${v * 100}% - 1px)`);
  // Handle is 48px on mobile (h-12), 48px base (w-12); translate by half-width
  const handleX = useTransform(pos, (v) => `calc(${v * 100}% - 24px)`);
  const edgeLeft = useTransform(pos, (v) => `${v * 100}%`);
  const beforeLabelOpacity = useTransform(pos, [0.05, 0.15, 0.45], [0, 1, 0]);
  const afterLabelOpacity = useTransform(pos, [0.55, 0.75, 0.95], [0, 1, 0]);
  const posAria = useTransform(pos, (v) => Math.round(v * 100));
  const [ariaValue, setAriaValue] = useState(50);

  const dragging = useRef(false);
  const played = useRef(false);

  useEffect(() => {
    const unsub = pos.on("change", (v) => setAriaValue(Math.round(v * 100)));
    return unsub;
  }, [pos]);

  // Auto-demo on view
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !played.current) {
            played.current = true;
            rawPos.set(0.05);
            setTimeout(() => rawPos.set(0.6), 500);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [rawPos]);

  function setFromClientX(clientX: number) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    rawPos.set(p);
  }

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  }
  function onPointerUp(e: React.PointerEvent) {
    dragging.current = false;
    try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  }

  function onKey(e: React.KeyboardEvent) {
    const v = rawPos.get();
    if (e.key === "ArrowLeft") rawPos.set(Math.max(0, v - 0.05));
    if (e.key === "ArrowRight") rawPos.set(Math.min(1, v + 0.05));
    if (e.key === "Home") rawPos.set(0);
    if (e.key === "End") rawPos.set(1);
  }

  return (
    <div className="relative w-full">
      <div
        ref={ref}
        className="relative w-full aspect-[16/9] overflow-hidden rounded-sm select-none touch-none bg-[var(--graphite-800)]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKey}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={ariaValue}
        aria-label="Before / After comparison slider. Use arrow keys to adjust."
        tabIndex={0}
        data-lenis-prevent
      >
        {/* After (full) */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ background: after }} />
        {/* Before (clipped) */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ background: before, clipPath: beforeClip }}
        />

        {/* Labels */}
        <motion.div
          style={{ opacity: beforeLabelOpacity }}
          className="absolute top-3 left-3 md:top-5 md:left-5 text-[10px] uppercase tracking-widest bg-black/60 text-white px-2.5 py-1 md:px-3 md:py-1.5 rounded-full pointer-events-none"
        >Before</motion.div>
        <motion.div
          style={{ opacity: afterLabelOpacity }}
          className="absolute top-3 right-3 md:top-5 md:right-5 text-[10px] uppercase tracking-widest bg-[var(--oak-500)] text-[var(--graphite-900)] px-2.5 py-1 md:px-3 md:py-1.5 rounded-full pointer-events-none"
        >After</motion.div>

        {/* Divider line */}
        <motion.div
          style={{ left: dividerLeft }}
          className="absolute top-0 bottom-0 w-0.5 bg-white/90 pointer-events-none"
        />
        {/* Handle — larger touch target on mobile */}
        <motion.div
          style={{ x: handleX }}
          className="absolute top-1/2 -translate-y-1/2 w-12 h-12 md:w-12 md:h-12 rounded-full bg-white text-[var(--graphite-900)] shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-none"
        >
          <span className="flex gap-0.5 text-sm font-bold">
            <span>‹</span><span>›</span>
          </span>
        </motion.div>
        {/* Expanded hit area for touch */}
        <motion.div
          style={{ left: edgeLeft }}
          className="absolute top-0 bottom-0 w-14 -translate-x-1/2 md:hidden"
          aria-hidden
        />
        {/* Edge glow */}
        <motion.div
          style={{ left: edgeLeft }}
          className="absolute top-0 bottom-0 w-8 pointer-events-none"
        >
          <div className="absolute inset-y-0 right-0 w-px bg-white/50 shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
        </motion.div>
      </div>

      {caption && (
        <div className="mt-4 text-sm text-[var(--fg-muted)] italic-serif text-center">{caption}</div>
      )}
    </div>
  );
}
