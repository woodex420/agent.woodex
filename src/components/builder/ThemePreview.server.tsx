/**
 * Phase 4 — mounts the ThemePreview client when draftMode is enabled.
 * Tree-shaken on production pages (returns null).
 */
import { draftMode } from "next/headers";
import ThemePreviewClient from "./ThemePreview.client";

export default async function ThemePreviewServer() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;
  return <ThemePreviewClient />;
}
