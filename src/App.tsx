/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PlatformMetrics from "./components/PlatformMetrics";
import IndiaStack from "./components/IndiaStack";
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
    const sections = ["hero", "models", "solutions", "pricing", "faq", "why-switch", "getting-started"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            if (sectionId === "getting-started") {
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
      <Header 
        onNavClick={handleNavClick} 
        activeSection={activeSection}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      <main id="main-content-flow">
        <Hero 
          onNavClick={handleNavClick}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        <PlatformMetrics />

        <IndiaStack />

        <WhoWeBuildFor onOpenAuth={() => setIsAuthOpen(true)} />

        <PricingSection onOpenAuth={() => setIsAuthOpen(true)} />

        <WhyTeamsSwitch onOpenAuth={() => setIsAuthOpen(true)} />

        <GettingStarted onOpenAuth={() => setIsAuthOpen(true)} />

        <FAQ />
      </main>

      <Footer 
        onNavClick={handleNavClick}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      <AuthDialog 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
    </div>
  );
}