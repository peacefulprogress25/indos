import type { ApiKeyItem } from '../types';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Format an ISO 8601 timestamp as "Jul 16, 2026".
 *
 * Uses UTC getters so the rendered day is stable regardless of the client's
 * timezone (the Go backend stores timestamps in UTC). Returns an em dash for
 * missing or unparseable values so callers never render "Invalid Date".
 */
export function formatDate(iso?: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/**
 * Render the masked form of a key for display, e.g. "inds_sk_0464dda…".
 *
 * Combines the persisted prefix and (optional) suffix. The full secret is only
 * ever returned once — at creation — and is never stored, so the list view can
 * only ever show this masked form.
 */
export function maskKey(
  item: Pick<ApiKeyItem, 'key_prefix' | 'key_suffix'>,
): string {
  const prefix = item.key_prefix ?? '';
  const suffix = item.key_suffix;
  return suffix ? `${prefix}…${suffix}` : `${prefix}…`;
}

/**
 * Return only keys that have not been revoked.
 *
 * The backend returns revoked keys with `revoked_at` set; active keys omit the
 * field (or send null), so a falsy check covers both shapes.
 */
export function filterActiveKeys(keys: ApiKeyItem[]): ApiKeyItem[] {
  return keys.filter((k) => !k.revoked_at);
}
