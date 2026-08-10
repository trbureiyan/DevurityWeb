import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrAuditor, requireTraceabilityReadAccess } from "@/lib/auth/projectAuth";
import { getProjectIdBySlug } from "@/repositories/projects/projects.repositories";
import { getTraceability, updateTraceabilityFields } from "@/repositories/projects/projectTraceability.repositories";
import { VALID_STAGES, type ProjectStage } from "@/lib/types/project.types";

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
    return NextResponse.json({ success: true, data: bundle });
  } catch (error) {
    console.error("Error fetching traceability:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch traceability" }, { status: 500 });
  }
}

// Solo admin|auditor pueden escribir. El lider tiene acceso de lectura (GET arriba) pero
// nunca llega aqui: requireAdminOrAuditor rechaza aunque sea el lider de este proyecto.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const auth = await requireAdminOrAuditor(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { slug } = await params;
    const projectId = await getProjectIdBySlug(slug);
    if (!projectId) {
      return NextResponse.json({ success: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    const body = await request.json();
    if (body.stage !== undefined && !VALID_STAGES.includes(body.stage as ProjectStage)) {
      return NextResponse.json({ success: false, error: "stage invalido" }, { status: 400 });
    }

    await updateTraceabilityFields(slug, {
      ...(body.stage !== undefined && { stage: body.stage }),
      ...(body.currentPhase !== undefined && { currentPhase: body.currentPhase }),
      ...(body.projectType !== undefined && { projectType: body.projectType }),
      ...(body.hasFunding !== undefined && { hasFunding: !!body.hasFunding }),
      ...(body.fundingSource !== undefined && { fundingSource: body.fundingSource }),
      ...(body.fundingNotes !== undefined && { fundingNotes: body.fundingNotes }),
    });

    const bundle = await getTraceability(slug);
    return NextResponse.json({ success: true, data: bundle });
  } catch (error) {
    console.error("Error updating traceability:", error);
    return NextResponse.json({ success: false, error: "Failed to update traceability" }, { status: 500 });
  }
}
