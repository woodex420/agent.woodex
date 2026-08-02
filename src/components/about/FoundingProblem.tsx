"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * AboutHero + FoundingProblem
 * Signature motion: scroll-driven pen-stroke draw of the firm's founding
 * sketch line down the page + a big, quietly-animated italic serif counter-statement.
 *
 * Per §8: Founding problem — opens with the founder's frustration, not "we are Woodex".
 */
export default function FoundingProblem() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.2"] });
  const lineDraw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const problems = [
    { yr: "2012", what: "First project, first lesson. A villa in DHA Phase 5 came in PKR 2.4M over quote and 7 weeks late. The client cried at handover. The carpenters hadn't been paid either." },
    { yr: "2013", what: "Two more jobs. Same pattern: renders that lied, bills that grew, dates that moved. The interior industry in Lahore was running on charm and deposits." },
    { yr: "2014", what: "Woodex opens a 4,200 sqft workshop on Multan Road. Rule #1: never promise what you can't draw. Rule #2: quote the real price. Rule #3: name the date." },
  ];

  return (
    <section ref={ref} className="pt-[calc(var(--nav-h)+3rem)] pb-24 md:pb-32 bg-[var(--bg)] relative overflow-hidden">
      <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-12 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-4">
          <span className="w-8 h-px bg-[var(--oak-500)]" />
          About Woodex
        </div>

        <div className="lg:col-span-8 lg:col-start-1">
          <h1 className="font-display text-[var(--fs-display)] leading-[0.98] tracking-tight">
            We started because<br />
            <span className="italic-serif text-[var(--oak-600)]">a client cried.</span>
          </h1>
        </div>

        <div className="lg:col-span-4 lg:col-start-9 flex items-end">
          <p className="text-[var(--fg-muted)] text-lg leading-relaxed">
            Not because we loved wood (we do), or because we wanted a portfolio (we built one).
            We started because we watched an industry lie to people, over and over, and
            thought — someone should do it straight.
          </p>
        </div>

        {/* Pen-stroke timeline */}
        <div className="lg:col-span-12 mt-16 md:mt-24 relative">
          {/* Vertical draw line */}
          <svg
            className="absolute left-[22px] md:left-[calc(25%-20px)] top-0 bottom-0 w-10 h-full pointer-events-none hidden sm:block"
            viewBox="0 0 2 600"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.line
              x1="1" y1="0" x2="1" y2="600"
              stroke="var(--oak-500)"
              strokeWidth="1.5"
              pathLength={1}
              strokeDasharray="1 1"
              style={{ pathLength: lineDraw }}
            />
          </svg>

          <div className="space-y-16 md:space-y-24">
            {problems.map((p, i) => (
              <motion.div
                key={p.yr}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className="grid md:grid-cols-4 gap-6 md:gap-12 relative"
              >
                <div className="md:col-span-1 flex items-start gap-4">
                  <span className="w-10 h-10 rounded-full border border-[var(--oak-500)] bg-[var(--bg)] flex items-center justify-center font-mono text-xs text-[var(--oak-600)] z-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="font-display text-5xl md:text-6xl text-[var(--oak-600)]/40 leading-none pt-1">
                    {p.yr}
                  </div>
                </div>
                <p className="md:col-span-3 text-xl md:text-2xl leading-[1.4] font-display max-w-2xl pt-2">
                  {p.what}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Signature statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4 }}
          className="lg:col-span-12 mt-24 md:mt-32 pt-16 border-t border-[var(--border)]"
        >
          <p className="font-display text-2xl md:text-4xl leading-[1.25] max-w-4xl italic-serif text-[var(--fg)]">
            &ldquo;You don't need a designer who impresses you at the first meeting.
            You need one who isn't surprised by anything on site, who tells you the
            real price on day three, and who hands you the keys on the date they wrote
            in bold.&rdquo;
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-[var(--fg-muted)]">
            <span className="w-8 h-px bg-[var(--oak-500)]" />
            <span className="uppercase tracking-widest">Founding note, 2014</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
