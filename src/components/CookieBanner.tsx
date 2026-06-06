"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted or declined cookies
    const consent = localStorage.getItem("innerstudios-cookie-consent");
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("innerstudios-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("innerstudios-cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none flex justify-center">
      <div className="bg-[#0f172a] text-white p-6 rounded-3xl shadow-2xl w-full max-w-4xl pointer-events-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Decorative subtle noise */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

        <div className="flex items-start gap-4 relative z-10 flex-1">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
            <Cookie className="size-5 text-blue-400" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-[16px] mb-1">We value your privacy</h4>
            <p className="text-slate-300 text-[13px] leading-relaxed">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <Link href="/privacy" className="underline hover:text-white transition-colors">Privacy Policy</Link> and <Link href="/terms" className="underline hover:text-white transition-colors">Terms of Service</Link>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto relative z-10 shrink-0">
          <button 
            onClick={handleDecline}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-full border border-slate-700 text-slate-300 text-[13px] font-bold hover:bg-slate-800 transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-full bg-blue-600 text-white text-[13px] font-bold hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
          >
            Accept All
          </button>
          <button 
            onClick={handleDecline}
            className="absolute top-0 right-0 md:hidden p-2 text-slate-400 hover:text-white -mt-4 -mr-2"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
