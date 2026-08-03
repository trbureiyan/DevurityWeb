import { randomUUID } from "crypto";
import { getSupabaseAdmin } from "./admin";
import { GALLERY_ALLOWED_MIME_TYPES, GALLERY_MAX_FILE_SIZE_BYTES } from "@/lib/constants/gallery";
import logger from "@/lib/logger";

const BUCKET = process.env.SUPABASE_GALLERY_BUCKET || "gallery";

let bucketEnsured = false;

// Crea el bucket de la galería si aún no existe (idempotente, no requiere pasos manuales en el dashboard)
export async function ensureGalleryBucketExists(): Promise<void> {
  if (bucketEnsured) return;

  const supabase = getSupabaseAdmin();
  const { data: existing, error: getError } = await supabase.storage.getBucket(BUCKET);

  if (getError && !existing) {
    const { error: createError } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: GALLERY_MAX_FILE_SIZE_BYTES,
      allowedMimeTypes: [...GALLERY_ALLOWED_MIME_TYPES],
    });

    // Ignorar condición de carrera si otro request ya lo creó primero
    if (createError && !/already exists/i.test(createError.message)) {
      throw new Error(`No se pudo crear el bucket de la galería: ${createError.message}`);
    }
  }

  bucketEnsured = true;
}

interface UploadResult {
  storagePath: string;
  publicUrl: string;
}

// Sube un archivo al bucket de la galería con un nombre único, evitando colisiones
export async function uploadGalleryImage(
  file: File,
): Promise<UploadResult> {
  await ensureGalleryBucketExists();

  const supabase = getSupabaseAdmin();
  const extension = file.name.includes(".") ? file.name.split(".").pop() : "";
  const storagePath = `${randomUUID()}${extension ? `.${extension}` : ""}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Error al subir la imagen a Supabase Storage: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

  return { storagePath, publicUrl: data.publicUrl };
}

// Elimina un archivo del bucket de la galería. No lanza si el archivo ya no existe.
export async function deleteGalleryImage(storagePath: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.storage.from(BUCKET).remove([storagePath]);

  if (error) {
    logger.error("[deleteGalleryImage] No se pudo eliminar el archivo de Storage:", error);
    throw new Error(`Error al eliminar la imagen de Supabase Storage: ${error.message}`);
  }
}
