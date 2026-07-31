import { NextRequest, NextResponse } from "next/server";
import { createProject } from "@/repositories/projects/projects.repositories";
import { extractTokenFromCookies, validateAuthToken } from "@/lib/auth/utils";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import type { ProjectStage } from "@/hooks/useProjects";

const VALID_STAGES = ["incubacion", "desarrollo", "validacion", "produccion", "experimentacion", "pausa"];

// Mapea el registro retornado por el repositorio al formato ProjectItem esperado por el cliente
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

export async function POST(request: NextRequest) {
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
    console.error("[POST /api/projects] Error de autenticación:", error);
    return NextResponse.json({ success: false, error: "Sesión inválida" }, { status: 401 });
  }

  // 2. Procesar y validar el cuerpo del request
  try {
    const body = await request.json();
    const title = body.title?.trim();
    const description = (body.summary || body.description || "").trim();
    const stage = body.stage || "incubacion";
    const focusAreas = Array.isArray(body.focusAreas) ? body.focusAreas : [];
    const stack = Array.isArray(body.stack) ? body.stack : [];
    const callToAction = body.callToAction;

    if (!title) {
      return NextResponse.json({ success: false, error: "El título es requerido" }, { status: 400 });
    }
    if (!description) {
      return NextResponse.json({ success: false, error: "El resumen es requerido" }, { status: 400 });
    }
    if (focusAreas.length === 0) {
      return NextResponse.json({ success: false, error: "Se requiere al menos un área de enfoque" }, { status: 400 });
    }

    // Guardar en base de datos vía repositorio
    const newProject = await createProject({
      title,
      description,
      stage,
      focus_areas: focusAreas,
      stack,
      cta_label: callToAction?.label || null,
      cta_href: callToAction?.href || null,
    });

    // Revalidar la caché de proyectos
    try {
      revalidateTag(CACHE_TAGS.projects);
    } catch (e) {
      console.warn("[Cache] revalidateTag falló (entorno de pruebas):", e);
    }

    return NextResponse.json(
      { success: true, data: mapProjectToProjectItem(newProject) },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/projects] Error al crear proyecto:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor al crear el proyecto" },
      { status: 500 }
    );
  }
}
