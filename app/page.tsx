import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-variable-collection-fondo">
      {/* Hero Section */}
      <section className="container mx-auto px-10 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-orbitron font-bold text-5xl md:text-6xl text-white mb-6 tracking-wider animate-fade-in">
            SEMILLERO DE INVESTIGACIÓN
          </h1>
          <p className="font-ubuntu text-xl text-foreground/80 mb-8 animate-fade-up">
            Innovación, tecnología y desarrollo en la Universidad Surcolombiana
          </p>
            <button className="bg-variable-collection-botones text-white font-ubuntu font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity animate-fade-up">
              Conoce Más
            </button>
          </div>
        </section>
  
        {/* About Section */} 
        <section id="nosotros" className="container mx-auto px-10 py-20">
          <h2 className="font-orbitron font-bold text-4xl text-white mb-12 text-center">
            ¿Quiénes Somos?
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-variable-collection-placeholder p-8 rounded-lg">
          <h3 className="font-orbitron text-2xl text-white mb-4">N</h3>
          <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
            {/* TODO: Falta optimizar las imagenes */}
            <Image
              src="/images/landing/pexels-simonptr-33607952.jpg"
              alt="DEV Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h4 className="font-orbitron text-6xl font-bold text-white">DEV</h4>
            </div>
          </div>
          <p className="font-ubuntu text-foreground/80">
            Fomentar el desarrollo de habilidades investigativas y tecnológicas en estudiantes universitarios mediante proyectos innovadores.
          </p>
            </div>
            <div className="bg-variable-collection-placeholder p-8 rounded-lg">
          <h3 className="font-orbitron text-2xl text-white mb-4">V</h3>
          <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
            <Image
              src="/images/landing/pexels-googledeepmind-17483910.jpg"
              alt="URITY Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h4 className="font-orbitron text-6xl font-bold text-white">URITY</h4>
            </div>
          </div>
          <p className="font-ubuntu text-foreground/80">
            Ser un referente en investigación y desarrollo tecnológico en la región, impulsando la innovación desde la universidad.
          </p>
            </div>
          </div>
        </section>

      {/* Projects Preview */}
      <section id="proyectos" className="container mx-auto px-10 py-20">
        <h2 className="font-orbitron font-bold text-4xl text-white mb-12 text-center">
          Nuestros Proyectos
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-variable-collection-placeholder p-6 rounded-lg hover:bg-opacity-80 transition-all">
              <div className="h-40 bg-variable-collection-seleccionado rounded-lg mb-4"></div>
              <h3 className="font-orbitron text-xl text-white mb-2">Proyecto {item}</h3>
              <p className="font-ubuntu text-foreground/80 text-sm mb-4">
                Descripción breve del proyecto de investigación y sus objetivos principales.
              </p>
              <a href="/projects" className="text-variable-collection-links font-ubuntu font-semibold hover:underline">
                Ver más →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section id="eventos" className="container mx-auto px-10 py-20">
        <h2 className="font-orbitron font-bold text-4xl text-white mb-12 text-center">
          Próximos Eventos
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            { title: 'Workshop de IA', date: 'Marzo 15, 2025' },
            { title: 'Hackathon Devurity', date: 'Abril 20, 2025' },
            { title: 'Charla: Futuro del Desarrollo Web', date: 'Mayo 10, 2025' },
          ].map((event, index) => (
            <div key={index} className="bg-variable-collection-placeholder p-6 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-orbitron text-xl text-white mb-2">{event.title}</h3>
                <p className="font-ubuntu text-foreground/80 text-sm">{event.date}</p>
              </div>
              <button className="bg-variable-collection-botones text-white font-ubuntu px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Inscribirse
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="container mx-auto px-10 py-20">
        <h2 className="font-orbitron font-bold text-4xl text-white mb-12 text-center">
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