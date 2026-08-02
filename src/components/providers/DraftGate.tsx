"use client";

/**
 * Sprint E6 — DraftGate is currently a pass-through. In the future this is
 * where we can mount client-side previewing overlays (e.g. "Open in Studio"
 * buttons next to sections, Visual Editing overlays via @sanity/visual-editing).
 * Keeping the boundary in place now avoids tree surgery later.
 */
export default function DraftGate({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
