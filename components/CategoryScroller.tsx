"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { DEFAULT_GALLERY_IMAGES, galleryImageAt } from "@/lib/gallery";

const categories = [
  { title: "ART DIRECTION", subcategory: "VISUAL SYSTEMS" },
  { title: "GAME EXPERIENCE", subcategory: "PLAYER FEEL" },
  { title: "BRANDING", subcategory: "IDENTITY" },
  { title: "WEBFLOW", subcategory: "NO-CODE BUILDS" },
  { title: "ANIMATIONS", subcategory: "INTERACTION" },
  { title: "3D & MOTION", subcategory: "CINEMATICS" },
  { title: "UI/UX DESIGN", subcategory: "INTERFACES" },
  { title: "ADVERTISING", subcategory: "CAMPAIGNS" },
  { title: "SEO & CONTENT", subcategory: "RANKING" },
];

type CategoryScrollerProps = {
  galleryImages?: string[];
};

export function CategoryScroller({ galleryImages = DEFAULT_GALLERY_IMAGES }: CategoryScrollerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPixelsOpen, setIsPixelsOpen] = useState(false);
  const [mouseImageIndex, setMouseImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mousePop, setMousePop] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const pixelMouseImages = [galleryImageAt(galleryImages, 9), galleryImageAt(galleryImages, 10), galleryImageAt(galleryImages, 11)];
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const activeIndexRef = useRef(0);
  const lastMousePositionRef = useRef<{ x: number; y: number } | null>(null);
  const mouseDistanceRef = useRef(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    document.body.dataset.pixelsOpen = isPixelsOpen ? "true" : "false";

    if (!isPixelsOpen) {
      return () => {
        delete document.body.dataset.pixelsOpen;
      };
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.pixelsOpen;
    };
  }, [isPixelsOpen]);

  const handlePixelsMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const nextPosition = { x: event.clientX, y: event.clientY };
    const lastPosition = lastMousePositionRef.current;

    setMousePosition(nextPosition);

    if (!lastPosition) {
      lastMousePositionRef.current = nextPosition;
      return;
    }

    const distance = Math.hypot(nextPosition.x - lastPosition.x, nextPosition.y - lastPosition.y);
    mouseDistanceRef.current += distance;
    lastMousePositionRef.current = nextPosition;

    if (mouseDistanceRef.current >= 72) {
      mouseDistanceRef.current = 0;
      setMouseImageIndex((current) => (current + 1) % pixelMouseImages.length);
      setMousePop((current) => current + 1);
    }
  };

  useLayoutEffect(() => {
    let isMounted = true;

    const section = sectionRef.current;
    const list = listRef.current;
    const eyebrow = eyebrowRef.current;

    if (!section || !list || !eyebrow) return;

    const setup = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger);

    const itemDistance = () => {
      const firstItem = list.querySelector<HTMLElement>(".category-item");
      if (!firstItem) return 96;

      const styles = window.getComputedStyle(list);
      const gap = Number.parseFloat(styles.rowGap || "0");
      return firstItem.offsetHeight + gap;
    };

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${itemDistance() * (categories.length - 1)}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          onUpdate: (self) => {
            const nextIndex = Math.round(self.progress * (categories.length - 1));

            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex;
              setActiveIndex(nextIndex);
            }
          },
        },
      });

      timeline.fromTo(
        list,
        {
          y: 0,
        },
        {
        y: () => -itemDistance() * (categories.length - 1),
        },
      );

      timeline.to(
        eyebrow,
        {
          opacity: 0,
          y: -42,
          duration: 0.12,
        },
        0,
      );

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
    };
    };

    let cleanup: (() => void) | undefined;

    setup().then((teardown) => {
      cleanup = teardown;
    });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, []);

  return (
    <section
      className="categories"
      id="categories"
      aria-labelledby="categories-title"
      data-snap-section
      ref={sectionRef}
    >
      <div className="categories__sticky">
        <div
          className="categories__stage"
          style={{ "--active-index": activeIndex } as CSSProperties}
        >
          <p className="categories__eyebrow" id="categories-title" ref={eyebrowRef}>
            WHAT WE BUILD
          </p>

          <div className="categories__media" aria-hidden="true">
            {categories.map((category, index) => (
              <div
                className="category-card"
                data-active={activeIndex === index}
                data-variant={index + 1}
                key={category.title}
              >
                <img src={galleryImageAt(galleryImages, index)} alt="" />
              </div>
            ))}
          </div>

          <div className="categories__mask">
            <div className="categories__list" ref={listRef} role="list">
              {categories.map((category, index) => (
                <div
                  className="category-item"
                  data-active={activeIndex === index}
                  key={category.title}
                  role="listitem"
                >
                  <span className="category-item__inner">
                    <span>{category.title}</span>
                    <small>{category.subcategory}</small>
                  </span>
                </div>
              ))}
              <button
                className="see-all see-all--inline"
                type="button"
                onClick={() => {
                  lastMousePositionRef.current = null;
                  setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
                  setIsPixelsOpen(true);
                }}
              >
                SEE ALL
                <span aria-hidden="true">→</span>
              </button>
              <div
                className="brand-strip"
                aria-label="Selected partner brands"
                data-visible={activeIndex === categories.length - 1}
              >
                {[1, 2, 3, 4].map((logo) => (
                  <img alt="" key={logo} src={galleryImageAt(galleryImages, logo + 12)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMounted &&
        createPortal(
          <div
            className="pixels-page"
            data-open={isPixelsOpen}
            aria-hidden={!isPixelsOpen}
            onMouseMove={handlePixelsMouseMove}
          >
            <div className="pixels-page__panel" role="dialog" aria-modal="true" aria-labelledby="pixels-title">
              <button className="pixels-page__close" type="button" onClick={() => setIsPixelsOpen(false)}>
                CLOSE
              </button>
              <h2 className="pixels-page__title" id="pixels-title">
                <span>BEHIND</span>
                <span>THE PIXELS</span>
              </h2>
              <img
                alt=""
                className="pixels-page__cursor"
                data-pop={mousePop}
                key={mousePop}
                src={pixelMouseImages[mouseImageIndex]}
                style={{
                  left: mousePosition.x,
                  top: mousePosition.y,
                }}
              />
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
