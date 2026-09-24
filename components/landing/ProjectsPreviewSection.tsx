import Image from "next/image";
import Link from "next/link";
import { getProjectsCatalog, type ProjectItem, type ProjectStage } from "@/lib/data/projects";
import ProjectCover from "@/components/landing/ProjectCover";

// copia local de las etiquetas: hooks/useProjects es "use client" y sus
// constantes llegan al servidor como referencias de cliente, no como objetos
const STAGE_LABELS: Record<ProjectStage, string> = {
  incubacion: "Incubación",
  desarrollo: "Desarrollo",
  validacion: "Validación",
  produccion: "Producción",
  experimentacion: "Experimentación",
  pausa: "En pausa",
};

const isExternal = (href: string) => href.startsWith("http");

function ProjectCard({ project }: { project: ProjectItem }) {
  const href = project.callToAction?.href ?? "/projects";
  const external = isExternal(href);
  // [DECISION] Solo rutas locales pasan por next/image — hero_image es texto libre y
  // un host remoto no listado en remotePatterns rompería el render. El resto usa portada generativa.
  const localImage = project.heroImage?.startsWith("/") ? project.heroImage : null;

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex h-full flex-col overflow-hidden rounded-md border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-variable-collection-link/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-variable-collection-link"
    >
      <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[4/3] border-b border-white/10">
        {localImage ? (
          <Image
            src={localImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ProjectCover
            seed={project.id}
            className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
          />
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-variable-collection-link" />
          {STAGE_LABELS[project.stage]}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-5 p-4">
        <h3 className="font-ubuntu text-[15px] font-medium leading-snug text-white line-clamp-3 transition-colors group-hover:text-variable-collection-link">
          {project.title}
        </h3>
        {project.focusAreas.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {project.focusAreas.slice(0, 2).map((area) => (
              <li
                key={area}
                className="rounded-full border border-white/15 px-2.5 py-0.5 font-ubuntu text-[11px] text-white/60"
              >
                #{area}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}

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

  const featured = [...allProjects]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-titulo"
      className="relative overflow-hidden bg-variable-collection-fondo py-20 lg:py-28"
    >
      <div className="container mx-auto grid gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-10">
        {/* Columna izquierda: la tesis, no el inventario */}
        <div className="flex flex-col justify-center lg:col-span-4">
          <span className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            Proyectos
          </span>
          <h2
            id="proyectos-titulo"
            className="font-orbitron text-2xl font-bold uppercase leading-tight tracking-[0.06em] text-white md:text-3xl lg:text-2xl xl:text-3xl"
          >
            Innovación con propósito.
            <br />
            Tecnología con impacto.
          </h2>
          <span className="my-6 block h-1.5 w-1.5 rounded-full bg-variable-collection-link" aria-hidden="true" />
          <p className="max-w-sm font-ubuntu text-sm leading-relaxed text-white/60 md:text-base">
            Desarrollamos soluciones tecnológicas reales desde la universidad hacia el mundo.
          </p>
        </div>

        {/* Columna derecha: contador + tarjetas */}
        <div className="lg:col-span-8">
          <p className="mb-4 font-ubuntu text-sm text-white/60">
            Total: <span className="font-medium text-variable-collection-link">{allProjects.length}</span>{" "}
            {allProjects.length === 1 ? "proyecto" : "proyectos"}
          </p>

          {featured.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-white/10 px-6 py-12 text-center font-ubuntu text-sm text-white/40">
              Aún no hay proyectos publicados.
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-variable-collection-link transition-colors hover:text-white"
            >
              Ver todos los proyectos
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
