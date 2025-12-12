"use client";

import { useState } from "react";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import ImageModal from "@/components/gallery/ImageModal";

interface GalleryClientProps {
  images: string[];
}
// Componente para galería de imágenes, muestra grid y modal al hacer clic
export default function GalleryClient({ images }: GalleryClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
    { /* Componente grid */ }
      <GalleryGrid 
        images={images} 
        onImageClick={setSelectedImage} 
      />
    { /* Componente modal para imagen */ }
      {selectedImage && (
        <ImageModal 
          imageSrc={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </>
  );
}
