"use client";

import { useEffect } from "react";
import Image from "next/image";

interface ImageModalProps {
  imageSrc: string;
  onClose: () => void;
}

export default function ImageModal({
  imageSrc,
  onClose,
}: ImageModalProps) {
  /* Cerrar con Escape + bloquear scroll */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="
        fixed inset-0 z-50
        bg-black/80
        flex items-center justify-center
        p-4
        cursor-zoom-out
        animate-in fade-in duration-200
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          w-full
          max-w-4xl
          h-[80vh]
          rounded-xl
          overflow-hidden
          animate-in zoom-in-95 duration-200
        "
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imageSrc}
          alt="Imagen ampliada"
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="object-contain rounded-xl"
          priority
        />
      </div>
    </div>
  );
}