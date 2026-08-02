/**
 * Sprint E3 — static-content access layer.
 *
 * Pages/components should import content accessors from `@/lib/sanity/content`
 * instead of directly from `@/lib/content/*`. That module decides at runtime
 * whether to source from Sanity (if NEXT_PUBLIC_SANITY_ENABLED === "true")
 * or from the static TS files below. This module exposes the static accessors
 * with a stable signature so pages don't care which backend is live.
 *
 * IMPORTANT: these return the NATIVE static content shapes (ServiceContent,
 * Project, Post, FitOutContent, LocationContent) — NOT the Sanity document
 * shapes. The Sanity projection layer normalises GROQ results to these same
 * shapes before returning, so consumers stay unchanged.
 */

import { SERVICES, type ServiceContent } from "@/lib/content/services";
import { PROJECTS, type Project } from "@/lib/content/projects";
import { POSTS, CATEGORY_META, type Post, type PostCategory } from "@/lib/content/posts";
import { FITOUTS, type FitOutContent } from "@/lib/content/fitout";
import { LOCATIONS, type LocationContent, getLocation } from "@/lib/content/locations";

// ---- Services -------------------------------------------------------------

export function getAllServicesStatic(): ServiceContent[] {
  return Object.values(SERVICES);
}
export function getServiceStatic(slug: string): ServiceContent | null {
  return SERVICES[slug] ?? null;
}

// ---- Projects -------------------------------------------------------------

export function getAllProjectsStatic(): Project[] {
  return [...PROJECTS];
}
export function getProjectStatic(slug: string): Project | null {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}
export function getProjectsByCategoryStatic(cat: Project["category"]): Project[] {
  return PROJECTS.filter((p) => p.category === cat);
}

// ---- Posts ----------------------------------------------------------------

export function getAllPostsStatic(): Post[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}
export function getPostStatic(slug: string): Post | null {
  return POSTS.find((p) => p.slug === slug) ?? null;
}
export function getPostsByCategoryStatic(cat: PostCategory): Post[] {
  return POSTS.filter((p) => p.category === cat).sort((a, b) => (a.date < b.date ? 1 : -1));
}
export function getCategoryMetaStatic(cat: PostCategory) {
  return CATEGORY_META[cat];
}

// ---- Fit-outs -------------------------------------------------------------

export function getAllFitoutsStatic(): FitOutContent[] {
  return Object.values(FITOUTS);
}
export function getFitoutStatic(slug: string): FitOutContent | null {
  return FITOUTS[slug] ?? null;
}

// ---- Locations ------------------------------------------------------------

export function getAllLocationsStatic(): LocationContent[] {
  return [...LOCATIONS];
}
export function getLocationStatic(slug: string): LocationContent | null {
  return getLocation(slug) ?? null;
}
