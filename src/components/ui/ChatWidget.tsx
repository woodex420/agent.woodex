"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/config";

/**
 * Floating Chat Widget
 * Capture-first: opens options for WhatsApp, call, or consultation form.
 * Appears after 8s or scroll past 600px.
 * Respects session: if user already booked (woodex_booked) it hides for this session.
 * User can dismiss; stays dismissed for the page session.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If they just converted (thank-you page set this flag), don't show
    try {
      if (sessionStorage.getItem("woodex_booked") === "1") return;
    } catch {}

    const t = setTimeout(() => setVisible(true), 8000);
    const onScroll = () => {
      if (window.scrollY > 600) setVisible(true);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onClick = (e: MouseEvent) => {
      if (open && panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  function dismiss(e: React.MouseEvent) {
    e.stopPropagation();
    setDismissed(true);
    setOpen(false);
  }

  const show = visible && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
        >
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                ref={panelRef}
              className="absolute bottom-16 md:bottom-20 right-0 w-72 max-w-[calc(100vw-2rem)] bg-[var(--surface-1)] border border-[var(--border)] rounded-sm shadow-[var(--shadow-lg)] overflow-hidden"
              >
                <div className="p-5 bg-[var(--graphite-900)] text-white relative">
                  <button
                    onClick={dismiss}
                    aria-label="Dismiss"
                    className="absolute top-3 right-3 text-white/60 hover:text-white w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                  <div className="text-xs uppercase tracking-widest text-[var(--oak-300)] mb-1 pr-6">Talk to a human</div>
                  <div className="font-display text-xl leading-tight">
                    Get a reply<br />
                    <span className="italic-serif text-[var(--oak-300)]">in under 15 minutes.</span>
                  </div>
                </div>
                <div className="p-2">
                  <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-sm hover:bg-[var(--bg-subtle)] transition">
                    <span className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M.057 24l1.687-6.163a11.87 11.87 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                    </span>
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-xs text-[var(--fg-subtle)]">Typical reply &lt; 15 min</div>
                    </div>
                  </a>
                  <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-3 p-3 rounded-sm hover:bg-[var(--bg-subtle)] transition">
                    <span className="w-10 h-10 rounded-full bg-[var(--oak-500)] text-white flex items-center justify-center flex-shrink-0">📞</span>
                    <div>
                      <div className="font-medium">Call the studio</div>
                      <div className="text-xs text-[var(--fg-subtle)]">{SITE.phoneDisplay}</div>
                    </div>
                  </a>
                  <a href="/consultation" className="flex items-center gap-3 p-3 rounded-sm hover:bg-[var(--bg-subtle)] transition">
                    <span className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center flex-shrink-0">📅</span>
                    <div>
                      <div className="font-medium">Book a site visit</div>
                      <div className="text-xs text-[var(--fg-subtle)]">Free · 45 minutes · on-site</div>
                    </div>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close chat" : "Open chat"}
            aria-expanded={open}
            className="relative w-14 h-14 rounded-full bg-[var(--oak-500)] text-[var(--graphite-900)] flex items-center justify-center shadow-[var(--shadow-lg)] hover:bg-[var(--oak-400)] transition-colors"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="text-2xl leading-none">×</motion.span>
              ) : (
                <motion.span key="chat" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--accent)] border-2 border-[var(--oak-500)]" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
