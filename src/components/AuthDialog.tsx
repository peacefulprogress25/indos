import { useState, useEffect, type FormEvent } from 'react';
import { X, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../auth/AuthContext';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthDialog({ isOpen, onClose }: AuthDialogProps) {
  const { user, login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('dev@indos.local');
  const [name, setName] = useState('Developer');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

  // Close dialog when user becomes authenticated
  useEffect(() => {
    if (user) onClose();
  }, [user, onClose]);

  if (!isOpen) return null;

  const handleDevLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError('');
    setSubmitting(true);
    try {
      await login(email.trim(), name.trim());
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-md overflow-hidden bg-[#0B1120] border border-[#1E293B] rounded-xl text-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E293B] bg-[#0E1527]">
            <div className="flex items-center space-x-2.5">
              <Key className="w-5 h-5 text-brand-orange" />
              <span className="font-display font-bold text-base tracking-wide text-white">
                Sign In
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 space-y-6">
            <p className="text-sm text-gray-400 text-center">
              Sign in to your Indos account to get started.
            </p>

            {/* Google Sign-in */}
            <button
              onClick={loginWithGoogle}
              className="w-full inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>

            {/* Dev Login — localhost only */}
            {isLocalhost && (
              <div className="border-t border-[#1E293B]/40 pt-5">
                <p className="text-xs text-gray-500 text-center mb-4">— or Dev Login (localhost) —</p>
                <form onSubmit={handleDevLogin} className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#070C16] border border-[#1E293B] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Display Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-[#070C16] border border-[#1E293B] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-4 py-3 bg-brand-orange hover:bg-[#E05600] text-white font-sans font-semibold rounded-lg transition disabled:opacity-60"
                  >
                    {submitting ? 'Signing in...' : 'Dev Login'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
