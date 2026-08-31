import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Camera, Video, Palette, PenLine, Film, ArrowRight } from "lucide-react";
import Navbar from "../../../components/Navbar";

export const metadata: Metadata = {
  title: "Criação de Conteúdo | stratacoms",
  description: "Produção de conteúdo para redes sociais: fotografia, vídeo, design gráfico e copywriting pensados para captar atenção e gerar resultados.",
};

export default function AssetsSolutionPage() {
  const features = [
    {
      icon: <Video className="size-6 text-emerald-500" />,
      title: "Vídeo & Reels",
      desc: "Produção e edição de vídeo curto para Reels, TikTok e Shorts — o formato que mais cresce — com um ritmo e uma linguagem feitos para reter atenção."
    },
    {
      icon: <Camera className="size-6 text-emerald-500" />,
      title: "Fotografia & Direção de Arte",
      desc: "Sessões fotográficas e direção de arte que traduzem a identidade da marca em imagens fortes e prontas a publicar em qualquer plataforma."
    },
    {
      icon: <Palette className="size-6 text-emerald-500" />,
      title: "Design Gráfico & Motion",
      desc: "Templates, carrosséis, infografias e animações que dão consistência visual ao feed e destacam as mensagens que realmente importam."
    },
    {
      icon: <PenLine className="size-6 text-emerald-500" />,
      title: "Copywriting & Storytelling",
      desc: "Legendas, guiões e narrativas de marca que despertam emoção, geram conversa e convertem seguidores em clientes."
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
            <Film className="size-3.5" />
            <span>Serviços / Criação de Conteúdo</span>
          </div>
          <h1 className="font-heading font-black text-[44px] md:text-[68px] leading-[1.05] tracking-tight text-slate-900 mb-6">
            Conteúdo que Para <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">o Scroll</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Produzimos vídeo, fotografia, design e texto pensados para as redes sociais — conteúdo que capta atenção, transmite a sua marca e gera resultados.
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
            <span className="text-emerald-400 font-bold text-[11px] tracking-widest uppercase block mb-3">Produção Chave-na-Mão</span>
            <h3 className="font-heading font-extrabold text-[28px] lg:text-[36px] leading-tight mb-4">
              Precisa de conteúdo consistente?
            </h3>
            <p className="text-slate-300 text-[14px] lg:text-[15px] leading-relaxed">
              Da ideia à publicação: conceito, guião, produção, edição e adaptação para cada plataforma. Entregamos um fluxo contínuo de conteúdo alinhado com a sua marca, sem que tenha de se preocupar com a operação.
            </p>
          </div>
          <div className="shrink-0 relative z-10 w-full md:w-auto">
            <Link
              href="/contact"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-heading font-bold px-8 py-4 rounded-2xl hover:bg-slate-100 transition-colors shadow-md group"
            >
              <span>Quero Conteúdo Novo</span>
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
