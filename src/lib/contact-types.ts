/**
 * Shared with the client form. Keep zod out of this file: it would add to the
 * browser bundle, and zod's eval probe trips the Content-Security-Policy.
 */
export const engagementTypes = ["Architecture", "SRE-DevOps", "Product build", "Other"] as const;

export type ContactResponse =
  { ok: true } | { ok: false; error: string; fieldErrors?: Record<string, string> };
