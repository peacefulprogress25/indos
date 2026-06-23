import React, { useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { SWITCH_REASONS } from "../data";

interface WhyTeamsSwitchProps {
  onOpenAuth: () => void;
}

export default function WhyTeamsSwitch({ onOpenAuth }: WhyTeamsSwitchProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="why-switch" className="bg-[#060913] text-white py-20 border-b border-[#1E293B]/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-brand-orange/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Tags */}
        <div className="mb-14">
          <span className="font-mono text-xs font-semibold tracking-wider text-brand-orange uppercase block mb-3">
            // WHY TEAMS SWITCH
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Why Teams Switch To Indos
          </h2>
        </div>

        {/* List of Switch Reasons */}
        <div className="max-w-5xl border-y border-[#1E293B]/60">
            {SWITCH_REASONS.map((item, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={onOpenAuth}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-6 md:py-8 border-b border-[#1E293B]/60 last:border-b-0 cursor-pointer transition-all duration-300 relative ${
                    isHovered ? "bg-[#0E1527]/50 px-4 -mx-4" : "bg-transparent"
                  }`}
                >
                {/* Accent border highlight on hover */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-brand-orange transition-transform duration-300 ${
                  isHovered ? "scale-y-100" : "scale-y-0"
                }`} />

                {/* Left Number */}
                <div className="col-span-1 md:col-span-1">
                  <span className={`font-mono text-lg font-bold ${
                    isHovered ? "text-brand-orange" : "text-brand-orange/80"
                  }`}>
                    {item.id}
                  </span>
                </div>

                {/* Title */}
                <div className="col-span-1 md:col-span-4">
                  <h3 className={`font-display text-lg md:text-xl font-bold transition-colors ${
                    isHovered ? "text-brand-orange" : "text-white"
                  }`}>
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-1 md:col-span-6">
                  <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="col-span-1 md:col-span-1 flex justify-end">
                  <ArrowRight className={`w-5 h-5 text-brand-orange transition-transform duration-300 ${
                    isHovered ? "translate-x-1.5 scale-110" : ""
                  }`} />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
