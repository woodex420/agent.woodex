import type { Metadata } from "next";
import LegalLayout, { Section } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service — Woodex Interior",
  description: "The agreement between us, written plainly. Pricing, payments, delays, what happens when the render doesn't match, and how disputes are resolved.",
};

export default function TermsPage() {
  return (
    <LegalLayout eyebrow="Terms of Service" title="How we work (legally)." updated="1 August 2025">
      <p className="font-display text-2xl italic-serif text-[var(--fg)] !mb-10">
        This is a real contract, written by us (not a copy-pasted US template). If any clause
        is unclear, ask before signing. We will happily rewrite the sentence.
      </p>

      <Section h="The short version">
        <p>
          We quote you a fixed price and a fixed handover date in writing. You pay on an agreed
          milestone schedule. We build exactly what you approved in 3D. If we mess up, we fix
          it at our cost. If you change your mind, we price the change in writing before we do it.
        </p>
      </Section>

      <Section h="Quote and scope">
        <p>
          Every project starts with a signed Scope of Work (SOW). The SOW lists every included
          item, finish, and deliverable, plus the Gantt schedule and the handover date in bold.
          Anything not written in the SOW is not included. Verbal promises are not part of the
          contract — if it matters, ask us to add it in writing.
        </p>
      </Section>

      <Section h="Payment">
        <p>Standard milestone schedule (we can adjust on projects above PKR 3 crore):</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>20% on signing — locks the workshop slot and starts drawings.</li>
          <li>20% on release of approved 3D renders and construction drawings.</li>
          <li>25% on completion of civil + MEP rough-in (verified on site).</li>
          <li>20% on installation of joinery / carcasses.</li>
          <li>10% on completion of finishing (paint, polish, hardware).</li>
          <li>5% retention, payable 14 days after handover — gives you time to find snags.</li>
        </ul>
        <p>
          All payments are by bank transfer or cross-cheque. Cash is accepted for the final
          10% only and against a signed receipt. We don't accept cash above PKR 2 lakh for tax
          reporting reasons.
        </p>
      </Section>

      <Section h="Change orders">
        <p>
          If you ask for something outside the signed SOW, we will send you a written Change
          Order with the additional cost and any impact on the handover date. Work starts on
          the change only after you sign (or reply "approve" on the project WhatsApp group).
          "We also did the cornice" is not a bill you will ever receive.
        </p>
      </Section>

      <Section h="If the build doesn't match the render">
        <p>
          We rebuild it at our cost. This clause is in every SOW. In 11 years it has been
          invoked twice (wrong marble; a bookshelf cut 40mm short). Both were rebuilt within
          the same week. The render-matching guarantee does not cover natural variation in
          stone or wood grain — those are one-of-one materials and we show you the actual
          slab before cutting.
        </p>
      </Section>

      <Section h="Delays">
        <p>
          The handover date in the SOW is firm when delays are within our control — labour,
          material, workshop scheduling. If we miss that date for reasons within our control,
          we credit you PKR 25,000 per week against the retention invoice. We have paid this
          twice in 11 years.
        </p>
        <p>
          Delays from your side (late decisions, change orders, delayed site access, pending
          payments) extend the date by the number of days you delayed us — documented in the
          weekly Friday Report. Force majeure (flood, earthquake, government lockdown) extends
          the date with no penalty and we will show you the disruption log.
        </p>
      </Section>

      <Section h="Warranty">
        <p>
          All joinery is warranted for 2 years against workmanship defects (hinges, drawer
          slides, delamination, glue failure). Polish and paint finish is 1 year. MEP (electrical,
          plumbing) is 1 year on labour; we will help you make the manufacturer claim on
          fittings (switches, sanitary) where warranty is longer. Natural movement of wood
          in summer/winter is normal and is covered by a free one-time adjustment in month 11.
        </p>
      </Section>

      <Section h="Termination">
        <p>
          Either side can terminate the contract with 14 days written notice. You pay for work
          completed up to the date of termination plus materials already cut for your project
          (those can't be reused). Designs and 3D renders are yours to keep even if we don't build.
          If we terminate (extremely rare — a non-paying client or hostile site conditions),
          we hand over all drawings and refund any unearned payment within 14 days.
        </p>
      </Section>

      <Section h="Disputes">
        <p>
          We require arbitration in Lahore before a single arbitrator (mutually agreed) before
          either side goes to court. This is faster and cheaper for everyone. Disputes are
          governed by the laws of Pakistan. We have never been to court with a client in 11 years
          and we'd like to keep it that way.
        </p>
      </Section>

      <Section h="Website content">
        <p>
          All photography on this site is our work (unless clearly credited). You are welcome
          to share articles from the Journal with attribution and a link. Do not scrape our
          cost tables to build a competitor SEO page — we will notice and we will send a
          takedown notice under copyright law.
        </p>
      </Section>

      <Section h="Questions?">
        <p>
          If there's anything in these terms you don't like, tell us before signing. Most of
          them are negotiable if the underlying ask is reasonable. These terms exist to make
          sure neither side is surprised — same as the builds.
        </p>
      </Section>
    </LegalLayout>
  );
}
