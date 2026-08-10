import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrAuditor } from "@/lib/auth/projectAuth";
import { getProjectIdBySlug } from "@/repositories/projects/projects.repositories";
import { removeArticle, updateArticle } from "@/repositories/projects/projectTraceability.repositories";

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
    const article = await updateArticle(projectId, BigInt(id), {
      ...(typeof body.title === "string" && { title: body.title.trim() }),
      ...(body.authors !== undefined && { authors: body.authors }),
      ...(body.publication !== undefined && { publication: body.publication }),
      ...(body.url !== undefined && { url: body.url }),
      ...(body.publishedAt !== undefined && { publishedAt: body.publishedAt }),
    });

    if (!article) {
      return NextResponse.json({ success: false, error: "Articulo no encontrado" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json({ success: false, error: "Failed to update article" }, { status: 500 });
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

    const removed = await removeArticle(projectId, BigInt(id));
    if (!removed) {
      return NextResponse.json({ success: false, error: "Articulo no encontrado" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing article:", error);
    return NextResponse.json({ success: false, error: "Failed to remove article" }, { status: 500 });
  }
}
