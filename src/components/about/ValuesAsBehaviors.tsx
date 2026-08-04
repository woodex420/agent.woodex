"use client";

import { motion } from "framer-motion";

/**
 * ValuesAsBehaviors — NOT "Integrity / Excellence / Passion" adjectives.
 * Per PRD copy rules: values are specific behaviors you'd see on site.
 */
const VALUES = [
  {
    num: "01",
    title: "The date is in bold.",
    body: "Every quote ends with a handover date. If we miss it for any reason within our control, the client gets PKR 25,000 per week credited back. We've paid this twice in 12 years. We have the receipts.",
  },
  {
    num: "02",
    title: "The bill doesn't grow.",
    body: "Scope changes are documented, quoted, and signed before work starts. No surprise add-ons at handover. 'Oh we also had to do the cornice' is not a sentence our clients hear.",
  },
  {
    num: "03",
    title: "If the build doesn't match the render, we redo it.",
    body: "That clause is in every SOW. In 12 years it has been invoked twice. We rebuilt both — wrong marble, and a bookshelf cut 40mm short — within the same week.",
  },
  {
    num: "04",
    title: "Friday 5pm, every Friday.",
    body: "Every client gets a one-page Friday Report: what got done this week, what's next, photos, decisions needed, risks flagged. No exceptions. No silence.",
  },
  {
    num: "05",
    title: "We answer the phone at 11pm on Saturday.",
    body: "During active builds, the project lead's personal number is on the client's fridge. Pipes burst. Paint colour looks wrong under evening light. That's our problem, not theirs.",
  },
  {
    num: "06",
    title: "Carpenters get paid on the 3rd.",
    body: "Not a client-facing value — but the root of every other one. If the people on site are getting paid on time, the client gets the date. If they aren't, nothing else matters.",
  },
];

export default function ValuesAsBehaviors() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg)]">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-5">
              <span className="w-8 h-px bg-[var(--oak-500)]" />
              How we actually behave
            </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05]">
              Values aren't posters.<br />
              <span className="italic-serif text-[var(--oak-600)]">They're things you do.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 flex items-end">
            <p className="text-[var(--fg-muted)] text-lg leading-relaxed">
              You can read any interior studio's website and find the same six words:
              integrity, excellence, passion, innovation, quality, craftsmanship.
              Here are the six things you will actually observe if you hire us.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="bg-[var(--bg)] p-8 md:p-10 group hover:bg-[var(--bg-subtle)] transition-colors duration-500"
            >
              <div className="font-mono text-xs text-[var(--oak-500)] tracking-widest mb-6">{v.num}</div>
              <h3 className="font-display text-2xl leading-tight mb-4 text-[var(--fg)] group-hover:text-[var(--oak-600)] transition-colors">
                {v.title}
              </h3>
              <p className="text-[var(--fg-muted)] leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
