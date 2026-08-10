import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, requireProjectLeaderOrAdmin } from "@/lib/auth/projectAuth";
import {
  archiveProject,
  getProjectBySlug,
  getProjectIdBySlug,
  updateProjectCore,
} from "@/repositories/projects/projects.repositories";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    if (!project) {
      return NextResponse.json({ success: false, error: "Proyecto no encontrado" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch project" }, { status: 500 });
  }
}

// Edita metadata general de la pestana "Page" (titulo/descripcion/tags/enlaces).
// El stage y los demas campos de trazabilidad se editan en /traceability (Etapa 2).
export async function PATCH(
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
    const project = await updateProjectCore(slug, {
      ...(typeof body.title === "string" && { title: body.title.trim() }),
      ...(typeof body.description === "string" && { description: body.description.trim() }),
      ...(Array.isArray(body.focusAreas) && { focusAreas: body.focusAreas }),
      ...(Array.isArray(body.stack) && { stack: body.stack }),
      ...(body.ctaLabel !== undefined && { ctaLabel: body.ctaLabel }),
      ...(body.ctaHref !== undefined && { ctaHref: body.ctaHref }),
    });

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { slug } = await params;
    const project = await archiveProject(slug);
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("Error archiving project:", error);
    return NextResponse.json({ success: false, error: "Failed to archive project" }, { status: 500 });
  }
}
