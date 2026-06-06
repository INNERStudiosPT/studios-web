"use client";

import React, { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname } from "next/navigation";
import { recordPageVisit, recordActionClick } from "../utils/userProfile";

// Initialize client immediately if in browser to make feature flags immediately accessible
if (typeof window !== "undefined") {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "/ingest";

  if (key) {
    posthog.init(key, {
      api_host: host,
      ui_host: "https://eu.posthog.com", // Necessary for feature flag requests when using a reverse proxy
      person_profiles: "identified_only",
      capture_pageview: true,
      loaded: (ph) => {
        if (process.env.NODE_ENV === "development") ph.debug();
      }
    });
  }
}

// Subcomponent to observe Next.js route transitions and dynamic page clicks
function RouteAndClickObserver() {
  const pathname = usePathname();

  // 1. Observe Page Route Navigation
  useEffect(() => {
    if (!pathname) return;

    if (pathname.includes("/careers")) {
      recordPageVisit("careers");
    } else if (pathname.includes("/contact")) {
      recordPageVisit("consulting");
    } else if (pathname.includes("/blog")) {
      recordPageVisit("gaming");
    } else if (pathname.includes("/esports") || pathname.includes("/rainbow-six")) {
      recordPageVisit("esports");
    } else if (pathname.includes("/about") || pathname.includes("/company") || pathname.includes("/terms") || pathname.includes("/privacy")) {
      recordPageVisit("about");
    } else if (pathname.includes("/projects") || pathname.includes("/solutions")) {
      recordPageVisit("projects");
    }
  }, [pathname]);

  // 2. Observe global element clicks to build dynamic profiling
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const text = (target.textContent || "").toLowerCase();
      const href = (target.getAttribute("href") || "").toLowerCase();

      // Check Esports keywords
      if (text.includes("esports") || text.includes("rainbow six") || href.includes("esports")) {
        recordActionClick("esports", target.id || text || "Esports Link");
      }
      // Check Careers keywords
      else if (text.includes("careers") || text.includes("vagas") || text.includes("join us") || href.includes("careers")) {
        recordActionClick("careers", target.id || text || "Careers Link");
      }
      // Check Consulting keywords
      else if (text.includes("consultoria") || text.includes("consulting") || text.includes("solutions") || href.includes("solutions")) {
        recordActionClick("consulting", target.id || text || "Consulting Link");
      }
      // Check Gaming/INNERfx engine keywords
      else if (text.includes("innerfx") || text.includes("innercircle") || text.includes("server") || text.includes("gameplay") || href.includes("innerfx") || href.includes("circle")) {
        recordActionClick("gaming", target.id || text || "Gaming/Engine Link");
      }
      // Check About Us keywords
      else if (text.includes("about") || text.includes("sobre") || text.includes("quem somos") || text.includes("missão") || text.includes("valores") || href.includes("about")) {
        recordActionClick("about", target.id || text || "About Link");
      }
      // Check Projects keywords
      else if (text.includes("projetos") || text.includes("portfolio") || text.includes("ver projetos") || text.includes("explore") || href.includes("projects")) {
        recordActionClick("projects", target.id || text || "Projects Link");
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // 3. Form typing speed (Time-to-Complete) tracker
  useEffect(() => {
    let startTime = 0;

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        if (startTime === 0) {
          startTime = Date.now();
          posthog.capture("form_interaction_started", { field: target.placeholder || target.name });
        }
      }
    };

    const handleSubmit = (e: SubmitEvent) => {
      if (startTime > 0) {
        const timeSpent = (Date.now() - startTime) / 1000;
        posthog.capture("form_time_to_complete", { duration_seconds: timeSpent });
        startTime = 0; // reset
      }
    };

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("submit", handleSubmit);
    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  // 4. Hover tracking for bento grid cards to capture user hesitation
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".group");
      if (target && target.textContent) {
        const text = target.textContent.substring(0, 30).trim();
        posthog.capture("card_hovered", { card_title: text });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <RouteAndClickObserver />
      {children}
    </PHProvider>
  );
}

export { posthog };
