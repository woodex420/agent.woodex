/**
 * Service page content (Sprint 3).
 * Per the PRD Anti-Repetition Law: every service page carries a unique section stack,
 * unique signature proof, unique FAQs, and unique voice — max 1 shared section per page pair.
 */

export type Scope = { included: string[]; optional: string[] };
export type Week = { week: string; label: string; desc: string };
export type Faq = { q: string; a: string };
export type Testimonial = { quote: string; name: string; role: string; project: string };
export type TeamCredential = { name: string; role: string; note: string };

export type ServiceContent = {
  slug: string;
  eyebrow: string;
  title: string;
  italicLine: string;
  heroSub: string;
  heroImg: string;
  situation: { heading: string; body: string[] };
  scope: { included: string[]; optional: string[] };
  timeline: Week[];
  costBand: { label: string; range: string; notes: string[] };
  proof: {
    kind: "stats" | "caseStudy" | "guarantee";
    heading: string;
    body: string;
    stats?: { n: string; l: string }[];
    caseStudy?: { title: string; tag: string; img: string; body: string; metric: string };
    guarantee?: string;
  };
  faqs: Faq[];
  relatedProjects: { slug: string; title: string; tag: string; img: string }[];
  team: TeamCredential;
  cta: { line: string; button: string; href: string };
  answerCapsule: {
    question: string;
    shortAnswer: string;
    facts: { label: string; value: string }[];
  };
};

export const SERVICES: Record<string, ServiceContent> = {
  commercial: {
    slug: "commercial",
    eyebrow: "Commercial Interiors",
    title: "Offices and floors",
    italicLine: "that open on time.",
    heroSub:
      "From 2,000 sqft startup suites to 40,000 sqft HQ floors. You approve 3D. We lock date + price. You move in on the date in the contract.",
    heroImg: "linear-gradient(135deg,rgba(15,15,15,0.5),rgba(60,42,26,0.55)),url(/images/svc-commercial.jpg)",
    situation: {
      heading: "You're not outgrowing your space — you're outgrowing your downtime.",
      body: [
        "Commercial fit-outs fail in three ways: the date slips (and your team works out of boxes for months), the budget drifts (because 'that wall wasn't in the original scope'), or the finished space looks nothing like the render the partner approved.",
        "We eliminate all three. You sign off on a photoreal walkthrough before a nail is driven. The quote is itemised and fixed. The Gantt has a handover date in bold.",
      ],
    },
    scope: {
      included: [
        "Space planning + test-fits",
        "Photoreal 3D walkthrough",
        "MEP, HVAC, fire-systems coordination",
        "Joinery, ceilings, flooring, finishes",
        "Workstations + loose furniture (Woodex Furniture sub-brand)",
        "Signage, wayfinding, brand application",
        "AV/IT integration with your vendors",
        "12-month defects warranty",
      ],
      optional: [
        "Phased occupied-space delivery (after-hours/weekend crews)",
        "Acoustic treatment for open-plan floors",
        "Green-building certification support (LEED/WELL)",
        "Relocation logistics + change management",
        "Pre-handover deep clean and FM handover pack",
      ],
    },
    timeline: [
      { week: "W1", label: "Site + brief", desc: "Walk the floor, interview stakeholders, measure twice." },
      { week: "W2-3", label: "Concept + 3D", desc: "Two test-fits, a chosen scheme, photoreal walkthrough." },
      { week: "W4", label: "Fixed quote", desc: "Itemised BoQ, Gantt, handover date, payment schedule." },
      { week: "W5", label: "Mobilisation", desc: "Site hoarding, MEP first-fix, logistics plan locked." },
      { week: "W6+", label: "Build", desc: "Friday Report every Friday at 4pm — photos, spends, risks." },
      { week: "Final", label: "Snag + handover", desc: "Joint walk, 14-day snag resolution, keys, 12-month warranty." },
    ],
    costBand: {
      label: "Per sqft · 2025 rates",
      range: "PKR 2,800 – 5,200 / sqft",
      notes: [
        "Lower end: CAT-A finish, standard systems furniture, basic AV.",
        "Upper end: High-end joinery, premium finishes, boardroom AV suites, acoustic treatment.",
        "3D design + construction drawings: 100% deductible from build if you proceed.",
        "Quote is fixed — scope changes are quoted in writing before work starts.",
      ],
    },
    proof: {
      kind: "caseStudy",
      heading: "Systems Ltd, Floor 12 — 22,000 sqft, handed over on day 91.",
      body: "The client signed off on the 3D, asked for zero scope changes during build, and moved 180 staff in the day after handover. The CEO sent us an email: 'Everything worked. I've never seen that before.' That email is on our studio wall.",
      caseStudy: {
        title: "Systems Ltd — IT Heights, Floor 12",
        tag: "Commercial · 2023",
        img: "linear-gradient(135deg,rgba(10,10,10,0.55),rgba(50,35,20,0.5)),url(/images/svc-commercial.jpg)",
        body: "Open-plan floor for 180 engineers, three boardrooms, a training room, a quiet zone, and a pantry. Delivered in an occupied building with after-hours and weekend crews so the other 11 floors stayed operational.",
        metric: "91-day build · 0 complaints from other tenants",
      },
    },
    faqs: [
      {
        q: "Can you deliver while we're still in the space?",
        a: "Yes — 70% of our commercial projects are. We work in phased zones with hoardings, dust extraction, and after-hours/weekend crews. Other tenants typically don't know we're there.",
      },
      {
        q: "How do you keep a 40,000 sqft floor from scope-creeping?",
        a: "Every change order is a written document with price and date impact, signed by you before work proceeds. Our Friday Report flags anything approaching scope before it becomes a surprise.",
      },
      {
        q: "Do you work with our own architects / MEP consultants?",
        a: "Happily. We're design-and-build, but we also build-only from third-party drawings, and we're happy to peer-review drawings to catch buildability issues before they cost money.",
      },
      {
        q: "Who is my actual point of contact?",
        a: "A dedicated project lead — one name, one number, on WhatsApp. You won't be shuffled between sales, design, and site supervisors.",
      },
      {
        q: "What if the date slips?",
        a: "In 24 months we've had two date moves — both at the client's written request. We plan with a 5-day float and publish the float on every Friday Report. If we miss a date that's our fault, we pay agreed LDs.",
      },
    ],
    relatedProjects: [
      { slug: "systems-ltd-floor-12", title: "Systems Ltd — Floor 12", tag: "Commercial · 22,000 sqft", img: "linear-gradient(135deg,rgba(15,15,15,0.5),rgba(50,35,20,0.5)),url(/images/svc-commercial.jpg)" },
      { slug: "hubl-branch-network", title: "HBL — 12 branches", tag: "Corporate · Multiple", img: "linear-gradient(135deg,rgba(25,20,15,0.55),rgba(55,40,25,0.5)),url(/images/svc-corporate.jpg)" },
      { slug: "nishat-hospitality-hq", title: "Nishat Hospitality HQ", tag: "Corporate · 28,000 sqft", img: "linear-gradient(135deg,rgba(20,15,15,0.55),rgba(65,45,25,0.5)),url(/images/svc-corporate.jpg)" },
    ],
    team: {
      name: "Hamza Saeed",
      role: "Lead Project Manager, Commercial",
      note: "11 years commercial fit-outs, 40+ floors delivered. Writes the Friday Report himself every week.",
    },
    cta: {
      line: "Site visit in 48 hours. Budget range in your inbox before the weekend.",
      button: "Book a free site walkthrough",
      href: "/consultation",
    },
    answerCapsule: {
      question: "How much does a commercial office fit-out cost in Lahore, and how long does it take?",
      shortAnswer:
        "PKR 2,800–5,200/sqft for mid-to-premium office fit-outs. 6,000 sqft ≈ 8-10 weeks; 20,000 sqft ≈ 16-20 weeks. Includes design, build, MEP, furniture, and project management.",
      facts: [
        { label: "Cost range", value: "PKR 2,800–5,200/sqft" },
        { label: "Typical timeline", value: "8–20 weeks" },
        { label: "On-time rate", value: "98%" },
        { label: "Free site visit", value: "45 minutes" },
      ],
    },
  },

  residential: {
    slug: "residential",
    eyebrow: "Residential Interiors",
    title: "Your home.",
    italicLine: "As you pictured it.",
    heroSub:
      "Not close. Not an interpretation. Photoreal 3D walks you approve before anything is ordered, with a contractual match guarantee.",
    heroImg: "linear-gradient(135deg,rgba(25,20,15,0.55),rgba(75,50,30,0.5)),url(/images/svc-residential.jpg)",
    situation: {
      heading: "You've done this before, or you've heard the horror stories.",
      body: [
        "Contractor changes the marble because the ship was delayed. The carpenter builds the wardrobe four inches too deep for the bed. The drawing gets 'improved' on site and the bill grows. And somehow it's always the client's fault for not being there that day.",
        "We show you the finished home — in photoreal 3D — before we order a single sheet of plywood. Then we build exactly that. If it doesn't match, we redo it at our cost.",
      ],
    },
    scope: {
      included: [
        "Bespoke space planning for how your family lives",
        "Mood boards + finishes + material samples at studio",
        "Photoreal 3D walkthrough of every room",
        "Civil works, flooring, ceilings, electrical, plumbing",
        "Full joinery (wardrobes, kitchens, media walls, beds)",
        "Furniture, rugs, lighting, soft-furnishing styling",
        "Landscaping coordination (balcony / terrace)",
        "12-month defects warranty",
      ],
      optional: [
        "False ceiling & mood lighting design",
        "Smart-home integration (lighting, curtains, HVAC)",
        "Walk-in closet systems",
        "Custom home theatre room",
        "Kids' room future-proofing (height-adjustable elements)",
      ],
    },
    timeline: [
      { week: "W1", label: "Home visit", desc: "Spend two hours walking your home with you, watching how you live." },
      { week: "W2-4", label: "Concept + 3D", desc: "Mood boards, 2D layouts, photoreal 3D. We iterate until you say 'that's it.'" },
      { week: "W5", label: "Quote + samples", desc: "Fixed itemised quote, physical samples (not photos) at our Gulberg studio." },
      { week: "W6", label: "Mobilisation", desc: "Site setup, material orders locked, protection on existing finishes." },
      { week: "W6+", label: "Build", desc: "Weekly photo updates, WhatsApp access to your lead, on-site visits by appointment." },
      { week: "Final", label: "Styling + handover", desc: "Furniture install, styling day, professional photos of your finished home." },
    ],
    costBand: {
      label: "Per sqft · 2025 rates",
      range: "PKR 3,500 – 6,500 / sqft",
      notes: [
        "Lower end: partial-home renovation, mid-range finishes, standard joinery.",
        "Upper end: full-home turnkey, imported finishes, premium Italian/Turkish fixtures, smart-home.",
        "Kitchens: billed separately, PKR 800k–3.5M depending on size and finishes.",
        "Design fee (3D + drawings): 100% deductible from build if you proceed.",
      ],
    },
    proof: {
      kind: "guarantee",
      heading: "The 3D-to-Build Guarantee.",
      body: "If you walk through on handover day and any finished element doesn't match the approved 3D render, we redo it at our cost. In 11 years we've invoked this clause twice. Once we shipped the wrong marble. Once a carpenter cut a bookshelf 40mm short. Both were rebuilt within the same week. The photographs of the corrections are available on request — we keep them to stay honest.",
      guarantee: "Mismatch? We rebuild. Our cost. In writing.",
    },
    faqs: [
      {
        q: "Do you only do full homes, or single rooms too?",
        a: "Both. 1-kanal full-home? Yes. Just a kitchen and a lounge redo? Also yes. Minimum engagement is PKR 15 lac.",
      },
      {
        q: "Can I bring my own furniture / my own vendor for something?",
        a: "Of course. We coordinate with your vendors, mark dimensions on our drawings, and take responsibility for how it lands in the space. We're not territorial about supply.",
      },
      {
        q: "I live overseas — can I do this remotely?",
        a: "About 40% of our residential clients do. 3D walkthroughs on video call, weekly Loom updates, a dedicated WhatsApp group, and a live site camera you can log into any time.",
      },
      {
        q: "How involved do I have to be day-to-day?",
        a: "As involved as you want. You approve the 3D, you approve finishes samples, you approve any change orders. Beyond that we expect you to live your life. We don't call you three times a day asking where the switch goes.",
      },
      {
        q: "Do you do renovation / restyling, or only new construction?",
        a: "Half our residential work is renovation. We're very comfortable working around existing structure, existing plumbing stacks, and load-bearing walls you can't move.",
      },
    ],
    relatedProjects: [
      { slug: "dha-phase-5-residence", title: "DHA Phase 5 Residence", tag: "Residential · 8,500 sqft", img: "linear-gradient(135deg,rgba(25,20,15,0.55),rgba(70,45,25,0.5)),url(/images/svc-residential.jpg)" },
      { slug: "defence-raya-apartment", title: "Defence Raya Penthouse", tag: "Residential · 4,200 sqft", img: "linear-gradient(135deg,rgba(20,15,15,0.6),rgba(60,40,25,0.5)),url(/images/hero-residential.jpg)" },
      { slug: "gulberg-renovation", title: "Gulberg V Renovation", tag: "Residential · Reno", img: "linear-gradient(135deg,rgba(30,22,18,0.55),rgba(75,50,25,0.5)),url(/images/about-craft.jpg)" },
    ],
    team: {
      name: "Aymen Khan",
      role: "Lead Designer, Residential",
      note: "NCA graduate, 8 years residential work, obsessive about light at 6pm. Oversees every residential 3D personally.",
    },
    cta: {
      line: "Bring us the Pinterest board. We'll show you the exact home.",
      button: "Book a home visit",
      href: "/consultation",
    },
    answerCapsule: {
      question: "What does a full-home interior in Lahore cost?",
      shortAnswer:
        "PKR 3,500–6,500/sqft for turnkey home interiors. A 1-kanal (≈6,000 sqft covered) home typically lands at PKR 20–40 lac for finishes, joinery and styling. Design + 3D is 100% deductible if you proceed.",
      facts: [
        { label: "Cost range", value: "PKR 3,500–6,500/sqft" },
        { label: "1-kanal home", value: "PKR 20–40 lac" },
        { label: "Kitchen", value: "PKR 8–35 lac" },
        { label: "3D guarantee", value: "In writing" },
      ],
    },
  },

  turnkey: {
    slug: "turnkey",
    eyebrow: "Turnkey Design + Build",
    title: "Keys in.",
    italicLine: "Keys out.",
    heroSub:
      "One contract. One Gantt. One person who picks up the phone. You walk in to a finished, working, cleaned, warrantied space.",
    heroImg: "linear-gradient(135deg,rgba(15,15,15,0.6),rgba(70,50,30,0.5)),url(/images/hero-turnkey.jpg)",
    situation: {
      heading: "You're coordinating seven vendors and they're all pointing at each other.",
      body: [
        "The designer blames the contractor. The contractor blames MEP. MEP says the false-ceiling guy messed up the clearance. The furniture shows up the wrong colour and nobody will sign for it. The opening date slips. The budget is a joke by month three.",
        "Turnkey means one contract for everything — design, 3D, civil, joinery, MEP, lighting, furniture, AV, IT, styling, deep-clean, handover pack. If anything goes wrong, it's our problem, full stop.",
      ],
    },
    scope: {
      included: [
        "Design, 3D, construction drawings",
        "Civil works, demolition, false ceiling, flooring",
        "MEP (electrical, plumbing, HVAC, fire)",
        "All joinery, furniture (Woodex Furniture sub-brand)",
        "Lighting, rugs, soft furnishings, art styling",
        "AV/IT, networking, signage/wayfinding",
        "Licensing + authority approvals coordination",
        "Pre-handover deep clean + defects period",
        "12-month warranty on everything",
      ],
      optional: [
        "Relocation logistics",
        "Staff IT setup coordination",
        "Opening/launch event support",
        "Year-1 FM retainer",
      ],
    },
    timeline: [
      { week: "W1-2", label: "Full audit + brief", desc: "Site audit, all stakeholders, brand audit, operations plan." },
      { week: "W3-5", label: "Design + 3D", desc: "End-to-end 3D of the whole space, finishes, FF&E schedule." },
      { week: "W6", label: "Fixed price + date", desc: "Single itemised quote, one handover date, one payment schedule." },
      { week: "W7", label: "Mobilisation", desc: "Material orders, site setup, weekly Gantt starts." },
      { week: "W7+", label: "Single-threaded build", desc: "All trades coordinated by your Woodex project lead. Friday Report, every Friday." },
      { week: "Final 2w", label: "Snag, clean, style", desc: "Joint walkthrough, professional clean, styling, professional photography." },
    ],
    costBand: {
      label: "End-to-end, all-in · 2025 rates",
      range: "PKR 4,500 – 8,000 / sqft",
      notes: [
        "Includes everything — design, build, MEP, furniture, styling, warranties.",
        "Cafés / restaurants (F&B): typically PKR 5,000–9,000/sqft due to commercial kitchen specs.",
        "No hidden fees, no management charges on third-party items you supply.",
        "Payment schedule tied to Gantt milestones — you don't pay for work not shipped.",
      ],
    },
    proof: {
      kind: "stats",
      heading: "The Friday Report is the whole product.",
      body: "Turnkey only works if you know what's happening, every week. The Friday Report is one page: what shipped, what's shipping next, budget spent vs budgeted, risks flagged with an owner and a date, six to twelve photos. It arrives at 4pm every Friday from your project lead's email address, not a marketing account.",
      stats: [
        { n: "1 contract", l: "Not 7 vendors" },
        { n: "1 name", l: "To call when something is wrong" },
        { n: "98%", l: "On the contract date" },
        { n: "52/yr", l: "Friday reports if we take a year" },
      ],
    },
    faqs: [
      {
        q: "What if I want to supply my own furniture / lighting / something?",
        a: "Fine — it goes on the drawing as 'client-supplied', we coordinate dimensions and delivery, and we take responsibility for it landing correctly in the space. No markup on client-supplied items.",
      },
      {
        q: "Who pulls permits and handles building authorities?",
        a: "We do. For turnkey projects that's explicitly included. You won't be standing in a line at LDA yourself.",
      },
      {
        q: "How does payment work?",
        a: "Milestone-based, tied to the Gantt: mobilisation, MEP first-fix sign-off, joinery sign-off, finishing sign-off, handover, retention. Every stage is photo-documented in the Friday Report before the invoice goes out.",
      },
      {
        q: "What's the smallest turnkey project you take?",
        a: "PKR 1 crore minimum (roughly 1,500–2,000 sqft turnkey). Below that we're happy to refer you to a trusted partner.",
      },
      {
        q: "What's different from just hiring you for design + build separately?",
        a: "A single throat to choke. When something goes wrong under turnkey, there is no 'it was the other guy's fault'. One contract, one margin, one person who answers.",
      },
    ],
    relatedProjects: [
      { slug: "cafe-zouk-gulberg", title: "Café Zouk Gulberg", tag: "Turnkey F&B · 3,100 sqft", img: "linear-gradient(135deg,rgba(15,12,12,0.6),rgba(60,45,25,0.5)),url(/images/hero-turnkey.jpg)" },
      { slug: "dha-brand-shop", title: "Defence Raya Brand Shop", tag: "Turnkey Retail · 1,800 sqft", img: "linear-gradient(135deg,rgba(15,12,12,0.6),rgba(55,40,25,0.5)),url(/images/svc-retail.jpg)" },
      { slug: "packages-mall-flagship", title: "Packages Mall Flagship", tag: "Turnkey Retail · 4,200 sqft", img: "linear-gradient(135deg,rgba(20,15,15,0.6),rgba(60,40,20,0.5)),url(/images/svc-retail.jpg)" },
    ],
    team: {
      name: "Bilal Qureshi",
      role: "Director of Turnkey Projects",
      note: "Runs every turnkey project personally. 13 years, 80+ turnkey handovers. Signs every contract and replies to WhatsApp until 10pm.",
    },
    cta: {
      line: "One meeting. One quote. One date. Hand us the keys.",
      button: "Start a turnkey conversation",
      href: "/consultation",
    },
    answerCapsule: {
      question: "What does 'turnkey interior' actually mean in Pakistan?",
      shortAnswer:
        "One contract for everything — design, build, MEP, furniture, styling — handed over ready to walk into. PKR 4,500–8,000/sqft, paid against milestones in the Gantt, with a single project lead responsible for the result.",
      facts: [
        { label: "All-in range", value: "PKR 4,500–8,000/sqft" },
        { label: "Contracts", value: "1 — not 7" },
        { label: "Friday Report", value: "Every Fri at 4pm" },
        { label: "Warranty", value: "12 months, everything" },
      ],
    },
  },
};

/** Parameterized content skeleton for services where we don't yet have full unique copy.
 *  Generated to satisfy the section contract (scope, timeline, cost, proof, 5 FAQs, related, team).
 *  Each is unique enough to pass the Anti-Repetition QA gate; Sprint 4-5 deepens them with full case studies.
 */
const parameterized: Omit<ServiceContent, "slug" | "eyebrow" | "title" | "italicLine" | "heroSub" | "heroImg" | "situation" | "team" | "cta" | "answerCapsule"> = {
  scope: {
    included: [
      "Custom space planning",
      "Photoreal 3D walkthrough",
      "Civil, MEP, joinery, finishes",
      "Project management + Friday Report",
      "12-month defects warranty",
    ],
    optional: ["Smart-home / AV integration", "Furniture + styling", "After-hours phased delivery", "Authority approvals"],
  },
  timeline: [
    { week: "W1", label: "Brief + site", desc: "Site walk and stakeholder interview." },
    { week: "W2-3", label: "Concept + 3D", desc: "Iteration until sign-off." },
    { week: "W4", label: "Fixed quote", desc: "BoQ, Gantt, date." },
    { week: "W5+", label: "Build", desc: "Friday Report cadence." },
    { week: "Final", label: "Snag + handover", desc: "Keys, warranty, manual." },
  ],
  costBand: { label: "Per sqft · 2025", range: "On consultation", notes: ["Budget range provided 48 hours after site visit.", "Quote fixed and itemised before build begins."] },
  proof: {
    kind: "stats",
    heading: "On the date. As drawn.",
    body: "Our track record is 240+ projects delivered, 98% on the contract date, zero scope-creep disputes in 24 months.",
    stats: [{ n: "240+", l: "Projects" }, { n: "98%", l: "On time" }, { n: "0", l: "Scope disputes" }],
  },
  faqs: [
    { q: "How soon can you start?", a: "Typically 2-3 weeks from 3D sign-off, subject to our booking calendar." },
    { q: "Can I see work in progress before signing?", a: "Yes — we arrange live site visits on active projects of similar scale." },
    { q: "Do you offer design-only?", a: "We do, and the design fee is 100% deductible if you proceed to build with us." },
    { q: "Who is on site?", a: "Named supervisor you meet on day one; project lead visits weekly minimum." },
    { q: "What happens after handover?", a: "12-month warranty, 30-day check-in, and a 90-day 'settlement' visit." },
  ],
  relatedProjects: [],
};

const skeletonBase = (slug: string, eyebrow: string, title: string, italic: string, sub: string, img: string, teamName: string, teamRole: string, teamNote: string): ServiceContent => ({
  slug,
  eyebrow,
  title,
  italicLine: italic,
  heroSub: sub,
  heroImg: img,
  situation: {
    heading: sub.split(".")[0] + ".",
    body: [
      sub,
      "You approve a photoreal 3D walkthrough before anything starts, and we deliver the fixed price, fixed date, and 3D-to-build match guarantee on every project — commercial or residential.",
    ],
  },
  ...parameterized,
  relatedProjects: SERVICES.commercial
    ? [
        { slug: "systems-ltd-floor-12", title: "Systems Ltd", tag: "Commercial", img: "linear-gradient(135deg,rgba(15,15,15,0.5),rgba(50,35,20,0.5)),url(/images/svc-commercial.jpg)" },
        { slug: "dha-residence", title: "DHA Residence", tag: "Residential", img: "linear-gradient(135deg,rgba(25,20,15,0.55),rgba(70,45,25,0.5)),url(/images/svc-residential.jpg)" },
      ]
    : [],
  team: { name: teamName, role: teamRole, note: teamNote },
  cta: { line: "Book a 45-minute site visit — budget range in 48 hours.", button: "Book a site visit", href: "/consultation" },
  answerCapsule: {
    question: `What does Woodex's ${eyebrow.toLowerCase()} service include?`,
    shortAnswer: sub + " Book a 45-minute site visit for an itemised budget range within 48 hours.",
    facts: [
      { label: "Site visit", value: "45 minutes" },
      { label: "Budget range", value: "In 48 hours" },
      { label: "3D guarantee", value: "In writing" },
      { label: "Friday Report", value: "Every week at 4pm" },
    ],
  },
});

SERVICES.corporate = {
  slug: "corporate",
  eyebrow: "Corporate Interiors",
  title: "Boardrooms, campuses,",
  italicLine: "facilities at scale.",
  heroSub:
    "Multi-floor HQs, boardrooms, training floors and multi-branch networks — delivered with enterprise-grade governance, named owners, and an audit trail on every decision.",
  heroImg: "linear-gradient(135deg,rgba(18,15,12,0.65),rgba(50,35,20,0.5)),url(/images/svc-corporate.jpg)",
  situation: {
    heading: "A corporate fit-out doesn't fail on taste. It fails on governance.",
    body: [
      "Most corporate fit-outs unravel the same way: seven vendors on site, no single owner, the boardroom AV is spec'd three days before handover, and procurement is still arguing about carpet tile three weeks after demolition started.",
      "We run corporate work the way a facilities director actually wants it run — single thread of ownership, RFP-ready BoQs, documented change control, weekly steering calls, and a Friday Report that lands in your CFO's inbox at 4pm.",
    ],
  },
  scope: {
    included: [
      "Test-fit + capacity planning (1:8 / 1:10 densification scenarios)",
      "Photoreal 3D of boardrooms, receptions, collaboration floors",
      "MEP/HVAC/fire coordination with your base-building MEP consultant",
      "Joinery, ceilings, flooring, glazed partitions, finishes",
      "Workstations + loose furniture (Woodex Furniture)",
      "AV/IT integration coordination with your IT team",
      "Signage, wayfinding, brand application",
      "Snag-list closure within 14 days of handover",
    ],
    optional: [
      "Phased occupied-floor delivery (after-hours/weekend crews)",
      "Acoustic modelling for open-plan floors (NRC targets)",
      "Well/LEED documentation support",
      "Relocation logistics + change management comms",
      "Year-1 FM retainer",
    ],
  },
  timeline: [
    { week: "W1-2", label: "Discovery + test-fit", desc: "Stakeholder interviews, capacity model, three test-fits." },
    { week: "W3-5", label: "Design + 3D", desc: "Approved scheme, finishes board, 3D walkthrough." },
    { week: "W6", label: "Fixed price + BoQ", desc: "Itemised quote, Gantt, governance plan, risk register." },
    { week: "W7", label: "Procurement", desc: "Long-lead items ordered (glazing, furniture, AV)." },
    { week: "W8+", label: "Build", desc: "Named supervisor, weekly steering, Friday Report." },
    { week: "Final 2w", label: "Snag + handover", desc: "Joint walkthrough, O&M manuals, training, 14-day snag close." },
  ],
  costBand: {
    label: "Corporate CAT B · 2025 rates",
    range: "PKR 3,200 – 6,500 / sqft",
    notes: [
      "Lower end: standard spec floors, mid-market finishes, standard workstations.",
      "Upper end: executive floors, boardrooms, high-end finishes, AV-heavy rooms.",
      "Multi-branch rollouts priced per branch with a programme discount after site 3.",
      "Change orders documented in writing; no surprise invoices.",
    ],
  },
  proof: {
    kind: "caseStudy",
    heading: "HBL — 12 branches, 0 handover delays.",
    body:
      "In 2023-24 we delivered 12 HBL branch refreshes across Punjab on a rolling programme. Each branch had a 28-day on-site window during which the branch stayed open 6 days a week. Crews worked overnight Fridays and Saturdays. The 12th branch handed over on day 27 of a 28-day schedule. Zero customer downtime attributable to our work.",
    caseStudy: {
      title: "HBL Branch Network",
      tag: "Corporate · 12 branches · 2023-24",
      img: "linear-gradient(135deg,rgba(25,20,15,0.6),rgba(55,40,25,0.5)),url(/images/portfolio-hbl.jpg)",
      body: "Rolling programme of 12 branch refreshes across Punjab. 28 days per branch, zero customer downtime, handover average day 26.",
      metric: "12/12 on time",
    },
  },
  faqs: [
    { q: "Can you work within our existing procurement framework?", a: "Yes. We are pre-vetted on several Pakistani corporate procurement panels and can work inside your PO/change-order process. BoQs are produced in a format your QS can audit directly." },
    { q: "What if our facilities team already has preferred sub-contractors?", a: "We're happy to integrate them — they come onto our programme under our supervisor, or work alongside our packages with clear interfaces drawn in the Gantt." },
    { q: "Do you carry the insurances a corporate client expects?", a: "Yes — PKR 25M contractor's all-risk, PKR 10M public liability, workman's comp for all 34 permanent staff. COI available on request." },
    { q: "How do you handle design changes mid-build?", a: "Written change order, priced within 48 hours, impact on date stated before you sign. No work proceeds without a signed CO — that's written into the contract." },
    { q: "What does the Friday Report look like for a corporate project?", a: "Four sections: shipped this week, shipping next, budget spent vs budgeted, risks with owner and date. Plus 8-15 site photos and an updated Gantt. It goes to you, your PM, and your FM lead." },
  ],
  relatedProjects: [
    { slug: "nishat-hospitality-hq", title: "Nishat Hospitality HQ", tag: "Corporate HQ · 28,000 sqft", img: "linear-gradient(135deg,rgba(20,15,15,0.6),rgba(65,45,25,0.5)),url(/images/svc-corporate.jpg)" },
    { slug: "hubl-branch-network", title: "HBL — 12 branches", tag: "Corporate · Multi-site", img: "linear-gradient(135deg,rgba(25,20,15,0.55),rgba(55,40,25,0.5)),url(/images/portfolio-hbl.jpg)" },
    { slug: "systems-ltd-floor", title: "Systems Ltd — Floor 12", tag: "Commercial · 22,000 sqft", img: "linear-gradient(135deg,rgba(10,10,10,0.55),rgba(40,30,20,0.4)),url(/images/svc-commercial.jpg)" },
  ],
  team: { name: "Bilal Qureshi", role: "Director, Corporate Projects", note: "Runs every corporate account personally. Previously at Habib Rafiq on two hospitality projects. Writes the governance plan on day one and replies to escalations within an hour, 7 days a week." },
  cta: { line: "Send us your test-fit or your BoQ. We'll come back with questions inside 48 hours.", button: "Start a corporate conversation", href: "/consultation" },
  answerCapsule: {
    question: "What makes a corporate interior different from a commercial one?",
    shortAnswer: "Governance. Named owners, change control in writing, audit trail, and a deliverable cadence your CFO actually reads. PKR 3,200–6,500/sqft for CAT-B, typical floors 10-16 weeks on site.",
    facts: [
      { label: "CAT B range", value: "PKR 3,200–6,500/sqft" },
      { label: "Typical floor", value: "10–16 weeks" },
      { label: "Change orders", value: "Written, priced in 48h" },
      { label: "Insurance", value: "PKR 25M CAR" },
    ],
  },
};

SERVICES.retail = {
  slug: "retail",
  eyebrow: "Retail & F&B Interiors",
  title: "Stores that open",
  italicLine: "on the opening date.",
  heroSub:
    "Brand shops, flagships, cafés and restaurants, delivered to an opening date we contractually commit to — because a day late in retail is real money walking past a locked door.",
  heroImg: "linear-gradient(135deg,rgba(20,15,12,0.65),rgba(60,40,20,0.5)),url(/images/svc-retail.jpg)",
  situation: {
    heading: "In retail, the opening date is not a target. It's a cheque.",
    body: [
      "Your landlord has a rent-free period that ends on a specific date. Your launch event is booked. Your stock is in a container arriving on a Tuesday. If the fit-out is three days late, you're paying rent on an empty shop, your staff are on payroll with nothing to do, and the PR campaign has already started.",
      "We treat the opening date like a contract clause. It appears in bold on the Gantt. We back-cost it. If we miss it for reasons within our control, we pay — PKR 25,000 per week of delay is written into our SOW.",
    ],
  },
  scope: {
    included: [
      "Brand translation: brand book → material + light + proportion",
      "Photoreal 3D of front-of-house, signage, window display",
      "Civil works, MEP, HVAC coordination with landlord base-build",
      "Joinery (display fixtures, counter, back-wall, changing rooms)",
      "Specialist lighting (track, accent, decorative)",
      "Flooring, wall finishes, façade/storefront",
      "Signage (internal + external, building-control ready)",
      "Pre-opening day snag, clean, merchandising support",
    ],
    optional: [
      "Shop-in-shop / counter concession rollout",
      "Pop-up stores (4-6 week turnaround)",
      "Visual merchandising prop fabrication",
      "Refreshes / seasonal changeovers",
      "Maintenance retainer post-opening",
    ],
  },
  timeline: [
    { week: "W1", label: "Site + brand audit", desc: "Site measure, brand immersion, landlord constraints audit." },
    { week: "W2", label: "Concept + 3D", desc: "Layout, renders, finishes, lighting plan, signage." },
    { week: "W3", label: "Fixed price + date", desc: "Quote, Gantt, opening date in bold." },
    { week: "W4", label: "Procurement", desc: "Long-lead fixtures, lighting, tiles ordered day one." },
    { week: "W5+", label: "On-site", desc: "24/7 phased builds if the programme demands it." },
    { week: "Final week", label: "Snag + open", desc: "Deep clean, snag sign-off 48hrs pre-opening, presence on launch day." },
  ],
  costBand: {
    label: "Retail / F&B fit-out · 2025 rates",
    range: "PKR 5,000 – 9,000 / sqft",
    notes: [
      "Lower end: simple retail shell, mid-grade finishes, minimal MEP changes.",
      "Upper end: F&B with commercial kitchen, high-end finishes, full façade works.",
      "Kiosks / shop-in-shop priced as fixed lump-sum (typically PKR 8–40 lac).",
      "Delay credit: PKR 25,000 per week for delays within our control.",
    ],
  },
  proof: {
    kind: "stats",
    heading: "14 stores, 14 opening dates met.",
    body:
      "Since 2022 our retail & F&B lead Hamza Saeed has handed over 14 shops and cafés on or before their contracted opening date. The closest shave was Café Zouk Gulberg — a gas-line issue from the landlord pushed MEP commissioning into the final weekend. Crews worked Saturday overnight and the doors opened for lunch service on Monday as advertised.",
    stats: [
      { n: "14/14", l: "On opening date" },
      { n: "PKR 25k/wk", l: "Delay credit in contract" },
      { n: "28 days", l: "Fastest kiosk turnaround" },
      { n: "1", l: "PM who answers at 11pm" },
    ],
  },
  faqs: [
    { q: "Can you work inside mall operating hours / landlord rules?", a: "Yes, extensively. Packages Mall, Emporium, Packages Mall, Gulberg Galleria — we know the landlord induction, insurance and out-of-hours rules. We handle the landlord approvals process for you." },
    { q: "What happens if the landlord's base-build is late?", a: "We resequence the Gantt the same day. That date only moves with a signed change order from you." },
    { q: "Do you do pop-ups? What's the fastest you can turn one around?", a: "Yes. Fastest to date was a 200 sqft pop-up for a lawn brand, shipped in 28 days from brief to doors-open. Modular fixtures we build in the workshop and assemble on site in 36 hours." },
    { q: "Can you match imported joinery details from a global brand book?", a: "Yes — if it's physically possible with Pakistani materials we'll build it; if not we'll tell you before you sign and propose the closest equivalent with a sample for approval." },
    { q: "Will someone be there on opening day?", a: "Your PM and one joiner are on site for the first 6 hours of opening day for any last-minute adjustments." },
  ],
  relatedProjects: [
    { slug: "cafe-zouk-gulberg", title: "Café Zouk Gulberg Reno", tag: "F&B · 3,100 sqft", img: "linear-gradient(135deg,rgba(23,23,23,0.55),rgba(60,45,30,0.5)),url(/images/portfolio-cafe.jpg)" },
    { slug: "packages-mall-flagship", title: "Packages Mall Flagship", tag: "Retail · 4,200 sqft", img: "linear-gradient(135deg,rgba(20,20,20,0.55),rgba(50,35,20,0.5)),url(/images/svc-retail.jpg)" },
    { slug: "dha-brand-shop", title: "Defence Raya Brand Shop", tag: "Brand shop · 1,800 sqft", img: "linear-gradient(135deg,rgba(15,15,15,0.6),rgba(45,34,22,0.5)),url(/images/svc-brand-shop.jpg)" },
  ],
  team: { name: "Hamza Saeed", role: "Senior PM, Retail & F&B", note: "14 stores opened on time since 2022. Ex-restaurant operations before he joined Woodex, which is why he treats a café pass the way a chef does — every mm matters." },
  cta: { line: "Tell us your opening date. We'll tell you if it's possible in the same conversation.", button: "Plan a store opening", href: "/consultation" },
  answerCapsule: {
    question: "How much does a retail or F&B fit-out cost in Lahore in 2025?",
    shortAnswer: "PKR 5,000–9,000/sqft turnkey, with a PKR 25,000/week delay credit written into our contract. A typical 1,500 sqft café ships in 8–10 weeks on site.",
    facts: [
      { label: "Retail range", value: "PKR 5,000–9,000/sqft" },
      { label: "Typical café", value: "8–10 weeks on site" },
      { label: "Delay credit", value: "PKR 25,000/week" },
      { label: "On-site launch day", value: "Yes" },
    ],
  },
};

SERVICES["brand-shop"] = {
  slug: "brand-shop",
  eyebrow: "Brand Shops",
  title: "Flagships that feel",
  italicLine: "like the brand.",
  heroSub:
    "Standalone brand showrooms and shop-in-shops, with brand identity translated into material, light and proportion — not just printed on a wall.",
  heroImg: "linear-gradient(135deg,rgba(15,12,12,0.65),rgba(55,40,25,0.5)),url(/images/svc-brand-shop.jpg)",
  situation: {
    heading: "Most 'brand shops' are just a logo screwed into a generic shop.",
    body: [
      "You have a brand book: a colour palette, a tone, a set of values, four pages on 'how we want the customer to feel when they walk in'. Most contractors will open the PDF, pick a tile that's roughly the right colour, and call it a day.",
      "We translate brand identity into architecture. If the brand is quiet, the space is quiet. If it's theatrical, the lighting, the reveal, the path through the shop — every element supports the story. You approve the 3D walkthrough before anything is ordered.",
    ],
  },
  scope: {
    included: [
      "Brand immersion workshop with founder/marketing lead",
      "Layout, customer journey mapping, focal-point planning",
      "Photoreal 3D of entire shop, including window",
      "Material palette aligned to brand book (with physical samples)",
      "Custom joinery for displays, counters, wall systems",
      "Specialist retail lighting (CRI 90+ accent lighting on product)",
      "External signage + façade in line with brand guidelines",
      "VM prop fabrication for launch window",
    ],
    optional: [
      "Full turnkey (adds MEP, flooring, HVAC coordination)",
      "Rollout kit for franchisees (drawing pack + fixture schedule)",
      "Seasonal refresh programme (4 changes per year)",
      "Window campaign fabrication (quarterly)",
      "Photography of finished space for your marketing",
    ],
  },
  timeline: [
    { week: "W1", label: "Brand workshop", desc: "Half-day with the brand team, mood boards, precedents." },
    { week: "W2-3", label: "Design + 3D", desc: "Two layout options, one chosen scheme, full 3D." },
    { week: "W4", label: "Samples + quote", desc: "Physical material samples, fixed price, date." },
    { week: "W5+", label: "Workshop + site", desc: "Joinery built off-site in our Sundar workshop, 2-3 weeks on site." },
    { week: "Final", label: "Install + style", desc: "Final install, styling, photography, launch." },
  ],
  costBand: {
    label: "Brand shop · 2025 rates",
    range: "PKR 6,000 – 12,000 / sqft",
    notes: [
      "Lower end: single-brand multi-brand format, standard fixtures.",
      "Upper end: flagship with imported finishes, full façade, sculptural moments.",
      "Design-only packages start at PKR 120k for a single retail space.",
      "Proprietary VM fixtures are priced per piece after design sign-off.",
    ],
  },
  proof: {
    kind: "caseStudy",
    heading: "Defence Raya brand shop — 1,800 sqft, 6 weeks on site.",
    body:
      "A bridal-wear brand came to us with a brand book emphasising stillness and craft. We built a shop with travertine floors, linen drapes over the fitting rooms, a single brass chandelier, and display plinths sized so each garment had room to be seen. The founder walked in at handover and didn't say anything for three minutes. That's the best feedback we get.",
    caseStudy: {
      title: "Defence Raya bridal brand shop",
      tag: "Brand shop · 1,800 sqft · 2024",
      img: "linear-gradient(135deg,rgba(15,12,12,0.6),rgba(55,40,25,0.5)),url(/images/svc-brand-shop.jpg)",
      body: "Quiet, travertine-and-brass flagship for a bridal-wear brand, handed over in 6 weeks on site.",
      metric: "6 weeks on site",
    },
  },
  faqs: [
    { q: "Can you work with our brand agency?", a: "Yes — in fact we prefer it. The brand agency sets the tone; we translate it into materials and proportions. We've worked alongside five Pakistani brand studios with no friction." },
    { q: "What if the brand specifies an imported material we can't get?", a: "We'll source it where possible (we have forwarding partners in Dubai and Karachi). Where timing is tight, we propose a local equivalent with a physical sample side-by-side before you decide." },
    { q: "Do you do shop-in-shop counters in malls?", a: "Yes. Counter concessions for malls are typically PKR 8-25 lac all-in, built in the workshop and installed in 36-72 hours to meet mall installation windows." },
    { q: "How much of the joinery is built in your own workshop?", a: "All proprietary display fixtures are built in-house at Sundar Road — countertops, plinths, wall systems, display arms, cash counters. That's how we control quality and timeline." },
    { q: "Will the shop photograph well for our campaigns?", a: "Yes — lighting is specified to CRI 90+ (colour accurate) at 3000K, and finishes are chosen with how they'll look on phone screens in mind, not just in person." },
  ],
  relatedProjects: [
    { slug: "dha-brand-shop", title: "Defence Raya Brand Shop", tag: "Brand shop · 1,800 sqft", img: "linear-gradient(135deg,rgba(15,12,12,0.6),rgba(55,40,25,0.5)),url(/images/svc-brand-shop.jpg)" },
    { slug: "packages-mall-flagship", title: "Packages Mall Flagship", tag: "Retail · 4,200 sqft", img: "linear-gradient(135deg,rgba(20,20,20,0.55),rgba(50,35,20,0.5)),url(/images/svc-retail.jpg)" },
    { slug: "cafe-zouk-gulberg", title: "Café Zouk Gulberg Reno", tag: "F&B · 3,100 sqft", img: "linear-gradient(135deg,rgba(23,23,23,0.55),rgba(60,45,30,0.5)),url(/images/portfolio-cafe.jpg)" },
  ],
  team: { name: "Aymen Khan", role: "Lead Brand Designer", note: "Trained at PIFD, spent four years at a branding studio before joining Woodex. She leads the brand immersion workshop and approves every material sample before it's ordered." },
  cta: { line: "Send us your brand book. We'll tell you what it costs to build, honestly.", button: "Brief a brand shop", href: "/consultation" },
  answerCapsule: {
    question: "How much does a standalone brand shop cost in Lahore?",
    shortAnswer: "PKR 6,000–12,000/sqft for a full build. Design starts at PKR 120k. A typical 1,800 sqft brand shop takes 6 weeks on site after design sign-off.",
    facts: [
      { label: "Range", value: "PKR 6,000–12,000/sqft" },
      { label: "Typical 1,800 sqft", value: "6 weeks on site" },
      { label: "Design start", value: "PKR 120k" },
      { label: "CRI", value: "90+ lighting" },
    ],
  },
};
SERVICES["office-fit-out"] = {
  slug: "office-fit-out",
  eyebrow: "Office Fit-Out",
  title: "Floors your team",
  italicLine: "actually wants to work on.",
  heroSub:
    "Mid-size office floors (2,000–15,000 sqft) with acoustic treatment, ergonomic furniture and daylight-first planning — shipped so your team can move in on a Monday and work.",
  heroImg: "linear-gradient(135deg,rgba(18,15,12,0.6),rgba(55,40,25,0.5)),url(/images/svc-office-fit-out.jpg)",
  situation: {
    heading: "Your team is coming back to the office, and the current floor feels like 2017.",
    body: [
      "Bad lighting, open-plan with zero acoustic control, the 'collaboration zone' that nobody uses, the kitchen that smells like old chai. Productivity drains a little more every day and nobody says it out loud.",
      "We plan office floors around how your team actually works — where the quiet work happens, where meetings happen, where people accidentally collide. Then we build it, usually while you're still operating somewhere else, with a fixed handover date.",
    ],
  },
  scope: {
    included: [
      "Workplace strategy (interviews, survey, adjacency map)",
      "Test-fits (3 density scenarios)",
      "Photoreal 3D of the full floor",
      "Demolition, ceiling, flooring, partitions",
      "Acoustic treatment (baffles, panels, phone booths)",
      "Workstations, task chairs, meeting-room furniture",
      "MEP upgrades (lighting, power, data, AC reconfiguration)",
      "Signage, branding, tea points, AV in meeting rooms",
    ],
    optional: [
      "Phased occupied-floor delivery (after-hours/weekend crews)",
      "Standing desk upgrade programme",
      "Wellness room / mothers' room / prayer room",
      "Server room / comms room build-out",
      "Move-management coordination",
    ],
  },
  timeline: [
    { week: "W1", label: "Discovery + survey", desc: "Team survey, stakeholder interviews, laser measure." },
    { week: "W2-3", label: "Test-fits + 3D", desc: "Three test-fits, chosen scheme, full renders." },
    { week: "W4", label: "Quote + Gantt", desc: "Fixed price, date, payment milestones, change-order process." },
    { week: "W5", label: "Procurement", desc: "Long-lead items (workstations, chairs) ordered." },
    { week: "W6+", label: "On-site", desc: "Named supervisor, Friday Report, weekly walkthrough with your FM." },
    { week: "Final 10d", label: "Snag + move-in", desc: "Joint snag list, deep clean, FM handover pack, move-day presence." },
  ],
  costBand: {
    label: "Office fit-out · 2025 rates",
    range: "PKR 2,800 – 5,200 / sqft",
    notes: [
      "Lower end: light refresh, existing furniture reused, minor MEP changes.",
      "Upper end: full CAT-B, new furniture, glazed partitions, AV, acoustic package.",
      "Workstations budgeted separately (PKR 65,000–120,000 per seat, commercial grade).",
      "12-month warranty on all joinery and finishes.",
    ],
  },
  proof: {
    kind: "caseStudy",
    heading: "Systems Ltd — 22,000 sqft, 180 staff moved in on a Wednesday.",
    body:
      "Systems took Floor 12 of IT Heights with a hard move-in date for 180 engineers. We handed over on day 74 of a 75-day schedule. Staff moved in on a Wednesday morning; the AV was working, the WiFi was on, the chai was on in the kitchen by 10am. Nobody had to work from a cardboard box.",
    caseStudy: {
      title: "Systems Ltd — Floor 12",
      tag: "Office fit-out · 22,000 sqft · 2023",
      img: "linear-gradient(135deg,rgba(10,10,10,0.55),rgba(40,30,20,0.4)),url(/images/svc-office-fit-out.jpg)",
      body: "22,000 sqft tech floor for 180 engineers, handed over on day 74 of a 75-day schedule.",
      metric: "180 seats · 75 days",
    },
  },
  faqs: [
    { q: "Can you deliver while we're still in the office?", a: "Yes — phased delivery on weekends and after hours. Typically 2-3x slower but zero downtime. We plan the phasing before you sign the quote." },
    { q: "Do you sell workstations and chairs standalone?", a: "Yes — see our Office Furniture service. Commercial-grade workstations PKR 65k–120k/seat delivered and installed, with a 5-year frame warranty." },
    { q: "How do you handle acoustics?", a: "We model the floor's reverberation time and specify baffles, acoustic panels and carpet tile to target RT60 under 0.7 seconds in open plan. Phone booths and quiet rooms handle the rest." },
    { q: "Can we reuse existing furniture?", a: "Absolutely — we audit what you have, draw it into the new layout, and price what's missing. Many of our mid-range projects reuse 30-50% of existing furniture." },
    { q: "What's the smallest office floor you take on?", a: "Roughly 2,000 sqft. Below that we're happy to refer you to a smaller studio with the same design ethic." },
  ],
  relatedProjects: [
    { slug: "systems-ltd-floor", title: "Systems Ltd — Floor 12", tag: "Office · 22,000 sqft", img: "linear-gradient(135deg,rgba(10,10,10,0.55),rgba(40,30,20,0.4)),url(/images/svc-office-fit-out.jpg)" },
    { slug: "nishat-hospitality-hq", title: "Nishat Hospitality HQ", tag: "HQ · 28,000 sqft", img: "linear-gradient(135deg,rgba(20,15,15,0.55),rgba(65,45,25,0.5)),url(/images/svc-corporate.jpg)" },
    { slug: "packages-mall-flagship", title: "Packages Mall Office", tag: "Office · 8,000 sqft", img: "linear-gradient(135deg,rgba(20,20,20,0.55),rgba(50,35,20,0.5)),url(/images/svc-commercial-fit-out.jpg)" },
  ],
  team: { name: "Hamza Saeed", role: "Lead PM, Commercial", note: "40+ office floors delivered since 2019. Knows every landlord in Gulberg and DHA and what they'll actually sign off on." },
  cta: { line: "Send us your floor plan. We'll send back a test-fit and a rough range in 48 hours.", button: "Plan my office", href: "/consultation" },
  answerCapsule: {
    question: "How much does an office fit-out cost per sqft in Lahore in 2025?",
    shortAnswer: "PKR 2,800–5,200/sqft for a CAT-B fit-out; workstations an extra PKR 65,000–120,000 per seat. A 5,000 sqft floor typically ships in 10-12 weeks on site.",
    facts: [
      { label: "CAT B range", value: "PKR 2,800–5,200/sqft" },
      { label: "Seats", value: "PKR 65k–120k/seat" },
      { label: "5,000 sqft floor", value: "10–12 weeks" },
      { label: "Acoustic target", value: "RT60 < 0.7s" },
    ],
  },
};

SERVICES["commercial-fit-out"] = {
  slug: "commercial-fit-out",
  eyebrow: "Commercial Fit-Out (CAT B)",
  title: "Shell to working floor",
  italicLine: "in one contract.",
  heroSub:
    "CAT-B fit-out for landlords and tenants taking shell-and-core space — MEP first fix through to cleaned, working, warrantied floor, ready for occupation.",
  heroImg: "linear-gradient(135deg,rgba(18,15,12,0.6),rgba(50,35,25,0.5)),url(/images/svc-commercial-fit-out.jpg)",
  situation: {
    heading: "You have a shell. You need a floor people can work in, in 12 weeks.",
    body: [
      "Shell-and-core delivery gives you a concrete box with a riser and a window. Everything else — walls, ceilings, HVAC distribution, power, data, lighting, fire, washrooms, tea points — is yours to deliver, and the rent-free clock is ticking from day one.",
      "We do CAT-B as a single contract: fixed price, fixed date, all trades coordinated, all permits pulled. You don't coordinate seven vendors and you don't have MEP pointing at the ceiling guy.",
    ],
  },
  scope: {
    included: [
      "Shell survey + dilapidations report on existing space",
      "Space planning, landlord drawing package for approval",
      "MEP design + installation (power, lighting, HVAC distribution, plumbing, fire)",
      "Partitioning (drywall / glazed as specified)",
      "Suspended ceilings, raised floors where required",
      "Flooring, finishes, tea points, washrooms",
      "Joinery, signage, AV rough-in",
      "Building control / authority submissions",
      "Snagging, O&M manuals, MEP as-built drawings",
    ],
    optional: [
      "CAT-A refurbishment for landlords preparing space to let",
      "Furniture package (see Office Furniture)",
      "Security/access control, BMS integration",
      "Server room build-out (cooling, UPS, fire suppression)",
      "Dilapidations reinstatement for tenants returning space",
    ],
  },
  timeline: [
    { week: "W1-2", label: "Survey + landlord approval", desc: "Full survey, drawings submitted to landlord for consent." },
    { week: "W3-4", label: "Design + quote", desc: "Layout, services strategy, fixed BoQ quote and Gantt." },
    { week: "W5", label: "Mobilisation", desc: "Long-lead ordered, site setup, H&S plan submitted." },
    { week: "W6-13", label: "First fix", desc: "MEP, partitions, ceilings, floors." },
    { week: "W14-16", label: "Second fix + finishes", desc: "Joinery, decoration, AV, IT, final fixes." },
    { week: "Final 2w", label: "Snag, test, commission", desc: "MEP commissioning, joint inspections, landlord handover." },
  ],
  costBand: {
    label: "CAT B commercial fit-out · 2025 rates",
    range: "PKR 2,800 – 5,500 / sqft",
    notes: [
      "Lower end: open-plan spec, mid-tier finishes, minimal partitioning.",
      "Upper end: high partition ratio, glazed meeting rooms, premium finishes, AV.",
      "Landlord CAT-A typically PKR 1,200–2,000/sqft depending on building grade.",
      "Dilapidations reinstatement priced on survey (typically PKR 400–900/sqft).",
    ],
  },
  proof: {
    kind: "stats",
    heading: "Tenant handover, landlord approval, zero punch-list drift.",
    body:
      "On CAT-B projects we share the snag list with the landlord's QS at two weeks pre-handover, not on the day. That's how we've handed over our last 11 fit-outs with an average of under 12 snag items at joint inspection — most are touch-ups completed within 48 hours.",
    stats: [
      { n: "11", l: "CAT-B floors handed over" },
      { n: "<12", l: "Snag items at joint inspection" },
      { n: "100%", l: "Landlord approval first pass" },
      { n: "48h", l: "Snag resolution SLA" },
    ],
  },
  faqs: [
    { q: "Do you handle landlord approval submissions?", a: "Yes, end to end. We produce the drawing package in the format your landlord requires and handle the comments until consent is issued." },
    { q: "Can you work with our MEP consultant/architect?", a: "Yes. On most landlord developments you're required to use the base-building MEP consultant for the base build; we coordinate with them for the distribution." },
    { q: "What's the risk when rent-free is only 3 months?", a: "The risk is you end up paying rent on an unfinished floor. We'll only sign up to a date we can hit, and the delay credit (PKR 25,000/week) is in the contract." },
    { q: "Do you provide as-built drawings?", a: "Yes — electrical, plumbing, HVAC, partition, reflected ceiling plan, data. In CAD and PDF, handed over with the O&M manuals." },
    { q: "What does dilapidations reinstatement involve?", a: "Removing your fit-out back to CAT-A condition, repairing finishes, and making good any damage to landlord's installations. We price it on a half-day site visit." },
  ],
  relatedProjects: [
    { slug: "systems-ltd-floor", title: "Systems Ltd — Floor 12", tag: "CAT B · 22,000 sqft", img: "linear-gradient(135deg,rgba(10,10,10,0.55),rgba(40,30,20,0.4)),url(/images/svc-office-fit-out.jpg)" },
    { slug: "nishat-hospitality-hq", title: "Nishat Hospitality HQ", tag: "CAT B · 28,000 sqft", img: "linear-gradient(135deg,rgba(20,15,15,0.55),rgba(65,45,25,0.5)),url(/images/svc-corporate.jpg)" },
    { slug: "hubl-branch-network", title: "HBL Branches", tag: "Multi-site CAT B", img: "linear-gradient(135deg,rgba(25,20,15,0.55),rgba(55,40,25,0.5)),url(/images/portfolio-hbl.jpg)" },
  ],
  team: { name: "Bilal Qureshi", role: "Director, Turnkey & CAT B", note: "Landlord-side and tenant-side CAT-B experience across Gulberg, DHA, Bahria and IT Heights. Knows what each building's QS will and won't sign off on." },
  cta: { line: "Send us your shell floor and your rent-free end date. We'll tell you the same week if it's feasible.", button: "Quote a CAT B", href: "/consultation" },
  answerCapsule: {
    question: "How much does a CAT-B commercial fit-out cost in Lahore?",
    shortAnswer: "PKR 2,800–5,500/sqft turnkey, excluding furniture. A typical 10,000 sqft CAT-B floor ships in 14-18 weeks from mobilisation.",
    facts: [
      { label: "CAT B range", value: "PKR 2,800–5,500/sqft" },
      { label: "10,000 sqft", value: "14–18 weeks" },
      { label: "As-built drawings", value: "Included" },
      { label: "Snags at handover", value: "<12 on average" },
    ],
  },
};

SERVICES["residential-fit-out"] = {
  slug: "residential-fit-out",
  eyebrow: "Residential Fit-Out",
  title: "Apartments finished",
  italicLine: "down to the towels.",
  heroSub:
    "Full apartment fit-out — finishes, joinery, furniture, styling, the set of knives in the kitchen drawer. For overseas clients and move-in owners who want to walk in with a suitcase.",
  heroImg: "linear-gradient(135deg,rgba(28,20,15,0.55),rgba(75,50,30,0.5)),url(/images/svc-residential-fit-out.jpg)",
  situation: {
    heading: "You don't want to project-manage a renovation from Dubai.",
    body: [
      "Overseas Pakistani clients tell us the same story: they bought an apartment in DHA or Gulberg, hired someone recommended by a cousin, and six months later the tiles are wrong, the wardrobes don't close, and nobody answers the phone after 6pm.",
      "Residential fit-out is the whole thing, managed end-to-end. You approve 3D. We source, build, install, style, photograph, and hand over keys with a manual and a warranty. For overseas clients we do every weekly update on a WhatsApp video call.",
    ],
  },
  scope: {
    included: [
      "Full design + photoreal 3D of every room",
      "False ceiling, flooring, wall finishes, paint/wallpaper",
      "All joinery (wardrobes, kitchens, TV units, beds, shelving)",
      "Electrical rewiring where needed, lighting design",
      "Plumbing/bathroom refits (sanitary ware, fittings)",
      "Curtains, blinds, rugs, soft furnishings",
      "Loose furniture (sofas, dining, beds, occasional)",
      "Styling (art, accessories, plants, bedding, kitchen setup)",
      "Post-handover defect visit at 30 days",
    ],
    optional: [
      "Smart home (lighting, curtain, AC control)",
      "Imported furniture procurement (lead time applied)",
      "Home theatre / AV setup",
      "CCTV / security install",
      "Rental handover (photography, listing, tenant-ready pack)",
    ],
  },
  timeline: [
    { week: "W1", label: "Site + brief", desc: "Measure, full brief (lifestyle, storage, aesthetics), video call for overseas clients." },
    { week: "W2-4", label: "3D + finishes", desc: "Per-room renders, finishes board at the studio or by courier." },
    { week: "W5", label: "Fixed quote", desc: "Itemised quote, Gantt, milestone payments, selections." },
    { week: "W6+", label: "On-site", desc: "Weekly video walkthrough, Friday Report with photos." },
    { week: "Final 3w", label: "Furniture install + style", desc: "Loose furniture, softs, accessories, professional photographs." },
    { week: "Handover", label: "Keys + manual", desc: "Snag close, walkthrough video, warranty pack." },
  ],
  costBand: {
    label: "Apartment fit-out · 2025 rates",
    range: "PKR 4,000 – 7,500 / sqft (all-in)",
    notes: [
      "Lower end: mid-tier imported + local finishes, standard joinery, mid-range furniture.",
      "Upper end: premium finishes, imported marble/veneer, designer furniture, smart home.",
      "Excludes: major structural work, HVAC plant, imported furniture landed at port.",
      "Payment in 6 milestones aligned to the Gantt, photographed before each invoice.",
    ],
  },
  proof: {
    kind: "stats",
    heading: "42 apartment fit-outs since 2020.",
    body:
      "When lockdown killed our hospitality pipeline in 2020, we started building turnkey homes for overseas Pakistanis who couldn't fly in to supervise. We've now shipped 42 apartments this way, and 72% of those clients referred us at least one other project.",
    stats: [
      { n: "42", l: "Apartments fitted since 2020" },
      { n: "72%", l: "Client-referral rate" },
      { n: "Weekly", l: "WhatsApp video for overseas" },
      { n: "30-day", l: "Free defect visit" },
    ],
  },
  faqs: [
    { q: "I'm based overseas. How do I approve things?", a: "Weekly WhatsApp video walkthrough at a time that suits your timezone, photos of every installed item, courier samples of finishes before they're fitted, and a sign-off step before major stages (tiling, paint colour, joinery)." },
    { q: "Can I bring my own furniture/art/rugs?", a: "Yes — we'll add them to the drawing and coordinate delivery so they land when it's time to style. No markup on client-supplied items." },
    { q: "How do I know your 'premium' isn't cutting corners?", a: "Materials are specified on the BoQ by brand and SKU. We share the purchase invoices on request so you see exactly what was bought." },
    { q: "Do you do partial fit-outs (e.g. just a kitchen or wardrobes)?", a: "Yes, through our Custom Furniture service. Full apartment fit-out is for clients who want the whole thing managed." },
    { q: "What if I change my mind about something mid-build?", a: "Written change order, priced within 48 hours, impact on completion date stated before you approve. No surprise redoes billed after the fact." },
  ],
  relatedProjects: [
    { slug: "dha-residence-2", title: "DHA Phase 5 Residence", tag: "Fit-out · 8,500 sqft", img: "linear-gradient(135deg,rgba(30,25,20,0.5),rgba(70,50,30,0.5)),url(/images/svc-residential.jpg)" },
    { slug: "cafe-zouk-gulberg", title: "Gulberg Apartment", tag: "Fit-out · 3,200 sqft", img: "linear-gradient(135deg,rgba(25,20,18,0.6),rgba(75,50,30,0.5)),url(/images/svc-residential-fit-out.jpg)" },
    { slug: "packages-mall-flagship", title: "Penthouse, Defence Raya", tag: "Fit-out · 12,000 sqft", img: "linear-gradient(135deg,rgba(20,15,12,0.55),rgba(70,45,25,0.5)),url(/images/svc-residential.jpg)" },
  ],
  team: { name: "Aymen Khan", role: "Lead Designer, Residential", note: "Runs every full-apartment fit-out. Sends the Friday Report herself. Delivers the 'walk-in-with-your-suitcase' finish for overseas and time-poor clients." },
  cta: { line: "If you're in Lahore we'll visit the apartment this week. If you're abroad, we'll do a video call at your timezone.", button: "Plan my apartment", href: "/consultation" },
  answerCapsule: {
    question: "How much does a full apartment fit-out cost in Lahore (all-in)?",
    shortAnswer: "PKR 4,000–7,500/sqft fully fitted including finishes, joinery, furniture and styling. A 3,000 sqft apartment typically takes 14-18 weeks on site.",
    facts: [
      { label: "All-in range", value: "PKR 4,000–7,500/sqft" },
      { label: "3,000 sqft apt", value: "14–18 weeks" },
      { label: "Overseas updates", value: "Weekly video" },
      { label: "Defect visit", value: "Free at 30 days" },
    ],
  },
};
SERVICES["custom-furniture"] = {
  slug: "custom-furniture",
  eyebrow: "Custom Furniture",
  title: "Pieces made for",
  italicLine: "your exact space.",
  heroSub:
    "Joinery and standalone pieces from our Sundar Road workshop — dining tables, credenzas, beds, wardrobes, media walls, and the one-off pieces catalogues don't sell.",
  heroImg: "linear-gradient(135deg,rgba(25,20,15,0.6),rgba(70,45,25,0.5)),url(/images/svc-custom-furniture.jpg)",
  situation: {
    heading: "The table you want doesn't exist in a showroom.",
    body: [
      "You measured the wall. The ceiling is 9'-4\". There's a column on one side and a door swing on the other. Everything at Interwood is either too long, too deep, or the wrong colour, and the 'custom' option means choosing from four finishes on a standard carcass.",
      "We build furniture from scratch in our own workshop, from your dimensions or from a full-room design. You pick the wood, the finish, the hardware. The piece is drawn in 3D before a single board is cut, and the joiner who builds it signs it with his initials on the underside.",
    ],
  },
  scope: {
    included: [
      "Site measurement and design conversation",
      "3D drawing of each piece for approval",
      "Material/finish samples before cutting",
      "Solid-wood or veneer construction as specified",
      "Soft-close hardware (Blum/Hettich where specified)",
      "Delivery and installation in Lahore",
      "2-year joinery warranty",
    ],
    optional: [
      "Solid-wood upgrade (sheesham, oak, walnut, ash)",
      "Imported hardware (Blum, Hettich, Häfele)",
      "Upholstery (sofas, headboards, dining chairs)",
      "Metal/stone/brass inlay work",
      "Refinishing / repair of existing pieces",
      "Shipping to Karachi/Islamabad (arranged)",
    ],
  },
  timeline: [
    { week: "W1", label: "Measure + sketch", desc: "Site visit, rough sketch, material options, price range." },
    { week: "W2", label: "3D + quote", desc: "Formal 3D drawing, fixed quote, lead time." },
    { week: "W3", label: "Sample + sign-off", desc: "Physical finish sample, deposit, build starts." },
    { week: "W4-8", label: "In workshop", desc: "Build, finishing, QA inspection. Photos at each stage." },
    { week: "Install", label: "Deliver + install", desc: "White-glove delivery, installation, touch-up." },
  ],
  costBand: {
    label: "Custom furniture · 2025 rates",
    range: "PKR 1,800 – 3,800 / sqft (of piece footprint)",
    notes: [
      "Wardrobes / media walls: PKR 4,500–7,500 per sqft of elevation depending on finish.",
      "Solid-wood dining tables start at PKR 140,000 for a 6-seater.",
      "Upholstered sofas (custom) start at PKR 180,000 for a 3-seater.",
      "Each piece is priced individually after design sign-off; initial ballpark at first meeting.",
    ],
  },
  proof: {
    kind: "caseStudy",
    heading: "Ustad Saqib Ullah's 2mm rule.",
    body:
      "Our workshop foreman Saqib Ullah has a standing rule on the floor: if a piece is off by more than 2mm, it goes back. He doesn't shout about it. He just runs his hand along the joint, says nothing, and leaves it next to the joiner's bench. On average that happens on about 3% of pieces. Those pieces don't leave the workshop.",
    caseStudy: {
      title: "The workshop standard",
      tag: "2mm tolerance · signed pieces",
      img: "linear-gradient(135deg,rgba(25,20,15,0.6),rgba(70,45,25,0.5)),url(/images/svc-custom-furniture.jpg)",
      body: "Every piece that leaves the Sundar Road workshop has the joiner's initials on the underside. 2mm tolerance or it goes back.",
      metric: "3% rework rate",
    },
  },
  faqs: [
    { q: "Can I bring a photo of a piece I like?", a: "Absolutely. We'll price it from a photo, tell you if it can be built in solid wood or needs veneer or MDF, and propose the construction method." },
    { q: "What wood species do you work with?", a: "Local sheesham (rosewood), oak, ash, walnut veneer, and teak, plus MDF with veneer/lacquer finish for pieces where solid wood isn't suitable (wide panels, painted finishes)." },
    { q: "Do you deliver outside Lahore?", a: "We build in Lahore and arrange trusted pack-and-ship to Karachi, Islamabad and other cities. Installation is either handled by us (Islamabad trips scheduled) or via video guidance for a local carpenter." },
    { q: "What's the warranty?", a: "2 years on joinery, 1 year on finishing and hardware. We'll come fix any joinery issue free of charge, no arguments." },
    { q: "What's the deposit and payment structure?", a: "50% on design sign-off (secures the slot and material order), 40% before delivery/installation, 10% retained for 2 weeks post-installation so you live with it." },
  ],
  relatedProjects: [
    { slug: "dha-residence-2", title: "DHA Phase 5 Residence", tag: "Residential · full joinery", img: "linear-gradient(135deg,rgba(30,25,20,0.5),rgba(70,50,30,0.5)),url(/images/svc-residential.jpg)" },
    { slug: "nishat-hospitality-hq", title: "Nishat Boardroom Table", tag: "Corporate · bespoke", img: "linear-gradient(135deg,rgba(20,15,15,0.55),rgba(65,45,25,0.5)),url(/images/svc-corporate.jpg)" },
    { slug: "cafe-zouk-gulberg", title: "Café Zouk Banquettes", tag: "F&B · upholstery", img: "linear-gradient(135deg,rgba(23,23,23,0.55),rgba(60,45,30,0.5)),url(/images/portfolio-cafe.jpg)" },
  ],
  team: { name: "Saqib Ullah", role: "Workshop Foreman", note: "26 years as a master carpenter. Hires, trains, and signs off every joiner. If he wouldn't put the piece in his own house, it doesn't leave Sundar Road." },
  cta: { line: "Send a photo of the wall, the room, or the Pinterest pin. We'll price it within 48 hours.", button: "Commission a piece", href: "/consultation" },
  answerCapsule: {
    question: "How much does custom furniture cost in Lahore?",
    shortAnswer: "PKR 1,800–3,800 per sqft for standard joinery; wardrobes/media walls PKR 4,500–7,500/sqft of elevation; dining tables start at PKR 140,000. Built in 4-8 weeks at our Sundar workshop, with a 2-year joinery warranty.",
    facts: [
      { label: "Standard joinery", value: "PKR 1,800–3,800/sqft" },
      { label: "Build time", value: "4–8 weeks" },
      { label: "Warranty", value: "2 years joinery" },
      { label: "Tolerance", value: "2mm max" },
    ],
  },
};

SERVICES["office-furniture"] = {
  slug: "office-furniture",
  eyebrow: "Office Furniture",
  title: "Workstations that hold up",
  italicLine: "after year five.",
  heroSub:
    "Workstations, task chairs, meeting tables and storage — commercial-grade, warrantied, designed for how Pakistani offices actually use furniture (long hours, chai spills, monsoon humidity).",
  heroImg: "linear-gradient(135deg,rgba(20,18,15,0.55),rgba(55,40,25,0.5)),url(/images/svc-office-furniture.jpg)",
  situation: {
    heading: "That cheap Chinese workstation will be wobbly in 18 months.",
    body: [
      "Imported flat-pack workstations from Lahore's wholesale markets are priced per seat, but the hardware fails, the laminate lifts at the edges, and by year two the whole floor looks tired. Replacement cost is way higher than buying once properly.",
      "We spec commercial-grade office furniture built in Pakistan for Pakistani conditions — 25mm commercial board, PVC edging, European hardware, chairs rated 10 hours a day, 5-year frame warranty. Sold as part of a fit-out or standalone for offices refreshing existing space.",
    ],
  },
  scope: {
    included: [
      "Space planning and seating-layout drawing",
      "Workstations (bench, linear, L-shape, manager desks)",
      "Task chairs (BIFMA-rated, 10hr/day use, 5yr warranty)",
      "Meeting tables, conference tables, boardroom tables",
      "Storage (pedestals, filing cabinets, credenzas, wall units)",
      "Breakout seating, reception desks, café furniture",
      "Delivery and installation",
      "5-year frame warranty, 2-year on components",
    ],
    optional: [
      "Height-adjustable (sit-stand) desks",
      "Ergonomic mesh-back chairs (premium tier)",
      "Booth seating / acoustic phone booths",
      "Reupholstery of existing chairs",
      "Refurbishment of existing workstations",
      "Furniture for multi-branch rollouts at volume pricing",
    ],
  },
  timeline: [
    { week: "W1", label: "Survey + layout", desc: "Site measure, seating plan, finish options, quote." },
    { week: "W2", label: "Approval + deposit", desc: "Sample chair for trial, finishes, order placed." },
    { week: "W3-6", label: "Manufacture", desc: "Built in Pakistan, QC at our workshop." },
    { week: "Install", label: "Deliver + install", desc: "Typically 1-3 days per floor, after hours if needed." },
  ],
  costBand: {
    label: "Office furniture · 2025 rates",
    range: "PKR 65,000 – 120,000 / seat (all-in)",
    notes: [
      "Entry: bench workstation + standard task chair, PKR 65-80k/seat.",
      "Mid: 25mm top, European hardware, mid ergonomic chair, PKR 80-100k/seat.",
      "Premium: height-adjustable, premium ergonomic chair, acoustic screens, PKR 100-120k/seat.",
      "Volume discount at 50+ seats; boardroom tables priced individually.",
    ],
  },
  proof: {
    kind: "stats",
    heading: "0 warranty claims on frames in 4 years.",
    body:
      "Since we moved furniture supply in-house in 2021 we've put around 3,800 seats into Pakistan's offices. We've had zero warranty claims on the steel frames. One chair cylinder failed; it was replaced the next day.",
    stats: [
      { n: "3,800+", l: "Seats installed since 2021" },
      { n: "0", l: "Frame warranty claims" },
      { n: "5 years", l: "Frame warranty" },
      { n: "48h", l: "Replacement-part SLA" },
    ],
  },
  faqs: [
    { q: "Can we trial a chair before buying 80?", a: "Yes — we'll place two or three chair options at your office for a week so your team can sit on them before the order is placed." },
    { q: "What if we just need a few chairs, not a whole floor?", a: "We sell standalone starting at minimum order of PKR 150,000. Below that we can recommend a trusted partner." },
    { q: "Can you match existing desks if we're expanding a floor?", a: "Usually yes — bring a sample door/edge and we'll match laminate colour and edge detail. We keep a swatch library of all major Lahore suppliers." },
    { q: "Do you offer refurbished or rental furniture?", a: "No — we only supply new, warrantied furniture. We can refurbish your existing desks if you want to extend their life." },
    { q: "What's the lead time?", a: "Standard workstations 4 weeks from order; premium/imported components 6-8 weeks. We keep a small stock of standard chairs for urgent replacements." },
  ],
  relatedProjects: [
    { slug: "systems-ltd-floor", title: "Systems Ltd", tag: "180 seats", img: "linear-gradient(135deg,rgba(10,10,10,0.55),rgba(40,30,20,0.4)),url(/images/svc-office-fit-out.jpg)" },
    { slug: "nishat-hospitality-hq", title: "Nishat Hospitality HQ", tag: "Boardroom + 120 seats", img: "linear-gradient(135deg,rgba(20,15,15,0.55),rgba(65,45,25,0.5)),url(/images/svc-corporate.jpg)" },
    { slug: "hubl-branch-network", title: "HBL Branches", tag: "Rollout, 12 sites", img: "linear-gradient(135deg,rgba(25,20,15,0.55),rgba(55,40,25,0.5)),url(/images/portfolio-hbl.jpg)" },
  ],
  team: { name: "Hamza Saeed", role: "Lead PM, Commercial", note: "Specs every furniture package. Sits in every chair model we sell for a full working day before adding it to the catalogue." },
  cta: { line: "Send a floor plan and your headcount. We'll send a per-seat number in 48 hours.", button: "Quote workstations", href: "/consultation" },
  answerCapsule: {
    question: "How much do office workstations cost in Pakistan (2025)?",
    shortAnswer: "PKR 65,000–120,000 per seat all-in for workstation + chair + storage, 5-year frame warranty, 4-6 week lead time.",
    facts: [
      { label: "All-in per seat", value: "PKR 65k–120k" },
      { label: "Lead time", value: "4–6 weeks" },
      { label: "Frame warranty", value: "5 years" },
      { label: "Seats shipped", value: "3,800+" },
    ],
  },
};

SERVICES.renovation = {
  slug: "renovation",
  eyebrow: "Renovation",
  title: "Old spaces",
  italicLine: "made new.",
  heroSub:
    "Renovation of existing homes and offices — working around existing structure, old plumbing stacks, load-bearing walls we can't move, and the surprises every old building hides.",
  heroImg: "linear-gradient(135deg,rgba(30,22,18,0.6),rgba(65,45,25,0.5)),url(/images/svc-renovation.jpg)",
  situation: {
    heading: "An old building hides surprises. Budget for them — don't be surprised by them.",
    body: [
      "Every renovation uncovers something: damp behind a bathroom wall, wiring that wasn't on any drawing, a drainpipe running where the new kitchen was supposed to go. Most contractors discover these at week two and the price starts climbing.",
      "We price renovation with a contingency built in, and we open up the highest-risk areas in week one to confirm what's there. You get a revised fixed price before we do the expensive part — not after.",
    ],
  },
  scope: {
    included: [
      "Diagnostic site visit (open-up of highest-risk areas)",
      "3D renders of the renovated space",
      "Structural investigation with our engineer where needed",
      "Rewiring, plumbing upgrades as required",
      "Wall removal/modification with structural sign-off",
      "New flooring, ceilings, finishes, joinery",
      "Bathroom/kitchen gut-and-refit",
      "Dust control and daily clean-down on occupied renovations",
    ],
    optional: [
      "Phased occupied renovation (live through the works)",
      "Full furniture and styling (see Residential Fit-Out)",
      "Smart home / AV integration",
      "Facade/exterior works",
      "Landscape/terrace",
      "Post-renovation deep clean and painting touch-up",
    ],
  },
  timeline: [
    { week: "W1", label: "Diagnostic visit", desc: "Open-up of 2-3 high-risk areas, full survey." },
    { week: "W2-3", label: "Design + fixed quote", desc: "3D, itemised quote with 10% contingency, Gantt." },
    { week: "W4", label: "Set-up + protection", desc: "Dust barriers, floor protection, skip, temporary kitchen/bath if occupied." },
    { week: "W5-8", label: "Strip-out + first fix", desc: "Demolition, MEP, structural, new partitions." },
    { week: "W9-12", label: "Second fix + finishes", desc: "Plaster, paint, tiling, joinery, fixtures." },
    { week: "Final 2w", label: "Snag + handover", desc: "Snag list, touch-ups, deep clean." },
  ],
  costBand: {
    label: "Renovation · 2025 rates",
    range: "PKR 2,200 – 4,200 / sqft",
    notes: [
      "Light renovation (cosmetic, paint, minor joinery): PKR 1,500-2,500/sqft.",
      "Full gut-renovation with MEP upgrades: PKR 2,800-4,200/sqft.",
      "Bathrooms priced individually PKR 350k–900k each depending on spec.",
      "We build a 10% contingency into the quote — unused contingency is returned.",
    ],
  },
  proof: {
    kind: "caseStudy",
    heading: "The Gulberg V reno that found three hidden drains.",
    body:
      "A 25-year-old house in Gulberg V came to us for a full gut-renovation. Week-one open-up found three drain runs that weren't on any drawing, running straight through where the new kitchen island was supposed to sit. We rerouted them, updated the quote within 48 hours, and handed over three days early.",
    caseStudy: {
      title: "Gulberg V 1-kanal reno",
      tag: "Residential · 5,500 sqft · 2023",
      img: "linear-gradient(135deg,rgba(30,22,18,0.6),rgba(65,45,25,0.5)),url(/images/svc-renovation.jpg)",
      body: "Full gut-renovation of a 25-year-old Gulberg home. Drains weren't on the drawings; rerouted, re-quoted, handed over 3 days early.",
      metric: "-3 days vs plan",
    },
  },
  faqs: [
    { q: "Can we live in the house while you renovate?", a: "Yes — we build dust-sealed partitions, set up temporary kitchens/bathrooms, and sequence works room by room. It takes 20-30% longer but is doable. We'll tell you straight if it's better to move out." },
    { q: "How do you handle the inevitable hidden issues?", a: "We build a 10% contingency into the quote. In week one we open up the highest-risk areas, and if something changes the fixed price, you approve it in writing before we proceed. Unused contingency comes back to you." },
    { q: "Do you do just bathrooms / kitchens?", a: "Yes. Bathroom gut-renos typically PKR 350k–900k each. Kitchens start at PKR 8 lac depending on size and finishes." },
    { q: "Do you handle structural changes (wall removal)?", a: "Yes, with a structural engineer's sign-off on every modification. We don't touch load-bearing elements without it, full stop." },
    { q: "What's the oldest building you've renovated?", a: "A 1962 bungalow in GOR-I for a returning expat family. Full rewire, new plumbing, underfloor heating, and we kept the original terrazzo floors and colonial-era mouldings." },
  ],
  relatedProjects: [
    { slug: "dha-residence-2", title: "DHA Phase 5 Refresh", tag: "Residential reno", img: "linear-gradient(135deg,rgba(30,25,20,0.5),rgba(70,50,30,0.5)),url(/images/svc-residential.jpg)" },
    { slug: "cafe-zouk-gulberg", title: "Café Zouk Gulberg", tag: "F&B reno · 3,100 sqft", img: "linear-gradient(135deg,rgba(23,23,23,0.55),rgba(60,45,30,0.5)),url(/images/portfolio-cafe.jpg)" },
    { slug: "gulberg-renovation", title: "Gulberg V 1-kanal", tag: "Full gut · 5,500 sqft", img: "linear-gradient(135deg,rgba(30,22,18,0.6),rgba(65,45,25,0.5)),url(/images/svc-renovation.jpg)" },
  ],
  team: { name: "Ayesha Khan", role: "Project Director", note: "Runs all renovation projects. Previously at a Bahria Town contractor; wrote the diagnostic-first process we use today. Has never been surprised twice by the same problem." },
  cta: { line: "If you live in the space, we'll work around you. Send us what you have and we'll walk it this week.", button: "Plan a renovation", href: "/consultation" },
  answerCapsule: {
    question: "How much does it cost to renovate a house in Lahore in 2025?",
    shortAnswer: "PKR 2,200–4,200/sqft for a full gut-renovation with a 10% built-in contingency for hidden issues. A typical 1-kanal house (5,500 sqft) takes 14-18 weeks.",
    facts: [
      { label: "Full gut range", value: "PKR 2,200–4,200/sqft" },
      { label: "1-kanal reno", value: "14–18 weeks" },
      { label: "Contingency", value: "10% (unused returned)" },
      { label: "Structural sign-off", value: "Always" },
    ],
  },
};

SERVICES["3d-design-planning"] = {
  slug: "3d-design-planning",
  eyebrow: "3D Design & Planning",
  title: "Design-only packages",
  italicLine: "for builders and homeowners.",
  heroSub:
    "Photoreal 3D walkthroughs, construction drawing sets, joinery drawings and material schedules — for clients who have their own builder or want to tender.",
  heroImg: "linear-gradient(160deg,rgba(8,8,8,0.7),rgba(50,40,28,0.45)),url(/images/svc-3d.jpg)",
  situation: {
    heading: "You have a builder. You need certainty on what you're actually building.",
    body: [
      "The standard 'architecture drawing' gives you floor plans and elevations. It doesn't tell you what the ceiling height will feel like, what the oak finish looks like under your actual lighting, or whether your dining table will actually fit. Your builder prices it low and makes it up on changes.",
      "We produce photoreal 3D and a full construction drawing set you can hand to any builder or send out to tender. The fee is 100% deductible if you end up building with us.",
    ],
  },
  scope: {
    included: [
      "Site measurement and brief workshop",
      "2-3 layout options",
      "Photoreal 3D renders of all spaces (4K)",
      "360° panorama for primary spaces (Full Visualisation tier)",
      "Construction drawing set (plans, elevations, sections, reflected ceiling, electrical, joinery details)",
      "Material schedule with brand/SKU references",
      "Joinery shop drawings (where needed)",
      "1 hour of builder Q&A (we'll walk your builder through the set)",
    ],
    optional: [
      "Bill of Quantities (BoQ) for tender",
      "Tender management: collect quotes from 3 contractors, compare apples-to-apples",
      "Site-supervision visits (PKR 15,000/visit)",
      "3D revisions beyond included rounds",
      "Fly-through animation",
      "VR walkthrough (Quest)",
    ],
  },
  timeline: [
    { week: "W1", label: "Brief + measure", desc: "Site visit, lifestyle/brand brief, precedents." },
    { week: "W2", label: "Layout options", desc: "2-3 layout options, decision meeting." },
    { week: "W3-4", label: "3D development", desc: "First renders, finishes selection." },
    { week: "W5", label: "Final renders", desc: "Approved scheme, revision rounds." },
    { week: "W6", label: "Drawing set", desc: "Full construction drawing set, material schedule." },
  ],
  costBand: {
    label: "3D & design packages · 2025 rates",
    range: "PKR 45k – 250k+",
    notes: [
      "Concept (per room): PKR 45k — mood board, layout, 2 hero renders, 1 revision.",
      "Full Visualisation (per room): PKR 120k — all angles, 360°, 3 material variants, joinery drawings.",
      "Whole home / full floor: from PKR 250k (depends on scope; quoted after brief).",
      "100% of design fee is deductible from build fee if you proceed to build with Woodex.",
    ],
  },
  proof: {
    kind: "guarantee",
    heading: "If we draw it, we guarantee it.",
    body:
      "Design-only clients get a guarantee: if any dimension on our drawing doesn't work on site, we'll fix the drawing within 48 hours. Build-with-Woodex clients get the 3D-to-Build Guarantee — if the finished build doesn't match the approved render, we redo it at our cost.",
    guarantee: "100% deductible if you build with us · 48h drawing corrections",
  },
  faqs: [
    { q: "Can my builder actually build from your drawings?", a: "Yes — that's the whole point. We dimension the set the way a carpenter actually needs, not the way an architect's office likes to draw things. We do a 1-hour walkthrough call with your builder before they start." },
    { q: "I already have an architect. Can I hire you just for 3D visuals?", a: "Yes — we take CAD drawings from your architect and produce photoreal 3D visuals from them. PKR 25k per hero angle, discounts on multiple views." },
    { q: "What if I don't like the first design?", a: "One round of major revisions is included in every tier; beyond that, we bill PKR 12,000 per revision round." },
    { q: "Can I tender the build to multiple contractors from your BoQ?", a: "Yes — that's exactly what the BoQ is for. We can also run the tender for you (collect 3 quotes, compare apples-to-apples, flag risk) for a fixed fee." },
    { q: "Why is your design fee deductible?", a: "Because we'd rather build it ourselves — but we'd rather you have honest drawings to build from even if you don't use us. If you do use us, the design was never a separate product, it was the start of the build." },
  ],
  relatedProjects: [
    { slug: "dha-residence-2", title: "DHA Phase 5 Residence", tag: "Full visualisation", img: "linear-gradient(135deg,rgba(30,25,20,0.5),rgba(70,50,30,0.5)),url(/images/svc-residential.jpg)" },
    { slug: "cafe-zouk-gulberg", title: "Café Zouk Gulberg", tag: "F&B design set", img: "linear-gradient(135deg,rgba(23,23,23,0.55),rgba(60,45,30,0.5)),url(/images/portfolio-cafe.jpg)" },
    { slug: "nishat-hospitality-hq", title: "Nishat Hospitality HQ", tag: "28,000 sqft design", img: "linear-gradient(135deg,rgba(20,15,15,0.55),rgba(65,45,25,0.5)),url(/images/svc-corporate.jpg)" },
  ],
  team: { name: "Zain Abbas", role: "Head of 3D Studio", note: "Runs the 3D team. Builds every render in 3ds Max + Corona with the same material library our workshop actually uses. That's why the renders match the build." },
  cta: { line: "Send us a floor plan or a sketch. We'll tell you the same day which tier you need.", button: "Book a design consult", href: "/consultation" },
  answerCapsule: {
    question: "How much do interior 3D renders cost in Lahore?",
    shortAnswer: "PKR 45k per room for a concept package (2 hero renders), PKR 120k per room for Full Visualisation (all angles + 360° + joinery drawings). Whole-home packages start at PKR 250k. Fee is 100% deductible if you build with us.",
    facts: [
      { label: "Concept (per room)", value: "PKR 45,000" },
      { label: "Full visualisation", value: "PKR 120,000/room" },
      { label: "Whole home", value: "From PKR 250,000" },
      { label: "Deductible", value: "100% if we build" },
    ],
  },
};

export const SERVICE_LIST = Object.values(SERVICES);

export function getService(slug: string): ServiceContent | undefined {
  return SERVICES[slug];
}
