import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, requireAdminOrAuditor } from "@/lib/auth/projectAuth";
import { createProject, listProjects, slugExists } from "@/repositories/projects/projects.repositories";
import type { ProjectStage } from "@/lib/types/project.types";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita acentos tras la normalizacion NFD
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .substring(0, 60);
}

// GET: listado paginado para administracion (admin/auditor). El catalogo publico
// se sirve desde app/projects/page.tsx via lib/data/projects.ts, no desde aqui.
export async function GET(request: NextRequest) {
  const auth = await requireAdminOrAuditor(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.max(1, Math.min(Number(searchParams.get("limit")) || 20, 100));
    const search = searchParams.get("search") || undefined;
    const stage = (searchParams.get("stage") as ProjectStage) || undefined;

    const result = await listProjects({ search, stage, includeArchived: true }, page, limit);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error listing projects:", error);
    return NextResponse.json({ success: false, error: "Failed to list projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: "title y description son obligatorios" },
        { status: 400 },
      );
    }

    let slug = slugify(title);
    if (!slug) slug = "proyecto";
    let candidate = slug;
    let suffix = 1;
    while (await slugExists(candidate)) {
      candidate = `${slug}-${suffix}`;
      suffix++;
    }

    const project = await createProject({
      slug: candidate,
      title,
      description,
      focusAreas: Array.isArray(body.focusAreas) ? body.focusAreas : [],
      stack: Array.isArray(body.stack) ? body.stack : [],
      ctaLabel: typeof body.ctaLabel === "string" ? body.ctaLabel : null,
      ctaHref: typeof body.ctaHref === "string" ? body.ctaHref : null,
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 });
  }
}
