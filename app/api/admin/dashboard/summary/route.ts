import { NextResponse } from "next/server";
import { getAdminDashboardStats } from "@/lib/data/admin";

// GET /api/admin/dashboard/summary
// Devuelve métricas consolidadas para el panel admin (usuarios, asistencias hoy, etc.).
export async function GET() {
  try {
    const stats = await getAdminDashboardStats();
    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    return NextResponse.json(
      { error: "Error fetching dashboard summary" },
      { status: 500 }
    );
  }
}
