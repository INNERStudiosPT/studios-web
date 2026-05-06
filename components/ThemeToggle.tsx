"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={isDark ? "Switch to white mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={() => setIsDark((current) => !current)}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__orb" />
      </span>
    </button>
  );
}
