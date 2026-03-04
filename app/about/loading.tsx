/*
  Suspense skeleton para la ruta /about.
  Next.js App Router muestra este componente automáticamente mientras page.tsx
  espera resolver sus datos (fetch del equipo desde la BD). Sin este archivo,
  el usuario vería una pantalla en blanco durante el tiempo de fetch.

  La estructura replica la forma de la página real (hero de pantalla completa +
  grid de cards del equipo) para evitar el salto de layout (CLS) al cargar el
  contenido real y dar retroalimentación visual inmediata.
*/
export default function AboutLoading() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero skeleton */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
        <div className="relative h-full flex flex-col items-center justify-center px-6 pt-20">
          <div className="text-center space-y-6">
            <div className="h-16 w-96 bg-zinc-800 rounded mx-auto animate-pulse" />
            <div className="h-6 w-64 bg-zinc-800 rounded mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Team skeleton */}
      <section className="relative bg-black py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <div className="h-12 w-80 bg-zinc-800 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {/*
              key con índice: aceptable aquí porque Array.from({ length: 8 }) produce
              siempre exactamente 8 elementos en el mismo orden — el array es estático
              y nunca se reordena ni filtra. El prefijo 'skeleton-' lo hace descriptivo
              en DevTools y evita la advertencia de herramientas que esperan key string.
            */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="bg-zinc-900/50 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-zinc-800" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-zinc-800 rounded" />
                  <div className="h-4 bg-zinc-800 rounded w-3/4" />
                  <div className="h-3 bg-zinc-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
