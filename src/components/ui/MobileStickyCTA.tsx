"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/config";

/**
 * MobileStickyCTA — fixed bottom bar on mobile (<768px) with three high-intent actions.
 * Hidden on desktop via CSS utility. Appears after scroll to avoid covering hero.
 */
export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="mobile-sticky-cta"
      aria-label="Quick actions"
      style={{ transform: visible ? "translateY(0)" : "translateY(calc(100% + 10px))", transition: "transform 300ms var(--ease-out-quart)" }}
    >
      <a
        href={`tel:${SITE.phoneTel}`}
        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-[var(--border-strong)] text-[var(--fg)] text-xs uppercase tracking-widest font-medium hover:border-[var(--oak-500)] hover:text-[var(--oak-600)] transition-colors min-h-[44px]"
        aria-label="Call Woodex"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
        </svg>
        Call
      </a>
      <a
        href={`https://wa.me/${SITE.whatsapp}`}
        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#25D366] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#1fb858] transition-colors min-h-[44px]"
        aria-label="WhatsApp Woodex"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.2-.6.2s-.7.9-.9 1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.2.3-.4.1-.1 0-.3 0-.4s-.6-1.4-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.5s1 2.9 1.1 3.1c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.5-.3" />
        </svg>
        WhatsApp
      </a>
      <Link
        href="/consultation"
        className="flex-[1.3] flex items-center justify-center gap-2 py-3 rounded-full bg-[var(--oak-500)] text-white text-xs uppercase tracking-widest font-medium hover:bg-[var(--oak-600)] transition-colors min-h-[44px]"
      >
        Start project
      </Link>
    </div>
  );
}
