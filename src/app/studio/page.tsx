/**
 * Sprint E5 — Sanity Studio entry.
 *
 * The Studio is a heavy SPA (~5MB of Sanity code). We keep it out of the
 * production client bundle by:
 *   1. Declaring `dynamic = "force-dynamic"` so it's never prerendered.
 *   2. Rendering a tiny client entry that lazy-loads next-sanity + config
 *      only when the browser actually navigates here AND passes the password gate.
 */
export const dynamic = "force-dynamic";

import StudioEntry from "./StudioEntry";

export default function StudioPage() {
  return <StudioEntry />;
}
