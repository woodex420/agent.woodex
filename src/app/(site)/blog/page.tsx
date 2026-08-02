import type { Metadata } from "next";
import BlogHero from "@/components/blog/BlogHero";
import CategoryTabs from "@/components/blog/CategoryTabs";
import DataStrip from "@/components/blog/DataStrip";
import BlogCTA from "@/components/blog/BlogCTA";

export const metadata: Metadata = {
  title: "Journal — Woodex Interior, Lahore",
  description:
    "Real numbers, real timelines, real invoices. Interior fit-out costs per sqft in Lahore, material comparisons, case studies, and the mistakes we see first-time clients make.",
};

export default function BlogPage() {
  return (
    <main>
      <BlogHero />
      <CategoryTabs />
      <DataStrip />
      <BlogCTA />
    </main>
  );
}
