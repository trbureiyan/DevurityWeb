import type { Metadata } from "next";
import ReglamentosClient from "@/components/help/ReglamentosClient";
import { REGLAMENTO_COMPLETO } from "@/lib/constants/help";
import { siteIcons } from "@/lib/constants/metadata";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Reglamento Interno | Devurity",
  description:
    "Normativa oficial de convivencia, uso de instalaciones y gestión de proyectos del semillero de investigación Devurity.",
  icons: siteIcons,
};

export default function ReglamentosPage() {
  return (
    <section className="py-16 max-w-5xl mx-auto px-6 animate-fade-up">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-orbitron tracking-wide mb-2">
          Reglamento Interno – Devurity
        </h1>
        <p className="text-sm opacity-70 max-w-2xl mx-auto">
          Normativa oficial para convivencia, seguridad y gestión académica.
        </p>
      </header>
      {/* Componente Reglamentos */}
      <ReglamentosClient reglamento={REGLAMENTO_COMPLETO} />
    </section>
  );
}
