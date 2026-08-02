/**
 * Sprint E3 — GROQ queries. Each query is named, typed, and tagged for on-demand
 * revalidation. Keep projection shapes in sync with the TS interfaces in
 * `src/sanity/types.ts` and the static-content adapters.
 */

export const ALL_SERVICES = /* groq */ `*[_type == "service"] | order(lower(title) asc) {
  _id, _type,
  "slug": slug.current,
  eyebrow, title, italicLine, heroSub,
  "heroImg": heroImg,
  situation, scope, timeline, costBand, proof, faqs,
  relatedProjects[] {
    slug, title, tag,
    "img": img
  },
  team, cta, answerCapsule
}`;

export const SERVICE_BY_SLUG = /* groq */ `*[_type == "service" && slug.current == $slug][0] {
  _id, _type,
  "slug": slug.current,
  eyebrow, title, italicLine, heroSub,
  "heroImg": heroImg,
  situation, scope, timeline, costBand, proof, faqs,
  relatedProjects[] {
    slug, title, tag,
    "img": img
  },
  team, cta, answerCapsule
}`;

export const ALL_PROJECTS = /* groq */ `*[_type == "project"] | order(date desc, title asc) {
  _id, _type,
  "slug": slug.current,
  title, category, location, area, year,
  "heroImg": heroImg,
  "gallery": gallery[] { asset, alt },
  brief, hardPart, build, quote, stats, tags,
  beforeAfter {
    "before": before, "after": after, caption
  }
}`;

export const PROJECT_BY_SLUG = /* groq */ `*[_type == "project" && slug.current == $slug][0] {
  _id, _type,
  "slug": slug.current,
  title, category, location, area, year,
  "heroImg": heroImg,
  "gallery": gallery[] { asset, alt },
  brief, hardPart, build, quote, stats, tags,
  beforeAfter {
    "before": before, "after": after, caption
  }
}`;

export const PROJECTS_BY_CATEGORY = /* groq */ `*[_type == "project" && category == $category] | order(date desc) {
  _id, _type, "slug": slug.current, title, category, area, year,
  "heroImg": heroImg, brief, tags
}`;

export const ALL_POSTS = /* groq */ `*[_type == "post"] | order(date desc) {
  _id, _type,
  "slug": slug.current,
  category, title, deck, readTime, date, author,
  "image": image,
  featured, capsule
}`;

export const POST_BY_SLUG = /* groq */ `*[_type == "post" && slug.current == $slug][0] {
  _id, _type,
  "slug": slug.current,
  category, title, deck, readTime, date, author,
  "image": image,
  featured, capsule,
  portableBody
}`;

export const POSTS_BY_CATEGORY = /* groq */ `*[_type == "post" && category == $category] | order(date desc) {
  _id, _type,
  "slug": slug.current,
  category, title, deck, readTime, date, author,
  "image": image,
  featured, capsule
}`;

export const ALL_TEAM = /* groq */ `*[_type == "teamMember"] | order(order asc, name asc) {
  _id, _type,
  "slug": slug.current,
  name, role, initials, bio,
  "avatar": avatar, order
}`;

export const ALL_FITOUTS = /* groq */ `*[_type == "fitoutService"] | order(lower(title) asc) {
  _id, _type,
  "slug": slug.current,
  eyebrow, title, italicLine, heroSub,
  "heroImg": heroImg,
  included, timeline, cost, cta
}`;

export const FITOUT_BY_SLUG = /* groq */ `*[_type == "fitoutService" && slug.current == $slug][0] {
  _id, _type,
  "slug": slug.current,
  eyebrow, title, italicLine, heroSub,
  "heroImg": heroImg,
  included, timeline, cost, cta
}`;

export const ALL_LOCATIONS = /* groq */ `*[_type == "location"] {
  _id, _type,
  "slug": slug.current,
  city, region, heroHeading, heroSub,
  "heroImg": heroImg,
  areasServed, stats, body
}`;

export const LOCATION_BY_SLUG = /* groq */ `*[_type == "location" && slug.current == $slug][0] {
  _id, _type,
  "slug": slug.current,
  city, region, heroHeading, heroSub,
  "heroImg": heroImg,
  areasServed, stats, body
}`;

export const SITE_SETTINGS = /* groq */ `*[_type == "siteSettings"][0] {
  title, tagline, phoneDisplay, phoneTel, whatsapp, email,
  addressLine1, addressCity, hoursShort,
  socialInstagram, socialLinkedIn, socialBehance,
  "ogImage": ogImage,
  brandPrimary, brandAccent, terracotta, graphite, paper,
  headingFont, bodyFont, radiusPx, containerMax
}`;

/** Fragment used by page queries to expand every known section type.
 *  Images are projected fully (asset + hotspot + crop + alt) so we can render
 *  editor-applied focal crops in the frontend via imageUrl().
 *  Reference picks for data-bound sections are expanded to the referenced docs.
 */
const IMG_FRAG = /* groq */ `{
  ...,
  "asset": asset,
  "alt": coalesce(alt, "")
}`;
const SERVICE_CARD_FRAG = /* groq */ `{
  "slug": slug.current, title, heroSub,
  "heroImg": heroImg${IMG_FRAG}
}`;
const PROJECT_CARD_FRAG = /* groq */ `{
  "slug": slug.current, title, category, location, area, year,
  "heroImg": heroImg${IMG_FRAG}
}`;

const SECTION_FRAGMENT = /* groq */ `
  _type, _key,
  _type == "section.hero" => {
    eyebrow, heading, headingItalic, sub, ctaLabel, ctaHref, secondaryLabel, secondaryHref, layout,
    "image": image${IMG_FRAG}, "imageAlt": image.alt
  },
  _type == "section.ctaFinal" => { eyebrow, heading, headingLine2, body, ctaLabel, ctaHref, secondaryLabel, secondaryHref, stats, theme },
  _type == "section.faq" => { eyebrow, heading, headingLine2, intro, ctaLabel, ctaHref, items[] { question, answer } },
  _type == "section.marquee" => {
    eyebrow, speed,
    logos[] { name, href, "logo": logo${IMG_FRAG} }
  },
  _type == "section.proofStack" => {
    eyebrow, heading, headingLine2, headingLine3, intro, ctaLabel, ctaHref, source,
    metrics, testimonials[] { quote, name, role, project }, ratingText
  },
  _type == "section.aboutBrief" => { eyebrow, heading, headingItalic, headingLine2, headingLine2Italic, paragraphs, imageEyebrowLeft, imageEyebrowRight, imageCaption, floatingStatValue, floatingStatSuffix, floatingStatText, stats[]{ value, suffix, label } },
  _type == "section.textBlock" => {
    eyebrow, heading, headingItalic, body,
    "image": image${IMG_FRAG}, "imageAlt": image.alt,
    imagePosition, width
  },
  _type == "section.datastrip" => { eyebrow, items, theme },
  _type == "section.prose" => { body },
  _type == "section.divider" => { style, label, size },
  _type == "section.image" => { "image": image${IMG_FRAG}, alt, caption, layout, aspect },
  _type == "section.servicesGrid" => {
    eyebrow, heading, headingItalic, intro, source, category,
    "picks": picks[]->${SERVICE_CARD_FRAG},
    cards[] { title, tagline, href, size,
      "image": image${IMG_FRAG} }
  },
  _type == "section.projectsRail" => {
    eyebrow, heading, headingItalic, ctaLabel, ctaHref, source, count, category,
    "picks": picks[]->${PROJECT_CARD_FRAG}
  },
  _type == "section.processRail" => { eyebrow, heading, intro, steps },
  _type == "section.blogCta" => { eyebrow, heading, sub, ctaLabel, theme },
  _type == "section.map" => { eyebrow, heading, sub, hours, embedUrl },
  _type == "section.freeform" => { name, content },
  _type == "section.contactForm" => { heading, sub, source }
`;

export const PAGE_BY_SLUG = /* groq */ `*[_type == "page" && slug.current == $slug][0] {
  _id, _type,
  title,
  "slug": slug.current,
  isNavRoot, navOrder, navLabel,
  seo { metaTitle, metaDescription, "ogImage": ogImage.asset->url, noIndex },
  sections[] { ${SECTION_FRAGMENT} }
}`;

export const ALL_PAGES = /* groq */ `*[_type == "page" && defined(slug.current) && (!defined(seo.noIndex) || seo.noIndex != true)] {
  "slug": slug.current
}`;

export const NAV_PAGES = /* groq */ `*[_type == "page" && isNavRoot == true] | order(navOrder asc) {
  title, "slug": slug.current, navLabel
}`;
