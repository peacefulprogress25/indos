import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { PRICING_DATA } from "../data";

interface PricingSectionProps {
  onOpenAuth: () => void;
}

export default function PricingSection({ onOpenAuth }: PricingSectionProps) {
  return (
    <section id="pricing" className="relative bg-[#060913] text-white py-20 md:py-28 border-b border-[#1E293B]/40 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/25 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs text-brand-orange font-mono font-semibold tracking-wider uppercase">Pricing</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Best Price & Performance
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Pay in rupees. No dollar conversions, no forex markup, no hidden fees.
          </p>
        </motion.div>

        {/* Pricing Table — Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block overflow-hidden rounded-2xl border border-[#1E293B]/60 bg-[#0B1120]"
        >
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-[#1E293B]/40 bg-[#0E1424]">
            <div className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">Model</div>
            <div className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">Category</div>
            <div className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider text-right">1M Input</div>
            <div className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider text-right">1M Output</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#1E293B]/30">
            {PRICING_DATA.map((model) => (
              <div 
                key={model.id} 
                className="grid grid-cols-4 gap-4 px-6 py-4 hover:bg-[#0E1527]/50 transition-colors items-center"
              >
                <div className="text-sm font-semibold text-white">{model.name}</div>
                <div className="text-xs text-gray-400 font-mono">{model.category}</div>
                <div className="text-sm text-gray-300 text-right font-mono">{model.inputPrice}</div>
                <div className="text-sm text-gray-300 text-right font-mono">{model.outputPrice}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Cards — Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:hidden space-y-3"
        >
          {PRICING_DATA.map((model) => (
            <div
              key={model.id}
              className="rounded-xl border border-[#1E293B]/60 bg-[#0B1120] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">{model.name}</span>
                <span className="text-[10px] font-mono font-semibold text-brand-orange bg-brand-orange/10 border border-brand-orange/20 rounded-full px-2.5 py-0.5 uppercase tracking-wider">
                  {model.category}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0E1424] rounded-lg px-3 py-2">
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-0.5">1M Input</div>
                  <div className="text-sm text-gray-200 font-mono font-medium">{model.inputPrice}</div>
                </div>
                <div className="bg-[#0E1424] rounded-lg px-3 py-2">
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-0.5">1M Output</div>
                  <div className="text-sm text-gray-200 font-mono font-medium">{model.outputPrice}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <button
            onClick={onOpenAuth}
            className="text-brand-orange hover:text-[#E05600] font-sans font-semibold text-sm inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            Explore all 30+ models
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}