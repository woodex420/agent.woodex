"use client";
/**
 * Phase 6 — Client indirection wrapper. Loads DraftActivityBar with ssr:false
 * via next/dynamic. This file exists solely because `dynamic(...,{ssr:false})`
 * is forbidden inside Server Components; the server wrapper imports this
 * file, which is itself a client component.
 */
import dynamic from "next/dynamic";

const DraftActivityBar = dynamic(() => import("./DraftActivityBar"), { ssr: false });

export default function DraftActivityBarClient() {
  return <DraftActivityBar />;
}
