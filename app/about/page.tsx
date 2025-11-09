import Image from "next/image";
import type { StaticImageData } from "next/image";
import { IMAGES } from "@/public/images";

export const dynamic = "force-static";

type TeamMember = {
  name: string;
  role: string;
  tagline?: string;
  description?: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  linkLabel?: string;
  linkHref?: string;
  imageBgClass?: string;
};

// Static placeholder data while profile management is implemented via the CMS.
const coreTeamMembers: TeamMember[] = [
  {
    name: "Brayan Toro Bustos",
    role: "Estudiante Ingeniería de Software",
    tagline: "| Frontend WebDev & DevOps |",
    description: "Líder y participante en el desarrollo de proyectos web.",
    imageSrc: IMAGES.team.brayan,
    imageAlt: "Brayan Toro",
    linkLabel: "LinkedIn",
    linkHref: "https://www.linkedin.com/in/trbureiyan/",
  },
  {
    name: "Alexander Lozada Caviedes",
    role: "Estudiante Ingeniería de Software",
    tagline: "| Backend WebDev & DB Engineer |",
    description: "Tutor de lenguajes y frameworks, usuario de Linux.",
    imageSrc: IMAGES.team.alex,
    imageAlt: "Alexander Lozada",
    linkLabel: "GitHub",
    linkHref: "https://github.com/Arekkazu",
  },
  {
    name: "Juan Camilo Mora Castañeda",
    role: "Estudiante Ingeniería de Software",
    tagline: "| T-Stack WebDev |",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc: IMAGES.team.mora,
    imageAlt: "Juan Camilo",
    linkLabel: "GitHub",
    linkHref: "https://github.com/JucaMora7",
  },
  {
    name: "Pablo Trujillo Artunduaga",
    role: "Estudiante Ingeniería de Software",
    tagline: "| Python Data Scientist |",
    description: "Científico de datos con Python.",
    imageSrc: "/api/placeholder/160/160",
    imageAlt: "Pablo Trujillo",
    linkLabel: "GitHub",
    linkHref: "https://github.com/PabloTrujilloArtunduaga",
    imageBgClass: "bg-yellow-100",
  },
];

const supportingTeamMembers: TeamMember[] = [
  {
    name: "María López .",
    role: "Estudiante tecnología en desarrollo de software",
    tagline: "| Hacker Ética |",
    imageSrc: "/api/placeholder/160/160",
    imageAlt: "María López",
  },
  {
    name: "Carlos Gómez G",
    role: "Estudiante Ingeniería de Software",
    tagline: "| Cloud & Backend |",
    imageSrc: "/api/placeholder/160/160",
    imageAlt: "Carlos Gómez",
  },
  {
    name: "Andrés Castillo Polanco",
    role: "Estudiante Ingeniería de Software",
    tagline: "| Frontend & UX |",
    imageSrc: "/api/placeholder/160/160",
    imageAlt: "Andrés Castillo",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

            {/* Hero Section - Mejorado */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Fondo con imagen y efectos */}
        <div className="absolute inset-0">
          <Image
            src={IMAGES.about.background}
            alt="About background"
            fill
            priority
            className="object-cover scale-110 animate-zoom-in"
            sizes="100vw"
          />
          
          {/* Overlays múltiples para profundidad */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/90"></div>
          
          {/* Partículas animadas */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>

        {/* Contenido central del Hero */}
        <div className="relative h-full flex flex-col items-center justify-center px-6 pt-20">
          
          {/* Elementos decorativos laterales */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="space-y-4">
              <div className="w-px h-20 bg-gradient-to-b from-transparent via-white to-transparent mx-auto"></div>
              <div className="text-white/60 text-sm rotate-90 origin-center whitespace-nowrap mt-8">
                SCROLL TO EXPLORE
              </div>
            </div>
          </div>

          {/* Título principal con efectos */}
          <div className="text-center space-y-6">

            <h1 className="font-orbitron font-bold text-6xl md:text-8xl lg:text-9xl text-white tracking-wider text-center animate-fade-in relative">
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-gradient-x">
                SOBRE NOSOTROS
              </span>
              
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shine"></div>
            </h1>

            {/* Líneas decorativas inferiores */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <div className="w-8 h-px bg-white/30"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
              <div className="w-8 h-px bg-white/30"></div>
            </div>

            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-white/80 font-light tracking-widest animate-fade-up delay-300 mt-6">
              CONOCIENDO A <span className="text-red-500 font-semibold">DEVURITY</span>
            </p>
          </div>

          {/* Scroll indicator mejorado */}
          <div className="absolute bottom-16 animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <div className="text-white/50 text-sm tracking-widest">EXPLORAR</div>
              <div className="relative">
                <svg 
                  className="w-8 h-8 text-white/60" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 blur-sm"></div>
              </div>
            </div>
          </div>
        </div>

        
      </section>

      {/* Mission Section */}
      <section className="relative bg-black py-24 -mt-px">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left side - Device Image */}
            <div className="relative order-2 md:order-1">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl"></div>
              <div className="relative flex items-center justify-center">
                <div className="relative w-full max-w-lg">
                  <Image
                    src={IMAGES.about.missionIllustration}
                    alt="Mission illustration"
                    width={800}
                    height={800}
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Glow effect */}
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-8 order-1 md:order-2">
              {/* Decorative lines top */}
              <div className="flex items-center gap-2 mb-12">
                <div className="flex gap-1">
                  <div className="w-16 h-1 bg-white"></div>
                  <div className="w-16 h-1 bg-white"></div>
                  <div className="w-16 h-1 bg-white"></div>
                  <div className="w-8 h-1 bg-white/40"></div>
                  <div className="w-8 h-1 bg-white/40"></div>
                </div>
              </div>

              <h2 className="text-6xl font-bold tracking-wider mb-12">
                <span className="text-white">MIS</span>
                <span className="text-white">IÓN</span>
                <div className="h-1 w-24 bg-[#b20403] mt-2"></div>

              </h2>

              <div className="border-l-4 pl-6 space-y-6 text-gray-300 leading-relaxed" style={{borderColor: '#b20403'}}>
                <p className="text-lg">
                  <strong>Devurity</strong> es el semillero de investigación y práctica tecnológica del Programa de Ingeniería de Software de la Universidad Surcolombiana. Impulsamos formación y producción de conocimiento aplicado en <strong>desarrollo de software, ciencia de datos y ciberseguridad</strong>, combinando investigación formativa con proyectos reales que aportan valor a la Universidad y su entorno.
                </p>
                
                <p className="text-lg">
                  Nuestra misión es <strong>aprender haciendo, compartir lo aprendido y elevar el estándar técnico y ético</strong> de nuestros miembros. Creamos espacios de mentoría entre pares y promovemos buenas prácticas (versionamiento, pruebas, despliegue y seguridad) para entregar resultados verificables: <strong>prototipos, artículos, demos y servicios</strong> que fortalezcan el ecosistema académico y tecnológico regional.
                </p>
              </div>

              {/* Decorative lines bottom */}
              <div className="flex gap-1 mt-12 justify-end">
                <div className="w-4 h-1 bg-white"></div>
                <div className="w-4 h-1 bg-white"></div>
                <div className="w-4 h-1 bg-white"></div>
                <div className="w-4 h-1 bg-white"></div>
                <div className="w-4 h-1 bg-white"></div>
                <div className="w-4 h-1 bg-white"></div>
                <div className="w-4 h-1 bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative bg-black py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left side - Content */}
            <div className="space-y-8">
              {/* Decorative lines top */}
              <div className="flex items-center gap-2 mb-8">
                <div className="flex gap-1">
                  <div className="w-12 h-1 bg-white"></div>
                  <div className="w-12 h-1 bg-white"></div>
                  <div className="w-12 h-1 bg-white"></div>
                  <div className="w-6 h-1 bg-white/40"></div>
                  <div className="w-6 h-1 bg-white/40"></div>
                </div>
              </div>

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

              {/* Decorative lines bottom */}
              <div className="flex gap-1 mt-8">
                <div className="w-3 h-1 bg-white"></div>
                <div className="w-3 h-1 bg-white"></div>
                <div className="w-3 h-1 bg-white"></div>
                <div className="w-3 h-1 bg-white"></div>
                <div className="w-3 h-1 bg-white"></div>
                <div className="w-3 h-1 bg-white"></div>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-l from-purple-600/10 to-transparent blur-3xl"></div>
              <div className="relative flex items-center justify-center">
                <div className="relative w-full max-w-lg">
                  <Image
                    src={IMAGES.about.visionIllustration}
                    alt="Vision illustration"
                    width={800}
                    height={800}
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Glow effect */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-black py-24">
        <div className="container mx-auto px-6 md:px-12">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-bold tracking-wider mb-6">NUESTRO EQUIPO</h2>
            {/* Decorative lines */}
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1">
                <div className="w-12 h-1 bg-white"></div>
                <div className="w-12 h-1 bg-white"></div>
                <div className="w-12 h-1 bg-white"></div>
                <div className="w-6 h-1 bg-white/40"></div>
                <div className="w-6 h-1 bg-white/40"></div>
              </div>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {coreTeamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-zinc-900/50 rounded-3xl p-6 text-center hover:bg-zinc-800/50 transition-all"
              >
                <div
                  className={`w-40 h-40 mx-auto mb-4 rounded-3xl overflow-hidden relative ${member.imageBgClass ?? ""}`}
                >
                  <Image
                    src={member.imageSrc}
                    alt={member.imageAlt}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-sm font-semibold text-gray-400 mb-2">{member.role}</p>
                {member.tagline ? (
                  <p className="text-xs text-gray-500 mb-3">{member.tagline}</p>
                ) : null}
                {member.description ? (
                  <p className="text-sm text-gray-400 mb-4">{member.description}</p>
                ) : null}
                {member.linkHref && member.linkLabel ? (
                  <a
                    href={member.linkHref}
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="text-xs">{member.linkLabel}</span>
                  </a>
                ) : null}
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportingTeamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-zinc-900/50 rounded-3xl p-6 text-center hover:bg-zinc-800/50 transition-all"
              >
                <div className="w-40 h-40 mx-auto mb-4 rounded-3xl overflow-hidden relative">
                  <Image
                    src={member.imageSrc}
                    alt={member.imageAlt}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-sm font-semibold text-gray-400 mb-2">{member.role}</p>
                {member.tagline ? (
                  <p className="text-xs text-gray-500 mb-3">{member.tagline}</p>
                ) : null}
              </div>
            ))}

            {/* Team Member 8 */}
            <div className="bg-zinc-900/50 rounded-3xl p-6 text-center hover:bg-zinc-800/50 transition-all">
              <div className="w-40 h-40 mx-auto mb-4 rounded-3xl bg-gray-300 overflow-hidden flex items-center justify-center">
                <svg className="w-20 h-20 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Camila Duarte</h3>
              <p className="text-sm font-semibold text-gray-400 mb-2">Estudiante Ingeniería de Software</p>
              <p className="text-xs text-gray-500 mb-3">| Fullstack Developer |</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}