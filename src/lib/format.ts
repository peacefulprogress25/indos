// Pure formatting helpers for credits (currency + dates).
// Kept framework-free so they can be unit-tested without a React/jsdom setup.
//
// Unit note: the backend stores/transmits money as PAISE (balance_paise,
// transaction.amount). The /api/credits/simulate request, however, expects the
// `amount` in whole INR RUPEES (it multiplies by 100 internally) — so the
// top-up buttons send rupees (500/1000/5000), not paise.

const inrFormatter = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Format a paise amount as an unsigned INR string.
 * 5000 → "₹50.00", 50000 → "₹500.00", -142 → "₹1.42".
 */
export function formatRupees(paise: number): string {
  return `₹${inrFormatter.format(Math.abs(paise) / 100)}`;
}

/**
 * Format a paise amount with an explicit sign.
 * 5000 → "+₹50.00", -142 → "-₹1.42", 0 → "+₹0.00".
 */
export function formatSigned(paise: number): string {
  const sign = paise < 0 ? '-' : '+';
  return `${sign}${formatRupees(paise)}`;
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

/**
 * Format an ISO timestamp as "Jul 16, 2026, 10:30 AM".
 * The date and time parts are formatted separately and joined with a comma
 * so the output is stable regardless of ICU's combined-format quirks.
 * Falls back to the raw string when the input is not a valid date.
 */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${dateFormatter.format(d)}, ${timeFormatter.format(d)}`;
}
