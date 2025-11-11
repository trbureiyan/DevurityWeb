import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getUpdatesFeed } from "@/lib/data/updates";
import { siteIcons } from "@/lib/constants/metadata";

// Estilos y tipos auxiliares...
const createAccentStyles = (color: string): CSSProperties =>
  ({
    borderColor: color,
    "--shadow-color": `${color}66`,
  }) as CSSProperties; // CSS Properties porque CSS Variables no están en el tipo por defecto

const isExternalHref = (href?: string): boolean =>
  typeof href === "string" && href.startsWith("http");

// Revalidar cada 6 horas
export const revalidate = 60 * 60 * 6;

// Genera metadatos dinámicos usando la primera actualización
export async function generateMetadata(): Promise<Metadata> {
  const [first] = await getUpdatesFeed();

  return {
    title: "Noticias y eventos | Devurity",
    description:
      first?.excerpt ??
      "Actualizaciones del semillero Devurity, eventos, alianzas y oportunidades para la comunidad universitaria.",
    icons: siteIcons,
    // Declarar explicitamente robots para evitar sorpresas en SEO
    robots: {
      index: true,
      follow: true,
    },
    // Idioma/locale para OpenGraph
    openGraph: {
      locale: "es_CO",
    },
  };
}

export default async function UpdatesPage() {
  const updates = await getUpdatesFeed();
  const validUpdates = updates.filter(
    (item): item is NonNullable<(typeof updates)[number]> => Boolean(item),
  );

  // Estado vacío: sin actualizaciones disponibles
  if (validUpdates.length === 0) {
    return (
      <main className="min-h-screen bg-variable-collection-fondo text-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="font-orbitron text-4xl">Eventos y noticias</h1>
          <p className="mt-4 font-ubuntu text-white/70">
            Estamos preparando la próxima agenda. Vuelve pronto.
          </p>
        </div>
      </main>
    );
  }
  // Desestructurar actualizaciones
  const totalUpdates = validUpdates.length;
  const [highlight, ...timeline] = validUpdates;
  const quickAgendaItems = validUpdates.slice(0, Math.min(totalUpdates, 12));
  const highlightHref = highlight?.href || "#";
  const highlightIsExternal = isExternalHref(highlightHref);

  return (
    <main className="min-h-screen bg-variable-collection-fondo text-white">
      {/* Sección hero: Actualización destacada + Agenda rápida */}
      <section className="border-b border-white/10 bg-black/40">
        <div className="container mx-auto grid gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Contenido principal destacado */}
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1 text-sm font-ubuntu uppercase tracking-[0.1em] text-variable-collection-link">
              Actualización destacada
            </span>
            <h1 className="font-orbitron text-4xl leading-tight md:text-5xl">
              {highlight.title}
            </h1>
            <p className="font-ubuntu text-lg text-white/75">
              {highlight.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-white/60">
              {highlight.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4">
                <div>
                  <p className="font-ubuntu text-xs uppercase tracking-[0.25em] text-white/50">
                    Publicado
                  </p>
                  <p className="font-orbitron text-xl text-white">{highlight.displayDate}</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-variable-collection-link">
                  #{highlight.tags[0] ?? "Actualización"}
                </span>
              </div>
              <div className="flex flex-1 items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4">
                <div>
                  <p className="font-ubuntu text-xs uppercase tracking-[0.25em] text-white/50">
                    Total
                  </p>
                  <p className="font-orbitron text-xl text-white">{totalUpdates}</p>
                </div>
                <a
                  href="#historial"
                  className="font-ubuntu text-xs uppercase tracking-[0.25em] text-variable-collection-link transition-colors duration-200 hover:text-white"
                >
                  Ver historial
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              {highlightIsExternal ? (
                <a
                  href={highlightHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-ubuntu text-sm text-variable-collection-link transition-colors duration-200 hover:text-white"
                >
                  Ver detalle
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ) : (
                <Link
                  href={highlightHref}
                  className="inline-flex items-center gap-2 font-ubuntu text-sm text-variable-collection-link transition-colors duration-200 hover:text-white"
                >
                  Ver detalle
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )}
              <a
                href="#historial"
                className="inline-flex items-center font-ubuntu text-sm text-variable-collection-link transition-colors duration-200 hover:text-white"
              >
                Ver historial completo
              </a>
            </div>
          </div>

          {/* Panel lateral: Agenda rápida */}
          <aside className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-orbitron text-sm uppercase tracking-[0.3em] text-variable-collection-link">
                  Agenda rápida
                </h2>
                <p className="mt-2 font-ubuntu text-xs text-white/50">
                  Ordenada por fecha más reciente
                </p>
              </div>
              <span className="font-ubuntu text-xs text-white/60">{quickAgendaItems.length} ítems</span>
            </div>

            <ul
              className="mt-6 max-h-[26rem] space-y-4 overflow-y-auto pr-1 text-sm"
              aria-label="Agenda rápida de actualizaciones"
            >
              {quickAgendaItems.map((item, index) => {
                const itemHref = item?.href || "#";
                const isExternal = isExternalHref(itemHref);

                const content = (
                  <>
                    <span className="font-orbitron text-sm text-variable-collection-link">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <p className="font-ubuntu text-[11px] uppercase tracking-[0.25em] text-white/60">
                        {item.displayDate}
                      </p>
                      <p className="mt-1 font-ubuntu text-sm text-white transition-colors duration-200 group-hover:text-variable-collection-link">
                        {item.title}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-white/40">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-full border border-white/5 px-2 py-1">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                );

                return (
                  <li key={item.id}>
                    {isExternal ? (
                      <a
                        href={itemHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 rounded-2xl border border-white/5 bg-white/0 p-4 transition-colors duration-200 hover:border-white/20 hover:bg-white/5"
                      >
                        {content}
                      </a>
                    ) : (
                      <Link
                        href={itemHref}
                        className="group flex items-start gap-3 rounded-2xl border border-white/5 bg-white/0 p-4 transition-colors duration-200 hover:border-white/20 hover:bg-white/5"
                      >
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </section>

      {/* Sección de historial: Grid con todas las actualizaciones restantes */}
      <section id="historial" className="container mx-auto px-6 py-16">
        <div className="mb-8">
          <h2 className="font-orbitron text-2xl md:text-3xl">Historial</h2>
          <p className="mt-3 font-ubuntu text-sm text-white/60">
            Noticias anteriores y eventos que marcan el ritmo del semillero.
          </p>
        </div>

        {/* Grid responsive de tarjetas */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {timeline.map((item) => {
            const itemHref = item?.href || "#";
            const isExternal = isExternalHref(itemHref);

            const card = (
              <article
                className="flex h-full flex-col justify-between rounded-3xl border bg-black/40 p-6 shadow-[0_25px_60px_-45px_rgba(0,0,0,0.8)] transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-[0_25px_60px_-30px_var(--shadow-color)]"
                style={createAccentStyles(item.borderColor)}
              >
                {/* Contenido de la tarjeta */}
                <div className="space-y-3">
                  <p className="font-ubuntu text-xs uppercase tracking-[0.25em] text-white/60">
                    {item.displayDate}
                  </p>
                  <h3 className="font-orbitron text-xl text-white transition-colors duration-300 group-hover:text-variable-collection-link">
                    {item.title}
                  </h3>
                  <p className="font-ubuntu text-sm text-white/70">
                    {item.excerpt}
                  </p>
                </div>
                {/* Tags de la tarjeta */}
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-3 py-1 transition-colors duration-300 group-hover:border-white/20">
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            );

            return isExternal ? (
              <a key={item.id} href={itemHref} target="_blank" rel="noopener noreferrer" className="group block h-full">
                {card}
              </a>
            ) : (
              <Link key={item.id} href={itemHref} className="group block h-full">
                {card}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}