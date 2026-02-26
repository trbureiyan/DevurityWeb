"use client";
import React, { useState, useEffect } from "react";
import ButtonReglamentos from "@/components/ui/LinkButton";
import { reglamentoCompleto } from "@/lib/data/reglamento.data";
import { Articulo, ActiveArticle } from "@/lib/types/reglamento";

export const dynamic = "force-static";

export default function ReglamentosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<ActiveArticle | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openModal(titulo: string, art: Articulo) {
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
        <h1 className="text-4xl font-orbitron mb-2">Reglamento Interno – Devurity</h1>
        <p className="text-sm opacity-70 max-w-2xl mx-auto">
          Normativa oficial para convivencia y gestión académica.
        </p>
      </header>

      <div className="space-y-6">
        {reglamentoCompleto.map((bloque, bi) => (
          <details
            key={bi}
            className="group border border-[var(--color-selected)] bg-[var(--placeholder)]/8 rounded-2xl"
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
                  <h3 className="font-ubuntu mb-2">{art.numero}</h3>
                  <p className="text-sm opacity-85 line-clamp-3 whitespace-pre-line">{art.texto}</p>
                  <ButtonReglamentos
                    size="sm"
                    className="mt-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(bloque.titulo, art);
                    }}
                  >
                    Ver completo
                  </ButtonReglamentos>
                </article>
              ))}
            </div>
          </details>
        ))}
      </div>

      {modalOpen && activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />

          <div
            className="relative z-10 max-w-3xl w-full bg-[var(--variable-collection-placeholder)]/95 border border-[var(--color-selected)] rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-orbitron">{activeArticle.numero}</h2>
            <p className="text-xs opacity-70 mb-4">{activeArticle.titulo}</p>
            <p className="text-sm whitespace-pre-line leading-relaxed">{activeArticle.texto}</p>
            <div className="mt-6 text-right">
              <ButtonReglamentos size="sm" onClick={closeModal}>
                Cerrar
              </ButtonReglamentos>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}