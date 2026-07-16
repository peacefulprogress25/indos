/**
 * Dependency-free unit tests for the API Keys helpers.
 *
 * The project has no test runner configured, so these run directly under the
 * already-installed `tsx` loader:
 *
 *   npx tsx src/lib/apiKeyUtils.test.ts
 *
 * Uses node:assert/strict with a tiny pass/fail tally and a non-zero exit code
 * on failure, so CI/agents can detect regressions.
 */
import assert from 'node:assert/strict';
import type { ApiKeyItem } from '../types';
import { formatDate, maskKey, filterActiveKeys } from './apiKeyUtils';

interface Result {
  name: string;
  ok: boolean;
  err?: unknown;
}

const results: Result[] = [];

function test(name: string, fn: () => void): void {
  try {
    fn();
    results.push({ name, ok: true });
  } catch (err) {
    results.push({ name, ok: false, err });
  }
}

// ─── formatDate ───

test('formats a UTC timestamp as "Jul 16, 2026"', () => {
  assert.equal(formatDate('2026-07-16T13:49:32.402896Z'), 'Jul 16, 2026');
});

test('formats the first day of the year', () => {
  assert.equal(formatDate('2026-01-01T00:00:00Z'), 'Jan 1, 2026');
});

test('formats the last day of the year', () => {
  assert.equal(formatDate('2026-12-31T23:59:59Z'), 'Dec 31, 2026');
});

test('is timezone-stable (midnight UTC stays the 16th)', () => {
  assert.equal(formatDate('2026-07-16T00:00:00Z'), 'Jul 16, 2026');
});

test('returns an em dash for undefined', () => {
  assert.equal(formatDate(undefined), '—');
});

test('returns an em dash for null', () => {
  assert.equal(formatDate(null), '—');
});

test('returns an em dash for an empty string', () => {
  assert.equal(formatDate(''), '—');
});

test('returns an em dash for an unparseable date', () => {
  assert.equal(formatDate('not-a-date'), '—');
});

// ─── maskKey ───

test('masks a prefix-only key with a trailing ellipsis', () => {
  assert.equal(maskKey({ key_prefix: 'inds_sk_0464dda' }), 'inds_sk_0464dda…');
});

test('masks a key with both prefix and suffix', () => {
  assert.equal(
    maskKey({ key_prefix: 'inds_sk_a1b2', key_suffix: 'c3d4' }),
    'inds_sk_a1b2…c3d4',
  );
});

test('treats an empty suffix as absent', () => {
  assert.equal(
    maskKey({ key_prefix: 'inds_sk_a1b2', key_suffix: '' }),
    'inds_sk_a1b2…',
  );
});

test('handles a missing prefix gracefully', () => {
  assert.equal(maskKey({ key_prefix: '', key_suffix: 'c3d4' }), '…c3d4');
});

// ─── filterActiveKeys ───

function makeKey(overrides: Partial<ApiKeyItem> = {}): ApiKeyItem {
  return {
    id: '1',
    name: 'Default',
    key_prefix: 'inds_sk_x',
    created_at: '2026-07-16T00:00:00Z',
    ...overrides,
  };
}

test('keeps keys without revoked_at', () => {
  const keys = [makeKey({ id: '1' }), makeKey({ id: '2' })];
  assert.equal(filterActiveKeys(keys).length, 2);
});

test('drops keys with revoked_at set', () => {
  const keys = [
    makeKey({ id: '1' }),
    makeKey({ id: '2', revoked_at: '2026-07-15T00:00:00Z' }),
    makeKey({ id: '3' }),
  ];
  const active = filterActiveKeys(keys);
  assert.equal(active.length, 2);
  assert.deepEqual(
    active.map((k) => k.id),
    ['1', '3'],
  );
});

test('drops keys with a null revoked_at? No — null is falsy, so it stays active', () => {
  // Mirrors the backend, which omits revoked_at for active keys but may send null.
  const keys = [makeKey({ id: '1', revoked_at: undefined })];
  assert.equal(filterActiveKeys(keys).length, 1);
});

test('returns an empty array for an empty input', () => {
  assert.deepEqual(filterActiveKeys([]), []);
});

test('does not mutate the input array', () => {
  const keys = [
    makeKey({ id: '1' }),
    makeKey({ id: '2', revoked_at: '2026-07-15T00:00:00Z' }),
  ];
  const snapshot = keys.map((k) => ({ ...k }));
  filterActiveKeys(keys);
  assert.deepEqual(keys, snapshot);
});

// ─── report ───

const passed = results.filter((r) => r.ok).length;
const failed = results.length - passed;

for (const r of results) {
  if (r.ok) {
    console.log(`  \u2713 ${r.name}`);
  } else {
    console.error(`  \u2717 ${r.name}`);
    console.error('     ', r.err);
  }
}

console.log(`\n${passed} passed, ${failed} failed (${results.length} total)`);

if (failed > 0) {
  process.exit(1);
}
