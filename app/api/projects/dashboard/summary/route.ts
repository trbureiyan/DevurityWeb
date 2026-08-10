import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrAuditor } from "@/lib/auth/projectAuth";
import { getDashboardSummary, listProjectsForDashboard } from "@/repositories/projects/projectTraceability.repositories";

// Unica ruta del modulo tambien gateada por prefijo en middleware.ts (igual que
// /leader_proyect): no tiene scoping por proyecto, asi que el chequeo de rol global
// es seguro de resolver en Edge. El check aqui es defensa en profundidad, consistente
// con el resto de /api/projects/**.
export async function GET(request: NextRequest) {
  const auth = await requireAdminOrAuditor(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const [summary, projects] = await Promise.all([getDashboardSummary(), listProjectsForDashboard()]);
    return NextResponse.json({ success: true, data: { summary, projects } });
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch dashboard summary" }, { status: 500 });
  }
}
