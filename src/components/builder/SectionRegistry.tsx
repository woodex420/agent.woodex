/**
 * Section Registry — the single source of truth mapping Sanity section _type
 * strings to their React components. Phase 1 of the Live Builder.
 *
 * Sections fall into three buckets:
 *   1. "Typed" sections that accept CMS props (we build adapter components).
 *   2. "Static" sections that don't accept props yet — they render their hardcoded
 *      content when dropped onto a page (useful for early pilots; editors can
 *      replace them later with typed versions).
 *   3. Placeholder / not-implemented — renders a visible "coming soon" block so
 *      preview never shows a blank space.
 */
import type { ComponentType } from "react";
import CinematicHero from "@/components/home/CinematicHero";
import Marquee from "@/components/home/Marquee";
import AboutBrief from "@/components/home/AboutBrief";
import ServicesGrid from "@/components/home/ServicesGrid";
import StudioScrub from "@/components/home/StudioScrub";
import FitOutSplit from "@/components/home/FitOutSplit";
import ProcessRail from "@/components/home/ProcessRail";
import ShowcaseRail from "@/components/home/ShowcaseRail";
import ProofStack from "@/components/home/ProofStack";
import ConvoDiagram from "@/components/home/ConvoDiagram";
import FAQ from "@/components/home/FAQ";
import CTAFinal from "@/components/home/CTAFinal";

// Service pages
import ServiceHero from "@/components/service/ServiceHero";
import SituationBlock from "@/components/service/SituationBlock";
import CostBand from "@/components/service/CostBand";
import ScopeMatrix from "@/components/service/ScopeMatrix";
import SignatureProof from "@/components/service/SignatureProof";
import TimelineRail from "@/components/service/TimelineRail";
import TeamCredential from "@/components/service/TeamCredential";
import FAQSection from "@/components/service/FAQSection";
import RelatedProjects from "@/components/service/RelatedProjects";

// Portfolio
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import BeforeAfter from "@/components/portfolio/BeforeAfter";
import ClipGallery from "@/components/portfolio/ClipGallery";
import FlipGrid from "@/components/portfolio/FlipGrid";
import ProjectMap from "@/components/portfolio/ProjectMap";

// Contact
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactFAQ from "@/components/contact/ContactFAQ";
import StudioMap from "@/components/contact/StudioMap";

// About
import FoundingProblem from "@/components/about/FoundingProblem";
import LineDraw from "@/components/about/LineDraw";
import ScrollTimeline from "@/components/about/ScrollTimeline";
import TeamCredentials from "@/components/about/TeamCredentials";
import ValuesAsBehaviors from "@/components/about/ValuesAsBehaviors";
import WorkshopEssay from "@/components/about/WorkshopEssay";

// Blog
import BlogHero from "@/components/blog/BlogHero";
import BlogCTA from "@/components/blog/BlogCTA";
import CategoryTabs from "@/components/blog/CategoryTabs";
import DataStrip from "@/components/blog/DataStrip";
import ArticleChrome from "@/components/blog/ArticleChrome";

// Fitout
import ComparisonChecklist from "@/components/fitout/ComparisonChecklist";
import FridayArtifact from "@/components/fitout/FridayArtifact";
import OccupiedTabs from "@/components/fitout/OccupiedTabs";
import OrgChart from "@/components/fitout/OrgChart";

// Builder-specific (CMS-driven) section components
import CTAFinalSection from "./sections/CTAFinalSection";
import FAQSectionBuilder from "./sections/FAQSection";
import MarqueeSection from "./sections/MarqueeSection";
import ProofStackSection from "./sections/ProofStackSection";
import AboutBriefSection from "./sections/AboutBriefSection";
import HeroSection from "./sections/HeroSection";
import TextBlockSection from "./sections/TextBlockSection";
import DataStripSection from "./sections/DataStripSection";
import ProseSection from "./sections/ProseSection";
import DividerSection from "./sections/DividerSection";
import ImageSection from "./sections/ImageSection";
import MapSection from "./sections/MapSection";
import BlogCtaSection from "./sections/BlogCtaSection";
import FreeformSection from "./sections/FreeformSection";
import ServicesGridSection from "./sections/ServicesGridSection";
import ProjectsRailSection from "./sections/ProjectsRailSection";
import PlaceholderSection from "./sections/PlaceholderSection";

export type SectionCategory =
  | "Hero"
  | "Content"
  | "Proof"
  | "Conversion"
  | "Media"
  | "Layout"
  | "Navigation"
  | "Blog"
  | "Service"
  | "Portfolio";

export interface SectionDef {
  type: string;
  component: ComponentType<any>;
  label: string;
  category: SectionCategory;
  /** When true, the component accepts CMS props and will render editable content. */
  typed: boolean;
  /** Description shown to editors in the "add section" picker. */
  description?: string;
}

/**
 * All registered sections. This array drives:
 *   - Sanity Studio "insert section" UI (via the page schema types list).
 *   - <PageBuilder /> runtime rendering.
 */
export const SECTION_REGISTRY: SectionDef[] = [
  // ===== Typed / CMS-editable (Phase 1 priority) =====
  { type: "section.hero",         component: HeroSection,         label: "Hero (text / text+image)",   category: "Hero",        typed: true, description: "Eyebrow, heading, sub, CTA. Use for non-home pages." },
  { type: "section.ctaFinal",     component: CTAFinalSection,     label: "CTA Final (conversion)",     category: "Conversion",  typed: true, description: "Oak-colored bottom CTA with stat strip." },
  { type: "section.faq",          component: FAQSectionBuilder,   label: "FAQ (accordion)",            category: "Content",     typed: true, description: "Two-column FAQ with expandable answers." },
  { type: "section.marquee",      component: MarqueeSection,      label: "Client logo marquee",        category: "Proof",       typed: true, description: "Animated strip of client names / logos." },
  { type: "section.proofStack",   component: ProofStackSection,   label: "Proof stack (metrics + quotes)", category: "Proof",    typed: true, description: "Dark section with metrics grid + testimonials." },
  { type: "section.aboutBrief",   component: AboutBriefSection,   label: "About brief (image + copy + counters)", category: "Content", typed: true },
  { type: "section.textBlock",    component: TextBlockSection,    label: "Text block (long copy)",     category: "Content",     typed: true },
  { type: "section.datastrip",    component: DataStripSection,    label: "Data strip (big numbers)",   category: "Proof",       typed: true },
  { type: "section.prose",        component: ProseSection,        label: "Prose (article body)",       category: "Content",     typed: true },
  { type: "section.divider",      component: DividerSection,      label: "Divider / spacer",           category: "Layout",      typed: true },
  { type: "section.image",        component: ImageSection,        label: "Image (single)",             category: "Media",       typed: true },
  { type: "section.map",          component: MapSection,          label: "Studio map / location",      category: "Content",     typed: true },
  { type: "section.blogCta",      component: BlogCtaSection,      label: "Blog / newsletter CTA",      category: "Conversion",  typed: true },
  { type: "section.freeform",     component: FreeformSection,     label: "Freeform (rich content)",    category: "Content",     typed: true, description: "Arbitrary rich text — catch-all." },

  // ===== Static sections (no props — render their built-in content) =====
  // These map to typed _type names we will add in a follow-up pass, but today
  // they simply render the existing hardcoded component when dropped on a page.
  { type: "section.cinematicHero", component: CinematicHero,       label: "Cinematic Hero (home)",      category: "Hero",        typed: false },
  { type: "section.servicesGrid",  component: ServicesGridSection, label: "Services grid (bento)",      category: "Content",     typed: true, description: "Data-bound bento grid of services (all / category / manual picks / inline)." },
  { type: "section.studioScrub",   component: StudioScrub,         label: "Studio scrub (interactive)", category: "Media",       typed: false },
  { type: "section.fitOutSplit",   component: FitOutSplit,         label: "Fit-out split (tabs)",       category: "Content",     typed: false },
  { type: "section.processRail",   component: ProcessRail,         label: "Process rail",               category: "Content",     typed: false },
  { type: "section.projectsRail",  component: ProjectsRailSection, label: "Projects carousel",          category: "Media",       typed: true, description: "Data-bound Embla carousel of projects (latest / featured / category / manual picks)." },
  { type: "section.convoDiagram",  component: ConvoDiagram,        label: "Convo diagram (comparison)", category: "Content",     typed: false },
  { type: "section.contactForm",   component: ContactForm,         label: "Contact form",               category: "Conversion",  typed: false },

  // Service / portfolio / about / blog — static for now
  { type: "section.serviceHero",    component: PlaceholderSection, label: "Service Hero (reference)",   category: "Service",     typed: false },
  { type: "section.situationBlock", component: SituationBlock,     label: "Situation block",            category: "Service",     typed: false },
  { type: "section.costBand",       component: CostBand,           label: "Cost band",                  category: "Service",     typed: false },
  { type: "section.scopeMatrix",    component: ScopeMatrix,        label: "Scope matrix",               category: "Service",     typed: false },
  { type: "section.signatureProof", component: SignatureProof,     label: "Signature proof",            category: "Service",     typed: false },
  { type: "section.timelineRail",   component: TimelineRail,       label: "Timeline rail",              category: "Service",     typed: false },
  { type: "section.teamCredential", component: TeamCredential,     label: "Team credential",            category: "Service",     typed: false },
  { type: "section.serviceFaq",     component: FAQSection,         label: "Service FAQ",                category: "Service",     typed: false },
  { type: "section.relatedProjects",component: RelatedProjects,    label: "Related projects",           category: "Service",     typed: false },

  { type: "section.portfolioHero",  component: PlaceholderSection, label: "Portfolio Hero (reference)", category: "Portfolio",   typed: false },
  { type: "section.beforeAfter",    component: BeforeAfter,        label: "Before/After slider",        category: "Portfolio",   typed: false },
  { type: "section.clipGallery",    component: ClipGallery,        label: "Clip gallery",               category: "Portfolio",   typed: false },
  { type: "section.flipGrid",       component: FlipGrid,           label: "Flip grid",                  category: "Portfolio",   typed: false },
  { type: "section.projectMap",     component: ProjectMap,         label: "Project map",                category: "Portfolio",   typed: false },

  { type: "section.contactHero",    component: ContactHero,        label: "Contact hero",               category: "Hero",        typed: false },
  { type: "section.contactFaq",     component: ContactFAQ,         label: "Contact FAQ",                category: "Content",     typed: false },
  { type: "section.studioMap",      component: StudioMap,          label: "Studio map",                 category: "Content",     typed: false },

  { type: "section.foundingProblem", component: FoundingProblem,   label: "Founding problem",           category: "Content",     typed: false },
  { type: "section.lineDraw",        component: LineDraw,          label: "Line draw",                  category: "Content",     typed: false },
  { type: "section.scrollTimeline",  component: ScrollTimeline,    label: "Scroll timeline",            category: "Content",     typed: false },
  { type: "section.teamCredentials", component: TeamCredentials,   label: "Team credentials",           category: "Proof",       typed: false },
  { type: "section.valuesBehaviors", component: ValuesAsBehaviors, label: "Values as behaviors",        category: "Content",     typed: false },
  { type: "section.workshopEssay",   component: WorkshopEssay,     label: "Workshop essay",             category: "Content",     typed: false },

  { type: "section.blogHero",        component: BlogHero,          label: "Blog hero",                  category: "Blog",        typed: false },
  { type: "section.blogCtaBuiltIn",  component: BlogCTA,           label: "Blog CTA (built-in)",        category: "Blog",        typed: false },
  { type: "section.categoryTabs",    component: CategoryTabs,      label: "Category tabs",              category: "Blog",        typed: false },
  { type: "section.dataStripBuiltIn",component: DataStrip,         label: "Data strip (built-in)",      category: "Blog",        typed: false },

  { type: "section.comparisonChecklist", component: ComparisonChecklist, label: "Comparison checklist", category: "Content", typed: false },
  { type: "section.fridayArtifact",      component: FridayArtifact,      label: "Friday artifact",      category: "Content", typed: false },
  { type: "section.occupiedTabs",        component: OccupiedTabs,        label: "Occupied renovation tabs", category: "Content", typed: false },
  { type: "section.orgChart",            component: OrgChart,            label: "Org chart",            category: "Content", typed: false },
];

/**
 * Runtime lookup: _type → React component.
 */
export const SECTION_MAP: Record<string, ComponentType<any>> = Object.fromEntries(
  SECTION_REGISTRY.map((s) => [s.type, s.component])
);

/** Look up a section def by _type. */
export function getSectionDef(type: string): SectionDef | undefined {
  return SECTION_REGISTRY.find((s) => s.type === type);
}
