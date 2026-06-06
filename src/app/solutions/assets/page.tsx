import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Box, ShieldAlert, Palette, Compass, Activity, ArrowRight } from "lucide-react";
import Navbar from "../../../components/Navbar";

export const metadata: Metadata = {
  title: "2D & 3D Assets Solutions | Inner Studios",
  description: "Bespoke 3D models, detailed UI illustrations, and production-ready assets tailored for games and digital platforms.",
};

export default function AssetsSolutionPage() {
  const features = [
    {
      icon: <Palette className="size-6 text-emerald-500" />,
      title: "Modelos 3D Otimizados",
      desc: "Modelação low-poly e high-poly sob medida no Blender e texturização detalhada no Substance Painter para garantir leveza e fotorrealismo."
    },
    {
      icon: <Compass className="size-6 text-emerald-500" />,
      title: "Identidade Visual & Branding",
      desc: "Criação de logótipos vetoriais, guias de cores corporativas e pacotes de UI de alta fidelidade para produtos digitais premium."
    },
    {
      icon: <Activity className="size-6 text-emerald-500" />,
      title: "Assets para Tebex (GTA V)",
      desc: "Design e modelação de roupas personalizadas (custom clothing), texturas de veículos e interfaces de inventário preparadas para comercialização."
    },
    {
      icon: <ShieldAlert className="size-6 text-emerald-500" />,
      title: "Ilustração Digital & Storyboarding",
      desc: "Storyboards detalhados, splash arts para ecrãs de carregamento e banners de alta definição para marketing e divulgação de videojogos."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans pb-32">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 px-6 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-[11px] tracking-widest uppercase mb-6 shadow-sm">
            <Box className="size-3.5" />
            <span>Solutions / 2D & 3D Assets</span>
          </div>
          <h1 className="font-heading font-black text-[44px] md:text-[68px] leading-[1.05] tracking-tight text-slate-900 mb-6">
            Arte de Vanguarda, <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Totalmente Sob Medida</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Dê vida às suas ideias com modelos 3D de alta performance, ilustrações marcantes e pacotes de UI de tirar o fôlego.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-5xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-5 text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-[14px] leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlight/Case section */}
      <div className="max-w-5xl mx-auto px-6 mt-20">
        <div className="w-full rounded-[36px] bg-slate-900 p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="text-left max-w-lg relative z-10">
            <span className="text-emerald-400 font-bold text-[11px] tracking-widest uppercase block mb-3">Custom Game UI & Layout Packs</span>
            <h3 className="font-heading font-extrabold text-[28px] lg:text-[36px] leading-tight mb-4">
              Precisa de Assets de Arte Únicos?
            </h3>
            <p className="text-slate-300 text-[14px] lg:text-[15px] leading-relaxed">
              Fornecemos suporte completo em modelação 3D, rigging de personagens, criação de texturas e menus responsivos prontos para integrar em motores como Unity, Unreal Engine ou Cfx.re.
            </p>
          </div>
          <div className="shrink-0 relative z-10 w-full md:w-auto">
            <Link 
              href="/contact" 
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-heading font-bold px-8 py-4 rounded-2xl hover:bg-slate-100 transition-colors shadow-md group"
            >
              <span>Encomendar Assets</span>
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
