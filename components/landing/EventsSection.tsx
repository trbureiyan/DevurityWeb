import Image from "next/image";
import Link from "next/link";
import { getLatestNewsForLanding } from "@/lib/data/updates";
import type { NewsEvent } from "@/lib/data/updates";
import LinkButton from "@/components/ui/LinkButton";
import {
  Card,
  CardHeader,
  CardMeta,
  CardBody,
  CardTitle,
  CardDescription,
  CardTags,
  CardTag,
} from "@/components/ui/Card";

const CTA_HREF = "/updates";

const isExternalHref = (href: string): boolean => href.startsWith("http");

export default async function EventsSection() {
  let latestNews: NewsEvent[];
  try {
    latestNews = await getLatestNewsForLanding(3);
  } catch (error) {
    console.error("[EventsSection] Failed to load latest news:", error);
    latestNews = [];
  }

  return (
    <section id="eventos" className="relative w-full py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Columna izquierda - Panel de imagen limpia */}
          <div className="relative w-full lg:w-[48%] h-[380px] sm:h-[450px] lg:h-[520px] rounded-3xl overflow-hidden border border-white/10 flex-shrink-0 order-2 lg:order-1 shadow-2xl">
            <Image
              src="/images/landing/cyberpunkWoman.webp"
              alt=""
              aria-hidden="true"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 48vw"
              loading="lazy"
            />
            {/* Gradiente de integración de fondo suave */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#171212] via-[#171212]/40 to-transparent" />
          </div>

          {/* Columna derecha - Encabezado y Tarjetas de noticias unificadas */}
          <div className="flex flex-col w-full lg:w-[50%] order-1 lg:order-2 space-y-8">
            {/* Cabecera de la sección con CTA alineado */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="font-ubuntu text-xs tracking-[0.25em] text-variable-collection-link uppercase block mb-1">
                  NOVEDADES Y EVENTOS
                </span>
                <h2 className="font-orbitron font-extrabold text-2xl md:text-4xl text-white tracking-wider">
                  ÚLTIMAS NOTICIAS
                </h2>
              </div>

              <LinkButton
                href={CTA_HREF}
                variant="outline"
                size="sm"
                className="self-start sm:self-auto text-xs"
              >
                Ver todas las noticias →
              </LinkButton>
            </div>

            {/* Listado de Tarjetas de noticias compuestas */}
            {latestNews.length === 0 ? (
              <div className="bg-black/40 border border-white/10 rounded-3xl p-8 text-center space-y-3">
                <p className="font-orbitron text-lg text-white/70">
                  No hay noticias publicadas por el momento.
                </p>
                <p className="font-ubuntu text-xs text-white/40">
                  Pronto estaremos publicando nuevos eventos e investigaciones.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {latestNews.map((item) => {
                  const itemHref = item.href || CTA_HREF;
                  const useExternal = isExternalHref(itemHref);
                  const accentColor = item.borderColor || "#ca2b26";

                  return (
                    <Card
                      key={item.id}
                      style={{
                        borderLeft: `4px solid ${accentColor}`,
                      }}
                    >
                      <CardBody className="space-y-3">
                        <CardHeader>
                          <CardMeta>| {item.date}</CardMeta>
                        </CardHeader>

                        {useExternal ? (
                          <a
                            href={itemHref}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <CardTitle>{item.title}</CardTitle>
                          </a>
                        ) : (
                          <Link href={itemHref}>
                            <CardTitle>{item.title}</CardTitle>
                          </Link>
                        )}

                        <CardDescription>{item.description}</CardDescription>

                        {item.tags && item.tags.length > 0 && (
                          <CardTags>
                            {item.tags.map((tag) => (
                              <CardTag key={tag}>#{tag}</CardTag>
                            ))}
                          </CardTags>
                        )}
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}