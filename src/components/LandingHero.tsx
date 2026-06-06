"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X, User, Gamepad2, Trophy, Sparkles, Layers, ChevronLeft, ChevronRight, Gem, ShoppingCart, Club, MonitorSmartphone, Share2, Box } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import posthog from "posthog-js";

import Navbar from "./Navbar";
import Turnstile from "./Turnstile";
import Checkbox from "./Checkbox";

const THEMES = [
  { 
    id: 0, 
    gradient: "radial-gradient(circle at 50% 50%, #06b6d4, #0e7490)", // Cyan
    glowColor: "rgba(6, 182, 212, 0.5)",
    word1: "software",
    word2: "Gaming"
  },
  { 
    id: 1, 
    gradient: "radial-gradient(circle at 50% 50%, #6366f1, #3730a3)", // Indigo
    glowColor: "rgba(99, 102, 241, 0.5)",
    word1: "software",
    word2: "Esports"
  },
  { 
    id: 2, 
    gradient: "radial-gradient(circle at 50% 50%, #f43f5e, #9f1239)", // Rose
    glowColor: "rgba(244, 63, 94, 0.5)",
    word1: "software",
    word2: "Creators"
  },
  { 
    id: 3, 
    gradient: "radial-gradient(circle at 50% 50%, #10b981, #065f46)", // Emerald
    glowColor: "rgba(16, 185, 129, 0.5)",
    word1: "assets",
    word2: "Gaming"
  }
];

interface PersonalizationPayload {
  badge?: string;
  description?: string;
  cta_primary?: string;
  cta_secondary?: string;
}

function HeroSection({ 
  activeThemeIndex, 
  progress, 
  setActiveThemeIndex,
  displayedWord1,
  displayedWord2,
  personalization
}: { 
  activeThemeIndex: number; 
  progress: number; 
  setActiveThemeIndex: (idx: number) => void;
  displayedWord1: string;
  displayedWord2: string;
  personalization: PersonalizationPayload;
}) {
  const currentGlowColor = THEMES[activeThemeIndex].glowColor;

  return (
    <section className="px-6 md:px-10 xl:px-14 w-full h-[calc(100vh-80px)] flex flex-col justify-start pb-14">
      <div className="w-full h-full rounded-[48px] relative flex flex-col items-center justify-center px-6 text-center select-none">
        
        {/* Background Card Wrapper (with overflow-hidden) */}
        <div className="absolute inset-0 rounded-[48px] overflow-hidden pointer-events-none z-0">
          {THEMES.map((theme, idx) => (
            <div
              key={theme.id}
              className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
              style={{
                background: theme.gradient,
                opacity: idx === activeThemeIndex ? 1 : 0
              }}
            />
          ))}
          
          <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay"></div>
          
          <div className="absolute inset-0 opacity-40">
            {Array.from({ length: 20 }).map((_, i) => {
              const top = `${10 + (i * 4) % 80}%`;
              const left = `${5 + (i * 7) % 90}%`;
              const size = `${2 + (i % 3)}px`;
              return (
                <div
                  key={i}
                  className="absolute rounded-full bg-white animate-pulse"
                  style={{
                    top,
                    left,
                    width: size,
                    height: size,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${2 + (i % 4)}s`
                  }}
                />
              );
            })}
          </div>

          {/* Floating 3D/Photo elements */}
          <div className="hidden xl:block absolute inset-0 pointer-events-none overflow-hidden z-30">
            {/* Middle Cards first (renders underneath corner images) */}
            <div
              className="absolute floating-asset animate-float"
              style={{ top: "240px", left: "180px", transform: "rotate(-4deg)" }}
            >
              <div 
                className="w-[160px] h-[220px] rounded-3xl shadow-[0px_24px_48px_rgba(0,0,0,0.15)] border border-white/20 relative overflow-hidden"
                style={{
                  background: `radial-gradient(circle at top right, ${currentGlowColor} 0%, transparent 60%), #ffffff`
                }}
              >
                <Image
                  src="/images/hero/gaming/middle-left.png"
                  alt="Gaming middle-left"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div
              className="absolute floating-asset animate-float"
              style={{ top: "240px", right: "160px", transform: "rotate(4deg)" }}
            >
              <div 
                className="w-[160px] h-[220px] rounded-3xl shadow-[0px_24px_48px_rgba(0,0,0,0.15)] border border-white/20 relative overflow-hidden"
                style={{
                  background: `radial-gradient(circle at bottom left, ${currentGlowColor} 0%, transparent 60%), #ffffff`
                }}
              >
                <Image
                  src="/images/hero/gaming/middle-right.png"
                  alt="Gaming middle-right"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Corner Images after (renders on top of middle cards) */}
            <div
              className="absolute floating-asset animate-float corner-up-left"
              style={{ top: "-10px", left: "-40px", transform: "rotate(5deg)" }}
            >
              <Image
                src="/images/hero/gaming/up-left.png"
                alt="3D T-shirt"
                width={270}
                height={270}
                className="drop-shadow-[0px_30px_40px_rgba(0,0,0,0.2)] object-contain"
              />
            </div>
            
            <div
              className="absolute floating-asset animate-float corner-down-left"
              style={{ bottom: "-10px", left: "-100px", transform: "rotate(10deg)" }}
            >
              <Image
                src="/images/hero/gaming/down-left.png"
                alt="Gaming down-left"
                width={440}
                height={440}
                style={{
                  transform: "perspective(1000px) rotateX(-25deg) rotateY(-25deg) rotateZ(-10deg)",
                  transformStyle: "preserve-3d"
                }}
                className="drop-shadow-[0px_30px_50px_rgba(0,0,0,0.3)] object-contain"
              />
            </div>

            <div
              className="absolute floating-asset animate-float corner-up-right"
              style={{ top: "20px", right: "10px", transform: "rotate(15deg)" }}
            >
              <Image
                src="/images/hero/gaming/up-right.png"
                alt="Gaming up-right"
                width={300}
                height={300}
                className="drop-shadow-[0px_30px_40px_rgba(0,0,0,0.25)] object-contain"
              />
            </div>

            <div
              className="absolute floating-asset animate-float corner-down-right"
              style={{ bottom: "-40px", right: "-100px", transform: "rotate(-12deg)" }}
            >
              <Image
                src="/images/hero/gaming/down-right.png"
                alt="Gaming down-right"
                width={380}
                height={380}
                className="drop-shadow-[0px_40px_50px_rgba(0,0,0,0.3)] object-contain"
              />
            </div>
          </div>

          {/* Radial blur overlays inside the card wrapper, covering the full area to prevent sharp box borders */}
          <div 
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              maskImage: "radial-gradient(circle 240px at bottom left, black 0%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(circle 240px at bottom left, black 0%, transparent 100%)",
              backdropFilter: "blur(25px) saturate(190%)",
              WebkitBackdropFilter: "blur(25px) saturate(190%)",
              background: "rgba(255, 255, 255, 0.12)",
              transform: "translateZ(0)"
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              maskImage: "radial-gradient(circle 240px at bottom right, black 0%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(circle at bottom right, black 0%, transparent 100%)",
              backdropFilter: "blur(25px) saturate(190%)",
              WebkitBackdropFilter: "blur(25px) saturate(190%)",
              background: "rgba(255, 255, 255, 0.12)",
              transform: "translateZ(0)"
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              maskImage: "radial-gradient(circle 240px at top right, black 0%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(circle 240px at top right, black 0%, transparent 100%)",
              backdropFilter: "blur(25px) saturate(190%)",
              WebkitBackdropFilter: "blur(25px) saturate(190%)",
              background: "rgba(255, 255, 255, 0.12)",
              transform: "translateZ(0)"
            }}
          />
        </div>

        {/* Vertical Countdown Pills (left edge of the card) */}
        <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30 pointer-events-auto">
          {THEMES.map((theme, idx) => {
            const isActive = idx === activeThemeIndex;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => setActiveThemeIndex(idx)}
                className={`w-1 rounded-full bg-white/30 transition-all duration-300 relative overflow-hidden ${
                  isActive ? "h-8 bg-white/40" : "h-4 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {isActive && (
                  <div 
                    className="absolute top-0 left-0 w-full bg-white transition-all duration-75"
                    style={{
                      height: `${progress}%`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Top Badge - Starts exactly at the top boundary of the card, only rounded at the bottom */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 px-8 py-3 rounded-b-2xl rounded-t-none bg-[#020617] text-white text-[14px] font-medium hover:scale-105 transition-transform cursor-pointer shadow-md">
          {personalization.badge || "Apresentação de Marca 2025 / 2026"} →
        </div>

        {/* Central Hero Content */}
        <div className="relative z-10 max-w-[850px] mx-auto flex flex-col items-center py-6 md:py-8">
          <h1 className="hero-animate font-heading font-black text-white tracking-tight text-center max-w-4xl flex flex-col items-center">
            <span 
              className="tracking-[-1.5px] font-black block text-white text-center"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.75rem)",
                lineHeight: "1.05"
              }}
            >
              Global <br />
              <span className="inline-block overflow-hidden align-bottom h-[1.15em] relative">
                <span className="title-animate-word inline-block">{displayedWord1}</span>
              </span> <br />
              built for
            </span>
            <span className="inline-block overflow-hidden py-2 px-6 -rotate-[2deg] select-none">
              <span 
                className="title-animate-word font-black tracking-[-2px] block"
                style={{
                  fontSize: "clamp(2.5rem, 6.5vw, 6.25rem)",
                  color: "#0f172a",
                  WebkitTextStroke: "28px #ffffff",
                  paintOrder: "stroke fill",
                  strokeLinejoin: "round",
                  strokeLinecap: "round",
                  marginTop: "clamp(-1.5rem, -3vw, -0.75rem)"
                }}
              >
                {displayedWord2}
              </span>
            </span>
          </h1>

          <p 
            className="hero-animate text-white max-w-[560px] font-normal px-4"
            style={{
              fontSize: "clamp(0.875rem, 1.8vw, 1.05rem)",
              lineHeight: "1.5",
              marginTop: "clamp(1rem, 2.5vh, 2rem)",
              marginBottom: "clamp(2.5rem, 6vh, 5.5rem)"
            }}
          >
            {personalization.description || "A INNER Studios é um estúdio de desenvolvimento de videojogos português com uma estrutura verdadeiramente full stack — desde a criação de arte e código, até à gestão de comunidade, lore e suporte técnico."}
          </p>
        </div>

        {/* CTA Group - Center corresponds to the bottom edge of the hero card */}
        <div className="absolute bottom-0 translate-y-1/2 z-20 bg-white/90 backdrop-blur-md p-2 rounded-[24px] flex gap-2 shadow-[0px_20px_40px_rgba(0,0,0,0.15)] max-w-md w-full sm:w-auto">
          <button type="button" className="flex-1 sm:flex-initial bg-[#0f172a] text-white py-4 px-8 rounded-[16px] text-base font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap shadow-md">
            {personalization.cta_primary || "Conhecer Projetos"}
          </button>
          <button type="button" className="flex-1 sm:flex-initial bg-transparent text-[#0f172a] py-4 px-8 rounded-[16px] text-base font-semibold hover:bg-slate-100 transition-colors whitespace-nowrap">
            {personalization.cta_secondary || "Falar Connosco"}
          </button>
        </div>

      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-auto py-8 px-6 border-t border-slate-100 bg-white z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image
            src="/logo-dark.png"
            alt="inner studios"
            width={90}
            height={20}
            className="h-5 w-auto opacity-40"
          />
        </div>
        <p className="text-xs text-slate-500" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} Inner Studios. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-slate-500">
          <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Sofia\nValerie",
    role: "Strategist",
    bio: "Sofia drives product and brand development with a keen strategic eye, ensuring that every digital creation delivers exceptional user experiences.",
    signature: "/images/team/sofia_signature.png",
    image: "/images/team/sofia.png",
    superpowers: [
      { title: "Strategic Vision", desc: "Crafting growth plans for brands." },
      { title: "Brand Engineering", desc: "Creating premium visual identities." }
    ]
  },
  {
    id: 2,
    name: "Afonso\nQueiroz",
    role: "Developer",
    bio: "Afonso builds robust, scalable web architectures and ingest pipelines, bridging the gap between high-performance systems and frontend execution.",
    signature: "/images/team/afonso_signature.png",
    image: "/images/team/afonso.png",
    superpowers: [
      { title: "Backend Scale", desc: "Optimizing real-time data pipelines." },
      { title: "System Architecture", desc: "Designing secure, modular frameworks." }
    ]
  },
  {
    id: 3,
    name: "Sofia\nValerie",
    role: "Strategist",
    bio: "Sofia drives product and brand development with a keen strategic eye, ensuring that every digital creation delivers exceptional user experiences.",
    signature: "/images/team/sofia_signature.png",
    image: "/images/team/sofia.png",
    superpowers: [
      { title: "Strategic Vision", desc: "Crafting growth plans for brands." },
      { title: "Brand Engineering", desc: "Creating premium visual identities." }
    ]
  },
  {
    id: 4,
    name: "Afonso\nQueiroz",
    role: "Developer",
    bio: "Afonso builds robust, scalable web architectures and ingest pipelines, bridging the gap between high-performance systems and frontend execution.",
    signature: "/images/team/afonso_signature.png",
    image: "/images/team/afonso.png",
    superpowers: [
      { title: "Backend Scale", desc: "Optimizing real-time data pipelines." },
      { title: "System Architecture", desc: "Designing secure, modular frameworks." }
    ]
  },
  {
    id: 5,
    name: "Sofia\nValerie",
    role: "Strategist",
    bio: "Sofia drives product and brand development with a keen strategic eye, ensuring that every digital creation delivers exceptional user experiences.",
    signature: "/images/team/sofia_signature.png",
    image: "/images/team/sofia.png",
    superpowers: [
      { title: "Strategic Vision", desc: "Crafting growth plans for brands." },
      { title: "Brand Engineering", desc: "Creating premium visual identities." }
    ]
  },
  {
    id: 6,
    name: "Afonso\nQueiroz",
    role: "Developer",
    bio: "Afonso builds robust, scalable web architectures and ingest pipelines, bridging the gap between high-performance systems and frontend execution.",
    signature: "/images/team/afonso_signature.png",
    image: "/images/team/afonso.png",
    superpowers: [
      { title: "Backend Scale", desc: "Optimizing real-time data pipelines." },
      { title: "System Architecture", desc: "Designing secure, modular frameworks." }
    ]
  },
  {
    id: 7,
    name: "Sofia\nValerie",
    role: "Strategist",
    bio: "Sofia drives product and brand development with a keen strategic eye, ensuring that every digital creation delivers exceptional user experiences.",
    signature: "/images/team/sofia_signature.png",
    image: "/images/team/sofia.png",
    superpowers: [
      { title: "Strategic Vision", desc: "Crafting growth plans for brands." },
      { title: "Brand Engineering", desc: "Creating premium visual identities." }
    ]
  },
  {
    id: 8,
    name: "Afonso\nQueiroz",
    role: "Developer",
    bio: "Afonso builds robust, scalable web architectures and ingest pipelines, bridging the gap between high-performance systems and frontend execution.",
    signature: "/images/team/afonso_signature.png",
    image: "/images/team/afonso.png",
    superpowers: [
      { title: "Backend Scale", desc: "Optimizing real-time data pipelines." },
      { title: "System Architecture", desc: "Designing secure, modular frameworks." }
    ]
  },
  {
    id: 9,
    name: "Next\nPlayer",
    role: "Join Us",
    bio: "We are always looking for top-tier players to join our engineering and design teams. Scale your career with us.",
    signature: null,
    image: "/images/team/silhueta.png",
    superpowers: [
      { title: "Your Skillset", desc: "Bring your expertise to our core products." },
      { title: "Our Support", desc: "Access world-class resources and tools." }
    ]
  }
];

function TeamSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayedRole, setDisplayedRole] = useState(TEAM_MEMBERS[0].role);
  const [displayedName, setDisplayedName] = useState(TEAM_MEMBERS[0].name);
  const [displayedImage, setDisplayedImage] = useState<string | null>(TEAM_MEMBERS[0].image);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TEAM_MEMBERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeIdx === 0 && displayedRole === TEAM_MEMBERS[0].role) return;

    const tl = gsap.timeline();
    // Exit: Role goes up, Name & Portrait go right
    tl.to(".role-animate-text", { yPercent: -120, opacity: 0, duration: 0.35, ease: "power2.inOut" }, 0);
    tl.to(".name-animate-text", { xPercent: 120, opacity: 0, duration: 0.35, ease: "power2.inOut" }, 0);
    tl.to(".portrait-animate-img", { xPercent: 120, opacity: 0, duration: 0.35, ease: "power2.inOut" }, 0);

    // Swap data
    tl.add(() => {
      setDisplayedRole(TEAM_MEMBERS[activeIdx].role);
      setDisplayedName(TEAM_MEMBERS[activeIdx].name);
      setDisplayedImage(TEAM_MEMBERS[activeIdx].image);
    });

    // Entry: Role comes from bottom, Name & Portrait come from left
    tl.fromTo(".role-animate-text",
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.45, ease: "power2.out" }
    );
    tl.fromTo(".name-animate-text",
      { xPercent: -120, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
      "<"
    );
    tl.fromTo(".portrait-animate-img",
      { xPercent: -120, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
      "<"
    );
  }, [activeIdx]);

  const currentMember = TEAM_MEMBERS[activeIdx];

  return (
    <section className="px-6 md:px-10 xl:px-14 w-full flex flex-col items-center justify-start pb-14 mt-16">
      <style>{`
        @keyframes profileFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .animate-profile-fade {
          animation: profileFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
      
      {/* Title outside the background, on the white page */}
      <h2 className="font-heading font-black text-[#0f172a] tracking-tight text-center max-w-5xl mb-12 select-none">
        <span 
          className="tracking-[-1.5px] font-black block text-[#0f172a] text-center"
          style={{
            fontSize: "clamp(2rem, 5vw, 4.75rem)",
            lineHeight: "1.15"
          }}
        >
          Top-tier <br />
          <span className="inline-flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
            <span>Development</span>
            <span className="inline-block overflow-visible py-2 px-1 -rotate-[2deg] select-none relative">
              {/* White gradient stain over the 'a' and 'y' zone, with a soft, uniform epicentre */}
              <div 
                className="absolute pointer-events-none rounded-full blur-[16px]"
                style={{
                  background: "radial-gradient(ellipse, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0) 100%)",
                  width: "130px",
                  height: "110px",
                  top: "-20%",
                  left: "20%",
                  transform: "rotate(15deg)",
                  zIndex: 20,
                }}
              />
              <svg 
                viewBox="0 0 420 150" 
                className="w-[clamp(9rem,24vw,20rem)] h-auto overflow-visible select-none relative z-10"
                style={{
                  marginTop: "clamp(0.1rem, 0.5vw, 0.4rem)"
                }}
              >
                <defs>
                  <linearGradient id="stroke-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#93c5fd" /> {/* Soft lighter blue */}
                    <stop offset="100%" stopColor="#0271f1" /> {/* Darker blue already there */}
                  </linearGradient>
                </defs>
                <text
                  x="50%"
                  y="75"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="font-heading font-black tracking-[-4px]"
                  style={{
                    fontSize: "6.25rem",
                    fill: "#ffffff",
                    stroke: "url(#stroke-grad)",
                    strokeWidth: "28",
                    paintOrder: "stroke fill",
                    strokeLinejoin: "round",
                    strokeLinecap: "round"
                  }}
                >
                  Players
                </text>
              </svg>
            </span>
          </span>
        </span>
      </h2>

      {/* Static Background Card Wrapper */}
      <div className="w-full relative select-none mt-16 z-10">

        {/* Top Pill with 9 Replicated Avatar Circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#f1f5f9]/95 backdrop-blur-sm px-5 py-2.5 rounded-full flex items-center shadow-[0_12px_24px_-4px_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.15)] border border-white/50">
          
          {/* Replicated Pill (Enlarged outline layer matching the pill background, divided into 9 pieces) */}
          {Array.from({ length: 9 }).map((_, i) => {
            const leftCrop = Math.max(1, i * (100 / 9));
            const rightCrop = Math.max(1, (8 - i) * (100 / 9));
            const isActive = i === activeIdx;
            return (
              <div 
                key={i}
                className="absolute inset-0 -m-[12px] rounded-full border-2 border-[#f1f5f9] pointer-events-none z-[-1] transition-opacity duration-300"
                style={{ 
                  clipPath: `inset(50% ${rightCrop}% 0 ${leftCrop}%)`,
                  opacity: isActive ? 1 : 0.5
                }}
              />
            );
          })}

          <div className="flex gap-1.5">
            {Array.from({ length: 9 }).map((_, i) => {
              const isLast = i === 8;
              const isActive = i === activeIdx;
              return (
                <div 
                  key={i} 
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 border-[#f1f5f9] relative flex items-center justify-center transition-all duration-300 ${
                    isLast ? "bg-[#0271f1]" : "bg-slate-200"
                  } ${isActive ? "opacity-100 scale-105 shadow-sm" : "opacity-70"}`}
                >
                  {isLast ? (
                    <Image
                      src="/images/team/silhueta.png"
                      alt="Join the team avatar"
                      fill
                      className="object-cover object-top scale-110 brightness-0 invert"
                    />
                  ) : (
                    <Image
                      src={i % 2 === 0 ? "/images/team/sofia.png" : "/images/team/afonso.png"}
                      alt={i % 2 === 0 ? `Sofia avatar ${i + 1}` : `Afonso avatar ${i + 1}`}
                      fill
                      className="object-cover object-top scale-110"
                    />
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Sub-pill with 1/9 hanging from the bottom center, tucked underneath */}
          <div className="absolute top-[80%] left-1/2 -translate-x-1/2 bg-[#e2e8f0] text-slate-800 text-xs font-heading font-bold pt-3.5 pb-2 px-5 rounded-b-2xl rounded-t-none shadow-[0_4px_10px_rgba(0,0,0,0.08)] border-b border-x border-slate-300/40 select-none z-10 text-center min-w-[64px]">
            {activeIdx + 1}/9
          </div>
        </div>

        {/* Static Background Card (has overflow-hidden for the image/radial gradient boundary) */}
        <div className="w-full min-h-[480px] pt-32 pb-0 rounded-[48px] relative flex flex-col items-center justify-end px-0 text-center overflow-hidden z-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
          
          {/* Static Background Card Wrapper */}
          <div 
            className="absolute inset-0 rounded-[48px] overflow-hidden pointer-events-none z-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, #06b6d4, #0e7490)"
            }}
          >
            <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay"></div>
          </div>

          {/* Member Card content with Left, Center, and Right Columns */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-end w-full max-w-none px-12 lg:px-16">
            
            {/* Left Column: Role & Bio */}
            <div className="flex flex-col items-start text-left w-full pb-6 lg:pb-10 z-20">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 w-full">
                <span className="text-white/60 text-xs font-heading font-bold tracking-widest uppercase">Role</span>
                <div className="inline-block overflow-hidden py-1.5 -rotate-[2deg] select-none h-[1.85em] relative">
                  <span 
                    className="role-animate-text font-black tracking-[-2px] block"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3.25rem)",
                      color: "#ffffff",
                      WebkitTextStroke: "16px #0271f1",
                      paintOrder: "stroke fill",
                      strokeLinejoin: "round",
                      strokeLinecap: "round"
                    }}
                  >
                    {displayedRole}
                  </span>
                </div>
              </div>
              
              <hr className="w-full border-white/20 my-5" />
              
              <span className="text-white/60 text-xs font-heading font-bold tracking-widest uppercase mb-1.5">Bio</span>
              <p key={`bio-${activeIdx}`} className="text-white/85 text-[14px] leading-relaxed max-w-sm font-sans min-h-[84px] animate-profile-fade">
                {currentMember.bio}
              </p>

              {/* Signature */}
              <div key={`sig-${activeIdx}`} className="relative w-80 h-28 mt-4 select-none animate-profile-fade">
                {currentMember.signature ? (
                  <Image
                    src={currentMember.signature}
                    alt={`${currentMember.name.replace('\n', ' ')} Signature`}
                    fill
                    className="object-contain object-left invert transition-all duration-300"
                  />
                ) : (
                  <div className="h-full flex items-center justify-start text-white/40 font-heading font-bold text-lg">
                    Join the Mission
                  </div>
                )}
              </div>
            </div>

            {/* Center Column: Portrait Image & Name */}
            <div className="relative flex flex-col items-center justify-end h-full w-full">
              <div 
                className="name-animate-text font-heading font-bold text-white tracking-[-0.75px] text-center z-20 mb-4"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  lineHeight: "1.05"
                }}
              >
                {displayedName.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < displayedName.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              <div className="relative w-[260px] h-[320px] overflow-hidden flex items-end">
                {displayedImage ? (
                  <Image
                    src={displayedImage}
                    alt={displayedName.replace('\n', ' ')}
                    fill
                    className={`portrait-animate-img object-cover object-bottom ${
                      displayedImage.includes("silhueta.png") ? "brightness-0 invert" : ""
                    }`}
                    priority
                  />
                ) : (
                  <div className="portrait-animate-img absolute inset-0 bg-[#0271f1]/20 flex items-center justify-center">
                    <User className="w-32 h-32 text-white opacity-40 animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Superpowers (only icons inside white cards, text next to them) */}
            <div key={`right-${activeIdx}`} className="flex flex-col items-start text-left w-full pb-6 lg:pb-10 gap-5 z-20 animate-profile-fade">
              <span className="text-white/60 text-xs font-heading font-bold tracking-widest uppercase mb-1.5">Superpowers</span>
              
              {currentMember.superpowers.map((power, idx) => (
                <div key={idx} className="w-full flex items-center gap-4 select-none">
                  <div className="w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center text-[#0271f1] flex-shrink-0 shadow-[0_8px_16px_rgba(0,0,0,0.1)] border border-[#f1f5f9]/20">
                    {idx === 0 ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-heading font-bold text-lg lg:text-xl tracking-tight leading-snug">{power.title}</h4>
                    <p className="text-white/80 text-[15px] lg:text-[16px] mt-1 font-sans leading-relaxed">{power.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

function FeatureSection({ 
  activeThemeIndex, 
  setActiveThemeIndex,
  progress
}: { 
  activeThemeIndex: number; 
  setActiveThemeIndex: (idx: number) => void;
  progress: number;
}) {
  const tabs = ["Video Games", "Web Platforms", "Social Media", "2D/3D Assets"];
  const icons = [Gamepad2, MonitorSmartphone, Share2, Box];

  const TAB_CONTENT = [
    {
      title: "Video Games",
      description: "Build immersive worlds with our expert engineering team. We deliver high-performance gameplay, robust multiplayer networking, and stunning visual fidelity for next-gen titles.",
      linkText: "Explore our Game Dev",
      linkUrl: "/projects",
      themeBg: "radial-gradient(circle at top right, #0891b2 0%, #155e75 100%)",
      themePillText: "text-cyan-700",
      themePillBg: "bg-cyan-100/90",
      cardCategory: "GAMEPLAY",
      cardHeading: "Top MMO publisher integrates our backend architecture, handling 1M+ concurrent players seamlessly",
      cardImage: "/images/feature_preview.png"
    },
    {
      title: "Web Platforms",
      description: "Scale your business with enterprise-grade web applications. We build ultra-fast, secure, and intuitive platforms that elevate your brand and drive unparalleled user engagement.",
      linkText: "Explore our Web Engineering",
      linkUrl: "/projects",
      themeBg: "radial-gradient(circle at top right, #4f46e5 0%, #3730a3 100%)",
      themePillText: "text-indigo-700",
      themePillBg: "bg-indigo-100/90",
      cardCategory: "SAAS PLATFORMS",
      cardHeading: "Global fintech brand launches a highly responsive client portal processing thousands of requests per second",
      cardImage: "/images/feature_preview.png"
    },
    {
      title: "Social Media",
      description: "Dominate the digital space with compelling content and strategies. Our team crafts viral campaigns, interactive digital assets, and data-driven marketing tailored for modern audiences.",
      linkText: "Explore Social Strategies",
      linkUrl: "/projects",
      themeBg: "radial-gradient(circle at top right, #e11d48 0%, #9f1239 100%)",
      themePillText: "text-rose-700",
      themePillBg: "bg-rose-100/90",
      cardCategory: "CAMPAIGNS",
      cardHeading: "Leading lifestyle brand increases organic engagement by 300% using our tailored content strategies",
      cardImage: "/images/feature_preview.png"
    },
    {
      title: "2D/3D Assets",
      description: "Bring your vision to life with bespoke 3D models, intricate 2D illustrations, and fluid animations. We create production-ready assets tailored for games, platforms, and marketing.",
      linkText: "Explore our Digital Art",
      linkUrl: "/projects",
      themeBg: "radial-gradient(circle at top right, #0eb885 0%, #046a4d 100%)",
      themePillText: "text-[#057c5a]",
      themePillBg: "bg-[#d1fae5]",
      cardCategory: "ART DIRECTION",
      cardHeading: "Award-winning studio utilizes our bespoke 3D character models for their latest cinematic trailer",
      cardImage: "/images/feature_preview.png"
    }
  ];

  const currentData = TAB_CONTENT[activeThemeIndex] || TAB_CONTENT[0];

  return (
    <section className="px-6 md:px-10 xl:px-14 w-full flex flex-col items-center justify-start pb-14 mt-10">
      <style>{`
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(80px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-right {
          animation: slideInFromRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      
      {/* Main Outer Card */}
      <div 
        className="w-full max-w-5xl rounded-[36px] relative shadow-[0_15px_45px_rgba(0,0,0,0.12)] px-6 py-14 lg:p-16 border border-zinc-800/10 flex flex-col lg:flex-row items-center justify-between gap-10 transition-all duration-700 ease-in-out"
        style={{
          background: currentData.themeBg
        }}
      >
        {/* Background Overflow Container */}
        <div className="absolute inset-0 rounded-[36px] overflow-hidden pointer-events-none z-0">
          {/* Background Noise Layer */}
          <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay"></div>

          {/* Ambient Glowing Blobs */}
          <div className="absolute top-[-50px] left-[45%] w-[180px] h-[180px] bg-white/10 rounded-full blur-[35px] transform rotate-[25deg] skew-x-6"></div>
          <div className="absolute bottom-[-100px] right-[-50px] w-[280px] h-[280px] bg-white/5 rounded-full blur-[50px]"></div>
          
          {/* Large Decorative Shape */}
          {activeThemeIndex === 3 && (
            <div className="absolute bottom-[-20px] right-[-20px] opacity-10 text-white text-[220px] font-serif leading-none">
              ♣
            </div>
          )}
        </div>

        {/* Mini Navbar Pill floating at the top center of the card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 select-none">
          <div className="bg-white border border-slate-100/60 p-2 rounded-2xl inline-flex items-center gap-1 shadow-[0_12px_25px_rgba(0,0,0,0.06)]">
            {tabs.map((tab, idx) => {
              const isActive = activeThemeIndex === idx;
              const Icon = icons[idx];
              const tabData = TAB_CONTENT[idx];
              
              // Progress fill bar inside the active pill
              const fillWidth = isActive ? 10 + (progress * 0.9) : 0;

              return (
                <span
                  key={tab}
                  onClick={() => setActiveThemeIndex(idx)}
                  className={`px-5 py-2.5 rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-1.5 relative overflow-hidden select-none font-heading font-semibold text-[13px] ${
                    isActive 
                      ? `${tabData.themePillText} font-bold scale-[1.01]` 
                      : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  {/* Progress Fill Layer */}
                  {isActive && (
                    <div 
                      className={`absolute inset-0 left-0 top-0 h-full ${tabData.themePillBg} rounded-xl pointer-events-none z-0`}
                      style={{ width: `${fillWidth}%` }}
                    />
                  )}

                  {/* Content (Text + Icon) */}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && (
                      idx === 3 ? (
                        <span className="text-[13px] leading-none">♣</span>
                      ) : (
                        <Icon className="w-3.5 h-3.5" />
                      )
                    )}
                    <span>{tab}</span>
                  </span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Content Wrapper for slide animation */}
        <div key={activeThemeIndex} className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10 animate-slide-right">
          {/* Left Column: Title, Description, and Link */}
          <div className="w-full lg:w-[50%] flex flex-col items-start text-left mt-4 lg:mt-0">
            <h2 className="font-heading font-extrabold text-[36px] md:text-[48px] leading-[1.1] tracking-tight text-white mb-4">
              {currentData.title}
            </h2>
            <p className="text-white/90 text-[15px] md:text-[16px] leading-relaxed font-sans max-w-md mb-8">
              {currentData.description}
            </p>
            <Link 
              href={currentData.linkUrl} 
              className="inline-flex items-center gap-2.5 text-white font-heading font-bold hover:underline select-none group"
            >
              <span>{currentData.linkText}</span>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-900 shadow-md group-hover:scale-110 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>

          {/* Right Column: Inner White Card preview */}
          <div className="w-full lg:w-[42%] flex justify-center lg:justify-end">
            <div className="w-full max-w-[310px] bg-white rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-100 flex flex-col transform hover:scale-[1.02] transition-transform duration-300">
              
              {/* Top Half: Image block with overlay navigation */}
              <div className="relative w-full h-[175px]">
                <Image
                  src={currentData.cardImage}
                  alt={currentData.title}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Carousel arrows at top right */}
                <div className="absolute top-3.5 right-3.5 flex gap-1 bg-white/95 backdrop-blur-sm p-1 rounded-lg shadow-md z-10 select-none">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveThemeIndex((activeThemeIndex - 1 + 4) % 4);
                    }}
                    className="p-1 hover:bg-slate-100 rounded text-slate-700 transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveThemeIndex((activeThemeIndex + 1) % 4);
                    }}
                    className="p-1 hover:bg-slate-100 rounded text-slate-700 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Half: White Details */}
              <div className="p-5 flex flex-col text-left flex-grow justify-between min-h-[130px]">
                <div>
                  <span className="text-slate-400 font-heading font-extrabold text-[11px] tracking-wider block mb-1.5 uppercase select-none">
                    {currentData.cardCategory}
                  </span>
                  <h3 className="text-[#0f172a] font-heading font-bold text-[16px] md:text-[17px] leading-snug tracking-tight mb-1">
                    {currentData.cardHeading}
                  </h3>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function VisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1
        }
      });

      // Phase 1: Expand Card to Fullscreen
      tl.fromTo(cardRef.current,
        {
          width: "90%",
          maxWidth: "1280px",
          height: "80vh",
          borderRadius: "48px"
        },
        {
          width: "100%",
          maxWidth: "100%",
          height: "100vh",
          borderRadius: "0px",
          ease: "none",
          duration: 0.6
        },
        0
      );

      // Phase 1.5: Fade in absolute corner cards as card grows
      tl.fromTo(".floating-card-fade",
        {
          opacity: 0,
          scale: 0.85
        },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          ease: "power2.out",
          duration: 0.3
        },
        0.2
      );

      // Phase 2: Disperse corner cards (left ones go left, right ones go right)
      tl.to(".floating-card-left", { x: -350, opacity: 0, scale: 0.9, duration: 0.4, ease: "power2.in" }, 0.6);
      tl.to(".floating-card-right", { x: 350, opacity: 0, scale: 0.9, duration: 0.4, ease: "power2.in" }, 0.6);

      // Phase 3: Fade out central text
      tl.to(".vision-text", { opacity: 0, y: -40, scale: 0.95, duration: 0.4, ease: "power2.inOut" }, 1.0);

      // Phase 4: Empty wait to allow BentoGridSection to scroll up
      tl.to({}, { duration: 1.0 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative min-h-screen flex items-center justify-center overflow-visible z-20">
      <div 
        ref={cardRef}
        className="w-full max-w-7xl rounded-[48px] relative shadow-[0_20px_50px_rgba(0,0,0,0.15)] px-6 py-20 lg:py-0 border border-zinc-800 overflow-hidden flex flex-col items-center justify-center"
        style={{
          background: "radial-gradient(circle at center, #022359 0%, #030e26 100%)"
        }}
      >
        {/* Ambient background particles/glow */}
        <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        {/* Starry particles */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => {
            const top = `${(i * 13) % 90}%`;
            const left = `${(i * 17) % 90}%`;
            const size = `${1.5 + (i % 2)}px`;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  top,
                  left,
                  width: size,
                  height: size,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${3 + (i % 3)}s`
                }}
              />
            );
          })}
        </div>

        {/* Central Text */}
        <div className="text-center z-10 max-w-4xl px-4 my-12 lg:my-0 select-none vision-text">
          <h2 className="font-heading font-extrabold text-[32px] md:text-[54px] tracking-tight leading-[1.1] text-white">
            Um estúdio de videojogos <br />
            deve elevar <span className="opacity-35">experiências. Com</span> <br />
            rigor técnico <span className="opacity-35">e paixão real.</span>
          </h2>
        </div>

        {/* Floating Cards - Desktop Layout (lg:block) */}
        {/* Card 1: Top Left */}
        <div className="hidden lg:block absolute top-12 left-10 xl:left-16 max-w-[310px] bg-white rounded-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.2)] border border-slate-100 rotate-[-3deg] hover:rotate-0 hover:scale-105 transition-all duration-300 group z-20 text-left floating-card-fade floating-card-left">
          {/* Badge Icon Top Right */}
          <div className="absolute -top-4 -right-4 w-10 h-10 rounded-xl bg-blue-600 border-2 border-white flex items-center justify-center shadow-md">
            <span className="w-4 h-1 bg-white rounded-full"></span>
          </div>
          <h3 className="text-slate-900 font-heading font-bold text-[16px] leading-snug">
            Estrutura Full Stack e Desenvolvimento
          </h3>
          <p className="text-slate-400 text-[13px] mt-2 font-sans leading-normal font-medium">
            Desde a criação de arte e código, até à gestão de comunidade, lore e suporte técnico.
          </p>
        </div>

        {/* Card 2: Top Right */}
        <div className="hidden lg:block absolute top-16 right-10 xl:right-16 max-w-[310px] bg-white rounded-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.2)] border border-slate-100 rotate-[3deg] hover:rotate-0 hover:scale-105 transition-all duration-300 group z-20 text-left floating-card-fade floating-card-right">
          {/* Badge Icon Bottom Right */}
          <div className="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg select-none">🎮</span>
          </div>
          <h3 className="text-slate-900 font-heading font-bold text-[16px] leading-snug">
            Projetos Internos & Engine Proprietária
          </h3>
          <p className="text-slate-400 text-[13px] mt-2 font-sans leading-normal font-medium">
            INNERfx e INNERCircle trazem experiências de comunidade robustas, estáveis e escaláveis.
          </p>
        </div>

        {/* Card 3: Bottom Left */}
        <div className="hidden lg:block absolute bottom-12 left-10 xl:left-14 max-w-[310px] bg-white rounded-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.2)] border border-slate-100 rotate-[-2deg] hover:rotate-0 hover:scale-105 transition-all duration-300 group z-20 text-left floating-card-fade floating-card-left">
          {/* Badge Icon Top Right */}
          <div className="absolute -top-4 -right-4 w-10 h-10 rounded-xl bg-cyan-500 border-2 border-white flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
          <h3 className="text-slate-900 font-heading font-bold text-[16px] leading-snug">
            Esports e Presença Competitiva
          </h3>
          <p className="text-slate-400 text-[13px] mt-2 font-sans leading-normal font-medium">
            Colocando Portugal no mapa da competição de alto nível com Rainbow Six Siege e mais.
          </p>
        </div>

        {/* Card 4: Bottom Right */}
        <div className="hidden lg:block absolute bottom-16 right-10 xl:right-16 max-w-[310px] bg-white rounded-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.2)] border border-slate-100 rotate-[2deg] hover:rotate-0 hover:scale-105 transition-all duration-300 group z-20 text-left floating-card-fade floating-card-right">
          {/* Badge Icon Bottom Right */}
          <div className="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-violet-600 border-2 border-white flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-slate-900 font-heading font-bold text-[16px] leading-snug">
            Consultoria e Software sob Medida
          </h3>
          <p className="text-slate-400 text-[13px] mt-2 font-sans leading-normal font-medium">
            Partilhamos a nossa experiência real em infraestrutura, DevOps, UI/UX e marketing de comunidade.
          </p>
        </div>

        {/* Mobile/Tablet Grid Layout (lg:hidden) */}
        <div className="lg:hidden w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-4 z-10 mt-6 text-left pb-12">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 relative">
            <div className="absolute -top-3 right-4 w-8 h-8 rounded-lg bg-blue-600 border-2 border-white flex items-center justify-center shadow-sm">
              <span className="w-3.5 h-0.75 bg-white rounded-full"></span>
            </div>
            <h3 className="text-slate-900 font-heading font-bold text-[15px] leading-snug pr-6">
              Estrutura Full Stack e Desenvolvimento
            </h3>
            <p className="text-slate-400 text-[12px] mt-2 font-sans font-medium">
              Desde a criação de arte e código, até à gestão de comunidade, lore e suporte técnico.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 relative">
            <div className="absolute -top-3 right-4 w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-md select-none">🎮</span>
            </div>
            <h3 className="text-slate-900 font-heading font-bold text-[15px] leading-snug pr-6">
              Projetos Internos & Engine Proprietária
            </h3>
            <p className="text-slate-400 text-[12px] mt-2 font-sans font-medium">
              INNERfx e INNERCircle trazem experiências de comunidade robustas, estáveis e escaláveis.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 relative">
            <div className="absolute -top-3 right-4 w-8 h-8 rounded-lg bg-cyan-500 border-2 border-white flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <h3 className="text-slate-900 font-heading font-bold text-[15px] leading-snug pr-6">
              Esports e Presença Competitiva
            </h3>
            <p className="text-slate-400 text-[12px] mt-2 font-sans font-medium">
              Colocando Portugal no mapa da competição de alto nível com Rainbow Six Siege e mais.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 relative">
            <div className="absolute -top-3 right-4 w-8 h-8 rounded-full bg-violet-600 border-2 border-white flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-slate-900 font-heading font-bold text-[15px] leading-snug pr-6">
              Consultoria e Software sob Medida
            </h3>
            <p className="text-slate-400 text-[12px] mt-2 font-sans font-medium">
              Partilhamos a nossa experiência real em infraestrutura, DevOps, UI/UX e marketing de comunidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SponsorSection() {
  const [interest, setInterest] = useState<string>("none");

  useEffect(() => {
    setInterest(getPredominantInterest());
  }, []);

  const steam = (
    <div key="steam" className="flex items-center gap-2 hover:opacity-100 transition-opacity duration-300">
      <svg className="w-8 h-8 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.463 0-11.7 5.237-11.7 11.7 0 5.434 3.702 10.003 8.704 11.332l-1.92-2.738c-.287-.41-.303-.946-.041-1.371l1.795-2.915a3.192 3.192 0 0 1-1.341-2.576c0-1.765 1.43-3.195 3.196-3.195.45 0 .878.093 1.27.262l2.673-3.856c.211-.303.567-.46.924-.417.357.042.668.272.793.606l1.642 4.394a3.187 3.187 0 0 1 1.706.779l4.475-1.9c.414-.176.892-.008 1.118.39l.067.12a11.666 11.666 0 0 1-13.627.502zm.127 15.632a1.69 1.69 0 1 0 0-3.38 1.69 1.69 0 0 0 0 3.38z"/>
      </svg>
      <span className="font-sans font-black text-slate-800 text-[18px] tracking-[0.1em] uppercase">Steam</span>
    </div>
  );

  const epic = (
    <div key="epic" className="flex items-center gap-2 hover:opacity-100 transition-opacity duration-300">
      <svg className="w-8 h-8 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0L2.4 3v13.5c0 5.8 4.1 8.1 9.6 8.5 5.5-.4 9.6-2.7 9.6-8.5V3L12 0zm5.6 15.5l-2.4 1.2V15h-6.4v1.7l-2.4-1.2v-7l2.4-1.2v-7z6.4v-1.7l2.4 1.2v7z" className="opacity-0" />
        <path d="M12 0L2.4 3v13.5c0 5.8 4.1 8.1 9.6 8.5 5.5-.4 9.6-2.7 9.6-8.5V3L12 0zm5.6 15.5l-2.4 1.2V15h-6.4v1.7l-2.4-1.2v-7l2.4-1.2V9h6.4v-1.7l2.4 1.2v7z"/>
      </svg>
      <span className="font-heading font-black text-slate-800 text-[16px] tracking-tight uppercase">Epic Games</span>
    </div>
  );

  const playstation = (
    <div key="playstation" className="flex items-center hover:opacity-100 transition-opacity duration-300">
      <svg className="w-9 h-7 text-slate-700" fill="currentColor" viewBox="0 0 24 20">
        <path d="M12 3.5c-4.2 0-7.6 1.8-7.6 4.1 0 1.8 2.1 3.3 5 3.9V9.2c-1.3-.4-2.1-1.1-2.1-1.9 0-1.3 1.9-2.3 4.2-2.3s4.2 1 4.2 2.3c0 .8-.8 1.5-2.1 1.9v2.3c2.9-.6 5-2.1 5-3.9 0-2.3-3.4-4.1-7.6-4.1zm-.8 5.6v6.6c0 .7.4 1.2.9 1.2s.9-.5.9-1.2V9.1c0-.7-.4-1.2-.9-1.2s-.9.5-.9 1.2z"/>
      </svg>
      <span className="font-sans font-bold text-slate-800 text-[18px] tracking-[0.15em] uppercase pl-1">PS</span>
    </div>
  );

  const stake = (
    <div key="stake" className="flex items-center hover:opacity-100 transition-opacity duration-300">
      <span className="font-heading font-black text-slate-700 text-[26px] tracking-tight italic select-none">Stake</span>
    </div>
  );

  const twitch = (
    <div key="twitch" className="flex items-center gap-1.5 hover:opacity-100 transition-opacity duration-300">
      <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
      </svg>
      <span className="font-heading font-extrabold text-slate-800 text-[20px] tracking-tight">twitch</span>
    </div>
  );

  const kick = (
    <div key="kick" className="flex items-center hover:opacity-100 transition-opacity duration-300">
      <span className="font-sans font-black text-slate-800 text-[24px] tracking-tighter italic select-none">KICK</span>
    </div>
  );

  // Re-order sponsors: consulting focus puts professional publishers first, gaming focus puts streaming/media channels first
  let orderedSponsors = [steam, epic, playstation, stake, twitch, kick];
  if (interest === "consulting") {
    orderedSponsors = [playstation, epic, steam, twitch, stake, kick];
  } else if (interest === "esports" || interest === "gaming") {
    orderedSponsors = [twitch, kick, steam, epic, playstation, stake];
  }

  return (
    <section className="w-full bg-white py-16 border-b border-slate-100 flex flex-col items-center justify-center select-none overflow-hidden">
      <span className="text-[11px] font-heading font-extrabold text-slate-400 tracking-[0.15em] uppercase mb-8">
        Trusted by 10,000+ businesses including:
      </span>
      <div className="w-full max-w-7xl px-6 md:px-10 flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-24 opacity-60">
        {orderedSponsors}
      </div>
    </section>
  );
}

function BentoGridSection() {
  const [interest, setInterest] = useState<string>("none");

  useEffect(() => {
    setInterest(getPredominantInterest());
  }, []);

  // Define components for Bento Grid
  const cardINNERfx = (
    <div key="innerfx" className="lg:col-span-2 bg-[#f0f5ff] rounded-[32px] border border-[#dbeafe]/40 p-8 lg:p-10 flex flex-col md:flex-row justify-between items-stretch overflow-hidden relative min-h-[340px] group hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col justify-between max-w-md z-10 text-left">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-heading font-extrabold text-[12px] tracking-wider uppercase mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1h8V6a4 4 0 00-4-4zm3 3H7v1h6V5zm-8 3a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2H5zm3.75 3a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z" clipRule="evenodd" />
            </svg>
            <span>A Engine</span>
          </div>
          <h3 className="text-[#0f172a] font-heading font-extrabold text-2xl lg:text-3xl tracking-tight leading-tight mb-3">
            INNERfx — Plataforma modular de criação
          </h3>
          <p className="text-slate-500 text-[14px] lg:text-[15px] font-sans leading-relaxed">
            Desenvolvemos uma engine proprietária de alta performance e escalabilidade para gestão de servidores GTA V (FiveM).
          </p>
        </div>
        <a href="https://innerfx.sbs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-800 font-heading font-bold text-[14px] mt-8 hover:underline">
          <span>Saber mais sobre a engine</span>
          <span>→</span>
        </a>
      </div>
      
      <div className="relative w-full md:w-[260px] h-[260px] md:h-auto flex items-center justify-center mt-6 md:mt-0">
        <div className="absolute w-[280px] h-[280px] rounded-full border border-blue-200/50 bg-blue-100/10 scale-90"></div>
        <div className="absolute w-[360px] h-[360px] rounded-full border border-blue-100/30 scale-75"></div>
        
        <div className="relative w-[160px] h-[250px] bg-slate-900 rounded-[28px] border-4 border-slate-800 p-2 shadow-2xl overflow-hidden flex flex-col justify-start">
          <div className="w-16 h-3 bg-slate-800 rounded-full mx-auto mb-2"></div>
          <div className="text-center font-heading font-black text-[12px] text-blue-600 mb-2">inner</div>
          
          <div className="flex flex-col gap-1.5 w-full text-left">
            <div className="bg-white rounded-lg p-1.5 flex items-center justify-between border border-slate-100 shadow-sm">
              <span className="text-[9px] font-bold text-slate-700">Plugins</span>
              <span className="text-[8px] bg-blue-50 text-blue-600 px-1 rounded font-medium">Modular</span>
            </div>
            <div className="bg-white rounded-lg p-1.5 flex items-center justify-between border border-slate-100 shadow-sm">
              <span className="text-[9px] font-bold text-slate-700">Performance</span>
              <span className="text-[8px] bg-indigo-50 text-indigo-600 px-1 rounded font-medium">Latência Mínima</span>
            </div>
            <div className="bg-white rounded-lg p-1.5 flex items-center justify-between border border-slate-100 shadow-sm">
              <span className="text-[9px] font-bold text-slate-700">Dev Tools</span>
              <span className="text-[8px] bg-purple-50 text-purple-600 px-1 rounded font-medium">APIs & Debug</span>
            </div>
            <div className="bg-white rounded-lg p-1.5 flex items-center justify-between border border-slate-100 shadow-sm">
              <span className="text-[9px] font-bold text-slate-700">Hosting</span>
              <span className="text-[8px] bg-emerald-50 text-emerald-600 px-1 rounded font-medium">Certificado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const cardINNERCircle = (
    <div key="innercircle" className="lg:col-span-1 lg:row-span-2 bg-[#faf5ff] rounded-[32px] border border-[#f3e8ff]/40 p-8 flex flex-col justify-between overflow-hidden relative min-h-[480px] lg:min-h-full group hover:shadow-lg transition-all duration-300">
      <div className="z-10 text-left">
        <div className="flex items-center gap-2 text-purple-600 font-heading font-extrabold text-[12px] tracking-wider uppercase mb-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>O Servidor</span>
        </div>
        <h3 className="text-[#0f172a] font-heading font-extrabold text-2xl tracking-tight leading-tight mb-3">
          INNERCircle — Servidor de Roleplay Flagship
        </h3>
        <p className="text-slate-500 text-[14px] lg:text-[15px] font-sans leading-relaxed">
          Uma experiência imersiva e justa de Roleplay construída sobre a engine INNERfx, com economia equilibrada e moderação altamente ativa.
        </p>
      </div>
      
      <div className="relative w-full h-[200px] flex items-end justify-center mt-6">
        <div className="absolute bottom-[-10px] w-[260px] h-[260px] rounded-full border border-purple-200/50 bg-purple-100/10"></div>
        <div className="absolute bottom-[-40px] w-[320px] h-[320px] rounded-full border border-purple-100/30"></div>
        
        <div className="absolute bottom-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100/50 flex items-center gap-4 w-[240px] z-10 transform group-hover:scale-105 transition-transform duration-300">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase">Beta Fechado</span>
            <span className="text-[14px] font-extrabold text-slate-900">Brevemente disponível</span>
          </div>
        </div>
      </div>
    </div>
  );

  const cardEsports = (
    <div key="esports" className="lg:col-span-1 lg:row-span-2 bg-[#ecfdf5] rounded-[32px] border border-[#d1fae5]/40 p-8 flex flex-col justify-between overflow-hidden relative min-h-[480px] lg:min-h-full group hover:shadow-lg transition-all duration-300">
      <div className="z-10 text-left">
        <div className="flex items-center gap-2 text-emerald-600 font-heading font-extrabold text-[12px] tracking-wider uppercase mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Esports Division</span>
        </div>
        <h3 className="text-[#0f172a] font-heading font-extrabold text-2xl tracking-tight leading-tight mb-3">
          Divisão Competitiva de Elite
        </h3>
        <p className="text-slate-500 text-[14px] lg:text-[15px] font-sans leading-relaxed">
          Staff técnico dedicado, coaching profissional e presença consolidada com equipa de Rainbow Six Siege.
        </p>
      </div>
      
      <div className="relative w-full h-[220px] flex items-center justify-center mt-6">
        <div className="absolute w-[220px] h-[220px] rounded-full bg-emerald-100/20 border border-emerald-200/40"></div>
        
        <div className="relative w-28 h-32 rounded-3xl bg-emerald-500 flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
          <div className="absolute inset-2.5 rounded-[18px] border-2 border-white/20 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  const cardConsulting = (
    <div key="consulting" className="lg:col-span-1 bg-[#f0fdfa] rounded-[32px] border border-[#ccfbf1]/40 p-8 flex flex-col justify-between overflow-hidden relative min-h-[220px] lg:min-h-0 group hover:shadow-lg transition-all duration-300">
      <div className="z-10 text-left">
        <div className="flex items-center gap-2 text-teal-600 font-heading font-extrabold text-[12px] tracking-wider uppercase mb-3">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <span>Consultoria</span>
        </div>
        <h3 className="text-[#0f172a] font-heading font-extrabold text-xl tracking-tight leading-tight mb-2">
          Expertise ao serviço dos clientes
        </h3>
        <p className="text-slate-500 text-[13px] font-sans leading-relaxed">
          Software dev, infraestrutura, DevOps, UI/UX e marketing de comunidade.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4 z-10">
        <span className="px-3 py-1.5 rounded-full bg-teal-100 text-teal-700 font-heading font-bold text-[10px] uppercase shadow-sm">Diagnóstico</span>
        <span className="px-3 py-1.5 rounded-full bg-teal-100 text-teal-700 font-heading font-bold text-[10px] uppercase shadow-sm">Scope Fechado</span>
        <span className="px-3 py-1.5 rounded-full bg-teal-100 text-teal-700 font-heading font-bold text-[10px] uppercase shadow-sm">Retainer</span>
      </div>
    </div>
  );

  const cardMonetization = (
    <div key="monetization" className="lg:col-span-2 bg-[#f8fafc] rounded-[32px] border border-slate-200/30 p-8 flex flex-col md:flex-row justify-between items-stretch overflow-hidden relative min-h-[220px] group hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col justify-between max-w-md z-10 text-left">
        <div>
          <div className="flex items-center gap-2 text-slate-600 font-heading font-extrabold text-[12px] tracking-wider uppercase mb-3">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span>Monetização e Negócios</span>
          </div>
          <h3 className="text-[#0f172a] font-heading font-extrabold text-xl lg:text-2xl tracking-tight leading-tight mb-2">
            Modelo de Negócio Diversificado e Resiliente
          </h3>
          <p className="text-slate-500 text-[13px] lg:text-[14px] font-sans leading-relaxed">
            Planos de subscrição mensal para servidores, sistema de upvotes, marketplaces de scripts/Tebex, tiers VIP e ad-serving inovador.
          </p>
        </div>
      </div>
      
      <div className="relative w-full md:w-[200px] h-[150px] md:h-auto flex items-center justify-center mt-4 md:mt-0 select-none">
        <div className="absolute w-[200px] h-[200px] rounded-full border border-slate-200 bg-slate-50/5 scale-90"></div>
        
        <div className="absolute top-2 left-6 bg-white border border-slate-100 p-1.5 rounded-full flex items-center gap-1 shadow-sm transform group-hover:-translate-y-1 transition-transform duration-300">
          <span className="text-[9px] font-bold text-slate-700 pr-1">Subscrições VIP</span>
        </div>
        <div className="absolute top-12 right-2 bg-white border border-slate-100 p-1.5 rounded-full flex items-center gap-1 shadow-sm transform group-hover:translate-x-1 transition-transform duration-300">
          <span className="text-[9px] font-bold text-slate-700 pr-1">Tebex</span>
        </div>
        <div className="absolute bottom-4 left-4 bg-white border border-slate-100 p-1.5 rounded-full flex items-center gap-1 shadow-sm transform group-hover:translate-y-1 transition-transform duration-300">
          <span className="text-[9px] font-bold text-slate-700 pr-1">Ad Serving</span>
        </div>
        <div className="absolute bottom-10 right-8 bg-white border border-slate-100 p-1.5 rounded-full flex items-center gap-1 shadow-sm transform group-hover:translate-x-0.5 transition-transform duration-300">
          <span className="text-[9px] font-bold text-slate-700 pr-1">Upvotes</span>
        </div>
      </div>
    </div>
  );

  // Dynamic layout ordering based on interest
  let orderedCards = [cardINNERfx, cardINNERCircle, cardEsports, cardConsulting, cardMonetization];

  if (interest === "consulting") {
    // Bring Consulting Card and Monetization to the front for B2B/Client visitors
    orderedCards = [cardConsulting, cardMonetization, cardINNERfx, cardINNERCircle, cardEsports];
  } else if (interest === "esports") {
    // Bring Esports card to the front
    orderedCards = [cardEsports, cardINNERfx, cardINNERCircle, cardConsulting, cardMonetization];
  } else if (interest === "careers") {
    // Bring INNERCircle and Esports to the front to emphasize team activity
    orderedCards = [cardINNERCircle, cardEsports, cardINNERfx, cardConsulting, cardMonetization];
  } else if (interest === "projects") {
    // Bring ENGINES (INNERfx) and Monetization to the front
    orderedCards = [cardINNERfx, cardMonetization, cardINNERCircle, cardConsulting, cardEsports];
  }

  return (
    <section className="px-6 md:px-10 xl:px-14 w-full flex flex-col items-center justify-start pb-14 mt-[200vh] relative z-30 bg-white pt-12 select-none">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {orderedCards}
      </div>
    </section>
  );
}

import { useFeatureFlagPayload, useActiveFeatureFlags } from "posthog-js/react";
import { getPredominantInterest } from "../utils/userProfile";

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!agreePrivacy) {
      setErrorMessage("Deverá aceitar a política de privacidade e de cookies para continuar.");
      return;
    }
    if (!turnstileToken) {
      setErrorMessage("Por favor, conclua a verificação de segurança.");
      return;
    }

    setVerifying(true);
    setErrorMessage(null);

    try {
      // 1. Verify Turnstile token server-side
      const verifyRes = await fetch("/api/verify-turnstile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: turnstileToken }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        setErrorMessage(verifyData.error || "A verificação de segurança falhou.");
        setVerifying(false);
        return;
      }

      // 2. Submit data to Ingestion API
      try {
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, tags: ["source-homepage"] }),
        });
        
        if (!res.ok) {
          console.warn("API subscription returned non-ok status:", res.status);
        }
      } catch (apiErr) {
        console.warn("API subscription request failed:", apiErr);
      }

      // 3. PostHog Tracking
      posthog.identify(email, {
        email: email,
        newsletter_subscriber: true
      });

      posthog.capture("newsletter_subscribed", {
        email: email,
        subscribed_at: new Date().toISOString()
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Ocorreu um erro inesperado. Por favor, tente novamente.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <section className="px-6 md:px-10 xl:px-14 w-full flex flex-col items-center justify-start pb-24 pt-12 bg-white relative z-30 select-none">
      <div 
        className="w-full max-w-5xl rounded-[36px] bg-slate-950 p-8 lg:p-16 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row justify-between items-center gap-10"
      >
        <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="text-left max-w-lg relative z-10">
          <span className="text-cyan-400 font-bold text-[11px] tracking-widest uppercase block mb-3">Newsletter</span>
          <h3 className="font-heading font-extrabold text-[28px] lg:text-[36px] leading-tight mb-4">
            Fique a par de tudo
          </h3>
          <p className="text-slate-300 text-[14px] lg:text-[15px] leading-relaxed">
            Subscreva a nossa newsletter e receba as últimas novidades sobre videojogos, plataformas web, assets de arte e oportunidades de carreira diretamente no seu email.
          </p>
        </div>

        <div className="w-full md:w-[420px] shrink-0 relative z-10">
          {submitted ? (
            <div className="bg-slate-900/50 border border-emerald-500/20 rounded-3xl p-8 text-center animate-profile-fade">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-heading font-bold text-lg text-white mb-2">Subscrição efetuada!</h4>
              <p className="text-slate-400 text-sm">Obrigado por se juntar à INNER Studios. A partir de agora receberá todas as novidades no seu email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="O seu endereço de e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow h-14 bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/10 rounded-2xl px-5 text-white placeholder:text-slate-400 font-medium outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={verifying || !turnstileToken || !agreePrivacy}
                  className="h-14 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 px-6 font-heading font-bold rounded-2xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2 group"
                >
                  {verifying ? "A verificar..." : (
                    <>
                      <span>Subscrever</span>
                      <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Turnstile Verification Widget */}
              <div className="scale-90 origin-left">
                <Turnstile onVerify={(token) => setTurnstileToken(token)} />
              </div>

              {errorMessage && (
                <div className="text-red-400 text-xs font-semibold mt-1">
                  {errorMessage}
                </div>
              )}

              <Checkbox
                id="newsletter-privacy-checkbox"
                checked={agreePrivacy}
                onChange={setAgreePrivacy}
                required
                variant="blue"
                label={
                  <span className="text-slate-400 select-none text-[11px]">
                    Li e aceito a{" "}
                    <Link href="/privacy" target="_blank" className="underline hover:text-white transition-colors">
                      Política de Privacidade
                    </Link>{" "}
                    e a{" "}
                    <Link href="/cookie-policy" target="_blank" className="underline hover:text-white transition-colors">
                      Política de Cookies
                    </Link>{" "}
                    da INNER Studios.
                  </span>
                }
              />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function LandingHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  // mobileMenuOpen moved to global Navbar
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedWord1, setDisplayedWord1] = useState("software");
  const [displayedWord2, setDisplayedWord2] = useState("Gaming");

  // Force initial slide adaptation based on calculated predominant interest
  useEffect(() => {
    const interest = getPredominantInterest();
    if (interest === "esports") {
      setActiveThemeIndex(1); // Slide 1: software / Esports
      setDisplayedWord1(THEMES[1].word1);
      setDisplayedWord2(THEMES[1].word2);
    } else if (interest === "careers" || interest === "about") {
      setActiveThemeIndex(2); // Slide 2: software / Creators (Team / Company culture focused)
      setDisplayedWord1(THEMES[2].word1);
      setDisplayedWord2(THEMES[2].word2);
    } else if (interest === "gaming") {
      setActiveThemeIndex(0); // Slide 0: software / Gaming
      setDisplayedWord1(THEMES[0].word1);
      setDisplayedWord2(THEMES[0].word2);
    } else if (interest === "projects") {
      setActiveThemeIndex(3); // Slide 3: assets / Gaming (Portfolio/Assets focus)
      setDisplayedWord1(THEMES[3].word1);
      setDisplayedWord2(THEMES[3].word2);
    }
  }, []);


  // Get active hero personalization details from PostHog multivariate payload
  const posthogPayload = useFeatureFlagPayload("homepage-hero") as PersonalizationPayload || {};
  const personalization: PersonalizationPayload = {
    badge: posthogPayload.badge || undefined,
    description: posthogPayload.description || undefined,
    cta_primary: posthogPayload.cta_primary || undefined,
    cta_secondary: posthogPayload.cta_secondary || undefined
  };


  // Function to run exit animation before switching theme index
  const switchThemeWithAnimation = (targetIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveThemeIndex(targetIndex);
        setIsTransitioning(false);
      }
    });

    // Exit animations (flying out of corners) taking exactly 1.35s (10% faster than 1.5s entry)
    tl.to(".corner-up-left", { x: -200, y: -200, opacity: 0, duration: 1.35, ease: "power2.in" }, 0);
    tl.to(".corner-up-right", { x: 200, y: -200, opacity: 0, duration: 1.35, ease: "power2.in" }, 0);
    tl.to(".corner-down-left", { x: -250, y: 250, opacity: 0, duration: 1.35, ease: "power2.in" }, 0);
    tl.to(".corner-down-right", { x: 250, y: 250, opacity: 0, duration: 1.35, ease: "power2.in" }, 0);
  };

  // Mount animation for text content
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-animate", 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Corner images entrance animations on theme switch (runs after exit completes and index changes)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".corner-up-left", 
        { x: -200, y: -200, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 1.5, ease: "back.out(1.2)" },
        0
      );
      tl.fromTo(".corner-up-right", 
        { x: 200, y: -200, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 1.5, ease: "back.out(1.2)" },
        0
      );
      tl.fromTo(".corner-down-left", 
        { x: -250, y: 250, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 1.5, ease: "back.out(1.2)" },
        0
      );
      tl.fromTo(".corner-down-right", 
        { x: 250, y: 250, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 1.5, ease: "back.out(1.2)" },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeThemeIndex]);

  // Sliding text switcher animation on theme changes
  useEffect(() => {
    // Skip on initial mount
    if (activeThemeIndex === 0 && displayedWord1 === "software" && displayedWord2 === "Gaming") {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // 1. Slide up and fade out current words (using yPercent for size independence)
      tl.to(".title-animate-word", {
        yPercent: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          // 2. Set new text state in the middle
          setDisplayedWord1(THEMES[activeThemeIndex].word1);
          setDisplayedWord2(THEMES[activeThemeIndex].word2);
        }
      });

      // 3. Reset position to below, then slide up and fade in the new words
      tl.fromTo(".title-animate-word",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeThemeIndex]);

  // Countdown timer logic
  useEffect(() => {
    if (isTransitioning) return;
    setProgress(0);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / 3000) * 100, 100);
      setProgress(pct);
      if (elapsed >= 3000) {
        clearInterval(interval);
        switchThemeWithAnimation((activeThemeIndex + 1) % 4);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [activeThemeIndex, isTransitioning]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white text-[#0f172a] flex flex-col font-sans selection:bg-cyan-100 selection:text-cyan-600 overflow-x-clip"
    >
      <Navbar />
      <HeroSection 
        activeThemeIndex={activeThemeIndex} 
        progress={progress} 
        setActiveThemeIndex={switchThemeWithAnimation} 
        displayedWord1={displayedWord1}
        displayedWord2={displayedWord2}
        personalization={personalization}
      />
      <SponsorSection />
      <FeatureSection activeThemeIndex={activeThemeIndex} setActiveThemeIndex={switchThemeWithAnimation} progress={progress} />
      <VisionSection />
      <BentoGridSection />
      <TeamSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
