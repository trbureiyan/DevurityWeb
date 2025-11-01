import Image from "next/image";

interface GalleryGridProps {
  images: string[];
  onImageClick: (src: string) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-4 gap-5 max-w-[1000px] mx-auto">
      {images.map((src, index) => (
        <div
          key={index}
          className="relative aspect-square overflow-hidden rounded-xl cursor-pointer hover:opacity-80 transition"
          onClick={() => onImageClick(src)}
        >
          <Image
            src={src}
            alt={`Foto ${index + 1}`}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      ))}
    </div>
  );
}
