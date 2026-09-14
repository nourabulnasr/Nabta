import { content, type Locale } from "@/content";
import { HorizontalWork } from "@/components/motion/horizontal-work";

export function SelectedWork({ locale }: { locale: Locale }) {
  return (
    <HorizontalWork rtl={locale === "ar"} hint={content.work.scrollHint[locale]} label={content.work.navigationLabel[locale]} heading={
      <div className="work-heading" data-reveal>
        <h2 id="work-title">{content.sections.work.title[locale]}</h2>
        <p>{content.sections.work.body[locale]}</p>
      </div>}>
        {content.work.projects.map((project) => (
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
  );
}
