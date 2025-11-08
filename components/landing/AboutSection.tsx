import Image from "next/image";
import { IMAGES } from '@/public/images';

// Segmento about

export default function AboutSection() {
  return (
  <section id="nosotros" className="mx-auto max-w-[1424px] px-6 md:px-12 py-24">
      <h2 className="font-orbitron font-bold text-[58px] md:text-5xl text-white mb-12 text-center">
        NUESTRO ADN
      </h2>
      <div className="grid md:grid-cols-2 gap-16">
        <div className="flex flex-col gap-6">
          <div className="relative h-[260px] md:h-[300px] rounded-3xl overflow-hidden">
            <Image
              src={IMAGES.landing.devBG} 
              alt="DEV Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-center justify-center">
              <h4 className="font-orbitron text-7xl font-extrabold text-white tracking-[0.3em] uppercase">DEV</h4>
            </div>
          </div>
          <div className="space-y-4 text-center text-white md:text-left">
            <h3 className="font-orbitron font-extrabold text-3xl md:text-[32px] tracking-[0.08em] uppercase md:text-center">
              Innovación en Desarrollo
            </h3>
            <p className="font-ubuntu italic text-base md:text-lg text-white/80">
              Construimos software que resuelve problemas reales
            </p>
            <p className="font-ubuntu text-lg leading-relaxed text-white/90">
              Nuestra rama donde exploramos todo el ecosistema del software, desde aplicaciones web, móviles y cloud hasta IoT y automatización, transformando ideas en soluciones reales con impacto.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="relative h-[260px] md:h-[300px] rounded-3xl overflow-hidden">
            <Image
              src={IMAGES.landing.urityBG} 
              alt="URITY Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-center justify-center">
              <h4 className="font-orbitron text-7xl font-extrabold text-white tracking-[0.3em] uppercase">URITY</h4>
            </div>
          </div>
          <div className="space-y-4 text-center text-white md:text-center">
            <h3 className="font-orbitron font-extrabold text-3xl md:text-[32px] tracking-[0.08em] uppercase">
              Ciberseguridad en Acción
            </h3>
            <p className="font-ubuntu italic text-base md:text-lg text-white/80 text-right">
              La seguridad no es opcional, es el núcleo de la innovación
            </p>
            <p className="font-ubuntu text-lg leading-relaxed text-white/90 text-right">
              Nuestra rama dedicada a la ciberseguridad en todas sus dimensiones, desarrollo seguro, auditorías, honeypots y estrategias ofensivas o preventivas, formando proyectos y profesionales capaces de anticipar y resistir amenazas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
