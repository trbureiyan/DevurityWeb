import type { Metadata } from "next";
import FAQClient from "@/components/help/FAQClient";
import { FAQS } from "@/lib/constants/help";
import { siteIcons } from "@/lib/constants/metadata";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Devurity",
  description:
    "Respuestas a las dudas más comunes sobre inscripciones, proyectos, asistencia y uso del laboratorio.",
  icons: siteIcons,
};

export default function FAQPage() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-6 animate-fade-up">
      <h1 className="text-4xl font-orbitron text-center mb-10 tracking-wide">
        Preguntas Frecuentes – Devurity
      </h1>
      { /* Componente FAQClient */ }
      <FAQClient faqs={FAQS} />
    </section>
  );
}
