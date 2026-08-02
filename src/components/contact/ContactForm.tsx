"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { captureAttribution, submitLead } from "@/lib/leads/client";
import { useToast } from "@/components/ui/Toast";
import { SITE } from "@/lib/config";

/**
 * ContactForm — 4-field short form (anti-anxiety).
 * Micro-interactions: label floats on focus, progress bar, animated submit,
 * inline validation, autocomplete attrs, aria-describedby errors.
 * Redirects to /thank-you on submit (Sprint E will wire real CRM /api/lead).
 */
const SPACE_TYPES = [
  "Commercial office",
  "Residential / home",
  "Retail store",
  "Café / restaurant",
  "Bank / branch",
  "Renovation",
  "Turnkey (design + build)",
  "Just 3D renders",
  "Other / not sure yet",
];

const BUDGETS = [
  "Under PKR 15 lakh",
  "PKR 15–40 lakh",
  "PKR 40 lakh – 1 crore",
  "PKR 1–3 crore",
  "Above PKR 3 crore",
  "Not sure yet",
];

interface FormState {
  name: string;
  phone: string;
  email: string;
  space: string;
  budget: string;
  brief: string;
}
const INITIAL: FormState = { name: "", phone: "", email: "", space: "", budget: "", brief: "" };

export default function ContactForm() {
  const router = useRouter();
  const toast = useToast();
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { captureAttribution(); }, []);

  function setField<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }
  function filled(name: keyof FormState) { return !!form[name]; }

  function validate(f: FormState) {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (f.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[+\d\s-]{7,}$/.test(f.phone.trim())) e.phone = "Enter a valid phone number.";
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email, or leave blank.";
    return e;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      document.getElementById(Object.keys(v)[0])?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const res = await submitLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        space: form.space || undefined,
        budget: form.budget || undefined,
        brief: form.brief.trim() || undefined,
        source: "contact-page",
      });
      if (!res.ok) {
        if (res.fieldErrors) setErrors((e2) => ({ ...e2, ...res.fieldErrors }));
        toast.push(res.error ?? "Something went wrong. Please call us.");
        setSubmitting(false);
        return;
      }
      try { sessionStorage.setItem("woodex_booked", "1"); } catch {}
      toast.push("Message sent. We'll WhatsApp you within 15 minutes.", "success");
      router.push("/thank-you");
    } catch {
      toast.push("Network error. Please call us at " + SITE.phoneDisplay);
      setSubmitting(false);
    }
  }

  const trackFields: (keyof FormState)[] = ["name", "phone", "email", "space", "budget"];
  const completed = trackFields.filter((f) => form[f]).length;
  const progress = completed / trackFields.length;

  return (
    <section className="py-24 bg-[var(--bg-subtle)]">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-5">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            Tell us a little
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
            Four fields.<br />
            <span className="italic-serif text-[var(--oak-600)]">That's it.</span>
          </h2>
          <p className="text-[var(--fg-muted)] text-lg leading-relaxed mb-6 max-w-md">
            We don't ask for your life story before we'll talk to you. Four things help
            us route you to the right person on day one. Anything else comes up on
            the walkthrough.
          </p>
          <ul className="space-y-3 text-[var(--fg-muted)] text-base max-w-md">
            {[
              "Your number stays with Zara — no call centre.",
              "We never sell, share, or rent your details.",
              "You can opt out of any email in one click.",
              "There is no 'sales team' trying to close you.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--oak-500)] flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="lg:col-span-7 bg-[var(--surface-1)] border border-[var(--border)] p-6 md:p-10 shadow-[var(--shadow-md)] relative"
          aria-describedby="contact-note"
        >
          {/* Honeypot */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label>Company (leave blank)<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label>
          </div>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--border)]">
            <motion.div
              className="h-full bg-[var(--oak-500)]"
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden
            />
          </div>

          <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
            <Field id="name" label="Your name" autocomplete="name" required value={form.name} focused={focused} isFilled={filled("name")} error={errors.name} onFocus={setFocused} onBlur={() => setFocused(null)} onChange={(v) => setField("name", v)} placeholder="e.g. Ayesha Malik" />
            <Field id="phone" label="Phone" type="tel" autocomplete="tel" required value={form.phone} focused={focused} isFilled={filled("phone")} error={errors.phone} onFocus={setFocused} onBlur={() => setFocused(null)} onChange={(v) => setField("phone", v)} placeholder="+92 3xx xxxxxxx" />
            <Field id="email" label="Email (optional)" type="email" autocomplete="email" value={form.email} focused={focused} isFilled={filled("email")} error={errors.email} onFocus={setFocused} onBlur={() => setFocused(null)} onChange={(v) => setField("email", v)} placeholder="you@company.com" />
            <Select id="space" label="Space type" options={SPACE_TYPES} value={form.space} focused={focused} isFilled={filled("space")} onFocus={setFocused} onBlur={() => setFocused(null)} onChange={(v) => setField("space", v)} />
            <Select id="budget" label="Rough budget" options={BUDGETS} value={form.budget} focused={focused} isFilled={filled("budget")} onFocus={setFocused} onBlur={() => setFocused(null)} onChange={(v) => setField("budget", v)} />
            <div className="md:col-span-2 relative pt-4">
              <label htmlFor="brief" className={`absolute left-0 pointer-events-none transition-all duration-300 ${focused === "brief" || filled("brief") ? "text-xs uppercase tracking-widest text-[var(--oak-600)] -translate-y-6" : "text-base text-[var(--fg-subtle)] translate-y-2"}`}>
                Anything else we should know? <span className="text-[var(--fg-subtle)]/70">(optional)</span>
              </label>
              <textarea
                id="brief"
                name="brief"
                rows={3}
                value={form.brief}
                onFocus={() => setFocused("brief")}
                onBlur={() => setFocused(null)}
                onChange={(e) => setField("brief", e.target.value)}
                className="w-full bg-transparent border-b border-[var(--border-strong)] py-2 text-[var(--fg)] focus:outline-none focus:border-[var(--oak-500)] transition resize-none"
                placeholder=""
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p id="contact-note" className="text-xs text-[var(--fg-subtle)] leading-relaxed max-w-sm">
              We'll WhatsApp you within 15 minutes during business hours (Mon–Sat, 10–7)
              to confirm your walkthrough slot.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="relative inline-flex items-center justify-center gap-2 font-medium tracking-wide uppercase px-8 py-4 text-[0.95rem] rounded-full overflow-hidden border border-[var(--fg)] text-[var(--fg)] group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-500)] flex-shrink-0 disabled:opacity-60"
            >
              <span aria-hidden className="absolute inset-0 -z-10 bg-[var(--oak-500)] translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500">
                {submitting ? "Sending…" : "Send — hear back in 15 min →"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  autocomplete?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  focused: string | null;
  isFilled: boolean;
  error?: string;
  onFocus: (n: string) => void;
  onBlur: () => void;
  onChange: (v: string) => void;
}
function Field({ id, label, type = "text", autocomplete, required, placeholder, value, focused, isFilled, error, onFocus, onBlur, onChange }: FieldProps) {
  const active = focused === id || isFilled;
  return (
    <div className="relative pt-4">
      <label
        htmlFor={id}
        className={`absolute left-0 pointer-events-none transition-all duration-300 ${active ? "text-xs uppercase tracking-widest text-[var(--oak-600)] -translate-y-6" : "text-base text-[var(--fg-subtle)] translate-y-2"} ${error ? "!text-[var(--error)]" : ""}`}
      >
        {label}{required && <span className="text-[var(--accent)] ml-1" aria-hidden>*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        autoComplete={autocomplete}
        required={required}
        placeholder={active ? placeholder : ""}
        value={value}
        onFocus={() => onFocus(id)}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`w-full bg-transparent border-b py-2 text-[var(--fg)] focus:outline-none transition ${error ? "border-[var(--error)] focus:border-[var(--error)]" : "border-[var(--border-strong)] focus:border-[var(--oak-500)]"}`}
      />
      {error && (
        <p id={`${id}-err`} role="alert" className="text-xs text-[var(--error)] mt-2">{error}</p>
      )}
    </div>
  );
}

interface SelectProps {
  id: string;
  label: string;
  options: string[];
  value: string;
  focused: string | null;
  isFilled: boolean;
  onFocus: (n: string) => void;
  onBlur: () => void;
  onChange: (v: string) => void;
}
function Select({ id, label, options, value, focused, isFilled, onFocus, onBlur, onChange }: SelectProps) {
  const active = focused === id || isFilled;
  return (
    <div className="relative pt-4">
      <label htmlFor={id} className={`absolute left-0 pointer-events-none transition-all duration-300 ${active ? "text-xs uppercase tracking-widest text-[var(--oak-600)] -translate-y-6" : "text-base text-[var(--fg-subtle)] translate-y-2"}`}>
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onFocus={() => onFocus(id)}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-[var(--border-strong)] py-2 text-[var(--fg)] focus:outline-none focus:border-[var(--oak-500)] transition appearance-none cursor-pointer"
      >
        <option value="" disabled></option>
        {options.map((o) => <option key={o} value={o} className="bg-[var(--bg-elevated)]">{o}</option>)}
      </select>
      <svg className="absolute right-0 bottom-3 w-4 h-4 text-[var(--fg-subtle)] pointer-events-none" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  );
}
