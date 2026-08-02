/**
 * Phase 6 — Server gate for DraftActivityBar. Returns null for anonymous
 * visitors so the polling client + framer-motion code tree-shakes in
 * production. Mirrors the ThemePreview.server split — uses an indirection
 * client wrapper because `next/dynamic({ssr:false})` isn't allowed inside
 * Server Components.
 */
import { draftMode } from "next/headers";
import DraftActivityBarClient from "./DraftActivityBar.client";

export default async function DraftActivityBarServer() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;
  return <DraftActivityBarClient />;
}
