"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { SITE, SLA } from "@/lib/config";

/**
 * ContactHero — anti-anxiety hero.
 * Per §8: opens with the visitor's situation (not "we'd love to hear from you"),
 * states response times, offers three contact channels, defuses tension.
 */
export default function ContactHero() {
  const whatsappHref = `https://wa.me/${SITE.whatsapp}`;
  return (
    <section className="pt-[calc(var(--nav-h)+2rem)] md:pt-[calc(var(--nav-h)+3rem)] pb-16 md:pb-20 bg-[var(--bg)]">
      <div className="container-x grid lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs uppercase tracking-[0.22em] md:tracking-[0.3em] text-[var(--fg-muted)] mb-5 md:mb-6">
            <span className="w-6 md:w-8 h-px bg-[var(--oak-500)]" />
            Get in touch
          </div>
          <h1 className="font-display text-[var(--fs-display)] leading-[0.98] tracking-tight mb-6 md:mb-8 max-w-[15ch] md:max-w-none">
            You probably want a<br />
            <span className="italic-serif text-[var(--oak-600)]">budget range first.</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--fg-muted)] leading-relaxed max-w-xl mb-8 md:mb-10">
            Most people who contact us aren't ready to sign — they want to know roughly
            what a build will cost and roughly how long it will take. We'll tell you
            both within 48 hours. No pitch. No pressure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-2xl">
            <ChannelCard
              title="Call the studio"
              detail={SITE.phoneDisplay}
              href={`tel:${SITE.phoneTel}`}
              sub={SITE.hoursShort}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M3 5a2 2 0 012-2h2l2 5-2.5 1.5a11 11 0 005 5L13 12l5 2v2a2 2 0 01-2 2C9.373 18 3 11.627 3 5z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              }
            />
            <ChannelCard
              title="WhatsApp"
              detail="Message us"
              href={whatsappHref}
              sub={`< ${Math.round(SLA.whatsappReply * 60)} min reply, business hrs`}
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.26-1.38c1.45.79 3.09 1.2 4.78 1.2 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.49 14.07c-.23.65-1.34 1.24-1.85 1.32-.47.07-1.08.1-1.74-.11-.4-.13-.92-.3-1.58-.58-2.78-1.21-4.6-4-4.74-4.19-.14-.19-1.14-1.52-1.14-2.9s.72-2.05.97-2.33c.25-.28.55-.35.73-.35.18 0 .37 0 .52.01.17.01.39-.06.61.47.23.54.78 1.86.85 2 .07.13.11.29.02.47-.09.18-.13.29-.26.44-.13.15-.27.33-.38.45-.13.13-.26.27-.11.52.14.25.64 1.06 1.37 1.72.94.84 1.74 1.1 1.99 1.22.25.13.4.11.54-.07.15-.18.62-.73.78-.97.16-.25.33-.21.55-.13.22.08 1.42.67 1.66.8.25.12.41.18.47.28.07.1.07.59-.17 1.23z"/></svg>
              }
            />
            <ChannelCard
              title="Studio visit"
              detail={SITE.address.city.split(",")[0]}
              href="#map"
              sub="By appointment only"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M12 22s7-7.58 7-13a7 7 0 00-14 0c0 5.42 7 13 7 13z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="9" r="2.5"/></svg>
              }
            />
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="bg-[var(--surface-3)] text-white p-8 md:p-10 noise rounded-sm">
            <div className="text-xs uppercase tracking-widest text-[var(--oak-300)] mb-4">
              Response times
            </div>
            <ul className="space-y-4 text-white/85 text-base leading-relaxed">
              <ResponseRow label="WhatsApp" value={`< ${Math.round(SLA.whatsappReply * 60)} minutes, business hrs`} />
              <ResponseRow label="Phone" value="When we pick up — usually first ring" />
              <ResponseRow label="Form / email" value={`Same business day, under ${SLA.formReply} hrs`} />
              <ResponseRow label="Budget range" value={`Within ${SLA.budgetRangeHours} hours of your walkthrough`} />
              <ResponseRow label="Formal quote" value={`${SLA.formalQuoteDays} working days after brief sign-off`} />
            </ul>
            <div className="mt-8 pt-6 border-t border-white/15 text-sm text-white/60 leading-relaxed">
              If this is your first project and you don't know what to ask, that's
              normal. Start with WhatsApp — Zara will ask you the right questions
              and tell you if we're a good fit in about five messages.
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function ChannelCard({
  title, detail, sub, href, icon,
}: { title: string; detail: string; sub: string; href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group block p-5 border border-[var(--border)] bg-[var(--surface-1)] hover:border-[var(--oak-500)] hover:bg-[var(--bg-subtle)] transition-all duration-500"
    >
      <div className="text-[var(--oak-600)] mb-3 group-hover:scale-110 transition-transform duration-500 origin-left">{icon}</div>
      <div className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-1">{title}</div>
      <div className="font-display text-lg leading-tight text-[var(--fg)] group-hover:text-[var(--oak-600)] transition-colors mb-1">{detail}</div>
      <div className="text-xs text-[var(--fg-subtle)]">{sub}</div>
    </a>
  );
}

function ResponseRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-start justify-between gap-4">
      <span className="text-white/60 text-sm uppercase tracking-wider flex-shrink-0 pt-0.5">{label}</span>
      <span className="text-right text-white">{value}</span>
    </li>
  );
}
