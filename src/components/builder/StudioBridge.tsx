/**
 * StudioBridge (Phase 2) — server component that mounts the Visual Editing
 * overlay ONLY when draftMode() is enabled. This is the client-side of
 * Presentation Tool's click-to-edit.
 *
 * Tree-shaken: in production (draftMode off) the client component is never
 * imported, so zero bytes of @sanity/visual-editing ship to anonymous visitors.
 */
import { draftMode } from "next/headers";
import StudioBridgeClient from "./StudioBridge.client";

export default async function StudioBridge() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;
  return <StudioBridgeClient />;
}
