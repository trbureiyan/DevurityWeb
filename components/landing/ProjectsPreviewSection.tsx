import Link from "next/link";
import { STAGE_LABELS, STAGE_COLORS } from "@/hooks/useProjects";
import { getProjectsCatalog, type ProjectItem } from "@/lib/data/projects";

// Muestra los 3 proyectos más recientes en el landing
export default async function ProjectsPreviewSection() {
  let allProjects: ProjectItem[];
  try {
    allProjects = await getProjectsCatalog();
  } catch {
    // Si la DB no está disponible o el schema está desincronizado,
    // degradar a lista vacía para que el build estático no aborte.
    allProjects = [];
  }

  const sorted = [...allProjects].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  const featured = sorted.slice(0, 3);

  return (
    <section className="relative py-20 lg:py-28 bg-variable-collection-fondo overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="font-ubuntu text-xs uppercase tracking-[0.3em] text-variable-collection-link">
              Proyectos activos
            </span>
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white">
              Portafolio
              <div className="h-1 w-16 mt-2 bg-[#b20403]" />
            </h2>
            <p className="font-ubuntu text-white/50 max-w-md">
              Las iniciativas más recientes del semillero.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-red-500/50 text-white/80 hover:text-white px-6 py-3 rounded-full font-ubuntu text-sm uppercase tracking-wider transition-all hover:bg-red-600/10 flex-shrink-0"
          >
            Ver todos
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((project) => (
            <article
              key={project.id}
              className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-black/40 px-6 pb-6 pt-8 transition hover:border-variable-collection-link/60 hover:shadow-[0_25px_60px_-30px_rgba(202,43,38,0.35)]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className={`text-xs font-ubuntu uppercase tracking-wider border px-3 py-1 rounded-full ${STAGE_COLORS[project.stage]}`}>
                    {STAGE_LABELS[project.stage]}
                  </span>
                </div>

                <h3 className="font-orbitron text-xl text-white group-hover:text-variable-collection-link transition-colors line-clamp-2">
                  {project.title}
                </h3>
                <p className="font-ubuntu text-sm text-white/60 line-clamp-3">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.focusAreas.slice(0, 3).map((area) => (
                    <span key={area} className="rounded-full border border-white/10 px-3 py-1 text-xs font-ubuntu text-white/60">
                      #{area}
                    </span>
                  ))}
                </div>
              </div>

              {project.callToAction && (
                <div className="pt-5">
                  <Link
                    href={project.callToAction.href}
                    target={project.callToAction.href.startsWith("http") ? "_blank" : undefined}
                    rel={project.callToAction.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 text-sm font-ubuntu text-variable-collection-link transition group-hover:translate-x-1"
                  >
                    {project.callToAction.label}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}