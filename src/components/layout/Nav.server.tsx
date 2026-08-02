/**
 * Phase 3 — Nav server wrapper.
 *
 * Fetches builder-managed nav pages (when Sanity is on) and passes them to the
 * client Nav component. Keeps the client Nav self-contained for the static case
 * so production pages render without awaiting Sanity.
 */
import Nav from "./Nav";
import { getBuilderNavPages } from "@/lib/sanity/page-helpers";

export default async function NavServer() {
  const extra = await getBuilderNavPages();
  return <Nav extraLinks={extra} />;
}
