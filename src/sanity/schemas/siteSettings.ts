import { defineType, defineField } from "sanity";

/**
 * Phase 4 — extended Site Settings with theme-customizer fields.
 * Editors can adjust brand colors, typography, radius, and container width.
 * All values feed CSS custom properties; the existing semantic palette
 * (--bg, --fg, --oak-500, etc.) is derived from these inputs.
 */
export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    // ----- Site identity (pre-existing) -----------------------------------
    defineField({ name: "title", type: "string", initialValue: "Woodex Interior", group: "identity" }),
    defineField({ name: "tagline", type: "string", group: "identity" }),
    defineField({ name: "phoneDisplay", type: "string", group: "identity" }),
    defineField({ name: "phoneTel", type: "string", group: "identity" }),
    defineField({ name: "whatsapp", type: "string", group: "identity" }),
    defineField({ name: "email", type: "string", group: "identity" }),
    defineField({ name: "addressLine1", type: "string", group: "identity" }),
    defineField({ name: "addressCity", type: "string", group: "identity" }),
    defineField({ name: "hoursShort", type: "string", group: "identity" }),
    defineField({ name: "socialInstagram", type: "url", group: "identity" }),
    defineField({ name: "socialLinkedIn", type: "url", group: "identity" }),
    defineField({ name: "socialBehance", type: "url", group: "identity" }),
    defineField({ name: "ogImage", type: "image", options: { hotspot: true }, group: "identity" }),

    // ----- Brand colors (Phase 4 — Theme Customizer) ----------------------
    defineField({
      name: "brandPrimary",
      title: "Brand primary (oak-500)",
      type: "string",
      description:
        "Hex colour for the main warm oak accent, e.g. #a6804a. Used for buttons, links, eyebrow rules, large display type.",
      initialValue: "#a6804a",
      validation: (r) =>
        r.regex(/^#[0-9A-Fa-f]{6}$/, "Hex colour (e.g. #a6804a)").warning(
          "Use a 6-digit hex starting with #",
        ),
      group: "theme",
    }),
    defineField({
      name: "brandAccent",
      title: "Brand accent highlight (oak-300)",
      type: "string",
      description: "Lighter warm highlight used on dark backgrounds and italic serifs.",
      initialValue: "#d2bb8e",
      validation: (r) => r.regex(/^#[0-9A-Fa-f]{6}$/, "Hex colour"),
      group: "theme",
    }),
    defineField({
      name: "terracotta",
      title: "CTA warm accent (accent)",
      type: "string",
      description: "Used for CTA warmth and gradient leaks.",
      initialValue: "#c85a3b",
      validation: (r) => r.regex(/^#[0-9A-Fa-f]{6}$/, "Hex colour"),
      group: "theme",
    }),
    defineField({
      name: "graphite",
      title: "Dark surface (graphite-900)",
      type: "string",
      description: "Footer and dark section backgrounds.",
      initialValue: "#171717",
      validation: (r) => r.regex(/^#[0-9A-Fa-f]{6}$/, "Hex colour"),
      group: "theme",
    }),
    defineField({
      name: "paper",
      title: "Page background (bg)",
      type: "string",
      description: "Light paper colour for the page.",
      initialValue: "#faf7f2",
      validation: (r) => r.regex(/^#[0-9A-Fa-f]{6}$/, "Hex colour"),
      group: "theme",
    }),

    // ----- Typography -----------------------------------------------------
    defineField({
      name: "headingFont",
      title: "Display / heading font",
      type: "string",
      options: {
        list: [
          { title: "Fraunces (current default)", value: "Fraunces" },
          { title: "Playfair Display", value: "Playfair Display" },
          { title: "Manrope", value: "Manrope" },
          { title: "Inter", value: "Inter" },
          { title: "Cormorant Garamond", value: "Cormorant Garamond" },
        ],
      },
      initialValue: "Fraunces",
      group: "theme",
    }),
    defineField({
      name: "bodyFont",
      title: "Body font",
      type: "string",
      options: {
        list: [
          { title: "Inter (default)", value: "Inter" },
          { title: "Manrope", value: "Manrope" },
          { title: "Source Sans 3", value: "Source Sans 3" },
          { title: "IBM Plex Sans", value: "IBM Plex Sans" },
        ],
      },
      initialValue: "Inter",
      group: "theme",
    }),

    // ----- Shape & layout -------------------------------------------------
    defineField({
      name: "radiusPx",
      title: "Corner radius (pixels)",
      description: "Base card/button rounding. 0 = sharp corners, 8 = classic, 16+ = softer.",
      type: "number",
      initialValue: 2,
      validation: (r) => r.min(0).max(32),
      group: "theme",
    }),
    defineField({
      name: "containerMax",
      title: "Container max-width (px)",
      type: "number",
      initialValue: 1280,
      validation: (r) => r.min(960).max(1600),
      group: "theme",
    }),
  ],
  groups: [
    { name: "identity", title: "Identity & contact" },
    { name: "theme", title: "Theme (colours / type / shape)" },
  ],
});
