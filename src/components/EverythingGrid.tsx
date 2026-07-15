import React from "react";
import { 
  Code, 
  Coins, 
  Shield, 
  Sparkles, 
  Rocket, 
  UserRound,
} from "lucide-react";
import { FEATURES_DATA } from "../data";

interface EverythingGridProps {
  onOpenAuth: () => void;
}

export default function EverythingGrid({ onOpenAuth }: EverythingGridProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "1": return <Code className="w-6 h-6 text-brand-orange" />;
      case "2": return <Coins className="w-6 h-6 text-brand-orange" />;
      case "3": return <Shield className="w-6 h-6 text-brand-orange" />;
      case "4": return <Sparkles className="w-6 h-6 text-brand-orange" />;
      case "5": return <Rocket className="w-6 h-6 text-brand-orange" />;
      case "6": return <UserRound className="w-6 h-6 text-brand-orange" />;
      default: return <Sparkles className="w-6 h-6 text-brand-orange" />;
    }
  };

  return (
    <section id="features" className="bg-[#FAFAFA] text-[#0F172A] py-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="max-w-3xl mb-16 text-left">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            Why Indos
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500 font-sans tracking-wide">
            One API, one invoice, every model. Built for how Indian developers and agencies actually work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {FEATURES_DATA.map((item) => (
            <div 
              key={item.id} 
              onClick={onOpenAuth}
              className="flex flex-col items-start space-y-4 group p-1 rounded-lg transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
            >
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