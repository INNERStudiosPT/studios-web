import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Compass, Target, PenTool, BarChart3, Lightbulb, ArrowRight } from "lucide-react";
import Navbar from "../../../components/Navbar";

export const metadata: Metadata = {
  title: "Estratégia & Branding | stratacoms",
  description: "Estratégia de comunicação e identidade de marca: posicionamento, tom de voz, identidade visual e planos de conteúdo que dão coerência à sua presença.",
};

export default function WebPlatformsSolutionPage() {
  const features = [
    {
      icon: <Target className="size-6 text-indigo-500" />,
      title: "Posicionamento & Estratégia",
      desc: "Definimos quem é a sua marca, para quem comunica e o que a distingue — a base estratégica que orienta todas as decisões de comunicação."
    },
    {
      icon: <PenTool className="size-6 text-indigo-500" />,
      title: "Identidade Visual & Verbal",
      desc: "Criação de identidade visual, tom de voz e guidelines de marca que garantem uma presença coerente e reconhecível em todos os canais."
    },
    {
      icon: <Lightbulb className="size-6 text-indigo-500" />,
      title: "Plano de Conteúdos",
      desc: "Definição de pilares de conteúdo, linhas editoriais e campanhas alinhadas com os objetivos de negócio e com a jornada da sua audiência."
    },
    {
      icon: <BarChart3 className="size-6 text-indigo-500" />,
      title: "Análise & Otimização",
      desc: "Medimos o impacto da estratégia com base em dados e ajustamos o rumo de forma contínua para maximizar resultados ao longo do tempo."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans pb-32">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 px-6 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-400/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-[11px] tracking-widest uppercase mb-6 shadow-sm">
            <Compass className="size-3.5" />
            <span>Serviços / Estratégia & Branding</span>
          </div>
          <h1 className="font-heading font-black text-[44px] md:text-[68px] leading-[1.05] tracking-tight text-slate-900 mb-6">
            Marca com Direção, <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Comunicação com Propósito</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Antes de comunicar, é preciso saber o que dizer e porquê. Definimos a estratégia e a identidade que dão coerência e força a toda a sua presença.
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
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
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
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-left max-w-lg relative z-10">
            <span className="text-indigo-400 font-bold text-[11px] tracking-widest uppercase block mb-3">Fundação da Marca</span>
            <h3 className="font-heading font-extrabold text-[28px] lg:text-[36px] leading-tight mb-4">
              A estratégia que sustenta tudo o resto
            </h3>
            <p className="text-slate-300 text-[14px] lg:text-[15px] leading-relaxed">
              Construímos a base estratégica da sua comunicação — posicionamento, identidade e plano de conteúdos — para que cada publicação, campanha e interação trabalhe para o mesmo objetivo de negócio.
            </p>
          </div>
          <div className="shrink-0 relative z-10 w-full md:w-auto">
            <Link
              href="/contact"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-heading font-bold px-8 py-4 rounded-2xl hover:bg-slate-100 transition-colors shadow-md group"
            >
              <span>Definir a Minha Estratégia</span>
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
