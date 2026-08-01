import { NextRequest, NextResponse } from "next/server";
import {
  getProjectBySlug,
  updateProject,
  hardDeleteProject,
} from "@/repositories/projects/projects.repositories";
import { extractTokenFromCookies, validateAuthToken } from "@/lib/auth/utils";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import type { ProjectStage } from "@/hooks/useProjects";
import { validateHref } from "@/lib/utils/url";

interface RouteParams {
  params: Promise<{
    id: string; // Este es el slug del proyecto pasado por el cliente
  }>;
}

const VALID_STAGES = ["incubacion", "desarrollo", "validacion", "produccion", "experimentacion", "pausa"];

// Mapea el registro al formato ProjectItem esperado por el cliente
function mapProjectToProjectItem(project: {
  slug: string;
  title: string;
  description: string;
  stage: string;
  focus_areas: string[];
  stack: string[];
  hero_image: string | null;
  cta_label: string | null;
  cta_href: string | null;
  updated_at: Date;
}) {
  const stage = (VALID_STAGES.includes(project.stage) ? project.stage : "incubacion") as ProjectStage;
  return {
    id: project.slug,
    title: project.title,
    summary: project.description,
    stage,
    focusAreas: project.focus_areas,
    stack: project.stack.filter(Boolean),
    updatedAt: project.updated_at.toISOString(),
    heroImage: project.hero_image ?? null,
    ...(project.cta_label && project.cta_href
      ? { callToAction: { label: project.cta_label, href: project.cta_href } }
      : {}),
  };
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  // 1. Verificar sesión y roles (requiere admin o lead_project)
  const token = extractTokenFromCookies(request);
  if (!token) {
    return NextResponse.json({ success: false, error: "No autenticado" }, { status: 401 });
  }

  try {
    const { role } = await validateAuthToken(token);
    if (role !== "admin" && role !== "lead_project") {
      return NextResponse.json({ success: false, error: "Acceso restringido" }, { status: 403 });
    }
  } catch (error) {
    console.error("[PUT /api/projects/[id]] Error de autenticación:", error);
    return NextResponse.json({ success: false, error: "Sesión inválida" }, { status: 401 });
  }

  const { id: slug } = await params;
  if (!slug) {
    return NextResponse.json({ success: false, error: "Slug de proyecto requerido" }, { status: 400 });
  }

  // 2. Verificar existencia del proyecto
  try {
    const existingProject = await getProjectBySlug(slug);
    if (!existingProject) {
      return NextResponse.json({ success: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    // 3. Procesar cuerpo de la petición
    const body = await request.json();
    const title = body.title?.trim();
    const description = body.summary !== undefined ? (body.summary || "").trim() : undefined;
    const stage = body.stage;
    const focusAreas = Array.isArray(body.focusAreas) ? body.focusAreas : undefined;
    const stack = Array.isArray(body.stack) ? body.stack : undefined;
    const callToAction = body.callToAction;

    const updateData: import("@/repositories/projects/projects.repositories").UpdateProjectDTO = {};
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (stage !== undefined) {
      if (typeof stage !== "string" || !VALID_STAGES.includes(stage)) {
        return NextResponse.json({ success: false, error: "Etapa inválida" }, { status: 400 });
      }
      updateData.stage = stage;
    }
    if (focusAreas) updateData.focus_areas = focusAreas;
    if (stack) updateData.stack = stack;

    if (callToAction !== undefined) {
      const hrefResult = validateHref(callToAction?.href);
      if (!hrefResult.ok) {
        return NextResponse.json({ success: false, error: hrefResult.error }, { status: 400 });
      }
      updateData.cta_label = callToAction?.label || null;
      updateData.cta_href = hrefResult.href;
    }

    // Actualizar en base de datos
    const updated = await updateProject(existingProject.id, updateData);

    // Revalidar la caché de proyectos
    try {
      revalidateTag(CACHE_TAGS.projects);
    } catch (e) {
      console.warn("[Cache] revalidateTag falló (entorno de pruebas):", e);
    }

    return NextResponse.json({
      success: true,
      data: mapProjectToProjectItem(updated),
    });
  } catch (error) {
    console.error("[PUT /api/projects/[id]] Error al actualizar:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor al actualizar" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  // 1. Verificar sesión y roles (requiere admin o lead_project)
  const token = extractTokenFromCookies(request);
  if (!token) {
    return NextResponse.json({ success: false, error: "No autenticado" }, { status: 401 });
  }

  try {
    const { role } = await validateAuthToken(token);
    if (role !== "admin" && role !== "lead_project") {
      return NextResponse.json({ success: false, error: "Acceso restringido" }, { status: 403 });
    }
  } catch (error) {
    console.error("[DELETE /api/projects/[id]] Error de autenticación:", error);
    return NextResponse.json({ success: false, error: "Sesión inválida" }, { status: 401 });
  }

  const { id: slug } = await params;
  if (!slug) {
    return NextResponse.json({ success: false, error: "Slug de proyecto requerido" }, { status: 400 });
  }

  // 2. Verificar existencia del proyecto
  try {
    const existingProject = await getProjectBySlug(slug);
    if (!existingProject) {
      return NextResponse.json({ success: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    // 3. Borrado físico permanente de la base de datos (hard delete)
    await hardDeleteProject(existingProject.id);

    // Revalidar la caché de proyectos
    try {
      revalidateTag(CACHE_TAGS.projects);
    } catch (e) {
      console.warn("[Cache] revalidateTag falló (entorno de pruebas):", e);
    }

    return NextResponse.json({
      success: true,
      message: "Proyecto eliminado permanentemente con éxito",
    });
  } catch (error) {
    console.error("[DELETE /api/projects/[id]] Error al eliminar:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor al eliminar el proyecto" },
      { status: 500 }
    );
  }
}
