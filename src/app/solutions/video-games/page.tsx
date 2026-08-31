import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Users, MessageCircle, Layers, Heart, LifeBuoy, ArrowRight } from "lucide-react";
import Navbar from "../../../components/Navbar";

export const metadata: Metadata = {
  title: "Community Management | stratacoms",
  description: "Gestão e dinamização de comunidades online: moderação, engagement, suporte e crescimento de comunidades ativas e leais à sua marca.",
};

export default function VideoGamesSolutionPage() {
  const features = [
    {
      icon: <MessageCircle className="size-6 text-cyan-500" />,
      title: "Dinamização de Comunidade",
      desc: "Damos vida aos seus canais — Discord, grupos, comentários e DMs — com conversas, iniciativas e conteúdo que mantêm a comunidade ativa e envolvida."
    },
    {
      icon: <Users className="size-6 text-cyan-500" />,
      title: "Moderação & Tom de Voz",
      desc: "Definimos regras, moderamos com critério e garantimos um espaço saudável e coerente com a personalidade da sua marca em todas as interações."
    },
    {
      icon: <LifeBuoy className="size-6 text-cyan-500" />,
      title: "Suporte & Atendimento",
      desc: "Resposta rápida a dúvidas e pedidos, encaminhamento de questões e um acompanhamento próximo que transforma seguidores em clientes fiéis."
    },
    {
      icon: <Heart className="size-6 text-cyan-500" />,
      title: "Fidelização & Advocacy",
      desc: "Programas de embaixadores, iniciativas de comunidade e reconhecimento dos membros mais ativos para transformar audiência em defensores da marca."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans pb-32">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 px-6 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 font-bold text-[11px] tracking-widest uppercase mb-6 shadow-sm">
            <Users className="size-3.5" />
            <span>Serviços / Community Management</span>
          </div>
          <h1 className="font-heading font-black text-[44px] md:text-[68px] leading-[1.05] tracking-tight text-slate-900 mb-6">
            Comunidades Ativas, <br />
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Ligadas à sua Marca</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Construímos e cuidamos da relação entre a sua marca e as pessoas — com moderação próxima, engagement genuíno e suporte de confiança.
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
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center shrink-0">
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
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-left max-w-lg relative z-10">
            <span className="text-cyan-400 font-bold text-[11px] tracking-widest uppercase block mb-3">Comunidade como Ativo</span>
            <h3 className="font-heading font-extrabold text-[28px] lg:text-[36px] leading-tight mb-4">
              A sua comunidade merece atenção diária
            </h3>
            <p className="text-slate-300 text-[14px] lg:text-[15px] leading-relaxed">
              Uma comunidade saudável não acontece por acaso. Cuidamos das interações do dia a dia, criamos momentos de proximidade e medimos o sentimento da audiência para que a sua marca cresça sobre uma base de pessoas leais.
            </p>
          </div>
          <div className="shrink-0 relative z-10 w-full md:w-auto">
            <Link
              href="/contact"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-heading font-bold px-8 py-4 rounded-2xl hover:bg-slate-100 transition-colors shadow-md group"
            >
              <span>Fale Connosco</span>
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
