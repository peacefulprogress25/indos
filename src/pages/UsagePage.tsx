import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { apiFetch } from '../lib/api';
import type { UsageStats, ModelUsage, ProviderUsage } from '../types';
import {
  formatTokens,
  formatCost,
  formatModelName,
  hasUsage,
} from './usage-format';

const CARD = 'bg-[#0B1120] border border-[#1E293B]/60 rounded-xl p-6';
const ROW =
  'bg-[#0B1120] border border-[#1E293B]/60 rounded-lg p-3 flex justify-between items-center';
const SECTION_HEADER = 'font-display text-lg font-semibold text-white';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

/** Three stat cards: Tokens, Total Cost, Requests. */
function StatCards({ stats }: { stats: UsageStats }) {
  const cards = [
    { value: formatTokens(stats.total_tokens), label: 'Tokens' },
    { value: formatCost(stats.total_cost_inr), label: 'Total Cost' },
    { value: formatTokens(stats.total_requests), label: 'Requests' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          {...fadeUp}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className={CARD}
        >
          <div className="text-3xl font-bold text-white">{c.value}</div>
          <div className="text-sm text-gray-400 mt-2">{c.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

function ModelRow({ m }: { m: ModelUsage }) {
  return (
    <div className={ROW}>
      <span className="font-mono text-sm text-white">
        {formatModelName(m.provider, m.model)}
      </span>
      <span className="text-sm text-gray-400">
        {formatTokens(m.tokens)} tokens · {formatCost(m.cost_inr)}
      </span>
    </div>
  );
}

function ProviderRow({ p }: { p: ProviderUsage }) {
  return (
    <div className={ROW}>
      <span className="font-mono text-sm text-white">{p.provider}</span>
      <span className="text-sm text-gray-400">
        {formatTokens(p.tokens)} · {formatCost(p.cost_inr)}
      </span>
    </div>
  );
}

export default function UsagePage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsage = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<UsageStats>('/api/usage');
      if (data === null) {
        // 401 — session expired; route guard / landing handles re-auth.
        navigate('/', { replace: true });
        return;
      }
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load usage data.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadUsage();
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
  }, [loadUsage]);

  const models = stats?.by_model ?? [];
  const providers = stats?.by_provider ?? [];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white tracking-tight">
          Usage
        </h1>
        <div className="w-16 h-1 bg-brand-orange rounded-full mt-3" />
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`${CARD} animate-pulse`}>
              <div className="h-8 w-24 bg-[#1E293B]/60 rounded mb-3" />
              <div className="h-4 w-16 bg-[#1E293B]/40 rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="bg-[#0B1120] border border-red-500/30 rounded-xl p-6 text-center">
          <p className="text-sm text-red-400">{error}</p>
          <button
            onClick={loadUsage}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white bg-brand-orange hover:opacity-90 transition-opacity rounded-lg px-4 py-2"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && stats && (
        <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
          <StatCards stats={stats} />

          {hasUsage(stats) ? (
            <div className="mt-8 space-y-8">
              {models.length > 0 && (
                <section>
                  <h2 className={`${SECTION_HEADER} mb-3`}>By Model</h2>
                  <div className="space-y-2">
                    {models.map((m, i) => (
                      <motion.div
                        key={`${m.provider}/${m.model}-${i}`}
                        {...fadeUp}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                      >
                        <ModelRow m={m} />
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {providers.length > 0 && (
                <section>
                  <h2 className={`${SECTION_HEADER} mb-3`}>By Provider</h2>
                  <div className="space-y-2">
                    {providers.map((p, i) => (
                      <motion.div
                        key={`${p.provider}-${i}`}
                        {...fadeUp}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                      >
                        <ProviderRow p={p} />
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="mt-8 bg-[#0B1120] border border-[#1E293B]/60 rounded-xl p-8 text-center">
              <p className="text-sm text-gray-400">
                No usage data yet. Make your first API call to see stats here.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
