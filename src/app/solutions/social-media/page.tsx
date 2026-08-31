import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Share2, MessageSquare, TrendingUp, Sparkles, Megaphone, ArrowRight } from "lucide-react";
import Navbar from "../../../components/Navbar";

export const metadata: Metadata = {
  title: "Gestão de Redes Sociais | stratacoms",
  description: "Gestão completa de redes sociais: calendário editorial, publicação, engagement e relatórios de performance para fazer a sua marca crescer.",
};

export default function SocialMediaSolutionPage() {
  const features = [
    {
      icon: <MessageSquare className="size-6 text-rose-500" />,
      title: "Gestão Editorial Diária",
      desc: "Planeamento e publicação consistente em Instagram, LinkedIn, TikTok, Facebook e X, com um calendário editorial alinhado com os objetivos do seu negócio."
    },
    {
      icon: <Sparkles className="size-6 text-rose-500" />,
      title: "Engagement & Moderação",
      desc: "Respondemos a comentários e mensagens, dinamizamos a comunidade e mantemos um tom de voz coerente que aproxima a sua marca das pessoas certas."
    },
    {
      icon: <TrendingUp className="size-6 text-rose-500" />,
      title: "Crescimento Orgânico",
      desc: "Estratégias de conteúdo e formatos otimizados para o algoritmo de cada plataforma, focadas em alcance real, seguidores qualificados e conversão."
    },
    {
      icon: <Megaphone className="size-6 text-rose-500" />,
      title: "Relatórios & Insights",
      desc: "Dashboards mensais com as métricas que importam — alcance, engagement e crescimento — e recomendações claras para o mês seguinte."
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
            <span>Serviços / Gestão de Redes Sociais</span>
          </div>
          <h1 className="font-heading font-black text-[44px] md:text-[68px] leading-[1.05] tracking-tight text-slate-900 mb-6">
            Presença Consistente, <br />
            <span className="bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">Crescimento Orgânico Real</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Tratamos das suas redes de ponta a ponta — do planeamento à publicação e ao engagement — para que a sua marca esteja sempre presente e relevante.
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
            <span className="text-rose-400 font-bold text-[11px] tracking-widest uppercase block mb-3">Gestão Multi-Plataforma</span>
            <h3 className="font-heading font-extrabold text-[28px] lg:text-[36px] leading-tight mb-4">
              Uma equipa dedicada às suas redes
            </h3>
            <p className="text-slate-300 text-[14px] lg:text-[15px] leading-relaxed">
              Assumimos a operação diária das suas redes sociais como uma extensão da sua equipa: definição de estratégia, produção do calendário, publicação, resposta à comunidade e análise de resultados, tudo num único parceiro.
            </p>
          </div>
          <div className="shrink-0 relative z-10 w-full md:w-auto">
            <Link
              href="/contact"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-heading font-bold px-8 py-4 rounded-2xl hover:bg-slate-100 transition-colors shadow-md group"
            >
              <span>Fazer Crescer as Minhas Redes</span>
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
