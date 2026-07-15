/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import IndiaStack from "./components/IndiaStack";
import EverythingGrid from "./components/EverythingGrid";
import WhoWeBuildFor from "./components/WhoWeBuildFor";
import PricingSection from "./components/PricingSection";
import WhyTeamsSwitch from "./components/WhyTeamsSwitch";
import GettingStarted from "./components/GettingStarted";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import AuthDialog from "./components/AuthDialog";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const sections = ["hero", "models", "solutions", "pricing", "faq", "why-switch", "getting-started", "features"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            if (sectionId === "features" || sectionId === "getting-started") {
              setActiveSection("docs");
            } else if (sectionId === "why-switch") {
              setActiveSection("solutions");
            } else {
              setActiveSection(sectionId);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#060913] selection:bg-brand-orange selection:text-white" id="main-view-container">
      {/* Header */}
      <Header 
        onNavClick={handleNavClick} 
        activeSection={activeSection}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      <main id="main-content-flow">
        {/* Hero */}
        <Hero 
          onNavClick={handleNavClick}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        {/* The India Stack (5 model tiers) */}
        <IndiaStack />

        {/* Why Indos (6 features) */}
        <EverythingGrid onOpenAuth={() => setIsAuthOpen(true)} />

        {/* Who Builds on Indos (4 personas) */}
        <WhoWeBuildFor onOpenAuth={() => setIsAuthOpen(true)} />

        {/* Pricing (INR per 1M tokens) */}
        <PricingSection onOpenAuth={() => setIsAuthOpen(true)} />

        {/* Why Teams Switch */}
        <WhyTeamsSwitch onOpenAuth={() => setIsAuthOpen(true)} />

        {/* Getting Started */}
        <GettingStarted onOpenAuth={() => setIsAuthOpen(true)} />

        {/* FAQ */}
        <FAQ />

      </main>

      {/* Footer */}
      <Footer 
        onNavClick={handleNavClick}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Auth Dialog */}
      <AuthDialog 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
    </div>
  );
}