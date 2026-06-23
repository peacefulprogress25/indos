import React from "react";
import { 
  Box, 
  Code, 
  Sliders, 
  Lock, 
  MapPin, 
  Rocket, 
  Tag, 
  UserRound,
  ChevronRight
} from "lucide-react";
import { FEATURES_DATA } from "../data";

interface EverythingGridProps {
  onOpenAuth: () => void;
}

export default function EverythingGrid({ onOpenAuth }: EverythingGridProps) {
  // Let's dynamically map beautiful icons to fit the 8 elements exactly as shown in Image 3
  const getIcon = (id: string) => {
    switch (id) {
      case "1":
        return <Box className="w-6 h-6 text-brand-orange" />;
      case "2":
        return <Code className="w-6 h-6 text-brand-orange" />;
      case "3":
        return <Sliders className="w-6 h-6 text-brand-orange" />;
      case "4":
        return <Lock className="w-6 h-6 text-brand-orange" />;
      case "5":
        return <MapPin className="w-6 h-6 text-brand-orange" />;
      case "6":
        return <Rocket className="w-6 h-6 text-brand-orange" />;
      case "7":
        return <Tag className="w-6 h-6 text-brand-orange" />;
      case "8":
        return <UserRound className="w-6 h-6 text-brand-orange" />;
      default:
        return <Box className="w-6 h-6 text-brand-orange" />;
    }
  };

  return (
    <section id="features" className="bg-[#FAFAFA] text-[#0F172A] py-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Headers */}
        <div className="max-w-3xl mb-16 text-left">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            Everything You Need To Build AI
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500 font-sans tracking-wide">
            Access, customize, and deploy the best open-source models without managing infrastructure.
          </p>
        </div>

        {/* 8-Item Feature Grid (Responsive columns: 1, then sm:2, lg:4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {FEATURES_DATA.map((item) => (
            <div 
              key={item.id} 
              onClick={onOpenAuth}
              className="flex flex-col items-start space-y-4 group p-1 rounded-lg transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Graphic Icon box with light brand tint matching layout */}
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-brand-orange/5 border border-brand-orange/15 shadow-sm group-hover:scale-110 group-hover:bg-brand-orange/10 transition-all duration-300">
                {getIcon(item.id)}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-brand-orange transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-[#475569] text-sm font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
