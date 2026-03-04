"use client";

import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
const FiClock = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const FiPlusCircle = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);
const FiCalendar = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const FiEdit = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const FiExternalLink = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// Importar tipos de updates
type UpdateItem = {
  id: string;
  title: string;
  excerpt: string;
  displayDate: string;
  href?: string;
  tags: string[];
  borderColor: string;
  isLocal?: boolean;
  imageUrl?: string;
};

// Componente para gestión de imágenes
function ImageManagementSection() {
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop",
  ]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleAddImage = () => {
    if (newImageUrl) {
      setImages([newImageUrl, ...images]);
      setNewImageUrl("");
      setUploadModalOpen(false);
    }
  };

  const handleDeleteImage = (imageToDelete: string) => {
    if (confirm("¿Estás seguro de eliminar esta imagen?")) {
      setImages(images.filter(img => img !== imageToDelete));
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

      {/* Grid de imágenes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div key={index} className="group relative aspect-square bg-[#2a2424] rounded-lg overflow-hidden">
            <Image
              src={img}
              alt={`Gallery image ${index + 1}`}
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
                className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-full transition-colors"
                title="Eliminar imagen"
              >
                <FiTrash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de subida */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-[#221b1b] border border-[rgba(140,140,140,0.2)] rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-white mb-4">Subir Nueva Imagen</h3>
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="URL de la imagen"
              className="w-full px-4 py-2 bg-[#2a2424] border border-[rgba(140,140,140,0.2)] rounded-lg text-white mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setUploadModalOpen(false)}
                className="px-4 py-2 border border-[rgba(140,140,140,0.2)] hover:border-white/40 text-white rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddImage}
                className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors"
              >
                Subir
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
              src={selectedImage}
              alt="Imagen ampliada"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Componente para gestión de updates
function UpdatesManagementSection() {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState<UpdateItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    date: "",
    tags: "",
    href: "",
    imageUrl: "",
  });

  // Cargar updates al montar
  useEffect(() => {
    // Aquí cargarías los updates de tu API o localStorage
    const savedUpdates = localStorage.getItem("content-manager-updates");
    if (savedUpdates) {
      setUpdates(JSON.parse(savedUpdates));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(Boolean);
    const months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
    const [year, month, day] = formData.date.split("-");
    const displayDate = `${day} ${months[parseInt(month) - 1]} ${year}`;

    if (editingUpdate) {
      // Editar existente
      const updated = updates.map(u => 
        u.id === editingUpdate.id 
          ? { ...u, title: formData.title, excerpt: formData.excerpt, displayDate, tags: tagsArray, href: formData.href, imageUrl: formData.imageUrl }
          : u
      );
      setUpdates(updated);
      localStorage.setItem("content-manager-updates", JSON.stringify(updated));
    } else {
      // Crear nuevo
      const newUpdate: UpdateItem = {
        id: `update-${Date.now()}`,
        title: formData.title,
        excerpt: formData.excerpt,
        displayDate,
        tags: tagsArray,
        href: formData.href || "#",
        imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
        borderColor: "#b20403",
        isLocal: true,
      };
      const updated = [newUpdate, ...updates];
      setUpdates(updated);
      localStorage.setItem("content-manager-updates", JSON.stringify(updated));
    }

    resetForm();
  };

  const handleEdit = (update: UpdateItem) => {
    setEditingUpdate(update);
    setFormData({
      title: update.title,
      excerpt: update.excerpt,
      date: convertDisplayToDate(update.displayDate),
      tags: update.tags.join(", "),
      href: update.href || "",
      imageUrl: update.imageUrl || "",
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta actualización?")) {
      const updated = updates.filter(u => u.id !== id);
      setUpdates(updated);
      localStorage.setItem("content-manager-updates", JSON.stringify(updated));
    }
  };

  const convertDisplayToDate = (displayDate: string): string => {
    const months: { [key: string]: string } = {
      "ENE": "01", "FEB": "02", "MAR": "03", "ABR": "04", "MAY": "05", "JUN": "06",
      "JUL": "07", "AGO": "08", "SEP": "09", "OCT": "10", "NOV": "11", "DIC": "12"
    };
    const [day, month, year] = displayDate.split(" ");
    return `${year}-${months[month]}-${day}`;
  };

  const resetForm = () => {
    setFormData({ title: "", excerpt: "", date: "", tags: "", href: "", imageUrl: "" });
    setEditingUpdate(null);
    setShowForm(false);
  };

  return (
    <div className="bg-[#221b1b] border border-[rgba(140,140,140,0.2)] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FiClock className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-white">Gestión de Updates</h2>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm"
        >
          <FiPlusCircle className="w-4 h-4" />
          Nueva Actualización
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-[#2a2424] rounded-lg space-y-4">
          <h3 className="text-white font-medium">
            {editingUpdate ? "Editar Actualización" : "Nueva Actualización"}
          </h3>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Título *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 bg-[#1a1515] border border-[rgba(140,140,140,0.2)] rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Descripción *</label>
            <textarea
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 bg-[#1a1515] border border-[rgba(140,140,140,0.2)] rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Fecha *</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-3 py-2 bg-[#1a1515] border border-[rgba(140,140,140,0.2)] rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Tags (separados por coma) *</label>
            <input
              type="text"
              required
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="evento, taller, noticia"
              className="w-full px-3 py-2 bg-[#1a1515] border border-[rgba(140,140,140,0.2)] rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Link (opcional)</label>
            <input
              type="text"
              value={formData.href}
              onChange={(e) => setFormData({...formData, href: e.target.value})}
              className="w-full px-3 py-2 bg-[#1a1515] border border-[rgba(140,140,140,0.2)] rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">URL de imagen (opcional)</label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              className="w-full px-3 py-2 bg-[#1a1515] border border-[rgba(140,140,140,0.2)] rounded-lg text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-[rgba(140,140,140,0.2)] hover:border-white/40 text-white rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors"
            >
              {editingUpdate ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      )}

      {/* Lista de updates */}
      <div className="space-y-4">
        {updates.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No hay actualizaciones. ¡Crea una!</p>
        ) : (
          updates.map((update) => (
            <div
              key={update.id}
              className="flex items-start gap-4 p-4 bg-[#2a2424] rounded-lg group"
            >
              {update.imageUrl && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={update.imageUrl}
                    alt={update.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <FiCalendar className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{update.displayDate}</span>
                </div>
                <h4 className="text-white font-medium truncate">{update.title}</h4>
                <p className="text-sm text-gray-400 line-clamp-2">{update.excerpt}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {update.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-[#1a1515] text-gray-300 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(update)}
                  className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-lg transition-colors"
                  title="Editar"
                >
                  <FiEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(update.id)}
                  className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
                {update.href && update.href !== "#" && (
                  <a
                    href={update.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg transition-colors"
                    title="Ver enlace"
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Dashboard principal
export default function ContentManagerDashboardPage() {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

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
          Bienvenido, {user?.name}. Gestiona la galería de imágenes y las actualizaciones del sistema
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#221b1b] border border-[rgba(140,140,140,0.2)] rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FiImage className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">24</p>
              <p className="text-gray-400">Imágenes en galería</p>
            </div>
          </div>
        </div>
        <div className="bg-[#221b1b] border border-[rgba(140,140,140,0.2)] rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FiClock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-gray-400">Actualizaciones publicadas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secciones de gestión */}
      <div className="space-y-6">
        <ImageManagementSection />
        <UpdatesManagementSection />
      </div>
    </div>
  );
}