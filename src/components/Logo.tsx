import React from "react";

type LogoProps = {
  className?: string;
};

/**
 * Text-based brand logo. Always renders "stratacoms" in Comfortaa bold.
 * Sizing and color are controlled by the caller via `className`.
 */
export default function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`font-[family-name:var(--font-comfortaa)] font-bold tracking-tight select-none ${className}`}
    >
      stratacoms
    </span>
  );
}
