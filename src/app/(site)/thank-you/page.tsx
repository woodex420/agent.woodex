"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { SITE, SLA } from "@/lib/config";
import { useEffect } from "react";

export default function ThankYouPage() {
  // Hide chat widget after a form conversion for this session
  useEffect(() => {
    try { sessionStorage.setItem("woodex_booked", "1"); } catch {}
  }, []);

  const steps = [
    { t: "Within 15 minutes", b: "A WhatsApp confirmation from Zara (Client Lead) confirming your preferred walkthrough slot." },
    { t: "Within 48 hours", b: "An itemised budget range via email + WhatsApp, after your free 45-minute walkthrough." },
    { t: "Day 3–10", b: "If you proceed, formal fixed-price quote with day-by-day Gantt and handover date in bold." },
  ];

  return (
    <main className="pt-[var(--nav-h)]">
      <section className="section-pad min-h-[80vh] flex items-center">
        <div className="container-x max-w-3xl">
          <div className="w-20 h-20 rounded-full bg-[var(--oak-500)] text-white flex items-center justify-center mb-8 text-4xl">✓</div>
          <h1 className="font-display text-[var(--fs-h1)] leading-[1.05] mb-6">
            We got it.
          </h1>
          <p className="text-xl text-[var(--fg-muted)] leading-relaxed mb-12 max-w-2xl">
            Your request is in. Here's exactly what happens next — no silence, no surprises.
          </p>

          <div className="grid gap-px bg-[var(--border)] border border-[var(--border)] mb-12">
            {steps.map((s, i) => (
              <div key={s.t} className="bg-[var(--bg)] p-6 md:p-8 grid md:grid-cols-[180px_1fr] gap-3 md:gap-8">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-sm text-[var(--oak-600)] tracking-widest mt-1">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-xl">{s.t}</span>
                </div>
                <p className="text-[var(--fg-muted)] leading-relaxed md:pt-1">{s.b}</p>
              </div>
            ))}
          </div>

          <div className="bg-[var(--bg-subtle)] border-l-2 border-[var(--oak-500)] p-6 md:p-8 mb-10">
            <p className="text-lg leading-relaxed mb-4">
              Need something faster? Call or message directly — Zara answers WhatsApp in
              under {SLA.whatsappReply * 60} minutes during business hours.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`https://wa.me/${SITE.whatsapp}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--fg)] text-[var(--fg)] hover:bg-[var(--oak-500)] hover:border-[var(--oak-500)] hover:text-white transition-all duration-500 uppercase text-sm tracking-wide font-medium">
                WhatsApp now →
              </a>
              <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full hover:text-[var(--oak-600)] transition-colors uppercase text-sm tracking-wide font-medium">
                Call {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <Button href="/" variant="outline">Back to home</Button>
            <Button href="/portfolio" variant="ghost">See recent work →</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
