import { PROJECT_PREVIEW_COUNT } from "@/lib/constants/landing";

// Segmento de previews de proyectos -> Grid de tarjetas
export default function ProjectsPreviewSection() {
  return (
    <section id="proyectos" className="container mx-auto px-6 md:px-10 py-20">
      <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-12 text-center">
        Nuestros Proyectos
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {Array.from({ length: PROJECT_PREVIEW_COUNT }).map((_, index) => (
          <div 
            key={index + 1} 
            className="bg-variable-collection-placeholder p-6 rounded-lg hover:bg-opacity-80 transition-all hover:scale-105 duration-300"
          >
            <div className="h-40 bg-gradient-to-br from-variable-collection-seleccionado to-variable-collection-botones rounded-lg mb-4"></div>
            <h3 className="font-orbitron text-xl text-white mb-2">Proyecto {index + 1}</h3>
            <p className="font-ubuntu text-foreground/80 text-sm mb-4">
              Descripción breve del proyecto de investigación y sus objetivos principales.
            </p>
            <a 
              href="/projects" 
              className="text-variable-collection-links font-ubuntu font-semibold hover:underline inline-flex items-center gap-2"
            >
              Ver más 
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
