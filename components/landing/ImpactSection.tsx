import Image from "next/image";
import { IMAGES } from '@/public/images';

// Primer segmento - Presentacion

export default function ImpactSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-4 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 max-w-7xl mx-auto">
          {/* Contenido del cuadro negro */}
          <div className="relative w-full max-w-[695px] lg:max-w-[560px] xl:max-w-[664px] mx-auto lg:mx-0 flex-shrink-0 rounded-[20px] sm:rounded-[25px] p-6 sm:p-8 md:pt-[35px] md:pr-[22px] md:pb-[40px] md:pl-[35px] bg-black/70 backdrop-blur-sm">
            {/* Título */}
            <h2 className="font-orbitron font-extrabold text-white leading-[1.1] mb-6 sm:mb-8">
              <span className="block text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] tracking-[0.15em] sm:tracking-[0.19em]">
                DEL APRENDIZAJE AL
              </span>              
              <span className="block text-[32px] sm:text-[38px] md:text-[44px] lg:text-[50px] tracking-[0.15em] sm:tracking-[0.19em] mt-1">
                IMPACTO REAL
              </span>
            </h2>
            
            {/* Contenido de texto */}
            <div className="space-y-3 sm:space-y-4 text-white/90 font-ubuntu text-sm sm:text-base leading-relaxed px-4 sm:px-0">
              <p className="leading-[1.6]">
                Somos un semillero interdisciplinario enfocado en investigación aplicada y desarrollo tecnológico.
              </p>
              
              <p className="leading-[1.6]">
                Fusionamos formación académica, práctica profesional y comunidad. Desde prototipos que usan APIs de la NASA hasta soluciones de ciberseguridad automatizada y herramientas para el sector agroindustrial en Colombia.
              </p>
              
              <p className="leading-[1.6]">
                <span className="text-white font-semibold">¿Nuestra prioridad?</span> El aprender con rigor y transformar el aprendizaje en impacto real.
              </p>
            </div>
            
            {/* Botón de CTA */}
            <div className="mt-6 sm:mt-8 px-4 sm:px-8">
              <a
                href="/projects"
                className="inline-block w-full sm:w-auto text-center bg-variable-collection-botones text-white font-ubuntu font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-variable-collection-botones/50"
              >
                Observa nuestros proyectos
              </a>
            </div>
          </div>
          
          {/* SVG - Lado derecho */}
          <div className="relative flex-1 w-full max-w-[860px] lg:max-w-[900px] xl:max-w-[980px] h-[360px] sm:h-[480px] md:h-[560px] lg:h-[640px] xl:h-[720px] lg:-mr-10 xl:-mr-16">
            {/* Overlay degradado oscuro en la parte superior */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 right-0 h-[20%] sm:h-[26%] bg-gradient-to-b from-variable-collection-fondo via-variable-collection-fondo/60 to-transparent z-10 pointer-events-none xl:-mr-64"></div>
            </div>

            {/* Cubo 3D con animación */}
            <div className="relative w-full h-full lg:w-[115%] xl:w-[135%] lg:translate-x-6 xl:translate-x-8 animate-float">
              <Image
                src={IMAGES.landing.cuboAbstracto} 
                alt="Tecnología e Innovación"
                fill
                className="object-contain object-right"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
