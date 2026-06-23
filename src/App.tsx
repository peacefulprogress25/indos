/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import EverythingGrid from "./components/EverythingGrid";
import ModelRouting from "./components/ModelRouting";
import WhoWeBuildFor from "./components/WhoWeBuildFor";
import WhyTeamsSwitch from "./components/WhyTeamsSwitch";
import GettingStarted from "./components/GettingStarted";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import AuthDialog from "./components/AuthDialog";
import PricingModal from "./components/PricingModal";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  // Smooth scroll helper
  const handleNavClick = (sectionId: string) => {
    if (sectionId === "pricing") {
      setIsPricingOpen(true);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  // Callback when a pricing plan is chosen
  const handleSelectPlan = (planName: string) => {
    setIsAuthOpen(true);
  };

  // Implement automatic scroll spy highlighting to detect current active section in standard viewport
  useEffect(() => {
    const sections = ["hero", "models", "solutions", "faq", "why-switch", "getting-started", "features"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for sticky header
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            // Map sub-features to closer match main navigation options
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
      {/* 1. Page Header */}
      <Header 
        onNavClick={handleNavClick} 
        activeSection={activeSection}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 2. Scrollable Body Sections */}
      <main id="main-content-flow">
        
        {/* Hero Area */}
        <Hero 
          onNavClick={handleNavClick}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        {/* 8-Item Features Grid ("Everything You Need To Build AI") */}
        <EverythingGrid onOpenAuth={() => setIsAuthOpen(true)} />

        {/* Dynamic Model Routing Table & Playground ("One API. Every Model.") */}
        <ModelRouting onOpenAuth={() => setIsAuthOpen(true)} />

        {/* Who We Build For Checklist ("Built For AI Builders.") */}
        <WhoWeBuildFor onOpenAuth={() => setIsAuthOpen(true)} />

        {/* Why Teams Switch block ("Why Teams Switch To Indos") */}
        <WhyTeamsSwitch onOpenAuth={() => setIsAuthOpen(true)} />

        {/* Getting Started ("Getting Started" Timeline diagram) */}
        <GettingStarted 
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        {/* FAQ Accordion list */}
        <FAQ />

      </main>

      {/* 3. Global Footer with high-contrast final CTA Banner bar */}
      <Footer 
        onNavClick={handleNavClick}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 4. Global Action Dialog Layer (Simulated API Gateways provisioning client keys) */}
      <AuthDialog 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />

      {/* 5. Global Pricing Transparent Toggles dialog */}
      <PricingModal 
        isOpen={isPricingOpen} 
        onClose={() => setIsPricingOpen(false)}
        onSelectPlan={handleSelectPlan}
      />
    </div>
  );
}
