import type { AvailableModel } from '../types';

// Usage block returned by the /api/chat endpoint.
export interface ChatUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

let idSeq = 0;
function genId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}-${idSeq++}`;
}
export { genId };

/**
 * Pricing is stored as paise per 1M tokens; convert to rupees for display.
 * e.g. 80 paise/1M -> ₹0.8/M (matches the desktop mockup).
 */
export function formatPricePerMillion(paisePer1m: number): string {
  const rupees = paisePer1m / 100;
  return rupees.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

/** Shorten "anthropic/claude-haiku-3-5-20250514" -> "claude-haiku-3-5". */
export function shortModel(full?: string): string {
  if (!full) return 'assistant';
  const afterSlash = full.includes('/') ? full.slice(full.indexOf('/') + 1) : full;
  return afterSlash.replace(/-\d{8}$/, '');
}

/** Parse a numeric string into [min, max], falling back when empty/invalid. */
export function clampInt(raw: string, min: number, max: number, fallback: number): number {
  const v = parseInt(raw, 10);
  if (Number.isNaN(v)) return fallback;
  return Math.max(min, Math.min(max, v));
}

/** Estimated cost in rupees from paise-per-1M pricing and token usage. */
export function computeCostInr(model: AvailableModel, usage: ChatUsage): number {
  const paise =
    (usage.prompt_tokens * model.input_price_per_1m +
      usage.completion_tokens * model.output_price_per_1m) /
    1_000_000;
  return paise / 100;
}

/** Compact rupee formatting for the small token-usage line. */
export function formatCost(inr: number): string {
  if (inr <= 0) return '0';
  if (inr < 0.0001) return '<0.0001';
  return parseFloat(inr.toFixed(4)).toString();
}
