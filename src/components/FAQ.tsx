import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQS_DATA } from "../data";
import { motion, AnimatePresence } from "motion/react";

export default function FAQ() {
  // Let's default the first FAQ (index 0) to be open, matching the expanded card in Image 1!
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-[#FFFFFF] text-[#0F172A] py-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Category Prefix Tag & Heading */}
        <div className="mb-14">
          <span className="font-mono text-xs font-semibold tracking-wider text-brand-orange uppercase block mb-3">
            // FAQ
          </span>
          <div className="relative inline-block mb-3">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
              FAQ
            </h2>
            <div className="w-12 h-1 bg-brand-orange mt-2.5 rounded-full" />
          </div>
        </div>

        {/* Accordions container */}
        <div className="max-w-4xl border-t border-gray-200/80">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openId === faq.id;
            const numberLabel = `0${idx + 1}`;

            return (
              <div 
                key={faq.id}
                className="border-b border-gray-200/80 last:border-b last:border-gray-200"
              >
                {/* Trigger Row */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between py-6 md:py-7 text-left group transition-all duration-200 hover:bg-[#FAFAFA]"
                  id={`btn-faq-opt-${faq.id}`}
                >
                  <div className="flex items-center space-x-6 md:space-x-8 pr-4">
                    {/* Index Monospace number */}
                    <span className="font-mono text-sm md:text-base font-bold text-brand-orange select-none">
                      {numberLabel}
                    </span>
                    {/* Question text */}
                    <span className="font-sans font-semibold text-[15px] md:text-lg text-gray-900 group-hover:text-brand-orange transition-colors duration-200">
                      {faq.question}
                    </span>
                  </div>

                  {/* Toggle Chevrons matching Image */}
                  <div className="text-gray-400 group-hover:text-gray-800 transition-colors">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Animated Answer Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      {/* Grey tinted container exactly matching Image 1 layout screenshot tint */}
                      <div className="pb-6 pl-12 md:pl-16 pr-6">
                        <div className="bg-[#FAFAFA] border border-gray-200/60 rounded-lg p-5 text-[#475569] text-xs md:text-sm font-sans leading-relaxed tracking-wide shadow-inner">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
