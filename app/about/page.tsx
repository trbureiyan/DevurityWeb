import Image from "next/image";
import { IMAGES } from "@/public/images";
import logger from "@/lib/logger";
import TeamMemberCard from "@/components/about/TeamMemberCard";
import { findActiveUsersForTeam } from "@/repositories/users/users.repositories";

type SocialLink = {
  icon: string;
  url: string;
  label: string;
};

type TeamMember = {
  id: string;
  name: string;
  username?: string;
  role: string;
  tagline?: string;
  bio?: string;
  avatar?: string;
  socialLinks?: SocialLink[];
  program?: string;
  semester?: number;
};

/**
 * Obtiene y transforma los miembros activos del equipo desde la base de datos
 */
async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const users = await findActiveUsersForTeam();
    
    return users.map((user) => {
      const socialLinks: SocialLink[] = [];
      if (user.platforms && user.platforms.length > 0) {
        user.platforms.forEach((platform) => {
          socialLinks.push({
            icon: platform.name.toLowerCase(),
            url: platform.link,
            label: platform.name,
          });
        });
      }
      
      return {
        id: user.id,
        name: `${user.name} ${user.last_name}`,
        username: user.username ?? undefined,
        role: user.role,
        bio: user.motivation || "Miembro del equipo Devurity",
        avatar: undefined,
        tagline:
          user.skills.length > 0
            ? user.skills.slice(0, 3).join(" \u2022 ")
            : undefined,
        socialLinks: socialLinks.slice(0, 3),
        program: user.program ?? undefined,
        semester: user.semester ?? undefined,
      };
    });
  } catch (error) {
    logger.error("Error fetching team members:", { error });
    return [];
  }
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Hero Section */}
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
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/90"></div>
          
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-6 pt-20">
          <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="space-y-4">
              <div className="w-px h-20 bg-gradient-to-b from-transparent via-white to-transparent mx-auto"></div>
              <div className="text-white/60 text-sm rotate-90 origin-center whitespace-nowrap mt-8">
                SCROLL TO EXPLORE
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <h1 className="font-orbitron font-bold text-6xl md:text-8xl lg:text-9xl text-white tracking-wider text-center animate-fade-in relative">
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-gradient-x">
                SOBRE NOSOTROS
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shine"></div>
            </h1>

            <div className="flex justify-center items-center gap-4 mt-8">
              <div className="w-8 h-px bg-white/30"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
              <div className="w-8 h-px bg-white/30"></div>
            </div>

            <p className="text-xl md:text-2xl text-white/80 font-light tracking-widest animate-fade-up delay-300 mt-6">
              CONOCIENDO A <span className="text-red-500 font-semibold">DEVURITY</span>
            </p>
          </div>

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
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>

            <div className="space-y-8 order-1 md:order-2">
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
            <div className="space-y-8">
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

              <div className="flex gap-1 mt-8">
                <div className="w-3 h-1 bg-white"></div>
                <div className="w-3 h-1 bg-white"></div>
                <div className="w-3 h-1 bg-white"></div>
                <div className="w-3 h-1 bg-white"></div>
                <div className="w-3 h-1 bg-white"></div>
                <div className="w-3 h-1 bg-white"></div>
              </div>
            </div>

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
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative bg-black py-24 border-t border-zinc-900">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-bold tracking-wider mb-6">NUESTRO EQUIPO</h2>
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

          {teamMembers.length > 0 ? (
            Object.entries(
              teamMembers.reduce((acc, member) => {
                const role = member.role || "Miembros";
                if (!acc[role]) acc[role] = [];
                acc[role].push(member);
                return acc;
              }, {} as Record<string, TeamMember[]>)
            ).map(([roleName, members]) => (
              <div key={roleName} className="mb-20 last:mb-0">
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="font-orbitron text-2xl md:text-3xl font-bold tracking-widest text-white uppercase">
                    {roleName}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-red-600/50 via-zinc-800 to-transparent"></div>
                  <span className="font-mono text-xs text-zinc-500 bg-zinc-900 px-3 py-1 rounded border border-zinc-800">
                    {members.length} {members.length === 1 ? 'integrante' : 'integrantes'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                  {members.map((member) => (
                    <TeamMemberCard
                      key={member.id}
                      id={member.id}
                      name={member.name}
                      username={member.username}
                      role={member.role}
                      bio={member.bio || "Miembro del equipo Devurity"}
                      avatar={member.avatar}
                      socialLinks={member.socialLinks}
                      tagline={member.tagline}
                      program={member.program}
                      semester={member.semester}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-12">
              <p className="text-lg">No hay miembros del equipo disponibles en este momento</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}