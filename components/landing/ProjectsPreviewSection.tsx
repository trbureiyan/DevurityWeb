import Link from "next/link";
import Image from "next/image";
import type { ProjectPreview } from "@/lib/constants/landing";

const truncateText = (value: string, maxLength = 100): string => {
  const normalized = value.trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  const safeSlice = normalized.slice(0, maxLength - 3);
  const lastSeparator = safeSlice.lastIndexOf(" ");
  const trimmed = lastSeparator > 0 ? safeSlice.slice(0, lastSeparator) : safeSlice;

  return `${trimmed.trimEnd()}...`;
};

// Componente para mostrar los avatares de los miembros del equipo

// Fila horizontal de avatares con indicador de desbordamiento opcional
function TeamAvatars({ 
  members, 
  maxVisible = 7 
}: { 
  members: { id: number; avatarUrl: string; name: string }[]; 
  maxVisible?: number;
}) {
  // Limita los miembros visibles según maxVisible (7)
  const visibleMembers = members.slice(0, maxVisible);
  // Calculo de cuántos miembros quedan sin mostrar
  const remainingCount = Math.max(0, members.length - maxVisible);

  return (
    // Contenedor flex horizontal con espaciado entre avatares
    <div className="flex items-center gap-2.5 px-0.5">
      {/* Renderiza cada miembro visible como un avatar circular de 30x30px */}
      {visibleMembers.map((member) => (
        <div
          key={member.id}
          className="relative w-[30px] h-[30px] rounded-full overflow-hidden flex-shrink-0 bg-[#5b616e]"
          title={member.name}
        >
          {/* Si el miembro tiene avatar, muestra la imagen; si no, muestra ícono de usuario por defecto */}
          {member.avatarUrl ? (
            <Image
              src={member.avatarUrl}
              alt={member.name}
              fill
              sizes="30px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white/60"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
        </div>
      ))}
      {/* Si hay más miembros que el máximo visible, muestra tres puntos como indicador */}
      {remainingCount > 0 && (
        <>
          <div className="w-[9px] h-[9px] rounded-full bg-[#5b616e] flex-shrink-0" />
          <div className="w-[9px] h-[9px] rounded-full bg-[#5b616e] flex-shrink-0" />
          <div className="w-[9px] h-[9px] rounded-full bg-[#5b616e] flex-shrink-0" />
        </>
      )}
    </div>
  );
}

// Segmento de previews de proyectos -> Grid de tarjetas
type ProjectsPreviewSectionProps = {
  projects: ProjectPreview[];
};

export default function ProjectsPreviewSection({ projects }: ProjectsPreviewSectionProps) {
  return (
    <section id="proyectos" className="container mx-auto px-6 md:px-10 py-16 md:py-20">
      {/* Título */}
      <div className="flex items-center justify-center mb-10 md:mb-12">
        <h2 className="font-orbitron font-extrabold text-3xl md:text-[48px] text-white text-center tracking-[0.125em] leading-[56px] px-7">
          PROYECTOS DESTACADOS
        </h2>
      </div>

      {/* Grid de tarjetas de proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 max-w-[1400px] mx-auto mb-12">
  {projects.map((project) => (
          <div
            key={project.id}
            className="relative h-[250px] rounded-[13px] overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] duration-300"
          >
            {/* Imagen de fondo */}
            <div className="absolute inset-0">
              {project.imageUrl ? (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : (
                // Gradiente placeholder cuando no hay imagen
                <div className="absolute inset-0 bg-gradient-to-br from-[#3d2a2a] via-[#2a1d1d] to-[#1a1212]" />
              )}
            </div>

            {/* Overlay con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#2a1d1d] to-[#191111] opacity-[0.92]" />

            {/* Contenido de la tarjeta */}
            <div className="relative h-full p-5 flex flex-col">
              {/* Título */}
              <h3 className="font-ubuntu font-bold italic text-white text-[22px] leading-normal mb-2">
                {project.title}
              </h3>

              {/* Descripción */}
              <p className="font-ubuntu text-[#b0b4c3] text-base leading-normal mb-4">
                {truncateText(project.description)}
              </p>

              {/* Avatares del equipo */}
              <div className="mt-auto mb-8">
                <TeamAvatars members={project.teamMembers} />
              </div>

              {/* Tags de tecnologías */}
              <div className="flex flex-wrap gap-2 items-center">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-ubuntu text-[#d5d9e9] text-base leading-normal"
                    style={{ textShadow: "rgba(0,0,0,0.12) 0px 4px 4px" }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón para ver más proyectos */}
      <div className="flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center justify-center px-4 py-3 min-w-[378px] rounded-lg hover:bg-white/5 transition-colors group"
        >
          <div className="border-b-4 border-[#5b1311]">
            <span className="font-ubuntu font-bold text-white text-[32px] leading-[21px] whitespace-nowrap group-hover:text-variable-collection-link transition-colors">
              Observa mas proyectos
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
