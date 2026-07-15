import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { BUILDER_SEGMENTS } from "../data";

interface WhoWeBuildForProps {
  onOpenAuth: () => void;
}

export default function WhoWeBuildFor({ onOpenAuth }: WhoWeBuildForProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="solutions" className="bg-white text-[#0F172A] py-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-14">
          <span className="font-mono text-xs font-semibold tracking-wider text-brand-orange uppercase block mb-3">
            Who Builds on Indos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            Built For AI Builders<span className="text-brand-orange">.</span>
          </h2>
        </div>

        <div className="max-w-4xl relative">
          <div className="absolute left-[34px] top-6 bottom-6 w-[2px] border-l-2 border-dashed border-gray-200 hidden md:block" />

          <div className="space-y-4 md:space-y-0">
            {BUILDER_SEGMENTS.map((segment, idx) => {
              const isHovered = hoveredIdx === idx;
              
              return (
                <div
                  key={segment.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={onOpenAuth}
                  className="flex flex-col md:flex-row items-start md:items-center py-6 md:py-8 border-b border-gray-100 last:border-b-0 transition-colors duration-250 relative group cursor-pointer"
                >
                  <div className="flex items-center space-x-6 w-full md:w-auto md:mr-12 mb-3 md:mb-0 relative z-10">
                    <div className="hidden md:flex items-center justify-center w-[70px] h-full">
                      {idx === 0 ? (
                        <div className={`w-4 h-4 transition-all duration-300 ${
                          isHovered ? "bg-brand-orange rotate-45 scale-115" : "bg-brand-orange"
                        }`} />
                      ) : (
                        <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                          isHovered ? "border-brand-orange bg-brand-orange scale-115" : "border-gray-300 bg-white"
                        }`} />
                      )}
                    </div>

                    <span className={`font-display text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-250 ${
                      isHovered ? "text-brand-orange" : "text-gray-300"
                    }`}>
                      {segment.id}
                    </span>

                    <span className="font-display text-xl font-medium text-gray-400">
                      +
                    </span>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center">
                    <div className="md:col-span-4">
                      <h3 className="font-display text-xl font-extrabold text-gray-900 group-hover:text-brand-orange transition-colors">
                        {segment.title}
                      </h3>
                    </div>

                    <div className="md:col-span-7">
                      <p className="text-gray-500 font-sans text-sm md:text-base leading-relaxed">
                        {segment.description}
                      </p>
                    </div>

                    <div className="md:col-span-1 flex justify-end md:justify-center">
                      <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                        isHovered 
                          ? "text-brand-orange translate-x-2" 
                          : "text-gray-300 group-hover:text-gray-800"
                      }`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subtle CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenAuth}
            className="text-brand-orange hover:text-[#E05600] font-sans font-semibold text-sm inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            Get your API key
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}