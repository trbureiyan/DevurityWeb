import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { getUpdatesFeed } from "@/lib/data/updates";
import { siteIcons } from "@/lib/constants/metadata";

// Pagina de detalle de cada update

const createAccentStyles = (color: string): CSSProperties =>
  ({
    borderColor: color,
    "--shadow-color": `${color}66`,
  }) as CSSProperties;

// Revalidar cada 6 horas (21600s)
export const revalidate = 21600;

interface UpdateDetailPageProps {
  params: {
    slug: string;
  };
}

// Generar rutas estáticas para cada update
export async function generateStaticParams() {
  const updates = await getUpdatesFeed();

  return updates
    .filter((item) => Boolean(item.slug))
    .map((item) => ({
      slug: item.slug,
    }));
}

// Generar metadata dinámicamente para cada update
export async function generateMetadata({
  params,
}: UpdateDetailPageProps): Promise<Metadata> {
  const updates = await getUpdatesFeed();
  const update = updates.find((item) => item.slug === params.slug);

  if (!update) {
    return {
      title: "Actualización no encontrada | Devurity",
      icons: siteIcons,
    };
  }

  return {
    title: `${update.title} | Devurity`,
    description: update.excerpt,
    icons: siteIcons,
  };
}

export default async function UpdateDetailPage({
  params,
}: UpdateDetailPageProps) {
  const updates = await getUpdatesFeed();
  const update = updates.find((item) => item.slug === params.slug);

  if (!update) {
    notFound();
  }

  const canonicalHref = `/updates/${params.slug}`;
  const hasExternalLink = update.href.startsWith("http") && update.href !== canonicalHref;
  const related = updates.filter((item) => item.slug !== update.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-variable-collection-fondo text-white">
      {/* Sección superior con navegación y metadata */}
      <section className="border-b border-white/10 bg-black/40">
        <div className="container mx-auto px-6 py-16">
          {/* Navegación y fecha */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 text-sm font-ubuntu text-variable-collection-link transition-colors duration-200 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a noticias
            </Link>
            <p className="font-ubuntu text-xs uppercase tracking-[0.3em] text-white/60">
              Publicado {update.displayDate}
            </p>
          </div>

          {/* Contenido principal del update */}
          <div className="mt-10 max-w-4xl space-y-6">
            <h1 className="font-orbitron text-4xl leading-tight md:text-5xl">
              {update.title}
            </h1>
            <p className="font-ubuntu text-lg text-white/75">
              {update.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 text-sm text-white/60">
              {update.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/15 px-3 py-1">
                  #{tag}
                </span>
              ))}
            </div>
            {hasExternalLink ? (
              <a
                href={update.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-ubuntu text-variable-collection-link transition-colors duration-200 hover:text-white"
              >
                Ver publicación original
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* Sección de contenido detallado */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Artículo principal */}
          <article className="prose prose-invert max-w-none">
            <p>
              {update.excerpt}
            </p>
            <p>
              Seguiremos ampliando esta cobertura con entrevistas, materiales complementarios
              y evidencias visuales conforme avance la documentación.
            </p>
          </article>

          {/* Barra lateral con noticias relacionadas */}
          <aside>
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <h2 className="font-orbitron text-sm uppercase tracking-[0.3em] text-variable-collection-link">
                Otras noticias recientes
              </h2>
              <ul className="mt-6 space-y-4 text-sm">
                {related.map((item) => {
                  const isExternal = item.href.startsWith("http");

                  const content = (
                    <div className="rounded-2xl border border-white/5 bg-white/0 p-4 transition-colors duration-200 hover:border-white/20 hover:bg-white/5" style={createAccentStyles(item.borderColor)}>
                      <p className="font-ubuntu text-[11px] uppercase tracking-[0.25em] text-white/60">
                        {item.displayDate}
                      </p>
                      <p className="mt-1 font-ubuntu text-sm text-white transition-colors duration-200 group-hover:text-variable-collection-link">
                        {item.title}
                      </p>
                    </div>
                  );

                  return (
                    <li key={item.id}>
                      {isExternal ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
                          {content}
                        </a>
                      ) : (
                        <Link href={item.href} className="group block">
                          {content}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
