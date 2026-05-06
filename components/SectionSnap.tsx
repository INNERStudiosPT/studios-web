"use client";

import { useEffect } from "react";
import gsap from "gsap";

const getTop = (element: HTMLElement) => element.getBoundingClientRect().top + window.scrollY;

export function SectionSnap() {
  useEffect(() => {
    let isMounted = true;
    let cleanup: (() => void) | undefined;

    const setup = async () => {
      const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");

      if (!isMounted) return undefined;

      gsap.registerPlugin(ScrollToPlugin);

      let isAnimating = false;

      const scrollToY = (y: number) => {
        isAnimating = true;
        gsap.to(window, {
          duration: 0.9,
          ease: "power3.inOut",
          scrollTo: { y, autoKill: false },
          onComplete: () => {
            isAnimating = false;
          },
        });
      };

      const onWheel = (event: WheelEvent) => {
        if (isAnimating || Math.abs(event.deltaY) < 10) return;

        const hero = document.getElementById("hero");
        const manifesto = document.getElementById("manifesto");
        const categories = document.getElementById("categories");

        if (!hero || !manifesto || !categories) return;

        const currentY = window.scrollY;
        const viewport = window.innerHeight;
        const heroTop = getTop(hero);
        const manifestoTop = getTop(manifesto);
        const categoriesTop = getTop(categories);
        const beforeManifesto = currentY < manifestoTop - viewport * 0.35;
        const atManifesto = currentY >= manifestoTop - viewport * 0.25 && currentY < manifestoTop + viewport * 0.28;
        const betweenManifestoAndCategories =
          currentY >= manifestoTop + viewport * 0.28 && currentY < categoriesTop - viewport * 0.12;

        if (event.deltaY > 0 && beforeManifesto) {
          event.preventDefault();
          scrollToY(manifestoTop);
          return;
        }

        if (event.deltaY > 0 && (atManifesto || betweenManifestoAndCategories)) {
          event.preventDefault();
          scrollToY(categoriesTop);
          return;
        }

        if (event.deltaY < 0 && betweenManifestoAndCategories) {
          event.preventDefault();
          scrollToY(manifestoTop);
          return;
        }

        if (event.deltaY < 0 && atManifesto) {
          event.preventDefault();
          scrollToY(heroTop);
          return;
        }

        // Once the categories section is pinned, ScrollTrigger owns both directions.
        // Capturing upward scroll here would skip the reverse category-by-category flow.
      };

      window.addEventListener("wheel", onWheel, { passive: false, capture: true });

      return () => {
        window.removeEventListener("wheel", onWheel, { capture: true });
        gsap.killTweensOf(window);
      };
    };

    setup().then((teardown) => {
      cleanup = teardown;
    });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, []);

  return null;
}
