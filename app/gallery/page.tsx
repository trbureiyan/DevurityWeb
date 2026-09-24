import { GALLERY_IMAGES } from "@/lib/constants/gallery";
import GalleryClient from "@/components/gallery/GalleryClient";
import type { Metadata } from "next";
import { siteIcons, siteOpenGraph, siteTwitter } from "@/lib/constants/metadata";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Galería de Eventos | Devurity",
  description:
    "Revive los mejores momentos de nuestros eventos, talleres y actividades de integración en el semillero Devurity.",
  icons: siteIcons,
  openGraph: {
    ...siteOpenGraph,
    title: "Galería de Eventos | Devurity",
    description:
      "Revive los mejores momentos de nuestros eventos, talleres y actividades de integración en el semillero Devurity.",
    url: "/gallery",
  },
  twitter: siteTwitter,
};

export default function Galeria() {
  // GalleryClient ya renderiza su propio <main> con layout completo.
  // No envolver en otro contenedor para evitar doble padding/scroll.
  return <GalleryClient images={GALLERY_IMAGES} />;
}