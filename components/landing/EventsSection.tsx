import Link from "next/link";
import type { ReactNode } from "react";
import { getLatestNewsForLanding } from "@/lib/data/updates";
import type { NewsEvent } from "@/lib/data/updates";

const CTA_HREF = "/updates";
const HEX_COLOR = /^#?[0-9a-f]{3}([0-9a-f]{3})?$/i;
const FALLBACK_ACCENT = "rgba(246, 102, 97)";

// border_color es texto libre desde el gestor; si no es hex válido usamos el link del tema
const accentOf = (color: string): string =>
  HEX_COLOR.test(color) ? (color.startsWith("#") ? color : `#${color}`) : FALLBACK_ACCENT;

const isExternal = (href: string) => href.startsWith("http");

function NewsLink({
  item,
  className,
  children,
}: {
  item: NewsEvent;
  className: string;
  children: ReactNode;
}) {
  const href = item.href || CTA_HREF;
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
      {tags.slice(0, 3).map((tag) => (
        <li key={tag}>#{tag}</li>
      ))}
    </ul>
  );
}

// La noticia principal: tipografía grande, sin imagen — el contenido de updates no trae media
function FeaturedNews({ item }: { item: NewsEvent }) {
  return (
    <NewsLink
      item={item}
      className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-md border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition-colors duration-300 hover:border-white/25 md:p-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ backgroundColor: accentOf(item.borderColor) }}
      />
      <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
        <span>Destacado</span>
        <time dateTime={item.publishedAt}>{item.date}</time>
      </div>

      <div className="space-y-4">
        <h3 className="font-orbitron text-xl font-bold leading-snug text-white transition-colors group-hover:text-variable-collection-link md:text-2xl">
          {item.title}
        </h3>
        <p className="max-w-xl font-ubuntu text-sm leading-relaxed text-white/60 line-clamp-4 md:text-base">
          {item.description}
        </p>
      </div>

      <div className="flex items-end justify-between gap-4">
        <Tags tags={item.tags} />
        <span
          aria-hidden="true"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all group-hover:border-variable-collection-link group-hover:text-variable-collection-link"
        >
          &rarr;
        </span>
      </div>
    </NewsLink>
  );
}

// Las siguientes van como índice: fila compacta, número, fecha y título
function NewsRow({ item, index }: { item: NewsEvent; index: number }) {
  return (
    <NewsLink
      item={item}
      className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-2 border-t border-white/10 py-6 transition-colors first:border-t-0 first:pt-0 lg:first:pt-0"
    >
      <span className="font-mono text-sm text-white/30 transition-colors group-hover:text-variable-collection-link">
        {String(index).padStart(2, "0")}
      </span>
      <div className="min-w-0 space-y-2">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: accentOf(item.borderColor) }}
          />
          <time dateTime={item.publishedAt}>{item.date}</time>
        </div>
        <h3 className="font-ubuntu text-base font-medium leading-snug text-white transition-colors group-hover:text-variable-collection-link md:text-lg line-clamp-2">
          {item.title}
        </h3>
        <p className="font-ubuntu text-sm text-white/50 line-clamp-2">{item.description}</p>
        <Tags tags={item.tags} />
      </div>
      <span
        aria-hidden="true"
        className="pt-0.5 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-variable-collection-link motion-reduce:transition-none"
      >
        &rarr;
      </span>
    </NewsLink>
  );
}

export default async function EventsSection() {
  // Carga los 3 ítems más recientes desde la DB (Server Component)
  let latestNews: NewsEvent[];
  try {
    latestNews = await getLatestNewsForLanding(3);
  } catch (error) {
    console.error("[EventsSection] Failed to load latest news:", error);
    latestNews = [];
  }

  const [featured, ...rest] = latestNews;

  return (
    <section
      id="eventos"
      aria-labelledby="eventos-titulo"
      className="relative w-full overflow-hidden py-20 lg:py-28"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-12">
        {/* Cabecera horizontal: título a la izquierda, CTA a la derecha — al revés que proyectos */}
        <div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
              Bitácora del semillero
            </span>
            <h2
              id="eventos-titulo"
              className="font-orbitron text-2xl font-bold uppercase tracking-[0.06em] text-white md:text-3xl"
            >
              Noticias y eventos
            </h2>
          </div>
          <Link
            href={CTA_HREF}
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-variable-collection-link transition-colors hover:text-white"
          >
            Ver todas las noticias
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>

        {featured ? (
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className={rest.length > 0 ? "lg:col-span-7" : "lg:col-span-12"}>
              <FeaturedNews item={featured} />
            </div>
            {rest.length > 0 && (
              <div className="flex flex-col lg:col-span-5">
                {rest.map((item, i) => (
                  <NewsRow key={item.id} item={item} index={i + 2} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-white/10 px-6 py-12 text-center font-ubuntu text-sm text-white/40">
            No hay noticias publicadas por ahora.
          </div>
        )}
      </div>
    </section>
  );
}
