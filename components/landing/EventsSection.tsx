import Image from "next/image";
import type { NewsEvent } from "@/lib/constants/updates";

// props para items de noticias
type EventsSectionProps = {
  news: NewsEvent[];
};

// Segmento de eventos y noticias
export default function EventsSection({ news }: EventsSectionProps) {
  return (
    <section id="eventos" className="relative w-full py-10 md:py-16 overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-end gap-8 lg:gap-12">
          {/* Columna izquierda - Imagen decorativa */}
          <div className="relative w-full lg:w-[720px] h-[400px] lg:h-[518px] flex-shrink-0 order-2 lg:order-1">
            {/* Contenedor de la imagen con efectos */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full">
                {/* Imagen de fondo */}
                <div className="absolute inset-0">
                  <Image
                    src="/images/landing/cyberpunkWoman.webp"
                    alt="Devurity Tech"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>

                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />

                {/* Figuras geométricas decorativas */}
                <div className="absolute inset-0 opacity-30">
                  {/* Cubos wireframe */}
                  <svg className="absolute top-[10%] left-[5%] w-32 h-32" viewBox="0 0 100 100">
                    <path
                      d="M10,30 L50,10 L90,30 L90,70 L50,90 L10,70 Z M50,10 L50,50 M90,30 L50,50 M10,30 L50,50 M10,70 L50,50 M90,70 L50,50"
                      stroke="white"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>

                  <svg className="absolute bottom-[15%] right-[10%] w-24 h-24" viewBox="0 0 100 100">
                    <path
                      d="M20,40 L50,20 L80,40 L80,70 L50,90 L20,70 Z M50,20 L50,50 M80,40 L50,50 M20,40 L50,50"
                      stroke="white"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>

                  <svg className="absolute top-[50%] left-[15%] w-16 h-16" viewBox="0 0 100 100">
                    <path
                      d="M30,45 L50,30 L70,45 L70,65 L50,80 L30,65 Z"
                      stroke="white"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>

                  {/* Líneas decorativas */}
                  <svg className="absolute top-[20%] right-[20%] w-48 h-2" viewBox="0 0 200 10">
                    <line x1="0" y1="5" x2="200" y2="5" stroke="white" strokeWidth="1" />
                    <line x1="180" y1="0" x2="200" y2="5" stroke="white" strokeWidth="1" />
                    <line x1="180" y1="10" x2="200" y2="5" stroke="white" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Tarjetas de noticias */}
          <div className="flex flex-col w-full lg:w-auto order-1 lg:order-2">
            {/* Título */}
            <div className="flex justify-end mb-8 lg:mb-10">
              <h2 className="font-orbitron font-extrabold text-3xl md:text-[48px] text-white text-right tracking-[0.125em] leading-[56px]">
                ULTIMAS NOTICIAS
              </h2>
            </div>

            {/* Grid de tarjetas de noticias */}
            <div className="flex flex-col gap-6 lg:gap-[35px] max-w-[671px] lg:ml-auto">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="relative h-auto min-h-[166px] rounded-sm border-4 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  style={{ borderColor: item.borderColor }}
                >
                  <div className="flex flex-col gap-3 px-6 lg:px-7 py-3 lg:py-[14px] justify-center h-full">
                    {/* Título */}
                    <h3 className="font-ubuntu font-bold italic text-white text-[22px] leading-normal">
                      {item.title}
                    </h3>

                    {/* Fecha y descripción */}
                    <div className="font-ubuntu text-[#b0b4c3] text-base leading-[105.49%]">
                      <p className="mb-0">| {item.date}</p>
                      <p className="mt-1">{item.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2.5 items-center">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
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
          </div>
        </div>
      </div>
    </section>
  );
}
