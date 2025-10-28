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
      const response = await fetch(`/api/auth/admin/users/${params.id}`);
      const result = await response.json();

      if (result.success) {
        setUser(result.data);
      } else {
        setError(result.error || "Error al cargar el usuario");
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

    if (!confirm("¿Estás seguro de que deseas rechazar esta solicitud?")) {
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
      <div className="p-4 lg:p-8">
        <div className="animate-pulse">
          <div className="h-6 lg:h-8 bg-[#2E2E2E] rounded w-1/2 lg:w-1/3 mb-4"></div>
          <div className="bg-[#1A1515] border border-[#2E2E2E] rounded-lg p-4 lg:p-6">
            <div className="h-5 lg:h-6 bg-[#2E2E2E] rounded w-1/3 lg:w-1/4 mb-4"></div>
            <div className="space-y-2 lg:space-y-3">
              <div className="h-3 lg:h-4 bg-[#2E2E2E] rounded"></div>
              <div className="h-3 lg:h-4 bg-[#2E2E2E] rounded w-2/3 lg:w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="p-4 lg:p-8">
        <div className="mb-4 lg:mb-6">
          <Link
            href="/admin/users/confirm"
            className="text-link hover:text-link/80 text-xs lg:text-sm font-medium mb-4 inline-block"
          >
            ← Volver a solicitudes
          </Link>
          <h1 className="text-xl lg:text-2xl font-semibold text-white mb-2">
            Error al cargar usuario
          </h1>
        </div>
        <div className="bg-[#1A1515] border border-red-700 rounded-lg p-4 lg:p-6">
          <p className="text-red-400 text-sm lg:text-base">
            {error || "Usuario no encontrado"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-4 lg:mb-6">
        <Link
          href="/admin/users/confirm"
          className="text-link hover:text-link/80 text-xs lg:text-sm font-medium mb-4 inline-block"
        >
          ← Volver a solicitudes
        </Link>
        <h1 className="text-xl lg:text-2xl font-semibold text-white mb-2">
          Solicitud de Registro
        </h1>
        <p className="text-gray-400 text-sm lg:text-base">
          Revisa los detalles de la solicitud de registro
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-red-900/20 border border-red-700 rounded-lg">
          <p className="text-red-400 text-sm lg:text-base">{error}</p>
        </div>
      )}

      {/* User Details Card */}
      <div className="bg-[#1A1515] border border-[#2E2E2E] rounded-lg p-4 lg:p-6 mb-6">
        <h2 className="text-white font-semibold text-lg lg:text-xl mb-4 lg:mb-6">
          Información del Usuario
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Personal Information */}
          <div className="space-y-3 lg:space-y-4">
            <div>
              <label className="block text-gray-400 text-xs lg:text-sm font-medium mb-1">
                Nombre Completo
              </label>
              <p className="text-white text-sm lg:text-base">
                {user.name} {user.last_name}
              </p>
            </div>

            <div>
              <label className="block text-gray-400 text-xs lg:text-sm font-medium mb-1">
                Email Universitario
              </label>
              <p className="text-white text-sm lg:text-base">{user.email}</p>
            </div>

            {user.personal_email && (
              <div>
                <label className="block text-gray-400 text-xs lg:text-sm font-medium mb-1">
                  Email Personal
                </label>
                <p className="text-white text-sm lg:text-base">
                  {user.personal_email}
                </p>
              </div>
            )}
          </div>

          {/* Academic Information */}
          <div className="space-y-3 lg:space-y-4">
            <div>
              <label className="block text-gray-400 text-xs lg:text-sm font-medium mb-1">
                Semestre
              </label>
              <p className="text-white text-sm lg:text-base">{user.semester}</p>
            </div>

            <div>
              <label className="block text-gray-400 text-xs lg:text-sm font-medium mb-1">
                Rol Solicitado
              </label>
              <p className="text-white text-sm lg:text-base capitalize">
                {user.roles.name}
              </p>
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="mt-4 lg:mt-6">
          <label className="block text-gray-400 text-xs lg:text-sm font-medium mb-2">
            Motivación
          </label>
          <div className="bg-[#0A0808] border border-[#2E2E2E] rounded-lg p-3 lg:p-4">
            <p className="text-white text-sm lg:text-base leading-relaxed">
              {user.motivation}
            </p>
          </div>
        </div>

        {/* Skills */}
        {user.user_skills.length > 0 && (
          <div className="mt-4 lg:mt-6">
            <label className="block text-gray-400 text-xs lg:text-sm font-medium mb-2">
              Habilidades
            </label>
            <div className="flex flex-wrap gap-2">
              {user.user_skills.map((userSkill, index) => (
                <span
                  key={index}
                  className="bg-[#2E2E2E] text-white text-xs lg:text-sm px-2 lg:px-3 py-1 rounded-full"
                >
                  {userSkill.skills.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
        <button
          onClick={handleApprove}
          disabled={processing}
          className="flex-1 px-4 lg:px-6 py-2 lg:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm lg:text-base"
        >
          {processing ? "Procesando..." : "Aprobar Solicitud"}
        </button>

        <button
          onClick={handleReject}
          disabled={processing}
          className="flex-1 px-4 lg:px-6 py-2 lg:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm lg:text-base"
        >
          {processing ? "Procesando..." : "Rechazar Solicitud"}
        </button>
      </div>
    </div>
  );
}
