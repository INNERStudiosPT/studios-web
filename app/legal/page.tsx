import { SiteNavbar } from "@/components/SiteNavbar";

export default function LegalPage() {
  return (
    <main className="site-shell" style={{ padding: "8rem 2rem", minHeight: "100vh" }}>
      <SiteNavbar />

      <div style={{ maxWidth: "800px", margin: "0 auto", marginTop: "4rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "2rem", textTransform: "uppercase", fontWeight: 900 }}>Legal & Privacy Policy</h1>
        
        <div style={{ lineHeight: 1.6, fontSize: "1rem", color: "var(--text-secondary)" }}>
          <p style={{ marginBottom: "1.5rem" }}>
            This is a placeholder for the legal and privacy policy of INNER STUDIOS.
            All content, trademarks, and data provided on this site are the property of INNER STUDIOS.
          </p>
          
          <h2 style={{ fontSize: "1.5rem", marginTop: "2.5rem", marginBottom: "1rem", color: "var(--text-primary)" }}>1. Terms of Service</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            By using this website, you agree to our terms of service. We reserve the right to modify these terms at any time without prior notice.
          </p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2.5rem", marginBottom: "1rem", color: "var(--text-primary)" }}>2. Privacy Policy</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            We respect your privacy and are committed to protecting your personal data. Any information collected through contact forms is used solely for the purpose of communicating with you regarding your inquiry.
          </p>
          
          <p style={{ marginTop: "3rem", fontSize: "0.85rem" }}>
            Last updated: May 2026
          </p>
        </div>
      </div>
    </main>
  );
}
