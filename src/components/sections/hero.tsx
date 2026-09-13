import { content, type Locale } from "@/content";

export function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="hero page-gutter" aria-labelledby="hero-title">
      <div className="hero-intro">
        <span className="hero-descriptor">{content.brand.descriptor[locale]}</span>
        <span className="hero-location">{content.brand.location[locale]}</span>
      </div>
      <div className="hero-body">
        <h1 id="hero-title" className="hero-wordmark">{content.hero.title[locale]}</h1>
        {content.hero.body[locale] && <p>{content.hero.body[locale]}</p>}
      </div>
      <div className="hero-bottom">
        <span className="hero-rule" aria-hidden="true" />
        <a href="#about" className="explore-link">
          {content.hero.explore[locale]} <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
