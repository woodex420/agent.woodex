import type { Metadata } from "next";
import LegalLayout, { Section } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Woodex Interior",
  description: "What we collect, why we collect it, and how long we keep it. Plain English, same as our quotes.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout eyebrow="Privacy Policy" title="Your data. Plainly." updated="1 August 2025">
      <p className="font-display text-2xl italic-serif text-[var(--fg)] !mb-10">
        We run an interior design studio, not a data business. We collect the minimum we
        need to schedule your walkthrough and build your space — that's it.
      </p>

      <Section h="What we collect, and why">
        <p>
          When you submit the contact form, book a consultation, WhatsApp us, or call, we collect:
          your name, phone number, email (if you give one), and whatever you tell us about
          your project. That's four fields plus your message. We need these to reply to you,
          schedule a walkthrough, and eventually send a budget range and quote.
        </p>
        <p>
          On the website itself we collect anonymised analytics via GA4 (page views, country,
          device type) so we can see which pages people actually read. IPs are anonymised.
          We don't fingerprint, we don't retarget, and we don't sell your attention to ad networks.
        </p>
      </Section>

      <Section h="Cookies">
        <p>
          We use one first-party cookie to remember your light/dark theme preference and one
          to count unique visitors in analytics. No third-party advertising cookies, no Meta
          Pixel, no TikTok pixel. If you turn on "Do Not Track" we respect it and don't fire analytics.
        </p>
      </Section>

      <Section h="Who we share your data with">
        <p>Short list:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Our project team</strong> — the director scheduling your walkthrough and the designer who will attend.</li>
          <li><strong>WhatsApp Business</strong> (Meta) — if you message us there, governed by their privacy policy.</li>
          <li><strong>HubSpot</strong> (Sprint 6) — our CRM of record, where we store the project brief and your contact. Their EU/US data processing terms apply.</li>
          <li><strong>Vercel</strong> — our host. They see request logs as part of serving the site.</li>
        </ul>
        <p>That is the entire list. We do not sell, rent, or trade your contact information. Ever.</p>
      </Section>

      <Section h="How long we keep it">
        <p>
          If you contact us and do not proceed with a walkthrough, we delete your details within
          180 days. If you become a client, we retain project records (drawings, invoices,
          correspondence) for 7 years for tax and warranty purposes — that's the legal requirement
          in Pakistan for service businesses. After 7 years they are purged from active systems.
        </p>
      </Section>

      <Section h="Your rights">
        <p>
          You can ask for a copy of every piece of data we hold on you, ask us to correct it,
          or ask us to delete it (subject to the 7-year retention above). Email
          woodexinterior.pk@gmail.com with the subject line "Data request" and we will respond within
          7 working days. There is no form and no fee.
        </p>
      </Section>

      <Section h="Breach notification">
        <p>
          If your data is ever exposed in a breach we will notify you within 72 hours of us
          discovering it, on the phone number or email we have on file. We have never had to
          send this notice.
        </p>
      </Section>

      <Section h="Questions?">
        <p>
          Email woodexinterior.pk@gmail.com, WhatsApp us on the number at the top of every page,
          or walk in to the Sundar Road workshop during business hours. We don't have a DPO
          — the founder is responsible for data, same as he is for the build.
        </p>
      </Section>
    </LegalLayout>
  );
}
