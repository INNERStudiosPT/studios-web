import { ContactNavLink } from "@/components/ContactNavLink";
import { ThemeToggle } from "@/components/ThemeToggle";

type SiteNavbarProps = {
  brandHref?: string;
};

export function SiteNavbar({ brandHref = "/" }: SiteNavbarProps) {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <a className="brand" href={brandHref} aria-label="INNER Studios home">
        INNER STUDIOS
      </a>

      <div className="nav-actions">
        <ThemeToggle />
        <a className="talk-link" href="/careers">
          CAREERS
        </a>
        <ContactNavLink className="talk-link">
          LET&apos;S TALK
        </ContactNavLink>
      </div>
    </nav>
  );
}
