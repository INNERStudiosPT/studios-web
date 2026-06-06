"use client";

import React from "react";

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  required?: boolean;
  variant?: "blue" | "green";
}

export default function Checkbox({ id, checked, onChange, label, required = false, variant = "blue" }: CheckboxProps) {
  const accentBg = variant === "green" ? "bg-[#128f65] border-[#128f65]" : "bg-blue-600 border-blue-600";
  const glow = variant === "green" ? "shadow-[0_0_10px_rgba(18,143,101,0.4)]" : "shadow-[0_0_10px_rgba(37,99,235,0.4)]";
  const borderHover = variant === "green" ? "hover:border-emerald-400" : "hover:border-blue-400";

  return (
    <div className="flex items-start gap-3 select-none pl-1 group">
      <div className="relative flex items-center justify-center shrink-0 mt-0.5">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required={required}
          className="peer sr-only"
        />
        <button
          type="button"
          onClick={() => onChange(!checked)}
          className={`w-5 h-5 rounded-md border-2 transition-all duration-300 flex items-center justify-center ${
            checked
              ? `${accentBg} ${glow}`
              : `border-slate-700 bg-white/5 ${borderHover}`
          }`}
          aria-checked={checked}
          role="checkbox"
        >
          <svg
            className={`w-3.5 h-3.5 text-white transition-transform duration-300 transform ${
              checked ? "scale-100" : "scale-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
      <label
        htmlFor={id}
        className="text-slate-300 text-[12px] leading-relaxed cursor-pointer group-hover:text-white transition-colors"
      >
        {label}
      </label>
    </div>
  );
}
