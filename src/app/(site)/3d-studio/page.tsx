import StudioHero from "@/components/studio/StudioHero";
import RenderVsReality from "@/components/studio/RenderVsReality";
import MaterialSwap from "@/components/studio/MaterialSwap";
import Deliverables from "@/components/studio/Deliverables";
import PublishedPricing from "@/components/studio/PublishedPricing";
import CTAFinal from "@/components/home/CTAFinal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D Studio — Renders so precise we guarantee them · Woodex Interior",
  description:
    "In-house 3D visualisation studio. Photoreal renders, 360° panoramas, material swaps — with a contractual guarantee that the build matches what you approved.",
};

export default function StudioPage() {
  return (
    <main>
      <StudioHero />

      {/* Positioning */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
              <span className="w-8 h-px bg-[var(--oak-500)]" />
              Why in-house
            </div>
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-8">
              Most studios outsource renders<br />
              <span className="italic-serif text-[var(--oak-600)]">to a freelancer who never sees the site.</span>
            </h2>
            <div className="space-y-5 text-lg text-[var(--fg-muted)] leading-relaxed max-w-3xl">
              <p>
                That's why the marble in the render doesn't exist. It's why the sofa is two inches too big for the wall.
                It's why "we'll match it as close as possible" is the most expensive sentence in interior design.
              </p>
              <p>
                Our 3D team is in the same room as our project managers. They attend site visits. They argue with
                the carpenters about tolerances. Their renders aren't marketing — they're construction documents.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mt-12 pt-10 border-t border-[var(--border)]">
              {[
                { n: "9", l: "3D artists in-house" },
                { n: "4K", l: "Standard render resolution" },
                { n: "100%", l: "Renders deductible from build" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-4xl text-[var(--oak-600)] leading-none">{s.n}</div>
                  <div className="text-xs uppercase tracking-widest text-[var(--fg-subtle)] mt-2">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RenderVsReality />
      <MaterialSwap />
      <Deliverables />
      <PublishedPricing />

      {/* FAQ mini */}
      <section className="section-pad bg-[var(--graphite-900)] text-white">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--oak-300)] mb-5">
              <span className="w-8 h-px bg-[var(--oak-400)]" />
              Studio FAQ
            </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">
              Short answers<br />
              <span className="italic-serif text-[var(--oak-300)]">before you ask.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
            {[
              { q: "How long does a typical visualisation take?", a: "A single room: 10-14 days from brief to delivery. A full home or office floor: 3-4 weeks. Material variants and extra angles extend this; we quote timelines up front." },
              { q: "Who owns the renders?", a: "You do. All source files are handed over at delivery. You can use them for investor decks, sales, social media, printed collateral — no licensing, no watermarks." },
              { q: "Do you do 3D for projects you don't build?", a: "Yes. Roughly 20% of our studio work is for external architects, developers, or homeowners who have their own builder. The 3D-to-build guarantee only applies when we also do the build." },
              { q: "How many revisions?", a: "Concept includes 2 rounds; Full Visualisation includes 2; Project Rendering includes unlimited during the concept phase (then 2 rounds of detail revision). Additional rounds are billed at PKR 15k/round — quoted before work starts." },
            ].map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="cursor-pointer list-none flex justify-between items-start gap-6">
                  <h3 className="font-display text-xl md:text-2xl leading-tight group-hover:text-[var(--oak-300)] transition-colors">{f.q}</h3>
                  <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-white/70 text-lg leading-relaxed max-w-2xl pr-12">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTAFinal />
    </main>
  );
}
