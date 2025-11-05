export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

            {/* Hero Section - Mejorado */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Fondo con imagen y efectos */}
        <div className="absolute inset-0">
          <img
            src="/images/about/aboutfondo.jpg"
            alt="About background"
            className="w-full h-full object-cover scale-110 animate-zoom-in"
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
                  <img 
                    src="/images/about/about.svg" 
                    alt="Mission illustration" 
                    className="w-full h-auto object-contain"
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
                  <strong>Devurity</strong> es el semillero de innovación tecnológica del programa de Ingeniería de Software de la Universidad Surcolombiana, una comunidad universitaria dedicada a la investigación aplicada, el desarrollo de software y la ciberseguridad.
                </p>
                
                <p className="text-lg">
                  Nuestra filosofía es simple pero poderosa: <strong>aprender haciendo, compartir conocimiento y transformar el aprendizaje en impacto real</strong>. Nacimos como un espacio interdisciplinario donde estudiantes, docentes y aliados externos colaboran para convertir ideas en soluciones tecnológicas tangibles.
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
                  Desde la universidad hacia el mundo, <strong>Devurity impulsa proyectos</strong> que abarcan desde aplicaciones para el sector agroindustrial, institucional y educativo, hasta soluciones basadas en APIs científicas y entornos de seguridad digital automatizada.
                </p>
                
                <p>
                  Cada proyecto se convierte en un <strong>laboratorio de aprendizaje, visibilidad y colaboración</strong>, articulando investigación, innovación y emprendimiento académico.
                </p>

                <p>
                  Participar en Devurity es integrarse a un <strong>ecosistema que potencia el talento joven</strong>, fomenta la cultura de la autogestión tecnológica y promueve la transformación digital universitaria.
                </p>

                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6 rounded-lg border border-purple-500/30">
                  <p className="text-white font-semibold italic">
                    Creemos en el poder del conocimiento compartido, en la ética del desarrollo seguro y en la posibilidad de construir desde la academia un futuro más confiable, inteligente y humano.
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
                  <img 
                    src="/images/about/Yo xd.svg" 
                    alt="Vision illustration" 
                    className="w-full h-auto object-contain"
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
            {/* Team Member 1 */}
            <div className="bg-zinc-900/50 rounded-3xl p-6 text-center hover:bg-zinc-800/50 transition-all">
              <div className="w-40 h-40 mx-auto mb-4 rounded-3xl bg-[#f5e6d3] overflow-hidden">
                <img src="/images/about/Yo xd.svg" alt="Brayan Toro" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2">Brayan Toro Bustos</h3>
              <p className="text-sm font-semibold text-gray-400 mb-2">Estudiante Ingeniería de Software</p>
              <p className="text-xs text-gray-500 mb-3">| Frontend WebDev & DevOps |</p>
              <p className="text-sm text-gray-400 mb-4">Líder y participante en el desarrollo de proyectos web.</p>
              <a href="#" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <span className="text-xs">LinkedIn</span>
              </a>
            </div>

            {/* Team Member 2 */}
            <div className="bg-zinc-900/50 rounded-3xl p-6 text-center hover:bg-zinc-800/50 transition-all">
              <div className="w-40 h-40 mx-auto mb-4 rounded-3xl bg-white overflow-hidden">
                <img src="/images/about/alex.png" alt="Alexander Lozada" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2">Alexander Lozada .</h3>
              <p className="text-sm font-semibold text-gray-400 mb-2">Estudiante Ingeniería de Software</p>
              <p className="text-xs text-gray-500 mb-3">| Backend WebDev & DB Engineer |</p>
              <p className="text-sm text-gray-400 mb-4">Tutor de lenguajes y frameworks, usuario de Linux.</p>
              <a href="#" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <span className="text-xs">GitHub</span>
              </a>
            </div>

            {/* Team Member 3 */}
            <div className="bg-zinc-900/50 rounded-3xl p-6 text-center hover:bg-zinc-800/50 transition-all">
              <div className="w-40 h-40 mx-auto mb-4 rounded-3xl bg-purple-200 overflow-hidden">
                <img src="/images/about/mora.jpg" alt="Juan Camilo" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2">Juan Camilo Mora Castañeda</h3>
              <p className="text-sm font-semibold text-gray-400 mb-2">Estudiante Ingeniería de Software</p>
              <p className="text-xs text-gray-500 mb-3">| T-Stack WebDev |</p>
              <p className="text-sm text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <a href="#" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <span className="text-xs">GitHub</span>
              </a>
            </div>

            {/* Team Member 4 */}
            <div className="bg-zinc-900/50 rounded-3xl p-6 text-center hover:bg-zinc-800/50 transition-all">
              <div className="w-40 h-40 mx-auto mb-4 rounded-3xl bg-yellow-100 overflow-hidden">
                <img src="/images/about/pablo.png" alt="Pablo Trujillo" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pablo Trujillo Artunduaga</h3>
              <p className="text-sm font-semibold text-gray-400 mb-2">Estudiante Ingeniería de Software</p>
              <p className="text-xs text-gray-500 mb-3">| Python Data Scientist |</p>
              <p className="text-sm text-gray-400 mb-4">Científico de datos con Python.</p>
              <a href="#" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <span className="text-xs">GitHub</span>
              </a>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 5 */}
            <div className="bg-zinc-900/50 rounded-3xl p-6 text-center hover:bg-zinc-800/50 transition-all">
              <div className="w-40 h-40 mx-auto mb-4 rounded-3xl overflow-hidden">
                <img src="/api/placeholder/160/160" alt="María López" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2">María López .</h3>
              <p className="text-sm font-semibold text-gray-400 mb-2">Estudiante tecnología en desarrollo de software</p>
              <p className="text-xs text-gray-500 mb-3">| Hacker Ética |</p>
            </div>

            {/* Team Member 6 */}
            <div className="bg-zinc-900/50 rounded-3xl p-6 text-center hover:bg-zinc-800/50 transition-all">
              <div className="w-40 h-40 mx-auto mb-4 rounded-3xl overflow-hidden">
                <img src="/api/placeholder/160/160" alt="Carlos Gómez" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2">Carlos Gómez G</h3>
              <p className="text-sm font-semibold text-gray-400 mb-2">Estudiante Ingeniería de Software</p>
              <p className="text-xs text-gray-500 mb-3">| Cloud & Backend |</p>
            </div>

            {/* Team Member 7 */}
            <div className="bg-zinc-900/50 rounded-3xl p-6 text-center hover:bg-zinc-800/50 transition-all">
              <div className="w-40 h-40 mx-auto mb-4 rounded-3xl overflow-hidden">
                <img src="/api/placeholder/160/160" alt="Andrés Castillo" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2">Andrés Castillo Polanco</h3>
              <p className="text-sm font-semibold text-gray-400 mb-2">Estudiante Ingeniería de Software</p>
              <p className="text-xs text-gray-500 mb-3">| Frontend & UX |</p>
            </div>

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