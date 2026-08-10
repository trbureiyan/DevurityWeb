import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrAuditor } from "@/lib/auth/projectAuth";
import { getProjectIdBySlug } from "@/repositories/projects/projects.repositories";
import { removeCongress, updateCongress } from "@/repositories/projects/projectTraceability.repositories";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> },
) {
  const auth = await requireAdminOrAuditor(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { slug, id } = await params;
    const projectId = await getProjectIdBySlug(slug);
    if (!projectId) {
      return NextResponse.json({ success: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    const body = await request.json();
    const congress = await updateCongress(projectId, BigInt(id), {
      ...(typeof body.name === "string" && { name: body.name.trim() }),
      ...(body.role !== undefined && { role: body.role }),
      ...(body.location !== undefined && { location: body.location }),
      ...(body.url !== undefined && { url: body.url }),
      ...(body.heldAt !== undefined && { heldAt: body.heldAt }),
    });

    if (!congress) {
      return NextResponse.json({ success: false, error: "Congreso no encontrado" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: congress });
  } catch (error) {
    console.error("Error updating congress:", error);
    return NextResponse.json({ success: false, error: "Failed to update congress" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> },
) {
  const auth = await requireAdminOrAuditor(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { slug, id } = await params;
    const projectId = await getProjectIdBySlug(slug);
    if (!projectId) {
      return NextResponse.json({ success: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    const removed = await removeCongress(projectId, BigInt(id));
    if (!removed) {
      return NextResponse.json({ success: false, error: "Congreso no encontrado" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing congress:", error);
    return NextResponse.json({ success: false, error: "Failed to remove congress" }, { status: 500 });
  }
}
