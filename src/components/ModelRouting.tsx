import React, { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { MODELS_DATA } from "../data";
import { ModelInfo } from "../types";

interface ModelRoutingProps {
  onOpenAuth: () => void;
}

export default function ModelRouting({ onOpenAuth }: ModelRoutingProps) {
  const [selectedModel, setSelectedModel] = useState<ModelInfo>(MODELS_DATA[0]);

  return (
    <section id="models" className="bg-[#060913] text-white py-20 border-b border-[#1E293B]/40 relative overflow-hidden">
      {/* Mesh decoration */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Category Prefix Tag & Description */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <span className="font-mono text-xs font-semibold tracking-wider text-brand-orange uppercase block mb-3">
              // 01 • MODEL ROUTING
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight">
              One API. <br className="hidden md:block" /> Every Model<span className="text-brand-orange">.</span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-400 font-sans max-w-md">
              Access all leading open-source models through our unified routing engine, or choose dedicated APIs for specific open-source models to fit your precise needs.
            </p>
          </div>
          <div className="lg:max-w-md bg-[#0F172A]/40 border border-[#1E293B]/60 rounded-xl p-6">
            <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed">
              Use a standard route across every hosted model, execute lightning-fast model requests directly, or deploy dedicated sovereign instances for production workloads.
            </p>
          </div>
        </div>

        {/* Dynamic Model Routing Interactive Table */}
        <div className="overflow-x-auto border border-[#1E293B] rounded-xl bg-[#090E1A]/80 mb-8 [scrollbar-color:#1e293b_transparent]">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#0E1527] text-gray-400 text-xs font-mono tracking-wider uppercase">
                <th className="py-4 px-6 w-16">Selection</th>
                <th className="py-4 px-6">MODEL</th>
                <th className="py-4 px-6 text-center">PURPOSE</th>
                <th className="py-4 px-6 text-center">CONTEXT</th>
                <th className="py-4 px-6 text-center w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]/60">
              {MODELS_DATA.map((model) => {
                const isSelected = selectedModel.id === model.id;
                return (
                  <tr
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={`cursor-pointer transition-colors duration-200 group ${
                      isSelected ? "bg-[#1E293B]/40" : "hover:bg-[#0E1527]/40"
                    }`}
                  >
                    {/* Circle radio */}
                    <td className="py-5 px-6">
                      <div className="flex justify-center items-center">
                        <div className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected ? "border-brand-orange" : "border-gray-600 group-hover:border-gray-400"
                        }`}>
                          {isSelected && (
                            <div className="w-[10px] h-[10px] rounded-full bg-brand-orange animate-pulse" />
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Model Details */}
                    <td className="py-5 px-6">
                      <div>
                        <div className={`font-sans font-bold text-base transition-colors ${
                          isSelected ? "text-brand-orange" : "text-gray-200 group-hover:text-white"
                        }`}>
                          {model.name}
                        </div>
                      </div>
                    </td>

                    {/* Purpose */}
                    <td className="py-5 px-6 text-center">
                      <span className={`font-sans text-sm font-medium px-4 py-1.5 rounded-lg ${
                        isSelected 
                          ? "text-brand-orange bg-brand-orange/5" 
                          : "text-gray-300"
                      }`}>
                        {model.tagline}
                      </span>
                    </td>

                    {/* Context Window */}
                    <td className="py-5 px-6 text-center font-mono text-sm text-gray-300">
                      {model.contextWindow}
                    </td>

                    {/* Interactive Arrow Indicator */}
                    <td className="py-5 px-6 text-center">
                      <div className="flex items-center justify-center">
                        {!isSelected ? (
                          <ChevronRight className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        ) : (
                          <Check className="w-4 h-4 text-brand-orange" />
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={onOpenAuth}
            className="px-8 py-3.5 bg-brand-orange hover:bg-[#E05600] text-white font-sans font-semibold text-xs rounded shadow-[0_4px_22px_rgba(255,107,0,0.18)] hover:shadow-[0_4px_28px_rgba(255,107,0,0.3)] transition-all duration-300 flex items-center space-x-2 cursor-pointer active:scale-95"
            id="model-routing-cta-btn"
          >
            <span>Request Model Access</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
