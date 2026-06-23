import React from "react";
import { X, Check, Shield, Zap, Sparkles, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (planName: string) => void;
}

export default function PricingModal({ isOpen, onClose, onSelectPlan }: PricingModalProps) {
  const plans = [
    {
      name: "Developer Sandbox",
      desc: "Perfect for testing open-source AI integrations locally.",
      price: "Free",
      period: "",
      icon: <Zap className="w-5 h-5 text-gray-400" />,
      features: [
        "10,000 monthly tokens",
        "Access to shared GLM 5.2 & DeepSeek V4",
        "Sovereign low-latency routing",
        "Ticket based support"
      ],
      buttonText: "Start Building",
      popular: false
    },
    {
      name: "Scale",
      desc: "For startups and agencies launching commercial models at scale.",
      price: "Contact us",
      period: "",
      icon: <Sparkles className="w-5 h-5 text-brand-orange" />,
      features: [
        "Everything in Sandbox",
        "No monthly token limits",
        "Priority auto-scaling router gateways",
        "Full fine-tuning weight outputs",
        "Dedicated Manager"
      ],
      buttonText: "Upgrade to Scale",
      popular: true
    },
    {
      name: "Private Deployment",
      desc: "Dedicated physical instance hosting for enterprise-grade security.",
      price: "Contact us",
      period: "",
      icon: <Building2 className="w-5 h-5 text-blue-400" />,
      features: [
        "Fully isolated private clusters",
        "Infinite routing volume",
        "Sovereign hosting in India",
        "Zero data retention policies (VPC)",
        "Dedicated 24/7 technical team"
      ],
      buttonText: "Connect with Sales",
      popular: false
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl overflow-hidden bg-[#0B1120] border border-[#1E293B] rounded-xl text-white shadow-2xl maxHeight-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E293B] bg-[#0E1527]">
            <div className="flex items-center space-x-2.5">
              <Shield className="w-5 h-5 text-brand-orange" />
              <span className="font-display font-bold text-base tracking-wide text-white">
                Sovereign Pricing Plans
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              id="pricing-close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            <div className="text-center max-w-md mx-auto space-y-2">
              <h3 className="font-display text-2xl font-black text-white">
                Transparent Sovereign Pricing
              </h3>
              <p className="text-xs md:text-sm text-gray-400 font-sans">
                Predictable usage costs. Pay only for what your applications actively consume, hosted entirely in India.
              </p>
            </div>

            {/* Plans List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, idx) => {
                return (
                  <div
                    key={idx}
                    className={`relative flex flex-col justify-between rounded-xl border p-6 bg-[#0E1527]/50 ${
                      plan.popular 
                        ? "border-brand-orange shadow-[0_0_20px_rgba(255,107,0,0.1)]" 
                        : "border-[#1E293B]/70 hover:border-[#1E293B] transition-colors"
                    }`}
                  >
                    {/* Popular Badge */}
                    {plan.popular && (
                      <span className="absolute top-0 right-6 -translate-y-1/2 bg-brand-orange text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        POPULAR CHOICE
                      </span>
                    )}

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center space-x-2.5">
                        <div className="p-2 bg-[#070C16] rounded-lg border border-[#1E293B]">
                          {plan.icon}
                        </div>
                        <h4 className="font-display font-extrabold text-base text-white">
                          {plan.name}
                        </h4>
                      </div>

                      <p className="text-xs text-gray-400 font-sans">
                        {plan.desc}
                      </p>

                      <div className="pt-2">
                        <span className="text-3xl font-display font-extrabold text-white">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-xs text-gray-500 font-sans">
                            {plan.period}
                          </span>
                        )}
                      </div>

                      {/* Feature checks list */}
                      <ul className="space-y-2 pt-4 border-t border-[#1E293B]/40">
                        {plan.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2.5 text-xs text-gray-300">
                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="font-sans">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => {
                        onSelectPlan(plan.name);
                        onClose();
                      }}
                      className={`w-full py-2.5 font-sans font-bold text-xs rounded transition-all active:scale-95 cursor-pointer ${
                        plan.popular 
                          ? "bg-brand-orange hover:bg-[#E05600] text-white shadow-lg shadow-brand-orange/15" 
                          : "bg-[#070C16] hover:bg-[#1E293B] text-gray-300 hover:text-white border border-[#1E293B]"
                      }`}
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-[11px] text-gray-500 font-sans">
              All plans are fully hosted and run exclusively on physical server centers in South Asia. No hidden transit fees.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
