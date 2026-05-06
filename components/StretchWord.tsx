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

      const tween = gsap.fromTo(
        wordRef.current,
        { scaleY: 1 },
        {
          scaleY: 1.85,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            end: "bottom bottom",
            scrub: 0.8,
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
