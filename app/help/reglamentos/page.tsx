// app/reglamentos/page.tsx
import React from "react";

export const dynamic = "force-static";

const reglamentosLaboratorio = [
  {
    title: "Sustancias y consumo",
    body: "Se prohíbe el uso o porte de cigarrillo, vapeadores, alcohol o sustancias psicoactivas. Primera infracción: suspensión de 1 mes. Segunda infracción: suspensión permanente."
  },
  {
    title: "Orden y limpieza",
    body: "Cada usuario debe recoger sus residuos y mantener el espacio limpio. Si no cumple, deberá realizar el aseo general del laboratorio el mismo día."
  },
  {
    title: "Convivencia y respeto",
    body: "Se exige una conducta basada en respeto, tolerancia y colaboración. Las sanciones pueden variar según la gravedad, desde suspensión temporal hasta restricción definitiva."
  },
  {
    title: "Cuidado de equipos",
    body: "El mal uso que cause daños en dispositivos implica obligación de reparación o reposición del equipo perjudicado."
  },
  {
    title: "Uso adecuado del espacio",
    body: "El laboratorio se utiliza únicamente para trabajo académico, proyectos, networking y descansos breves. Está prohibido destinarlo a actividades ajenas al semillero."
  },
  {
    title: "Control de ruido",
    body: "El volumen de dispositivos y conversaciones debe mantenerse moderado para no afectar la tranquilidad universitaria."
  },
  {
    title: "Ingreso de armas",
    body: "Se prohíbe el ingreso de armas blancas o de fuego, conforme a las normas institucionales."
  },
  {
    title: "Reserva del laboratorio",
    body: "El salón puede reservarse para presentaciones o exposiciones de proyectos previa coordinación."
  }
];

export default function ReglamentosPage() {
  return (
    <section className="py-14 animate-fade-up max-w-5xl mx-auto px-6">
      <div className="mb-12">
        <h2 className="text-4xl font-orbitron mb-3 text-center tracking-wide">
          Reglamento del Laboratorio – Devurity
        </h2>
        <p className="text-sm opacity-70 text-center max-w-2xl mx-auto">
          Normativa para el uso responsable, colaborativo y seguro del espacio de trabajo del semillero.
        </p>
      </div>

      <div className="space-y-6">
        {reglamentosLaboratorio.map((item) => (
                <article
            key={item.title}
            className="p-5 rounded-lg border border-[var(--color-selected)] bg-[var(--placeholder)]/15 
            transition-all duration-300 
            hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_12px_var(--color-variable-collection-botones)]"
            >
            <h3 className="font-ubuntu text-lg mb-2">{item.title}</h3>
            <p className="text-sm opacity-90 leading-relaxed">
                {item.body}
            </p>
            </article>
        ))}
      </div>

      <div className="mt-14 text-center opacity-70 text-sm">
        <p>El cumplimiento de este reglamento garantiza un ambiente adecuado para la formación y el desarrollo técnico.</p>
      </div>
    </section>
  );
}
