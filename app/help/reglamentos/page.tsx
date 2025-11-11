// app/help/reglamentos/page.tsx
import React from "react";

export const dynamic = "force-static";

type SeccionList = {
  subtitulo: string;
  items: string[];
};

type Articulo = {
  numero: number;
  titulo: string;
  parrafos?: string[];
  items?: string[];
  enumeratedItems?: string[];
  secciones?: SeccionList[];
};

type Titulo = {
  nombre: string;
  articulos: Articulo[];
};

const reglamento: { titulo: string; subtitulo?: string; titulos: Titulo[] } = {
  titulo: "Reglamento Interno del Semillero de Investigación Devurity",
  subtitulo:
    "Normas de convivencia, uso de instalaciones, gestión de proyectos y principios éticos para los miembros del semillero.",
  titulos: [
    {
      nombre: "TÍTULO I: DISPOSICIONES GENERALES",
      articulos: [
        {
          numero: 1,
          titulo: "Objeto",
          parrafos: [
            "El presente reglamento tiene como objeto establecer las normas de convivencia, uso de instalaciones, gestión de proyectos y principios éticos que rigen a los miembros del Semillero de Investigación \"Devurity\".",
          ],
        },
        {
          numero: 2,
          titulo: "Ámbito de Aplicación",
          parrafos: [
            "Estas normas aplican a todos los miembros activos (estudiantes, monitores, docentes) y al personal externo autorizado que haga uso de las instalaciones o recursos del semillero.",
          ],
        },
        {
          numero: 3,
          titulo: "Valores Fundamentales",
          parrafos: [
            "La actividad del semillero se fundamenta en el respeto mutuo, la honestidad, la solidaridad, la tolerancia, la empatía y la colaboración. Se espera que todos los miembros promuevan un ambiente académico saludable y propicio para la investigación.",
          ],
        },
      ],
    },
    {
      nombre: "TÍTULO II: NORMAS DE CONVIVENCIA Y USO DEL ESPACIO FÍSICO",
      articulos: [
        {
          numero: 4,
          titulo: "Orden y Aseo",
          parrafos: [
            "Cada miembro es responsable de mantener el orden y aseo de su espacio de trabajo. Esto incluye:",
          ],
          items: [
            "Disponer adecuadamente de residuos y basuras.",
            "Limpiar utensilios de comida o bebida (vasos, platos) inmediatamente después de su uso.",
            "Organizar el mobiliario (sillas, mesas) al finalizar su jornada.",
            "No está permitido dejar pertenencias de forma permanente en las áreas comunes. Los artículos que no sean para uso académico deben ser retirados al finalizar su uso.",
          ],
        },
        {
          numero: 5,
          titulo: "Higiene Personal",
          parrafos: [
            "Por respeto a la comunidad y al ambiente de trabajo compartido, se requiere que todos los miembros mantengan normas básicas de aseo personal. El liderazgo del semillero se reserva el derecho de admisión en casos que afecten la salubridad del espacio.",
          ],
        },
        {
          numero: 6,
          titulo: "Sustancias Prohibidas",
          parrafos: [
            "Queda estrictamente prohibido el consumo y distribución de sustancias psicoactivas, bebidas alcohólicas, tabaco y cigarrillos electrónicos (vapeadores) dentro de las instalaciones del semillero.",
          ],
        },
        {
          numero: 7,
          titulo: "Ruido y Ambiente de Trabajo",
          parrafos: ["El laboratorio es un espacio de concentración e investigación. Se debe mantener un nivel de ruido moderado."],
          items: [
            "El uso de dispositivos de audio debe realizarse con audífonos.",
            "Las conversaciones y llamadas deben realizarse en un tono de voz que no interrumpa a los demás.",
          ],
        },
        {
          numero: 8,
          titulo: "Uso de Instalaciones para Fines Académicos",
          items: [
            "El laboratorio debe usarse exclusivamente para los fines académicos e investigativos del semillero.",
            "Se prohíbe el uso recurrente de los equipos para actividades ajenas (ver películas, series o transmisiones deportivas fuera de los tiempos de descanso designados).",
            "Están terminantemente prohibidos los juegos de azar o apuestas fuera del siguiente horario: 12 a 2pm lunes - jueves y viernes toda la tarde.",
          ],
        },
        {
          numero: 9,
          titulo: "Seguridad Física y Armas",
          parrafos: [
            "Se prohíbe el uso de cualquier tipo de arma (de fuego, cortopunzante, Taser) en las instalaciones, en concordancia con el reglamento general de la universidad.",
          ],
        },
      ],
    },
    {
      nombre: "TÍTULO III: GESTIÓN DE RECURSOS Y SEGURIDAD",
      articulos: [
        {
          numero: 10,
          titulo: "Cuidado de Equipos",
          parrafos: [
            "Los miembros deben velar por el buen uso de los equipos y mobiliario. El daño causado por negligencia o mal uso de un dispositivo será responsabilidad del miembro, quien deberá gestionar su reparación o reposición.",
          ],
        },
        {
          numero: 11,
          titulo: "Acceso y Permanencia",
          items: [
            "La puerta del semillero debe permanecer cerrada por seguridad.",
            "La permanencia en el laboratorio está permitida únicamente bajo la supervisión de un monitor o docente líder.",
            "En ausencias cortas (no mayores a 30 minutos), el monitor podrá designar a un miembro responsable, quien asumirá la responsabilidad del laboratorio durante ese lapso.",
          ],
        },
        {
          numero: 12,
          titulo: "Personal Externo",
          parrafos: [
            "El ingreso de personal ajeno al semillero debe ser notificado y autorizado por el líder o los monitores. La persona visitante debe acatar este reglamento y su anfitrión será responsable de su conducta.",
          ],
        },
        {
          numero: 13,
          titulo: "Préstamo de Insumos",
          parrafos: [
            "La extracción de equipos o insumos del laboratorio está prohibida, salvo autorización expresa del líder del semillero para fines específicos (eventos, ponencias, trabajo de campo).",
          ],
        },
      ],
    },
    {
      nombre: "TÍTULO IV: REGLAMENTO DE PROYECTOS",
      articulos: [
        {
          numero: 14,
          titulo: "Vinculación a Proyectos",
          parrafos: [
            "Todo miembro activo debe estar vinculado al menos a un proyecto de investigación. Los miembros nuevos o aquellos que finalicen un proyecto dispondrán de un plazo de dos (2) semanas para integrarse a uno nuevo.",
          ],
        },
        {
          numero: 15,
          titulo: "Conformación de Equipos",
          parrafos: [
            "Los equipos de proyecto tendrán un máximo de seis (6) integrantes. Este número podrá ajustarse con la aprobación del líder del semillero, según la envergadura del proyecto.",
          ],
        },
        {
          numero: 16,
          titulo: "Seguimiento y Avances",
          items: [
            "Los equipos deben presentar avances semanales en las reuniones programadas (miércoles y jueves).",
            "La inasistencia o falta de avances sin justificación válida por tres (3) sesiones consecutivas o cinco (5) no consecutivas en un semestre, será causal de revisión de la permanencia del grupo en el proyecto.",
            "Si el proyecto fue asignado por el semillero, este podrá ser retirado y reasignado.",
          ],
        },
        {
          numero: 17,
          titulo: "Dinámica de Equipos",
          parrafos: [
            "El líder de cada equipo de proyecto, en mediación con el líder del semillero, podrá solicitar la reubicación o desvinculación de un miembro del equipo, siempre que exista una justificación válida (bajo rendimiento comprobado, incumplimiento de responsabilidades, faltas de convivencia).",
          ],
        },
      ],
    },
    {
      nombre: "TÍTULO V: POLÍTICA DE SEGURIDAD DE LA INFORMACIÓN Y USO ÉTICO",
      articulos: [
        {
          numero: 18,
          titulo: "Uso de Red y Herramientas",
          parrafos: ["El uso de la red del semillero debe ser responsable. Queda prohibido:"],
          items: [
            "Realizar cualquier tipo de ataque, escaneo o intrusión a la infraestructura de la universidad o de terceros sin autorización explícita (pentesting ético).",
            "Utilizar las herramientas del semillero para fines ilícitos, suplantación de identidad o fraude.",
            "Descargar o distribuir software sin licencia (piratería).",
          ],
        },
        {
          numero: 19,
          titulo: "Entornos de Prueba (Sandbox)",
          parrafos: [
            "Todas las pruebas de ciberseguridad, análisis de malware o desarrollo de exploits deben realizarse en entornos aislados (sandbox) o redes virtualizadas (VLANs) designadas para tal fin, con el fin de no comprometer la red universitaria.",
          ],
        },
        {
          numero: 20,
          titulo: "Manejo de Datos Sensibles",
          parrafos: [
            "Si un proyecto maneja datos reales de una organización o datos personales, los miembros involucrados deben firmar un acuerdo de confidencialidad y adherirse a las leyes de protección de datos vigentes (ej. Ley 1581 en Colombia).",
          ],
        },
      ],
    },
    {
      nombre: "TÍTULO VI: PROPIEDAD INTELECTUAL Y DESARROLLO COMERCIAL",
      articulos: [
        {
          numero: 21,
          titulo: "Confidencialidad",
          parrafos: [
            "Los miembros del semillero deben mantener estricta confidencialidad sobre los proyectos en desarrollo, ideas de negocio, códigos fuente y datos de empresas aliadas. Esta obligación se mantiene incluso después de dejar el semillero.",
          ],
        },
        {
          numero: 22,
          titulo: "Propiedad Intelectual",
          items: [
            "La propiedad intelectual de los desarrollos, marcas y patentes generados como parte de los proyectos del semillero se regirá por el Reglamento de Propiedad Intelectual de la Universidad Surcolombiana.",
            "Los porcentajes de titularidad entre los estudiantes-creadores, los docentes-tutores y la universidad deben ser definidos claramente por el equipo de trabajo, especialmente si se llega a una fase de comercialización.",
          ],
        },
        {
          numero: 23,
          titulo: "Publicaciones y Ponencias",
          parrafos: [
            "Cualquier publicación, ponencia o presentación de resultados de un proyecto debe contar con la aprobación previa del líder del semillero y el docente tutor, y debe otorgar los créditos correspondientes a todos los autores y al semillero.",
          ],
        },
      ],
    },
    {
      nombre: "TÍTULO VII: RÉGIMEN SANCIONATORIO",
      articulos: [
        {
          numero: 24,
          titulo: "Tipos de Faltas",
          parrafos: ["Las faltas se clasifican en Leves, Graves y Muy Graves."],
          secciones: [
            {
              subtitulo: "Faltas Leves:",
              items: ["Incumplimiento de normas de orden, aseo o ruido (Art. 4, 7)."],
            },
            {
              subtitulo: "Faltas Graves:",
              items: [
                "Reincidencia en faltas leves, uso indebido de instalaciones (Art. 8), inasistencia a seguimientos (Art. 16), negligencia con equipos (Art. 10).",
              ],
            },
            {
              subtitulo: "Faltas Muy Graves:",
              items: [
                "Consumo de sustancias (Art. 6), ingreso de armas (Art. 9), hurto, acoso, vulneraciones de seguridad (Art. 18), violación de confidencialidad (Art. 21).",
              ],
            },
          ],
        },
        {
          numero: 25,
          titulo: "Sanciones",
          parrafos: [
            "Según la gravedad de la falta y garantizando el debido proceso, las sanciones serán:",
          ],
          enumeratedItems: [
            "Amonestación verbal.",
            "Amonestación escrita con copia a la hoja de vida.",
            "Suspensión temporal del acceso al semillero (de 8 días hasta 1 mes).",
            "Expulsión definitiva del semillero.",
          ],
        },
        {
          numero: 26,
          titulo: "Debido Proceso",
          parrafos: [
            "Antes de imponer una sanción, el miembro tendrá derecho a ser escuchado por el comité o líder del semillero para presentar sus descargos.",
          ],
        },
      ],
    },
  ],
};

export default function ReglamentosPage() {
  return (
    <section className="py-14 animate-fade-up max-w-5xl mx-auto px-6">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-orbitron mb-3 tracking-wide">
          {reglamento.titulo}
        </h2>
        {reglamento.subtitulo ? (
          <p className="text-sm opacity-70 max-w-3xl mx-auto">{reglamento.subtitulo}</p>
        ) : null}
      </div>

      <div className="space-y-12">
        {reglamento.titulos.map((bloque) => (
          <section key={bloque.nombre}>
            <h3 className="text-2xl font-semibold tracking-wide mb-6">
              {bloque.nombre}
            </h3>

            <div className="space-y-6">
              {bloque.articulos.map((art) => (
                <article
                  key={`${bloque.nombre}-art-${art.numero}`}
                  className="p-5 rounded-lg border border-[var(--color-selected)] bg-[var(--placeholder)]/15 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_0_12px_var(--color-variable-collection-botones)]"
               >
                  <h4 className="font-ubuntu text-lg mb-2">
                    Artículo {art.numero}: {art.titulo}
                  </h4>

                  {art.parrafos?.map((p, idx) => (
                    <p key={idx} className="text-sm opacity-90 leading-relaxed mb-2">
                      {p}
                    </p>
                  ))}

                  {art.items && art.items.length > 0 ? (
                    <ul className="list-disc pl-6 text-sm opacity-90 leading-relaxed space-y-1">
                      {art.items.map((i, idx) => (
                        <li key={idx}>{i}</li>
                      ))}
                    </ul>
                  ) : null}

                  {art.enumeratedItems && art.enumeratedItems.length > 0 ? (
                    <ol className="list-decimal pl-6 text-sm opacity-90 leading-relaxed space-y-1">
                      {art.enumeratedItems.map((i, idx) => (
                        <li key={idx}>{i}</li>
                      ))}
                    </ol>
                  ) : null}

                  {art.secciones && art.secciones.length > 0 ? (
                    <div className="space-y-3 mt-2">
                      {art.secciones.map((sec, sidx) => (
                        <div key={sidx}>
                          <p className="text-sm font-medium opacity-90 mb-1">{sec.subtitulo}</p>
                          <ul className="list-disc pl-6 text-sm opacity-90 leading-relaxed space-y-1">
                            {sec.items.map((item, iidx) => (
                              <li key={iidx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-14 text-center opacity-70 text-sm">
        <p>
          El cumplimiento de este reglamento garantiza un ambiente adecuado para la formación, la investigación y el desarrollo técnico.
        </p>
      </div>
    </section>
  );
}
