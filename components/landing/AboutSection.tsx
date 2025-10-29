import Image from "next/image";
import { IMAGES } from '@/public/images';

// Segmento about

export default function AboutSection() {
  return (
    <section id="nosotros" className="container mx-auto px-6 md:px-10 py-20">
      <h2 className="font-orbitron font-bold text-[58px] md:text-5xl text-white mb-12 text-center">
        NUESTRO ADN
      </h2>
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="bg-variable-collection-placeholder p-8 rounded-lg hover:bg-opacity-80 transition-all">
          <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
            <Image
              src={IMAGES.landing.devBG} 
              alt="DEV Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 flex items-center justify-center">
              <h4 className="font-orbitron text-6xl font-bold text-white tracking-wider">DEV</h4>
            </div>
          </div>
          <p className="font-ubuntu text-foreground/80 leading-relaxed">
            Fomentar el desarrollo de habilidades investigativas y tecnológicas en estudiantes universitarios mediante proyectos innovadores.
          </p>
        </div>
        
        <div className="bg-variable-collection-placeholder p-8 rounded-lg hover:bg-opacity-80 transition-all">
          <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
            <Image
              src={IMAGES.landing.urityBG} 
              alt="URITY Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 flex items-center justify-center">
              <h4 className="font-orbitron text-6xl font-bold text-white tracking-wider">URITY</h4>
            </div>
          </div>
          <p className="font-ubuntu text-foreground/80 leading-relaxed">
            Ser un referente en investigación y desarrollo tecnológico en la región, impulsando la innovación desde la universidad.
          </p>
        </div>
      </div>
    </section>
  );
}
