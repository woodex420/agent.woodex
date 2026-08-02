/**
 * Sanity Studio config mounted at /studio.
 *
 * Phase 1: presentationTool (visual editing iframe / WYSIWYG) + "Pages" desk.
 * Phase 5: SEO publish gate — custom publish action + badge on `page` documents.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./sanity/schemas";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { SeoGatePublishAction, seoGateBadge } from "./sanity/plugins/seoGate";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["siteSettings"]);

export default defineConfig({
  name: "woodex-studio",
  title: "Woodex Studio",
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Woodex Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site Settings"),
              ),
            S.divider(),
            S.documentTypeListItem("page").title("Pages (Builder)"),
            S.divider(),
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("post").title("Blog Posts"),
            S.documentTypeListItem("fitoutService").title("Fit-out Services"),
            S.documentTypeListItem("location").title("Locations"),
            S.documentTypeListItem("teamMember").title("Team"),
          ]),
    }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft/enable",
          disable: "/api/draft/disable",
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) => {
      // Singletons (siteSettings): restrict to publish/discard/restore.
      if (singletonTypes.has(context.schemaType)) {
        return input.filter(({ action }) => action && singletonActions.has(action));
      }
      // Page documents: replace the built-in Publish action with the SEO-gated one.
      if (context.schemaType === "page") {
        return input
          .filter(({ action }) => action !== "publish")
          .concat([SeoGatePublishAction as any]);
      }
      return input;
    },
    badges: (input, context) => {
      if (context.schemaType === "page") {
        // Append the SEO-health badge (keep default badges like "Draft"/"Published").
        return [...input, seoGateBadge as any];
      }
      return input;
    },
  },
});
