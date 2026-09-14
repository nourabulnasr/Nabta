import { content, type Locale } from "@/content";

export function SelectedWork({ locale }: { locale: Locale }) {
  return (
    <section id="work" className="section-shell section-work page-gutter" aria-labelledby="work-title">
      <div className="work-heading">
        <h2 id="work-title">{content.sections.work.title[locale]}</h2>
        <p>{content.sections.work.body[locale]}</p>
      </div>
      <div className="project-grid">
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
      </div>
    </section>
  );
}
