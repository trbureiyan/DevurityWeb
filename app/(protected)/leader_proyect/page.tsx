"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { FolderIcon } from "@heroicons/react/24/outline";

interface Project {
  title: string;
  link: string;
}

export default function LeaderProyectPage() {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!isLoading && user?.role !== "lead_project" && user?.role !== "admin") {
      router.push("/");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (!user?.id) return;

    async function fetchProjects() {
      try {
        const res = await fetch(`/api/auth/users/${user!.id}`);
        if (!res.ok) return;
        const data = await res.json();
        setProjects(data?.working_on ?? []);
      } finally {
        setIsFetching(false);
      }
    }

    void fetchProjects();
  }, [user]);

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-white/60">Cargando proyectos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Mis Proyectos</h1>
        <p className="text-white/60 mt-1">
          Proyectos donde eres líder asignado
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-white/40">
          <FolderIcon className="w-16 h-16" />
          <p className="text-lg">No tienes proyectos asignados aún</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-[#221b1b] border border-[rgba(140,140,140,0.2)] rounded-lg p-5"
            >
              <div className="flex items-start gap-3">
                <FolderIcon className="w-5 h-5 text-[#01754f] shrink-0 mt-0.5" />
                <h2 className="text-white font-semibold leading-snug">
                  {project.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
