"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X, Search } from "lucide-react";

import Navbar from "../../components/Navbar";

export default function BlogPage() {
  // Navbar handles mobile state

  const categories = [
    { name: "Recent", count: 4 },
    { name: "Business", count: 8 },
    { name: "Industry insights", count: 6 },
    { name: "Regulations", count: 5 },
    { name: "Fraud", count: 11 }
  ];

  return (
    <div className="min-h-screen bg-white text-[#0f172a] font-sans pb-32">
      <Navbar />
      
      <main className="w-full max-w-6xl mx-auto px-6 mt-20">
        
        {/* Title Section */}
        <div className="flex items-end gap-6 mb-1 border-b border-slate-100 pb-2">
          <div className="relative cursor-pointer">
            <h1 className="font-heading font-black text-[56px] md:text-[68px] text-[#0f172a] tracking-tight leading-none flex items-start">
              Blogs 
              <span className="flex items-center justify-center bg-blue-50 text-blue-600 text-[12px] font-extrabold w-7 h-7 rounded-full ml-1 -mt-1">
                40
              </span>
            </h1>
            {/* Active underline */}
            <div className="absolute -bottom-[9px] left-1 w-[40px] h-1.5 bg-blue-500 rounded-t-md"></div>
          </div>
          
          <div className="relative cursor-pointer opacity-40 hover:opacity-100 transition-opacity duration-300">
            <h1 className="font-heading font-semibold text-[44px] md:text-[52px] text-slate-500 tracking-tight leading-none flex items-start pb-1">
              News
              <span className="text-[14px] font-bold ml-1 mt-1">
                12
              </span>
            </h1>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-slate-100 mb-12 gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">
              Categories
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {categories.map((cat) => (
                <button 
                  key={cat.name} 
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl text-slate-700 text-[13px] font-semibold border border-slate-100"
                >
                  {cat.name} <span className="text-slate-400 font-medium">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
          <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors shrink-0">
            <Search className="size-4" />
          </button>
        </div>

        {/* Featured Article */}
        <Link href="#" className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center group">
          
          {/* Left: Image Card */}
          <div className="w-full lg:w-[60%] aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] rounded-[32px] md:rounded-[40px] relative overflow-hidden flex items-center justify-center bg-blue-600 group-hover:shadow-[0_20px_50px_rgba(37,99,235,0.2)] transition-shadow duration-500">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0038ff] to-[#0066ff]"></div>
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
            
            {/* We'll use the feature_preview image as a placeholder for the phone composition */}
            <Image 
              src="/images/feature_preview.png" 
              alt="How the UK pays" 
              fill 
              className="object-cover z-10 group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            {/* Fallback glow if image fails or is transparent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400 blur-[80px] rounded-full opacity-50"></div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-[40%] flex flex-col items-start text-left lg:py-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-500 text-[10px] font-extrabold tracking-widest uppercase">
                Recent
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-500 text-[10px] font-extrabold tracking-widest uppercase">
                Business
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-[32px] lg:text-[40px] text-[#0f172a] leading-[1.15] tracking-tight mb-8 group-hover:text-blue-600 transition-colors duration-300">
              How the UK pays: <br />
              A merchant's guide to the evolving payment landscape
            </h2>
            
            {/* Push meta info to bottom or leave it after margin */}
            <div className="flex items-center gap-3 text-slate-400 text-[13px] font-medium mt-auto lg:mt-24">
              <span>5 min read</span>
              <span>•</span>
              <span>10 Jun, 25'</span>
            </div>
          </div>

        </Link>

      </main>
    </div>
  );
}
