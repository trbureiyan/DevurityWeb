import { getGalleryImageUrls } from "@/lib/data/gallery";
import GalleryClient from "@/components/gallery/GalleryClient";
import type { Metadata } from "next";
import { siteIcons } from "@/lib/constants/metadata";

// Render dinámico: la galería se carga en vivo desde la DB/Storage y se
// invalida bajo demanda vía revalidateTag al subir/eliminar imágenes.
export const dynamic = "force-dynamic";

// SEO en meta para la página de galería.
export const metadata: Metadata = {
  title: "Galería de Eventos | Devurity",
  description: "Revive los mejores momentos de nuestros eventos, talleres y actividades de integración en el semillero.",
  icons: siteIcons,
};

export default async function Galeria() {
  const images = await getGalleryImageUrls();

  // GalleryClient ya renderiza su propio <main> con layout completo.
  // No envolver en otro contenedor para evitar doble padding/scroll.
  return <GalleryClient images={images} />;
}