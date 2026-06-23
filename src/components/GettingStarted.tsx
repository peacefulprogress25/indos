import React from "react";
import { UserPlus, Key, Sliders, Code2, ChevronRight } from "lucide-react";
import { STEPS_DATA } from "../data";

interface GettingStartedProps {
  onOpenAuth: () => void;
}

export default function GettingStarted({ onOpenAuth }: GettingStartedProps) {
  // Map icons to the 4 steps
  const getStepIcon = (num: number) => {
    switch (num) {
      case 1:
        return <UserPlus className="w-8 h-8 text-[#475569] group-hover:text-brand-orange transition-colors duration-300" />;
      case 2:
        return <Key className="w-8 h-8 text-[#475569] group-hover:text-brand-orange transition-colors duration-300" />;
      case 3:
        return <Sliders className="w-8 h-8 text-[#475569] group-hover:text-brand-orange transition-colors duration-300" />;
      case 4:
        return <Code2 className="w-8 h-8 text-[#475569] group-hover:text-brand-orange transition-colors duration-300" />;
      default:
        return <UserPlus className="w-8 h-8 text-[#475569]" />;
    }
  };

  return (
    <section id="getting-started" className="bg-[#FFFFFF] text-[#0F172A] py-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Category tag & Header */}
        <div className="mb-14">
          <span className="font-mono text-xs font-semibold tracking-wider text-brand-orange uppercase block mb-3">
            // GETTING STARTED
          </span>
          <div className="relative inline-block mb-3">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
              Getting Started
            </h2>
            {/* Short Orange thick line under "Getting" as shown in Image 1 */}
            <div className="w-20 h-1 bg-brand-orange mt-2.5 rounded-full" />
          </div>
          <p className="mt-4 text-base md:text-lg text-gray-500 font-sans tracking-wide">
            Deploy your first AI workflow in minutes.
          </p>
        </div>

        {/* 4-Step Connection Diagram (Responsive horizontal desktop / vertical mobile) */}
        <div className="relative mb-16">
          
          {/* Horizontal Desktop Connector Lines */}
          <div className="absolute top-[28px] left-[10%] right-[10%] h-[1.5px] bg-gray-200 hidden lg:block z-0" />

          {/* Connected step circles flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {STEPS_DATA.map((step, idx) => {
              const isLast = idx === STEPS_DATA.length - 1;
              
              return (
                <div key={step.stepNumber} className="flex flex-col items-center text-center group">
                  
                  {/* Step bubble and connector arrow combo */}
                  <div className="flex items-center justify-center w-full mb-6 relative">
                    
                    {/* Circle */}
                    <div className="w-14 h-14 rounded-full border border-gray-200 hover:border-brand-orange bg-white flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 z-10">
                      <span className="font-display text-lg font-bold text-brand-orange">
                        {step.stepNumber}
                      </span>
                    </div>

                    {/* Standard thin pointer arrows to display on desktop screens */}
                    {!isLast && (
                      <div className="absolute right-[-15px] top-[18px] text-gray-300 hidden lg:block select-none font-bold text-xl h-[20px]">
                        →
                      </div>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-brand-orange/5 border border-gray-100 group-hover:border-brand-orange/20 mb-5 transition-all duration-300">
                    {getStepIcon(step.stepNumber)}
                  </div>

                  {/* Description text */}
                  <div className="max-w-[210px] space-y-2">
                    <h3 className="font-display text-base font-extrabold text-gray-900 group-hover:text-brand-orange transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 font-sans text-xs md:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Central main action Call to action button */}
        <div className="flex justify-center">
          <button
            onClick={onOpenAuth}
            className="px-10 py-4 bg-brand-orange hover:bg-[#E05600] text-white font-sans font-semibold text-sm rounded shadow-[0_4px_20px_rgba(255,107,0,0.25)] hover:shadow-[0_4px_25px_rgba(255,107,0,0.45)] transition-all duration-300 flex items-center space-x-2.5 cursor-pointer active:scale-95"
            id="getting-started-btn-action"
          >
            <span>Get Started</span>
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
