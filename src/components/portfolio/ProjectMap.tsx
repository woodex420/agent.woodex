"use client";

import { PROJECTS } from "@/lib/content/projects";

/**
 * "By the numbers" band + project location strip (stylised map).
 * A simple, lightweight visualisation that doesn't require a mapping provider yet.
 */
const AGG = {
  projects: PROJECTS.length + 233, // 240+
  sqft: "1.2M+",
  clients: "120+",
  cities: "8",
};

export default function ProjectMap() {
  return (
    <section className="py-20 md:py-28 bg-[var(--graphite-900)] text-white relative noise">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--oak-300)] mb-5">
              <span className="w-8 h-px bg-[var(--oak-400)]" />
              By the numbers
            </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-8">
              A decade of builds<br />
              <span className="italic-serif text-[var(--oak-300)]">across Pakistan.</span>
            </h2>

            <div className="grid grid-cols-2 gap-0 border border-white/10 rounded-sm">
              {[
                { n: AGG.projects + "+", l: "Projects since 2014" },
                { n: AGG.sqft, l: "Sqft delivered" },
                { n: AGG.clients, l: "Clients" },
                { n: AGG.cities, l: "Cities" },
              ].map((s) => (
                <div key={s.l} className="p-6 border-r border-b border-white/10 last:border-r-0 [&:nth-child(-n+2)]:border-b-0 [&:nth-child(2)]:border-r">
                  <div className="font-display text-4xl md:text-5xl text-[var(--oak-300)] leading-none mb-2">{s.n}</div>
                  <div className="text-xs uppercase tracking-widest text-white/60">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stylised city map */}
          <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[440px] rounded-sm border border-white/10 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 500%22><g fill=%22none%22 stroke=%22%23333%22 stroke-width=%221%22><path d=%22M50,250 Q200,100 400,200 T750,220%22/><path d=%22M100,400 Q300,280 500,340 T760,330%22/><path d=%22M80,80 Q250,200 500,100 T760,180%22/><path d=%22M40,300 L760,290%22 stroke-dasharray=%224 6%22/></g></svg>')] bg-center bg-no-repeat bg-cover">
            {[
              { city: "Lahore", projects: 180, x: "48%", y: "45%" },
              { city: "Karachi", projects: 28, x: "18%", y: "70%" },
              { city: "Islamabad", projects: 22, x: "58%", y: "20%" },
              { city: "Faisalabad", projects: 5, x: "38%", y: "40%" },
              { city: "Multan", projects: 3, x: "30%", y: "60%" },
              { city: "Sialkot", projects: 2, x: "52%", y: "30%" },
            ].map((c) => (
              <div key={c.city} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={{ left: c.x, top: c.y }}>
                <span className="block w-3 h-3 rounded-full bg-[var(--oak-400)] ring-4 ring-[var(--oak-400)]/20 group-hover:scale-125 transition-transform" />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-white text-sm font-display">
                  {c.city}
                  <span className="ml-2 text-[var(--oak-300)] text-xs font-mono">{c.projects}</span>
                </div>
              </div>
            ))}
            <div className="absolute bottom-4 right-4 text-xs text-white/40 uppercase tracking-widest">Project locations · 2014-2025</div>
          </div>
        </div>
      </div>
    </section>
  );
}
