/**
 * Phase 5 — SEO Publish Gate.
 *
 * Sanity document action + badge that block publish on the `page` document
 * type until critical SEO + content checks pass. Registered in
 * `sanity.config.ts`.
 *
 * Checks:
 *   1. metaTitle present, length 30–60 chars
 *   2. metaDescription present, length 70–160 chars
 *   3. No images in sections[] missing alt text (recursive)
 *   4. No placeholder text matching /Lorem ipsum|TODO|Add your/i in strings
 *   5. Exactly one H1-equivalent section (sections with role "heading") —
 *      approximated as exactly one section that can produce an <h1>:
 *        - section.hero        → <h1> always
 *        - section.cinematicHero → <h1> always
 *        - other sections      → <h2>
 *      A page must contain exactly one such H1-bearing section.
 *
 * Why not an inspection / validation plugin? Because validation rules in Sanity
 * already cover field-level rules; this gate provides a *publish-time checklist*
 * with jump-to-path links and a visual "ready to publish" badge.
 */
import React, { useEffect, useState } from "react";

const PLACEHOLDER_RE = /Lorem ipsum|TODO\b|Add your|placeholder/i;

export interface CheckIssue {
  id: string;
  level: "error" | "warning";
  message: string;
  /** Path to select in the studio when the user clicks the issue. */
  path?: string[];
}

/**
 * Walk the draft document and return a list of issues.
 * Pure function — safe to call from React render or the action's disabled calc.
 */
export function auditPage(draft: any): { ok: boolean; issues: CheckIssue[] } {
  const issues: CheckIssue[] = [];
  if (!draft) return { ok: false, issues: [{ id: "no-draft", level: "error", message: "No draft to publish." }] };

  // 1 + 2: meta title / description
  const seo = draft.seo ?? {};
  const mt: string = (seo.metaTitle ?? "").trim();
  if (!mt) {
    issues.push({ id: "title-missing", level: "error", message: "Meta title is required.", path: ["seo", "metaTitle"] });
  } else if (mt.length < 30) {
    issues.push({ id: "title-short", level: "warning", message: `Meta title is short (${mt.length}/30 chars). Add 4+ words.`, path: ["seo", "metaTitle"] });
  } else if (mt.length > 60) {
    issues.push({ id: "title-long", level: "warning", message: `Meta title will be truncated in search (${mt.length}/60 chars).`, path: ["seo", "metaTitle"] });
  }

  const md: string = (seo.metaDescription ?? "").trim();
  if (!md) {
    issues.push({ id: "desc-missing", level: "error", message: "Meta description is required.", path: ["seo", "metaDescription"] });
  } else if (md.length < 70) {
    issues.push({ id: "desc-short", level: "warning", message: `Meta description is thin (${md.length}/70 chars).`, path: ["seo", "metaDescription"] });
  } else if (md.length > 160) {
    issues.push({ id: "desc-long", level: "warning", message: `Meta description will truncate (${md.length}/160 chars).`, path: ["seo", "metaDescription"] });
  }

  // 5: H1 count
  const sections = Array.isArray(draft.sections) ? draft.sections : [];
  const H1_TYPES = new Set(["section.hero", "section.cinematicHero", "section.serviceHero", "section.portfolioHero", "section.blogHero"]);
  let h1Count = 0;
  for (const s of sections) if (s && H1_TYPES.has(s._type)) h1Count++;
  if (h1Count === 0) {
    issues.push({ id: "h1-missing", level: "error", message: "Page needs exactly one Hero section (this renders the <h1>)." });
  } else if (h1Count > 1) {
    issues.push({ id: "h1-multiple", level: "error", message: `Page has ${h1Count} Hero sections — keep exactly one so there's a single <h1>.` });
  }

  // 3 + 4: recursive walk of sections for missing alt + placeholder text
  function walk(node: any, path: string[]) {
    if (node == null) return;
    if (typeof node === "string") {
      if (PLACEHOLDER_RE.test(node)) {
        issues.push({
          id: `placeholder-${path.join(".")}`,
          level: "warning",
          message: `Placeholder text found: "${node.slice(0, 50)}${node.length > 50 ? "…" : ""}"`,
          path,
        });
      }
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((c, i) => walk(c, [...path, String(i)]));
      return;
    }
    if (typeof node === "object") {
      // Detect Sanity image fields (have _type === "image" or asset._ref) and
      // require alt unless they are decorative logos.
      if (node._type === "image" || (node.asset && (node.asset._ref || node.asset._type === "reference"))) {
        const parentKey = path[path.length - 1];
        const decorative = parentKey === "logo" || parentKey === "favicon";
        if (!decorative && !(node.alt && String(node.alt).trim().length >= 4)) {
          issues.push({
            id: `img-alt-${path.join(".")}`,
            level: "error",
            message: "Image missing alt text (≥ 4 chars).",
            path: [...path, "alt"],
          });
        }
      }
      for (const k of Object.keys(node)) {
        if (k.startsWith("_") && k !== "_type" && k !== "_key") continue;
        // Don't recurse into asset metadata noise.
        if (k === "asset" || k === "_updatedAt" || k === "_createdAt") continue;
        walk(node[k], [...path, k]);
      }
    }
  }
  walk(sections, ["sections"]);
  walk({ title: draft.title, eyebrow: draft.eyebrow }, []);

  const ok = !issues.some((i) => i.level === "error");
  return { ok, issues };
}

// ------- Sanity UI integration -------

/**
 * Badge that shows SEO health next to the document title.
 */
export function seoGateBadge({ draft, published }: any) {
  const doc = draft ?? published;
  if (!doc || doc._type !== "page") return null;
  const { ok, issues } = auditPage(doc);
  const errors = issues.filter((i) => i.level === "error").length;
  if (ok && issues.length === 0) return { label: "SEO ✓", title: "Ready to publish", color: "success" as const };
  if (ok) return { label: "SEO ~", title: `${issues.length} warning(s) — publishable`, color: "warning" as const };
  return { label: `SEO ✗ (${errors})`, title: `${errors} error(s) block publishing`, color: "danger" as const };
}

/**
 * Replacement Publish action that is disabled until SEO checks pass, and
 * shows a dialog listing issues. Mounted on the `page` document type only.
 */
export function SeoGatePublishAction({ draft, published, onComplete, useDocumentOperation }: any) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { publish } = useDocumentOperation(draft?._id?.replace(/^drafts\./, ""), draft?._type);
  const doc = draft ?? published;
  const { ok, issues } = auditPage(doc ?? {});
  const errors = issues.filter((i) => i.level === "error");
  const warnings = issues.filter((i) => i.level === "warning");

  // When Sanity disables publish at the action level, clicks still open our
  // dialog so editors see what's wrong.
  const onHandle = () => {
    if (!ok) {
      setDialogOpen(true);
      return;
    }
    publish.execute();
    if (onComplete) onComplete();
  };

  // Reflect the disabled state visually after the patch commits.
  useEffect(() => {
    // no-op — audit runs on every render using the current draft
  }, [draft]);

  return {
    label: ok ? "Publish" : `Publish blocked (${errors.length})`,
    tone: ok ? ("positive" as const) : ("critical" as const),
    disabled: !ok,
    onHandle,
    dialog: dialogOpen
      ? {
          type: "popover" as const,
          content: React.createElement(SeoDialog, {
            errors,
            warnings,
            onClose: () => setDialogOpen(false),
          }),
          onClose: () => setDialogOpen(false),
        }
      : null,
  };
}

function SeoDialog({
  errors,
  warnings,
  onClose,
}: {
  errors: CheckIssue[];
  warnings: CheckIssue[];
  onClose: () => void;
}) {
  return React.createElement(
    "div",
    { style: { padding: 16, minWidth: 320, maxWidth: 420 } },
    React.createElement("h3", { style: { margin: "0 0 12px", fontSize: 14, fontWeight: 600 } }, "Fix these before publishing"),
    errors.length > 0 &&
      React.createElement(
        "div",
        { style: { marginBottom: 12 } },
        React.createElement("div", { style: { fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "#c85a3b", marginBottom: 6 } }, `Errors (${errors.length})`),
        React.createElement(
          "ul",
          { style: { margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.5 } },
          ...errors.map((i) => React.createElement("li", { key: i.id }, i.message)),
        ),
      ),
    warnings.length > 0 &&
      React.createElement(
        "div",
        null,
        React.createElement("div", { style: { fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "#b08a4a", marginBottom: 6 } }, `Warnings (${warnings.length})`),
        React.createElement(
          "ul",
          { style: { margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.5 } },
          ...warnings.map((i) => React.createElement("li", { key: i.id }, i.message)),
        ),
      ),
    React.createElement(
      "div",
      { style: { marginTop: 16, textAlign: "right" } },
      React.createElement(
        "button",
        {
          type: "button",
          onClick: onClose,
          style: {
            padding: "8px 14px",
            background: "#171717",
            color: "#faf7f2",
            border: "none",
            borderRadius: 2,
            cursor: "pointer",
            fontSize: 13,
          },
        },
        "Close",
      ),
    ),
  );
}
