import type { CreditBalance } from '../types';

/**
 * Pure helpers for the Dashboard page.
 *
 * Kept in a framework-agnostic module (no React imports) so they can be unit
 * tested directly without a DOM environment, mirroring usage-format.ts.
 */

/** Constant quickstart cURL snippet shown in the Quickstart card. */
export const QUICKSTART_CURL = `# OpenAI-compatible — point any SDK at Indos
curl http://localhost:8080/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{"model":"openrouter/openai/gpt-4o-mini",
       "messages":[{"role":"user",
       "content":"Hello"}]}'`;

/**
 * Resolve a credit balance object to a display string.
 * Returns "—" when there is no balance yet (still loading / unavailable),
 * otherwise formats the INR amount with a rupee sign and 2 decimals.
 */
export function formatBalance(balance: CreditBalance | null | undefined): string {
  if (!balance || balance.balance_inr == null) return '—';
  const v = Number.isFinite(balance.balance_inr) ? Math.max(0, balance.balance_inr) : 0;
  return `₹${v.toFixed(2)}`;
}

/**
 * Format a token / request count with thousands grouping (1234 → "1,234").
 * Returns "—" when the value is absent (stats not loaded yet); non-finite or
 * negative values clamp to 0.
 */
export function formatCount(n: number | null | undefined): string {
  if (n == null) return '—';
  const v = Number.isFinite(n) ? Math.max(0, n) : 0;
  return v.toLocaleString('en-US');
}
