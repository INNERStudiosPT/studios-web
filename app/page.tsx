import { CategoryScroller } from "@/components/CategoryScroller";
import { ContactLauncher } from "@/components/ContactLauncher";
import { LisbonClock } from "@/components/LisbonClock";
import { SectionSnap } from "@/components/SectionSnap";
import { SiteNavbar } from "@/components/SiteNavbar";
import { StretchWord } from "@/components/StretchWord";
import { fetchGalleryImages, galleryImageAt, toGalleryUrls } from "@/lib/gallery";
import { fetchLatestNews } from "@/lib/news";

export default async function Home() {
  const [latestNews, galleryImages] = await Promise.all([
    fetchLatestNews().catch(() => []),
    fetchGalleryImages().catch(() => []),
  ]);
  const galleryUrls = toGalleryUrls(galleryImages);

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
                  src={galleryImageAt(galleryUrls, 0)}
                />
                <img
                  alt=""
                  src={galleryImageAt(galleryUrls, 1)}
                />
                <img
                  alt=""
                  src={galleryImageAt(galleryUrls, 2)}
                />
              </span>
            </span>
            .&quot;
          </blockquote>
        </div>
      </section>

      <CategoryScroller galleryImages={galleryUrls} />

      <section className="work-section" aria-labelledby="work-title">
        <div className="work-section__title-wrap">
          <h2 className="work-section__title" id="work-title">
            <span>LET&apos;S WORK</span>
            <span>
              <img
                alt=""
                src={galleryImageAt(galleryUrls, 3)}
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
          <ContactLauncher imageUrl={galleryImageAt(galleryUrls, 4)} />
        </div>

        <section className="news-strip" aria-labelledby="news-title">
          <p className="news-strip__label" id="news-title">
            NEWS
          </p>
          {latestNews.map((item, index) => (
            <a href="/news" className="news-card" key={item.id} aria-label={`Read more about ${item.title}`}>
              <div className="news-card__image">
                <img src={galleryImageAt(galleryUrls, index + 5)} alt={item.title} />
              </div>
              <div className="news-card__content">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
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
