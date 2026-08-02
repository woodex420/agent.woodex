/**
 * Fit-Out sub-page content (Sprint 4).
 * These are the three ×××-fit-out services with their required unique sections:
 * comparison checklist, org-chart "who's on site", Friday Report artifact,
 * occupied-vs-empty tabs.
 */

export type FitOutContent = {
  slug: string;
  eyebrow: string;
  title: string;
  italicLine: string;
  heroSub: string;
  heroImg: string;
  situation: string[];
  checklist: { included: string[]; excluded: string[] };
  team: { role: string; name: string; note: string }[];
  occupiedVsEmpty: { occupied: string; empty: string };
  fridayReportSample: {
    week: string;
    shipped: string[];
    shipping: string[];
    budget: string;
    risks: string;
    photo: string;
  };
};

export const FITOUTS: Record<string, FitOutContent> = {
  "office-fit-out": {
    slug: "office-fit-out",
    eyebrow: "Office Fit-Out",
    title: "A floor your team",
    italicLine: "actually wants to work on.",
    heroSub:
      "CAT-A/CAT-B office fit-outs from 2,000 sqft to 40,000 sqft — acoustic treatment, ergonomic workstations, collaboration zones, all delivered to a fixed date.",
    heroImg: "linear-gradient(135deg,rgba(15,15,15,0.55),rgba(55,40,25,0.5)),url(/images/svc-commercial.jpg)",
    situation: [
      "A successful office fit-out isn't about what it looks like on move-in day. It's about whether your people actually want to come in three months later. Acoustics that let you take a call. Lighting that doesn't give you a headache by 3pm. A pantry that doesn't back up.",
      "We've delivered 40+ office floors across Lahore, for teams from 20 to 450 people. We know where the bodies are buried in IT Heights, in Packages Mall towers, in DHA Raya. We'll tell you which landlords will actually cooperate on HVAC upgrades before you sign.",
    ],
    checklist: {
      included: [
        "Space planning, test-fits, 3D walkthrough",
        "Demolition and strip-out as needed",
        "MEP coordination (power, data, HVAC, fire)",
        "Raised floors / ceilings, partitions, doors",
        "Flooring, wall finishes, paint, glazing",
        "Workstations, task chairs, meeting-room furniture",
        "Pantry / breakout joinery and appliances",
        "Signage, wayfinding, brand application",
        "AV and IT infrastructure coordination",
        "12-month defects warranty",
      ],
      excluded: [
        "IT/network hardware and servers (we coordinate with your IT)",
        "Specialist audio-visual kit (videowalls, etc.) — quoted separately",
        "Landlord's base-building works (we negotiate on your behalf)",
        "Relocation logistics and IT migration — optional add-on",
      ],
    },
    team: [
      { role: "Project Lead", name: "Hamza Saeed", note: "Single point of contact, runs the Friday Report." },
      { role: "Site Supervisor", name: "Ustad Riaz", note: "On site every day the build runs." },
      { role: "MEP Coordinator", name: "Engr. Danish Akmal", note: "Coordinates with landlord and your IT." },
      { role: "Joinery Lead", name: "Ustad Imran", note: "Workshop-made joinery under our factory QC." },
      { role: "Designer (your scheme)", name: "Aymen Khan / Zain Abbas", note: "Signs off the 3D you approved." },
    ],
    occupiedVsEmpty: {
      occupied:
        "Phased delivery in an occupied building: after-hours and weekend crews, sealed hoardings with dust extraction, shared corridor protection, and a hard rule about 5pm noise cutoff. We've delivered occupied floors in IT Heights without a single complaint from other tenants.",
      empty:
        "Empty-shell fit-out is faster (30-40% shorter timeline) because we can run trades in parallel and don't have to decant anyone. Typically the right move if you're taking a new lease and have a lead time of 8+ weeks.",
    },
    fridayReportSample: {
      week: "Week 6 of 13",
      shipped: [
        "MEP first-fix complete and pressure-tested",
        "Partition walls framed, drywall up on zones 1-3",
        "Pantry joinery in workshop — QC passed",
      ],
      shipping: [
        "Ceiling grid starts Monday",
        "Screed pour Thursday night",
        "Data cabling begins with your IT vendor",
      ],
      budget: "58% spent · on track · approved variances: 0",
      risks: "Landlord hasn't signed off on HVAC damper — escalated Tuesday, expected by Monday. Float: 4 days.",
      photo: "linear-gradient(135deg,rgba(20,20,20,0.5),rgba(50,35,20,0.5)),url(/images/svc-commercial.jpg)",
    },
  },

  "commercial-fit-out": {
    slug: "commercial-fit-out",
    eyebrow: "Commercial Fit-Out (CAT B)",
    title: "Shell to working floor",
    italicLine: "in one contract.",
    heroSub:
      "CAT-B fit-out for tenants taking shell-and-core space, and landlords delivering speculative floors — everything from MEP rough-in to furniture and branding.",
    heroImg: "linear-gradient(135deg,rgba(20,18,15,0.55),rgba(55,40,25,0.5)),url(/images/svc-corporate.jpg)",
    situation: [
      "CAT-B is where shell-and-core becomes a working office. It's where the base-building's promises get tested. If you're a tenant, your rent-free period is ticking. If you're a landlord, your agent wants photos for the brochure.",
      "We work both sides of the table. We know what landlords actually require for handover sign-off, and we know what tenants actually need on day one.",
    ],
    checklist: {
      included: [
        "Full CAT-B scope from shell to occupation",
        "Landlord liaison and base-building sign-off",
        "MEP distribution from landlord risers",
        "Partitions, ceilings, flooring, finishes",
        "Joinery, furniture, fixtures",
        "Signage, wayfinding, brand application",
        "BCP and move-in coordination",
        "Snagging, O&M manuals, handover pack",
      ],
      excluded: [
        "IT/telecoms hardware supply (we coordinate)",
        "Specialist kitchen/catering equipment",
        "Security/access-control hardware",
        "Landlord's own base-building works",
      ],
    },
    team: [
      { role: "Director", name: "Bilal Qureshi", note: "Owns the contract, signs the handover." },
      { role: "Project Lead", name: "Hamza Saeed", note: "Day-to-day, writes the Friday Report." },
      { role: "MEP Engineer", name: "Engr. Usman Tariq", note: "Landlord coordination and riser sign-off." },
      { role: "Site Supervisor", name: "Ustad Tahir", note: "On site full-time." },
    ],
    occupiedVsEmpty: {
      occupied:
        "For multi-tenanted buildings where other floors are live. We work to the building's rules — delivery hours, hoardings, fire marshalling — and we coordinate with building management weekly.",
      empty:
        "For new build-outs where we have the run of the floor. Parallel trades, shorter timelines, no noise restrictions — fastest path to handover.",
    },
    fridayReportSample: {
      week: "Week 4 of 10",
      shipped: [
        "Riser connections signed off by landlord",
        "Power and data containment up",
        "Screed poured zones A and B",
      ],
      shipping: [
        "Glazing partitions delivered Wednesday",
        "Raised floor starts Friday",
        "Joinery workshop begins Monday",
      ],
      budget: "42% spent · on track · change orders: 0",
      risks: "Glazier running two days late — caught early, finish date unaffected (3-day float retained).",
      photo: "linear-gradient(135deg,rgba(25,20,15,0.55),rgba(60,40,25,0.5)),url(/images/svc-corporate.jpg)",
    },
  },

  "residential-fit-out": {
    slug: "residential-fit-out",
    eyebrow: "Residential Fit-Out",
    title: "Apartments finished",
    italicLine: "down to the towels.",
    heroSub:
      "Full-apartment fit-out, from bare shell to walk-in-with-your-suitcase — finishes, joinery, furniture, soft-furnishings, styling.",
    heroImg: "linear-gradient(135deg,rgba(30,22,18,0.55),rgba(75,50,30,0.5)),url(/images/svc-residential.jpg)",
    situation: [
      "Most new-apartment fit-outs in Lahore are two projects: the contractor who does the walls and floors, and then you — sourcing the furniture, waiting six weeks for a sofa that doesn't fit, arguing with the electrician about where the pendant was supposed to hang.",
      "We do all of it. One contract. One timeline. One person answering at 10pm when you notice the grout is wrong.",
    ],
    checklist: {
      included: [
        "Space planning and 3D walkthrough",
        "Civil works, electrical, plumbing upgrades",
        "False ceiling, flooring, paint, tiling",
        "All joinery (wardrobes, kitchen, beds, media)",
        "Loose furniture, rugs, curtains, lighting",
        "Soft furnishings and styling",
        "Smart-home wiring and setup (optional)",
        "Pre-handover deep clean and professional photos",
        "12-month warranty",
      ],
      excluded: [
        "Major structural changes (we refer and coordinate)",
        "Appliances unless specified in BoQ",
        "Art and personal objects (we help place what you own)",
      ],
    },
    team: [
      { role: "Lead Designer", name: "Aymen Khan", note: "Your primary point of contact, signs the 3D." },
      { role: "Project Lead", name: "Zain Ali", note: "Runs the schedule and site." },
      { role: "Site Supervisor", name: "Ustad Javed", note: "On site every working day." },
      { role: "Stylist", name: "Mehr Noor", note: "The finishing touches on move-in week." },
    ],
    occupiedVsEmpty: {
      occupied:
        "Partial-fit-out in a home you're living in — we work room-by-room with dust protection, daily cleanup, and a strict end-of-day reset so the space is livable every night.",
      empty:
        "Whole-apartment fit-out in an empty new build — fastest timelines, best pricing, no furniture protection needed.",
    },
    fridayReportSample: {
      week: "Week 9 of 16",
      shipped: [
        "Kitchen installed, appliances fitted",
        "Master wardrobe fitted and painted",
        "Flooring complete throughout",
      ],
      shipping: [
        "Paint finishing touch-ups",
        "Lounge sofa arrives Wednesday",
        "Styling begins next week",
      ],
      budget: "68% spent · slight over on tile import (+PKR 85k, approved in writing w/c 6)",
      risks: "Imported pendant running 5 days late — backup option approved by client, no date impact.",
      photo: "linear-gradient(135deg,rgba(25,20,15,0.55),rgba(70,45,25,0.5)),url(/images/svc-residential.jpg)",
    },
  },
};

export const FITOUT_LIST = Object.values(FITOUTS);

export function getFitOut(slug: string): FitOutContent | undefined {
  return FITOUTS[slug];
}
