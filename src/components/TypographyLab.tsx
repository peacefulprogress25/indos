import React, { useState, useEffect } from "react";
import { Sliders, Sparkles, Check, ChevronUp, ChevronDown } from "lucide-react";

interface FontPairing {
  id: string;
  name: string;
  tag: string;
  displayFont: string;
  sansFont: string;
  monoFont: string;
  description: string;
}

const PAIRINGS: FontPairing[] = [
  {
    id: "default",
    name: "Standard Tech (Default)",
    tag: "Space Grotesk + Inter",
    displayFont: '"Space Grotesk", sans-serif',
    sansFont: '"Inter", ui-sans-serif, system-ui, sans-serif',
    monoFont: '"JetBrains Mono", monospace',
    description: "The pristine high-contrast default for fast-reading and premium tech brand trust.",
  },
  {
    id: "avant-garde",
    name: "Avant-Garde Agency",
    tag: "Syne + Plus Jakarta Sans",
    displayFont: '"Syne", sans-serif',
    sansFont: '"Plus Jakarta Sans", sans-serif',
    monoFont: '"JetBrains Mono", monospace',
    description: "Wide geometric display headings paired with high-energy modern sans body copy.",
  },
  {
    id: "editorial",
    name: "Premium Editorial",
    tag: "Playfair Display + Inter",
    displayFont: '"Playfair Display", serif',
    sansFont: '"Inter", ui-sans-serif, system-ui, sans-serif',
    monoFont: '"JetBrains Mono", monospace',
    description: "Beautiful high-contrast transitional serif headings with neutral geometric UI text.",
  },
  {
    id: "silicon-valley",
    name: "Silicon Valley Geometric",
    tag: "Outfit + Plus Jakarta Sans",
    displayFont: '"Outfit", sans-serif',
    sansFont: '"Plus Jakarta Sans", sans-serif',
    monoFont: '"JetBrains Mono", monospace',
    description: "Clean, ultra-friendly geometric display faces paired with vibrant agency layouts.",
  },
];

export default function TypographyLab() {
  const [selectedPairingId, setSelectedPairingId] = useState<string>("default");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      // Read from search parameters first (e.g. ?font=editorial or ?font=avant-garde)
      const params = new URLSearchParams(window.location.search);
      const fontQuery = params.get("font");
      if (fontQuery) {
        const match = PAIRINGS.find((p) => p.id === fontQuery);
        if (match) {
          setSelectedPairingId(match.id);
          applyPairing(match);
        }
      }
    } catch (e) {
      console.warn("Failed to read search parameters in iframe:", e);
    }
  }, []);

  const applyPairing = (pairing: FontPairing) => {
    try {
      const root = document.documentElement;
      root.style.setProperty("--font-display", pairing.displayFont);
      root.style.setProperty("--font-sans", pairing.sansFont);
      root.style.setProperty("--font-mono", pairing.monoFont);
    } catch (e) {
      console.warn("Failed to apply CSS properties:", e);
    }
  };

  const handleSelect = (pairing: FontPairing) => {
    setSelectedPairingId(pairing.id);
    applyPairing(pairing);
    
    try {
      // Smoothly update URL query param so the link is shareable/storable!
      const url = new URL(window.location.href);
      url.searchParams.set("font", pairing.id);
      window.history.pushState({}, "", url.toString());
    } catch (e) {
      console.warn("Failed to push history state:", e);
    }
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 font-sans"
      id="typography-lab-container"
    >
      {/* Mini floating preview trigger widget */}
      <div className="flex flex-col items-end">
        {isOpen && (
          <div className="mb-3 w-80 max-w-sm bg-brand-dark border border-[#1E293B] rounded-xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]/60">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-brand-orange animate-pulse" />
                <span className="font-bold text-xs tracking-wider uppercase text-gray-200">
                  Typography Lab
                </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-xs cursor-pointer px-2 py-1 rounded hover:bg-gray-800 transition"
              >
                Hide
              </button>
            </div>

            <p className="text-[11px] text-gray-400 mt-2 mb-3 leading-relaxed">
              Test different premium layouts live. The selected combination updates all CSS custom properties instantly and rewrites the address URL so you can share exact versions.
            </p>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {PAIRINGS.map((pairing) => {
                const isSelected = selectedPairingId === pairing.id;
                return (
                  <button
                    key={pairing.id}
                    onClick={() => handleSelect(pairing)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? "border-brand-orange bg-brand-orange/5 text-white" 
                        : "border-[#1E293B] bg-transparent text-gray-300 hover:bg-gray-800/40 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{pairing.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-brand-orange" />}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono mt-1 opacity-80">
                      {pairing.tag}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1 italic leading-snug line-clamp-2">
                      {pairing.description}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#1E293B]/60 text-[10px] text-gray-500 text-center flex items-center justify-center gap-1.5 font-mono select-none">
              <Sparkles className="w-3 h-3 text-brand-orange" />
              <span>Real-time CSS variable injections</span>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2.5 bg-brand-dark hover:bg-gray-900 text-gray-300 hover:text-white border border-[#1E293B] hover:border-brand-orange/40 rounded-full flex items-center space-x-2 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          id="typo-lab-floating-trigger"
        >
          <Sliders className="w-4 h-4 text-brand-orange" />
          <span className="text-xs font-semibold tracking-wide">
            {isOpen ? "Close Lab" : "Alternative Pairings"}
          </span>
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
}
