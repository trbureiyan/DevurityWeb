"use client";

import { useState } from "react";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import ImageModal from "@/components/gallery/ImageModal";
import { GALLERY_IMAGES } from "@/lib/constants/gallery";

export default function Galeria() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen w-full px-4 sm:px-6 md:px-10 py-12 md:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
        Galería
      </h1>

      <GalleryGrid
        images={GALLERY_IMAGES}
        onImageClick={setSelectedImage}
      />

      {selectedImage && (
        <ImageModal
          imageSrc={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </main>
  );
}