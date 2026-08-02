import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LOCATIONS, getLocation } from "@/lib/content/locations";
import Button from "@/components/ui/Button";

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ "city-slug": l.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ "city-slug": string }> }
): Promise<Metadata> {
  const { "city-slug": slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return { title: "Not found" };
  return {
    title: `Interior Designer in ${loc.name} — Woodex Interior`,
    description: `Design-and-build interior studio in ${loc.name}. ${loc.projectCount}+ projects delivered since ${loc.servedSince}. Fixed prices, fixed dates, 3D-first process. Book a free walkthrough.`,
  };
}

export default async function LocationPage({ params }: { params: Promise<{ "city-slug": string }> }) {
  const { "city-slug": slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  return (
    <main className="pt-[calc(var(--nav-h)+3rem)]">
      <section className="pb-16">
        <div className="container-x">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-8">
            <Link href="/" className="hover:text-[var(--oak-600)]">Home</Link>
            <span>/</span>
            <span>Locations</span>
            <span>/</span>
            <span className="text-[var(--oak-600)]">{loc.name}</span>
          </nav>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-6">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            Interior designer in {loc.name}
          </div>
          <h1 className="font-display text-[var(--fs-display)] leading-[0.98] tracking-tight max-w-4xl mb-8">
            {loc.projectCount}+ spaces built<br />
            <span className="italic-serif text-[var(--oak-600)]">across {loc.name.toLowerCase()}.</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--fg-muted)] leading-relaxed max-w-2xl mb-8 md:mb-10">{loc.heroLine}</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            <Button href="/consultation" magnetic size="lg" className="w-full sm:w-auto justify-center">Book a walkthrough in {loc.name} →</Button>
            <Button href={`https://wa.me/${loc.phone.replace(/\D/g, "")}`} variant="outline" size="lg" className="w-full sm:w-auto justify-center">WhatsApp us</Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--bg-subtle)]">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)]">
          {[
            { n: `${loc.servedSince}`, l: "Serving since" },
            { n: `${loc.projectCount}+`, l: "Projects delivered" },
            { n: "98%", l: "On-time handover" },
            { n: "48 hrs", l: "Budget range turnaround" },
          ].map((s) => (
            <div key={s.l} className="bg-[var(--bg-subtle)] p-8">
              <div className="font-display text-5xl text-[var(--oak-600)] leading-none">{s.n}</div>
              <div className="text-xs uppercase tracking-widest text-[var(--fg-muted)] mt-3">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-5">
              <span className="w-8 h-px bg-[var(--oak-500)]" />
              Areas we cover
            </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-8">
              From DHA to <span className="italic-serif text-[var(--oak-600)]">Sundar Road.</span>
            </h2>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
              {loc.areas.map((a) => (
                <div key={a} className="flex items-center gap-3 text-[var(--fg)] border-b border-[var(--border)] pb-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--oak-500)" strokeWidth="2" className="w-4 h-4 flex-shrink-0"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-5">
              <span className="w-8 h-px bg-[var(--oak-500)]" />
              Honest price bands
            </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-8">
              PKR per sqft,<br /><span className="italic-serif text-[var(--oak-600)]">as of 2025.</span>
            </h2>
            <div className="space-y-px bg-[var(--border)] border border-[var(--border)]">
              {loc.ranges.map((r) => (
                <div key={r.label} className="bg-[var(--bg)] p-5 flex items-center justify-between">
                  <div className="font-display text-xl">{r.label}</div>
                  <div className="font-mono text-[var(--oak-600)]">PKR {r.low.toLocaleString()}–{r.high.toLocaleString()}/sqft</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--fg-subtle)] mt-4 leading-relaxed">
              Mid-tier finishes, full MEP, contractor with on-time labour. Excludes land, HVAC plant, and imported items landed at port.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--graphite-900)] text-white">
        <div className="container-x">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--oak-300)] mb-5">
            <span className="w-8 h-px bg-[var(--oak-400)]" />
            Recent {loc.name} projects
          </div>
          <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-12 text-white">
            A few you can <span className="italic-serif text-[var(--oak-300)]">drive past.</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {loc.projects.map((p) => (
              <div key={p.client} className="bg-[var(--graphite-900)] p-6">
                <div className="font-mono text-xs text-[var(--oak-300)] tracking-widest mb-3">{p.year} · {p.area}</div>
                <h3 className="font-display text-2xl leading-tight mb-3 text-white">{p.client}</h3>
                <div className="text-sm text-white/60">{p.sqft.toLocaleString()} sqft</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-5">
              <span className="w-8 h-px bg-[var(--oak-500)]" />
              Visit / Call
            </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-6">Studio &amp; workshop</h2>
            <p className="text-[var(--fg-muted)] leading-relaxed mb-8">{loc.address}</p>
            <dl className="space-y-4 text-[var(--fg)]">
              <Info k="Phone"><a href={`tel:${loc.phone}`} className="hover:text-[var(--oak-600)]">{loc.phone}</a></Info>
              <Info k="WhatsApp"><a href={`https://wa.me/${loc.phone.replace(/\D/g, "")}`} className="hover:text-[var(--oak-600)]">Message us</a></Info>
              <Info k="Hours">Mon–Sat, 10am–7pm</Info>
            </dl>
          </div>
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-5">
              <span className="w-8 h-px bg-[var(--oak-500)]" />
              Local FAQ
            </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-8">
              {loc.name}-specific questions.
            </h2>
            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {loc.faqs.map((f, i) => (
                <details key={f.q} className="group py-6">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                    <div className="flex gap-5 items-start">
                      <span className="font-mono text-xs text-[var(--oak-500)] mt-2 tracking-widest flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="font-display text-xl md:text-2xl leading-tight group-open:text-[var(--oak-600)] transition-colors">{f.q}</h3>
                    </div>
                    <span className="w-8 h-8 rounded-full border border-[var(--border-strong)] flex items-center justify-center flex-shrink-0 group-open:rotate-45 group-open:bg-[var(--fg)] group-open:text-[var(--bg)] group-open:border-[var(--fg)] transition-all duration-500">+</span>
                  </summary>
                  <p className="pt-4 pl-[3.25rem] pr-10 text-[var(--fg-muted)] text-lg leading-relaxed max-w-2xl">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[90px_1fr] gap-6 pt-3 border-t border-[var(--border)]">
      <dt className="text-xs uppercase tracking-widest text-[var(--fg-subtle)] pt-1">{k}</dt>
      <dd>{children}</dd>
    </div>
  );
}
