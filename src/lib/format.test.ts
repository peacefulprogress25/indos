// Unit tests for the pure credits formatting helpers.
// Run with: npx tsx src/lib/format.test.ts
import * as assert from 'node:assert/strict';
import {
  formatRupees,
  formatSigned,
  formatDateTime,
} from './format';

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  \u2713 ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  \u2717 ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

// ── formatRupees (amounts stored/transmitted by the backend are paise) ──
test('formatRupees: 5000 paise \u2192 \u20B950.00', () => {
  assert.equal(formatRupees(5000), '\u20B950.00');
});
test('formatRupees: 50000 paise \u2192 \u20B9500.00', () => {
  assert.equal(formatRupees(50000), '\u20B9500.00');
});
test('formatRupees: 100000 paise \u2192 \u20B91,000.00', () => {
  assert.equal(formatRupees(100000), '\u20B91,000.00');
});
test('formatRupees: 500000 paise \u2192 \u20B95,000.00', () => {
  assert.equal(formatRupees(500000), '\u20B95,000.00');
});
test('formatRupees: negative treated as absolute', () => {
  assert.equal(formatRupees(-142), '\u20B91.42');
});
test('formatRupees: zero \u2192 \u20B90.00', () => {
  assert.equal(formatRupees(0), '\u20B90.00');
});

// ── formatSigned ──
test('formatSigned: positive \u2192 +\u20B950.00', () => {
  assert.equal(formatSigned(5000), '+\u20B950.00');
});
test('formatSigned: negative \u2192 -\u20B91.42', () => {
  assert.equal(formatSigned(-142), '-\u20B91.42');
});
test('formatSigned: zero \u2192 +\u20B90.00', () => {
  assert.equal(formatSigned(0), '+\u20B90.00');
});

// ── formatDateTime (local-time ISO so the result is timezone-independent) ──
test('formatDateTime: local ISO \u2192 Jul 16, 2026, 10:30 AM', () => {
  assert.equal(formatDateTime('2026-07-16T10:30:00'), 'Jul 16, 2026, 10:30 AM');
});
test('formatDateTime: invalid input falls back to raw string', () => {
  assert.equal(formatDateTime('not-a-date'), 'not-a-date');
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
