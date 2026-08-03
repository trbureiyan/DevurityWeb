"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCsrf } from "@/hooks/useCsrf";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { GalleryImage } from "@/lib/types/gallery.types";
import { GALLERY_ALLOWED_MIME_TYPES, GALLERY_MAX_FILE_SIZE_BYTES } from "@/lib/constants/gallery";
// ─── Inline SVG icons (Feather-style) — replaces react-icons/fi ──────────────
type IconProps = { className?: string };
const FiImage = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
  </svg>
);
const FiUpload = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);
const FiEye = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const FiTrash2 = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);
// Resultado de subida por archivo, devuelto por POST /api/gallery
type UploadResultItem = { fileName: string; success: boolean; error?: string; data?: GalleryImage };

/**
 * Hook que gestiona la galería de imágenes conectándose a /api/gallery
 * (Supabase Storage + tabla gallery_images). Centraliza fetch, subida y
 * eliminación para que el conteo del dashboard y la sección de gestión
 * compartan una única fuente de verdad.
 */
function useGalleryAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchWithCsrf } = useCsrf();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch("/api/gallery");
        const result = await response.json();
        if (cancelled) return;

        if (result.success) {
          setImages(result.data);
        } else {
          setError(result.error || "No se pudo cargar la galería");
        }
      } catch {
        if (!cancelled) setError("No se pudo conectar con el servidor");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const uploadImages = useCallback(
    async (files: File[]): Promise<UploadResultItem[]> => {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const response = await fetchWithCsrf("/api/gallery", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      const results: UploadResultItem[] = result.results || [];

      const uploaded = results
        .filter((r): r is UploadResultItem & { data: GalleryImage } => r.success && !!r.data)
        .map((r) => r.data);

      if (uploaded.length > 0) {
        setImages((prev) => [...uploaded, ...prev]);
      }

      return results;
    },
    [fetchWithCsrf],
  );

  const deleteImage = useCallback(
    async (id: string): Promise<void> => {
      const response = await fetchWithCsrf(`/api/gallery/${id}`, { method: "DELETE" });
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Error al eliminar la imagen");
      }

      setImages((prev) => prev.filter((img) => img.id !== id));
    },
    [fetchWithCsrf],
  );

  return { images, isLoading, error, uploadImages, deleteImage };
}

interface ImageManagementSectionProps {
  images: GalleryImage[];
  isLoading: boolean;
  loadError: string | null;
  onUpload: (files: File[]) => Promise<UploadResultItem[]>;
  onDelete: (id: string) => Promise<void>;
}

// Componente para gestión de imágenes
function ImageManagementSection({ images, isLoading, loadError, onUpload, onDelete }: ImageManagementSectionProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [banner, setBanner] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const maxSizeLabel = `${GALLERY_MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB`;

  const validateFiles = (files: File[]): { valid: File[]; errors: string[] } => {
    const valid: File[] = [];
    const errors: string[] = [];

    for (const file of files) {
      if (!GALLERY_ALLOWED_MIME_TYPES.includes(file.type as (typeof GALLERY_ALLOWED_MIME_TYPES)[number])) {
        errors.push(`${file.name}: tipo de archivo no permitido (solo imágenes JPEG, PNG, WEBP o GIF)`);
        continue;
      }
      if (file.size > GALLERY_MAX_FILE_SIZE_BYTES) {
        errors.push(`${file.name}: supera el tamaño máximo de ${maxSizeLabel}`);
        continue;
      }
      valid.push(file);
    }

    return { valid, errors };
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const { valid, errors } = validateFiles(files);
    setSelectedFiles(valid);
    setFileErrors(errors);
  };

  const closeUploadModal = () => {
    setUploadModalOpen(false);
    setSelectedFiles([]);
    setFileErrors([]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setBanner(null);
    try {
      const results = await onUpload(selectedFiles);
      const succeeded = results.filter((r) => r.success);
      const failed = results.filter((r) => !r.success);

      if (succeeded.length > 0 && failed.length === 0) {
        setBanner({ type: "success", message: `${succeeded.length} imagen(es) subida(s) con éxito.` });
        closeUploadModal();
      } else if (succeeded.length > 0 && failed.length > 0) {
        setBanner({
          type: "error",
          message: `${succeeded.length} subida(s), ${failed.length} fallida(s): ${failed.map((f) => `${f.fileName} (${f.error})`).join(", ")}`,
        });
        closeUploadModal();
      } else {
        setFileErrors(failed.map((f) => `${f.fileName}: ${f.error}`));
      }
    } catch {
      setBanner({ type: "error", message: "Error al subir las imágenes. Intenta de nuevo." });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (image: GalleryImage) => {
    if (!confirm("¿Estás seguro de eliminar esta imagen?")) return;

    setDeletingId(image.id);
    setBanner(null);
    try {
      await onDelete(image.id);
      if (selectedImage?.id === image.id) setSelectedImage(null);
      setBanner({ type: "success", message: "Imagen eliminada con éxito." });
    } catch (err) {
      setBanner({ type: "error", message: err instanceof Error ? err.message : "Error al eliminar la imagen" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-[#221b1b] border border-[rgba(140,140,140,0.2)] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FiImage className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-white">Gestión de Galería</h2>
        </div>
        <button
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm"
        >
          <FiUpload className="w-4 h-4" />
          Subir Imagen
        </button>
      </div>

      {/* Banner de éxito/error */}
      {(banner || loadError) && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg text-sm ${
            loadError || banner?.type === "error"
              ? "bg-red-500/10 text-red-400 border border-red-500/20"
              : "bg-green-500/10 text-green-400 border border-green-500/20"
          }`}
        >
          {loadError || banner?.message}
        </div>
      )}

      {/* Estado de carga */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 text-gray-400">No hay imágenes en la galería todavía.</div>
      ) : (
        /* Grid de imágenes */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative aspect-square bg-[#2a2424] rounded-lg overflow-hidden">
              <Image
                src={img.publicUrl}
                alt={img.fileName}
                fill
                className="object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                onClick={() => setSelectedImage(img)}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => setSelectedImage(img)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  title="Ver imagen"
                >
                  <FiEye className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => handleDeleteImage(img)}
                  disabled={deletingId === img.id}
                  className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-full transition-colors disabled:opacity-50"
                  title="Eliminar imagen"
                >
                  {deletingId === img.id ? (
                    <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FiTrash2 className="w-4 h-4 text-red-500" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de subida */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-[#221b1b] border border-[rgba(140,140,140,0.2)] rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-white mb-4">Subir Nuevas Imágenes</h3>
            <input
              type="file"
              accept={GALLERY_ALLOWED_MIME_TYPES.join(",")}
              multiple
              onChange={handleFileSelect}
              disabled={isUploading}
              className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20 bg-[#2a2424] border border-[rgba(140,140,140,0.2)] rounded-lg mb-2"
            />
            <p className="text-xs text-gray-500 mb-4">JPEG, PNG, WEBP o GIF. Máximo {maxSizeLabel} por imagen.</p>

            {selectedFiles.length > 0 && (
              <ul className="text-sm text-gray-300 mb-4 space-y-1 max-h-32 overflow-y-auto">
                {selectedFiles.map((file) => (
                  <li key={file.name}>{file.name} ({(file.size / 1024).toFixed(0)} KB)</li>
                ))}
              </ul>
            )}

            {fileErrors.length > 0 && (
              <ul className="text-xs text-red-400 mb-4 space-y-1">
                {fileErrors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeUploadModal}
                disabled={isUploading}
                className="px-4 py-2 border border-[rgba(140,140,140,0.2)] hover:border-white/40 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={isUploading || selectedFiles.length === 0}
                className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isUploading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {isUploading ? "Subiendo..." : "Subir"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de imagen */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={selectedImage.publicUrl}
              alt={selectedImage.fileName}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Dashboard principal
export default function ContentManagerDashboardPage() {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();
  const gallery = useGalleryAdmin();

  useEffect(() => {
    if (!isLoading && user?.role !== "content_manager" && user?.role !== "admin") {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Panel de Content Manager
        </h1>
        <p className="text-gray-400">
          Bienvenido, {user?.name}. Gestiona la galería de imágenes del sistema
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-[#221b1b] border border-[rgba(140,140,140,0.2)] rounded-lg p-6 max-w-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FiImage className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{gallery.isLoading ? "…" : gallery.images.length}</p>
              <p className="text-gray-400">Imágenes en galería</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secciones de gestión */}
      <div className="space-y-6">
        <ImageManagementSection
          images={gallery.images}
          isLoading={gallery.isLoading}
          loadError={gallery.error}
          onUpload={gallery.uploadImages}
          onDelete={gallery.deleteImage}
        />
      </div>
    </div>
  );
}