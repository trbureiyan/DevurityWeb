import prisma from "@/lib/postgresDriver";
import Link from "next/link";

async function getCurrentUserFromDB() {
  return prisma.users.findFirst({
    where: { role_id: 4 }, // leader_project real
  });
}

export default async function LeaderProjectsPage() {
  const currentUser = await getCurrentUserFromDB();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f12] text-white">
        Usuario líder no encontrado
      </div>
    );
  }

  const relations = await prisma.user_projects.findMany({
    where: { user_id: currentUser.id },
    include: { projects: true, users: true },
  });

  const valid = relations.filter(r => r.projects);
  const projects = valid.map(r => r.projects!);

  const total = projects.length;
  const archived = projects.filter(p => p.is_archived).length;
  const active = total - archived;

  if (!total) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f12] text-white">
        <div className="bg-[#18181c] border border-white/5 rounded-3xl p-10 text-center">
          <h1 className="text-xl font-semibold mb-2">
            No tienes proyectos asignados
          </h1>
          <p className="text-white/60">
            El rol líder no asigna proyectos automáticamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f12] text-white p-8 space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Panel de Liderazgo
          </h1>
          <p className="text-white/50 text-sm">
            {currentUser.name} {currentUser.last_name}
          </p>
        </div>

        <Link
          href="/projects"
          className="bg-[#7f1d1d] hover:bg-[#991b1b] px-5 py-2 rounded-xl text-sm font-medium transition shadow-lg"
        >
          Ver proyectos
        </Link>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard label="Total" value={total} />
        <StatCard label="Activos" value={active} />
        <StatCard label="Archivados" value={archived} />
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {valid.map(relation => {
          const project = relation.projects!;
          return (
            <Link
              key={project.id.toString()}
              href="/projects"
              className="group bg-[#18181c] border border-white/5 rounded-3xl p-6 hover:border-red-800/40 hover:bg-[#1f1f24] transition shadow-xl"
            >
              <div className="space-y-4">

                <div className="flex justify-between items-start">
                  <h2 className="font-semibold text-lg group-hover:text-red-300">
                    {project.title}
                  </h2>
                  <StatusBadge archived={project.is_archived} />
                </div>

                <p className="text-sm text-white/60 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex justify-between text-xs text-white/50 pt-3 border-t border-white/5">
                  <span>
                    {project.start_date
                      ? new Date(project.start_date).toLocaleDateString("es-CO")
                      : "Sin fecha"}
                  </span>

                  <span className="text-red-400 font-medium">
                    {relation.project_role || "Miembro"}
                  </span>
                </div>

              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* UI */

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-[#18181c] border border-white/5 rounded-2xl p-6">
      <p className="text-xs text-white/50 uppercase">{label}</p>
      <p className="text-3xl font-semibold mt-2">{value}</p>
    </div>
  );
}

function StatusBadge({ archived }: { archived: boolean | null }) {
  return archived ? (
    <span className="text-xs px-2 py-1 rounded bg-white/5 text-white/60">
      Archivado
    </span>
  ) : (
    <span className="text-xs px-2 py-1 rounded bg-red-900/30 text-red-300">
      Activo
    </span>
  );
}