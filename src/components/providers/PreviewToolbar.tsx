"use client";

/**
 * Sprint E6 — floating draft-mode indicator / exit-preview button.
 * Only mounts when the page is being viewed in draft mode (set by
 * /api/draft/enable). The parent server component conditionally renders
 * this so it never ships JS for production visitors.
 */
import { usePathname } from "next/navigation";

export default function PreviewToolbar() {
  const pathname = usePathname() ?? "/";
  const exitUrl = `/api/draft/disable?slug=${encodeURIComponent(pathname)}`;
  return (
    <a
      href={exitUrl}
      className="fixed bottom-5 right-5 z-[130] inline-flex items-center gap-2 bg-[var(--oak-500)] text-[var(--graphite-900)] text-xs uppercase tracking-widest font-medium px-4 py-2 rounded-full shadow-[var(--shadow-lg)] hover:bg-[var(--oak-400)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-500)]"
    >
      <span className="w-2 h-2 rounded-full bg-[var(--graphite-900)] animate-pulse" aria-hidden />
      Draft preview · Exit
    </a>
  );
}
