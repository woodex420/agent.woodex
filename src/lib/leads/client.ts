/**
 * Sprint E4 — client-side helpers for lead forms.
 *
 * - `readAttribution()` reads first-touch UTM params from URL on first visit
 *   and persists them to a cookie so we can attach them to every lead submit,
 *   even if the visitor browses several pages before converting.
 * - `submitLead(formData)` POSTs to /api/lead with UTM + current page attached.
 */
import { LEAD_COOKIE_NAME, LEAD_COOKIE_MAX_AGE_DAYS } from "@/lib/constants";
import type { LeadPayload, LeadResult } from "./types";

const UTM_KEYS = ["source", "medium", "campaign", "term", "content"] as const;
type Utm = Record<(typeof UTM_KEYS)[number], string | undefined>;

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : undefined;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const exp = new Date();
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp.toUTCString()}; path=/; SameSite=Lax`;
}

interface Attribution {
  utm: Utm;
  firstLanding: string;
  firstTouchAt: string;
}

/** First-touch UTM capture — call once on app boot or on first form render. */
export function captureAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;

  const existing = getCookie(LEAD_COOKIE_NAME);
  if (existing) {
    try { return JSON.parse(existing) as Attribution; } catch { /* fall through */ }
  }

  const url = new URL(window.location.href);
  const utm: Utm = { source: undefined, medium: undefined, campaign: undefined, term: undefined, content: undefined };
  let hasUtm = false;
  for (const k of UTM_KEYS) {
    const v = url.searchParams.get(`utm_${k}`);
    if (v) { utm[k] = v; hasUtm = true; }
  }

  // Also treat gclid/fbclid as source signals
  const gclid = url.searchParams.get("gclid");
  const fbclid = url.searchParams.get("fbclid");
  if (gclid) { utm.source = utm.source ?? "google"; utm.medium = utm.medium ?? "cpc"; hasUtm = true; }
  if (fbclid) { utm.source = utm.source ?? "facebook"; utm.medium = utm.medium ?? "cpc"; hasUtm = true; }

  const attr: Attribution = {
    utm: hasUtm ? utm : { source: "direct", medium: "none", campaign: undefined, term: undefined, content: undefined },
    firstLanding: window.location.pathname,
    firstTouchAt: new Date().toISOString(),
  };
  setCookie(LEAD_COOKIE_NAME, JSON.stringify(attr), LEAD_COOKIE_MAX_AGE_DAYS);
  return attr;
}

export function readAttribution(): Attribution | null {
  if (typeof document === "undefined") return null;
  const raw = getCookie(LEAD_COOKIE_NAME);
  if (!raw) return captureAttribution();
  try { return JSON.parse(raw) as Attribution; } catch { return null; }
}

export async function submitLead(input: Omit<LeadPayload, "utm" | "page" | "token"> & { token?: string }): Promise<LeadResult> {
  const attr = readAttribution() ?? captureAttribution();
  const body: LeadPayload = {
    ...input,
    page: typeof window !== "undefined" ? window.location.pathname : undefined,
    utm: attr?.utm,
    token: input.token,
  };

  // Honeypot: we always add this empty field server-side-checked.
  const formBody = { ...body, company: "" };

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formBody),
    });
    const data = (await res.json()) as LeadResult;
    return data;
  } catch {
    return { ok: false, error: "Network error. Please call us directly." };
  }
}
