import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, Cpu, Activity, Copy, Check, type LucideIcon } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { apiFetch } from '../lib/api';
import type { CreditBalance, UsageStats } from '../types';
import { formatBalance, formatCount, QUICKSTART_CURL } from './dashboard-format';

interface StatCard {
  label: string;
  value: string;
  icon: LucideIcon;
  iconClass: string;
  tag: string;
  valueClass: string;
}

export default function DashboardPage() {
  const { user } = useAuth();

  const [balance, setBalance] = useState<CreditBalance | null>(null);
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [usageError, setUsageError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Fetch credit balance + usage stats in parallel; one failing must not block
  // the other. apiFetch returns null on 401 (handled by the route guard) and
  // throws on network/server errors.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [balRes, useRes] = await Promise.allSettled([
        apiFetch<CreditBalance>('/api/credits/balance'),
        apiFetch<UsageStats>('/api/usage'),
      ]);

      if (cancelled) return;

      if (balRes.status === 'fulfilled') {
        setBalance(balRes.value);
      } else {
        setBalanceError(
          balRes.reason instanceof Error ? balRes.reason.message : 'Failed to load credit balance.'
        );
      }

      if (useRes.status === 'fulfilled') {
        setUsage(useRes.value);
      } else {
        setUsageError(
          useRes.reason instanceof Error ? useRes.reason.message : 'Failed to load usage stats.'
        );
      }

      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(QUICKSTART_CURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. non-secure context) — no-op.
    }
  }

  const displayName = user?.name || user?.email?.split('@')[0] || 'there';
  const error = balanceError || usageError;

  const stats: StatCard[] = [
    {
      label: 'Credit Balance',
      value: formatBalance(balance),
      icon: Wallet,
      iconClass: 'bg-brand-orange/10 border-brand-orange/25 text-brand-orange',
      tag: 'Credits',
      valueClass: 'text-brand-orange',
    },
    {
      label: 'Total Tokens',
      value: formatCount(usage?.total_tokens),
      icon: Cpu,
      iconClass: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
      tag: 'All-time',
      valueClass: 'text-white',
    },
    {
      label: 'Total Requests',
      value: formatCount(usage?.total_requests),
      icon: Activity,
      iconClass: 'bg-blue-500/10 border-blue-500/25 text-blue-400',
      tag: 'All-time',
      valueClass: 'text-white',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand-orange mb-3">
          // Dashboard
        </p>
        <h1 className="font-display text-3xl font-bold text-white tracking-tight">
          Welcome back, {displayName}
        </h1>
        <div className="w-16 h-1 bg-brand-orange rounded-full mt-3 mb-3" />
        <p className="text-gray-400 text-sm max-w-xl">
          Your unified API for 30+ models. One key, one endpoint, priced in INR.
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#0B1120] border border-[#1E293B]/60 rounded-xl p-6 animate-pulse"
              >
                <div className="h-10 w-10 rounded-lg bg-[#1E293B]/60 mb-4" />
                <div className="h-8 w-24 rounded bg-[#1E293B]/60 mb-3" />
                <div className="h-4 w-20 rounded bg-[#1E293B]/40" />
              </div>
            ))
          : stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#0B1120] border border-[#1E293B]/60 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${s.iconClass}`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
                    {s.tag}
                  </span>
                </div>
                <div className={`text-3xl font-bold ${s.valueClass}`}>{s.value}</div>
                <div className="text-sm text-gray-400 mt-2">{s.label}</div>
              </motion.div>
            ))}
      </div>

      {error && <p className="text-sm text-red-400 mt-3">{error}</p>}

      {/* Quickstart */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-white mb-4">Quickstart</h2>
        <div className="relative bg-[#0B1120] border border-[#1E293B]/60 rounded-xl p-6">
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 px-3 py-1 bg-[#1E293B] hover:bg-[#334155] rounded text-xs text-gray-300 flex items-center gap-1.5 transition-colors"
            aria-label="Copy quickstart command"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <pre className="bg-[#070C16] rounded-lg p-4 pr-20 font-mono text-sm text-gray-300 overflow-x-auto">
            <code>{QUICKSTART_CURL}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
