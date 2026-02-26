import Image from "next/image";
import { IMAGES } from "@/public/images";
import TeamCard from "@/components/team/TeamCard";
import {
  coreTeamMembers,
  supportingTeamMembers,
} from "@/lib/data/team";

export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.about.background}
            alt="About background"
            fill
            priority
            className="object-cover scale-110 animate-zoom-in"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/90" />

          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-bounce" />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse delay-300" />
          </div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-6 pt-20">
          <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="space-y-4">
              <div className="w-px h-20 bg-gradient-to-b from-transparent via-white to-transparent mx-auto" />
              <div className="text-white/60 text-sm rotate-90 whitespace-nowrap mt-8">
                SCROLL TO EXPLORE
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <h1 className="font-orbitron font-bold text-6xl md:text-8xl lg:text-9xl tracking-wider relative">
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-gradient-x">
                SOBRE NOSOTROS
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shine" />
            </h1>

            <div className="flex justify-center items-center gap-4 mt-8">
              <div className="w-8 h-px bg-white/30" />
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <div className="w-8 h-px bg-white/30" />
            </div>

            <p className="text-xl md:text-2xl text-white/80 tracking-widest mt-6">
              CONOCIENDO A <span className="text-red-500 font-semibold">DEVURITY</span>
            </p>
          </div>
        </div>
      </section>

      {/* ================= MISIÓN ================= */}
      <section className="relative bg-black py-24 -mt-px">
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl" />
            <Image
              src={IMAGES.about.missionIllustration}
              alt="Mission illustration"
              width={800}
              height={800}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="space-y-8">
            <div className="flex gap-1 mb-12">
              <div className="w-16 h-1 bg-white" />
              <div className="w-16 h-1 bg-white" />
              <div className="w-16 h-1 bg-white" />
              <div className="w-8 h-1 bg-white/40" />
              <div className="w-8 h-1 bg-white/40" />
            </div>

            <h2 className="text-6xl font-bold tracking-wider">
              MISIÓN
              <div className="h-1 w-24 bg-[#b20403] mt-2" />
            </h2>

            <div
              className="border-l-4 pl-6 space-y-6 text-gray-300 leading-relaxed"
              style={{ borderColor: "#b20403" }}
            >
              <p className="text-lg">
                <strong>Devurity</strong> es el semillero de investigación y práctica tecnológica del Programa de Ingeniería de Software de la Universidad Surcolombiana. Impulsamos formación y producción de conocimiento aplicado en <strong>desarrollo de software, ciencia de datos y ciberseguridad</strong>, combinando investigación formativa con proyectos reales que aportan valor a la Universidad y su entorno.
              </p>

              <p className="text-lg">
                Nuestra misión es <strong>aprender haciendo, compartir lo aprendido y elevar el estándar técnico y ético</strong> de nuestros miembros. Creamos espacios de mentoría entre pares y promovemos buenas prácticas (versionamiento, pruebas, despliegue y seguridad) para entregar resultados verificables: <strong>prototipos, artículos, demos y servicios</strong> que fortalezcan el ecosistema académico y tecnológico regional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VISIÓN ================= */}
      <section className="relative bg-black py-24">
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">

          <div className="space-y-8">
            <h2 className="text-6xl font-bold tracking-wider">VISIÓN</h2>

            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Nuestra visión es ser un semillero <strong>reconocido por convertir preguntas en prototipos y evidencia</strong>, articulando docencia, investigación y extensión. Nos orientamos a soluciones <strong>sostenibles, seguras y abiertas</strong> que sirvan a la Universidad y a aliados públicos y privados.
              </p>

              <p>
                Buscamos consolidar una <strong>comunidad técnica en crecimiento</strong>, con rutas de aprendizaje, mentoría y repositorios abiertos, que documenta, mide y mejora continuamente, promoviendo prácticas modernas: diseño centrado en el usuario, calidad, <strong>seguridad por defecto</strong> y operaciones confiables.
              </p>

              <p>
                Nos proyectamos más allá del campus mediante <strong>colaboraciones, retos, ponencias y contribuciones open source</strong> que posicionen a la USCO y a sus estudiantes en el ecosistema tecnológico regional y nacional.
              </p>

              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6 rounded-lg border border-purple-500/30">
                <p className="text-white font-semibold italic">
                  Investigamos para construir, construimos para aprender y compartimos para trascender, con ética y seguridad como principios.
                </p>
              </div>
            </div>
          </div>

          <Image
            src={IMAGES.about.visionIllustration}
            alt="Vision illustration"
            width={800}
            height={800}
            className="object-contain"
          />
        </div>
      </section>

      {/* ================= EQUIPO ================= */}
      <section className="relative bg-black py-24">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-center text-7xl font-bold mb-16">
            NUESTRO EQUIPO
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {coreTeamMembers.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportingTeamMembers.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}

            <div className="bg-zinc-900/50 rounded-3xl p-6 text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-3xl bg-gray-300 flex items-center justify-center">
                <svg className="w-20 h-20 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Camila Duarte</h3>
              <p className="text-sm text-gray-400">Estudiante Ingeniería de Software</p>
              <p className="text-xs text-gray-500">| Fullstack Developer |</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
