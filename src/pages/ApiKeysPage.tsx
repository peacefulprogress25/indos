import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Copy, Check, AlertTriangle, CircleAlert, Loader2, Ban } from 'lucide-react';
import { apiFetch } from '../lib/api';
import { formatDate, maskKey, filterActiveKeys } from '../lib/apiKeyUtils';
import type { ApiKeyItem, ApiKeysResponse, CreateKeyResponse } from '../types';

const COPY_FEEDBACK_MS = 2000;

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKeyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  // The full key is only ever known once, right after creation.
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copiedNewKey, setCopiedNewKey] = useState(false);
  const [copiedPrefixId, setCopiedPrefixId] = useState<string | null>(null);

  const loadKeys = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<ApiKeysResponse>('/api/keys');
      if (data === null) throw new Error('Session expired. Please log in again.');
      setKeys(filterActiveKeys(data.keys ?? []));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load API keys.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadKeys();
  }, [loadKeys]);

  const handleCreate = async () => {
    setCreating(true);
    setError(null);
    try {
      const data = await apiFetch<CreateKeyResponse>('/api/keys', {
        method: 'POST',
        body: JSON.stringify({ name: 'Default' }),
      });
      if (data === null) throw new Error('Session expired. Please log in again.');
      if (data.key?.key) setNewKey(data.key.key);
      // Prepend the new key (minus the secret) for instant feedback — matches
      // the backend's newest-first ordering without an extra round trip.
      const created: ApiKeyItem = {
        id: data.key.id,
        name: data.key.name,
        key_prefix: data.key.key_prefix,
        key_suffix: data.key.key_suffix,
        created_at: data.key.created_at,
        last_used_at: data.key.last_used_at,
        revoked_at: data.key.revoked_at,
      };
      setKeys((prev) => [created, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create API key.');
    } finally {
      setCreating(false);
    }
  };

  const handleRevoke = async (id: string) => {
    const ok = window.confirm('Revoke this API key? This action cannot be undone.');
    if (!ok) return;
    setRevokingId(id);
    setError(null);
    try {
      const data = await apiFetch<{ message?: string }>(
        `/api/keys/${encodeURIComponent(id)}`,
        { method: 'DELETE' },
      );
      if (data === null) throw new Error('Session expired. Please log in again.');
      setKeys((prev) => prev.filter((k) => k.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revoke API key.');
    } finally {
      setRevokingId(null);
    }
  };

  const copyToClipboard = async (text: string, target: 'new' | string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (target === 'new') {
        setCopiedNewKey(true);
        setTimeout(() => setCopiedNewKey(false), COPY_FEEDBACK_MS);
      } else {
        setCopiedPrefixId(target);
        setTimeout(() => setCopiedPrefixId(null), COPY_FEEDBACK_MS);
      }
    } catch {
      // Clipboard unavailable (e.g. insecure context) — the key text remains
      // selectable so the user can copy manually. Nothing else to do.
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-5xl"
    >
      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <span className="font-mono text-xs font-semibold tracking-wider text-brand-orange uppercase block mb-2">
            // Credentials
          </span>
          <h1 className="font-display font-extrabold text-3xl tracking-tight text-white">
            API Keys
          </h1>
          <div className="w-16 h-1 bg-brand-orange rounded-full mt-3" />
        </div>
        <button
          onClick={handleCreate}
          disabled={creating}
          className="bg-brand-orange hover:bg-[#E05600] text-white rounded-lg px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {creating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          New Key
        </button>
      </div>

      {/* New key warning banner — shown only after creation */}
      <AnimatePresence>
        {newKey && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-6 bg-[#1A1A0A] border border-[#F59E0B]/40 rounded-lg p-4 text-[#F59E0B]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span className="font-semibold text-sm">
                  New API Key — Copy it now. It will not be shown again.
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <code className="bg-[#070C16] rounded-lg px-3 py-2 font-mono text-sm break-all flex-1 min-w-[240px]">
                  {newKey}
                </code>
                <button
                  onClick={() => copyToClipboard(newKey, 'new')}
                  className="bg-brand-orange hover:bg-[#E05600] text-white rounded-lg px-3 py-2 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  {copiedNewKey ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copiedNewKey ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={() => {
                    setNewKey(null);
                    setCopiedNewKey(false);
                  }}
                  className="border border-[#1E293B] text-gray-400 hover:text-white hover:border-[#334155] rounded-lg px-3 py-2 text-xs font-medium transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <div className="mt-6 bg-red-950/40 border border-red-500/30 rounded-lg p-4 text-red-300 text-sm flex items-start gap-3">
          <CircleAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="flex-1">{error}</span>
          <button
            onClick={() => {
              setError(null);
              loadKeys();
            }}
            className="text-red-300 hover:text-white underline underline-offset-2 text-xs flex-shrink-0"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-10 flex items-center justify-center py-16 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Loading API keys…
        </div>
      )}

      {/* Keys list / empty */}
      {!loading && !error && (
        <div className="mt-6">
          {keys.length === 0 ? (
            <div className="text-gray-500 text-sm py-12 text-center">
              No API keys yet. Create one to get started.
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {keys.map((k) => {
                  const revoking = revokingId === k.id;
                  const copied = copiedPrefixId === k.id;
                  return (
                    <motion.div
                      key={k.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#0B1120] border border-[#1E293B]/60 rounded-lg p-4 flex justify-between items-center"
                    >
                      <div className="min-w-0">
                        <div className="text-white font-semibold truncate">{k.name}</div>
                        <div className="font-mono text-sm text-gray-400 mt-1 break-all">
                          {maskKey(k)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Created {formatDate(k.created_at)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                        <button
                          onClick={() => copyToClipboard(k.key_prefix, k.id)}
                          title="Copy key prefix"
                          className="bg-[#1E293B] hover:bg-[#334155] rounded text-xs px-3 py-1 inline-flex items-center gap-1 text-gray-200 transition-colors"
                        >
                          {copied ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          Copy Prefix
                        </button>
                        <button
                          onClick={() => handleRevoke(k.id)}
                          disabled={revoking}
                          className="bg-red-900/30 text-red-300 hover:bg-red-900/50 rounded text-xs px-3 py-1 inline-flex items-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {revoking ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Ban className="w-3 h-3" />
                          )}
                          Revoke
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
