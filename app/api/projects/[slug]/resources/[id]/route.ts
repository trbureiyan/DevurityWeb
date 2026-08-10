import { NextRequest, NextResponse } from "next/server";
import { requireProjectLeaderOrAdmin } from "@/lib/auth/projectAuth";
import { getProjectIdBySlug } from "@/repositories/projects/projects.repositories";
import { removeResource } from "@/repositories/projects/projectResources.repositories";
import supabaseStorage, { PROJECT_MEDIA_BUCKET } from "@/lib/supabaseStorage";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> },
) {
  try {
    const { slug, id } = await params;
    const projectId = await getProjectIdBySlug(slug);
    if (!projectId) {
      return NextResponse.json({ success: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    const auth = await requireProjectLeaderOrAdmin(request, projectId);
    if (auth instanceof NextResponse) return auth;

    let resourceId: bigint;
    try {
      resourceId = BigInt(id);
    } catch {
      return NextResponse.json({ success: false, error: "id invalido" }, { status: 400 });
    }

    const removed = await removeResource(projectId, resourceId);
    if (!removed) {
      return NextResponse.json({ success: false, error: "Recurso no encontrado" }, { status: 404 });
    }

    if (removed.storagePath) {
      await supabaseStorage.storage.from(PROJECT_MEDIA_BUCKET).remove([removed.storagePath]);
    }

    return NextResponse.json({ success: true, data: removed.resource });
  } catch (error) {
    console.error("Error removing project resource:", error);
    return NextResponse.json({ success: false, error: "Failed to remove resource" }, { status: 500 });
  }
}
