"use client";

import React, { useState, useEffect } from "react";
import { posthog } from "../../components/PostHogProvider";
import Logo from "../../components/Logo";

// ── Translations ──────────────────────────────────────────────────────────────
type Lang = "pt-PT" | "pt-BR" | "en";

const TRANSLATIONS: Record<Lang, {
  heading: string;
  words: string[];
  placeholder: string;
  cta: string;
  sending: string;
  successTitle: string;
  successSub: string;
  errorMsg: string;
  noSpam: string;
  privacy: string;
  terms: string;
  careers: string;
}> = {
  "pt-PT": {
    heading: "algo novo está",
    words: ["A CHEGAR", "A CAMINHO", "A CAIR", "A LANÇAR"],
    placeholder: "o.teu@email.com",
    cta: "Notifica-me →",
    sending: "A enviar...",
    successTitle: "Estás na lista!",
    successSub: "Vais ser notificado assim que lançarmos.",
    errorMsg: "Algo correu mal. Tenta novamente.",
    noSpam: "Sem spam. Podes cancelar a qualquer momento.",
    privacy: "Privacidade",
    terms: "Termos",
    careers: "Carreiras",
  },
  "pt-BR": {
    heading: "algo novo está",
    words: ["CHEGANDO", "A CAMINHO", "CAINDO", "LANÇANDO"],
    placeholder: "seu@email.com",
    cta: "Me avise →",
    sending: "Enviando...",
    successTitle: "Você está na lista!",
    successSub: "Você será notificado assim que lançarmos.",
    errorMsg: "Algo deu errado. Tente novamente.",
    noSpam: "Sem spam. Cancele quando quiser.",
    privacy: "Privacidade",
    terms: "Termos",
    careers: "Vagas",
  },
  en: {
    heading: "something new is",
    words: ["COMING", "ARRIVING", "DROPPING", "LAUNCHING"],
    placeholder: "your@email.com",
    cta: "Notify me →",
    sending: "Sending...",
    successTitle: "You're on the list!",
    successSub: "We'll notify you as soon as we launch.",
    errorMsg: "Something went wrong. Try again.",
    noSpam: "No spam. Unsubscribe anytime.",
    privacy: "Privacy",
    terms: "Terms",
    careers: "Careers",
  },
};

// Resolve a raw language string to our supported Lang
function resolveLang(raw: string): Lang {
  const l = raw.toLowerCase();
  if (l.startsWith("pt-br")) return "pt-BR";
  if (l.startsWith("pt")) return "pt-PT";
  return "en";
}

// Detect language: PostHog $browser_language first, fallback to navigator
function detectLang(): Lang {
  // 1. Try PostHog captured property (auto-captured on every pageview)
  try {
    const phLang = posthog.get_property("$browser_language") as string | undefined;
    if (phLang) return resolveLang(phLang);
  } catch {}
  // 2. Fallback to browser navigator
  if (typeof navigator !== "undefined" && navigator.language) {
    return resolveLang(navigator.language);
  }
  return "en";
}

// ── Theme config ──────────────────────────────────────────────────────────────
const THEMES = [
  { id: 0, gradient: "radial-gradient(circle at 50% 50%, #06b6d4, #0e7490)", glowColor: "rgba(6,182,212,0.6)" },
  { id: 1, gradient: "radial-gradient(circle at 50% 50%, #6366f1, #3730a3)", glowColor: "rgba(99,102,241,0.6)" },
  { id: 2, gradient: "radial-gradient(circle at 50% 50%, #f43f5e, #9f1239)", glowColor: "rgba(244,63,94,0.6)" },
  { id: 3, gradient: "radial-gradient(circle at 50% 50%, #10b981, #065f46)", glowColor: "rgba(16,185,129,0.6)" },
];

const THEME_INTERVAL = 4000;

// ── Component ─────────────────────────────────────────────────────────────────
export default function ComingSoon() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeTheme, setActiveTheme] = useState(0);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [introVisible, setIntroVisible] = useState(true);
  const [introFading, setIntroFading] = useState(false);

  // Detect language on mount
  useEffect(() => { setLang(detectLang()); }, []);

  // Intro animation
  useEffect(() => {
    const fadeTimer = setTimeout(() => setIntroFading(true), 1400);
    const hideTimer = setTimeout(() => setIntroVisible(false), 2200);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  // Theme + word cycling
  useEffect(() => {
    const tick = 50;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += tick;
      setProgress((elapsed / THEME_INTERVAL) * 100);
      if (elapsed >= THEME_INTERVAL) {
        elapsed = 0;
        setActiveTheme((prev) => {
          const next = (prev + 1) % THEMES.length;
          setWordVisible(false);
          setTimeout(() => {
            setWordIdx(next % TRANSLATIONS[lang].words.length);
            setWordVisible(true);
          }, 350);
          return next;
        });
      }
    }, tick);
    return () => clearInterval(timer);
  }, [lang]);

  const t = TRANSLATIONS[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tags: ["source-coming-soon", `lang-${lang}`] }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <style>{`
        @keyframes particle-drift {
          0%, 100% { opacity: 0.4; transform: translateY(0px); }
          50% { opacity: 0.8; transform: translateY(-6px); }
        }
        @keyframes word-in {
          from { opacity: 0; transform: translateY(20px); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes word-out {
          from { opacity: 1; transform: translateY(0); filter: blur(0); }
          to { opacity: 0; transform: translateY(-20px); filter: blur(8px); }
        }
        .word-visible { animation: word-in 0.4s cubic-bezier(0.16,1,0.3,1) both; }
        .word-hidden { animation: word-out 0.3s cubic-bezier(0.4,0,1,1) both; }
        @keyframes intro-logo {
          0%   { transform: scale(0.7); opacity: 0; filter: blur(12px); }
          40%  { opacity: 1; filter: blur(0); }
          80%  { transform: scale(1); opacity: 1; }
          100% { transform: scale(4); opacity: 0; filter: blur(8px); }
        }
        @keyframes intro-bg-fade {
          0%   { opacity: 1; }
          70%  { opacity: 1; }
          100% { opacity: 0; }
        }
        .intro-logo-anim { animation: intro-logo 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
        .intro-bg-fade { animation: intro-bg-fade 0.7s ease-in forwards; }
      `}</style>

      {/* ── INTRO OVERLAY ── */}
      {introVisible && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center ${introFading ? "intro-bg-fade" : ""}`}
          style={{ background: "radial-gradient(circle at 50% 50%, #06b6d4, #0e7490)" }}
        >
          <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay pointer-events-none" />
          <div className={introFading ? "intro-logo-anim" : ""}>
            <Logo className="text-4xl text-white" />
          </div>
        </div>
      )}

      <div className="min-h-screen w-full flex flex-col overflow-hidden" style={{ background: "#ffffff" }}>

        {/* Header */}
        <header className="relative z-50 px-6 md:px-10 pt-8 flex items-center justify-between">
          <Logo className="text-2xl text-slate-900" />

          <div className="flex items-center gap-3">
            {/* Careers button */}
            <a
              href="/company/careers"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t.careers}
            </a>
          </div>
        </header>

        {/* Hero card */}
        <main className="flex-1 px-4 md:px-8 xl:px-12 pt-6 pb-8 flex flex-col">
          <div className="flex-1 w-full rounded-[40px] md:rounded-[56px] relative overflow-hidden flex flex-col items-center justify-center min-h-[calc(100vh-140px)]">

            {/* Gradient backgrounds */}
            {THEMES.map((t, idx) => (
              <div key={t.id} className="absolute inset-0 transition-opacity duration-1000"
                style={{ background: t.gradient, opacity: idx === activeTheme ? 1 : 0 }} />
            ))}

            {/* Noise */}
            <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay pointer-events-none" />

            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="absolute rounded-full bg-white" style={{
                  top: `${8 + (i * 3.7) % 84}%`,
                  left: `${4 + (i * 4.1) % 92}%`,
                  width: `${1.5 + (i % 3)}px`,
                  height: `${1.5 + (i % 3)}px`,
                  opacity: 0.4,
                  animation: `particle-drift ${2.5 + (i % 4)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }} />
              ))}
            </div>

            {/* Corner blurs */}
            {[
              "radial-gradient(circle 200px at bottom left, black 0%, transparent 100%)",
              "radial-gradient(circle 200px at bottom right, black 0%, transparent 100%)",
              "radial-gradient(circle 200px at top right, black 0%, transparent 100%)",
            ].map((mask, i) => (
              <div key={i} className="absolute inset-0 pointer-events-none z-10" style={{
                maskImage: mask, WebkitMaskImage: mask,
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                background: "rgba(255,255,255,0.08)",
              }} />
            ))}

            {/* Progress pills */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
              {THEMES.map((_, idx) => (
                <button key={idx} onClick={() => setActiveTheme(idx)}
                  className={`w-1 rounded-full bg-white/30 transition-all duration-300 relative overflow-hidden ${activeTheme === idx ? "h-8 bg-white/40" : "h-4 hover:bg-white/50"}`}
                >
                  {activeTheme === idx && (
                    <div className="absolute top-0 left-0 w-full bg-white" style={{ height: `${progress}%` }} />
                  )}
                </button>
              ))}
            </div>

            {/* Central content */}
            <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">

              <h1 className="font-heading font-black text-white tracking-tight flex flex-col items-center select-none">
                <span className="tracking-[-1.5px] font-black block text-white text-center"
                  style={{ fontSize: "clamp(2rem, 5vw, 4.75rem)", lineHeight: "1.05" }}>
                  {t.heading}
                </span>
                <span className="inline-block overflow-hidden py-2 px-6 -rotate-[2deg] select-none">
                  <span className={`font-black tracking-[-2px] block ${wordVisible ? "word-visible" : "word-hidden"}`}
                    style={{
                      fontSize: "clamp(2.5rem, 6.5vw, 6.25rem)",
                      color: "#0f172a",
                      WebkitTextStroke: "24px #ffffff",
                      paintOrder: "stroke fill",
                      strokeLinejoin: "round" as const,
                      strokeLinecap: "round" as const,
                      marginTop: "clamp(-1.5rem, -3vw, -0.75rem)",
                    }}>
                    {t.words[wordIdx]}
                  </span>
                </span>
              </h1>

              {/* Form */}
              <div className="w-full max-w-md mt-8">
                {status === "success" ? (
                  <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold text-sm">{t.successTitle}</p>
                      <p className="text-white/60 text-xs mt-0.5">{t.successSub}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 flex gap-2 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.placeholder}
                        required
                        className="flex-1 bg-transparent text-white placeholder-white/40 text-sm px-4 py-3 outline-none min-w-0"
                      />
                      <button type="submit" disabled={status === "loading"}
                        className="flex-shrink-0 bg-white text-[#0f172a] px-6 py-3 rounded-[14px] text-sm font-bold hover:bg-white/90 transition-all shadow-md disabled:opacity-60 whitespace-nowrap">
                        {status === "loading" ? (
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {t.sending}
                          </span>
                        ) : t.cta}
                      </button>
                    </div>
                    {status === "error" && (
                      <p className="text-red-300 text-xs mt-2 text-center">{t.errorMsg}</p>
                    )}
                    <p className="text-white/30 text-[11px] mt-3 text-center">{t.noSpam}</p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 px-6 md:px-10 pb-6 flex items-center justify-between">
          <p className="text-slate-400 text-xs" suppressHydrationWarning>
            © {new Date().getFullYear()} stratacoms
          </p>
          <div className="flex gap-5 text-xs text-slate-400">
            <a href="/privacy" className="hover:text-slate-700 transition-colors">{t.privacy}</a>
            <a href="/terms" className="hover:text-slate-700 transition-colors">{t.terms}</a>
          </div>
        </footer>

      </div>
    </>
  );
}
