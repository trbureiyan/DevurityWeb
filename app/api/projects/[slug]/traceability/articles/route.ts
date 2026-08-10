import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrAuditor } from "@/lib/auth/projectAuth";
import { getProjectIdBySlug } from "@/repositories/projects/projects.repositories";
import { addArticle } from "@/repositories/projects/projectTraceability.repositories";

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
    const title = typeof body.title === "string" ? body.title.trim() : "";
    if (!title) {
      return NextResponse.json({ success: false, error: "title es obligatorio" }, { status: 400 });
    }

    const article = await addArticle(projectId, {
      title,
      authors: body.authors ?? null,
      publication: body.publication ?? null,
      url: body.url ?? null,
      publishedAt: body.publishedAt ?? null,
      createdBy: BigInt(auth.userId),
    });

    return NextResponse.json({ success: true, data: article }, { status: 201 });
  } catch (error) {
    console.error("Error adding article:", error);
    return NextResponse.json({ success: false, error: "Failed to add article" }, { status: 500 });
  }
}
