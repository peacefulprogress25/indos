import React from "react";
import { Sparkles, Zap, Gauge, PiggyBank, Flag } from "lucide-react";
import { motion } from "motion/react";
import { STACK_TIERS } from "../data";

const iconMap: Record<string, React.ElementType> = {
  sparkles: Sparkles,
  zap: Zap,
  gauge: Gauge,
  "piggy-bank": PiggyBank,
  flag: Flag,
};

export default function IndiaStack() {
  return (
    <section id="models" className="relative bg-[#060913] text-white py-20 md:py-28 border-b border-[#1E293B]/40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-orange/3 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/25 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs text-brand-orange font-mono font-semibold tracking-wider uppercase">The India Stack</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Every model you need.<br />Curated for India.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Five tiers, 30+ models. From frontier reasoning to Indian-language models — plug into the right model for every part of your workflow.
          </p>
        </motion.div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {STACK_TIERS.map((tier, i) => {
            const Icon = iconMap[tier.icon] || Sparkles;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative bg-[#0B1120] border border-[#1E293B]/60 rounded-2xl p-6 hover:border-[#1E293B] transition-all duration-300 flex flex-col"
                style={{
                  borderTop: `2px solid ${tier.color}40`,
                }}
              >
                {/* Color accent glow on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top, ${tier.color}08 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Icon */}
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
                    style={{ 
                      backgroundColor: `${tier.color}15`,
                      color: tier.color,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold text-white mb-1">
                    {tier.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs font-mono font-semibold tracking-wider uppercase mb-3" style={{ color: tier.color }}>
                    {tier.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1">
                    {tier.description}
                  </p>

                  {/* Model tags */}
                  <div className="space-y-1.5">
                    {tier.models.map((model) => (
                      <div 
                        key={model}
                        className="text-xs font-mono text-gray-500 group-hover:text-gray-400 transition-colors flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: tier.color }} />
                        {model}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}