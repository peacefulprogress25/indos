import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { formatBalance, formatCount, QUICKSTART_CURL } from './dashboard-format';
import type { CreditBalance } from '../types';

describe('formatBalance', () => {
  it('returns "—" when there is no balance', () => {
    assert.equal(formatBalance(null), '—');
    assert.equal(formatBalance(undefined), '—');
  });

  it('formats a whole-rupee balance with 2 decimals', () => {
    const bal: CreditBalance = { balance_paise: 5000, balance_inr: 50 };
    assert.equal(formatBalance(bal), '₹50.00');
  });

  it('formats zero balance', () => {
    const bal: CreditBalance = { balance_paise: 0, balance_inr: 0 };
    assert.equal(formatBalance(bal), '₹0.00');
  });

  it('rounds fractional balances to 2 decimals', () => {
    assert.equal(
      formatBalance({ balance_paise: 1250, balance_inr: 12.5 }),
      '₹12.50'
    );
    // toFixed(2) does not add thousands grouping (matches formatCost in usage-format)
    assert.equal(
      formatBalance({ balance_paise: 123450, balance_inr: 1234.5 }),
      '₹1234.50'
    );
  });

  it('clamps negative / non-finite balances to zero', () => {
    assert.equal(
      formatBalance({ balance_paise: -100, balance_inr: -1 }),
      '₹0.00'
    );
    assert.equal(
      formatBalance({ balance_paise: 0, balance_inr: NaN }),
      '₹0.00'
    );
  });

  it('returns "—" when balance_inr is missing', () => {
    // @ts-expect-error — simulating a partial/payload shape
    assert.equal(formatBalance({ balance_paise: 5000 }), '—');
  });
});

describe('formatCount', () => {
  it('returns "—" for null / undefined', () => {
    assert.equal(formatCount(null), '—');
    assert.equal(formatCount(undefined), '—');
  });

  it('formats zero', () => {
    assert.equal(formatCount(0), '0');
  });

  it('groups thousands', () => {
    assert.equal(formatCount(1234), '1,234');
    assert.equal(formatCount(612400), '612,400');
  });

  it('clamps negative / non-finite to 0', () => {
    assert.equal(formatCount(-5), '0');
    assert.equal(formatCount(NaN), '0');
    assert.equal(formatCount(Infinity), '0');
  });
});

describe('QUICKSTART_CURL', () => {
  it('targets the local chat completions endpoint', () => {
    assert.match(QUICKSTART_CURL, /http:\/\/localhost:8080\/v1\/chat\/completions/);
  });

  it('includes the api-key header placeholder', () => {
    assert.match(QUICKSTART_CURL, /x-api-key: YOUR_API_KEY/);
  });

  it('uses the openrouter gpt-4o-mini model', () => {
    assert.match(QUICKSTART_CURL, /openrouter\/openai\/gpt-4o-mini/);
  });

  it('uses shell line-continuation backslashes (not escaped doubles)', () => {
    // Every continued curl flag line ends with a single trailing backslash.
    const continued = QUICKSTART_CURL.split('\n').filter(
      (l) => !l.trim().startsWith('#') && l.trimEnd().endsWith('\\')
    );
    assert.ok(continued.length >= 3, 'expected at least 3 continuation lines');
    // No literal double-backslash should appear in the rendered snippet.
    assert.equal(QUICKSTART_CURL.includes('\\\\'), false);
  });
});
