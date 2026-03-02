"use client";

import { useState } from "react";
import NextImage from "next/image";
import { PencilIcon, PhotoIcon, XMarkIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { IMAGES } from "@/public/images";

// ============ COLOR UNIFICADO ============
const ACCENT_COLOR = "#b20403";

// ============ IMÁGENES DE EJEMPLO ============
const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
];

// ============ INTERFACES ============
interface GalleryClientProps {
  images: string[];
}

interface GalleryGridProps {
  images: string[];
  onImageClick: (src: string) => void;
}

interface ImageModalProps {
  imageSrc: string;
  onClose: () => void;
}

interface EditGalleryModalProps {
  images: string[];
  onClose: () => void;
  onAddImages: (newImages: string[]) => void;
  onDeleteImage: (image: string) => void;
  onReorderImages: (reorderedImages: string[]) => void;
}

// ============ COMPONENTE GALLERY GRID ============
function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-10 text-white/50 font-ubuntu">
        No hay imágenes para mostrar
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {images.map((src, index) => (
        <div
          key={index}
          className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer border border-white/10 hover:border-red-600/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_25px_60px_-20px_rgba(178,4,3,0.55)]"
          onClick={() => onImageClick(src)}
        >
          <NextImage
            src={src}
            alt={`Foto ${index + 1}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Número de imagen */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="bg-red-600/80 text-white text-xs font-ubuntu px-3 py-1.5 rounded-full backdrop-blur-sm">
              #{String(index + 1).padStart(2, '0')}
            </span>
          </div>
          
          {/* Icono de zoom */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-2">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============ COMPONENTE IMAGE MODAL ============
function ImageModal({ imageSrc, onClose }: ImageModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 cursor-zoom-out animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Botón de cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      >
        <XMarkIcon className="w-6 h-6 text-white/60 group-hover:text-white" />
      </button>

      {/* Contador de imágenes (simulado) */}
      <div className="absolute top-6 left-6 z-50">
        <span className="font-ubuntu text-sm text-white/60 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
          Vista previa
        </span>
      </div>

      {/* Imagen */}
      <div className="relative w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <NextImage
          src={imageSrc}
          alt="Zoom"
          fill
          className="object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>

      {/* Decoración */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm font-ubuntu">
        Click en cualquier parte para cerrar
      </div>
    </div>
  );
}

// ============ COMPONENTE EDIT GALLERY MODAL ============
function EditGalleryModal({
  images,
  onClose,
  onAddImages,
  onDeleteImage,
  onReorderImages
}: EditGalleryModalProps) {
  const [localImages, setLocalImages] = useState(images);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleAddSampleImages = () => {
    const newImages = [...MOCK_IMAGES];
    onAddImages(newImages);
    setLocalImages([...localImages, ...newImages]);
  };

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= localImages.length) return;

    const reordered = [...localImages];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    
    setLocalImages(reordered);
    onReorderImages(reordered);
  };

  const handleDelete = (image: string) => {
    setLocalImages(localImages.filter(img => img !== image));
    onDeleteImage(image);
    if (selectedImage === image) {
      setSelectedImage(null);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-zinc-950 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-zinc-900/80">
            <h2 className="font-orbitron text-xl font-bold text-white">
              Editar Galería
            </h2>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
            {/* Add images section */}
            <div className="mb-8">
              <h3 className="font-orbitron text-lg font-bold text-white mb-4">
                Agregar Imágenes
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={handleAddSampleImages}
                  className="flex-1 p-8 border-2 border-dashed border-white/10 rounded-xl hover:border-red-600/50 hover:bg-red-600/5 transition-all group"
                >
                  <PhotoIcon className="w-12 h-12 mx-auto text-white/20 group-hover:text-red-500 mb-2" />
                  <p className="text-white/60 group-hover:text-white font-ubuntu">Agregar imágenes de ejemplo</p>
                  <p className="text-sm text-white/30 mt-1">(Demo - En producción sería upload)</p>
                </button>
              </div>
            </div>

            {/* Images list */}
            {localImages.length > 0 && (
              <div>
                <h3 className="font-orbitron text-lg font-bold text-white mb-4">
                  Administrar Imágenes ({localImages.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {localImages.map((image, index) => (
                    <div
                      key={index}
                      className={`relative group rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === image ? 'border-red-600' : 'border-white/10'
                      }`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="aspect-square relative">
                        <NextImage
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                      
                      {/* Overlay con controles */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveImage(index, 'up');
                          }}
                          disabled={index === 0}
                          className={`p-2 rounded-full ${
                            index === 0 
                              ? 'bg-gray-800 cursor-not-allowed' 
                              : 'bg-white/10 hover:bg-white/20 border border-white/20'
                          }`}
                        >
                          <ArrowUpIcon className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveImage(index, 'down');
                          }}
                          disabled={index === localImages.length - 1}
                          className={`p-2 rounded-full ${
                            index === localImages.length - 1
                              ? 'bg-gray-800 cursor-not-allowed'
                              : 'bg-white/10 hover:bg-white/20 border border-white/20'
                          }`}
                        >
                          <ArrowDownIcon className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(image);
                          }}
                          className="p-2 rounded-full bg-red-600/80 hover:bg-red-600 border border-red-500/50"
                        >
                          <TrashIcon className="w-4 h-4 text-white" />
                        </button>
                      </div>

                      {/* Número de orden */}
                      <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-ubuntu px-2 py-1 rounded-full border border-white/10">
                        #{index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-white/10 bg-zinc-900/80">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-white/20 hover:border-white/40 text-white/70 hover:text-white rounded-full font-ubuntu text-sm uppercase tracking-wider transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-ubuntu text-sm uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(178,4,3,0.5)]"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ============ COMPONENTE PRINCIPAL ============
export default function GalleryClient({ images }: GalleryClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [galleryImages, setGalleryImages] = useState(images);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddImages = (newImages: string[]) => {
    setGalleryImages([...galleryImages, ...newImages]);
  };

  const handleDeleteImage = (imageToDelete: string) => {
    setGalleryImages(galleryImages.filter(img => img !== imageToDelete));
  };

  const handleReorderImages = (reorderedImages: string[]) => {
    setGalleryImages(reorderedImages);
  };

  const handleViewMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 8, galleryImages.length));
      setIsLoading(false);
    }, 500);
  };

  const handleLoadAll = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(galleryImages.length);
      setIsLoading(false);
    }, 500);
  };

  const hasMoreImages = visibleCount < galleryImages.length;

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* ═══ Hero Section ═══ */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <NextImage
            src={IMAGES.about.background}
            alt="Gallery background"
            fill
            priority
            className="object-cover scale-110 animate-zoom-in"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/90" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-bounce" />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse delay-300" />
          </div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-6 pt-20">
          <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="space-y-4">
              <div className="w-px h-20 bg-gradient-to-b from-transparent via-white to-transparent mx-auto" />
              <div className="text-white/60 text-sm rotate-90 origin-center whitespace-nowrap mt-8">
                SCROLL TO EXPLORE
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <span className="inline-flex items-center rounded-full border border-white/10 px-6 py-2 text-sm font-ubuntu uppercase tracking-[0.2em] text-white/80 bg-black/20 backdrop-blur-sm animate-fade-in">
              GALERÍA MULTIMEDIA
            </span>
            <h1 className="font-orbitron font-bold text-6xl md:text-8xl lg:text-9xl text-white tracking-wider text-center animate-fade-in relative">
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-gradient-x">
                MOMENTOS Y
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent animate-gradient-x">
                RECUERDOS
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shine" />
            </h1>
            <div className="flex justify-center items-center gap-4 mt-8">
              <div className="w-8 h-px bg-white/30" />
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <div className="w-8 h-px bg-white/30" />
            </div>
            <p className="text-xl md:text-2xl text-white/80 font-light tracking-widest animate-fade-up delay-300 mt-6">
              <span className="text-red-500 font-semibold">{galleryImages.length}</span> {galleryImages.length === 1 ? 'FOTO DISPONIBLE' : 'FOTOS DISPONIBLES'}
            </p>
          </div>

          <div className="absolute bottom-16 animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <div className="text-white/50 text-sm tracking-widest">EXPLORAR</div>
              <svg className="w-8 h-8 text-white/60" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Sección de estadísticas ═══ */}
      <section className="relative bg-black py-24 -mt-px">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-16 items-start">

            {/* Left - Contenido destacado */}
            <div className="space-y-8">
              <div className="flex items-center gap-2 mb-12">
                <div className="flex gap-1">
                  <div className="w-16 h-1 bg-white" />
                  <div className="w-16 h-1 bg-white" />
                  <div className="w-16 h-1 bg-white" />
                  <div className="w-8 h-1 bg-white/40" />
                  <div className="w-8 h-1 bg-white/40" />
                </div>
              </div>
              <span className="inline-flex items-center rounded-full border border-white/10 px-6 py-2 text-sm font-ubuntu uppercase tracking-[0.2em] text-red-500 bg-black/20 backdrop-blur-sm">
                ESTADÍSTICAS
              </span>
              <h2 className="text-6xl font-bold tracking-wider mb-6">
                <span className="text-white">NUESTRA GALERÍA</span>
                <div className="h-1 w-24 bg-[#b20403] mt-2" />
              </h2>
              <div className="border-l-4 pl-6 space-y-4" style={{ borderColor: ACCENT_COLOR }}>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Explora los momentos más destacados de nuestras actividades, eventos y proyectos. 
                  Cada imagen cuenta una historia de aprendizaje y colaboración.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <div className="flex-1 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                  <p className="font-ubuntu text-xs uppercase tracking-[0.25em] text-white/50">Total fotos</p>
                  <p className="font-orbitron text-4xl text-white mt-2">{galleryImages.length}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="group inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-ubuntu text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(178,4,3,0.5)]"
                >
                  <PencilIcon className="w-4 h-4" />
                  Editar galería
                </button>
                <a href="#galeria"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full font-ubuntu text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/5"
                >
                  Ver galería
                </a>
              </div>
            </div>

            {/* Right - Miniaturas destacadas */}
            <aside className="relative">
              <div className="absolute inset-0 bg-gradient-to-l from-red-600/10 to-transparent blur-3xl" />
              <div className="relative rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-sm">
                <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
                  <div>
                    <h3 className="font-orbitron text-2xl font-bold text-white">Destacadas</h3>
                    <p className="mt-2 font-ubuntu text-sm text-white/50">Últimas imágenes</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {galleryImages.slice(0, 4).map((src, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group cursor-pointer"
                      onClick={() => setSelectedImage(src)}
                    >
                      <NextImage
                        src={src}
                        alt={`Destacada ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-3xl -z-10" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══ Galería ═══ */}
      <section id="galeria" className="relative bg-black py-24">
        <div className="container mx-auto px-6 md:px-12">

          {/* Título */}
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-bold tracking-wider mb-6">GALERÍA</h2>
            <p className="text-lg text-white/60 font-ubuntu max-w-2xl mx-auto">
              Momentos capturados en nuestros eventos, talleres y actividades.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex gap-1">
                <div className="w-12 h-1 bg-white" />
                <div className="w-12 h-1 bg-white" />
                <div className="w-12 h-1 bg-white" />
                <div className="w-6 h-1 bg-white/40" />
                <div className="w-6 h-1 bg-white/40" />
              </div>
            </div>
          </div>

          {/* Grid de imágenes */}
          {galleryImages.length > 0 ? (
            <>
              <GalleryGrid 
                images={galleryImages.slice(0, visibleCount)} 
                onImageClick={setSelectedImage} 
              />

              {/* Ver más */}
              {hasMoreImages && (
                <div className="mt-16 space-y-6">
                  <div className="max-w-2xl mx-auto">
                    <div className="flex justify-between text-sm text-white/60 mb-2 font-ubuntu">
                      <span>Mostrando {visibleCount} de {galleryImages.length} imágenes</span>
                      <span>{Math.round((visibleCount / galleryImages.length) * 100)}%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
                        style={{ width: `${(visibleCount / galleryImages.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={handleViewMore}
                      disabled={isLoading}
                      className="group inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-ubuntu text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(178,4,3,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Cargando...</span>
                        </>
                      ) : (
                        <>
                          <PhotoIcon className="w-5 h-5" />
                          <span>Ver más imágenes</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleLoadAll}
                      disabled={isLoading}
                      className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full font-ubuntu text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Ver todas ({galleryImages.length - visibleCount} restantes)
                    </button>
                  </div>
                </div>
              )}

              {!hasMoreImages && galleryImages.length > 0 && (
                <div className="text-center py-8 mt-8">
                  <div className="inline-flex items-center gap-3 text-white/60">
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-ubuntu">Has visto todas las imágenes disponibles</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <PhotoIcon className="w-20 h-20 mx-auto text-white/20 mb-4" />
              <h3 className="text-3xl font-orbitron font-bold text-white mb-2">
                No hay imágenes disponibles
              </h3>
              <p className="text-white/60 font-ubuntu mb-8">
                Comienza agregando imágenes a tu galería
              </p>
              <button
                onClick={() => setShowEditModal(true)}
                className="group inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-ubuntu text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(178,4,3,0.5)]"
              >
                <PencilIcon className="w-4 h-4" />
                Agregar imágenes
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══ Modal de imagen ═══ */}
      {selectedImage && (
        <ImageModal 
          imageSrc={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}

      {/* ═══ Modal de edición ═══ */}
      {showEditModal && (
        <EditGalleryModal
          images={galleryImages}
          onClose={() => setShowEditModal(false)}
          onAddImages={handleAddImages}
          onDeleteImage={handleDeleteImage}
          onReorderImages={handleReorderImages}
        />
      )}
    </main>
  );
}