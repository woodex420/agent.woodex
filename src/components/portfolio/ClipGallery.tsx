"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Immersive gallery with clip-path wipe transitions (PRD §8 project-detail signature motion).
 * Supports click, keyboard, and swipe.
 */
export default function ClipGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);

  function go(i: number) { setActive(((i % images.length) + images.length) % images.length); }
  function onTouchStart(e: React.TouchEvent) { touchStart.current = e.touches[0].clientX; }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
    touchStart.current = null;
  }

  return (
    <div
      className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-sm group touch-none select-none"
      data-lenis-prevent
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="absolute inset-0 bg-cover bg-center"
          style={{ background: images[active] }}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 0 100%)" }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Prev/next — visible on mobile always, hover on desktop */}
      <button
        aria-label="Previous image"
        onClick={() => go(active - 1)}
        className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/40 md:bg-black/30 backdrop-blur text-white flex items-center justify-center hover:bg-[var(--oak-500)] transition-colors md:opacity-0 md:group-hover:opacity-100 md:duration-300 opacity-100 touch-manipulation"
      >‹</button>
      <button
        aria-label="Next image"
        onClick={() => go(active + 1)}
        className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/40 md:bg-black/30 backdrop-blur text-white flex items-center justify-center hover:bg-[var(--oak-500)] transition-colors md:opacity-0 md:group-hover:opacity-100 md:duration-300 opacity-100 touch-manipulation"
      >›</button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 touch-manipulation ${i === active ? "w-8 bg-white" : "w-3 bg-white/40"}`}
          />
        ))}
      </div>

      <div className="absolute top-4 md:top-5 left-4 md:left-5 right-4 md:right-5 flex justify-between text-[10px] md:text-xs uppercase tracking-widest text-white/70">
        <span className="truncate mr-3">{title}</span>
        <span className="flex-shrink-0 tabular-nums">{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
