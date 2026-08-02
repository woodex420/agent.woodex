"use client";

/**
 * Sprint E5 — tiny entry shell that lazy-loads the full Studio (and its
 * password gate) so the Sanity bundle is NOT pulled into the main client chunk.
 */
import { useState } from "react";
import dynamic from "next/dynamic";

const StudioClient = dynamic(() => import("./StudioClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-[var(--graphite-900)] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-[var(--oak-400)] animate-spin" aria-hidden />
        <p className="text-sm text-white/60">Loading Woodex Studio…</p>
      </div>
    </div>
  ),
});

export default function StudioEntry() {
  const [mount, setMount] = useState(false);
  // Wait one tick so the shell paints before pulling the chunk (reduces TTI hit).
  if (typeof window !== "undefined" && !mount) {
    // Defer to after paint
    requestAnimationFrame(() => setMount(true));
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--graphite-900)] text-white">
        <p className="text-sm text-white/60">Loading Woodex Studio…</p>
      </div>
    );
  }
  return mount ? <StudioClient /> : null;
}
