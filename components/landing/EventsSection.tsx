import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { getLatestNewsForLanding } from "@/lib/data/updates";

const CTA_HREF = "/updates";

const createAccentStyles = (color: string): CSSProperties => {
  const normalized = color.startsWith("#") ? color : `#${color}`;
  return { borderColor: normalized };
};

const isExternalHref = (href: string): boolean => href.startsWith("http");

export default async function EventsSection() {
  // Carga los 3 ítems más recientes desde la DB (Server Component)
  const latestNews = await getLatestNewsForLanding(3);

  return (
    <section id="eventos" className="relative w-full py-10 md:py-16 overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-end gap-8 lg:gap-12">

          {/* Columna izquierda - Imagen decorativa */}
          <div className="relative w-full lg:w-[720px] h-[400px] lg:h-[518px] flex-shrink-0 order-2 lg:order-1">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full">
                <div className="absolute inset-0">
                  <Image
                    src="/images/landing/cyberpunkWoman.webp"
                    alt="Devurity Tech"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 720px"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 opacity-30">
                  <svg className="absolute top-[10%] left-[5%] w-32 h-32" viewBox="0 0 100 100">
                    <path d="M10,30 L50,10 L90,30 L90,70 L50,90 L10,70 Z M50,10 L50,50 M90,30 L50,50 M10,30 L50,50 M10,70 L50,50 M90,70 L50,50" stroke="white" strokeWidth="1" fill="none" />
                  </svg>
                  <svg className="absolute bottom-[15%] right-[10%] w-24 h-24" viewBox="0 0 100 100">
                    <path d="M20,40 L50,20 L80,40 L80,70 L50,90 L20,70 Z M50,20 L50,50 M80,40 L50,50 M20,40 L50,50" stroke="white" strokeWidth="1" fill="none" />
                  </svg>
                  <svg className="absolute top-[50%] left-[15%] w-16 h-16" viewBox="0 0 100 100">
                    <path d="M30,45 L50,30 L70,45 L70,65 L50,80 L30,65 Z" stroke="white" strokeWidth="1" fill="none" />
                  </svg>
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
            <div className="flex justify-end mb-8 lg:mb-10">
              <h2 className="font-orbitron font-extrabold text-3xl md:text-[48px] text-white text-right tracking-[0.125em] leading-[56px]">
                ULTIMAS NOTICIAS
              </h2>
            </div>

            <div className="flex flex-col gap-6 lg:gap-[35px] max-w-[671px] lg:ml-auto">
              {latestNews.map((item, index) => {
                // Adaptar UpdateItem → campos que usa la tarjeta
                const itemHref = item.href || CTA_HREF;
                const accentStyles = createAccentStyles(item.borderColor);
                const useExternal = isExternalHref(itemHref);
                const isLastCard = index === latestNews.length - 1;

                // displayDate viene de NewsEvent como .date, description como .description
                const displayDate = item.date;
                const description = item.description;

                const TitleLink = useExternal ? (
                  <a
                    href={itemHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start text-left text-white transition-colors duration-200 hover:text-variable-collection-link"
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link
                    href={itemHref}
                    className="inline-flex items-start text-left text-white transition-colors duration-200 hover:text-variable-collection-link"
                  >
                    {item.title}
                  </Link>
                );

                return (
                  <article
                    key={item.id}
                    className="relative h-auto min-h-[166px] rounded-xl border-2 px-7 py-6 lg:px-8 lg:py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_-40px_rgba(0,0,0,0.7)]"
                    style={accentStyles}
                  >
                    <div className="flex flex-col gap-4 justify-center h-full">
                      <h3 className="font-ubuntu font-bold italic text-[22px] leading-snug">
                        {TitleLink}
                      </h3>
                      <div className="font-ubuntu text-[#b0b4c3] text-[15px] leading-relaxed space-y-2">
                        <p className="uppercase tracking-[0.22em] text-[13px] text-white/60">| {displayDate}</p>
                        <p className="text-white/80">{description}</p>
                      </div>
                      <div className="flex flex-wrap gap-3 items-center pt-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-ubuntu text-[#d5d9e9] text-sm uppercase tracking-[0.18em]"
                            style={{ textShadow: "rgba(0,0,0,0.12) 0px 4px 4px" }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      {isLastCard && (
                        <div className="pt-4">
                          <Link
                            href={CTA_HREF}
                            className="inline-flex items-center gap-2 font-ubuntu text-sm uppercase tracking-[0.2em] text-variable-collection-link transition-colors duration-200 hover:text-white"
                          >
                            Conocer más noticias y eventos
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Link>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}