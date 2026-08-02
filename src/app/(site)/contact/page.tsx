import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import StudioMap from "@/components/contact/StudioMap";
import ContactFAQ from "@/components/contact/ContactFAQ";
import { faqLd, breadcrumbLd } from "@/lib/schema";
import { CONTACT_FAQS } from "@/lib/content/faqs";

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

export default function ContactPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactBreadcrumb) }} />
      <ContactHero />
      <ContactForm />
      <StudioMap />
      <ContactFAQ />
    </main>
  );
}
