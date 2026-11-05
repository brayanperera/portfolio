const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 5000;

const hits = new Map<string, { count: number; resetAt: number }>();

/**
 * Basic fixed-window, in-memory limit keyed by IP. Each serverless instance keeps
 * its own map, so this only slows down casual abuse. Upstash Redis or Vercel KV
 * could replace it if a shared limit is ever needed.
 */
export function isRateLimited(key: string, now = Date.now()): boolean {
  if (hits.size > MAX_TRACKED_KEYS) {
    for (const [storedKey, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(storedKey);
    }
  }

  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}
