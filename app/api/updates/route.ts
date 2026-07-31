import { NextRequest, NextResponse } from "next/server";
import { createUpdate, slugExists } from "@/repositories/updates/updates.repositories";
import { extractTokenFromCookies, validateAuthToken } from "@/lib/auth/utils";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { validateHref } from "@/lib/utils/url";

// Sanitiza una cadena para generar un slug amigable y válido
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // Descompone caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Elimina acentos
    .trim()
    .replace(/\s+/g, "-") // Reemplaza espacios con guiones
    .replace(/[^\w\-]+/g, "") // Elimina caracteres no alfanuméricos
    .replace(/\-\-+/g, "-"); // Colapsa guiones repetidos
}

// Genera un slug único consultando la base de datos
async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = slugify(title);
  if (!baseSlug) {
    return `update-${Math.random().toString(36).substring(2, 8)}`;
  }
  let slug = baseSlug;
  let exists = await slugExists(slug);
  let counter = 1;
  while (exists) {
    const suffix = Math.random().toString(36).substring(2, 6);
    slug = `${baseSlug}-${suffix}`;
    exists = await slugExists(slug);
    
    counter++;
    if (counter > 10) {
      slug = `${baseSlug}-${Date.now()}`;
      break;
    }
  }
  return slug;
}

// Mapea el registro retornado por el repositorio al formato UpdateItem esperado por el cliente
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

export async function POST(request: NextRequest) {
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
    console.error("[POST /api/updates] Error de autenticación:", error);
    return NextResponse.json({ success: false, error: "Sesión inválida" }, { status: 401 });
  }

  // 2. Procesar y validar el cuerpo del request
  try {
    const body = await request.json();
    const title = body.title?.trim();
    const description = (body.description || body.excerpt || "").trim();
    const displayDate = (body.displayDate || body.display_date || "").trim();
    const tags = Array.isArray(body.tags) ? body.tags : [];
    const hrefResult = validateHref(body.href);
    if (!hrefResult.ok) {
      return NextResponse.json({ success: false, error: hrefResult.error }, { status: 400 });
    }
    const href = hrefResult.href;
    const borderColor = body.borderColor || body.border_color || "#b20403";
    const isFeatured = body.isFeatured ?? body.is_featured ?? false;
    const status = body.status || "published";

    if (!title) {
      return NextResponse.json({ success: false, error: "El título es requerido" }, { status: 400 });
    }
    if (!description) {
      return NextResponse.json({ success: false, error: "La descripción es requerida" }, { status: 400 });
    }
    if (!displayDate) {
      return NextResponse.json({ success: false, error: "La fecha es requerida" }, { status: 400 });
    }
    if (tags.length === 0) {
      return NextResponse.json({ success: false, error: "Se requiere al menos una etiqueta" }, { status: 400 });
    }

    // Generar slug único automáticamente
    const slug = await generateUniqueSlug(title);

    // Guardar en base de datos
    const newUpdate = await createUpdate({
      slug,
      title,
      description,
      display_date: displayDate,
      tags,
      border_color: borderColor,
      href,
      is_featured: isFeatured,
      status,
    });

    // Revalidar la caché
    try {
      revalidateTag(CACHE_TAGS.updates);
    } catch (e) {
      console.warn("[Cache] revalidateTag falló (entorno de pruebas):", e);
    }

    return NextResponse.json(
      { success: true, data: mapUpdateToUpdateItem(newUpdate) },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/updates] Error al crear actualización:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor al crear la actualización" },
      { status: 500 }
    );
  }
}
