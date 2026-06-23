import React, { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onNavClick?: (sectionId: string) => void;
  activeSection?: string;
  onOpenAuth?: () => void;
}

export default function Header({ onNavClick, activeSection, onOpenAuth }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Models", id: "models" },
    { name: "Solutions", id: "solutions" },
    { name: "Pricing", id: "pricing" }
  ];

  const handleItemClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (onNavClick) {
      onNavClick(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#060913]/90 backdrop-blur-md border-b border-[#1E293B]/60 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => handleItemClick("hero", e)}
          className="flex items-center space-x-2 select-none group"
          id="header-logo"
        >
          <span className="font-display font-bold text-2xl tracking-wider text-white flex items-center">
            IND
            <span className="relative inline-flex items-center mx-[1px]">
              {/* Specialized letter O design with horizontal segments */}
              <span className="text-brand-orange">O</span>
              <span className="absolute inset-0 border-y-2 border-brand-orange/60 rounded-sm scale-110 group-hover:rotate-180 transition-transform duration-700"></span>
            </span>
            S
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleItemClick(item.id, e)}
                className="relative py-1 font-sans text-[15px] font-medium tracking-wide text-gray-300 hover:text-white transition-colors duration-250 group"
              >
                {item.name}
                {/* Custom glowing underline under the select key */}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange origin-left transition-transform duration-300 ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:block">
          <button
            onClick={onOpenAuth}
            className="relative px-5 py-2 overflow-hidden border border-brand-orange text-brand-orange font-sans font-medium text-sm rounded bg-transparent hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,107,0,0.15)] hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] flex items-center space-x-2 group-active:scale-95 cursor-pointer"
            id="btn-nav-get-key"
          >
            <span>Get API Key</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white transition-colors p-2"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0B1120] border-t border-[#1E293B] mt-3"
          >
            <div className="flex flex-col space-y-4 py-6 px-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleItemClick(item.id, e)}
                  className="font-sans text-lg font-medium text-gray-300 hover:text-brand-orange transition-colors py-2 pl-2 border-l border-[#1E293B] hover:border-brand-orange"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-[#1E293B]">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onOpenAuth) onOpenAuth();
                  }}
                  className="w-full text-center py-3 bg-brand-orange text-white text-base font-semibold rounded hover:bg-brand-orange/95 transition-all outline-none"
                  id="btn-mobile-nav-get-key"
                >
                  Get API Key
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
