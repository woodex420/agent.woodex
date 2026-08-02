"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { IconCopy, IconWhatsApp, IconArrowUpRight, IconCheck } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";

/**
 * ArticleChrome — fixed top progress bar, share/copy-link floating rail,
 * and "time remaining" indicator that appears as you read.
 */
export default function ArticleChrome({ readMinutes, title }: { readMinutes: number; title: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.4 });
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setProgress(v));
    return unsub;
  }, [scrollYProgress]);

  const minutesLeft = Math.max(1, Math.round(readMinutes * (1 - progress)));

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.push("Link copied to clipboard", "success");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.push("Couldn't copy — link is in your address bar");
    }
  }

  function shareWA() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${title} — via Woodex Journal`);
    window.open(`https://wa.me/?text=${text}%20${url}`, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      {/* Top scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--oak-500)] origin-left z-[100]"
        aria-hidden
      />

      {/* Floating share rail (desktop only, right gutter) */}
      <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-2">
        <button
          onClick={copyLink}
          aria-label="Copy link to article"
          className="group w-10 h-10 rounded-full border border-[var(--border-strong)] bg-[var(--surface-1)] flex items-center justify-center hover:bg-[var(--oak-500)] hover:text-white hover:border-[var(--oak-500)] transition-colors"
        >
          {copied ? <IconCheck className="w-4 h-4" /> : <IconCopy className="w-4 h-4" />}
        </button>
        <button
          onClick={shareWA}
          aria-label="Share on WhatsApp"
          className="group w-10 h-10 rounded-full border border-[var(--border-strong)] bg-[var(--surface-1)] flex items-center justify-center hover:bg-[var(--oak-500)] hover:text-white hover:border-[var(--oak-500)] transition-colors"
        >
          <IconWhatsApp className="w-4 h-4" />
        </button>
        <a
          href="#top-of-article"
          aria-label="Back to top"
          className="group w-10 h-10 rounded-full border border-[var(--border-strong)] bg-[var(--surface-1)] flex items-center justify-center hover:bg-[var(--oak-500)] hover:text-white hover:border-[var(--oak-500)] transition-colors rotate-[-90deg]"
        >
          <IconArrowUpRight className="w-4 h-4 rotate-45" />
        </a>
      </div>

      {/* Mobile share bar (sticky bottom) */}
      <div className="xl:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-[var(--surface-1)] border border-[var(--border-strong)] rounded-full shadow-[var(--shadow-md)] pl-4 pr-1 py-1 backdrop-blur-md">
        <span className="text-xs uppercase tracking-widest text-[var(--fg-subtle)] mr-1 tabular-nums">
          {minutesLeft} min left
        </span>
        <button
          onClick={copyLink}
          aria-label="Copy link"
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--bg-subtle)] transition-colors"
        >
          {copied ? <IconCheck className="w-4 h-4 text-[var(--oak-600)]" /> : <IconCopy className="w-4 h-4" />}
        </button>
        <button
          onClick={shareWA}
          aria-label="Share on WhatsApp"
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--bg-subtle)] transition-colors"
        >
          <IconWhatsApp className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
