"use client";

/**
 * Phase 6 — Collaboration soft-lock ribbon.
 *
 * Mounted in the root layout (only when draftMode is enabled). Polls
 * `/api/revalidate/state?tag=*` every 8s. If the revision bumps while this tab
 * is open, shows a fixed bottom ribbon inviting the editor to reload — because
 * another editor just published changes that may affect the page under preview.
 *
 * Uses the existing Toast system for the initial nudge plus a dismissible
 * persistent banner with a "Reload preview" button. Zero bytes in production
 * because the server wrapper returns null when draftMode is off.
 */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const POLL_MS = 8000;

export default function DraftActivityBar() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [dismissedRev, setDismissedRev] = useState(0);
  const initialRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function tick() {
      if (cancelled) return;
      try {
        const res = await fetch(`/api/revalidate/state?tag=*&t=${Date.now()}`, {
          credentials: "same-origin",
          cache: "no-store",
        });
        if (!res.ok) throw new Error("bad status");
        const data = (await res.json()) as { rev: number };
        if (initialRef.current === null) {
          initialRef.current = data.rev;
        } else if (data.rev > initialRef.current && data.rev > dismissedRev) {
          setVisible(true);
        }
      } catch {
        // Network glitches shouldn't throw — ignore and retry.
      }
      if (!cancelled) timer = setTimeout(tick, POLL_MS);
    }

    tick();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [dismissedRev]);

  function dismiss() {
    setVisible(false);
    setDismissedRev(Date.now());
  }

  function reload() {
    router.refresh();
    setVisible(false);
    setDismissedRev(Date.now());
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-[130] max-w-sm bg-[var(--fg)] text-[var(--bg)] rounded-sm shadow-[var(--shadow-lg)] px-5 py-4 flex items-start gap-3"
          role="status"
          aria-live="polite"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--oak-400)] mt-2 flex-shrink-0 animate-pulse" />
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">New edits published</p>
            <p className="text-xs text-[var(--bg)]/70 mb-3 leading-relaxed">
              Another editor just published changes. Reload the preview to see the latest.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={reload}
                className="text-xs uppercase tracking-widest font-medium bg-[var(--oak-500)] text-[var(--graphite-900)] px-3 py-1.5 rounded-sm hover:bg-[var(--oak-400)] transition"
              >
                Reload preview
              </button>
              <button
                onClick={dismiss}
                className="text-xs uppercase tracking-widest font-medium px-3 py-1.5 rounded-sm hover:bg-white/10 transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
