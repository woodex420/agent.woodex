"use client";

/**
 * Client-side wrapper for @sanity/visual-editing. This file is the only place
 * that imports the heavy visual-editing bundle — because it's a client component
 * with ssr:false it never renders during SSR and never leaks into the server
 * bundle. The server-side StudioBridge only renders this when draftMode is on.
 */
import dynamic from "next/dynamic";

const VisualEditing = dynamic(
  () => import("next-sanity/visual-editing/client-component").then((m) => m.VisualEditing),
  { ssr: false },
);

export default function StudioBridgeClient() {
  return <VisualEditing />;
}
