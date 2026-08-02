"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconCheck, IconClose } from "./Icon";

type Toast = { id: number; message: string; tone?: "default" | "success" };
type ToastCtx = { push: (message: string, tone?: Toast["tone"]) => void };

const ToastContext = createContext<ToastCtx | null>(null);

export function useToast(): ToastCtx {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const push = useCallback((message: string, tone: Toast["tone"] = "default") => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[120] flex flex-col gap-2 w-[min(92vw,420px)]" role="region" aria-live="polite" aria-label="Notifications">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm shadow-[var(--shadow-lg)] border backdrop-blur-md
                ${t.tone === "success"
                  ? "bg-[var(--oak-500)] text-[var(--graphite-900)] border-[var(--oak-600)]/30"
                  : "bg-[var(--surface-1)] text-[var(--fg)] border-[var(--border-strong)]"}`}
              role="status"
            >
              {t.tone === "success" ? (
                <IconCheck className="w-5 h-5 flex-shrink-0" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--oak-500)] flex-shrink-0" />
              )}
              <span className="text-sm leading-snug flex-1">{t.message}</span>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className="opacity-60 hover:opacity-100 transition p-1 -mr-1"
              >
                <IconClose className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
