"use client";

export function ContactNavLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button
      className={className}
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-contact"))}
    >
      {children}
    </button>
  );
}
