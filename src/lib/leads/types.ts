/**
 * Sprint E4 — lead capture types. Shared between API route, form components,
 * and downstream integrations (Supabase / HubSpot / Resend / WhatsApp).
 */
import type { BudgetId, LeadSource } from "@/lib/constants";

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  space?: string;
  budget?: BudgetId | string;
  brief?: string;
  source?: LeadSource | string;
  /** Page URL where the form was submitted. */
  page?: string;
  /** UTM params (attributed from cookie or query). */
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  /** Turnstile / captcha token. */
  token?: string;
}

export interface LeadRecord extends LeadPayload {
  id: string;
  createdAt: string;          // ISO
  stage: "new" | "contacted" | "site_visit_booked" | "budget_sent" | "quote_sent" | "won" | "lost" | "spam";
  ip?: string;
  userAgent?: string;
}

export type LeadResult =
  | { ok: true; id: string; nextSteps: { whatsapp?: string; calendar?: string } }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };
