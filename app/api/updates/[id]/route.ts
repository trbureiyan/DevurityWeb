import { NextRequest, NextResponse } from "next/server";
import {
  getUpdateById,
  updateUpdate,
  hardDeleteUpdate,
} from "@/repositories/updates/updates.repositories";
import { extractTokenFromCookies, validateAuthToken } from "@/lib/auth/utils";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { validateHref } from "@/lib/utils/url";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// Mapea el registro al formato UpdateItem esperado por el cliente
function mapUpdateToUpdateItem(update: {
  id: string | bigint;
  slug: string;
  title: string;
  description: string;
  display_date: string;
  published_at: Date | string;
  tags: string[];
  border_color: string;
  href: string | null;
}) {
  const slug = update.slug.trim();
  const rawHref = update.href?.trim() || "";
  const href = rawHref && rawHref !== "#" ? rawHref : `/updates/${slug}`;

  return {
    id: update.id.toString(),
    title: update.title,
    excerpt: update.description,
    publishedAt: typeof update.published_at === "string"
      ? update.published_at
      : update.published_at.toISOString(),
    displayDate: update.display_date,
    tags: update.tags,
    borderColor: update.border_color,
    slug,
    href,
  };
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  // 1. Verificar sesión y roles (requiere admin o content_manager)
  const token = extractTokenFromCookies(request);
  if (!token) {
    return NextResponse.json({ success: false, error: "No autenticado" }, { status: 401 });
  }

  try {
    const { role } = await validateAuthToken(token);
    if (role !== "admin" && role !== "content_manager") {
      return NextResponse.json({ success: false, error: "Acceso restringido" }, { status: 403 });
    }
  } catch (error) {
    console.error("[PUT /api/updates/[id]] Error de autenticación:", error);
    return NextResponse.json({ success: false, error: "Sesión inválida" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, error: "ID de actualización requerido" }, { status: 400 });
  }
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ success: false, error: "ID de actualización inválido" }, { status: 400 });
  }

  // 2. Verificar existencia de la actualización
  try {
    const existingUpdate = await getUpdateById(id);
    if (!existingUpdate) {
      return NextResponse.json({ success: false, error: "Actualización no encontrada" }, { status: 404 });
    }

    // 3. Procesar cuerpo de la petición
    const body = await request.json();
    const title = body.title?.trim();
    const description = (body.description || body.excerpt || "").trim();
    const displayDate = (body.displayDate || body.display_date || "").trim();
    const tags = Array.isArray(body.tags) ? body.tags : undefined;
    let href: string | null | undefined = undefined;
    if (body.href !== undefined) {
      const hrefResult = validateHref(body.href);
      if (!hrefResult.ok) {
        return NextResponse.json({ success: false, error: hrefResult.error }, { status: 400 });
      }
      href = hrefResult.href;
    }
    const borderColor = body.borderColor || body.border_color;
    const isFeatured = body.isFeatured ?? body.is_featured;
    const status = body.status;

    const updateData: import("@/lib/types/update.types").UpdateUpdateDTO = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (displayDate) updateData.display_date = displayDate;
    if (tags) updateData.tags = tags;
    if (href !== undefined) updateData.href = href;
    if (borderColor) updateData.border_color = borderColor;
    if (isFeatured !== undefined) updateData.is_featured = isFeatured;
    if (status) updateData.status = status;

    // Actualizar en base de datos
    const updated = await updateUpdate(id, updateData);

    // Revalidar la caché
    try {
      revalidateTag(CACHE_TAGS.updates);
    } catch (e) {
      console.warn("[Cache] revalidateTag falló (entorno de pruebas):", e);
    }

    return NextResponse.json({
      success: true,
      data: mapUpdateToUpdateItem(updated),
    });
  } catch (error) {
    console.error("[PUT /api/updates/[id]] Error al actualizar:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor al actualizar" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  // 1. Verificar sesión y roles (requiere admin o content_manager)
  const token = extractTokenFromCookies(request);
  if (!token) {
    return NextResponse.json({ success: false, error: "No autenticado" }, { status: 401 });
  }

  try {
    const { role } = await validateAuthToken(token);
    if (role !== "admin" && role !== "content_manager") {
      return NextResponse.json({ success: false, error: "Acceso restringido" }, { status: 403 });
    }
  } catch (error) {
    console.error("[DELETE /api/updates/[id]] Error de autenticación:", error);
    return NextResponse.json({ success: false, error: "Sesión inválida" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, error: "ID de actualización requerido" }, { status: 400 });
  }
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ success: false, error: "ID de actualización inválido" }, { status: 400 });
  }

  // 2. Verificar existencia de la actualización
  try {
    const existingUpdate = await getUpdateById(id);
    if (!existingUpdate) {
      return NextResponse.json({ success: false, error: "Actualización no encontrada" }, { status: 404 });
    }

    // 3. Borrado físico permanente de la actualización (hard delete)
    await hardDeleteUpdate(id);

    // Revalidar la caché
    try {
      revalidateTag(CACHE_TAGS.updates);
    } catch (e) {
      console.warn("[Cache] revalidateTag falló (entorno de pruebas):", e);
    }

    return NextResponse.json({
      success: true,
      message: "Actualización eliminada permanentemente con éxito",
    });
  } catch (error) {
    console.error("[DELETE /api/updates/[id]] Error al eliminar:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor al eliminar la actualización" },
      { status: 500 }
    );
  }
}
