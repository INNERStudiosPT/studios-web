import { ContactNavLink } from "@/components/ContactNavLink";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function CareersPage() {
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

      <div style={{ maxWidth: "800px", margin: "0 auto", marginTop: "4rem" }}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "2rem", textTransform: "uppercase", fontWeight: 900 }}>Join The Team</h1>
        
        <div style={{ lineHeight: 1.6, fontSize: "1rem", color: "var(--text-secondary)" }}>
          <p style={{ marginBottom: "2.5rem", fontSize: "1.1rem" }}>
            We are always on the lookout for talented individuals to join INNER STUDIOS. If you&apos;re passionate about gaming, design, and pushing boundaries, we want to hear from you.
          </p>
          
          <h2 style={{ fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem", color: "var(--text-primary)", textTransform: "uppercase" }}>Open Positions</h2>
          
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <div style={{ padding: "1.5rem", border: "1px solid color-mix(in srgb, var(--text-primary) 10%, transparent)", background: "color-mix(in srgb, var(--text-primary) 2%, transparent)" }}>
              <h3 style={{ margin: 0, fontSize: "1.2rem", color: "var(--text-primary)", textTransform: "uppercase" }}>Senior Game Designer</h3>
              <p style={{ margin: "0.5rem 0 1rem", fontSize: "0.9rem" }}>Lisbon, Portugal / Hybrid</p>
              <a href="/careers/apply?role=senior-game-designer" style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em" }}>APPLY NOW &rarr;</a>
            </div>

            <div style={{ padding: "1.5rem", border: "1px solid color-mix(in srgb, var(--text-primary) 10%, transparent)", background: "color-mix(in srgb, var(--text-primary) 2%, transparent)" }}>
              <h3 style={{ margin: 0, fontSize: "1.2rem", color: "var(--text-primary)", textTransform: "uppercase" }}>Web3 & UI Developer</h3>
              <p style={{ margin: "0.5rem 0 1rem", fontSize: "0.9rem" }}>Remote</p>
              <a href="/careers/apply?role=web3-ui-developer" style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em" }}>APPLY NOW &rarr;</a>
            </div>
            
            <div style={{ padding: "1.5rem", border: "1px solid color-mix(in srgb, var(--text-primary) 10%, transparent)", background: "color-mix(in srgb, var(--text-primary) 2%, transparent)" }}>
              <h3 style={{ margin: 0, fontSize: "1.2rem", color: "var(--text-primary)", textTransform: "uppercase" }}>3D Motion Artist</h3>
              <p style={{ margin: "0.5rem 0 1rem", fontSize: "0.9rem" }}>Lisbon, Portugal</p>
              <a href="/careers/apply?role=3d-motion-artist" style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em" }}>APPLY NOW &rarr;</a>
            </div>
          </div>
          
          <p style={{ marginTop: "4rem", fontSize: "0.9rem" }}>
            Don&apos;t see a role that fits? Send us your portfolio at <a href="mailto:careers@innerstudios.com" style={{ color: "var(--text-primary)", textDecoration: "underline" }}>careers@innerstudios.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}
