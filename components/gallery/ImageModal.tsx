import Image from "next/image";

interface ImageModalProps {
    imageSrc: string;
    onClose: () => void;
}

export default function ImageModal({ imageSrc, onClose }: ImageModalProps) {
    return (
        /*
          Overlay del modal: cubre toda la pantalla y cierra al pulsarlo.
          role="button" + tabIndex={0}: el usuario puede Tab-ear hasta el overlay
          y cerrarlo con Enter o Escape sin necesidad del ratón (WCAG 2.1.1).
          Escape es el shortcut estándar para cerrar modales (WCAG 2.1.2);
          Enter actúa como activación del "botón" de cierre para consistencia.
          cursor-zoom-out: señal visual de que el área clickeable cierra la imagen ampliada.
        */
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 cursor-zoom-out animate-in fade-in duration-200"
            onClick={onClose}
            onKeyDown={(e) => { if (e.key === 'Escape' || e.key === 'Enter') onClose(); }}
            role="button"
            tabIndex={0}
            aria-label="Cerrar imagen"
        >
            <div className="relative w-full max-w-4xl h-[80vh] rounded-xl overflow-hidden animate-in zoom-in-95 duration-200">
                <Image
                    src={imageSrc}
                    alt="Zoom"
                    fill
                    sizes="(max-width: 768px) 100vw, 896px"
                    className="object-contain rounded-xl"
                />
            </div>
        </div>
    );
}
