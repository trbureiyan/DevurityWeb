import React from "react";
import { getAdminDashboardStats } from "@/lib/data/admin";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
// Forzar que esta página sea dinámica para obtener estadísticas en tiempo real.
export const dynamic = "force-dynamic";
// Panel de administración que muestra estadísticas clave.
export default async function AdminDashboard() {
  try {
    const stats = await getAdminDashboardStats();
    return <AdminDashboardClient initialStats={stats} />;
  } catch (error) {
    console.error("[AdminDashboard] Error al obtener estadisticas:", error);
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold text-white mb-2">Panel de administracion</h1>
        <p className="text-sm text-gray-400">
          No se pudieron cargar las estadisticas. Intenta de nuevo mas tarde.
        </p>
      </div>
    );
  }
}
