"use client";

import React, { useEffect, useRef } from "react";

interface TurnstileProps {
  onVerify: (token: string) => void;
}

export default function Turnstile({ onVerify }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const renderWidget = () => {
      if ((window as any).turnstile && containerRef.current && !widgetIdRef.current) {
        try {
          // Clear container first to avoid duplicate widgets
          containerRef.current.innerHTML = "";
          
          widgetIdRef.current = (window as any).turnstile.render(containerRef.current, {
            sitekey: "0x4AAAAAADfzukuCH7x7zpPE",
            theme: "light",
            callback: (token: string) => {
              onVerify(token);
            },
          });
        } catch (e) {
          console.error("Turnstile rendering failed:", e);
        }
      }
    };

    if ((window as any).turnstile) {
      renderWidget();
    } else {
      const interval = setInterval(() => {
        if ((window as any).turnstile) {
          renderWidget();
          clearInterval(interval);
        }
      }, 200);
      return () => clearInterval(interval);
    }

    return () => {
      if (widgetIdRef.current && (window as any).turnstile) {
        try {
          (window as any).turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (e) {
          // Ignore cleanup errors on unmount
        }
      }
    };
  }, [onVerify]);

  return <div ref={containerRef} className="my-4 min-h-[65px] flex justify-center" />;
}
