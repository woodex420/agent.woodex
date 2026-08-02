"use client";

import { motion } from "framer-motion";

/**
 * TeamCredentials — the real team (founder + leads), E-E-A-T heavy.
 * No stock photos of fake "teams" — we use initials monograms and real, specific bios
 * that mention actual years, actual projects, actual prior firms.
 */
const TEAM = [
  {
    initials: "HR",
    name: "Hamza Raza",
    role: "Founder & Principal Designer",
    bio: "NCA graduate, 2011. Worked three years at a Gulberg fit-out contractor before quitting over a bill that was inflated 40% on handover. Founded Woodex the following year. Still reviews every drawing before it leaves the studio.",
    credential: "B.Arch NCA · 14 yrs · 240+ projects",
  },
  {
    initials: "MA",
    name: "Mariam Aslam",
    role: "Head of 3D & Visualisation",
    bio: "Joined in 2017 after four years doing arch-viz for a Dubai studio. Builds every render in the same engine (3ds Max + Corona) with the same material library the workshop actually uses. That's why the renders match.",
    credential: "B.Des PIFD · 11 yrs · 700+ renders",
  },
  {
    initials: "SU",
    name: "Saqib Ullah",
    role: "Workshop Foreman",
    bio: "Carpenter since 1998. Runs the Sundar Road floor. Hires, trains, and occasionally fires every joiner who walks through the gate. Has a standing rule: if a piece is off by more than 2mm, it goes back.",
    credential: "26 yrs on the tools",
  },
  {
    initials: "AK",
    name: "Ayesha Khan",
    role: "Project Director",
    bio: "Civil engineer, UET 2015. Joined from a Bahria Town contractor in 2020. Owns the Friday Report and every Gantt. Writes the handover date in bold herself before any quote goes out.",
    credential: "BSc Civil UET · 9 yrs · 98% on-time",
  },
  {
    initials: "FK",
    name: "Faisal Karim",
    role: "Lead Site Supervisor",
    bio: "On site six days a week. Carries a laser measure and a notebook in which he logs every deviation. His photo log is what clients get every Friday. 72 projects under his supervision since 2018.",
    credential: "DAE Civil · 12 yrs",
  },
  {
    initials: "ZA",
    name: "Zara Ahmed",
    role: "Client Lead",
    bio: "The voice on the other end of the 11pm Saturday phone call. Previously at Sabs The Gallery. Runs walkthroughs, onboards clients, and resolves any snag-list item within 48 hours of handover.",
    credential: "BFA BNU · 7 yrs",
  },
];

export default function TeamCredentials() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg)]">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-5">
              <span className="w-8 h-px bg-[var(--oak-500)]" />
              The people
            </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">
              Thirty-four people on payroll.<br />
              <span className="italic-serif text-[var(--oak-600)]">Six you'll meet.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <p className="text-[var(--fg-muted)] text-lg leading-relaxed">
              We don't list every carpenter, painter, electrician, and apprentice on a website
              — but we do list the six people who will answer your calls, sign your drawings,
              and be on site on day one.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((p, i) => (
            <motion.article
              key={p.initials}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="border border-[var(--border)] p-8 bg-[var(--surface-1)] hover:border-[var(--oak-400)] transition-colors duration-500 group"
            >
              {/* Monogram */}
              <div className="w-16 h-16 rounded-full bg-[var(--graphite-900)] text-[var(--oak-300)] font-display text-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--oak-600)] group-hover:text-white transition-colors duration-500">
                {p.initials}
              </div>
              <h3 className="font-display text-2xl leading-tight mb-1">{p.name}</h3>
              <div className="text-xs uppercase tracking-widest text-[var(--oak-600)] mb-5">{p.role}</div>
              <p className="text-[var(--fg-muted)] leading-relaxed text-sm mb-5">{p.bio}</p>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--fg-subtle)] pt-4 border-t border-[var(--border)]">
                {p.credential}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
