import { NextRequest, NextResponse } from "next/server";
import { requireProjectLeaderOrAdmin } from "@/lib/auth/projectAuth";
import { getProjectIdBySlug } from "@/repositories/projects/projects.repositories";
import { addMember, listMembers } from "@/repositories/projects/projectMembers.repositories";
import { findByIdWithFullProfile } from "@/repositories/users/users.repositories";

// Publica: la lista de integrantes es parte de la pagina publica del proyecto.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const projectId = await getProjectIdBySlug(slug);
    if (!projectId) {
      return NextResponse.json({ success: false, error: "Proyecto no encontrado" }, { status: 404 });
    }
    const members = await listMembers(projectId);
    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error("Error listing project members:", error);
    return NextResponse.json({ success: false, error: "Failed to list members" }, { status: 500 });
  }
}

// Siempre agrega como "member". Promover a "leader" es un admin-only PATCH en
// members/[userId] (setLeader), nunca una accion directa de este endpoint.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const projectId = await getProjectIdBySlug(slug);
    if (!projectId) {
      return NextResponse.json({ success: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    const auth = await requireProjectLeaderOrAdmin(request, projectId);
    if (auth instanceof NextResponse) return auth;

    const body = await request.json();
    const userId = typeof body.userId === "string" || typeof body.userId === "number" ? String(body.userId) : "";
    if (!userId) {
      return NextResponse.json({ success: false, error: "userId es obligatorio" }, { status: 400 });
    }

    const targetUser = await findByIdWithFullProfile(userId);
    if (!targetUser) {
      return NextResponse.json({ success: false, error: "Usuario no encontrado" }, { status: 404 });
    }

    await addMember(projectId, BigInt(userId));
    const members = await listMembers(projectId);

    return NextResponse.json({ success: true, data: members }, { status: 201 });
  } catch (error) {
    console.error("Error adding project member:", error);
    return NextResponse.json({ success: false, error: "Failed to add member" }, { status: 500 });
  }
}
