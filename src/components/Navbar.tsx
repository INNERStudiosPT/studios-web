"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X, Gamepad2, MonitorSmartphone, Share2, Box } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<"innerfx" | "innercircle">("innerfx");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`transition-all duration-300 z-50 sticky flex items-center justify-between ${
        scrolled 
          ? "top-4 mx-auto w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-7xl h-18 rounded-3xl bg-white border border-slate-100 shadow-[0_12px_30px_rgba(0,0,0,0.06)] px-6 md:px-10" 
          : "top-0 w-full h-20 bg-white border-b border-slate-50 px-6 md:px-10"
      }`}>
        <div className="flex items-center pl-4 md:pl-8">
          <Link href="/">
            <Image
              src="/images/logo/logo-dark.png"
              alt="inner studios"
              width={110}
              height={24}
              className="h-6 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-slate-600">
          {/* Products Dropdown */}
          <div className="relative flex items-center cursor-pointer group py-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full group-hover:bg-slate-100 transition-colors">
              <span className="text-slate-900 font-medium">Projects</span>
              <ChevronDown className="size-3 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </div>
            <div className="absolute top-[calc(100%-12px)] left-0 mt-1 w-[740px] bg-white border border-slate-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex">
              <div className="w-[350px] flex flex-col gap-2 p-2 shrink-0">
                <a 
                  href="https://innerfx.sbs" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`p-4 rounded-2xl transition-colors group/item block ${activeProject === "innerfx" ? "bg-[#f0f5ff]" : "hover:bg-slate-50"}`}
                  onMouseEnter={() => setActiveProject("innerfx")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-slate-900 font-heading font-bold text-[15px]">INNERfx</h4>
                    <span className="text-blue-500 font-bold group-hover/item:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Explore our advanced FX solutions and integrations.</p>
                </a>
                <a 
                  href="https://circle.innerstudios.pt" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`p-4 rounded-2xl transition-colors group/item block ${activeProject === "innercircle" ? "bg-emerald-50" : "hover:bg-slate-50"}`}
                  onMouseEnter={() => setActiveProject("innercircle")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-slate-900 font-heading font-bold text-[15px]">INNERCircle</h4>
                    <span className="text-emerald-500 font-bold group-hover/item:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Join our exclusive community of partners and creators.</p>
                </a>
              </div>
              <div className={`flex-1 rounded-2xl ml-2 overflow-hidden relative group/image flex items-center justify-center transition-colors duration-500 ${activeProject === "innerfx" ? "bg-blue-600" : "bg-emerald-600"}`}>
                <div className={`absolute transition-all duration-700 ease-in-out inset-0 ${activeProject === "innerfx" ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"}`}>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
                  <Image src="/images/feature_preview.png" alt="INNERfx overview" fill className="object-cover opacity-80 mix-blend-overlay" />
                </div>
                
                <div className={`absolute transition-all duration-700 ease-in-out inset-0 ${activeProject === "innercircle" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                  <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3"></div>
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-400/30 rounded-full blur-2xl translate-y-1/3 translate-x-1/4"></div>
                  <Image src="/images/team/team-placeholder.jpg" alt="INNERCircle overview" fill className="object-cover opacity-50 mix-blend-overlay grayscale" />
                </div>
              </div>
            </div>
          </div>

          {/* Solutions Dropdown */}
          <div className="relative flex items-center cursor-pointer group py-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full group-hover:bg-slate-100 transition-colors">
              <span className="text-slate-900 font-medium">Solutions</span>
              <ChevronDown className="size-3 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </div>
            <div className="absolute top-[calc(100%-12px)] left-1/2 -translate-x-1/2 mt-1 w-[900px] bg-white border border-slate-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex divide-x divide-slate-100">
              <Link href="/solutions/video-games" className="flex-1 p-5 rounded-2xl hover:bg-slate-50 transition-colors group/item block">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100/60 flex items-center justify-center mb-6">
                  <Gamepad2 className="size-6 text-cyan-600" />
                </div>
                <h4 className="text-slate-900 font-heading font-bold text-[16px] mb-2">Video Games</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Immersive worlds and multiplayer networks</p>
              </Link>
              <Link href="/solutions/web-platforms" className="flex-1 p-5 rounded-2xl hover:bg-slate-50 transition-colors group/item block">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100/60 flex items-center justify-center mb-6">
                  <MonitorSmartphone className="size-6 text-indigo-600" />
                </div>
                <h4 className="text-slate-900 font-heading font-bold text-[16px] mb-2">Web Platforms</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Enterprise SaaS and scalable applications</p>
              </Link>
              <Link href="/solutions/social-media" className="flex-1 p-5 rounded-2xl hover:bg-slate-50 transition-colors group/item block">
                <div className="w-12 h-12 rounded-2xl bg-rose-100/60 flex items-center justify-center mb-6">
                  <Share2 className="size-6 text-rose-600" />
                </div>
                <h4 className="text-slate-900 font-heading font-bold text-[16px] mb-2">Social Media</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Viral campaigns and brand strategies</p>
              </Link>
              <Link href="/solutions/assets" className="flex-1 p-5 rounded-2xl hover:bg-slate-50 transition-colors group/item block">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100/60 flex items-center justify-center mb-6">
                  <Box className="size-6 text-emerald-600" />
                </div>
                <h4 className="text-slate-900 font-heading font-bold text-[16px] mb-2">2D/3D Assets</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Bespoke models, illustrations, and art</p>
              </Link>
            </div>
          </div>

          {/* Esports Dropdown */}
          <div className="relative flex items-center gap-1.5 cursor-pointer hover:text-slate-900 transition-colors group py-6">
            <span>Esports</span>
            <ChevronDown className="size-3 text-slate-400 group-hover:text-slate-900 transition-colors" />
            <div className="absolute top-[calc(100%-12px)] left-1/2 -translate-x-1/2 mt-1 w-56 bg-white border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] py-2.5 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="flex flex-col gap-0.5">
                <Link href="/resources/esports/fivem" className="px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-2.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span>FiveM</span>
                </Link>
                <Link href="/resources/esports/rainbow-six-siege" className="px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-2.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  <span>Rainbow Six Siege</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Resources Dropdown */}
          <div className="relative flex items-center cursor-pointer group py-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full group-hover:bg-slate-100 transition-colors">
              <span className="text-slate-900 font-medium">Resources</span>
              <ChevronDown className="size-3 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </div>
            <div className="absolute top-[calc(100%-12px)] left-1/2 -translate-x-1/2 mt-1 w-[320px] bg-white border border-slate-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col">
              <Link href="/faq" className="p-4 rounded-2xl hover:bg-slate-50 transition-colors block">
                <h4 className="text-slate-900 font-heading font-bold text-[15px] mb-2">FAQ</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Answers to the most common questions</p>
              </Link>
              <div className="w-[calc(100%-2rem)] mx-auto h-px bg-slate-100 my-0.5"></div>
              <a href="https://docs.innerstudios.pt" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl hover:bg-slate-50 transition-colors block">
                <h4 className="text-slate-900 font-heading font-bold text-[15px] mb-2">Documentation</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Detailed guides and API references</p>
              </a>
            </div>
          </div>

          {/* Company Dropdown */}
          <div className="relative flex items-center cursor-pointer group py-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full group-hover:bg-slate-100 transition-colors">
              <span className="text-slate-900 font-medium">Company</span>
              <ChevronDown className="size-3 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </div>
            <div className="absolute top-[calc(100%-12px)] left-1/2 -translate-x-1/2 mt-1 w-[320px] bg-white border border-slate-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col">
              <Link href="/company/about" className="p-4 rounded-2xl hover:bg-slate-50 transition-colors block">
                <h4 className="text-slate-900 font-heading font-bold text-[15px] mb-2">About us</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Learn who we are, what we believe in, and why we're doing what we do</p>
              </Link>
              <div className="w-[calc(100%-2rem)] mx-auto h-px bg-slate-100 my-0.5"></div>
              <Link href="/company/careers" className="p-4 rounded-2xl hover:bg-slate-50 transition-colors block">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-slate-900 font-heading font-bold text-[15px]">Careers</h4>
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-[11px] font-bold">2</span>
                  </div>
                </div>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Junta-te à nossa equipa full stack e ajuda-nos a criar o futuro do gaming e tecnologia competitiva</p>
              </Link>
            </div>
          </div>

        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/contact" className="bg-[#0f172a] text-white py-3 px-6 rounded-lg text-[15px] font-semibold hover:bg-slate-800 transition-colors block">
            Contact us
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </header>

      {mobileMenuOpen && <MobileMenu />}
    </>
  );
}

function MobileMenu() {
  const [esportsOpen, setEsportsOpen] = useState(false);

  return (
    <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 px-6 py-8 flex flex-col gap-6 border-t border-slate-100 overflow-y-auto">
      <nav className="flex flex-col gap-4 text-lg font-medium text-slate-600">
        <div className="py-2 border-b border-slate-50 flex justify-between items-center">
          <span>Projects</span>
          <ChevronDown className="size-4" />
        </div>
        <div className="py-2 border-b border-slate-50 flex justify-between items-center">
          <span>Solutions</span>
          <ChevronDown className="size-4" />
        </div>
        <div>
          <div 
            onClick={() => setEsportsOpen(!esportsOpen)}
            className="py-2 border-b border-slate-50 flex justify-between items-center cursor-pointer select-none"
          >
            <span>Esports</span>
            <ChevronDown className={`size-4 transition-transform duration-200 ${esportsOpen ? "rotate-180" : ""}`} />
          </div>
          {esportsOpen && (
            <div className="pl-4 mt-2 flex flex-col gap-1 border-l border-slate-100">
              <Link href="/resources/esports/fivem" className="py-2 text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                <span>FiveM</span>
              </Link>
              <Link href="/resources/esports/rainbow-six-siege" className="py-2 text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>Rainbow Six Siege</span>
              </Link>
            </div>
          )}
        </div>
        <div>
          <div className="py-2 border-b border-slate-50 flex justify-between items-center">
            <span>Resources</span>
            <ChevronDown className="size-4" />
          </div>
          <div className="pl-4 mt-2 flex flex-col gap-1 border-l border-slate-100">
            <Link href="/faq" className="py-2 text-slate-600 hover:text-slate-900 transition-colors block font-medium">
              FAQ
            </Link>
            <a href="https://docs.innerstudios.pt" target="_blank" rel="noopener noreferrer" className="py-2 text-slate-600 hover:text-slate-900 transition-colors block font-medium">
              Documentation
            </a>
          </div>
        </div>
        <div className="py-2 border-b border-slate-50 flex justify-between items-center">
          <span>Company</span>
          <ChevronDown className="size-4" />
        </div>
      </nav>
      <div className="flex flex-col gap-4 mt-auto">
        <Link href="/contact" className="bg-[#0f172a] text-white py-4 text-center rounded-lg font-semibold block">
          Contact us
        </Link>
      </div>
    </div>
  );
}
