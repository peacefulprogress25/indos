import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Trash2, ChevronDown, Loader2, MessageSquare, ShieldCheck } from 'lucide-react';
import { apiFetch } from '../lib/api';
import { useAuth } from '../auth/AuthContext';
import type { AvailableModel, ModelsResponse } from '../types';
import {
  genId,
  formatPricePerMillion,
  shortModel,
  clampInt,
  computeCostInr,
  formatCost,
  type ChatUsage,
} from '../lib/playgroundUtils';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  usage?: ChatUsage;
  costInr?: number;
  isLoading?: boolean;
  isError?: boolean;
}

interface ChatResponse {
  id: string;
  model: string;
  choices: Array<{
    index: number;
    message: { role: string; content: string };
    finish_reason: string;
  }>;
  usage: ChatUsage;
}

const kbdCls = 'bg-[#0B1120] border border-[#1E293B] rounded px-1.5 py-0.5 text-gray-400';

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1.5" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-gray-400"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
        />
      ))}
    </span>
  );
}

// Rendered as a plain function (called, not used as <MessageBubble />) so the
// `key` lives directly on the motion.div element, which always accepts `key`.
function renderMessage(m: ChatMessage, userInitial: string) {
  const isUser = m.role === 'user';
  return (
    <motion.div
      key={m.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex gap-3 max-w-[85%] ${isUser ? 'self-end flex-row-reverse' : 'self-start'}`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
          isUser
            ? 'bg-gradient-to-br from-brand-orange to-[#b34800] text-white'
            : 'bg-[#090F1E] border border-[#1E293B] text-brand-orange'
        }`}
      >
        {isUser ? userInitial : 'I'}
      </div>
      <div className={`flex flex-col gap-1.5 min-w-0 ${isUser ? 'items-end' : 'items-start'}`}>
        <span className="font-mono text-[10px] tracking-wide uppercase text-gray-500">
          {isUser ? 'You' : m.isError ? 'error' : `assistant · ${shortModel(m.model)}`}
        </span>
        <div
          className={`rounded-xl px-4 py-3 text-sm leading-relaxed break-words ${
            isUser
              ? 'bg-brand-orange text-white rounded-br-sm'
              : m.isError
                ? 'bg-red-500/10 border border-red-500/40 text-red-300 rounded-bl-sm'
                : 'bg-[#0E1527] border border-[#1E293B] text-gray-200 rounded-bl-sm'
          }`}
        >
          {m.isLoading ? (
            <TypingDots />
          ) : (
            <span className="whitespace-pre-wrap">{m.content}</span>
          )}
        </div>
        {!isUser && !m.isLoading && m.usage && (
          <span className="font-mono text-[10px] text-gray-600 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span>{m.usage.total_tokens} tokens</span>
            <span aria-hidden>·</span>
            <span>{m.usage.prompt_tokens} in</span>
            <span aria-hidden>·</span>
            <span>{m.usage.completion_tokens} out</span>
            {m.costInr !== undefined && (
              <>
                <span aria-hidden>·</span>
                <span>~₹{formatCost(m.costInr)}</span>
              </>
            )}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PlaygroundPage() {
  const { user } = useAuth();
  const userInitial = (user?.name?.[0] || user?.email?.[0] || 'U').toUpperCase();

  const [models, setModels] = useState<AvailableModel[]>([]);
  const [modelsLoading, setModelsLoading] = useState(true);
  const [modelsError, setModelsError] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokensInput, setMaxTokensInput] = useState('500');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const chatLogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const stickToBottom = useRef(true);

  const selected = models.find((m) => m.id === selectedModelId);
  const maxTokens = clampInt(maxTokensInput, 1, 4096, 500);

  // Load models on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setModelsLoading(true);
      try {
        const data = await apiFetch<ModelsResponse>('/api/models');
        if (cancelled) return;
        if (data === null) {
          setModelsError('Session expired — please log in again.');
          return;
        }
        if (data.models?.length) {
          setModels(data.models);
          setSelectedModelId(data.models[0].id);
        } else {
          setModelsError('No models available.');
        }
      } catch (err) {
        if (!cancelled) {
          setModelsError(err instanceof Error ? err.message : 'Failed to load models.');
        }
      } finally {
        if (!cancelled) setModelsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-scroll to the newest message when pinned to the bottom
  useEffect(() => {
    const el = chatLogRef.current;
    if (el && stickToBottom.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const handleScroll = useCallback(() => {
    const el = chatLogRef.current;
    if (!el) return;
    stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }, []);

  const adjustTextarea = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustTextarea();
  };

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isSending || !selected) return;

    const modelParam = `${selected.provider}/${selected.model}`;
    const userMsg: ChatMessage = { id: genId(), role: 'user', content: text };
    const placeholder: ChatMessage = {
      id: genId(),
      role: 'assistant',
      content: '',
      model: modelParam,
      isLoading: true,
    };

    const history = [...messages, userMsg];
    const payloadMessages = history
      .filter((m) => !m.isError && !m.isLoading)
      .map((m) => ({ role: m.role, content: m.content }));

    stickToBottom.current = true;
    setMessages([...history, placeholder]);
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    setIsSending(true);

    try {
      const data = await apiFetch<ChatResponse>('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          model: modelParam,
          messages: payloadMessages,
          max_tokens: maxTokens,
          temperature,
        }),
      });

      if (data === null) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === placeholder.id
              ? { ...m, isLoading: false, isError: true, content: 'Session expired — please log in again.' }
              : m,
          ),
        );
        return;
      }

      const content = data.choices?.[0]?.message?.content || '(No response received.)';
      const usage = data.usage;
      const costInr = usage ? computeCostInr(selected, usage) : undefined;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === placeholder.id
            ? { ...m, isLoading: false, content, usage, costInr, model: data.model ?? modelParam }
            : m,
        ),
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setMessages((prev) =>
        prev.map((m) =>
          m.id === placeholder.id ? { ...m, isLoading: false, isError: true, content: msg } : m,
        ),
      );
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  }, [input, isSending, selected, messages, maxTokens, temperature]);

  const handleClear = useCallback(() => {
    setMessages([]);
    stickToBottom.current = true;
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = input.trim().length > 0 && !isSending && !!selected && !modelsLoading;

  return (
    <div className="flex flex-col lg:flex-row gap-5 lg:h-[calc(100dvh_-_4rem)]">
      {/* ── Sidebar ── */}
      <aside className="order-2 lg:order-1 w-full lg:w-64 flex-shrink-0 bg-[#0B1120] border border-[#1E293B] rounded-2xl p-5 flex flex-col gap-5 lg:overflow-y-auto">
        <div>
          <p className="font-mono text-[10px] tracking-wider uppercase text-brand-orange">// Parameters</p>
          <h2 className="font-display text-lg font-bold mt-1.5">Chat Settings</h2>
        </div>

        {/* Model */}
        <div>
          <div className="flex items-center justify-between text-sm text-gray-300 font-medium mb-2">
            <span>Model</span>
            {selected && (
              <span className="font-mono text-xs text-brand-orange">
                ~₹{formatPricePerMillion(selected.input_price_per_1m)}/M in
              </span>
            )}
          </div>
          <div className="relative">
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              disabled={modelsLoading}
              className="w-full appearance-none bg-[#0B1120] border border-[#1E293B] rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-brand-orange disabled:opacity-50 cursor-pointer pr-8 [color-scheme:dark]"
            >
              {models.length === 0 && (
                <option value="" disabled>
                  {modelsLoading ? 'Loading models…' : modelsError ? 'No models available' : 'No models'}
                </option>
              )}
              {models.map((m) => (
                <option key={m.id} value={m.id} className="bg-[#0B1120] text-white">
                  {m.provider}/{m.model} (~₹{formatPricePerMillion(m.input_price_per_1m)}/M in)
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {modelsError && <p className="text-xs text-red-400 mt-1.5">{modelsError}</p>}
        </div>

        {/* Temperature */}
        <div>
          <div className="flex items-center justify-between text-sm text-gray-300 font-medium mb-2">
            <span>Temperature</span>
            <span className="font-mono text-xs text-brand-orange">{temperature.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={2}
            step={0.1}
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-brand-orange cursor-pointer"
          />
          <div className="flex justify-between font-mono text-[10px] text-gray-600 mt-1.5">
            <span>0.0</span>
            <span>1.0</span>
            <span>2.0</span>
          </div>
        </div>

        {/* Max tokens */}
        <div>
          <label className="block text-sm text-gray-300 font-medium mb-2">Max Tokens</label>
          <input
            type="number"
            min={1}
            max={4096}
            value={maxTokensInput}
            onChange={(e) => setMaxTokensInput(e.target.value)}
            className="w-full bg-[#0B1120] border border-[#1E293B] rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-brand-orange [color-scheme:dark]"
          />
        </div>

        {/* Clear chat */}
        <button
          onClick={handleClear}
          disabled={messages.length === 0 || isSending}
          className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-red-400 bg-red-500/5 border border-red-500/25 rounded-lg py-2.5 hover:bg-red-500/10 hover:border-red-500/45 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" />
          Clear Chat
        </button>

        <p className="font-mono text-[11px] text-gray-500 flex items-start gap-2 leading-relaxed mt-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-orange flex-shrink-0 mt-0.5" />
          Authenticated via your session — no API key needed.
        </p>
      </aside>

      {/* ── Chat column ── */}
      <section className="order-1 lg:order-2 flex-1 flex flex-col min-w-0 min-h-0 h-[60dvh] lg:h-auto bg-[#0B1120] border border-[#1E293B] rounded-2xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1E293B]/40 bg-[#090F1E]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]" />
            <h3 className="font-display font-bold text-[15px]">Chat Playground</h3>
          </div>
          {selected && (
            <span className="font-mono text-[11px] text-gray-300 bg-[#070C16] border border-[#1E293B] rounded-full px-2.5 py-1 max-w-[55%] truncate">
              {selected.provider}/{selected.model}
            </span>
          )}
        </div>

        {/* Chat log */}
        <div ref={chatLogRef} onScroll={handleScroll} className="flex-1 min-h-0 overflow-y-auto p-6 flex flex-col gap-4">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-10">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-brand-orange" />
              </div>
              <p className="text-gray-300 font-medium">Start a conversation</p>
              <p className="text-gray-500 text-sm max-w-xs">
                Send a message below to chat with{' '}
                {selected ? `${selected.provider}/${selected.model}` : 'the selected model'}.
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((m) => renderMessage(m, userInitial))}
            </AnimatePresence>
          )}
        </div>

        {/* Composer */}
        <div className="border-t border-[#1E293B]/40 p-4 bg-[#090F1E]">
          <div className="flex items-end gap-3 bg-[#070C16] border border-[#1E293B] rounded-xl px-4 py-2 focus-within:border-brand-orange/50 transition-colors">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…  (Shift+Enter for newline)"
              aria-label="Chat message"
              className="flex-1 bg-transparent border-none outline-none resize-none text-white text-sm leading-relaxed py-1.5 max-h-32 placeholder:text-gray-600"
            />
            <button
              onClick={handleSend}
              disabled={!canSend}
              aria-label="Send message"
              className="w-9 h-9 rounded-lg bg-brand-orange flex items-center justify-center hover:bg-[#E05600] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 shadow-[0_4px_16px_rgba(255,107,0,0.3)]"
            >
              {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex items-center justify-between mt-2.5 font-mono text-[11px] text-gray-600">
            <span>
              <kbd className={kbdCls}>Enter</kbd> send · <kbd className={kbdCls}>Shift</kbd>+
              <kbd className={kbdCls}>Enter</kbd> newline
            </span>
            {selected && <span className="truncate ml-2">{selected.provider}/{selected.model}</span>}
          </div>
        </div>
      </section>
    </div>
  );
}
