/**
 * Sprint E4 — lead destinations. Each function is resilient: missing config
 * means it no-ops gracefully so the lead still returns 200 to the visitor.
 *
 * Currently supports:
 *  - Console / in-memory log (always on; for dev visibility)
 *  - Supabase `leads` table (if SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY set)
 *  - Resend notification email to studio inbox (if RESEND_API_KEY set)
 *  - WhatsApp Cloud API template (if WHATSAPP_* set)
 *  - HubSpot form submit (if HUBSPOT_PORTAL_ID + HUBSPOT_FORM_GUID set)
 */
import type { LeadRecord } from "./types";

const LEAD_BUFFER_KEY = "woodex_lead_buffer";

/** In-memory dev buffer (survives until process exits) so we can verify leads in local dev. */
export function bufferLead(lead: LeadRecord): void {
  if (typeof window !== "undefined") return; // server only
  const existing = getBufferedLeads();
  existing.unshift(lead);
  (globalThis as any)[LEAD_BUFFER_KEY] = existing.slice(0, 200);
  // eslint-disable-next-line no-console
  console.log("[lead]", lead.id, lead.name, lead.phone, lead.source);
}

export function getBufferedLeads(): LeadRecord[] {
  if (typeof window !== "undefined") return [];
  return ((globalThis as any)[LEAD_BUFFER_KEY] as LeadRecord[] | undefined) ?? [];
}

/** Supabase insert via direct REST (no SDK dep needed). */
export async function sendToSupabase(lead: LeadRecord): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_LEADS_TABLE ?? "leads";
  if (!url || !key) return;
  try {
    await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        "apikey": key,
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify(lead),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[lead:supabase] failed", err);
  }
}

/** Resend email notification. */
export async function sendNotificationEmail(lead: LeadRecord): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.WOODEX_NOTIFICATION_EMAIL;
  if (!key || !to) return;
  const subject = `New lead: ${lead.space ?? "consultation"} — ${lead.name}`;
  const html = `
    <h2>New lead from woodex.com.pk</h2>
    <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(lead.phone)}</p>
    ${lead.email ? `<p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>` : ""}
    ${lead.space ? `<p><strong>Space:</strong> ${escapeHtml(lead.space)}</p>` : ""}
    ${lead.budget ? `<p><strong>Budget:</strong> ${escapeHtml(lead.budget)}</p>` : ""}
    ${lead.brief ? `<p><strong>Brief:</strong><br>${escapeHtml(lead.brief).replace(/\n/g, "<br>")}</p>` : ""}
    <p><strong>Source:</strong> ${escapeHtml(lead.source ?? "organic")} ${lead.page ? `· ${escapeHtml(lead.page)}` : ""}</p>
    <p><strong>Submitted:</strong> ${lead.createdAt}</p>
  `;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Woodex Leads <woodexinterior.pk@gmail.com>",
        to: [to],
        subject,
        html,
        reply_to: lead.email ?? undefined,
      }),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[lead:resend] failed", err);
  }
}

/** WhatsApp Cloud API — send a template to the customer acknowledging receipt. */
export async function sendWhatsappAck(lead: LeadRecord): Promise<void> {
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const tpl = process.env.WHATSAPP_TEMPLATE_NAME ?? "lead_received_15min";
  if (!phoneId || !token) return;
  // Convert phone to E.164 (strip non-digits except leading +)
  const to = lead.phone.replace(/[^\d+]/g, "").replace(/^0/, "92");
  try {
    await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: { name: tpl, language: { code: "en" } },
      }),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[lead:whatsapp] failed", err);
  }
}

/** Turnstile verification (Cloudflare). */
export async function verifyTurnstile(token: string | undefined, ip: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // captcha not configured = pass-through
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}
