"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

/**
 * BlogCTA — low-key newsletter / "get a quote range" closer.
 * Anti-anxiety: tells them exactly what they'll get and how often.
 */
export default function BlogCTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company: "" }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) {
        toast.push(data.error ?? "Something went wrong.");
        setSubmitting(false);
        return;
      }
      setSent(true);
      toast.push("You're on the list. Next email when our numbers change.", "success");
    } catch {
      toast.push("Network error. Try again.");
      setSubmitting(false);
    }
  }
  return (
    <section className="py-24 bg-[var(--bg)]">
      <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-5">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            Occasional emails
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">
            Two emails a year.<br />
            <span className="italic-serif text-[var(--oak-600)]">Only when prices move.</span>
          </h2>
          <p className="text-[var(--fg-muted)] text-lg leading-relaxed max-w-lg">
            We don't send weekly newsletters. When marble, labour, or import prices move
            enough that our per-sqft bands change, we send one email with the new numbers.
            You can unsubscribe in one click. Two emails in 2024, three so far in 2025.
          </p>
        </div>
        <div className="lg:col-span-6">
          {sent ? (
            <div className="border border-[var(--oak-500)] bg-[var(--oak-50)] p-10">
              <div className="font-display text-3xl mb-2 text-[var(--oak-800)]">Cheers.</div>
              <p className="text-[var(--fg-muted)]">
                You're on the list. Next email when our numbers actually change — not before.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="bg-[var(--surface-1)] border border-[var(--border)] p-8 md:p-10">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 border-b border-[var(--border-strong)] bg-transparent py-3 px-1 text-lg focus:outline-none focus:border-[var(--oak-500)] transition"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="relative inline-flex items-center justify-center gap-2 font-medium tracking-wide uppercase px-8 py-4 text-[0.95rem] rounded-full overflow-hidden border border-[var(--fg)] text-[var(--fg)] group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-500)] flex-shrink-0 disabled:opacity-60"
                >
                  <span aria-hidden className="absolute inset-0 -z-10 bg-[var(--oak-500)] translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500">
                    {submitting ? "Saving…" : "Subscribe →"}
                  </span>
                </button>
              </div>
              <p className="text-xs text-[var(--fg-subtle)] mt-5 leading-relaxed">
                We never sell your email. One-click unsubscribe. No marketing filler.
              </p>

              <div className="mt-8 pt-6 border-t border-[var(--border)] text-sm text-[var(--fg-muted)]">
                Planning a real project and need numbers faster?{" "}
                <Button href="/consultation" variant="inline">Book a free walkthrough →</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
