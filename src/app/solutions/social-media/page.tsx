import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Share2, MessageSquare, TrendingUp, Sparkles, Megaphone, ArrowRight } from "lucide-react";
import Navbar from "../../../components/Navbar";

export const metadata: Metadata = {
  title: "Social Media & Community | Inner Studios",
  description: "Advanced community management, Discord bots automation, and viral marketing strategies built to elevate digital presence.",
};

export default function SocialMediaSolutionPage() {
  const features = [
    {
      icon: <MessageSquare className="size-6 text-rose-500" />,
      title: "Gestão de Comunidade Ativa",
      desc: "Desenvolvimento de estratégias de engajamento diário em Discord, Reddit e fóruns corporativos para manter a retenção de utilizadores em níveis recorde."
    },
    {
      icon: <Sparkles className="size-6 text-rose-500" />,
      title: "Automação com Discord Bots",
      desc: "Programação e implementação de bots inteligentes (Node.js/Python) com integrações API para automação de tarefas, tickets de suporte e moderação."
    },
    {
      icon: <TrendingUp className="size-6 text-rose-500" />,
      title: "Campanhas de Influenciadores",
      desc: "Conceção e execução de campanhas virais direcionadas para audiências de nicho (Gaming, Tech, Fintech) de forma orgânica e impactante."
    },
    {
      icon: <Megaphone className="size-6 text-rose-500" />,
      title: "Branding & Copywriting",
      desc: "Criação de narrativas de marca consistentes, tom de voz impactante e peças de design otimizadas para as redes de maior impacto visual."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans pb-32">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 px-6 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-rose-400/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 font-bold text-[11px] tracking-widest uppercase mb-6 shadow-sm">
            <Share2 className="size-3.5" />
            <span>Solutions / Social Media</span>
          </div>
          <h1 className="font-heading font-black text-[44px] md:text-[68px] leading-[1.05] tracking-tight text-slate-900 mb-6">
            Comunidade Unida, <br />
            <span className="bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">Crescimento Orgânico Real</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Ajudamos a sua marca a ir além de meras visualizações. Desenvolvemos estratégias completas de moderação, bots inteligentes e lore de marca.
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
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0">
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
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="text-left max-w-lg relative z-10">
            <span className="text-rose-400 font-bold text-[11px] tracking-widest uppercase block mb-3">Live Streaming & Esports Growth</span>
            <h3 className="font-heading font-extrabold text-[28px] lg:text-[36px] leading-tight mb-4">
              Impulsione a presença em Twitch e YouTube
            </h3>
            <p className="text-slate-300 text-[14px] lg:text-[15px] leading-relaxed">
              Com ligações diretas a grandes marcas competitivas (ex: Twitch e Kick), criamos integrações em direto, gestão de feeds de torneios de Esports e sistemas automatizados de recompensas para visualizadores.
            </p>
          </div>
          <div className="shrink-0 relative z-10 w-full md:w-auto">
            <Link 
              href="/contact" 
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-heading font-bold px-8 py-4 rounded-2xl hover:bg-slate-100 transition-colors shadow-md group"
            >
              <span>Maximizar o Meu Canal</span>
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
