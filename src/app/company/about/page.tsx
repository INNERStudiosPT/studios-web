"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "../../../components/Navbar";

const TIMELINE_DATA = [
  {
    id: 1,
    year: "2016",
    date: "JAN, 2016",
    title: "Fundação",
    desc: "Nasce a stratacoms, com a missão de ajudar marcas a comunicar de forma mais próxima, criativa e consistente.",
    type: "text"
  },
  {
    id: 2,
    year: "2018",
    date: "FEV, 2018",
    title: "Primeiras grandes marcas",
    desc: "Começámos a gerir as redes sociais e o conteúdo de marcas nacionais em vários setores de atividade.",
    type: "text"
  },
  {
    id: 3,
    year: "2018",
    type: "image"
  },
  {
    id: 4,
    year: "2018",
    date: "DEZ, 2018",
    title: "Estúdio de Conteúdo",
    desc: "Montámos um estúdio próprio de vídeo e fotografia para produzir conteúdo de raiz, pensado para as redes.",
    type: "text"
  },
  {
    id: 5,
    year: "2021",
    date: "MAR, 2021",
    title: "Equipa a crescer",
    desc: "A equipa expande-se em criação de conteúdo, community management e estratégia de marca.",
    type: "text"
  },
  {
    id: 6,
    year: "2021",
    date: "NOV, 2021",
    title: "Foco na Comunidade",
    desc: "Reforçámos a área de community management, com moderação e engagement diários para os nossos clientes.",
    type: "text"
  },
  {
    id: 7,
    year: "2023",
    date: "JAN, 2023",
    title: "Agência full-service",
    desc: "Consolidámos a stratacoms como agência de comunicação completa: estratégia, conteúdo, redes e comunidade.",
    type: "text"
  }
];

export default function AboutPage() {
  // Navbar handles mobile state
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState("2018");

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    // Simple logic to find the most visible card and update activeYear
    const container = scrollContainerRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = 400; // approx width including gap
    const activeIndex = Math.round(scrollPosition / cardWidth);
    
    if (TIMELINE_DATA[activeIndex]) {
      setActiveYear(TIMELINE_DATA[activeIndex].year);
    }
  };

  // Get unique years for the timeline track
  const uniqueYears = Array.from(new Set(TIMELINE_DATA.map(item => item.year)));

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans">
      <Navbar />
      
      <main className="px-4 md:px-8 py-10 max-w-[1600px] mx-auto">
        <div className="bg-white rounded-[48px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden relative min-h-[80vh] flex flex-col">
          
          {/* Header Section */}
          <div className="px-10 lg:px-20 pt-20 pb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 font-bold text-[11px] tracking-widest uppercase mb-6">
                O nosso percurso
              </div>
              <h1 className="font-heading font-extrabold text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] tracking-tight">
                Fundada em 2016 <br />
                para marcas comunicarem melhor
              </h1>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button 
                onClick={scrollLeft}
                className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button 
                onClick={scrollRight}
                className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>

          {/* Cards Section */}
          <div className="relative w-full overflow-hidden flex-1 flex flex-col mt-4">
            
            {/* The Horizontal Scroller */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex items-center gap-6 overflow-x-auto snap-x snap-mandatory px-10 lg:px-20 pb-16 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {TIMELINE_DATA.map((item, idx) => {
                if (item.type === "image") {
                  return (
                    <div key={item.id} className="min-w-[380px] h-[340px] shrink-0 snap-center relative flex items-center justify-center">
                      {/* Photo 1 */}
                      <div className="absolute top-4 left-4 w-60 h-64 bg-slate-200 rounded-xl border-[8px] border-white shadow-xl rotate-[-8deg] overflow-hidden z-10 transition-transform hover:rotate-0 hover:z-30 hover:scale-105 duration-300">
                        <Image src="/images/feature_preview.png" alt="Team" fill className="object-cover" />
                      </div>
                      {/* Photo 2 */}
                      <div className="absolute bottom-4 right-4 w-60 h-64 bg-slate-300 rounded-xl border-[8px] border-white shadow-xl rotate-[6deg] overflow-hidden z-20 transition-transform hover:rotate-0 hover:z-30 hover:scale-105 duration-300">
                        <Image src="/images/team/team-placeholder.jpg" alt="Team meeting" fill className="object-cover bg-blue-100" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"></div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.id} className="min-w-[340px] max-w-[340px] shrink-0 snap-center">
                    {/* Dashed line connecting to track */}
                    <div className="h-10 border-l border-dashed border-slate-300 ml-8 mb-4"></div>
                    
                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)] h-[280px] flex flex-col justify-center">
                      <span className="text-slate-400 font-bold text-[11px] tracking-wider uppercase mb-5 block">
                        {item.date}
                      </span>
                      <h3 className="font-heading font-extrabold text-[22px] text-slate-900 mb-4 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-[14px] leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
              
              {/* Extra padding element at the end for scroll snapping */}
              <div className="min-w-[20vw] shrink-0 h-10"></div>
            </div>

            {/* Bottom Timeline Track */}
            <div className="relative w-full h-24 mt-auto mb-8 px-10 lg:px-20">
              <div className="absolute top-1/2 -translate-y-1/2 left-10 lg:left-20 right-10 lg:right-20 h-[2px] bg-slate-100 rounded-full">
                {/* Progress bar fill */}
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.max(0, (uniqueYears.indexOf(activeYear) / (uniqueYears.length - 1)) * 100)}%` 
                  }}
                ></div>
              </div>

              {/* Year Markers */}
              <div className="absolute top-1/2 -translate-y-1/2 left-10 lg:left-20 right-10 lg:right-20 flex justify-between items-center z-10 pointer-events-none">
                {uniqueYears.map((year, idx) => {
                  const isActive = uniqueYears.indexOf(year) <= uniqueYears.indexOf(activeYear);
                  return (
                    <div 
                      key={year} 
                      className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-colors duration-300 ${
                        isActive ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {year}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
