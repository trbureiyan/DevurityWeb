"use client";
export const dynamic = "force-static";

import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/ui/buttonFAQ";
import { faqs } from "@/lib/data/faq.data";
import { FAQ } from "@/lib/types/faq";

export default function FAQPage() {
  const [activeFAQ, setActiveFAQ] = useState<FAQ | null>(null);
  const articleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveFAQ(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  function openModalAt(index: number, faq: FAQ) {
    const target = articleRefs.current[index];

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    setTimeout(() => {
      setActiveFAQ(faq);
    }, 300);
  }

  return (
    <section className="py-16 max-w-6xl mx-auto px-6 animate-fade-up">
      <h1 className="text-4xl font-orbitron text-center mb-10 tracking-wide">
        Preguntas Frecuentes – Devurity
      </h1>

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
            <h3 className="font-orbitron text-lg tracking-wide mb-2">
              {item.q}
            </h3>

            <p className="font-ubuntu text-sm leading-relaxed opacity-90 line-clamp-3">
              {item.a}
            </p>

            <Button
              size="sm"
              className="mt-3"
              onClick={() => openModalAt(i, item)}
            >
              Ver
            </Button>
          </article>
        ))}
      </div>

      {activeFAQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveFAQ(null)}
          />

          <div
            className="relative z-10 max-w-3xl w-full bg-[var(--variable-collection-placeholder)]/95
                       border border-[var(--color-selected)] rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-orbitron">{activeFAQ.q}</h2>

            <p className="text-sm mt-4 whitespace-pre-line leading-relaxed opacity-90">
              {activeFAQ.a}
            </p>

            <div className="mt-6 text-right">
              <Button size="sm" onClick={() => setActiveFAQ(null)}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}