"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCsrf } from "@/hooks/useCsrf";

interface User {
  id: string;
  name: string;
  last_name: string;
  email: string;
  personal_email: string | null;
  motivation: string;
  semester: number;
  roles: {
    name: string;
  };
  user_skills: Array<{
    skills: {
      name: string;
    };
  }>;
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const { fetchWithCsrf, loading: csrfLoading } = useCsrf();

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/auth/admin/users?userId=${params.id}`);
      const result = await response.json();

      if (result.success && result.data.users.length > 0) {
        setUser(result.data.users[0]);
      } else {
        setError("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Error de conexión al cargar el usuario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchUser();
    }
  }, [params.id]);

  const handleApprove = async () => {
    if (!user) return;

    setProcessing(true);
    try {
      const response = await fetchWithCsrf(`/api/auth/admin/users/${user.id}`, {
        method: "PUT",
      });
      const result = await response.json();

      if (result.success) {
        router.push("/admin/users/confirm");
      } else {
        setError(result.error || "Error al aprobar el usuario");
      }
    } catch (error) {
      console.error("Error approving user:", error);
      setError("Error de conexión al aprobar el usuario");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!user) return;

    if (
      !confirm(
        `¿Estás seguro de que deseas rechazar la solicitud de ${user.name} ${user.last_name}? Esta acción no se puede deshacer.`,
      )
    ) {
      return;
    }

    setProcessing(true);
    try {
      const response = await fetchWithCsrf(`/api/auth/admin/users/${user.id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (result.success) {
        router.push("/admin/users/confirm");
      } else {
        setError(result.error || "Error al rechazar el usuario");
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
      setError("Error de conexión al rechazar el usuario");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-[#2E2E2E] rounded w-1/3 mb-4"></div>
          <div className="bg-[#1A1515] border border-[#2E2E2E] rounded-lg p-6">
            <div className="h-6 bg-[#2E2E2E] rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-[#2E2E2E] rounded"></div>
              <div className="h-4 bg-[#2E2E2E] rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="p-8">
        <div className="mb-6">
          <Link
            href="/admin/users/confirm"
            className="text-link hover:text-link/80 text-sm font-medium mb-4 inline-block"
          >
            ← Volver a solicitudes
          </Link>
          <h1 className="text-2xl font-semibold text-white mb-2">
            Error al cargar usuario
          </h1>
        </div>
        <div className="bg-[#1A1515] border border-red-700 rounded-lg p-6">
          <p className="text-red-400">{error || "Usuario no encontrado"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/users/confirm"
          className="text-link hover:text-link/80 text-sm font-medium mb-4 inline-block"
        >
          ← Volver a solicitudes
        </Link>
        <h1 className="text-2xl font-semibold text-white mb-2">
          Solicitud de Registro
        </h1>
        <p className="text-gray-400">
          Revisa los detalles de la solicitud de registro
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* User Details */}
      <div className="bg-[#1A1515] border border-[#2E2E2E] rounded-lg p-6 mb-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-link rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-2xl">
              {user.name.charAt(0)}
              {user.last_name.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="text-white font-semibold text-xl">
              {user.name} {user.last_name}
            </h2>
            <p className="text-gray-400">{user.roles.name}</p>
          </div>
        </div>

        {/* User Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Información Personal
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">Email Institucional</p>
                <p className="text-white">{user.email}</p>
              </div>
              {user.personal_email && (
                <div>
                  <p className="text-gray-400 text-sm">Email Personal</p>
                  <p className="text-white">{user.personal_email}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400 text-sm">Semestre</p>
                <p className="text-white">Semestre {user.semester}</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-white font-semibold mb-4">Habilidades</h3>
            {user.user_skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.user_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#2E2E2E] text-white text-sm rounded-full"
                  >
                    {skill.skills.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No se registraron habilidades</p>
            )}
          </div>
        </div>

        {/* Motivation */}
        <div className="mt-6">
          <h3 className="text-white font-semibold mb-4">Motivación</h3>
          <div className="bg-[#0A0808] border border-[#2E2E2E] rounded-lg p-4">
            <p className="text-white whitespace-pre-wrap">{user.motivation}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          onClick={handleReject}
          disabled={processing}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? "Procesando..." : "Rechazar"}
        </button>
        <button
          onClick={handleApprove}
          disabled={processing}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? "Procesando..." : "Aprobar"}
        </button>
      </div>
    </div>
  );
}
