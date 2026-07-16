import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus, Minus, RefreshCw, AlertCircle } from 'lucide-react';
import { apiFetch } from '../lib/api';
import { formatRupees, formatSigned, formatDateTime } from '../lib/format';
import type {
  CreditBalance,
  CreditTransaction,
  CreditTransactionsResponse,
} from '../types';

interface TopupOption {
  label: string;
  amount: number; // INR rupees — /api/credits/simulate expects rupees (NOT paise)
}

const TOPUP_OPTIONS: TopupOption[] = [
  { label: '₹500', amount: 500 }, // ₹500
  { label: '₹1,000', amount: 1000 }, // ₹1,000
  { label: '₹5,000', amount: 5000 }, // ₹5,000
];

export default function CreditsPage() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<CreditBalance | null>(null);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingAmount, setPendingAmount] = useState<number | null>(null);

  const fetchBalance = useCallback(async () => {
    const data = await apiFetch<CreditBalance>('/api/credits/balance');
    if (data === null) {
      // 401 — session expired; let the router bounce to the landing page.
      navigate('/');
      return;
    }
    setBalance(data);
  }, [navigate]);

  const fetchTransactions = useCallback(async () => {
    const data = await apiFetch<CreditTransactionsResponse>(
      '/api/credits/transactions?limit=20'
    );
    if (data === null) {
      navigate('/');
      return;
    }
    // API wraps the list in `.transactions`.
    setTransactions(data.transactions ?? []);
  }, [navigate]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([fetchBalance(), fetchTransactions()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load credits.');
    } finally {
      setLoading(false);
    }
  }, [fetchBalance, fetchTransactions]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleSimulate = useCallback(
    async (amount: number) => {
      setPendingAmount(amount);
      setError(null);
      try {
        const data = await apiFetch<CreditBalance>('/api/credits/simulate', {
          method: 'POST',
          body: JSON.stringify({ amount }),
        });
        if (data === null) {
          navigate('/');
          return;
        }
        setBalance(data);
        // Refresh history so the new top-up shows up.
        await fetchTransactions();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add credits.');
      } finally {
        setPendingAmount(null);
      }
    },
    [fetchTransactions, navigate]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="max-w-4xl mx-auto"
    >
      {/* Page header */}
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl text-white tracking-tight">
          Credits
        </h1>
        <div className="mt-2 h-1 w-12 rounded-full bg-brand-orange" />
      </div>

      {error && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <div className="flex-1">{error}</div>
          <button
            onClick={loadAll}
            className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-200 transition-colors hover:bg-red-500/10"
          >
            <RefreshCw className="h-3 w-3" /> Retry
          </button>
        </div>
      )}

      {/* Balance card */}
      <div className="bg-[#0B1120] border border-[#1E293B]/60 rounded-xl p-6">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-400">
          <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_0_3px_rgba(74,222,128,0.15)]" />
          Current Balance
        </div>

        <div className="mt-4 font-display text-4xl font-bold text-brand-orange">
          {loading ? (
            <span className="inline-block h-9 w-40 animate-pulse rounded bg-[#1E293B]/60" />
          ) : (
            formatRupees(balance?.balance_paise ?? 0)
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {TOPUP_OPTIONS.map((opt) => {
            const isPending = pendingAmount === opt.amount;
            const disabled = pendingAmount !== null;
            return (
              <button
                key={opt.amount}
                onClick={() => handleSimulate(opt.amount)}
                disabled={disabled}
                className="bg-[#0E1527] border border-[#1E293B] hover:border-brand-orange/40 rounded-lg px-4 py-2 text-sm text-white transition-colors flex min-w-[96px] flex-col items-center gap-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="font-semibold">+ {opt.label}</span>
                <span className="text-[10px] uppercase tracking-wide text-gray-500">
                  {isPending ? 'Adding…' : 'Simulate'}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-xs text-amber-400/80">
          Simulation mode — real Razorpay payments coming soon.
        </p>
      </div>

      {/* Transaction history */}
      <div className="mt-8">
        <h2 className="mb-3 font-display text-lg font-semibold text-white">
          Transaction History
        </h2>

        {loading ? (
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-[#0B1120] border border-[#1E293B]/60 rounded-lg p-3 flex justify-between"
              >
                <div className="space-y-2">
                  <div className="h-4 w-48 animate-pulse rounded bg-[#1E293B]/60" />
                  <div className="h-3 w-32 animate-pulse rounded bg-[#1E293B]/40" />
                </div>
                <div className="h-4 w-16 animate-pulse rounded bg-[#1E293B]/60" />
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="bg-[#0B1120] border border-[#1E293B]/60 rounded-lg p-6 text-center text-sm text-gray-500">
            No transactions yet.
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.map((tx) => {
              const isCredit = tx.amount >= 0;
              return (
                <div
                  key={tx.id}
                  className="bg-[#0B1120] border border-[#1E293B]/60 rounded-lg p-3 flex justify-between items-center"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                        isCredit
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {isCredit ? (
                        <Plus className="h-4 w-4" />
                      ) : (
                        <Minus className="h-4 w-4" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm text-gray-200">
                        {tx.description || tx.type}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {formatDateTime(tx.created_at)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`ml-3 flex-shrink-0 font-mono text-sm font-semibold ${
                      isCredit ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {formatSigned(tx.amount)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
