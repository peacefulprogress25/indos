import React, { useState } from "react";
import { ChevronRight, ArrowUpRight, Mail, Copy, Check } from "lucide-react";

interface FooterProps {
  onNavClick: (sectionId: string) => void;
  onOpenAuth: () => void;
}

export default function Footer({ onNavClick, onOpenAuth }: FooterProps) {
  const [copied, setCopied] = useState(false);
  const [showStatusToast, setShowStatusToast] = useState(false);
  const emailTarget = "infer@indos.tech";

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(emailTarget);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Navigation Links
  const links = [
    { name: "Models", id: "models" },
    { name: "Pricing", id: "pricing" },
    { name: "Contact", id: "contact" },
    { name: "Status", id: "" }
  ];

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!id) {
      setShowStatusToast(true);
      setTimeout(() => setShowStatusToast(false), 4000);
      return;
    }
    if (id === "contact") {
      onOpenAuth();
      return;
    }
    onNavClick(id);
  };

  return (
    <footer className="bg-[#04060C] text-white">
      
      {/* 1. Large High-Contrast CTA Panel */}
      <div className="border-b border-[#1E293B]/50 bg-[#060913]">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <div className="relative inline-block mb-3">
              <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                              Start building with<br />India's API for AI
                            </h2>
                            {/* Short thick orange horizontal bar */}
                            <div className="w-16 h-1 bg-brand-orange mt-3 rounded-full" />
                          </div>
                          <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed tracking-wide">
                            One API, 30+ models, INR pricing. Get your key and start building today.
                          </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={onOpenAuth}
              className="px-8 py-4 bg-brand-orange hover:bg-[#E05600] text-white font-sans font-semibold text-sm rounded shadow-[0_4px_25px_rgba(255,107,0,0.35)] hover:shadow-[0_4px_30px_rgba(255,107,0,0.55)] transition-all duration-300 flex items-center space-x-2 cursor-pointer active:scale-95"
              id="cta-footer-get-key"
            >
              <span>Get API Key</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Primary Footer Links Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Logo brand & Address */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-display font-black text-2xl tracking-wider text-white flex items-center select-none">
              IND
              <span className="relative inline-flex items-center mx-[1px]">
                <span className="text-brand-orange">O</span>
                <span className="absolute inset-0 border-y-2 border-brand-orange/60 rounded-sm scale-110"></span>
              </span>
              S
            </span>
            <p className="text-[#94A3B8] text-xs md:text-sm font-sans tracking-wide leading-relaxed max-w-xs">
              Intelligence on tap
            </p>
          </div>

          {/* Contact box (infer@indos.tech) */}
          <div className="lg:col-span-4 bg-[#090F1E] border border-[#1E293B]/60 rounded-xl p-5 space-y-3.5 max-w-sm w-full">
            <div className="flex items-center space-x-2 text-brand-orange">
              <Mail className="w-4 h-4 text-brand-orange" />
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                Direct Contact Box
              </span>
            </div>
            <div className="flex items-center justify-between bg-[#070C16] border border-[#1E293B]/70 rounded px-3.5 py-2.5 font-mono text-sm">
              <span className="text-brand-orange select-all font-semibold break-all text-xs">
                {emailTarget}
              </span>
              <button
                onClick={copyEmail}
                className="flex-shrink-0 ml-2.5 p-1.5 bg-[#090F1E] hover:bg-[#1E293B] hover:text-white rounded text-gray-400 transition-colors border border-[#1E293B] cursor-pointer"
                title="Copy Email"
                id="btn-copy-footer-email"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Links structure in responsive row columns */}
          <div className="lg:col-span-4 flex flex-wrap gap-x-8 gap-y-4 items-center lg:justify-end">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(link.id, e)}
                className="text-gray-400 hover:text-brand-orange font-sans text-sm md:text-base tracking-wide transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

        </div>

        {/* 3. Bottom Credits panel line */}
        <div className="border-t border-[#1E293B]/40 mt-12 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-gray-500 font-sans text-xs">
            © 2026 Indos Tech. All rights reserved.
          </p>

          <div className="flex items-center space-x-2 text-emerald-400/90 font-mono text-xs select-none">
            <span className="text-emerald-500 font-bold">&gt;_</span>
            <span>Built for developers</span>
          </div>
        </div>
      </div>

      {/* Floating Status Notification Toast */}
      {showStatusToast && (
        <div 
          className="fixed bottom-6 left-6 z-50 bg-[#090F1E] border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex items-center space-x-2 text-xs font-mono animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-auto"
          id="status-nodes-pinger"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block mr-1"></span>
          <span>Status: All regional nodes operational (100% SLA uptime).</span>
        </div>
      )}

    </footer>
  );
}
