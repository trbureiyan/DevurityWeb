import Image from "next/image";

interface GalleryGridProps {
  images: string[];
  onImageClick: (src: string) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-4 gap-5 max-w-[1000px] mx-auto">
      {images.map((src, index) => (
        /*
          Se usa <div> en lugar de <button> porque next/image con fill requiere un
          contenedor con position:relative y dimensiones definidas — <button> no las
          tiene por defecto y añadiría complejidad al layout.
          La tríada role/tabIndex/onKeyDown convierte al div en equivalente accesible
          de un botón: role="button" lo anuncia como interactivo, tabIndex={0} lo incluye
          en el orden de tabulación, y onKeyDown cubre Enter + Espacio (WCAG 2.1.1).
          key={src}: la URL de la imagen es el identificador estable — evita
          reconciliaciones incorrectas si el array de imágenes cambia de orden.
        */
        <div
          key={src}
          className="relative aspect-square overflow-hidden rounded-xl cursor-pointer hover:opacity-80 transition"
          role="button"
          tabIndex={0}
          aria-label={`Ver foto ${index + 1}`}
          onClick={() => onImageClick(src)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onImageClick(src); }}
        >
          <Image
            src={src}
            alt={`Foto ${index + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover rounded-xl"
          />
        </div>
      ))}
    </div>
  );
}
