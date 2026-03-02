import prisma from "@/lib/postgresDriver";
import Link from "next/link";

/* Usuario de prueba con rol content_manager */
async function getCurrentUserFromDB() {
  return prisma.users.findFirst({
    where: { role_id: 3 },
  });
}

export default async function ContentManagerDashboardPage() {
  const currentUser = await getCurrentUserFromDB();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0b0e] text-white">
        Usuario Gestor de Contenido no encontrado
      </div>
    );
  }

  const updates = await prisma.updates.findMany({
    where: { status: "published" },
    orderBy: { published_at: "desc" },
  });

  const total = updates.length;
  const events = updates.filter(u => u.tags?.includes("evento")).length;
  const news = updates.filter(u => u.tags?.includes("noticia")).length;

  if (!total) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0b0e] text-white">
        <div className="bg-[#121218] border border-white/10 rounded-3xl p-12 text-center shadow-2xl">
          <h1 className="text-xl font-semibold mb-2">
            No hay contenido publicado
          </h1>
          <p className="text-white/60">
            Cuando existan publicaciones visibles aparecerán aquí.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-white px-6 md:px-10 py-10 space-y-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
              Gestor de Contenido
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Panel de Publicaciones
          </h1>

          <p className="text-white/50 text-sm mt-1">
            {currentUser.name} {currentUser.last_name}
          </p>
        </div>

        <Link
          href="/updates"
          className="bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-2 rounded-xl text-sm font-medium transition"
        >
          Ver sitio público
        </Link>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-5">
        <StatCard label="Publicaciones" value={total} />
        <StatCard label="Eventos" value={events} />
        <StatCard label="Noticias" value={news} />
      </div>

      {/* GRID */}
<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
  {updates.map(update => (
    <Link
      key={update.id.toString()}
      href="/updates"
      className="group block"
    >
      <article className="bg-[#121218] border border-white/10 rounded-3xl p-6 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition cursor-pointer">
        <div className="space-y-4">

          <div className="flex justify-between items-start gap-4">
            <h2 className="font-semibold text-lg leading-snug group-hover:text-blue-300 transition">
              {update.title}
            </h2>

            <StatusBadge />
          </div>

          <p className="text-sm text-white/60 line-clamp-3 leading-relaxed">
            {update.description}
          </p>

          <div className="flex justify-between text-xs text-white/50 pt-3 border-t border-white/10">
            <span>
              {update.display_date || "Sin fecha"}
            </span>

            <span>
              {update.published_at
                ? new Date(update.published_at).toLocaleDateString("es-CO")
                : ""}
            </span>
          </div>

          {update.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {update.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md bg-white/5 text-white/60 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

        </div>
      </article>
    </Link>
  ))}
</div>
    </div>
  );
}

/* UI */

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-[#121218] border border-white/10 rounded-2xl p-6 shadow-xl">
      <p className="text-xs text-white/50 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-3xl font-semibold mt-2">
        {value}
      </p>
    </div>
  );
}

function StatusBadge() {
  return (
    <span className="text-xs px-2 py-1 rounded-md bg-green-500/10 text-green-300 border border-green-500/20">
      Publicado
    </span>
  );
}