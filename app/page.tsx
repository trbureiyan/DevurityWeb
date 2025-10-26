import Image from "next/image";
import { IMAGES } from '@/public/images';

export default function Home() {
  return (
    <main className="min-h-screen bg-variable-collection-fondo scroll-smooth">
      {/* Hero Section con fondo de ondas */}
      <section id="hero" className="relative h-225 w-full overflow-hidden">
        {/* Fondo con imagen de ondas */}
        <div className="absolute inset-0">
          <Image
            src={IMAGES.landing.banner}
            alt="Background waves"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay oscuro para mejorar contraste */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Overlay degradado oscuro en la parte inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-variable-collection-fondo via-variable-collection-fondo/50 to-transparent"></div>
        </div>

        {/* Contenido central del Hero */}
        <div className="relative h-212 flex flex-col items-center justify-center px-6">
          {/* Logo central */}
          <div className="mb-8 relative">
            <div className="w-48 h-48 md:w-64 md:h-64 relative">
              <Image
                src={IMAGES.logo.main}
                alt="Devurity Logo"
                fill
                className="object-contain drop-shadow-2xl animate-fade-in"
                priority
              />
            </div>
          </div>

          {/* Título principal */}
          <h1 className="font-orbitron font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-[0.2em] text-center animate-fade-in">
            DEVURITY
          </h1>

          {/* Subtítulo */}
          <h2 className="font-orbitron font-medium text-2xl md:text-3xl lg:text-4xl text-white mb-4 tracking-wider text-center animate-fade-up">
            Semillero de Innovación Tecnológica
          </h2>

          {/* Descripción */}
          <p className="font-ubuntu text-lg md:text-xl text-white/90 max-w-3xl text-center mb-12 leading-relaxed animate-fade-up px-4">
            Exploramos, desarrollamos y aplicamos soluciones tecnológicas reales desde la universidad hacia el mundo.
          </p>

          {/* Scroll indicator */}
          <div className="absolute bottom-[50px] animate-bounce">
            <svg 
              className="w-6 h-6 text-white/60" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>

        {/* Menú de navegación rápida lateral derecho */}
        <nav className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-8 z-10">
          {[
            { label: 'Bienvenido', href: '#hero' },
            { label: 'Enfoque', href: '#nosotros' },
            { label: 'Eventos', href: '#eventos' },
            { label: 'Proyectos', href: '#proyectos' },
            { label: 'Contacto', href: '#contacto' },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="group relative font-ubuntu text-white/70 hover:text-white text-sm transition-colors duration-300 text-right pb-2"
            >
              {item.label}
              {/* Línea decorativa debajo del texto */}
              <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-gradient-to-l from-variable-collection-botones to-variable-collection-link group-hover:w-full transition-all duration-500 ease-out"></span>
            </a>
          ))}
        </nav>
      </section>

      {/* Sección: Del Aprendizaje al Impacto Real */}
<section className="container mx-auto px-6 md:px-10 py-20">
  <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
    {/* Contenido del cuadro negro */}
    <div className="w-[695px] h-[483px] rounded-[25px] pt-[35px] pr-[42px] pb-[40px] pl-[15px] bg-black">
      <h2 className="font-orbitron font-extrabold text-white leading-tight">
        <span className="block text-[36px]">
          DEL APRENDIZAJE
        </span>
        <span className="block text-[24px]">
          AL
        </span>
        <span className="block text-[50px] mt-1">
          IMPACTO REAL
        </span>
      </h2>
      
      <div className="space-y-4 text-white/90 font-ubuntu text-base leading-relaxed mt-6">
        <p>
          Somos un semillero interdisciplinario enfocado en investigación aplicada y desarrollo tecnológico.
        </p>
        
        <p>
          Fusionamos formación académica, práctica profesional y comunidad. Desde prototipos que usan APIs de la NASA hasta soluciones de ciberseguridad automatizada y herramientas para el sector agroindustrial en Colombia.
        </p>
        
        <p>
          <span className="text-white font-semibold">¿Nuestra prioridad?</span> El aprender con rigor y transformar el aprendizaje en impacto real.
        </p>
      </div>
      
      <div className="mt-6">
        <a
          href="/projects"
          className="inline-block bg-variable-collection-botones text-white font-ubuntu font-bold px-8 py-4 rounded-lg hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-variable-collection-botones/50"
        >
          Observa nuestros proyectos
        </a>
      </div>
    </div>
    
    {/* SVG - Lado derecho */}
    <div className="relative h-[450px] md:h-[600px] lg:h-[750px] -mr-6 md:-mr-10 lg:-mr-24 -mt-16 md:-mt-32 lg:-mt-20">
      <div className="relative w-full h-full">
        {/* Overlay degradado oscuro en la parte superior */}
        <div className="absolute top-0 left-0 w-[120%] h-[30%] bg-gradient-to-b from-variable-collection-fondo via-variable-collection-fondo/50 to-transparent z-10"></div>
        
        <div className="relative w-[120%] h-full animate-float">
          <Image
            src={IMAGES.landing.cuboAbstracto} 
            alt="Tecnología e Innovación"
            fill
            className="object-contain object-right-top"
            priority
           />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* About Section */} 
      <section id="nosotros" className="container mx-auto px-6 md:px-10 py-20">
        <h2 className="font-orbitron font-bold text-[58px] md:text-5xl text-white mb-12 text-center">
          NUESTRO ADN
        </h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-variable-collection-placeholder p-8 rounded-lg hover:bg-opacity-80 transition-all">
            <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
              <Image
                src={IMAGES.landing.devBG} 
                alt="DEV Background"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 flex items-center justify-center">
                <h4 className="font-orbitron text-6xl font-bold text-white tracking-wider">DEV</h4>
              </div>
            </div>
            <p className="font-ubuntu text-foreground/80 leading-relaxed">
              Fomentar el desarrollo de habilidades investigativas y tecnológicas en estudiantes universitarios mediante proyectos innovadores.
            </p>
          </div>
          
          <div className="bg-variable-collection-placeholder p-8 rounded-lg hover:bg-opacity-80 transition-all">
            <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
              <Image
                src={IMAGES.landing.urityBG} 
                alt="URITY Background"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 flex items-center justify-center">
                <h4 className="font-orbitron text-6xl font-bold text-white tracking-wider">URITY</h4>
              </div>
            </div>
            <p className="font-ubuntu text-foreground/80 leading-relaxed">
              Ser un referente en investigación y desarrollo tecnológico en la región, impulsando la innovación desde la universidad.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section id="proyectos" className="container mx-auto px-6 md:px-10 py-20">
        <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-12 text-center">
          Nuestros Proyectos
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-variable-collection-placeholder p-6 rounded-lg hover:bg-opacity-80 transition-all hover:scale-105 duration-300">
              <div className="h-40 bg-gradient-to-br from-variable-collection-seleccionado to-variable-collection-botones rounded-lg mb-4"></div>
              <h3 className="font-orbitron text-xl text-white mb-2">Proyecto {item}</h3>
              <p className="font-ubuntu text-foreground/80 text-sm mb-4">
                Descripción breve del proyecto de investigación y sus objetivos principales.
              </p>
              <a href="/projects" className="text-variable-collection-links font-ubuntu font-semibold hover:underline inline-flex items-center gap-2">
                Ver más 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section id="eventos" className="container mx-auto px-6 md:px-10 py-20">
        <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-12 text-center">
          Próximos Eventos
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            { title: 'Workshop de IA', date: 'Marzo 15, 2025', category: 'Taller' },
            { title: 'Hackathon Devurity', date: 'Abril 20, 2025', category: 'Competencia' },
            { title: 'Charla: Futuro del Desarrollo Web', date: 'Mayo 10, 2025', category: 'Conferencia' },
          ].map((event, index) => (
            <div key={index} className="bg-variable-collection-placeholder p-6 rounded-lg flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-opacity-80 transition-all">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-variable-collection-botones rounded-full text-xs font-ubuntu text-white mb-2">
                  {event.category}
                </span>
                <h3 className="font-orbitron text-xl text-white mb-2">{event.title}</h3>
                <p className="font-ubuntu text-foreground/80 text-sm">{event.date}</p>
              </div>
              <button className="bg-variable-collection-botones text-white font-ubuntu px-6 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
                Inscribirse
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="container mx-auto px-6 md:px-10 py-20">
        <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-12 text-center">
          Contáctanos
        </h2>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-ubuntu text-white mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-variable-collection-placeholder text-white font-ubuntu px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-variable-collection-links"
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-ubuntu text-white mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-variable-collection-placeholder text-white font-ubuntu px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-variable-collection-links"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-ubuntu text-white mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full bg-variable-collection-placeholder text-white font-ubuntu px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-variable-collection-links resize-none"
                placeholder="¿En qué podemos ayudarte?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-variable-collection-botones text-white font-ubuntu font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}