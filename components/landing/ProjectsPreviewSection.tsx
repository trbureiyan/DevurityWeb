import Link from "next/link";
import { STAGE_LABELS, STAGE_COLORS } from "@/hooks/useProjects";
import { getProjectsCatalog, type ProjectItem } from "@/lib/data/projects";
import LinkButton from "@/components/ui/LinkButton";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardDescription,
  CardTags,
  CardTag,
  CardAction,
} from "@/components/ui/Card";

// Muestra los 3 proyectos más recientes en la landing page
export default async function ProjectsPreviewSection() {
  let allProjects: ProjectItem[];
  try {
    allProjects = await getProjectsCatalog();
  } catch {
    allProjects = [];
  }

  const sorted = [...allProjects].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
  const featured = sorted.slice(0, 3);

  return (
    <section className="relative py-16 lg:py-24 bg-[#171212] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <span className="font-ubuntu text-xs uppercase tracking-[0.3em] text-variable-collection-link">
              PROYECTOS ACTIVOS
            </span>
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white">
              Portafolio
            </h2>
            <p className="font-ubuntu text-white/50 text-sm max-w-md">
              Las iniciativas más recientes del semillero en desarrollo y ciberseguridad.
            </p>
          </div>

          <LinkButton
            href="/projects"
            variant="outline"
            size="sm"
            className="self-start md:self-auto text-xs"
          >
            Ver todos los proyectos →
          </LinkButton>
        </div>

        {/* Grid de proyectos compuestos */}
        {featured.length === 0 ? (
          <div className="bg-black/40 border border-white/10 rounded-3xl p-8 text-center space-y-3">
            <p className="font-orbitron text-lg text-white/70">
              No hay proyectos disponibles en este momento.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((project) => (
              <Card key={project.id}>
                <CardBody className="space-y-4">
                  <CardHeader>
                    <span
                      className={`text-xs font-ubuntu uppercase tracking-wider border px-3 py-1 rounded-full ${
                        STAGE_COLORS[project.stage]
                      }`}
                    >
                      {STAGE_LABELS[project.stage]}
                    </span>
                  </CardHeader>

                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.summary}</CardDescription>

                  {project.focusAreas && project.focusAreas.length > 0 && (
                    <CardTags>
                      {project.focusAreas.slice(0, 3).map((area) => (
                        <CardTag key={area}>#{area}</CardTag>
                      ))}
                    </CardTags>
                  )}
                </CardBody>

                {project.callToAction && (
                  <CardAction>
                    <Link
                      href={project.callToAction.href}
                      target={
                        project.callToAction.href.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        project.callToAction.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex items-center gap-2 text-sm font-ubuntu text-variable-collection-link hover:text-white transition-colors group-hover:translate-x-1 duration-200"
                    >
                      {project.callToAction.label}
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
                  </CardAction>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}