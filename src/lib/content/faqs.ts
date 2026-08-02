/**
 * Sprint G — FAQ data used both by UI components and by JSON-LD structured-data helpers.
 * Keeping the data in a plain module (not inside a "use client" component) lets server
 * pages import it for schema without pulling client-only deps into the SSR bundle.
 */

export const HOME_FAQS = [
  {
    q: "How much does a fit-out actually cost in Lahore?",
    a: "Honest ranges, per square foot, as of 2025: residential PKR 3,500-6,500/sqft; commercial office PKR 2,800-5,200/sqft; retail/F&B PKR 5,000-9,000/sqft; turnkey (design+build+furniture) PKR 4,500-8,000/sqft. Your 45-minute site visit produces a fixed, itemised quote — not a range — within 10 days. We don't do ballparks after the brief.",
  },
  {
    q: "How long does a project really take?",
    a: "Small office/cafe (under 3,000 sqft): 6-10 weeks on site. Full home (5,000-10,000 sqft): 12-20 weeks. HQ floor (15,000-30,000 sqft): 16-24 weeks. Every quote includes a day-by-day Gantt and a handover date in bold. That date has moved twice in 24 months — both times at the client's written request.",
  },
  {
    q: "What if the build doesn't match the render?",
    a: "We redo it at our cost. That clause is written into every SOW. In 11 years it has been invoked twice. Once we shipped the wrong marble; once a carpenter cut a bookshelf 40mm short. Both were rebuilt within the same week. Photographs of both corrections are available on request — we keep them as a reminder.",
  },
  {
    q: "Do you do free 3D renders before we sign?",
    a: "No — and neither should anyone who's going to be honest with you. Good 3D work takes 60+ designer hours and tells you exactly what you'll get. We include 3D in the paid concept phase (PKR 75-150k depending on scope) which is 100% deductible from the build fee if you proceed. Free renders are a sales trick: they show you something aspirational the builder can't deliver.",
  },
];

export const CONTACT_FAQS = [
  {
    q: "Is this first call a sales pitch?",
    a: "No. There is no sales team. Zara (Client Lead) will answer, ask you roughly what you're doing, tell you if we're the right studio, and — if yes — schedule a 45-minute walkthrough. If we aren't the right fit, she'll usually give you two names of people who are.",
  },
  {
    q: "What if my project is too small?",
    a: "We don't have a minimum project size in rupees, but we do have a minimum time block of two weeks on site. That usually translates to projects starting around PKR 8-10 lakh. Below that, we'll tell you honestly and refer you to a smaller contractor we trust. Our smallest 2025 job was a 220 sqft study (PKR 6.4 lakh); our largest was an 18,000 sqft HQ.",
  },
  {
    q: "Am I locked in after the walkthrough?",
    a: "Not at all. The walkthrough is free, the budget range is free, and you can walk away at any point before signing the SOW. Roughly 1 in 6 walkthroughs don't turn into a project, usually because the budget doesn't match the scope — and that's a good thing to learn on day three, not day thirty.",
  },
  {
    q: "What if I don't know what I want yet?",
    a: "That's normal and it's where most clients start. The walkthrough is partly a conversation about how you live or work in the space, partly measurements. You don't need drawings, Pinterest boards, or a mood board to call us — though if you have them it helps.",
  },
  {
    q: "Do you charge for the first 3D renders?",
    a: "Yes — good 3D work takes 60+ designer hours. We don't do 'free concept renders' because those are a sales trick: they show you something aspirational the build can't actually hit. 3D is part of the paid concept phase (PKR 75-150k depending on scope), and 100% of that fee is deductible from your build cost if you proceed.",
  },
  {
    q: "Why don't you have a showroom?",
    a: "We used one for 18 months in 2016-17. It added 11% to every quote (rent, staff, electricity) and clients mostly told us they'd rather see a real project. Instead we invite you to the workshop, where you can see joinery being cut, finished, and tested. We also keep a list of 40+ past clients who have agreed to let future clients walk through their finished spaces.",
  },
];
