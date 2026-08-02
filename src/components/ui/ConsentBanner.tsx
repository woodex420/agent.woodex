"use client";

/**
 * Sprint F — minimal, non-blocking cookie consent banner.
 *
 * - Only shows if the visitor hasn't made a choice yet.
 * - Two actions: "Accept analytics" and "Only necessary".
 * - Dispatches a `woodex_consent` CustomEvent consumed by Analytics.tsx.
 * - Stores the choice in localStorage (365 days).
 * - Small, bottom-left on desktop; bottom bar on mobile.
 * - Never blocks page content or scroll.
 */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KEY = "woodex_consent";
const TTL_MS = 365 * 24 * 60 * 60 * 1000;

type Choice = "accepted" | "necessary";

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) { setShow(true); return; }
      const { at } = JSON.parse(raw) as { choice: Choice; at: number };
      if (Date.now() - at > TTL_MS) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  function decide(choice: Choice) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ choice, at: Date.now() }));
    } catch { /* ignore */ }
    window.dispatchEvent(new CustomEvent("woodex_consent", { detail: { accepted: choice === "accepted" } }));
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Cookie consent"
          aria-describedby="consent-text"
          className="fixed z-[110] bottom-4 left-4 right-4 md:right-auto md:max-w-md bg-[var(--surface-1)] border border-[var(--border-strong)] shadow-[var(--shadow-lg)] p-4 md:p-5 rounded-sm backdrop-blur-md"
        >
          <p id="consent-text" className="text-sm text-[var(--fg-muted)] leading-relaxed mb-4">
            We use a single privacy-friendly analytics cookie to understand which pages
            are useful. No ad tracking, no cross-site data.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => decide("accepted")}
              className="px-4 py-2 rounded-full bg-[var(--oak-500)] text-[var(--graphite-900)] text-xs uppercase tracking-widest font-medium hover:bg-[var(--oak-400)] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-500)]"
            >
              Accept
            </button>
            <button
              onClick={() => decide("necessary")}
              className="px-4 py-2 rounded-full text-xs uppercase tracking-widest text-[var(--fg-subtle)] hover:text-[var(--fg)] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-500)]"
            >
              Only necessary
            </button>
            <a href="/legal/privacy-policy" className="ml-auto text-xs text-[var(--fg-subtle)] underline underline-offset-4 hover:text-[var(--oak-600)]">
              Privacy policy
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
