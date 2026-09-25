import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import StudioMap from "@/components/contact/StudioMap";
import { SectionHero, SectionFAQ, SectionCTA } from "@/templates/sections";
import LinoxaButton from "@/components/linoxa/LinoxaButton";
import { faqLd, breadcrumbLd } from "@/lib/schema";
import { CONTACT_FAQS } from "@/lib/content/faqs";
import { SITE, SLA } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact — Woodex Interior, Lahore",
  description:
    "Call, WhatsApp, or send us four fields. Response under 15 minutes in business hours. Budget range within 48 hours of your free walkthrough. No pitch deck, no cold calls.",
};

const contactFaqSchema = faqLd(CONTACT_FAQS);
const contactBreadcrumb = breadcrumbLd([
  { name: "Home", url: "/" },
  { name: "Contact" },
]);

const CONTACT_BLOCKS = [
  { label: "Call / WhatsApp", value: SITE.phoneDisplay, href: `https://wa.me/${SITE.whatsapp}`, note: "Reply within 15 minutes in business hours" },
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, note: "Reply within one working day" },
  { label: "Studio", value: `${SITE.address.line1}, ${SITE.address.city}`, href: "https://maps.google.com/?q=M-71+Zainab+Tower+Model+Town+Link+Road+Lahore", note: SITE.hoursShort },
];

export default function ContactPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactBreadcrumb) }} />

      <SectionHero
        height="inner"
        kicker="Start your project"
        title={<>Tell us what you're <em className="italic-serif text-[var(--wood)]">planning.</em></>}
        subtitle="Four fields. A 15-minute reply during business hours. A budget range within 48 hours. No pitch deck, no cold calls."
        image="/images/hero-commercial.jpg"
      >
        <div className="flex flex-wrap gap-4 mt-2">
          <LinoxaButton variant="cream" size="lg" magnetic href={`https://wa.me/${SITE.whatsapp}?text=Hi%20Woodex%2C%20I%27d%20like%20to%20discuss%20a%20project.`} target="_blank" rel="noopener">WhatsApp us now</LinoxaButton>
          <LinoxaButton variant="outline" size="lg" href={`tel:${SITE.phoneTel}`}>Call {SITE.phoneDisplay}</LinoxaButton>
        </div>
      </SectionHero>

      {/* Contact blocks */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-x grid md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {CONTACT_BLOCKS.map((b) => (
            <a key={b.label} href={b.href} target="_blank" rel="noopener" className="group bg-[var(--bg)] p-7 md:p-9 hover:bg-[var(--cream-2)] transition-colors">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] mb-4">{b.label}</div>
              <div className="font-display text-xl md:text-2xl leading-tight mb-3 group-hover:text-[var(--wood)] transition-colors">{b.value}</div>
              <div className="text-sm text-[var(--muted)]">{b.note}</div>
            </a>
          ))}
        </div>
      </section>

      <ContactForm />
      <StudioMap />
      <SectionFAQ kicker="Contact — FAQ" heading="Things people usually ask before getting in touch." items={CONTACT_FAQS} />

      <SectionCTA
        kicker="Prefer to walk in?"
        heading={<>Come by the <em className="italic-serif text-[var(--wood)]">studio.</em></>}
        body={`${SITE.address.line1}, ${SITE.address.city}. ${SITE.hoursShort}. Call ahead and we will have coffee waiting.`}
        cta={{ label: "Get directions", href: "https://maps.google.com/?q=M-71+Zainab+Tower+Model+Town+Link+Road+Lahore" }}
      />
    </main>
  );
}
