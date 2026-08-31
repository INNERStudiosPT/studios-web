"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "../../../../../components/Navbar";
import Turnstile from "../../../../../components/Turnstile";
import Checkbox from "../../../../../components/Checkbox";
import posthog from "posthog-js";
import { CONTENT_API_ENABLED, CONTENT_API_BASE } from "@/config/api";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}

const STATIC_FALLBACK_POSITIONS: Job[] = [
  {
    id: "social-media-manager",
    title: "Social Media Manager",
    department: "Redes Sociais",
    location: "Lisboa, Portugal (Híbrido)",
    type: "Full-time",
  },
  {
    id: "content-creator",
    title: "Content Creator (Vídeo & Foto)",
    department: "Conteúdo",
    location: "Remoto",
    type: "Full-time",
  },
  {
    id: "community-manager",
    title: "Community Manager",
    department: "Comunidade",
    location: "Lisboa, Portugal",
    type: "Full-time",
  },
];

export default function ApplyPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [message, setMessage] = useState("");
  const [resumeFile, setResumeFile] = useState<{ name: string; type: string; base64: string } | null>(null);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      // API de conteúdos temporariamente desativada — usar dados estáticos.
      if (!CONTENT_API_ENABLED) {
        const fallbackFound = STATIC_FALLBACK_POSITIONS.find((j) => j.id === id);
        if (fallbackFound) {
          setJob(fallbackFound);
        } else {
          setError("Vaga não encontrada.");
        }
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${CONTENT_API_BASE}/jobs`);
        if (!res.ok) throw new Error("Failed to load jobs");
        const data = await res.json();
        
        const found = data.find((j: any) => j.id === id);
        if (found) {
          setJob({
            id: found.id,
            title: found.title,
            department: found.department || "Engineering",
            location: found.location || "Lisbon, Portugal",
            type: found.type || "Full-time",
          });
        } else {
          // Check static fallbacks
          const fallbackFound = STATIC_FALLBACK_POSITIONS.find((j) => j.id === id);
          if (fallbackFound) {
            setJob(fallbackFound);
          } else {
            setError("Vaga não encontrada.");
          }
        }
      } catch (e) {
        console.error("Failed to load job details from API, checking fallbacks", e);
        const fallbackFound = STATIC_FALLBACK_POSITIONS.find((j) => j.id === id);
        if (fallbackFound) {
          setJob(fallbackFound);
        } else {
          setError("Failed to load job details. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. 5MB maximum size.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setResumeFile({
        name: file.name,
        type: file.type,
        base64: reader.result as string,
      });
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreePrivacy) {
      setError("Deverá aceitar a política de privacidade e de cookies para continuar.");
      return;
    }
    if (!turnstileToken) {
      setError("Please complete the security check.");
      return;
    }
    if (!resumeFile) {
      setError("Please upload your CV / Resume file.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // 1. Verify Turnstile token server-side
      const verifyRes = await fetch("/api/verify-turnstile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: turnstileToken }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        setError(verifyData.error || "Security verification failed.");
        setSubmitting(false);
        return;
      }

      // 2. Submit candidate application payload to Ingestion API
      const applicationPayload = {
        form_id: null,
        user_id: null,
        status: "pending",
        candidate_message: message,
        referral_input: "website",
        screening_answers: {
          job_id: id,
          name,
          email,
          phone,
          portfolio,
        },
        extra_attachments: {
          resume: {
            filename: resumeFile.name,
            content_type: resumeFile.type,
            data: resumeFile.base64,
          }
        },
      };

      // API de conteúdos temporariamente desativada — não enviar para o exterior.
      if (CONTENT_API_ENABLED) {
        const submitRes = await fetch(`${CONTENT_API_BASE}/careers/apply`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(applicationPayload),
        });

        if (!submitRes.ok) {
          throw new Error("Failed to submit application to the API.");
        }
      } else {
        console.warn("Content API disabled — application not sent:", applicationPayload.screening_answers);
      }

      if (subscribeNewsletter) {
        try {
          await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, tags: ["source-job-application", "job-alerts"] }),
          });
        } catch (apiErr) {
          console.warn("Failed to subscribe newsletter in application:", apiErr);
        }
      }

      // 3. PostHog Event capture
      posthog.identify(email, {
        email: email,
        name: name,
        phone: phone,
        newsletter_subscriber: subscribeNewsletter,
      });

      posthog.capture("career_application_submitted", {
        job_id: id,
        job_title: job?.title || "Unknown",
        referral: "website",
        newsletter_subscribed: subscribeNewsletter,
      });

      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during submission. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 text-[#0f172a] font-sans flex flex-col items-center pb-24 animate-pulse">
        <Navbar />
        <main className="w-full max-w-[600px] mx-auto px-4 md:px-0 mt-12 md:mt-24">
          <div className="h-5 w-28 bg-slate-200 rounded mb-6"></div>
          <div className="mb-8 flex flex-col gap-3">
            <div className="h-6 w-24 bg-slate-200 rounded-lg"></div>
            <div className="h-10 w-2/3 bg-slate-200 rounded-xl mt-1"></div>
            <div className="h-4 w-20 bg-slate-200 rounded"></div>
          </div>
          <div className="bg-[#1e293b]/40 rounded-[36px] md:rounded-[48px] p-6 md:p-10 min-h-[500px] flex flex-col gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-4 w-20 bg-slate-700/50 rounded"></div>
                <div className="h-12 w-full bg-slate-700/30 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-[#0f172a] font-sans flex flex-col items-center pb-24">
      <Navbar />
      
      <main className="w-full max-w-[600px] mx-auto px-4 md:px-0 mt-12 md:mt-24">
        
        {/* Back Link */}
        <Link href="/company/careers" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-6 font-semibold text-sm">
          <ArrowLeft className="size-4" />
          <span>Back to Careers</span>
        </Link>

        {/* Dynamic header details */}
        {job && (
          <div className="mb-8">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[12px] font-bold tracking-widest uppercase">
              {job.department} / {job.type}
            </span>
            <h1 className="font-heading font-extrabold text-[36px] md:text-[48px] text-slate-900 leading-[1.1] tracking-tight mt-3">
              Apply for <br />
              {job.title}
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-2">{job.location}</p>
          </div>
        )}

        {/* Application Card */}
        <div className="bg-[#1e293b] rounded-[36px] md:rounded-[48px] p-6 md:p-10 relative overflow-hidden shadow-2xl text-white">
          <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay pointer-events-none"></div>
          
          <div className="relative z-10">
            {success ? (
              <div className="text-center py-10 flex flex-col items-center">
                <CheckCircle2 className="size-16 text-emerald-400 mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold mb-3 text-white">Candidatura Enviada!</h3>
                <p className="text-slate-300 font-medium leading-relaxed max-w-sm">
                  Obrigado, {name}. A sua candidatura para a vaga de <strong>{job?.title}</strong> foi registada com sucesso.
                </p>
                <button 
                  onClick={() => router.push("/company/careers")} 
                  className="mt-8 bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors shadow-md"
                >
                  Voltar para Carreiras
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-slate-300 text-[13px] font-semibold mb-2 pl-1">
                    Nome Completo
                  </label>
                  <input 
                    type="text" 
                    placeholder="O seu nome" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full h-13 bg-white/10 rounded-2xl px-5 text-white placeholder:text-slate-400 font-medium outline-none focus:ring-4 focus:ring-blue-500/30 transition-all border border-slate-700 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-[13px] font-semibold mb-2 pl-1">
                    Endereço de E-mail
                  </label>
                  <input 
                    type="email" 
                    placeholder="exemplo@dominio.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-13 bg-white/10 rounded-2xl px-5 text-white placeholder:text-slate-400 font-medium outline-none focus:ring-4 focus:ring-blue-500/30 transition-all border border-slate-700 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-[13px] font-semibold mb-2 pl-1">
                    Número de Telemóvel
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+351 900 000 000" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full h-13 bg-white/10 rounded-2xl px-5 text-white placeholder:text-slate-400 font-medium outline-none focus:ring-4 focus:ring-blue-500/30 transition-all border border-slate-700 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-[13px] font-semibold mb-2 pl-1">
                    Link do Portfolio / LinkedIn
                  </label>
                  <input 
                    type="url" 
                    placeholder="https://github.com/... ou link" 
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    required
                    className="w-full h-13 bg-white/10 rounded-2xl px-5 text-white placeholder:text-slate-400 font-medium outline-none focus:ring-4 focus:ring-blue-500/30 transition-all border border-slate-700 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-[13px] font-semibold mb-2 pl-1">
                    Curriculum Vitae (CV)
                  </label>
                  <div className="relative border-2 border-dashed border-slate-700 hover:border-slate-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-white/5 flex flex-col items-center justify-center min-h-[120px]">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {resumeFile ? (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-emerald-400 font-bold text-[14px]">✓ CV Adicionado</span>
                        <span className="text-slate-300 text-xs truncate max-w-[240px] font-medium">{resumeFile.name}</span>
                        <button 
                          type="button" 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setResumeFile(null);
                          }}
                          className="text-red-400 hover:text-red-300 text-xs font-semibold mt-2 underline"
                        >
                          Remover Ficheiro
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-slate-300 font-semibold text-[14px]">Carregar currículo (PDF, Word)</span>
                        <span className="text-slate-500 text-xs">Arraste um ficheiro ou clique para procurar (Máx 5MB)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-[13px] font-semibold mb-2 pl-1">
                    Mensagem de Apresentação
                  </label>
                  <textarea 
                    placeholder="Fale-nos um pouco sobre a sua experiência..." 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full bg-white/10 rounded-2xl p-5 text-white placeholder:text-slate-400 font-medium outline-none focus:ring-4 focus:ring-blue-500/30 transition-all border border-slate-700 focus:border-blue-500 resize-none"
                  ></textarea>
                </div>

                {/* Cloudflare Turnstile Widget */}
                <Turnstile onVerify={(token) => setTurnstileToken(token)} />

                {error && (
                  <div className="text-red-400 text-sm font-semibold text-center mt-2">
                    {error}
                  </div>
                )}

                <Checkbox
                  id="agree-privacy-checkbox"
                  checked={agreePrivacy}
                  onChange={setAgreePrivacy}
                  required
                  variant="blue"
                  label={
                    <>
                      Li e aceito a{" "}
                      <Link href="/privacy" target="_blank" className="underline hover:text-white transition-colors">
                        Política de Privacidade
                      </Link>{" "}
                      e a{" "}
                      <Link href="/cookie-policy" target="_blank" className="underline hover:text-white transition-colors">
                        Política de Cookies
                      </Link>{" "}
                      da stratacoms.
                    </>
                  }
                />

                <div className="mt-4">
                  <Checkbox
                    id="apply-newsletter-checkbox"
                    checked={subscribeNewsletter}
                    onChange={setSubscribeNewsletter}
                    required={false}
                    variant="blue"
                    label={
                      <>
                        Quero subscrever a newsletter para receber atualizações e novidades da stratacoms.
                      </>
                    }
                  />
                </div>

                <div className="mt-4">
                  <button 
                    type="submit" 
                    disabled={submitting || !turnstileToken || !agreePrivacy}
                    className="w-full h-14 bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-slate-900 text-[15px] font-bold hover:bg-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 active:scale-95"
                  >
                    {submitting ? "A enviar candidatura..." : "Submeter Candidatura"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
