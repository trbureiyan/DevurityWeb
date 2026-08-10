"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { STAGE_COLORS, STAGE_LABELS } from "@/hooks/useProjects";
import type { ProjectDetail, ProjectMember } from "@/lib/types/project.types";
import ProjectPageTab from "./ProjectPageTab";
import ProjectResponsablesTab from "./ProjectResponsablesTab";
import ProjectTrazabilidadTab from "./ProjectTrazabilidadTab";

type TabKey = "page" | "responsables" | "trazabilidad";

interface ProjectDetailClientProps {
  slug: string;
  initialProject: ProjectDetail;
}

export default function ProjectDetailClient({ slug, initialProject }: ProjectDetailClientProps) {
  const { user } = useAuthContext();
  const [project, setProject] = useState<ProjectDetail>(initialProject);
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [membersLoaded, setMembersLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("page");

  const refreshMembers = useCallback(async () => {
    try {
      const res = await fetch(`/api/projects/${slug}/members`, { credentials: "include" });
      const json = await res.json();
      if (json.success) setMembers(json.data as ProjectMember[]);
    } catch (error) {
      console.error("Error cargando integrantes:", error);
    } finally {
      setMembersLoaded(true);
    }
  }, [slug]);

  useEffect(() => {
    refreshMembers();
  }, [refreshMembers]);

  const isAdmin = user?.role === "admin";
  const isAuditor = user?.role === "auditor";
  const isLeaderOfThisProject =
    !!user && members.some((m) => m.userId === user.id && m.role === "leader");

  const canEditPage = isAdmin || isLeaderOfThisProject;
  const canManageMembers = isAdmin || isLeaderOfThisProject;
  const canSeeTrazabilidad = isAdmin || isAuditor || isLeaderOfThisProject;

  const tabs: Array<{ key: TabKey; label: string; visible: boolean }> = [
    { key: "page", label: "Page", visible: true },
    { key: "responsables", label: "Responsables", visible: true },
    { key: "trazabilidad", label: "Trazabilidad", visible: canSeeTrazabilidad },
  ];

  return (
    <main className="min-h-screen bg-variable-collection-fondo text-white">
      <section className="border-b border-white/10 bg-black/40">
        <div className="container mx-auto px-6 py-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-ubuntu text-variable-collection-link transition-colors duration-200 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a proyectos
          </Link>

          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-orbitron text-3xl leading-tight md:text-4xl">{project.title}</h1>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-ubuntu uppercase tracking-wide ${STAGE_COLORS[project.stage]}`}
              >
                {STAGE_LABELS[project.stage]}
              </span>
            </div>
            <p className="max-w-3xl font-ubuntu text-white/75">{project.summary}</p>
          </div>

          <nav className="mt-8 flex gap-1 rounded-xl border border-white/10 bg-black/30 p-1 w-fit">
            {tabs
              .filter((tab) => tab.visible)
              .map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-lg px-4 py-2 text-sm font-ubuntu transition-colors duration-150 ${
                    activeTab === tab.key
                      ? "bg-[color:var(--buttons)] text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
          </nav>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        {activeTab === "page" && (
          <ProjectPageTab
            slug={slug}
            project={project}
            canEdit={canEditPage}
            onProjectChange={setProject}
          />
        )}
        {activeTab === "responsables" && (
          <ProjectResponsablesTab
            slug={slug}
            members={members}
            membersLoaded={membersLoaded}
            canManage={canManageMembers}
            isAdmin={isAdmin}
            onMembersChange={setMembers}
          />
        )}
        {activeTab === "trazabilidad" && canSeeTrazabilidad && (
          <ProjectTrazabilidadTab
            slug={slug}
            canEdit={isAdmin || isAuditor}
            isAdmin={isAdmin}
          />
        )}
      </section>
    </main>
  );
}
