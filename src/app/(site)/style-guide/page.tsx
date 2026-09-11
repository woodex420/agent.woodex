import LinoxaButton from "@/components/linoxa/LinoxaButton";
import { SectionIntro } from "@/templates/sections";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Style Guide · Woodex Interior" };

export default function StyleGuidePage() {
  return (
    <main className="bg-[var(--bg)] pt-[var(--nav-h)]">
      <section className="section-pad">
        <div className="container-x">
          <SectionIntro kicker="Master theme" heading={<>Woodex Interior<br /><em className="italic-serif text-[var(--wood)]">Linoxa design system.</em></>}>
            <p>Navy / Cream / Wood · Plus Jakarta Sans · 24/16/12/pill radii · cubic-bezier(0.22,1,0.36,1).</p>
          </SectionIntro>

          <div className="mt-16 space-y-16">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] mb-6">Palette</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  {n:"Navy",v:"#0c1628",c:"var(--navy)",fg:"white"},
                  {n:"Navy-2",v:"#121e34",c:"var(--navy-2)",fg:"white"},
                  {n:"Card",v:"#152033",c:"var(--card)",fg:"white"},
                  {n:"Wood",v:"#b8956a",c:"var(--wood)",fg:"#0c1628"},
                  {n:"Cream",v:"#f4efe7",c:"var(--cream)",fg:"#0c1628"},
                  {n:"Muted",v:"#6a6560",c:"var(--muted)",fg:"white"},
                ].map(p => (
                  <div key={p.n} className="rounded-[var(--r-md)] overflow-hidden border border-[var(--border)]">
                    <div className="aspect-square" style={{background:p.c, color:p.fg}} />
                    <div className="p-3 text-xs">
                      <div className="font-medium">{p.n}</div>
                      <div className="text-[var(--muted)] font-mono">{p.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] mb-6">Typography</h3>
              <div className="space-y-4">
                <div className="font-display text-[var(--fs-display)] leading-[0.9]">Display</div>
                <h1>Heading 1 — Spacious</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
                <p className="max-w-2xl text-[var(--muted)] text-lg leading-relaxed">Body copy. Woodex Interior is a Lahore-based Design + Build studio for corporate workplaces, commercial interiors and selected residential.</p>
                <span className="kicker">Kicker label</span>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] mb-6">Buttons</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <LinoxaButton variant="dark">Dark</LinoxaButton>
                <LinoxaButton variant="cream">Cream</LinoxaButton>
                <LinoxaButton variant="wood">Wood</LinoxaButton>
                <LinoxaButton variant="outline-navy">Outline Navy</LinoxaButton>
                <LinoxaButton variant="light" className="!bg-[var(--navy)]">Outline Cream</LinoxaButton>
                <LinoxaButton variant="dark" size="sm">Small</LinoxaButton>
                <LinoxaButton variant="dark" size="lg">Large</LinoxaButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
