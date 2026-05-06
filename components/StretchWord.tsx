"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export function StretchWord() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordRef = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    let isMounted = true;
    let cleanup: (() => void) | undefined;

    const setup = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (!isMounted || !sectionRef.current || !wordRef.current) return undefined;

      gsap.registerPlugin(ScrollTrigger);

      const getTargetScale = () => {
        const word = wordRef.current;

        const section = sectionRef.current;
        if (!word || !section) return 1.85;

        const bottomBarGap = 48; // Adjusted gap to be closer to actual footer size
        const availableHeight = section.offsetHeight - bottomBarGap;
        const wordHeight = word.offsetHeight || 1;

        return Math.max(availableHeight / wordHeight, 1.25);
      };

      const tween = gsap.fromTo(
        wordRef.current,
        { scaleY: 1 },
        {
          scaleY: getTargetScale,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 92%",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
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

  return (
    <section className="stretch-word" ref={sectionRef} aria-label="INNERSTUDIOS wordmark">
      <h2 ref={wordRef}>INNERSTUDIOS</h2>
    </section>
  );
}
