import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { listGalleryImages, createGalleryImageRecord } from "@/repositories/gallery/gallery.repositories";
import { uploadGalleryImage } from "@/lib/supabase/storage";
import { extractTokenFromCookies, validateAuthToken } from "@/lib/auth/utils";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { GALLERY_ALLOWED_MIME_TYPES, GALLERY_MAX_FILE_SIZE_BYTES } from "@/lib/constants/gallery";
import logger from "@/lib/logger";

// Listado público de imágenes de la galería (no requiere autenticación)
export async function GET() {
  try {
    const images = await listGalleryImages();
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    logger.error("[GET /api/gallery] Error al listar imágenes:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor al listar la galería" },
      { status: 500 },
    );
  }
}

// Sube una o varias imágenes a la galería (requiere admin o content_manager)
export async function POST(request: NextRequest) {
  const token = extractTokenFromCookies(request);
  if (!token) {
    return NextResponse.json({ success: false, error: "No autenticado" }, { status: 401 });
  }

  let userId: string;
  try {
    const { sub, role } = await validateAuthToken(token);
    if (role !== "admin" && role !== "content_manager") {
      return NextResponse.json({ success: false, error: "Acceso restringido" }, { status: 403 });
    }
    userId = sub;
  } catch (error) {
    logger.error("[POST /api/gallery] Error de autenticación:", error);
    return NextResponse.json({ success: false, error: "Sesión inválida" }, { status: 401 });
  }

  let files: File[];
  try {
    const formData = await request.formData();
    files = formData.getAll("files").filter((entry): entry is File => entry instanceof File);
  } catch (error) {
    logger.error("[POST /api/gallery] Error al leer el formulario:", error);
    return NextResponse.json({ success: false, error: "Formulario inválido" }, { status: 400 });
  }

  if (files.length === 0) {
    return NextResponse.json({ success: false, error: "No se recibió ningún archivo" }, { status: 400 });
  }

  const results: { fileName: string; success: boolean; error?: string; data?: unknown }[] = [];

  for (const file of files) {
    if (!GALLERY_ALLOWED_MIME_TYPES.includes(file.type as (typeof GALLERY_ALLOWED_MIME_TYPES)[number])) {
      results.push({ fileName: file.name, success: false, error: "Tipo de archivo no permitido. Solo se permiten imágenes (JPEG, PNG, WEBP, GIF)." });
      continue;
    }
    if (file.size > GALLERY_MAX_FILE_SIZE_BYTES) {
      results.push({ fileName: file.name, success: false, error: `El archivo supera el tamaño máximo de ${GALLERY_MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB.` });
      continue;
    }

    try {
      const { storagePath, publicUrl } = await uploadGalleryImage(file);
      const record = await createGalleryImageRecord({
        fileName: file.name,
        storagePath,
        publicUrl,
        uploadedBy: userId,
      });
      results.push({ fileName: file.name, success: true, data: record });
    } catch (error) {
      logger.error(`[POST /api/gallery] Error al subir "${file.name}":`, error);
      results.push({ fileName: file.name, success: false, error: "Error al subir la imagen" });
    }
  }

  const hasSuccess = results.some((r) => r.success);
  if (hasSuccess) {
    try {
      revalidateTag(CACHE_TAGS.gallery);
    } catch (e) {
      console.warn("[Cache] revalidateTag falló (entorno de pruebas):", e);
    }
  }

  return NextResponse.json(
    { success: hasSuccess, results },
    { status: hasSuccess ? 201 : 400 },
  );
}
