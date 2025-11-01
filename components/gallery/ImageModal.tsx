import Image from "next/image";

interface ImageModalProps {
    imageSrc: string;
    onClose: () => void;
}

export default function ImageModal({ imageSrc, onClose }: ImageModalProps) {
    return (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 cursor-zoom-out animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div className="relative w-full max-w-4xl h-[80vh] rounded-xl overflow-hidden animate-in zoom-in-95 duration-200">
                <Image
                    src={imageSrc}
                    alt="Zoom"
                    fill
                    className="object-contain rounded-xl"
                />
            </div>
        </div>
    );
}
