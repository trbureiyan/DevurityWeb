import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrAuditor } from "@/lib/auth/projectAuth";
import { getProjectIdBySlug } from "@/repositories/projects/projects.repositories";
import { addCongress } from "@/repositories/projects/projectTraceability.repositories";

export async function POST(
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
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name) {
      return NextResponse.json({ success: false, error: "name es obligatorio" }, { status: 400 });
    }

    const congress = await addCongress(projectId, {
      name,
      role: body.role ?? null,
      location: body.location ?? null,
      url: body.url ?? null,
      heldAt: body.heldAt ?? null,
      createdBy: BigInt(auth.userId),
    });

    return NextResponse.json({ success: true, data: congress }, { status: 201 });
  } catch (error) {
    console.error("Error adding congress:", error);
    return NextResponse.json({ success: false, error: "Failed to add congress" }, { status: 500 });
  }
}
