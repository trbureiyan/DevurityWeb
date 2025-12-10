import { GALLERY_IMAGES } from "@/lib/constants/gallery";
import GalleryClient from "@/components/gallery/GalleryClient";
import type { Metadata } from "next";
import { siteIcons } from "@/lib/constants/metadata";
// SSR estático para la galería de eventos.
export const dynamic = "force-static";
// SEO en meta para la página de galería.
export const metadata: Metadata = {
  title: "Galería de Eventos | Devurity",
  description: "Revive los mejores momentos de nuestros eventos, talleres y actividades de integración en el semillero.",
  icons: siteIcons,
};

export default function Galeria() {
  return (
    <main className="min-h-screen w-full px-10 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center">Galería</h1>

      <GalleryClient images={GALLERY_IMAGES} />
    </main>
  );
}
