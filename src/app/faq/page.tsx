"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X, Search, PlayCircle, FileCheck, LayoutGrid, List, ArrowRightLeft, CreditCard } from "lucide-react";

import Navbar from "../../components/Navbar";

const CATEGORIES = [
  {
    id: 1,
    title: "Getting Started",
    articles: 5,
    icon: PlayCircle,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Verification",
    articles: 5,
    icon: FileCheck,
    color: "bg-fuchsia-100 text-fuchsia-600",
  },
  {
    id: 3,
    title: "Integration",
    articles: 5,
    icon: LayoutGrid,
    color: "bg-teal-100 text-teal-600",
  },
  {
    id: 4,
    title: "Payment methods",
    articles: 5,
    icon: List,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 5,
    title: "Transactions",
    articles: 5,
    icon: ArrowRightLeft,
    color: "bg-blue-600 text-white", // Solid background based on reference image
  },
  {
    id: 6,
    title: "Refunds and chargebacks",
    articles: 5,
    icon: CreditCard,
    color: "bg-purple-100 text-purple-600",
  }
];

export default function FAQPage() {
  // Navbar handles mobile state

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans flex flex-col items-center">
      <Navbar />
      
      <main className="w-full max-w-[1400px] px-4 md:px-6 lg:px-8 mt-4 md:mt-8 pb-20">
        
        {/* Blue Hero Section */}
        <div className="relative w-full rounded-[40px] md:rounded-[60px] overflow-visible pb-16 flex flex-col items-center pt-24"
             style={{ background: "radial-gradient(circle at top, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)" }}>
          
          {/* Noise/Particles background overlay */}
          <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none rounded-[40px] md:rounded-[60px]"></div>
          
          {/* FAQ Pill */}
          <div className="relative z-10 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[12px] font-bold tracking-widest uppercase mb-10 shadow-sm">
            FAQ
          </div>

          {/* Title */}
          <h1 className="hero-animate font-heading font-black text-white tracking-tight text-center max-w-4xl flex flex-col items-center">
            <span 
              className="tracking-[-1.5px] font-black block text-white text-center"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.75rem)",
                lineHeight: "1.05"
              }}
            >
              Answers <br />
              to common
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
                Questions
              </span>
            </span>
          </h1>

          {/* Search Bar layered container */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-20">
            <div className="relative w-full group">
              {/* Layered shadows */}
              <div className="absolute -inset-4 bg-slate-400/20 rounded-[40px] blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="absolute -inset-3 bg-blue-500/20 rounded-full blur-md"></div>
              <div className="absolute -inset-2 bg-blue-400/30 rounded-full"></div>
              
              {/* Actual Search Input */}
              <div className="relative bg-white h-[72px] rounded-full flex items-center px-6 shadow-lg border border-white/50">
                <Search className="size-6 text-slate-400 mr-4 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search topics..."
                  className="w-full h-full bg-transparent outline-none text-slate-700 text-lg font-medium placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="w-full max-w-5xl mx-auto mt-28 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link 
              href="#" 
              key={cat.id}
              className="bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${cat.color} relative overflow-hidden`}>
                {/* Soft gradient blob behind icon */}
                <div className="absolute inset-0 bg-white/20 blur-md rounded-full scale-150 transform -translate-y-1/2 opacity-50"></div>
                <cat.icon className="size-6 relative z-10" />
              </div>
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-heading font-extrabold text-[18px] text-slate-900">
                    {cat.title}
                  </h3>
                  <span className="text-blue-500 font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    →
                  </span>
                </div>
                <p className="text-slate-400 text-[14px] font-medium">
                  {cat.articles} Articles
                </p>
              </div>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
}
