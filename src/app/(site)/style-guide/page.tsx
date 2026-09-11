import LinoxaButton from "@/components/linoxa/LinoxaButton";
import { SectionIntro } from "@/templates/sections";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Style Guide · Woodex Interior" };

export default function StyleGuidePage() {
  return (
    <main className="bg-[var(--bg)] pt-[var(--nav-h)]">
      <section className="section-pad">
        <div className="container-x">
          <SectionIntro kicker="Master theme" heading={<>Woodex Interior<br /><em className="accent-i">Linoxa design system.</em></>}>
            <p>Black · Beige #fcf2e8 · Deep Navy · Plus Jakarta Sans · pill buttons with circular arrow.</p>
          </SectionIntro>

          <div className="mt-16 space-y-16">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.28em] text-[var(--charcoal)] mb-6">Palette</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {[
                  {n:"Black",c:"var(--black)",fg:"white",v:"#000000"},
                  {n:"Jet",c:"var(--jet)",fg:"white",v:"#111111"},
                  {n:"Navy",c:"var(--navy)",fg:"white",v:"#0f1e36"},
                  {n:"Charcoal",c:"var(--charcoal)",fg:"white",v:"#525252"},
                  {n:"Silver",c:"var(--silver)",fg:"black",v:"#c0c0c0"},
                  {n:"Deep Gray",c:"var(--deepgray)",fg:"black",v:"#d9d9d9"},
                  {n:"Light Gray",c:"var(--lightgray)",fg:"black",v:"#e3e1e1"},
                  {n:"Beige",c:"var(--beige)",fg:"black",v:"#fcf2e8"},
                ].map(p=>(
                  <div key={p.n} className="rounded-[var(--r-md)] overflow-hidden border border-[var(--border)]">
                    <div className="aspect-square" style={{background:p.c,color:p.fg}} />
                    <div className="p-3 text-xs">
                      <div className="font-medium">{p.n}</div>
                      <div className="text-[var(--charcoal)] font-mono">{p.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.28em] text-[var(--charcoal)] mb-6">Typography</h3>
              <div className="space-y-4">
                <div className="font-display" style={{fontSize:"var(--fs-h1)",lineHeight:"var(--lh-h1)",fontWeight:500}}>Heading 1</div>
                <h2>Heading 2 — Spacious</h2>
                <h3>Heading 3</h3>
                <h4>Heading 4</h4>
                <h5>Heading 5</h5>
                <h6>Heading 6</h6>
                <p className="max-w-2xl">Body copy. Woodex Interior is a Lahore-based Design + Build studio. <em className="accent-i">Accent italic phrase.</em></p>
                <span className="kicker">Kicker label</span>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.28em] text-[var(--charcoal)] mb-6">Buttons</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <LinoxaButton variant="dark">Dark (primary)</LinoxaButton>
                <LinoxaButton variant="outline">Outline</LinoxaButton>
                <LinoxaButton variant="dark" size="sm">Small</LinoxaButton>
                <LinoxaButton variant="dark" size="lg">Large</LinoxaButton>
                <LinoxaButton variant="cream" className="!bg-[var(--navy)]">Cream on dark</LinoxaButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
