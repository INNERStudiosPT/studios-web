"use client";

import { useSearchParams } from "next/navigation";
import { ContactNavLink } from "@/components/ContactNavLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FormEvent, useState, Suspense } from "react";

function ApplyForm() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  
  const formattedRole = roleParam 
    ? roleParam.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
    : "General Application";

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", marginTop: "4rem", textAlign: "center", minHeight: "50vh" }}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "2rem", textTransform: "uppercase", fontWeight: 900 }}>Application Received</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "3rem" }}>
          Thank you for applying to the <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>{formattedRole}</span> position.
          Our team will review your profile and get back to you soon.
        </p>
        <a href="/careers" style={{ display: "inline-block", padding: "1rem 2rem", background: "var(--text-primary)", color: "var(--background)", fontWeight: 800, letterSpacing: "0.1em" }}>
          BACK TO CAREERS
        </a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", marginTop: "4rem" }}>
      <a href="/careers" style={{ display: "inline-block", marginBottom: "2rem", color: "var(--text-secondary)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em" }}>
        &larr; BACK TO OPEN POSITIONS
      </a>
      <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", marginBottom: "0.5rem", textTransform: "uppercase", fontWeight: 900, lineHeight: 1 }}>Apply Now</h1>
      <h2 style={{ fontSize: "1.2rem", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "3rem" }}>
        Position: <span style={{ color: "var(--text-primary)" }}>{formattedRole}</span>
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "2.5rem" }}>
        <div style={{ display: "grid", gap: "0.8rem" }}>
          <label htmlFor="name" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-secondary)" }}>FULL NAME</label>
          <input 
            required 
            id="name" 
            type="text" 
            placeholder="JOHN DOE"
            style={{ 
              width: "100%", padding: "1rem", background: "transparent", border: "1px solid color-mix(in srgb, var(--text-primary) 20%, transparent)", 
              color: "var(--text-primary)", fontFamily: "inherit", fontSize: "1.2rem", fontWeight: 800, textTransform: "uppercase", outline: "none"
            }} 
          />
        </div>

        <div style={{ display: "grid", gap: "0.8rem" }}>
          <label htmlFor="email" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-secondary)" }}>EMAIL ADDRESS</label>
          <input 
            required 
            id="email" 
            type="email" 
            placeholder="JOHN@EXAMPLE.COM"
            style={{ 
              width: "100%", padding: "1rem", background: "transparent", border: "1px solid color-mix(in srgb, var(--text-primary) 20%, transparent)", 
              color: "var(--text-primary)", fontFamily: "inherit", fontSize: "1.2rem", fontWeight: 800, textTransform: "uppercase", outline: "none"
            }} 
          />
        </div>

        <div style={{ display: "grid", gap: "0.8rem" }}>
          <label htmlFor="portfolio" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-secondary)" }}>PORTFOLIO / GITHUB / LINKEDIN</label>
          <input 
            required 
            id="portfolio" 
            type="url" 
            placeholder="HTTPS://..."
            style={{ 
              width: "100%", padding: "1rem", background: "transparent", border: "1px solid color-mix(in srgb, var(--text-primary) 20%, transparent)", 
              color: "var(--text-primary)", fontFamily: "inherit", fontSize: "1.2rem", fontWeight: 800, textTransform: "uppercase", outline: "none"
            }} 
          />
        </div>

        <div style={{ display: "grid", gap: "0.8rem" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-secondary)" }}>RESUME / CV (PDF, DOCX)</span>
          <label 
            htmlFor="resume" 
            style={{ 
              width: "100%", padding: "1.5rem 1rem", background: "color-mix(in srgb, var(--text-primary) 2%, transparent)", border: "1px dashed color-mix(in srgb, var(--text-primary) 30%, transparent)", 
              color: fileName ? "var(--text-primary)" : "var(--text-secondary)", fontFamily: "inherit", fontSize: "1rem", fontWeight: 800, textTransform: "uppercase", cursor: "pointer",
              textAlign: "center", transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "color-mix(in srgb, var(--text-primary) 6%, transparent)"}
            onMouseOut={(e) => e.currentTarget.style.background = "color-mix(in srgb, var(--text-primary) 2%, transparent)"}
          >
            {fileName || "+ BROWSE FILE"}
          </label>
          <input 
            required 
            id="resume" 
            type="file" 
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ opacity: 0, position: "absolute", zIndex: -1, width: "1px", height: "1px" }} 
          />
        </div>

        <div style={{ display: "grid", gap: "0.8rem" }}>
          <label htmlFor="message" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-secondary)" }}>WHY INNER STUDIOS?</label>
          <textarea 
            required 
            id="message" 
            rows={4}
            placeholder="TELL US ABOUT YOURSELF AND WHY YOU'D BE A GREAT FIT."
            style={{ 
              width: "100%", padding: "1rem", background: "transparent", border: "1px solid color-mix(in srgb, var(--text-primary) 20%, transparent)", 
              color: "var(--text-primary)", fontFamily: "inherit", fontSize: "1.2rem", fontWeight: 800, textTransform: "uppercase", outline: "none", resize: "vertical"
            }} 
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            marginTop: "1rem", padding: "1.5rem", background: "var(--text-primary)", color: "var(--background)", 
            border: "none", cursor: isSubmitting ? "wait" : "pointer", fontSize: "1.2rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em",
            transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)", opacity: isSubmitting ? 0.7 : 1, transform: isSubmitting ? "scale(0.98)" : "scale(1)"
          }}
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION \u2192"}
        </button>
      </form>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <main className="site-shell" style={{ padding: "8rem 2rem", minHeight: "100vh" }}>
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="INNER Studios home">
          INNER STUDIOS
        </a>

        <div className="nav-actions">
          <ThemeToggle />
          <ContactNavLink className="talk-link">
            LET&apos;S TALK
          </ContactNavLink>
        </div>
      </nav>

      <Suspense fallback={<div style={{ textAlign: "center", marginTop: "10rem", fontSize: "2rem" }}>LOADING...</div>}>
        <ApplyForm />
      </Suspense>
    </main>
  );
}
