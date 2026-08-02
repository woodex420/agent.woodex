/**
 * Sprint E4 — POST /api/lead
 *
 * Accepts form submissions from consultation, contact, and chat/CTA widgets.
 * Validates server-side, verifies Turnstile (if configured), writes to the
 * configured destinations (Supabase / email / WhatsApp), and returns a JSON
 * result. Never throws — every branch responds with a JSON payload.
 */
import { NextResponse, type NextRequest } from "next/server";
import { validateLead } from "@/lib/leads/validate";
import {
  bufferLead,
  sendToSupabase,
  sendNotificationEmail,
  sendWhatsappAck,
  verifyTurnstile,
} from "@/lib/leads/destinations";
import { SITE } from "@/lib/config";
import type { LeadRecord, LeadResult } from "@/lib/leads/types";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // don't cache POSTs

const MAX_BODY_BYTES = 32_000;
// Phase 6 — 5 submissions/min per IP (honeypot-bypassing spam gets throttled).
const LEAD_RL = { max: 5, windowSec: 60 };

export async function POST(req: NextRequest): Promise<NextResponse<LeadResult>> {
  try {
    // Rate limit
    const ip = clientIp(req);
    const rl = rateLimit(`lead:${ip}`, LEAD_RL);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: `Too many submissions. Try again in ${rl.retryAfterSec}s.` },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
      );
    }

    // Size guard
    const cl = req.headers.get("content-length");
    if (cl && parseInt(cl, 10) > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Payload too large." },
        { status: 413 },
      );
    }

    let body: Record<string, unknown>;
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body." },
        { status: 400 },
      );
    }

    const v = validateLead(body);
    if (!v.valid) return NextResponse.json(v.result, { status: 400 });
    const payload = v.payload;

    const ipDownstream = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      ?? req.headers.get("x-real-ip")?.trim()
      ?? ip;
    const userAgent = req.headers.get("user-agent") ?? undefined;

    // Captcha
    const captchaOk = await verifyTurnstile(payload.token, ip);
    if (!captchaOk) {
      return NextResponse.json(
        { ok: false, error: "Could not verify captcha. Please try again." },
        { status: 400 },
      );
    }

    const record: LeadRecord = {
      ...payload,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      stage: payload.source === "spam" ? "spam" : "new",
      ip,
      userAgent,
    };

    // Fire all destinations in parallel (each no-ops if not configured).
    await Promise.allSettled([
      bufferLead(record),
      sendToSupabase(record),
      sendNotificationEmail(record),
      // Don't await WhatsApp if it's a spam/honeypot hit
      record.stage === "new" ? sendWhatsappAck(record) : Promise.resolve(),
    ]);

    // Construct next-step links from SITE config so the thank-you page is always accurate.
    const whatsapp = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
      `Hi Woodex, I just submitted a consultation request under the name ${payload.name}.`,
    )}`;
    const calendar = "/consultation#book";

    return NextResponse.json({
      ok: true,
      id: record.id,
      nextSteps: { whatsapp, calendar },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[api/lead] unexpected error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please call us directly at " + SITE.phoneDisplay },
      { status: 500 },
    );
  }
}

/** Simple GET so the route health-checks cleanly. */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ ok: true, endpoint: "/api/lead" });
}
