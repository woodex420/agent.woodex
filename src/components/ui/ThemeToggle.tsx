"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ThemeToggle — sun/moon switch for light/dark.
 * Compact, keyboard-accessible, used in Nav (and later mobile menu).
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border-strong)] hover:border-[var(--oak-500)] hover:text-[var(--oak-500)] transition-colors ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.svg
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            className="w-5 h-5 absolute"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            className="w-5 h-5 absolute"
          >
            <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" strokeLinejoin="round" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}
