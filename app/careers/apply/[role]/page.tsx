"use client";

import { SiteNavbar } from "@/components/SiteNavbar";
import { CareerJob, findJobBySlug, formatRoleSlug } from "@/lib/careers";
import "../../globals.css";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, Suspense, useEffect, useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "1rem",
  background: "transparent",
  border: "1px solid color-mix(in srgb, var(--text-primary) 20%, transparent)",
  color: "var(--text-primary)",
  fontFamily: "inherit",
  fontSize: "1.2rem",
  fontWeight: 800,
  textTransform: "uppercase",
  outline: "none",
} as const;

const fieldStyle = { display: "grid", gap: "0.8rem" } as const;

const labelStyle = {
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  color: "var(--text-secondary)",
} as const;

function ApplyForm() {
  const params = useParams<{ role?: string }>();
  const [jobs, setJobs] = useState<CareerJob[]>([]);
  const [jobsError, setJobsError] = useState("");
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");
  const [discoverySource, setDiscoverySource] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadJobs() {
      setIsLoadingJobs(true);
      setJobsError("");

      try {
        const response = await fetch("/api/careers/jobs", { cache: "no-store" });
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Failed to load jobs");
        }

        if (!ignore) setJobs(result.data || []);
      } catch (error) {
        if (!ignore) {
          setJobsError(error instanceof Error ? error.message : "Failed to load jobs");
        }
      } finally {
        if (!ignore) setIsLoadingJobs(false);
      }
    }

    loadJobs();

    return () => {
      ignore = true;
    };
  }, []);

  const selectedJob = findJobBySlug(jobs, params.role);
  const formattedRole = selectedJob?.title || formatRoleSlug(params.role);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/careers/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedJob?.id || null,
          roleSlug: params.role,
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          portfolio: formData.get("portfolio"),
          discoverySource: formData.get("discoverySource"),
          referralEmail: formData.get("referralEmail"),
          discoveryOther: formData.get("discoveryOther"),
          message: formData.get("message"),
          resumeFileName: fileName,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit application");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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

      {isLoadingJobs && (
        <p style={{ marginTop: "-2rem", marginBottom: "2rem", color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Loading live role data...
        </p>
      )}

      {jobsError && (
        <p style={{ marginTop: "-2rem", marginBottom: "2rem", color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Could not load role details. Please try again later.
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "2.5rem" }}>
        <div style={fieldStyle}>
          <label htmlFor="name" style={labelStyle}>FULL NAME</label>
          <input required id="name" name="name" type="text" placeholder="JOHN DOE" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="email" style={labelStyle}>EMAIL ADDRESS</label>
          <input required id="email" name="email" type="email" placeholder="JOHN@EXAMPLE.COM" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="phone" style={labelStyle}>PHONE NUMBER</label>
          <input required id="phone" name="phone" type="tel" placeholder="+351 900 000 000" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="portfolio" style={labelStyle}>PORTFOLIO / GITHUB / LINKEDIN</label>
          <input required id="portfolio" name="portfolio" type="url" placeholder="HTTPS://..." style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="discoverySource" style={labelStyle}>WHERE DID YOU FIND THIS ROLE?</label>
          <select
            required
            id="discoverySource"
            name="discoverySource"
            value={discoverySource}
            onChange={(e) => setDiscoverySource(e.target.value)}
            style={inputStyle}
          >
            <option value="" disabled>SELECT AN OPTION</option>
            <option value="job-portals">Job Boards</option>
            <option value="search">Search</option>
            <option value="inner-referral">I know someone at INNER Studios</option>
            <option value="worked-at-inner">I have worked at INNER Studios before</option>
            <option value="other">Other</option>
          </select>
        </div>

        {discoverySource === "inner-referral" && (
          <div style={fieldStyle}>
            <label htmlFor="referralEmail" style={labelStyle}>EMAIL OF THE PERSON YOU KNOW AT INNER STUDIOS</label>
            <input required id="referralEmail" name="referralEmail" type="email" placeholder="NAME@INNERSTUDIOS.COM" style={inputStyle} />
          </div>
        )}

        {discoverySource === "other" && (
          <div style={fieldStyle}>
            <label htmlFor="discoveryOther" style={labelStyle}>OTHER, PLEASE DESCRIBE</label>
            <input required id="discoveryOther" name="discoveryOther" type="text" placeholder="TELL US WHERE YOU FOUND THE ROLE" style={inputStyle} />
          </div>
        )}

        <div style={fieldStyle}>
          <span style={labelStyle}>RESUME / CV (PDF, DOCX)</span>
          <label
            htmlFor="resume"
            style={{
              width: "100%",
              padding: "1.5rem 1rem",
              background: "color-mix(in srgb, var(--text-primary) 2%, transparent)",
              border: "1px dashed color-mix(in srgb, var(--text-primary) 30%, transparent)",
              color: fileName ? "var(--text-primary)" : "var(--text-secondary)",
              fontFamily: "inherit",
              fontSize: "1rem",
              fontWeight: 800,
              textTransform: "uppercase",
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "color-mix(in srgb, var(--text-primary) 6%, transparent)"}
            onMouseOut={(e) => e.currentTarget.style.background = "color-mix(in srgb, var(--text-primary) 2%, transparent)"}
          >
            {fileName || "+ BROWSE FILE"}
          </label>
          <input
            required
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ opacity: 0, position: "absolute", zIndex: -1, width: "1px", height: "1px" }}
          />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="message" style={labelStyle}>WHY INNER STUDIOS?</label>
          <textarea
            required
            id="message"
            name="message"
            rows={4}
            placeholder="TELL US ABOUT YOURSELF AND WHY YOU'D BE A GREAT FIT."
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        {submitError && (
          <p role="alert" style={{ margin: 0, color: "var(--text-primary)", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || isLoadingJobs || !selectedJob}
          style={{
            marginTop: "1rem",
            padding: "1.5rem",
            background: "var(--text-primary)",
            color: "var(--background)",
            border: "none",
            cursor: isSubmitting ? "wait" : "pointer",
            fontSize: "1.2rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
            opacity: isSubmitting || isLoadingJobs || !selectedJob ? 0.7 : 1,
            transform: isSubmitting ? "scale(0.98)" : "scale(1)",
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
      <SiteNavbar />

      <Suspense fallback={<div style={{ textAlign: "center", marginTop: "10rem", fontSize: "2rem" }}>LOADING...</div>}>
        <ApplyForm />
      </Suspense>
    </main>
  );
}
