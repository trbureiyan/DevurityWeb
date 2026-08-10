"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { STAGE_LABELS } from "@/hooks/useProjects";
import type { ProjectStage } from "@/lib/types/project.types";
import type {
  DashboardProjectRow,
  DashboardSummary,
} from "@/repositories/projects/projectTraceability.repositories";

export default function TraceabilityDashboardPage() {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [projects, setProjects] = useState<DashboardProjectRow[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && user?.role !== "admin" && user?.role !== "auditor") {
      router.push("/");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch("/api/projects/dashboard/summary", { credentials: "include" });
        const json = await res.json();
        if (!json.success) {
          setError(json.error || "Error al cargar el dashboard");
          return;
        }
        setSummary(json.data.summary as DashboardSummary);
        setProjects(json.data.projects as DashboardProjectRow[]);
      } catch {
        setError("Error de red al cargar el dashboard");
      } finally {
        setIsFetching(false);
      }
    }
    void fetchSummary();
  }, []);

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-white/60">Cargando trazabilidad…</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-300">{error}</p>;
  }

  const metricCards = [
    { label: "Proyectos activos", value: summary?.totalProjects ?? 0 },
    { label: "Con financiación", value: summary?.fundedProjects ?? 0 },
    { label: "Artículos publicados", value: summary?.totalArticles ?? 0 },
    { label: "Participaciones en congresos", value: summary?.totalCongresses ?? 0 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Trazabilidad de Proyectos</h1>
        <p className="text-white/60 mt-1">
          Estado general del semillero. Los acuerdos se toman fuera de la plataforma;
          esta vista solo mantiene la información actualizada y visible.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card) => (
          <div
            key={card.label}
            className="bg-[#221b1b] border border-[rgba(140,140,140,0.2)] rounded-lg p-5"
          >
            <p className="text-3xl font-bold text-white">{card.value}</p>
            <p className="text-sm text-white/60 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {summary && Object.keys(summary.byStage).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(summary.byStage).map(([stage, count]) => (
            <span
              key={stage}
              className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-white/70"
            >
              {STAGE_LABELS[stage as ProjectStage] ?? stage}: {count}
            </span>
          ))}
        </div>
      )}

      <div className="bg-[#221b1b] border border-[rgba(140,140,140,0.2)] rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/50">
              <th className="px-4 py-3 font-normal">Proyecto</th>
              <th className="px-4 py-3 font-normal">Estado</th>
              <th className="px-4 py-3 font-normal">Líder</th>
              <th className="px-4 py-3 font-normal">Última actualización</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.slug} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-white hover:text-variable-collection-link"
                  >
                    {project.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-white/70">
                  {STAGE_LABELS[project.stage as ProjectStage] ?? project.stage}
                </td>
                <td className="px-4 py-3 text-white/70">{project.leaderName ?? "—"}</td>
                <td className="px-4 py-3 text-white/50">
                  {new Date(project.updatedAt).toLocaleDateString("es-CO")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
