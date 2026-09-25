import { content, type Locale } from "@/content";
import { HorizontalWork } from "@/components/motion/horizontal-work";
import Image from "next/image";
import { visualWork } from "@/lib/visual-work";

const websiteIds = ["elserafy", "royal-falcon", "sea-moss", "palermo"];

export function SelectedWork({ locale }: { locale: Locale }) {
  return (
    <><HorizontalWork rtl={locale === "ar"} hint={content.work.scrollHint[locale]} label={content.work.navigationLabel[locale]} heading={
      <div className="work-heading" data-reveal>
        <h2 id="work-title">{locale === "ar" ? "الذكاء الاصطناعي والبرمجيات" : "AI & Software"}</h2>
        <p>{locale === "ar" ? "أنظمة ووكلاء وأدوات. اكتشف المشاريع والكود وراءها." : "Systems, agents and tools. Explore the projects and the code behind them."}</p>
      </div>}>
        {content.work.projects.filter(project => !websiteIds.includes(project.id)).map((project) => (
          <article className="project-entry" key={project.id} aria-labelledby={`${project.id}-title`}>
            <span className="project-category">{project.category[locale]}</span>
            <h3 id={`${project.id}-title`}><bdi>{project.title[locale]}</bdi></h3>
            <p>{project.summary[locale]}</p>
            {project.url ? (
              <a className="text-link" href={project.url} aria-labelledby={`${project.id}-link ${project.id}-title`}>
                <span id={`${project.id}-link`}>{content.work.view[locale]}</span><span aria-hidden="true">↗</span>
              </a>
            ) : <span className="pending-link">{content.work.pending[locale]}</span>}
          </article>
        ))}
    </HorizontalWork>
    <section id="websites" className="website-section page-gutter" aria-labelledby="websites-title">
      <div className="work-heading"><h2 id="websites-title">{locale === "ar" ? "المواقع الإلكترونية" : "Websites"}</h2>
        <p>{locale === "ar" ? "واجهات لشركات وعلامات تجارية. من أول انطباع لآخر تفصيلة." : "Digital homes for businesses and brands. From the first impression to the final detail."}</p></div>
      <div className="website-showcase">{content.work.projects.filter(project => websiteIds.includes(project.id)).map(project => <article className="website-entry" key={project.id}>
        <a className="website-preview" href={project.url!} aria-label={`${locale === "ar" ? "زيارة" : "Visit"} ${project.title[locale]}`}>
          <Image src={`/images/websites/${project.id}.jpg`} alt={locale === "ar" ? `الصفحة الرئيسية — ${project.title[locale]}` : `${project.title[locale]} homepage`} width={1440} height={1000} sizes="(min-width: 768px) 65vw, 90vw" />
        </a>
        <div className="website-description"><h3>{project.title[locale]}</h3><p>{project.summary[locale]}</p><a className="text-link" href={project.url!}>{locale === "ar" ? "زيارة الموقع" : "Visit website"} ↗</a></div>
      </article>)}</div>
    </section>
    <section id="ai-visuals" className="visuals-section page-gutter" aria-labelledby="ai-visuals-title">
      <div className="work-heading"><h2 id="ai-visuals-title">{locale === "ar" ? "إبداع بصري بالذكاء الاصطناعي" : "AI Visuals"}</h2>
        <p>{locale === "ar" ? "صور وأفلام للعلامات التجارية، برؤية وإخراج إبداعي." : "Images and films for brands, shaped by creative direction."}</p></div>
      {visualWork.length ? <div className="visual-work-gallery">{visualWork.map(item => <figure key={item.id}>
        {item.kind === "image" ? <Image src={item.src} alt={item.title[locale]} width={item.width} height={item.height} sizes="(min-width: 768px) 45vw, 90vw" /> :
          <video controls playsInline preload="none" poster={item.poster} width={item.width} height={item.height} aria-label={item.title[locale]}>
            <source src={item.src} /><track kind="captions" src={item.captions} srcLang={item.captionLanguage} label={item.captionLanguage} />
          </video>}
        <figcaption><span>{item.brand}</span><h3>{item.title[locale]}</h3></figcaption>
      </figure>)}</div> : <p className="visuals-pending">{locale === "ar" ? "مجموعة مختارة من الأعمال قريبًا." : "Selected brand work coming soon."}</p>}
      <a className="text-link" href="#contact">{locale === "ar" ? "لنتحدث عن علامتك التجارية" : "Let’s talk about your brand"} ↗</a>
    </section></>
  );
}
