"use client";

/**
 * Phase 4 — Client-side dynamic loader for ThemePreview. Keeps the heavy
 * poll-fetch logic out of the SSR bundle and the server component graph.
 */
import dynamic from "next/dynamic";

const ThemePreview = dynamic(() => import("./ThemePreview"), { ssr: false });

export default function ThemePreviewClient() {
  return <ThemePreview />;
}
