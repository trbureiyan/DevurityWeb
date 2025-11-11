import Link from "next/link";
import type { Metadata } from "next";
import { getProjectsCatalog, getProjectsFilters } from "@/lib/data/projects";
import { siteIcons } from "@/lib/constants/metadata";

// Revalidar cada 6 horas (60 min * 60 seg * 6) -> crontab: 0 */6 * * *
export const revalidate = 21600;

// Mapeo de etapas a sus etiquetas legibles
const projectDateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const formatProjectDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return projectDateFormatter.format(date);
};

// Metadata para SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Proyectos en curso | Devurity",
    description:
      "Explora los proyectos de investigación aplicada, desarrollo y ciberseguridad que el semillero Devurity tiene activos.",
    icons: siteIcons,
  };
}

export default async function ProjectsPage() {
  // Obtener proyectos y filtros en paralelo
  const [projects, filters] = await Promise.all([
    getProjectsCatalog(),
    getProjectsFilters(),
  ]);
  const currentYear = new Date().getFullYear();

  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
  const quickPanelProjects = sortedProjects.slice(0, Math.min(sortedProjects.length, 12));
  const totalProjects = sortedProjects.length;
  const totalFocusAreas = filters.focusAreas.length;
  const totalStacks = filters.stack.length;

  return (
    <main className="min-h-screen bg-variable-collection-fondo text-white">
      {/* Sección hero con título y descripción */}
      <section className="border-b border-white/10 bg-[#0e0b0b]">
        <div className="container mx-auto grid gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1 text-sm font-ubuntu text-white/92">
              Portafolio Devurity {currentYear}
            </span>
            <h1 className="font-orbitron text-4xl leading-tight md:text-5xl">
              Exploración que aterriza en productos reales
            </h1>
            <p className="font-ubuntu text-lg text-white/75">
              Esta es la capa pública de los proyectos que incubamos. Las
              iniciativas actuales equilibran agrotech, salud, ciberseguridad y
              gestión operativa con entregables verificables.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="font-ubuntu text-xs uppercase tracking-[0.25em] text-white/50">
                  Proyectos activos
                </p>
                <p className="font-orbitron text-2xl text-white">{totalProjects}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="font-ubuntu text-xs uppercase tracking-[0.25em] text-white/50">
                  Áreas de enfoque
                </p>
                <p className="font-orbitron text-2xl text-white">{totalFocusAreas}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="font-ubuntu text-xs uppercase tracking-[0.25em] text-white/50">
                  Tecnologías activas
                </p>
                <p className="font-orbitron text-2xl text-white">{totalStacks}</p>
              </div>
            </div>
          </div>

          {/* Panel lateral: agenda de proyectos */}
          <aside className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-orbitron text-sm uppercase tracking-[0.3em] text-variable-collection-link">
                  Roadmap activo
                </h2>
                <p className="mt-2 font-ubuntu text-xs text-white/50">
                  Ordenado por última actualización
                </p>
              </div>
              <span className="font-ubuntu text-xs text-white/60">
                {quickPanelProjects.length} proyectos
              </span>
            </div>

            <ul
              className="mt-6 max-h-[26rem] space-y-4 overflow-y-auto pr-1 text-sm"
              aria-label="Listado rápido de proyectos"
            >
              {quickPanelProjects.map((project, index) => (
                <li
                  key={project.id}
                  className="group flex items-start gap-3 rounded-2xl border border-white/5 bg-white/0 p-4 transition-colors duration-200 hover:border-white/20 hover:bg-white/5"
                >
                  <span className="font-orbitron text-sm text-variable-collection-link">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p className="font-ubuntu text-[11px] uppercase tracking-[0.25em] text-white/60">
                      {formatProjectDate(project.updatedAt)}
                    </p>
                    <p className="mt-1 font-ubuntu text-sm text-white">
                      {project.title}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-white/40">
                      {project.focusAreas.slice(0, 2).map((area) => (
                        <span key={area} className="rounded-full border border-white/5 px-2 py-1">
                          #{area}
                        </span>
                      ))}
                    </div>
                    {project.callToAction ? (
                      <Link
                        href={project.callToAction.href}
                        className="mt-3 inline-flex items-center gap-2 text-[11px] font-ubuntu text-variable-collection-link transition-colors duration-200 hover:text-white"
                      >
                        {project.callToAction.label}
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H7"
                          />
                        </svg>
                      </Link>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Grid de tarjetas de proyectos */}
      <section className="container mx-auto px-6 pt-16 pb-24">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {sortedProjects.map((project) => (
            <article
              key={project.id}
              className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-black/40 px-6 pb-6 pt-10 shadow-[0_25px_60px_-45px_rgba(0,0,0,0.8)] transition hover:border-variable-collection-link/60 hover:shadow-[0_25px_60px_-30px_rgba(202,43,38,0.35)]"
            >
              {/* Contenido principal de la tarjeta */}
              <div className="space-y-4">
                {/* Fecha de actualización */}
                <div className="flex items-center justify-center text-xs font-orbitron uppercase tracking-[0.3em] text-white/50">
                  <span>Actualizado {formatProjectDate(project.updatedAt)}</span>
                </div>

                {/* Título y resumen */}
                <h3 className="font-orbitron text-2xl text-white">
                  {project.title}
                </h3>
                <p className="font-ubuntu text-sm text-white/70">
                  {project.summary}
                </p>

                {/* Tags de áreas de enfoque */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs font-ubuntu text-white/70"
                    >
                      #{area}
                    </span>
                  ))}
                </div>

                {/* Stack tecnológico */}
                <div className="flex flex-wrap gap-2 text-xs text-white/50">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to action (si existe) */}
              {project.callToAction ? (
                <div className="pt-6">
                  <Link
                    href={project.callToAction.href}
                    className="inline-flex items-center gap-2 text-sm font-ubuntu text-variable-collection-link transition group-hover:translate-x-1"
                  >
                    {project.callToAction.label}
                    {/* Icono de flecha */}
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
