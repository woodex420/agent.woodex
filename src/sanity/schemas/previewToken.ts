/**
 * Phase 5 — Shareable preview token document.
 *
 * Created by /api/draft/share (POST). Each doc carries a short random `token`,
 * the target `path`, an `expiresAt` timestamp (TTL 7 days), and metadata
 * about who created it. The share-redirect route at GET /api/draft/share/[token]
 * validates + enables draft mode + redirects to `path`.
 *
 * Editors never see this in the desk — it's hidden behind a filter so it acts
 * like a server-only data store.
 */
import { defineType, defineField } from "sanity";

export default defineType({
  name: "previewToken",
  title: "Preview Link",
  type: "document",
  // Hidden from the default desk — accessed via API only.
  __experimental_omnisearch_visibility: false,
  fields: [
    defineField({
      name: "token",
      title: "Token",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "path",
      title: "Target path",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "expiresAt",
      title: "Expires at",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "createdBy",
      title: "Created by",
      type: "string",
    }),
    defineField({
      name: "usedAt",
      title: "Last used at",
      type: "datetime",
    }),
    defineField({
      name: "useCount",
      title: "Use count",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { path: "path", expiresAt: "expiresAt", useCount: "useCount" },
    prepare({ path, expiresAt, useCount }: any) {
      const expired = expiresAt && new Date(expiresAt).getTime() < Date.now();
      return {
        title: path ?? "(no path)",
        subtitle: `${useCount ?? 0} uses · ${expired ? "EXPIRED" : "active"}`,
      };
    },
  },
});
