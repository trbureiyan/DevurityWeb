import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { deleteGalleryImageRecord } from "@/repositories/gallery/gallery.repositories";
import { deleteGalleryImage } from "@/lib/supabase/storage";
import { extractTokenFromCookies, validateAuthToken } from "@/lib/auth/utils";
import { CACHE_TAGS } from "@/lib/cache-tags";
import logger from "@/lib/logger";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// Elimina una imagen de la galería (Storage + registro en DB). Requiere admin o content_manager.
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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
    logger.error("[DELETE /api/gallery/[id]] Error de autenticación:", error);
    return NextResponse.json({ success: false, error: "Sesión inválida" }, { status: 401 });
  }

  const { id } = await params;
  if (!id || !/^\d+$/.test(id)) {
    return NextResponse.json({ success: false, error: "ID de imagen inválido" }, { status: 400 });
  }

  try {
    const deleted = await deleteGalleryImageRecord(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Imagen no encontrada" }, { status: 404 });
    }

    try {
      await deleteGalleryImage(deleted.storagePath);
    } catch (storageError) {
      // El registro ya se eliminó de la DB; logueamos pero no fallamos la request
      // para no dejar al usuario con una imagen "fantasma" en la interfaz.
      logger.error("[DELETE /api/gallery/[id]] Error al eliminar de Storage:", storageError);
    }

    try {
      revalidateTag(CACHE_TAGS.gallery);
    } catch (e) {
      console.warn("[Cache] revalidateTag falló (entorno de pruebas):", e);
    }

    return NextResponse.json({ success: true, message: "Imagen eliminada con éxito" });
  } catch (error) {
    logger.error("[DELETE /api/gallery/[id]] Error al eliminar:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor al eliminar la imagen" },
      { status: 500 },
    );
  }
}
