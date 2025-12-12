import React from "react";
import { getAdminDashboardStats } from "@/lib/data/admin";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
// Forzar que esta página sea dinámica para obtener estadísticas en tiempo real.
export const dynamic = "force-dynamic";
// Panel de administración que muestra estadísticas clave.
export default async function AdminDashboard() {
  const stats = await getAdminDashboardStats();

  return <AdminDashboardClient initialStats={stats} />;
}
