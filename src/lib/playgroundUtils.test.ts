import assert from 'node:assert/strict';
import {
  formatPricePerMillion,
  shortModel,
  clampInt,
  computeCostInr,
  formatCost,
} from './playgroundUtils';
import type { AvailableModel } from '../types';

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log('  \u2713', name);
  } catch (e) {
    failed += 1;
    console.error('  \u2717', name);
    console.error('     ', (e as Error).message);
  }
}

const model: AvailableModel = {
  id: '1',
  provider: 'anthropic',
  model: 'claude-haiku-3-5-20250514',
  input_price_per_1m: 80,
  output_price_per_1m: 400,
};

// ── formatPricePerMillion: paise per 1M -> rupees ──
test('80 paise -> "0.8"', () => assert.strictEqual(formatPricePerMillion(80), '0.8'));
test('14 paise -> "0.14"', () => assert.strictEqual(formatPricePerMillion(14), '0.14'));
test('250 paise -> "2.5"', () => assert.strictEqual(formatPricePerMillion(250), '2.5'));
test('1000 paise -> "10"', () => assert.strictEqual(formatPricePerMillion(1000), '10'));
test('0 paise -> "0"', () => assert.strictEqual(formatPricePerMillion(0), '0'));

// ── shortModel ──
test('strips provider + date suffix', () =>
  assert.strictEqual(shortModel('anthropic/claude-haiku-3-5-20250514'), 'claude-haiku-3-5'));
test('keeps model without slash', () => assert.strictEqual(shortModel('gpt-4o'), 'gpt-4o'));
test('undefined -> "assistant"', () => assert.strictEqual(shortModel(undefined), 'assistant'));
test('nested slash keeps remainder', () =>
  assert.strictEqual(shortModel('openrouter/openai/gpt-4o-mini'), 'openai/gpt-4o-mini'));

// ── clampInt ──
test('clamps above max', () => assert.strictEqual(clampInt('9999', 1, 4096, 500), 4096));
test('clamps below min', () => assert.strictEqual(clampInt('0', 1, 4096, 500), 1));
test('passes through valid value', () => assert.strictEqual(clampInt('250', 1, 4096, 500), 250));
test('empty -> fallback', () => assert.strictEqual(clampInt('', 1, 4096, 500), 500));
test('non-numeric -> fallback', () => assert.strictEqual(clampInt('abc', 1, 4096, 500), 500));

// ── computeCostInr: (in*inPrice + out*outPrice)/1e6/100 ──
test('cost matches formula (10 in, 20 out)', () => {
  const cost = computeCostInr(model, { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 });
  // (10*80 + 20*400)/1_000_000/100 = 8800/1e6/100 = 0.000088
  assert.ok(Math.abs(cost - 0.000088) < 1e-12, `expected ~0.000088, got ${cost}`);
});
test('zero tokens -> 0', () =>
  assert.strictEqual(
    computeCostInr(model, { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }),
    0,
  ));

// ── formatCost ──
test('tiny cost -> "<0.0001"', () => assert.strictEqual(formatCost(0.000088), '<0.0001'));
test('0.0003 -> "0.0003"', () => assert.strictEqual(formatCost(0.0003), '0.0003'));
test('0.5 -> "0.5" (no trailing zeros)', () => assert.strictEqual(formatCost(0.5), '0.5'));
test('10 -> "10"', () => assert.strictEqual(formatCost(10), '10'));
test('0 -> "0"', () => assert.strictEqual(formatCost(0), '0'));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exitCode = 1;
