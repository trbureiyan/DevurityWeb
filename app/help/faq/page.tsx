// app/help/faq/page.tsx
export const dynamic = "force-static";

const faqs = [
  {
    q: "¿Quién puede ser miembro del semillero Devurity?",
    a: "Cualquier estudiante de la Universidad con interés en diseño, desarrollo, investigación o creación de proyectos tecnológicos puede postularse al semillero, sin necesidad de conocimientos previos."
  },
  {
    q: "¿Cómo me inscribo al semillero?",
    a: "Debes diligenciar el formulario de inscripción oficial. La solicitud será revisada por el coordinador o tutor, y se te notificará la aceptación junto con la asignación de tu rol inicial."
  },
  {
    q: "¿Existen roles dentro del semillero?",
    a: "Sí. Existen roles como Miembro, Coordinador y Administrador/Tutor. Cada rol determina responsabilidades como gestión de proyectos, tutorías, organización de actividades y toma de decisiones."
  },
  {
    q: "¿Se controla la asistencia a las sesiones?",
    a: "Sí. La asistencia se registra mediante un sistema de códigos QR para validar la participación en actividades, reuniones y trabajo en equipo dentro del semillero."
  },
  {
    q: "¿Cómo funcionan los proyectos dentro del semillero?",
    a: "Los proyectos se conforman por grupos de trabajo. Cada proyecto debe contar con objetivos claros, documentación, avances periódicos y evidencias compartidas, además del uso de repositorios colaborativos."
  },
  {
    q: "¿Se puede usar el laboratorio libremente?",
    a: "El laboratorio está disponible para trabajo académico, reuniones, prototipado y desarrollo de proyectos. Su uso está sujeto a disponibilidad y responsabilidad en el cuidado del espacio."
  },
  {
    q: "¿Puedo reservar el laboratorio?",
    a: "Sí. El laboratorio puede reservarse para exposiciones, tutorías, trabajo colaborativo o sesiones de proyecto mediante solicitud previa."
  },
  {
    q: "¿Qué pasa si incumplo las normas del laboratorio?",
    a: "Dependiendo de la falta, pueden aplicarse sanciones como suspensión temporal del acceso, trabajos de mantenimiento del espacio o restricción permanente del ingreso, según la gravedad."
  },
  {
    q: "¿El semillero otorga certificaciones o reconocimientos?",
    a: "Sí, la participación activa en proyectos, eventos o procesos internos del semillero puede ser certificada según criterios establecidos por la coordinación del semillero."
  }
];

export default function FAQPage() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-6 animate-fade-up">
      <h1 className="text-4xl font-orbitron text-center mb-10 tracking-wide">
        Preguntas Frecuentes – Devurity
      </h1>

      <div className="space-y-6">
        {faqs.map((item, i) => (
          <article
            key={i}
            className="p-6 rounded-lg border border-[var(--color-selected)] bg-[var(--placeholder)]/15
            transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]
            hover:shadow-[0_0_15px_var(--color-variable-collection-botones)]"
          >
            <h3 className="font-orbitron text-lg tracking-wide mb-2">
              {item.q}
            </h3>
            <p className="font-ubuntu text-sm leading-relaxed opacity-90">
              {item.a}
            </p>
          </article>
        ))}
      </div>

      <footer className="mt-14 text-center opacity-60 text-sm tracking-wide">
        Si no encuentras tu respuesta, consulta directamente con el coordinador del semillero.
      </footer>
    </section>
  );
}
