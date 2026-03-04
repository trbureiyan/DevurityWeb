"use client";

import React, { useState, useEffect, useRef } from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQClientProps {
  faqs: FAQItem[];
}

export default function FAQClient({ faqs }: FAQClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<FAQItem | null>(null);

  // array de refs que acepta HTMLElement o null
  const articleRefs = useRef<(HTMLElement | null)[]>([]);

  // Cerrar modal con ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  function openModalAt(index: number, faq: FAQItem) {
    const target = articleRefs.current[index];

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }

    setTimeout(() => {
      setActiveFAQ(faq);
      setModalOpen(true);
    }, 300);
  }

  function closeModal() {
    setModalOpen(false);
    setActiveFAQ(null);
  }

  return (
    <>
      <div className="space-y-6">
        {faqs.map((item, i) => (
          <article
            key={item.q}
            ref={(el) => {
              articleRefs.current[i] = el;
            }}
            className="p-6 rounded-lg border border-[var(--color-selected)] bg-[var(--placeholder)]/15
            transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]
            hover:shadow-[0_0_15px_var(--color-variable-collection-botones)]"
          >
            <h3 className="font-orbitron text-lg tracking-wide mb-2">{item.q}</h3>

            <p className="font-ubuntu text-sm leading-relaxed opacity-90 line-clamp-3">
              {item.a}
            </p>

            <button
              onClick={() => openModalAt(i, item)}
              className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--color-variable-collection-botones)]
              hover:underline underline-offset-4"
            >
              Leer respuesta completa
            </button>
          </article>
        ))}
      </div>

      {/* MODAL */}
      {modalOpen && activeFAQ && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={closeModal}
          onKeyDown={(e) => { if (e.key === 'Escape') closeModal(); }}
          role="button"
          tabIndex={-1}
          aria-label="Cerrar modal"
        >
          <div
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[var(--color-selected)] rounded-xl p-8 shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Detalle de pregunta frecuente"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>

            <h3 className="font-orbitron text-2xl mb-6 tracking-wide text-[var(--color-variable-collection-botones)]">
              {activeFAQ.q}
            </h3>

            <div className="font-ubuntu text-base leading-relaxed opacity-90 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {activeFAQ.a}
            </div>

            <div className="mt-8 text-right">
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded bg-[var(--color-variable-collection-botones)] text-black font-bold hover:opacity-90 transition-opacity"
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
