import React from "react";
import { ArrowRight, Play, Server, Library, Cpu, Network, Database, Shield } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onNavClick: (sectionId: string) => void;
  onOpenAuth: () => void;
}

export default function Hero({ onNavClick, onOpenAuth }: HeroProps) {
  // Let's create an elegant isometric schema for the SVGs to represent the network architecture
  return (
    <section id="hero" className="relative bg-[#060913] text-white pt-20 pb-24 md:py-32 overflow-hidden border-b border-[#1E293B]/40">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b1a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Radiant Glow Spots */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-blue-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="col-span-1 lg:col-span-6 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 bg-brand-orange/10 border border-brand-orange/35 rounded-full px-4 py-1.5 text-xs text-brand-orange font-mono font-medium tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
              <span>Sovereign AI Infrastructure</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
              Intelligence <br />
              <span className="text-white relative">
                on Tap
                <span className="absolute -bottom-1 left-0 w-full h-[6px] bg-brand-orange/80 rounded" />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 font-sans leading-relaxed max-w-lg">
              Easiest way to build production grade AI in India. Access frontier open source models through a single or dedicated APIs.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={onOpenAuth}
                className="px-8 py-4 bg-brand-orange hover:bg-[#E05600] text-white font-sans font-semibold text-base rounded transition-all duration-300 shadow-[0_4px_25px_rgba(255,107,0,0.3)] hover:shadow-[0_4px_30px_rgba(255,107,0,0.5)] flex items-center space-x-2 cursor-pointer active:scale-95"
                id="hero-btn-get-key"
              >
                <span>Get API Key</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
              </button>
            </div>

            <p className="text-xs md:text-sm text-gray-500 font-sans max-w-md border-t border-[#1E293B]/60 pt-6">
              Trusted by developers, startups and AI agencies building the next generation of AI applications.
            </p>
          </div>

          {/* Right SVG Isometric Network diagram Column */}
          <div className="col-span-1 lg:col-span-6 relative flex justify-center">
            {/* Main Interactive Diagram container */}
            <div className="relative w-full max-w-[540px] aspect-[1.12] rounded-xl overflow-hidden bg-transparent border-0">
              
              {/* Dynamic SVG with glow effects and clean lines */}
              <svg 
                viewBox="0 0 540 480" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-full h-full select-none"
              >
                {/* Background Grid Lines inside representation */}
                <path d="M 270 40 L 490 150 L 270 260 L 50 150 Z" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                <path d="M 270 190 L 490 300 L 270 410 L 50 300 Z" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

                {/* Connection lines (glowing paths) */}
                <g strokeWidth="2" opacity="0.75">
                  {/* Glowing main loops */}
                  <path d="M 270 210 L 150 150 L 270 90 L 390 150 Z" stroke="#334155" strokeWidth="1" />
                  
                  {/* Glowing Orange Tracks */}
                  <motion.path 
                    d="M 150 150 L 270 210 L 390 150" 
                    stroke="url(#orange-glow-grad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "150", strokeDashoffset: "150" }}
                    animate={{ strokeDashoffset: [-150, 150] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  />
                  
                  <motion.path 
                    d="M 270 340 L 270 210" 
                    stroke="#FF6B00" 
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {/* High connections */}
                  <path d="M 120 120 L 120 280 M 420 120 L 420 280" stroke="#1E293B" strokeWidth="1" />
                </g>

                {/* Definitions for gradients */}
                <defs>
                  <linearGradient id="orange-glow-grad" x1="150" y1="150" x2="390" y2="150" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF6B00" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FF6B00" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
                  </linearGradient>

                  <linearGradient id="server-shading" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1E293B" />
                    <stop offset="100%" stopColor="#0B0F19" />
                  </linearGradient>

                  <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* ISOMETRIC COMPONENT 1: CENTRAL CORE ROUTER (The heart box) */}
                <g transform="translate(195, 170)">
                  {/* Glow under router */}
                  <ellipse cx="75" cy="50" rx="35" ry="10" fill="#FF6B00" fillOpacity="0.12" filter="url(#neon-glow)" />
                  
                  {/* Core Base Layer */}
                  <polygon points="75,10 125,35 75,60 25,35" fill="#0E1424" stroke="#FF6B00" strokeWidth="1.5" />
                  
                  {/* Vertical server stack look */}
                  <polygon points="25,35 25,50 75,75 75,60" fill="#0A0E1A" stroke="#1E293B" />
                  <polygon points="125,35 125,50 75,75 75,60" fill="#141B2D" stroke="#1E293B" />

                  {/* Top LED plates */}
                  <polygon points="75,2 120,25 75,48 30,25" fill="#1A233A" stroke="#FF6B00" strokeWidth="1.2" />

                  {/* Horizontal glowing indicators */}
                  <line x1="45" y1="36" x2="65" y2="46" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
                  <line x1="85" y1="46" x2="105" y2="36" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />

                  {/* Bouncing Core Node */}
                  <motion.circle 
                    cx="75" cy="20" r="4" 
                    fill="#FF6B00" 
                    filter="url(#neon-glow)"
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  />
                </g>

                {/* ISOMETRIC COMPONENT 2: MODEL REGISTRY TOWER (Top Right) */}
                <g transform="translate(360, 95)">
                  {/* Tower platform */}
                  <polygon points="35,10 65,25 35,40 5,25" fill="#0B132B" stroke="#475569" strokeWidth="1" />
                  
                  {/* Cube 1 (Lower) */}
                  <polygon points="35,3 55,13 35,23 15,13" fill="#1E293B" stroke="#475569" strokeWidth="0.8" />
                  <polygon points="15,13 15,30 35,40 35,23" fill="#0F172A" />
                  <polygon points="55,13 55,30 35,40 35,23" fill="#0F172A" />

                  {/* Connecting light lines */}
                  <line x1="35" y1="40" x2="35" y2="55" stroke="#FF6B00" strokeWidth="1" opacity="0.6" />

                  {/* Tiny flickering orange nodes */}
                  <circle cx="25" cy="23" r="1.5" fill="#FF6B00" />
                  <circle cx="45" cy="23" r="1.5" fill="#FF6B00" />
                </g>

                {/* ISOMETRIC COMPONENT 3: INFERENCE CLUSTER TOWER (Top Left) */}
                <g transform="translate(100, 100)">
                  <polygon points="35,10 65,25 35,40 5,25" fill="#0B132B" stroke="#475569" strokeWidth="1" />
                  <polygon points="35,-5 60,7 35,20 10,7" fill="#1E293B" stroke="#475569" />
                  <polygon points="10,7 10,25 35,38 35,20" fill="#0F172A" />
                  <polygon points="60,7 60,25 35,38 35,20" fill="#0F172A" />

                  <circle cx="40" cy="18" r="1.5" fill="#10B981" />
                </g>

                {/* ISOMETRIC COMPONENT 4: OBJECT STORAGE (Bottom Right) */}
                <g transform="translate(410, 270)">
                  <polygon points="30,10 55,22 30,35 5,22" fill="#0B132B" stroke="#475569" />
                  <polygon points="30,2 50,12 30,22 10,12" fill="#0E1424" stroke="#FF6B00" strokeWidth="1" />
                  <polygon points="10,12 10,25 30,35 30,22" fill="#0A0E1A" />
                  <polygon points="50,12 50,25 30,35 30,22" fill="#141B2D" />

                  {/* Blinking blue lights */}
                  <circle cx="22" cy="20" r="1.5" fill="#3B82F6" />
                  <circle cx="38" cy="20" r="1.5" fill="#3B82F6" />
                </g>

                {/* ISOMETRIC COMPONENT 5: PRIVATE DEPLOYMENTS (Bottom Left) */}
                <g transform="translate(240, 320)">
                  <polygon points="40,10 75,27 40,45 5,27" fill="#0B132B" stroke="#475569" />
                  <polygon points="40,-3 70,12 40,27 10,12" fill="#1E293B" stroke="#1E293B" />
                  <polygon points="10,12 10,32 40,47 40,27" fill="#0F172A" />
                  <polygon points="70,12 70,32 40,47 40,27" fill="#1E293B" />
                  <ellipse cx="40" cy="12" rx="15" ry="6" fill="#10B981" fillOpacity="0.15" />
                </g>

                {/* LABELS WITH LINE POINTERS AND REAL-TIME LIVE BADGES */}
                {/* 1. Inference Clusters Label (Top Left) */}
                <g transform="translate(40, 50)" className="cursor-pointer group">
                  <text x="14" y="16" fill="#94A3B8" fontSize="9" fontFamily="monospace" letterSpacing="1">INFERENCE CLUSTERS</text>
                  <circle cx="230" cy="115" r="3" fill="#10B981" />
                  
                  {/* Pulse */}
                  <motion.circle 
                    cx="230" cy="115" r="7" 
                    stroke="#10B981" strokeWidth="1.5" fill="none"
                    animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                  />

                  {/* Blinking live bullet */}
                  <circle cx="140" cy="13" r="3.2" fill="#10B981" />
                  <motion.circle 
                    cx="140" cy="13" r="6" 
                    stroke="#10B981" strokeWidth="1" fill="none"
                    animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <text x="150" y="16" fill="#10B981" fontSize="9" fontFamily="monospace" fontWeight="bold">LIVE</text>
                  
                  {/* Line pointer */}
                  <path d="M 120 22 L 120 45 L 140 60" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                </g>

                {/* 2. Model Registry Label (Top Right) */}
                <g transform="translate(390, 48)">
                  <text x="0" y="16" fill="#94A3B8" fontSize="9" fontFamily="monospace" letterSpacing="1">MODEL REGISTRY</text>
                  
                  <circle cx="106" cy="13" r="3.2" fill="#10B981" />
                  <motion.circle 
                    cx="106" cy="13" r="6" 
                    stroke="#10B981" strokeWidth="1" fill="none"
                    animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.1 }}
                  />
                  <text x="116" y="16" fill="#10B981" fontSize="9" fontFamily="monospace" fontWeight="bold">LIVE</text>
                  
                  {/* Line pointer */}
                  <path d="M 50 25 L 30 45 L 10 50" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                </g>

                {/* 3. Private Deployments Label (Bottom Left) */}
                <g transform="translate(20, 380)">
                  <text x="10" y="16" fill="#94A3B8" fontSize="9" fontFamily="monospace" letterSpacing="1">PRIVATE DEPLOYMENTS</text>
                  
                  <circle cx="150" cy="13" r="3.2" fill="#10B981" />
                  <motion.circle 
                    cx="150" cy="13" r="6" 
                    stroke="#10B981" strokeWidth="1" fill="none"
                    animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  <text x="160" y="16" fill="#10B981" fontSize="9" fontFamily="monospace" fontWeight="bold">LIVE</text>
                  
                  {/* Line pointer */}
                  <path d="M 175 22 L 205 22 L 230 10" stroke="#475569" strokeWidth="1" />
                </g>

                {/* 4. Secure Network Label (Bottom Center-ish) */}
                <g transform="translate(230, 420)">
                  <text x="10" y="15" fill="#94A3B8" fontSize="9" fontFamily="monospace" letterSpacing="1">SECURE NETWORK</text>
                  <circle cx="112" cy="12" r="3" fill="#10B981" />
                  <motion.circle 
                    cx="112" cy="12" r="5" 
                    stroke="#10B981" strokeWidth="1" fill="none"
                    animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2 }}
                  />
                  <text x="120" y="15" fill="#10B981" fontSize="9" fontFamily="monospace" fontWeight="bold">LIVE</text>
                </g>

                {/* 5. Object Storage Label (Bottom Right) */}
                <g transform="translate(390, 370)">
                  <text x="14" y="16" fill="#94A3B8" fontSize="9" fontFamily="monospace" letterSpacing="1">OBJECT STORAGE</text>
                  
                  <circle cx="110" cy="13" r="3.2" fill="#10B981" />
                  <motion.circle 
                    cx="110" cy="13" r="6" 
                    stroke="#10B981" strokeWidth="1" fill="none"
                    animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 2.4 }}
                  />
                  <text x="120" y="16" fill="#10B981" fontSize="9" fontFamily="monospace" fontWeight="bold">LIVE</text>
                  
                  {/* Line pointer */}
                  <path d="M 40 22 L 40 45 L 20 60" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                </g>
              </svg>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
