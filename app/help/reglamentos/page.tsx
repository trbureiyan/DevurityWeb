"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/buttonReglamentos";

export const dynamic = "force-static";

/* ------------------------- Reglamento ------------------------- */
const reglamentoCompleto = [
  {
    titulo: "TÍTULO I: DISPOSICIONES GENERALES",
    articulos: [
      {
        numero: "Artículo 1: Objeto",
        texto:
          'El presente reglamento tiene como objeto establecer las normas de convivencia, uso de instalaciones, gestión de proyectos y principios éticos que rigen a los miembros del Semillero de Investigación "Devurity".',
      },
      {
        numero: "Artículo 2: Ámbito de Aplicación",
        texto:
          "Estas normas aplican a todos los miembros activos (estudiantes, monitores, docentes) y al personal externo autorizado que haga uso de las instalaciones o recursos del semillero.",
      },
      {
        numero: "Artículo 3: Valores Fundamentales",
        texto:
          "La actividad del semillero se fundamenta en el respeto mutuo, la honestidad, la solidaridad, la tolerancia, la empatía y la colaboración.",
      },
    ],
  },

  {
    titulo: "TÍTULO II: NORMAS DE CONVIVENCIA Y USO DEL ESPACIO FÍSICO",
    articulos: [
      {
        numero: "Artículo 4: Orden y Aseo",
        texto:
          "Cada miembro es responsable de mantener el orden y aseo de su espacio de trabajo.\n\n- Disponer residuos\n- Limpiar utensilios\n- Organizar mobiliario",
      },
      {
        numero: "Artículo 5: Higiene Personal",
        texto:
          "Se requiere mantener normas básicas de aseo personal.",
      },
      {
        numero: "Artículo 6: Sustancias Prohibidas",
        texto:
          "Queda estrictamente prohibido el consumo de alcohol, tabaco o sustancias psicoactivas.",
      },
    ],
  },

  {
    titulo: "TÍTULO III: GESTIÓN DE RECURSOS Y SEGURIDAD",
    articulos: [
      {
        numero: "Artículo 10: Cuidado de Equipos",
        texto:
          "El mal uso de equipos será responsabilidad del miembro.",
      },
    ],
  },

  {
    titulo: "TÍTULO IV: REGLAMENTO DE PROYECTOS",
    articulos: [
      {
        numero: "Artículo 14: Vinculación a Proyectos",
        texto:
          "Todo miembro activo debe pertenecer a un proyecto.",
      },
    ],
  },

  {
    titulo: "TÍTULO V: SEGURIDAD DE LA INFORMACIÓN Y USO ÉTICO",
    articulos: [
      {
        numero: "Artículo 18: Uso de Red",
        texto:
          "Queda prohibido realizar ataques o intrusiones.",
      },
    ],
  },

  {
    titulo: "TÍTULO VI: PROPIEDAD INTELECTUAL",
    articulos: [
      {
        numero: "Artículo 21: Confidencialidad",
        texto:
          "La confidencialidad es obligatoria incluso tras abandonar el semillero.",
      },
    ],
  },

  {
    titulo: "TÍTULO VII: RÉGIMEN SANCIONATORIO",
    articulos: [
      {
        numero: "Artículo 24: Tipos de Faltas",
        texto:
          "Faltas leves, graves y muy graves.",
      },
    ],
  },
];

/* ------------------------------- COMPONENTE ------------------------------- */
export default function ReglamentosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<any>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openModal(titulo: string, art: any) {
    setActiveArticle({ titulo, ...art });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setActiveArticle(null);
  }

  return (
    <section className="py-16 max-w-5xl mx-auto px-6 animate-fade-up">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-orbitron mb-2">
          Reglamento Interno – Devurity
        </h1>
        <p className="text-sm opacity-70 max-w-2xl mx-auto">
          Normativa oficial para convivencia y gestión académica.
        </p>
      </header>

      <div className="space-y-6">
        {reglamentoCompleto.map((bloque, bi) => (
          <details
            key={bi}
            className="group border border-[var(--color-selected)]
                       bg-[var(--placeholder)]/8 rounded-2xl"
          >
            <summary className="px-6 py-4 text-lg font-ubuntu flex justify-between cursor-pointer">
              <span>{bloque.titulo}</span>
              <span className="text-xs opacity-70">Ver ▸</span>
            </summary>

            <div className="px-6 pb-6 pt-4 space-y-4">
              {bloque.articulos.map((art, ai) => (
                <article
                  key={ai}
                  className="p-4 rounded-lg border bg-[var(--placeholder)]/12"
                >
                  <h3 className="font-ubuntu mb-2">
                    {art.numero}
                  </h3>

                  <p className="text-sm opacity-85 line-clamp-3 whitespace-pre-line">
                    {art.texto}
                  </p>

                  <Button
                    size="sm"
                    className="mt-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(bloque.titulo, art);
                    }}
                  >
                    Ver completo
                  </Button>
                </article>
              ))}
            </div>
          </details>
        ))}
      </div>

      {/* ---------------- MODAL ---------------- */}
      {modalOpen && activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div
            className="relative z-10 max-w-3xl w-full
                       bg-[var(--variable-collection-placeholder)]/95
                       border border-[var(--color-selected)]
                       rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-orbitron">
              {activeArticle.numero}
            </h2>

            <p className="text-xs opacity-70 mb-4">
              {activeArticle.titulo}
            </p>

            <p className="text-sm whitespace-pre-line leading-relaxed">
              {activeArticle.texto}
            </p>

            <div className="mt-6 text-right">
              <Button size="sm" onClick={closeModal}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
