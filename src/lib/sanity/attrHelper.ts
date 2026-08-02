/**
 * Build a data-sanity attribute string from a SanityScope + sub-path.
 * Works identically to the client-side EditableText computation — exported as
 * a standalone helper so adapters don't need a hook for static data-sanity
 * attrs on wrapper <div>s.
 */
import type { SanityScope } from "@/components/builder/EditableText";
import { createDataAttribute } from "./attrs";

export function scopeAttr(
  scope: SanityScope | null | undefined,
  path: (string | number)[],
): string | undefined {
  if (!scope?.id) return undefined;
  return createDataAttribute({
    id: scope.id,
    type: scope.type,
    basePath: scope.basePath,
  })(path);
}
