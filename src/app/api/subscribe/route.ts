/**
 * Sprint E4 — POST /api/subscribe
 *
 * Minimal newsletter-signup endpoint. Validates email + honeypot, buffers
 * locally, and fires to Resend/Supabase when those are configured. Same
 * robustness model as /api/lead.
 */
import { NextResponse, type NextRequest } from "next/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";

type SubscribeResult =
  | { ok: true; id: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

const SUBSCRIBER_BUFFER: { id: string; email: string; createdAt: string }[] = [];

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const SUBSCRIBE_RL = { max: 8, windowSec: 60 };

export async function POST(req: NextRequest): Promise<NextResponse<SubscribeResult>> {
  try {
    const rl = rateLimit(`subscribe:${clientIp(req)}`, SUBSCRIBE_RL);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: `Too many sign-ups. Try again in ${rl.retryAfterSec}s.` },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
      );
    }

    let body: Record<string, unknown>;
    try { body = (await req.json()) as Record<string, unknown>; }
    catch { return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 }); }

    const email = typeof body.email === "string" ? body.email.trim() : "";
    const company = typeof body.company === "string" ? body.company : "";
    if (company) {
      // Honeypot tripped — return success silently.
      return NextResponse.json({ ok: true, id: "sp-" + Date.now() });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
      return NextResponse.json(
        { ok: false, error: "Enter a valid email.", fieldErrors: { email: "Enter a valid email." } },
        { status: 400 },
      );
    }

    const rec = { id: "sb-" + crypto.randomUUID(), email, createdAt: new Date().toISOString() };
    SUBSCRIBER_BUFFER.unshift(rec);
    if (SUBSCRIBER_BUFFER.length > 5000) SUBSCRIBER_BUFFER.length = 5000;

    // Resend contact (audiences API)
    const key = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (key && audienceId) {
      fetch("https://api.resend.com/audiences/" + audienceId + "/contacts", {
        method: "POST",
        headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ email, unsubscribed: false }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true, id: rec.id });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[api/subscribe] unexpected", err);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ ok: true, count: SUBSCRIBER_BUFFER.length });
}
