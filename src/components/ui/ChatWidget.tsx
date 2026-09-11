"use client";
import { motion } from "framer-motion";
import { SITE } from "@/lib/config";

/** WhatsApp FAB per DESIGN.md — always visible, no dismiss, brand green */
export default function ChatWidget() {
  const msg = encodeURIComponent("Hi Woodex! I'm interested in a project.");
  const href = `https://wa.me/${SITE.whatsapp}?text=${msg}`;
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-[88px] md:bottom-6 right-4 md:right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.45)] flex items-center justify-center hover:bg-[#1ebe5b] hover:scale-105 active:scale-95 transition"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" aria-hidden>
        <path d="M19.11 17.27c-.28-.14-1.64-.81-1.9-.9-.26-.1-.45-.14-.64.14-.19.28-.73.9-.9 1.08-.16.18-.33.2-.61.07-.28-.14-1.17-.43-2.23-1.38-.82-.73-1.38-1.64-1.54-1.91-.16-.28-.02-.43.12-.57.12-.12.28-.33.42-.49.14-.17.19-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.87-2.1-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.49.07-.75.36-.26.28-.98.96-.98 2.33 0 1.38 1 2.71 1.14 2.9.14.18 1.98 3.02 4.8 4.24.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.26-.18-.54-.32zM16 4C9.37 4 4 9.37 4 16c0 2.26.63 4.36 1.71 6.16L4 28l6-1.67A11.94 11.94 0 0 0 16 28c6.63 0 12-5.37 12-12S22.63 4 16 4z"/>
      </svg>
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" aria-hidden />
    </motion.a>
  );
}
