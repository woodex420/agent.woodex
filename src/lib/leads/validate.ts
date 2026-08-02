/**
 * Sprint E4 — server-side validation for /api/lead. Mirrors client-side
 * validation in consultation/ContactForm and adds honeypot + captcha checks.
 */
import { LEAD_VALIDATION, BUDGET_OPTIONS, LEAD_SOURCES } from "@/lib/constants";
import type { LeadPayload, LeadResult } from "./types";

export function validateLead(body: Record<string, unknown>): { valid: true; payload: LeadPayload } | { valid: false; result: LeadResult } {
  const fieldErrors: Record<string, string> = {};

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const space = typeof body.space === "string" ? body.space.trim() : "";
  const budget = typeof body.budget === "string" ? body.budget.trim() : "";
  const brief = typeof body.brief === "string" ? body.brief.trim() : "";
  const source = typeof body.source === "string" ? body.source.trim() : "organic-search";
  const page = typeof body.page === "string" ? body.page.trim() : "";
  const token = typeof body.token === "string" ? body.token.trim() : "";

  // Honeypot: invisible field must be empty. Field name: "company" is classic.
  const isSpam = typeof body.company === "string" && body.company.length > 0;
  if (isSpam) {
    // Return a valid payload tagged as spam so the route short-circuits notifications.
    return {
      valid: true,
      payload: buildPayload({ name, phone, email, space, budget, brief, source: "spam", page, token }),
    };
  }

  if (name.length < LEAD_VALIDATION.nameMinLen) fieldErrors.name = "Please enter your name.";
  if (name.length > LEAD_VALIDATION.nameMaxLen) fieldErrors.name = `Name must be under ${LEAD_VALIDATION.nameMaxLen} characters.`;

  const phoneDigits = phone.replace(/[^\d+]/g, "");
  if (phoneDigits.length < LEAD_VALIDATION.phoneMinLen || phoneDigits.length > LEAD_VALIDATION.phoneMaxLen) {
    fieldErrors.phone = "Enter a valid phone number.";
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Enter a valid email address, or leave it blank.";
  }
  if (email.length > LEAD_VALIDATION.emailMaxLen) {
    fieldErrors.email = `Email must be under ${LEAD_VALIDATION.emailMaxLen} characters.`;
  }

  if (brief.length > LEAD_VALIDATION.briefMaxLen) {
    fieldErrors.brief = `Brief must be under ${LEAD_VALIDATION.briefMaxLen} characters.`;
  }

  if (budget && !BUDGET_OPTIONS.some((b) => b.id === budget)) {
    // Don't hard-fail on unknown budgets; just don't store it.
  }

  if (source && !LEAD_SOURCES.includes(source as typeof LEAD_SOURCES[number])) {
    // Unknown source is ok, default to organic.
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { valid: false, result: { ok: false, error: "Please fix the highlighted fields.", fieldErrors } };
  }

  const utm = parseUtm(body);

  return {
    valid: true,
    payload: buildPayload({ name, phone, email, space, budget, brief, source, page, token, utm }),
  };
}

function buildPayload(args: {
  name: string; phone: string; email: string; space: string; budget: string;
  brief: string; source: string; page: string; token: string; utm?: LeadPayload["utm"];
}): LeadPayload {
  return {
    name: args.name,
    phone: args.phone,
    email: args.email || undefined,
    space: args.space || undefined,
    budget: args.budget || undefined,
    brief: args.brief || undefined,
    source: args.source || "organic-search",
    page: args.page || undefined,
    token: args.token || undefined,
    utm: args.utm,
  };
}

function parseUtm(body: Record<string, unknown>): LeadPayload["utm"] {
  const utm = body.utm as Record<string, unknown> | undefined;
  if (!utm || typeof utm !== "object") return undefined;
  const pick = (k: string) => (typeof utm[k] === "string" ? (utm[k] as string).trim() : undefined);
  return {
    source: pick("source"),
    medium: pick("medium"),
    campaign: pick("campaign"),
    term: pick("term"),
    content: pick("content"),
  };
}
