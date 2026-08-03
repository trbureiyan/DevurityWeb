/**
 * Tipos para las imágenes de la galería
 *
 * @module gallery.types
 */

export interface GalleryImage {
  id: string;
  fileName: string;
  storagePath: string;
  publicUrl: string;
  uploadedBy: string | null;
  uploadedByName: string | null;
  createdAt: string;
}

export interface CreateGalleryImageDTO {
  fileName: string;
  storagePath: string;
  publicUrl: string;
  uploadedBy?: string | null;
}
