import prisma from "@/lib/postgresDriver";
import type { GalleryImage, CreateGalleryImageDTO } from "@/lib/types/gallery.types";

/**
 * Repository para operaciones CRUD de las imágenes de la galería
 *
 * @module gallery.repositories
 */

function mapPrismaToGalleryImage(record: {
  id: bigint;
  file_name: string;
  storage_path: string;
  public_url: string;
  uploaded_by: bigint | null;
  created_at: Date;
  users: { name: string; last_name: string } | null;
}): GalleryImage {
  return {
    id: record.id.toString(),
    fileName: record.file_name,
    storagePath: record.storage_path,
    publicUrl: record.public_url,
    uploadedBy: record.uploaded_by ? record.uploaded_by.toString() : null,
    uploadedByName: record.users ? `${record.users.name} ${record.users.last_name}`.trim() : null,
    createdAt: record.created_at.toISOString(),
  };
}

// Lista todas las imágenes de la galería, más recientes primero
export async function listGalleryImages(): Promise<GalleryImage[]> {
  const images = await prisma.gallery_images.findMany({
    orderBy: { created_at: "desc" },
    include: { users: { select: { name: true, last_name: true } } },
  });

  return images.map(mapPrismaToGalleryImage);
}

// Crea el registro de metadatos de una imagen recién subida a Storage
export async function createGalleryImageRecord(data: CreateGalleryImageDTO): Promise<GalleryImage> {
  const image = await prisma.gallery_images.create({
    data: {
      file_name: data.fileName,
      storage_path: data.storagePath,
      public_url: data.publicUrl,
      uploaded_by: data.uploadedBy ? BigInt(data.uploadedBy) : null,
    },
    include: { users: { select: { name: true, last_name: true } } },
  });

  return mapPrismaToGalleryImage(image);
}

// Busca una imagen por su ID
export async function getGalleryImageById(id: string | bigint): Promise<GalleryImage | null> {
  const numericId = typeof id === "string" ? BigInt(id) : id;

  const image = await prisma.gallery_images.findUnique({
    where: { id: numericId },
    include: { users: { select: { name: true, last_name: true } } },
  });

  if (!image) return null;
  return mapPrismaToGalleryImage(image);
}

// Elimina el registro de una imagen; retorna el registro eliminado para poder
// limpiar también el archivo correspondiente en Storage
export async function deleteGalleryImageRecord(id: string | bigint): Promise<GalleryImage | null> {
  const numericId = typeof id === "string" ? BigInt(id) : id;

  const existing = await prisma.gallery_images.findUnique({
    where: { id: numericId },
    include: { users: { select: { name: true, last_name: true } } },
  });

  if (!existing) return null;

  await prisma.gallery_images.delete({ where: { id: numericId } });

  return mapPrismaToGalleryImage(existing);
}
