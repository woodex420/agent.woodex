import type { MetadataRoute } from "next";
import { SERVICE_LIST } from "@/lib/content/services";
import { PROJECTS } from "@/lib/content/projects";
import { POSTS, CATEGORY_META } from "@/lib/content/posts";
import { LOCATIONS } from "@/lib/content/locations";
import { getAllPages } from "@/lib/sanity/page-helpers";

const BASE = "https://woodex.studio";
const now = new Date();

const staticPaths: MetadataRoute.Sitemap = [
  { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE}/3d-studio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE}/consultation`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/legal/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  { url: `${BASE}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
];

const servicePaths = SERVICE_LIST.map((s) => ({
  url: `${BASE}/services/${s.slug}`,
  lastModified: now,
  changeFrequency: "monthly" as const,
  priority: 0.8,
}));

const projectPaths = PROJECTS.map((p) => ({
  url: `${BASE}/portfolio/${p.slug}`,
  lastModified: now,
  changeFrequency: "monthly" as const,
  priority: 0.7,
}));

const categoryPaths = Object.keys(CATEGORY_META).map((c) => ({
  url: `${BASE}/blog/${c}`,
  lastModified: now,
  changeFrequency: "weekly" as const,
  priority: 0.6,
}));

const postPaths = POSTS.map((p) => ({
  url: `${BASE}/blog/${p.category}/${p.slug}`,
  lastModified: new Date(p.date),
  changeFrequency: "monthly" as const,
  priority: 0.7,
}));

const locationPaths = LOCATIONS.map((l) => ({
  url: `${BASE}/locations/${l.slug}`,
  lastModified: now,
  changeFrequency: "monthly" as const,
  priority: 0.8,
}));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Append builder-managed pages (non-home, not noindex). When Sanity is disabled,
  // getAllPages() returns [] — same output as before.
  const builderPages = (await getAllPages())
    .filter((p) => p.slug && p.slug !== "home")
    .map((p) => ({
      url: `${BASE}/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  return [
    ...staticPaths,
    ...servicePaths,
    ...projectPaths,
    ...categoryPaths,
    ...postPaths,
    ...locationPaths,
    ...builderPages,
  ];
}

export { CATEGORY_META };
