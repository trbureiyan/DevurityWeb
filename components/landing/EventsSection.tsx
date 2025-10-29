import { UPCOMING_EVENTS } from "@/lib/constants/landing";

// Segmento de eventos y noticias
export default function EventsSection() {
  return (
    <section id="eventos" className="container mx-auto px-6 md:px-10 py-20">
      <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-12 text-center">
        Próximos Eventos
      </h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {UPCOMING_EVENTS.map((event, index) => (
          <div 
            key={index} 
            className="bg-variable-collection-placeholder p-6 rounded-lg flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-opacity-80 transition-all"
          >
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
  );
}
