"use client";

import { useState } from "react";
import { useCsrf } from "@/hooks/useCsrf";
import type { ProjectMember } from "@/lib/types/project.types";

interface ProjectResponsablesTabProps {
  slug: string;
  members: ProjectMember[];
  membersLoaded: boolean;
  canManage: boolean;
  isAdmin: boolean;
  onMembersChange: (members: ProjectMember[]) => void;
}

function avatarUrl(name: string, lastName: string): string {
  const initials = encodeURIComponent(`${name} ${lastName}`.trim());
  return `https://ui-avatars.com/api/?name=${initials}&background=ca2b26&color=fff`;
}

export default function ProjectResponsablesTab({
  slug,
  members,
  membersLoaded,
  canManage,
  isAdmin,
  onMembersChange,
}: ProjectResponsablesTabProps) {
  const { fetchWithCsrf } = useCsrf();
  const [username, setUsername] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addUser = async () => {
    const cleanUsername = username.trim().replace(/^@/, "");
    if (!cleanUsername) return;
    setBusy(true);
    setError(null);
    try {
      const lookup = await fetch(`/api/auth/users/username/${cleanUsername}`, { credentials: "include" });
      const lookupJson = await lookup.json();
      if (!lookup.ok) {
        setError(lookupJson.error || "Usuario no encontrado");
        return;
      }

      const res = await fetchWithCsrf(`/api/projects/${slug}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: lookupJson.id }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Error al agregar el integrante");
        return;
      }
      onMembersChange(json.data as ProjectMember[]);
      setUsername("");
    } catch {
      setError("Error de red al agregar el integrante");
    } finally {
      setBusy(false);
    }
  };

  const removeUser = async (userId: string) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetchWithCsrf(`/api/projects/${slug}/members/${userId}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Error al quitar el integrante");
        return;
      }
      onMembersChange(json.data as ProjectMember[]);
    } catch {
      setError("Error de red al quitar el integrante");
    } finally {
      setBusy(false);
    }
  };

  const setLeader = async (userId: string) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetchWithCsrf(`/api/projects/${slug}/members/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "leader" }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Error al asignar el liderazgo");
        return;
      }
      onMembersChange(json.data as ProjectMember[]);
    } catch {
      setError("Error de red al asignar el liderazgo");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-4 font-orbitron text-sm uppercase tracking-[0.3em] text-variable-collection-link">
        Integrantes
      </h2>

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      {!membersLoaded ? (
        <p className="font-ubuntu text-white/60">Cargando integrantes…</p>
      ) : members.length === 0 ? (
        <p className="font-ubuntu text-white/60">Este proyecto todavía no tiene integrantes asignados.</p>
      ) : (
        <ul className="space-y-3">
          {members.map((member) => (
            <li
              key={member.userId}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element -- avatar externo (ui-avatars.com), ya permitido en next.config remotePatterns pero no vale la pena el overhead de next/image aqui */}
                <img
                  src={avatarUrl(member.name, member.lastName)}
                  alt={`${member.name} ${member.lastName}`}
                  className="h-9 w-9 rounded-full"
                />
                <div>
                  <p className="font-ubuntu text-sm text-white">
                    {member.name} {member.lastName}
                  </p>
                  {member.username && <p className="font-ubuntu text-xs text-white/50">@{member.username}</p>}
                </div>
                {member.role === "leader" && (
                  <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-2 py-0.5 text-[11px] font-ubuntu uppercase text-yellow-300">
                    Líder
                  </span>
                )}
              </div>

              {canManage && (
                <div className="flex items-center gap-3">
                  {isAdmin && member.role !== "leader" && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => setLeader(member.userId)}
                      className="text-xs font-ubuntu text-white/60 hover:text-white disabled:opacity-50"
                    >
                      Asignar líder
                    </button>
                  )}
                  {member.role !== "leader" && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => removeUser(member.userId)}
                      className="text-xs font-ubuntu text-red-300 hover:text-red-200 disabled:opacity-50"
                    >
                      − remove user
                    </button>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {canManage && (
        <div className="mt-6 flex gap-2">
          <input
            type="text"
            placeholder="username del integrante"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/40"
          />
          <button
            type="button"
            disabled={busy || !username.trim()}
            onClick={addUser}
            className="rounded-lg bg-[color:var(--buttons)] px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            + add user
          </button>
        </div>
      )}
      {isAdmin && (
        <p className="mt-3 font-ubuntu text-xs text-white/40">
          * Los admins conceden el rol de líder a los integrantes.
        </p>
      )}
    </div>
  );
}
