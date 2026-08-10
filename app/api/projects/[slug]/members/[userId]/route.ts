import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, requireProjectLeaderOrAdmin } from "@/lib/auth/projectAuth";
import { getProjectIdBySlug } from "@/repositories/projects/projects.repositories";
import {
  LeaderRemovalError,
  listMembers,
  removeMember,
  setLeader,
} from "@/repositories/projects/projectMembers.repositories";
import { PROJECT_ROLES } from "@/lib/constants/roles";

// Unico cambio de rol soportado: promover a "leader" (admin-only, via setLeader — que
// degrada automaticamente a "member" a cualquier lider anterior). No existe una accion
// de "degradar" directa: quitar el liderazgo de alguien es asignarselo a otra persona.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; userId: string }> },
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { slug, userId } = await params;
    const projectId = await getProjectIdBySlug(slug);
    if (!projectId) {
      return NextResponse.json({ success: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    const body = await request.json();
    if (body.role !== PROJECT_ROLES.LEADER) {
      return NextResponse.json(
        { success: false, error: "Solo se admite role: \"leader\" (asignar liderazgo)" },
        { status: 400 },
      );
    }

    await setLeader(projectId, BigInt(userId));
    const members = await listMembers(projectId);

    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error("Error setting project leader:", error);
    return NextResponse.json({ success: false, error: "Failed to update member role" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; userId: string }> },
) {
  try {
    const { slug, userId } = await params;
    const projectId = await getProjectIdBySlug(slug);
    if (!projectId) {
      return NextResponse.json({ success: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    const auth = await requireProjectLeaderOrAdmin(request, projectId);
    if (auth instanceof NextResponse) return auth;

    await removeMember(projectId, BigInt(userId));
    const members = await listMembers(projectId);

    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    if (error instanceof LeaderRemovalError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 409 });
    }
    console.error("Error removing project member:", error);
    return NextResponse.json({ success: false, error: "Failed to remove member" }, { status: 500 });
  }
}
