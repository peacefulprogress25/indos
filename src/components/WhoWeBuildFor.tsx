import React from "react";
import { Building2, Terminal, Rocket, Landmark } from "lucide-react";
import { motion } from "motion/react";

interface WhoWeBuildForProps {
  onOpenAuth: () => void;
}

const personas = [
  {
    id: "agencies",
    title: "AI Agencies",
    icon: Building2,
    color: "#FF6B00",
    illustration: "Multi-tenant · Client routing · INR billing",
    gradient: "from-[#FF6B00]/20 to-transparent",
  },
  {
    id: "developers",
    title: "Developers",
    icon: Terminal,
    color: "#3B82F6",
    illustration: "One API · 5 tiers · OpenAI SDK",
    gradient: "from-[#3B82F6]/20 to-transparent",
  },
  {
    id: "startups",
    title: "Startups",
    icon: Rocket,
    color: "#10B981",
    illustration: "Ship fast · Scale affordably · No infra",
    gradient: "from-[#10B981]/20 to-transparent",
  },
  {
    id: "enterprises",
    title: "Enterprises",
    icon: Landmark,
    color: "#8B5CF6",
    illustration: "Sovereign infra · Compliance · SLA",
    gradient: "from-[#8B5CF6]/20 to-transparent",
  },
];

export default function WhoWeBuildFor({ onOpenAuth }: WhoWeBuildForProps) {
  return (
    <section id="solutions" className="relative bg-[#060913] text-white py-20 md:py-28 border-b border-[#1E293B]/40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Built for
          </h2>
        </motion.div>

        {/* Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {personas.map((persona, i) => {
            const Icon = persona.icon;
            return (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={onOpenAuth}
                className="group relative bg-[#0B1120] border border-[#1E293B]/60 rounded-2xl p-8 cursor-pointer hover:border-[#334155] transition-all duration-300 flex flex-col items-center text-center"
                style={{
                  borderTopWidth: "2px",
                  borderTopColor: `${persona.color}40`,
                }}
              >
                {/* Color glow on hover */}
                <div 
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-b ${persona.gradient}`}
                />

                <div className="relative z-10 flex flex-col items-center gap-5">
                  {/* Icon in colored circle */}
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ 
                      backgroundColor: `${persona.color}15`,
                      color: persona.color,
                    }}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-white/90 transition-colors">
                    {persona.title}
                  </h3>

                  {/* Visual tags */}
                  <div className="flex flex-col gap-1.5">
                    {persona.illustration.split(" · ").map((tag, j) => (
                      <span 
                        key={j}
                        className="text-xs font-mono tracking-wide px-3 py-1 rounded-full border transition-colors duration-300"
                        style={{
                          color: `${persona.color}cc`,
                          borderColor: `${persona.color}30`,
                          backgroundColor: `${persona.color}08`,
                        }}
                      >
                        {tag}
                      </span>
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