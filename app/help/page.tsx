// app/ayuda/page.tsx
import Link from "next/link";

export const dynamic = "force-static";

export default function AyudaPage() {
  return (
    <section className="pt-16 pb-24 max-w-6xl mx-auto px-6 animate-fade-up">

      {/* HERO */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-orbitron tracking-wide mb-4">
          Centro de Ayuda – Devurity
        </h1>
        <p className="text-sm opacity-70 max-w-xl mx-auto">
          Encuentra información importante para el uso responsable del laboratorio y preguntas frecuentes del semillero.
        </p>
      </header>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

        {/* CARD: REGLAMENTOS */}
        <Link
          href="/help/reglamentos"
          className="p-8 rounded-xl border border-[var(--color-selected)] bg-[var(--placeholder)]/15
          transition-all duration-300
          hover:-translate-y-1 hover:scale-[1.03]
          hover:shadow-[0_0_18px_var(--color-variable-collection-botones)]"
        >
          <h2 className="font-orbitron text-xl mb-3 tracking-wide">
            Reglamento del Laboratorio
          </h2>
          <p className="font-ubuntu text-sm opacity-90 leading-relaxed">
            Consulta las normas oficiales para el uso del espacio, convivencia y cuidado del equipo.
          </p>
        </Link>

        {/* CARD: FAQ */}
        <Link
          href="/help/faq"
          className="p-8 rounded-xl border border-[var(--color-selected)] bg-[var(--placeholder)]/15
          transition-all duration-300
          hover:-translate-y-1 hover:scale-[1.03]
          hover:shadow-[0_0_18px_var(--color-variable-collection-botones)]"
        >
          <h2 className="font-orbitron text-xl mb-3 tracking-wide">
            Preguntas Frecuentes (FAQ)
          </h2>
          <p className="font-ubuntu text-sm opacity-90 leading-relaxed">
            Respuestas rápidas sobre el semillero, el laboratorio, participación en proyectos y más.
          </p>
        </Link>

      </div>

      {/* FOOTER */}
      <div className="text-center opacity-60 text-xs mt-16">
        Centro de Ayuda Devurity — Universidad Surcolombiana
      </div>
    </section>
  );
}
