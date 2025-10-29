import Image from "next/image";
import { IMAGES } from '@/public/images';

// Primer segmento - Presentacion

export default function ImpactSection() {
  return (
    <section className="container mx-auto px-6 md:px-10 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Contenido del cuadro negro */}
        <div className="w-[695px] h-[483px] rounded-[25px] pt-[35px] pr-[42px] pb-[40px] pl-[15px] bg-black">
          <h2 className="font-orbitron font-extrabold text-white leading-tight">
            <span className="block text-[36px]">
              DEL APRENDIZAJE
            </span>
            <span className="block text-[24px]">
              AL
            </span>
            <span className="block text-[50px] mt-1">
              IMPACTO REAL
            </span>
          </h2>
          
          <div className="space-y-4 text-white/90 font-ubuntu text-base leading-relaxed mt-6">
            <p>
              Somos un semillero interdisciplinario enfocado en investigación aplicada y desarrollo tecnológico.
            </p>
            
            <p>
              Fusionamos formación académica, práctica profesional y comunidad. Desde prototipos que usan APIs de la NASA hasta soluciones de ciberseguridad automatizada y herramientas para el sector agroindustrial en Colombia.
            </p>
            
            <p>
              <span className="text-white font-semibold">¿Nuestra prioridad?</span> El aprender con rigor y transformar el aprendizaje en impacto real.
            </p>
          </div>
          
          <div className="mt-6">
            <a
              href="/projects"
              className="inline-block bg-variable-collection-botones text-white font-ubuntu font-bold px-8 py-4 rounded-lg hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-variable-collection-botones/50"
            >
              Observa nuestros proyectos
            </a>
          </div>
        </div>
        
        {/* SVG - Lado derecho */}
        <div className="relative h-[450px] md:h-[600px] lg:h-[750px] -mr-6 md:-mr-10 lg:-mr-24 -mt-16 md:-mt-32 lg:-mt-20">
          <div className="relative w-full h-full">
            {/* Overlay degradado oscuro en la parte superior */}
            <div className="absolute top-0 left-0 w-[120%] h-[30%] bg-gradient-to-b from-variable-collection-fondo via-variable-collection-fondo/50 to-transparent z-10"></div>
            
            <div className="relative w-[120%] h-full animate-float">
              <Image
                src={IMAGES.landing.cuboAbstracto} 
                alt="Tecnología e Innovación"
                fill
                className="object-contain object-right-top"
                priority
               />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
