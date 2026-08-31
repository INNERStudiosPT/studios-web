"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Users, Compass, Share2, Film } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <Link href="/" aria-label="stratacoms">
            <Logo className="text-2xl text-slate-900" />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-slate-600">
          {/* Solutions Dropdown */}
          <div className="relative flex items-center cursor-pointer group py-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full group-hover:bg-slate-100 transition-colors">
              <span className="text-slate-900 font-medium">Serviços</span>
              <ChevronDown className="size-3 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </div>
            <div className="absolute top-[calc(100%-12px)] left-1/2 -translate-x-1/2 mt-1 w-[900px] bg-white border border-slate-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex divide-x divide-slate-100">
              <Link href="/solutions/social-media" className="flex-1 p-5 rounded-2xl hover:bg-slate-50 transition-colors group/item block">
                <div className="w-12 h-12 rounded-2xl bg-rose-100/60 flex items-center justify-center mb-6">
                  <Share2 className="size-6 text-rose-600" />
                </div>
                <h4 className="text-slate-900 font-heading font-bold text-[16px] mb-2">Gestão de Redes Sociais</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Presença consistente e crescimento orgânico</p>
              </Link>
              <Link href="/solutions/assets" className="flex-1 p-5 rounded-2xl hover:bg-slate-50 transition-colors group/item block">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100/60 flex items-center justify-center mb-6">
                  <Film className="size-6 text-emerald-600" />
                </div>
                <h4 className="text-slate-900 font-heading font-bold text-[16px] mb-2">Criação de Conteúdo</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Vídeo, fotografia, design e copywriting</p>
              </Link>
              <Link href="/solutions/video-games" className="flex-1 p-5 rounded-2xl hover:bg-slate-50 transition-colors group/item block">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100/60 flex items-center justify-center mb-6">
                  <Users className="size-6 text-cyan-600" />
                </div>
                <h4 className="text-slate-900 font-heading font-bold text-[16px] mb-2">Community Management</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Comunidades ativas e ligadas à marca</p>
              </Link>
              <Link href="/solutions/web-platforms" className="flex-1 p-5 rounded-2xl hover:bg-slate-50 transition-colors group/item block">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100/60 flex items-center justify-center mb-6">
                  <Compass className="size-6 text-indigo-600" />
                </div>
                <h4 className="text-slate-900 font-heading font-bold text-[16px] mb-2">Estratégia & Branding</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Posicionamento e identidade de marca</p>
              </Link>
            </div>
          </div>

          {/* Resources Dropdown */}
          <div className="relative flex items-center cursor-pointer group py-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full group-hover:bg-slate-100 transition-colors">
              <span className="text-slate-900 font-medium">Recursos</span>
              <ChevronDown className="size-3 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </div>
            <div className="absolute top-[calc(100%-12px)] left-1/2 -translate-x-1/2 mt-1 w-[320px] bg-white border border-slate-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col">
              <Link href="/faq" className="p-4 rounded-2xl hover:bg-slate-50 transition-colors block">
                <h4 className="text-slate-900 font-heading font-bold text-[15px] mb-2">FAQ</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Respostas às perguntas mais frequentes</p>
              </Link>
              <div className="w-[calc(100%-2rem)] mx-auto h-px bg-slate-100 my-0.5"></div>
              <a href="https://docs.stratacoms.pt" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl hover:bg-slate-50 transition-colors block">
                <h4 className="text-slate-900 font-heading font-bold text-[15px] mb-2">Documentação</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Guias detalhados e referências técnicas</p>
              </a>
            </div>
          </div>

          {/* Company Dropdown */}
          <div className="relative flex items-center cursor-pointer group py-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full group-hover:bg-slate-100 transition-colors">
              <span className="text-slate-900 font-medium">Empresa</span>
              <ChevronDown className="size-3 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </div>
            <div className="absolute top-[calc(100%-12px)] left-1/2 -translate-x-1/2 mt-1 w-[320px] bg-white border border-slate-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col">
              <Link href="/company/about" className="p-4 rounded-2xl hover:bg-slate-50 transition-colors block">
                <h4 className="text-slate-900 font-heading font-bold text-[15px] mb-2">Sobre nós</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Conheça quem somos, aquilo em que acreditamos e porque fazemos o que fazemos</p>
              </Link>
              <div className="w-[calc(100%-2rem)] mx-auto h-px bg-slate-100 my-0.5"></div>
              <Link href="/company/careers" className="p-4 rounded-2xl hover:bg-slate-50 transition-colors block">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-slate-900 font-heading font-bold text-[15px]">Carreiras</h4>
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-[11px] font-bold">2</span>
                  </div>
                </div>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">Junta-te à nossa equipa criativa e ajuda-nos a fazer marcas comunicar melhor nas redes sociais</p>
              </Link>
            </div>
          </div>

        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/contact" className="bg-[#0f172a] text-white py-3 px-6 rounded-lg text-[15px] font-semibold hover:bg-slate-800 transition-colors block">
            Contacte-nos
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
  return (
    <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 px-6 py-8 flex flex-col gap-6 border-t border-slate-100 overflow-y-auto">
      <nav className="flex flex-col gap-4 text-lg font-medium text-slate-600">
        <Link href="/solutions/social-media" className="py-2 border-b border-slate-50 flex justify-between items-center">
          <span>Gestão de Redes Sociais</span>
        </Link>
        <Link href="/solutions/assets" className="py-2 border-b border-slate-50 flex justify-between items-center">
          <span>Criação de Conteúdo</span>
        </Link>
        <Link href="/solutions/video-games" className="py-2 border-b border-slate-50 flex justify-between items-center">
          <span>Community Management</span>
        </Link>
        <Link href="/solutions/web-platforms" className="py-2 border-b border-slate-50 flex justify-between items-center">
          <span>Estratégia & Branding</span>
        </Link>
        <div>
          <div className="py-2 border-b border-slate-50 flex justify-between items-center">
            <span>Recursos</span>
            <ChevronDown className="size-4" />
          </div>
          <div className="pl-4 mt-2 flex flex-col gap-1 border-l border-slate-100">
            <Link href="/faq" className="py-2 text-slate-600 hover:text-slate-900 transition-colors block font-medium">
              FAQ
            </Link>
            <a href="https://docs.stratacoms.pt" target="_blank" rel="noopener noreferrer" className="py-2 text-slate-600 hover:text-slate-900 transition-colors block font-medium">
              Documentação
            </a>
          </div>
        </div>
        <Link href="/company/about" className="py-2 border-b border-slate-50 flex justify-between items-center">
          <span>Sobre nós</span>
        </Link>
        <Link href="/company/careers" className="py-2 border-b border-slate-50 flex justify-between items-center">
          <span>Carreiras</span>
        </Link>
      </nav>
      <div className="flex flex-col gap-4 mt-auto">
        <Link href="/contact" className="bg-[#0f172a] text-white py-4 text-center rounded-lg font-semibold block">
          Contacte-nos
        </Link>
      </div>
    </div>
  );
}
