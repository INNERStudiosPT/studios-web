"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import posthog from "posthog-js";

import Navbar from "../../components/Navbar";
import Turnstile from "../../components/Turnstile";
import Checkbox from "../../components/Checkbox";

export default function ContactPage() {
  // Navbar handles mobile state
  const [requestType, setRequestType] = useState("Partnership");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!agreePrivacy) {
      setErrorMessage("Deverá aceitar a política de privacidade e de cookies para continuar.");
      return;
    }
    if (!turnstileToken) {
      setErrorMessage("Please complete the security check.");
      return;
    }

    setVerifying(true);
    setErrorMessage(null);

    try {
      // 1. Verify Turnstile token server-side
      const verifyRes = await fetch("/api/verify-turnstile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: turnstileToken }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        setErrorMessage(verifyData.error || "Security verification failed.");
        setVerifying(false);
        return;
      }

      // 2. Submit data to Ingestion API
      const contactRes = await fetch("https://api.innerstudios.pt/v1/content/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: null,
          interests: [requestType],
          message,
        }),
      });

      if (!contactRes.ok) {
        throw new Error("Failed to submit message to the contact API.");
      }

      if (subscribeNewsletter) {
        try {
          await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, tags: ["source-contact"] }),
          });
        } catch (apiErr) {
          console.warn("Failed to submit to newsletter API:", apiErr);
        }
      }

      // 3. PostHog Tracking
      posthog.identify(email, {
        email: email,
        name: name,
        company: "INNER Studios Partner Candidate",
        newsletter_subscriber: subscribeNewsletter
      });

      posthog.capture("contact_form_submitted", {
        request_type: requestType,
        message_length: message.length,
        newsletter_subscribed: subscribeNewsletter
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0f172a] font-sans flex flex-col items-center pb-20">
      <Navbar />
      
      <main className="w-full max-w-[600px] mx-auto px-4 md:px-0 mt-12 md:mt-24">
        
        {/* Title */}
        <h1 className="font-heading font-extrabold text-[44px] md:text-[56px] text-slate-900 leading-[1.05] tracking-tight mb-8">
          Let's discuss <br />
          your topic
        </h1>

        {/* Contact Form Card */}
        <div className="bg-[#128f65] rounded-[36px] md:rounded-[48px] p-6 md:p-10 relative overflow-hidden shadow-2xl">
          {/* Noise overlay to give it that organic feel from the screenshot */}
          <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none"></div>
          
          <div className="relative z-10">
            {submitted ? (
              <div className="text-center py-10 text-white">
                <h3 className="text-2xl font-bold mb-4">Request sent!</h3>
                <p className="text-emerald-100 font-medium">Thank you, {name}. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Request Type Selector */}
                <div className="mb-8">
                  <label className="block text-emerald-100 text-[14px] font-medium mb-3 pl-2">
                    Select your type of request
                  </label>
                  <div className="bg-white p-1.5 rounded-full flex items-center justify-between shadow-sm">
                    {["Support", "Complain", "Partnership"].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setRequestType(type)}
                        className={`flex-1 py-3 px-2 rounded-full text-[14px] font-bold transition-all duration-300 ${
                          requestType === type 
                            ? "bg-[#e5f6f1] text-[#128f65] shadow-sm" 
                            : "text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div>
                  <label className="block text-emerald-100 text-[14px] font-medium mb-3 pl-2">
                    Fill the form
                  </label>
                  
                  <div className="flex flex-col gap-3">
                    <input 
                      type="text" 
                      placeholder="Your name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full h-14 bg-white rounded-2xl px-5 text-slate-900 placeholder:text-slate-400 font-medium outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all border-none"
                    />
                    
                    <input 
                      type="email" 
                      placeholder="Business email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full h-14 bg-white rounded-2xl px-5 text-slate-900 placeholder:text-slate-400 font-medium outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all border-none"
                    />
                    
                    <textarea 
                      placeholder="Message" 
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full bg-white rounded-2xl p-5 text-slate-900 placeholder:text-slate-400 font-medium outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all border-none resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Turnstile Integration */}
                <Turnstile onVerify={(token) => setTurnstileToken(token)} />

                {errorMessage && (
                  <div className="text-red-200 text-sm font-semibold text-center mt-2 px-2">
                    {errorMessage}
                  </div>
                )}

                <Checkbox
                  id="contact-privacy-checkbox"
                  checked={agreePrivacy}
                  onChange={setAgreePrivacy}
                  required
                  variant="green"
                  label={
                    <span className="text-emerald-100 select-none">
                      Li e aceito a{" "}
                      <Link href="/privacy" target="_blank" className="underline hover:text-white transition-colors">
                        Política de Privacidade
                      </Link>{" "}
                      e a{" "}
                      <Link href="/cookie-policy" target="_blank" className="underline hover:text-white transition-colors">
                        Política de Cookies
                      </Link>{" "}
                      da INNER Studios.
                    </span>
                  }
                />

                <div className="mt-4">
                  <Checkbox
                    id="contact-newsletter-checkbox"
                    checked={subscribeNewsletter}
                    onChange={setSubscribeNewsletter}
                    required={false}
                    variant="green"
                    label={
                      <span className="text-emerald-100 select-none">
                        Quero subscrever a newsletter para receber atualizações e novidades da INNER Studios.
                      </span>
                    }
                  />
                </div>

                {/* Disclaimer & Submit */}
                <div className="mt-6">
                  <button 
                    type="submit" 
                    disabled={verifying || !turnstileToken || !agreePrivacy}
                    className="w-full h-14 bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-slate-900 text-[15px] font-bold hover:bg-slate-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 active:scale-95"
                  >
                    {verifying ? "Verifying..." : "Send request"}
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
