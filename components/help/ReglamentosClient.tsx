"use client";

import React, { useState, useEffect } from "react";

interface Articulo {
  numero: string;
  texto: string;
}

interface BloqueReglamento {
  titulo: string;
  articulos: Articulo[];
}

interface ReglamentosClientProps {
  reglamento: BloqueReglamento[];
}

export default function ReglamentosClient({ reglamento }: ReglamentosClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<{
    titulo: string;
    numero: string;
    texto: string;
  } | null>(null);

  // Cerrar modal con ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  function openModal(tituloBloque: string, articulo: Articulo) {
    setActiveArticle({
      titulo: tituloBloque,
      numero: articulo.numero,
      texto: articulo.texto,
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setActiveArticle(null);
  }

  return (
    <>
      {/* --- BLOQUES DE REGLAS --- */}
      <div className="space-y-6">
        {reglamento.map((bloque, bi) => (
          <details
            key={bi}
            className="group border border-[var(--color-selected)] bg-[var(--placeholder)]/8 rounded-2xl
                       backdrop-blur-md transition-all duration-300"
          >
            <summary
              className="cursor-pointer px-6 py-4 text-lg font-ubuntu bg-[var(--placeholder)]/10 
                         hover:bg-[var(--placeholder)]/20 rounded-2xl flex justify-between"
            >
              <span>{bloque.titulo}</span>
              <span className="text-xs opacity-70">Ver ▸</span>
            </summary>

            <div className="px-6 pb-6 pt-4 space-y-4">
              {bloque.articulos.map((art, ai) => (
                <article
                  key={ai}
                  className="p-4 rounded-lg border border-[var(--color-selected)]
                             bg-[var(--placeholder)]/12 transition-all duration-300 hover:scale-[1.02]"
                >
                  <h3 className="font-ubuntu text-base mb-2">{art.numero}</h3>
                  <p className="text-sm opacity-85 leading-relaxed whitespace-pre-line line-clamp-3">
                    {art.texto}
                  </p>

                  <button
                    onClick={() => openModal(bloque.titulo, art)}
                    className="mt-3 px-3 py-1 rounded-md border border-[var(--color-variable-collection-botones)]
                               bg-[var(--placeholder)]/10 hover:bg-[var(--placeholder)]/20 transition"
                  >
                    Ver completo
                  </button>
                </article>
              ))}
            </div>
          </details>
        ))}
      </div>

      {/* --- MODAL SIN ZOOM --- */}
      {modalOpen && activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div
            className="relative z-10 max-w-3xl w-full bg-[var(--variable-collection-placeholder)]/95
                       border border-[var(--color-selected)] rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-orbitron">{activeArticle.numero}</h2>
            <p className="text-xs opacity-70 mb-4">{activeArticle.titulo}</p>

            <p className="text-sm whitespace-pre-line leading-relaxed">
              {activeArticle.texto}
            </p>

            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-1 rounded-md border border-[var(--color-variable-collection-botones)]
                           hover:bg-[var(--placeholder)]/20 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
