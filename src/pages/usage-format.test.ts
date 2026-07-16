import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatTokens,
  formatCost,
  formatModelName,
  hasUsage,
} from './usage-format';
import type { UsageStats } from '../types';

describe('formatTokens', () => {
  it('formats zero', () => {
    assert.equal(formatTokens(0), '0');
  });

  it('groups thousands with en-US grouping', () => {
    assert.equal(formatTokens(1234), '1,234');
    assert.equal(formatTokens(612400), '612,400');
    assert.equal(formatTokens(4612), '4,612');
  });

  it('clamps negative / non-finite to 0', () => {
    assert.equal(formatTokens(-5), '0');
    assert.equal(formatTokens(NaN), '0');
    assert.equal(formatTokens(Infinity), '0');
  });
});

describe('formatCost', () => {
  it('formats zero with rupee sign and 2 decimals', () => {
    assert.equal(formatCost(0), '₹0.00');
  });

  it('rounds to 2 decimals', () => {
    assert.equal(formatCost(0.1), '₹0.10');
    assert.equal(formatCost(12.345), '₹12.35');
    assert.equal(formatCost(128.4), '₹128.40');
  });

  it('clamps negative / non-finite to 0', () => {
    assert.equal(formatCost(-1), '₹0.00');
    assert.equal(formatCost(NaN), '₹0.00');
  });
});

describe('formatModelName', () => {
  it('composes provider/model', () => {
    assert.equal(
      formatModelName('openrouter', 'openai/gpt-4o-mini'),
      'openrouter/openai/gpt-4o-mini'
    );
  });

  it('works for a single-segment model', () => {
    assert.equal(formatModelName('openrouter', 'gpt-4o-mini'), 'openrouter/gpt-4o-mini');
  });
});

describe('hasUsage', () => {
  const empty: UsageStats = {
    total_tokens: 0,
    total_requests: 0,
    total_cost_inr: 0,
    by_model: [],
    by_provider: [],
  };

  it('is false for null/undefined', () => {
    assert.equal(hasUsage(null), false);
    assert.equal(hasUsage(undefined), false);
  });

  it('is false for an all-zero stats object', () => {
    assert.equal(hasUsage(empty), false);
  });

  it('is true when total_tokens > 0', () => {
    assert.equal(hasUsage({ ...empty, total_tokens: 5 }), true);
  });

  it('is true when total_requests > 0', () => {
    assert.equal(hasUsage({ ...empty, total_requests: 3 }), true);
  });

  it('is true when by_model has rows even if totals are zero', () => {
    assert.equal(
      hasUsage({
        ...empty,
        by_model: [{ provider: 'openrouter', model: 'x', tokens: 1, cost_inr: 0 }],
      }),
      true
    );
  });

  it('is true when by_provider has rows', () => {
    assert.equal(
      hasUsage({
        ...empty,
        by_provider: [{ provider: 'openrouter', tokens: 0, cost_inr: 0 }],
      }),
      true
    );
  });

  it('is true when breakdown arrays are undefined (totals drive it)', () => {
    assert.equal(
      hasUsage({ total_tokens: 10, total_requests: 0, total_cost_inr: 1 }),
      true
    );
  });
});
