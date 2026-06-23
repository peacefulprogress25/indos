import React, { useState } from "react";
import { X, Key, Copy, Check, Mail, Sparkles, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthDialog({ isOpen, onClose }: AuthDialogProps) {
  const [copied, setCopied] = useState(false);
  const emailTarget = "infer@indos.tech";

  const copyEmail = () => {
    navigator.clipboard.writeText(emailTarget);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

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
          {/* Header block */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E293B] bg-[#0E1527]">
            <div className="flex items-center space-x-2.5">
              <Key className="w-5 h-5 text-brand-orange" />
              <span className="font-display font-bold text-base tracking-wide text-white">
                Get API Key
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              id="auth-dialog-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 text-center space-y-6">
            <div className="relative w-16 h-16 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-brand-orange animate-pulse" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-orange flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-xl text-white">
                Request API Access
              </h3>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                Connect with our team to obtain custom developer credentials and deploy production-ready open source models today.
              </p>
            </div>

            {/* Email Box */}
            <div className="bg-[#070C16] border border-[#1E293B] rounded-xl p-5 space-y-3.5 max-w-sm mx-auto shadow-inner">
              <span className="block font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                Direct Inquiry Inbox
              </span>
              <div className="flex items-center justify-between bg-[#0E1527] border border-[#1E293B]/85 rounded px-4 py-3 font-mono text-sm">
                <span className="text-brand-orange select-all font-semibold break-all text-xs sm:text-sm">
                  {emailTarget}
                </span>
                <button
                  onClick={copyEmail}
                  className="flex-shrink-0 ml-2.5 p-1.5 bg-[#070C16] hover:bg-[#1E293B] rounded border border-[#1E293B] text-gray-400 hover:text-white transition-colors cursor-pointer active:scale-95 flex items-center justify-center"
                  title="Copy Email"
                  id="btn-copy-auth-email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-[#A0AEC0] font-sans leading-normal">
                Email <strong className="text-white">{emailTarget}</strong> for details. <br />
                Our engineers typically respond within 1 hour.
              </p>
            </div>

            <div className="pt-2 border-t border-[#1E293B]/40 flex justify-center gap-3">
              <a
                href={`mailto:${emailTarget}?subject=Requesting INDOS API Access`}
                className="inline-flex items-center justify-center space-x-2 px-6 py-2.5 bg-brand-orange hover:bg-[#E05600] text-white font-sans font-bold text-xs rounded transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Compose Email</span>
              </a>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-transparent border border-[#1E293B] hover:bg-[#1E293B] text-gray-300 hover:text-white font-sans font-bold text-xs rounded transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
