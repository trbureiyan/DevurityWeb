import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, requireTraceabilityReadAccess } from "@/lib/auth/projectAuth";
import { getProjectIdBySlug } from "@/repositories/projects/projects.repositories";
import { addComment, getTraceability } from "@/repositories/projects/projectTraceability.repositories";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const projectId = await getProjectIdBySlug(slug);
    if (!projectId) {
      return NextResponse.json({ success: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    const auth = await requireTraceabilityReadAccess(request, projectId);
    if (auth instanceof NextResponse) return auth;

    const bundle = await getTraceability(slug);
    return NextResponse.json({ success: true, data: bundle?.comments ?? [] });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch comments" }, { status: 500 });
  }
}

// Solo administradores agregan comentarios/anotaciones (la especificacion no menciona
// auditores para esta accion especifica, a diferencia de la edicion de trazabilidad).
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { slug } = await params;
    const projectId = await getProjectIdBySlug(slug);
    if (!projectId) {
      return NextResponse.json({ success: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    const body = await request.json();
    const text = typeof body.body === "string" ? body.body.trim() : "";
    if (!text) {
      return NextResponse.json({ success: false, error: "body es obligatorio" }, { status: 400 });
    }

    const comment = await addComment(projectId, BigInt(auth.userId), text);
    return NextResponse.json({ success: true, data: comment }, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ success: false, error: "Failed to add comment" }, { status: 500 });
  }
}
