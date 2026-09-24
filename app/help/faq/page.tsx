import type { Metadata } from "next";
import { siteIcons, siteOpenGraph, siteTwitter } from "@/lib/constants/metadata";
import FaqContent from "./FaqContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Devurity",
  description:
    "Resuelve tus dudas sobre el semillero Devurity: inscripción, asistencia, proyectos, laboratorio y certificaciones.",
  icons: siteIcons,
  openGraph: {
    ...siteOpenGraph,
    title: "Preguntas Frecuentes | Devurity",
    description:
      "Resuelve tus dudas sobre el semillero Devurity: inscripción, asistencia, proyectos y certificaciones.",
    url: "/help/faq",
  },
  twitter: siteTwitter,
};

export default function FAQPage() {
  return <FaqContent />;
}
