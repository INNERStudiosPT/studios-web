"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Clock, ArrowRight } from "lucide-react";
import Navbar from "../../../components/Navbar";
import { useState, useEffect } from "react";
import Checkbox from "../../../components/Checkbox";
import Turnstile from "../../../components/Turnstile";
import posthog from "posthog-js";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}

const STATIC_FALLBACK_POSITIONS: Job[] = [
  {
    id: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Lisbon, Portugal (Hybrid)",
    type: "Full-time",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: "backend-go-developer",
    title: "Backend Go Developer",
    department: "Engineering",
    location: "Lisbon, Portugal",
    type: "Full-time",
  },
];

export default function CareersPage() {
  const [positions, setPositions] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [alertEmail, setAlertEmail] = useState("");
  const [alertSubmitted, setAlertSubmitted] = useState(false);
  const [alertTurnstileToken, setAlertTurnstileToken] = useState<string | null>(null);
  const [alertVerifying, setAlertVerifying] = useState(false);
  const [alertError, setAlertError] = useState<string | null>(null);
  const [alertAgreePrivacy, setAlertAgreePrivacy] = useState(false);

  const handleAlertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail) return;
    if (!alertAgreePrivacy) {
      setAlertError("Deverá aceitar a política de privacidade e de cookies para continuar.");
      return;
    }
    if (!alertTurnstileToken) {
      setAlertError("Por favor, conclua a verificação de segurança.");
      return;
    }

    setAlertVerifying(true);
    setAlertError(null);

    try {
      // 1. Verify Turnstile token server-side
      const verifyRes = await fetch("/api/verify-turnstile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: alertTurnstileToken }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        setAlertError(verifyData.error || "A verificação de segurança falhou.");
        setAlertVerifying(false);
        return;
      }

      // 2. Submit email to Ingestion API (Newsletter / Alert)
      try {
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: alertEmail, tags: ["source-careers", "job-alerts"] }),
        });
        
        if (!res.ok) {
          console.warn("API job alert subscription returned non-ok status:", res.status);
        }
      } catch (apiErr) {
        console.warn("API job alert request failed:", apiErr);
      }

      // 3. PostHog Tracking
      posthog.identify(alertEmail, {
        email: alertEmail,
        jobs_alert_subscriber: true,
      });

      posthog.capture("job_alert_subscribed", {
        email: alertEmail,
        subscribed_at: new Date().toISOString()
      });

      setAlertSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setAlertError(err.message || "Ocorreu um erro inesperado. Por favor, tente novamente.");
    } finally {
      setAlertVerifying(false);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("https://api.innerstudios.pt/v1/content/jobs");
        if (!res.ok) throw new Error("API response error");
        const data = await res.json();
        
        // Map API properties to match UI keys
        const mapped = data.map((job: any) => ({
          id: job.id,
          title: job.title,
          department: job.department || "Engineering",
          location: job.location || "Lisbon, Portugal",
          type: job.type || "Full-time",
        }));
        
        setPositions(mapped.length > 0 ? mapped : STATIC_FALLBACK_POSITIONS);
      } catch (e) {
        console.error("Failed to load jobs from API, using fallback", e);
        setPositions(STATIC_FALLBACK_POSITIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredPositions = positions.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans flex flex-col items-center">
      <Navbar />
      
      <main className="w-full max-w-[1400px] px-4 md:px-6 lg:px-8 mt-4 md:mt-8 pb-32">
        
        {/* Hero Section based on FAQ */}
        <div className="relative w-full rounded-[40px] md:rounded-[60px] overflow-visible pb-16 flex flex-col items-center pt-24"
             style={{ background: "radial-gradient(circle at top, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)" }}>
          
          {/* Noise/Particles background overlay */}
          <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none rounded-[40px] md:rounded-[60px]"></div>
          
          {/* Careers Pill */}
          <div className="relative z-10 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[12px] font-bold tracking-widest uppercase mb-10 shadow-sm">
            Careers
          </div>

          {/* Title */}
          <h1 className="hero-animate font-heading font-black text-white tracking-tight text-center max-w-4xl flex flex-col items-center">
            <span 
              className="tracking-[-1.5px] font-black block text-white text-center"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.75rem)",
                lineHeight: "1.05"
              }}
            >
              Build <br />
              the future
            </span>
            <span className="inline-block overflow-hidden py-2 px-6 -rotate-[2deg] select-none">
              <span 
                className="title-animate-word font-black tracking-[-2px] block"
                style={{
                  fontSize: "clamp(2.5rem, 6.5vw, 6.25rem)",
                  color: "#0f172a",
                  WebkitTextStroke: "28px #ffffff",
                  paintOrder: "stroke fill",
                  strokeLinejoin: "round",
                  strokeLinecap: "round",
                  marginTop: "clamp(-1.5rem, -3vw, -0.75rem)"
                }}
              >
                With us
              </span>
            </span>
          </h1>

          {/* Search Bar layered container */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-20">
            <div className="relative w-full group">
              {/* Layered shadows */}
              <div className="absolute -inset-4 bg-slate-400/20 rounded-[40px] blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="absolute -inset-3 bg-blue-500/20 rounded-full blur-md"></div>
              <div className="absolute -inset-2 bg-blue-400/30 rounded-full"></div>
              
              {/* Actual Search Input */}
              <div className="relative bg-white h-[72px] rounded-full flex items-center px-6 shadow-lg border border-white/50">
                <Search className="size-6 text-slate-400 mr-4 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search open positions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full bg-transparent outline-none text-slate-700 text-lg font-medium placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-5xl mx-auto mt-28 px-4 flex flex-col items-center">
          
          <div className="text-center max-w-2xl mb-16">
            <h2 className="font-heading font-extrabold text-[32px] md:text-[40px] text-slate-900 mb-6">
              Open Positions
            </h2>
            <p className="text-slate-500 text-[16px] leading-relaxed font-medium">
              Join a team of driven individuals aiming to change the way the world handles digital payments. We are looking for top talent across all departments.
            </p>
          </div>

          <div className="w-full flex flex-col gap-4">
            {loading ? (
              <div className="w-full flex flex-col gap-4 animate-pulse">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex flex-col gap-3 w-full md:w-2/3 text-left">
                      <div className="flex gap-2">
                        <div className="h-6 w-24 bg-slate-100 rounded-lg"></div>
                        <div className="h-6 w-16 bg-slate-100 rounded-lg"></div>
                      </div>
                      <div className="h-8 w-3/4 bg-slate-100 rounded-xl mt-1"></div>
                      <div className="h-4 w-1/3 bg-slate-100 rounded mt-1"></div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-100 mt-4 md:mt-0"></div>
                  </div>
                ))}
              </div>
            ) : filteredPositions.length > 0 ? (
              filteredPositions.map((job) => (
                <Link 
                  href={`/company/careers/apply/${job.id}`} 
                  key={job.id}
                  className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between group"
                >
                  <div className="flex flex-col mb-6 md:mb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[12px] font-bold tracking-widest uppercase">
                        {job.department}
                      </span>
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[12px] font-bold tracking-widest uppercase">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-[24px] text-slate-900 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-4 text-slate-500 font-medium text-[14px]">
                      <MapPin className="size-4" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end md:gap-6 mt-4 md:mt-0">
                    <span className="text-blue-600 font-heading font-bold text-[14px] opacity-0 group-hover:opacity-100 transition-opacity">
                      Apply Now
                    </span>
                    <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white text-slate-400 transition-colors">
                      <ArrowRight className="size-5" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-10 text-slate-500 font-medium">
                No positions found matching your search.
              </div>
            )}
          </div>

          {/* Job Alerts Newsletter Card */}
          <div className="w-full max-w-5xl rounded-[36px] bg-slate-900 p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl mt-20 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="text-left max-w-lg relative z-10">
              <span className="text-blue-400 font-bold text-[11px] tracking-widest uppercase block mb-3">Alertas de Emprego</span>
              <h3 className="font-heading font-extrabold text-[28px] lg:text-[36px] leading-tight mb-4">
                Sê informado quando abrirem novas vagas
              </h3>
              <p className="text-slate-300 text-[14px] lg:text-[15px] leading-relaxed">
                Não encontraste a vaga ideal para ti? Deixa o teu email e nós avisamos-te assim que surgirem novas oportunidades de carreira na INNER Studios.
              </p>
            </div>

            <div className="w-full md:w-[400px] shrink-0 relative z-10">
              {alertSubmitted ? (
                <div className="bg-slate-800/40 border border-emerald-500/20 rounded-3xl p-6 text-center animate-profile-fade">
                  <span className="text-emerald-400 font-bold text-[14px] block mb-1">✓ Alerta Ativado!</span>
                  <p className="text-slate-300 text-xs">Avisar-te-emos assim que novas posições forem abertas.</p>
                </div>
              ) : (
                <form onSubmit={handleAlertSubmit} className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="O teu email"
                      value={alertEmail}
                      onChange={(e) => setAlertEmail(e.target.value)}
                      required
                      className="flex-grow h-12 bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/10 rounded-xl px-4 text-white placeholder:text-slate-400 font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm animate-none"
                    />
                    <button
                      type="submit"
                      disabled={alertVerifying || !alertTurnstileToken || !alertAgreePrivacy}
                      className="h-12 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 px-5 font-heading font-bold rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5 group text-sm"
                    >
                      {alertVerifying ? "..." : (
                        <>
                          <span>Avisar-me</span>
                          <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="scale-90 origin-left">
                    <Turnstile onVerify={(token) => setAlertTurnstileToken(token)} />
                  </div>

                  {alertError && (
                    <div className="text-red-400 text-xs font-semibold">
                      {alertError}
                    </div>
                  )}

                  <Checkbox
                    id="careers-newsletter-checkbox"
                    checked={alertAgreePrivacy}
                    onChange={setAlertAgreePrivacy}
                    required
                    variant="blue"
                    label={
                      <span className="text-slate-400 select-none text-[11px]">
                        Aceito a{" "}
                        <Link href="/privacy" target="_blank" className="underline hover:text-white transition-colors">
                          política de privacidade
                        </Link>{" "}
                        e a{" "}
                        <Link href="/cookie-policy" target="_blank" className="underline hover:text-white transition-colors">
                          política de cookies
                        </Link>{" "}
                        da INNER Studios.
                      </span>
                    }
                  />
                </form>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
