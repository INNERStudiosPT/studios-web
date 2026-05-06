import { CategoryScroller } from "@/components/CategoryScroller";
import { ContactLauncher } from "@/components/ContactLauncher";
import { LisbonClock } from "@/components/LisbonClock";
import { SectionSnap } from "@/components/SectionSnap";
import { SiteNavbar } from "@/components/SiteNavbar";
import { StretchWord } from "@/components/StretchWord";

export default function Home() {
  return (
    <main className="site-shell">
      <SectionSnap />

      <SiteNavbar brandHref="#hero" />

      <div className="bottom-bar" aria-label="Studio information">
        <p>COPYRIGHT 2026 INNER STUDIOS</p>
        <p>
          LISBON, PORTUGAL <LisbonClock />
        </p>
      </div>

      <section className="hero" id="hero" aria-labelledby="hero-title" data-snap-section>
        <div className="hero__ambient hero__ambient--left" aria-hidden="true" />
        <div className="hero__ambient hero__ambient--right" aria-hidden="true" />

        <h1 className="hero__title" id="hero-title">
          <span>
            <span>#WEARE</span>
          </span>
          <span>
            <span>INNER</span>
          </span>
        </h1>
      </section>

      <section
        className="manifesto"
        id="manifesto"
        aria-labelledby="manifesto-title"
        data-snap-section
      >
        <div className="manifesto__inner">
          <p className="manifesto__kicker" id="manifesto-title">
            THE BIGGEST PORTUGUESE GAMES STUDIO
          </p>
          <blockquote className="manifesto__quote">
            &quot;ITS NEVER JUST A VIDEOGAME, ITS INNER. OUR{" "}
            <span className="obsession-pop">
              OBCESSION
              <span className="obsession-pop__images" aria-hidden="true">
                <img
                  alt=""
                  src="https://www.exitlag.com/blog/wp-content/uploads/2024/12/Exploring-the-Best-FiveM-Servers-for-GTA-V_-A-Server-List-Guide.webp"
                />
                <img
                  alt=""
                  src="https://www.exitlag.com/blog/wp-content/uploads/2024/12/Exploring-the-Best-FiveM-Servers-for-GTA-V_-A-Server-List-Guide.webp"
                />
                <img
                  alt=""
                  src="https://www.exitlag.com/blog/wp-content/uploads/2024/12/Exploring-the-Best-FiveM-Servers-for-GTA-V_-A-Server-List-Guide.webp"
                />
              </span>
            </span>
            .&quot;
          </blockquote>
        </div>
      </section>

      <CategoryScroller />

      <section className="work-section" aria-labelledby="work-title">
        <div className="work-section__title-wrap">
          <h2 className="work-section__title" id="work-title">
            <span>LET&apos;S WORK</span>
            <span>
              <img
                alt=""
                src="https://images-cdn1.welcomesoftware.com/Zz01NjJjMzQ1MDdjOTExMWVlODQwMmUyNTlkYThlNTFlNA==?width=584&height=390"
              />
              TOGETHER
            </span>
          </h2>
        </div>

        <div className="work-section__copy">
          <p>
            Work with us if average isn&apos;t your thing.
            <br />
            Drop it, we&apos;ll build it!
          </p>
          <ContactLauncher />
        </div>

        <section className="news-strip" aria-labelledby="news-title">
          <p className="news-strip__label" id="news-title">
            NEWS
          </p>
          {[
            ["01", "INNER OPENS NEW GAMEPLAY LAB"],
            ["02", "PROTO BUILDS FOR UNANNOUNCED WORLDS"],
            ["03", "MOTION SYSTEMS FOR PLAYER FEEL"],
            ["04", "BRANDING THAT WORKS IN-GAME"],
            ["05", "PORTUGUESE TALENT, GLOBAL SERVERS"],
            ["06", "BEHIND THE PIXELS ARCHIVE"],
          ].map(([number, title]) => (
            <a href="/news" className="news-card" key={number} aria-label={`Read more about ${title}`}>
              <div className="news-card__image">
                <img src={`/news/${number}.png`} alt={title} />
              </div>
            </a>
          ))}
        </section>

        <footer className="work-footer" aria-label="Footer navigation">
          <nav className="work-footer__nav" aria-label="Footer links">
            <a href="#hero">HOME</a>
            <a href="#categories">WORK</a>
            <a href="#categories">SERVICES</a>
            <a href="#manifesto">STUDIO</a>
            <a href="/careers">WORK WITH US</a>
            <a href="#categories">APPROACH</a>
            <a href="#categories">NEWS</a>
            <span aria-hidden="true" />
            <a href="https://www.linkedin.com/company/innerstudios-gaming/">LINKEDIN</a>
            <a href="https://www.instagram.com/innercircle.roleplay">INSTAGRAM</a>
            <a href="/legal">LEGAL</a>
            <a href="/">SITE EM PORTUGUES</a>
          </nav>

          <div className="work-footer__info">
            <p>WE ARE A VIDEOGAME PROGRAMMING STUDIO BASED IN LISBON, PORTUGAL.</p>
            <p>BIG PROJECT? CRAZY THOUGHT? OR JUST FEEL LIKE CHATTING?</p>
            <p>
              LET&apos;S TALK! <span aria-hidden="true">●</span>
            </p>
            <a href="mailto:hello@innerstudios.com">HELLO@INNERSTUDIOS.COM</a>
            <p>
              COPYRIGHT 2026
              <br />
              INNER STUDIOS
            </p>
          </div>
        </footer>
      </section>

      <StretchWord />
    </main>
  );
}
