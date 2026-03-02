"use client";

import React, { useState, useEffect } from "react";

/* ------------------------- Reglamento  ------------------------- */
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
          "La actividad del semillero se fundamenta en el respeto mutuo, la honestidad, la solidaridad, la tolerancia, la empatía y la colaboración. Se espera que todos los miembros promuevan un ambiente académico saludable y propicio para la investigación.",
      },
    ],
  },

  {
    titulo: "TÍTULO II: NORMAS DE CONVIVENCIA Y USO DEL ESPACIO FÍSICO",
    articulos: [
      {
        numero: "Artículo 4: Orden y Aseo",
        texto:
          "Cada miembro es responsable de mantener el orden y aseo de su espacio de trabajo. Esto incluye:\n\n- Disponer adecuadamente de residuos y basuras.\n- Limpiar utensilios de comida o bebida inmediatamente después de su uso.\n- Organizar el mobiliario al finalizar su jornada.\n- No dejar pertenencias permanentes en las áreas comunes.",
      },
      {
        numero: "Artículo 5: Higiene Personal",
        texto:
          "Por respeto a la comunidad y al ambiente de trabajo compartido, se requiere que todos los miembros mantengan normas básicas de aseo personal.",
      },
      {
        numero: "Artículo 6: Sustancias Prohibidas",
        texto:
          "Estríctamente prohibido el consumo y distribución de sustancias psicoactivas, alcohol, tabaco o vapeadores dentro del semillero.",
      },
      {
        numero: "Artículo 7: Ruido y Ambiente de Trabajo",
        texto:
          "Mantener un nivel de ruido moderado. Uso de audífonos obligatorio para audio. Conversaciones en tono que no interrumpa a los demás.",
      },
      {
        numero: "Artículo 8: Uso de Instalaciones",
        texto:
          "El laboratorio es para fines académicos del semillero. Prohibido ver series/películas salvo en tiempos permitidos. Prohibidas apuestas fuera del horario estipulado.",
      },
      {
        numero: "Artículo 9: Seguridad Física y Armas",
        texto:
          "Prohibido portar armas de cualquier tipo según normativa institucional.",
      },
    ],
  },

  {
    titulo: "TÍTULO III: GESTIÓN DE RECURSOS Y SEGURIDAD",
    articulos: [
      {
        numero: "Artículo 10: Cuidado de Equipos",
        texto:
          "El mal uso que cause daños será responsabilidad del miembro, quien deberá reparar o reponer el equipo.",
      },
      {
        numero: "Artículo 11: Acceso y Permanencia",
        texto:
          "La puerta debe permanecer cerrada. El laboratorio solo se usa con monitor/docente. En ausencias cortas el monitor puede delegar un encargado.",
      },
      {
        numero: "Artículo 12: Personal Externo",
        texto:
          "El ingreso de externos debe ser autorizado. El anfitrión es responsable del comportamiento del visitante.",
      },
      {
        numero: "Artículo 13: Préstamo de Insumos",
        texto:
          "La salida de equipos está prohibida salvo autorización del líder.",
      },
    ],
  },

  {
    titulo: "TÍTULO IV: REGLAMENTO DE PROYECTOS",
    articulos: [
      {
        numero: "Artículo 14: Vinculación a Proyectos",
        texto:
          "Todo miembro activo debe pertenecer a un proyecto. Nuevos miembros tienen 2 semanas para integrarse.",
      },
      {
        numero: "Artículo 15: Conformación de Equipos",
        texto:
          "Máximo 6 integrantes por equipo, con excepciones autorizadas.",
      },
      {
        numero: "Artículo 16: Seguimiento y Avances",
        texto:
          "Avances obligatorios miércoles y jueves. Inasistencias reiteradas son causa de sanción o retiro del proyecto.",
      },
      {
        numero: "Artículo 17: Dinámica de Equipos",
        texto:
          "El líder del equipo junto al líder del semillero puede solicitar cambiar o retirar un miembro por bajo rendimiento o convivencia.",
      },
    ],
  },

  {
    titulo: "TÍTULO V: SEGURIDAD DE LA INFORMACIÓN Y USO ÉTICO",
    articulos: [
      {
        numero: "Artículo 18: Uso de Red",
        texto:
          "Prohibido realizar ataques, intrusiones, escaneos, suplantaciones o usar software no licenciado.",
      },
      {
        numero: "Artículo 19: Sandbox",
        texto:
          "Pruebas de ciberseguridad deben hacerse en entornos aislados o VLANs.",
      },
      {
        numero: "Artículo 20: Datos Sensibles",
        texto:
          "Requiere acuerdo de confidencialidad y cumplimiento de la Ley 1581.",
      },
    ],
  },

  {
    titulo: "TÍTULO VI: PROPIEDAD INTELECTUAL Y DESARROLLO COMERCIAL",
    articulos: [
      {
        numero: "Artículo 21: Confidencialidad",
        texto:
          "Obligatoria incluso tras abandonar el semillero.",
      },
      {
        numero: "Artículo 22: Propiedad Intelectual",
        texto:
          "Regida por la USCO. Titularidad debe acordarse según proyecto.",
      },
      {
        numero: "Artículo 23: Publicaciones",
        texto:
          "Deben ser aprobadas por el líder del semillero y otorgar créditos completos.",
      },
    ],
  },

  {
    titulo: "TÍTULO VII: RÉGIMEN SANCIONATORIO",
    articulos: [
      {
        numero: "Artículo 24: Tipos de Faltas",
        texto:
          "- Leves: orden, aseo o ruido.\n- Graves: reincidencia, uso indebido, negligencia.\n- Muy graves: sustancias, armas, hurto, acoso, seguridad o confidencialidad.",
      },
      {
        numero: "Artículo 25: Sanciones",
        texto:
          "1. Amonestación verbal.\n2. Amonestación escrita.\n3. Suspensión (8 días a 1 mes).\n4. Expulsión definitiva.",
      },
      {
        numero: "Artículo 26: Debido Proceso",
        texto:
          "Todo miembro puede presentar descargos antes de ser sancionado.",
      },
    ],
  },
];

/* ------------------------------- COMPONENTE ------------------------------- */
export default function ReglamentosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<any>(null);

  // cerrar modal con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
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
        <h1 className="text-4xl font-orbitron tracking-wide mb-2">
          Reglamento Interno – Devurity
        </h1>
        <p className="text-sm opacity-70 max-w-2xl mx-auto">
          Normativa oficial para convivencia, seguridad y gestión académica.
        </p>
      </header>

      {/* --- BLOQUES DE REGLAS --- */}
      <div className="space-y-6">
        {reglamentoCompleto.map((bloque, bi) => (
          <details
            key={bloque.titulo}
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
                  key={art.numero}
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
            role="button"
            tabIndex={0}
            aria-label="Cerrar modal"
            onClick={closeModal}
            onKeyDown={(e) => e.key === "Enter" && closeModal()}
          />

          <div
            className="relative z-10 max-w-3xl w-full bg-[var(--variable-collection-placeholder)]/95
                       border border-[var(--color-selected)] rounded-2xl p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Detalle del artículo del reglamento"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
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
    </section>
  );
}