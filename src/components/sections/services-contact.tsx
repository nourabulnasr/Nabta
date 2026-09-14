import { content, type Locale } from "@/content";

export function ServicesContact({ locale }: { locale: Locale }) {
  const pending = !content.contact.emailUrl || !content.contact.whatsappUrl;
  return (
    <section id="contact" className="section-shell section-contact page-gutter" aria-labelledby="contact-title">
      <h2 id="contact-title">{content.sections.contact.title[locale]}</h2>
      <div className="contact-identity">
        <h3 className="contact-brand">{content.brand.name[locale]}</h3>
        <p>{content.sections.contact.body[locale]}</p>
      </div>
      <dl className="service-list">
        {content.contact.services.map((service) => (
          <div key={service.title.en}><dt>{service.title[locale]}</dt><dd>{service.body[locale]}</dd></div>
        ))}
      </dl>
      <div className="contact-details">
        <p className="contact-invitation">{content.contact.invitation[locale]}</p>
        <dl className="contact-channels">
          <div><dt>{content.contact.emailLabel[locale]}</dt><dd>
            {content.contact.emailUrl ? <a href={content.contact.emailUrl}><bdi>{content.contact.email[locale]}</bdi></a> : <bdi>{content.contact.email[locale]}</bdi>}
          </dd></div>
          <div><dt>{content.contact.whatsappLabel[locale]}</dt><dd>
            {content.contact.whatsappUrl ? <a href={content.contact.whatsappUrl}><bdi dir="ltr">{content.contact.whatsapp[locale]}</bdi></a> : <bdi dir="ltr">{content.contact.whatsapp[locale]}</bdi>}
          </dd></div>
        </dl>
        {pending && <p className="small-note">{content.contact.placeholderNote[locale]}</p>}
      </div>
    </section>
  );
}
