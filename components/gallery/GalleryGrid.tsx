import Image from "next/image";

interface GalleryGridProps {
  images: string[];
  onImageClick: (src: string) => void;
}

export default function GalleryGrid({
  images,
  onImageClick,
}: GalleryGridProps) {
  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        lg:grid-cols-4
        gap-3
        sm:gap-4
        lg:gap-5
        max-w-[1000px]
        mx-auto
      "
    >
      {images.map((src, index) => (
        <button
          key={src}
          type="button"
          onClick={() => onImageClick(src)}
          className="
            relative
            aspect-square
            overflow-hidden
            rounded-xl
            cursor-pointer
            transition
            hover:opacity-80
            focus:outline-none
            focus:ring-2
            focus:ring-white/50
          "
        >
          <Image
            src={src}
            alt={`Foto ${index + 1}`}
            fill
            sizes="
              (max-width: 640px) 50vw,
              (max-width: 1024px) 33vw,
              25vw
            "
            className="object-cover rounded-xl"
            priority={index < 2}
          />
        </button>
      ))}
    </div>
  );
}