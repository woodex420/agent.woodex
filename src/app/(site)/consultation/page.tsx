"use client";
import Button from "@/components/ui/Button";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SITE } from "@/lib/config";
import { captureAttribution, submitLead } from "@/lib/leads/client";
import { useToast } from "@/components/ui/Toast";

interface FormState {
  name: string;
  phone: string;
  email: string;
  space: string;
  brief: string;
}

const INITIAL: FormState = { name: "", phone: "", email: "", space: "", brief: "" };

const SPACE_OPTIONS = [
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

export default function ConsultationPage() {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { captureAttribution(); }, []);

  function onChange<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function validate(f: FormState): Partial<Record<keyof FormState, string>> {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (f.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[+\d\s-]{7,}$/.test(f.phone.trim())) e.phone = "Enter a valid phone number.";
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email, or leave it blank.";
    return e;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      const first = document.getElementById(Object.keys(v)[0]);
      first?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const res = await submitLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        space: form.space || undefined,
        brief: form.brief.trim() || undefined,
        source: "consultation-page",
      });
      if (!res.ok) {
        if (res.fieldErrors) {
          setErrors((e) => ({ ...e, ...res.fieldErrors }));
        }
        toast.push(res.error ?? "Something went wrong. Please call us.");
        setSubmitting(false);
        return;
      }
      try { sessionStorage.setItem("woodex_booked", "1"); } catch {}
      toast.push("We got it. Check your WhatsApp for confirmation.", "success");
      router.push("/thank-you");
    } catch {
      toast.push("Network error. Please call us at " + SITE.phoneDisplay);
      setSubmitting(false);
    }
  }

  const fieldErr = (k: keyof FormState) => errors[k] ? "border-red-400" : "";

  return (
    <main className="pt-[var(--nav-h)]">
      <section className="section-pad bg-[var(--graphite-900)] text-white noise min-h-[85vh]">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--oak-300)] mb-6">
              <span className="w-8 h-px bg-[var(--oak-400)]" />
              Free 45-minute site visit
            </div>
            <h1 className="font-display text-[var(--fs-h1)] leading-[1.02] mb-6">
              Get your budget range<br />
              <span className="italic-serif text-[var(--oak-300)]">in 48 hours.</span>
            </h1>
            <p className="text-lg text-white/80 max-w-lg leading-relaxed mb-8">
              Tell us about your space. We'll schedule a walkthrough, ask the right questions, and
              send you an itemised budget range in 48 hours — no pitch deck, no follow-up spam.
            </p>

            <ul className="space-y-3 text-white/80 max-w-md" aria-label="What happens next">
              {[
                "45-minute walkthrough, on-site or virtual.",
                "You speak, we take notes and measurements.",
                "Budget range email within 48 hours.",
                "Zero obligation. Zero cold calls after.",
              ].map((b, i) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--oak-400)] flex-shrink-0" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60">
              <span>Or call:</span>
              <a href={`tel:${SITE.phoneTel}`} className="text-white font-medium hover:text-[var(--oak-300)] transition-colors">{SITE.phoneDisplay}</a>
              <a href={`https://wa.me/${SITE.whatsapp}`} className="text-white font-medium hover:text-[var(--oak-300)] transition-colors" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <form
              className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-sm"
              onSubmit={onSubmit}
              noValidate
              aria-describedby="form-note"
            >
              {/* Honeypot — hidden from users, visible to bots. Server rejects if filled. */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label>Company (leave blank)<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <div className="space-y-6">
                <Field
                  label="Your name"
                  name="name"
                  placeholder="e.g. Ayesha Malik"
                  required
                  autoComplete="name"
                  error={errors.name}
                  value={form.name}
                  onChange={(v) => onChange("name", v)}
                  className={fieldErr("name")}
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  placeholder="+92 3xx xxxxxxx"
                  required
                  autoComplete="tel"
                  error={errors.phone}
                  value={form.phone}
                  onChange={(v) => onChange("phone", v)}
                  className={fieldErr("phone")}
                />
                <Field
                  label="Email (optional)"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  error={errors.email}
                  value={form.email}
                  onChange={(v) => onChange("email", v)}
                  className={fieldErr("email")}
                />
                <SelectField
                  label="Space type"
                  name="space"
                  options={SPACE_OPTIONS}
                  value={form.space}
                  onChange={(v) => onChange("space", v)}
                />
                <div>
                  <label htmlFor="brief" className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                    Tell us about the project <span className="text-white/30">(optional)</span>
                  </label>
                  <textarea
                    id="brief"
                    name="brief"
                    rows={4}
                    value={form.brief}
                    onChange={(e) => onChange("brief", e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--oak-400)] transition resize-none"
                    placeholder="Area in sqft, location, rough timeline…"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="relative inline-flex items-center justify-center gap-3 font-medium tracking-wide uppercase px-8 py-4 text-[0.95rem] rounded-full overflow-hidden border border-white/30 text-white group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-400)] w-full mt-8 disabled:opacity-60"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-[var(--oak-400)] translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0"
                />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-[var(--graphite-900)] transition-colors duration-500">
                  {submitting ? "Sending…" : "Get my budget range in 48 hours →"}
                </span>
              </button>
              <p id="form-note" className="text-xs text-white/50 mt-4 leading-relaxed">
                We'll WhatsApp you a confirmation within 15 minutes during business hours.
                Your details are never shared.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

interface FieldProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}
function Field({ label, name, placeholder, type = "text", required, autoComplete, error, value, onChange, className }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-widest text-white/60 mb-2">
        {label}{required && <span className="text-[var(--accent)] ml-1" aria-hidden>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-err` : undefined}
        className={`w-full bg-transparent border-b border-white/20 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--oak-400)] transition ${className ?? ""}`}
      />
      {error && (
        <p id={`${name}-err`} role="alert" className="text-xs text-[var(--accent)] mt-2">
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}
function SelectField({ label, name, options, value, onChange, required }: SelectProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-widest text-white/60 mb-2">
        {label}{required && <span className="text-[var(--accent)] ml-1" aria-hidden>*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[var(--oak-400)] transition"
      >
        <option value="" className="bg-[var(--graphite-900)]">Select one</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[var(--graphite-900)]">{o}</option>
        ))}
      </select>
    </div>
  );
}
