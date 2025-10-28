"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

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

interface PaginatedResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function ConfirmUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  const fetchPendingUsers = async (page: number = 1, limit: number = 12) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/auth/admin/users?page=${page}&limit=${limit}`,
      );
      const result = await response.json();

      if (result.success) {
        setUsers(result.data.users);
        setPagination({
          page: result.data.page,
          limit: result.data.limit,
          total: result.data.total,
          totalPages: result.data.totalPages,
        });
      } else {
        setError(result.error || "Error al cargar los usuarios pendientes");
      }
    } catch (error) {
      console.error("Error fetching pending users:", error);
      setError("Error de conexión al cargar los usuarios pendientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchPendingUsers(newPage, pagination.limit);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    fetchPendingUsers(1, newLimit);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Confirmación de Usuarios
        </h1>
        <p className="text-gray-400">
          Gestiona las solicitudes de registro pendientes de aprobación
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Users Grid */}
      <div className="mb-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-[#1A1515] border border-[#2E2E2E] rounded-lg p-6 animate-pulse"
              >
                <div className="h-4 bg-[#2E2E2E] rounded mb-3"></div>
                <div className="h-3 bg-[#2E2E2E] rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="bg-[#1A1515] border border-[#2E2E2E] rounded-lg p-8 text-center">
            <p className="text-white text-lg mb-4">
              No hay solicitudes de registro pendientes
            </p>
            <p className="text-gray-400">
              Todas las solicitudes han sido procesadas
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {users.map((user) => (
              <Link
                key={user.id}
                href={`/admin/users/confirm/${user.id}`}
                className="bg-[#1A1515] border border-[#2E2E2E] rounded-lg p-6 hover:bg-[#2E2E2E] hover:border-link transition-all duration-200 cursor-pointer group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-link rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-link/80 transition-colors">
                    <span className="text-white font-semibold text-lg">
                      {user.name.charAt(0)}
                      {user.last_name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-link transition-colors">
                    {user.name} {user.last_name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Semestre {user.semester}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {users.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">
              Mostrando {(pagination.page - 1) * pagination.limit + 1} -{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              de {pagination.total} usuarios
            </span>
            <select
              value={pagination.limit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
              className="bg-[#1A1515] border border-[#2E2E2E] text-white rounded px-3 py-1 text-sm"
            >
              <option value="8">8 por página</option>
              <option value="12">12 por página</option>
              <option value="16">16 por página</option>
              <option value="20">20 por página</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1 bg-[#1A1515] border border-[#2E2E2E] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2E2E2E] transition-colors"
            >
              Anterior
            </button>
            <span className="px-3 py-1 text-white text-sm">
              Página {pagination.page} de {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="px-3 py-1 bg-[#1A1515] border border-[#2E2E2E] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2E2E2E] transition-colors"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
