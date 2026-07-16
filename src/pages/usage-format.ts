import type { UsageStats } from '../types';

/**
 * Pure formatting/detection helpers for the Usage page.
 *
 * Kept in a framework-agnostic module (no React imports) so they can be unit
 * tested directly without a DOM environment.
 */

/** Format a token/request count with thousands grouping (1234 → "1,234"). */
export function formatTokens(n: number): string {
  const v = Number.isFinite(n) ? Math.max(0, n) : 0;
  return v.toLocaleString('en-US');
}

/** Format an INR cost with rupee sign and 2 decimals (0.1 → "₹0.10"). */
export function formatCost(n: number): string {
  const v = Number.isFinite(n) ? Math.max(0, n) : 0;
  return `₹${v.toFixed(2)}`;
}

/** Compose the display name for a model entry: "provider/model". */
export function formatModelName(provider: string, model: string): string {
  return `${provider}/${model}`;
}

/**
 * True when the stats object represents real usage — any non-zero top-level
 * metric or at least one breakdown row. Used to switch between the populated
 * breakdown sections and the empty state.
 */
export function hasUsage(stats: UsageStats | null | undefined): boolean {
  if (!stats) return false;
  return (
    stats.total_tokens > 0 ||
    stats.total_requests > 0 ||
    (stats.by_model?.length ?? 0) > 0 ||
    (stats.by_provider?.length ?? 0) > 0
  );
}
