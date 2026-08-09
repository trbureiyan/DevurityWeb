import type { ReactNode, CSSProperties } from "react";

interface BaseCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Contenedor semántico para presentar contenido agrupado en una tarjeta.
 *
 * [DECISION] La composición explícita mantiene las superficies reutilizables sin
 * multiplicar props booleanas en un único componente.
 *
 * @param props - Contenido y clases opcionales de la tarjeta.
 * @returns Una tarjeta semántica como elemento `article`.
 * @throws No lanza excepciones por sí mismo.
 */
export function Card({ children, className = "", style }: BaseCardProps) {
  return (
    <article
      style={style}
      className={`group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-black/40 px-6 pb-6 pt-8 transition-all duration-300 hover:border-variable-collection-link/60 hover:shadow-[0_25px_60px_-30px_rgba(202,43,38,0.35)] ${className}`}
    >
      {children}
    </article>
  );
}

/**
 * Agrupa la cabecera de una tarjeta y distribuye sus elementos horizontalmente.
 * @param props - Contenido y clases opcionales de la cabecera.
 * @returns Un contenedor de cabecera.
 * @throws No lanza excepciones por sí mismo.
 */
export function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-between flex-wrap gap-2 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Renderiza metadatos secundarios de una tarjeta.
 * @param props - Contenido y clases opcionales de los metadatos.
 * @returns Un párrafo con estilos de metadatos.
 * @throws No lanza excepciones por sí mismo.
 */
export function CardMeta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`uppercase tracking-[0.22em] text-[13px] text-white/60 font-ubuntu ${className}`}>
      {children}
    </p>
  );
}

/**
 * Agrupa el contenido principal de una tarjeta.
 * @param props - Contenido y clases opcionales del cuerpo.
 * @returns Un contenedor para el contenido principal.
 * @throws No lanza excepciones por sí mismo.
 */
export function CardBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
}

/**
 * Renderiza el título principal de una tarjeta.
 * @param props - Título y clases opcionales.
 * @returns Un encabezado `h3` estilizado.
 * @throws No lanza excepciones por sí mismo.
 */
export function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h3
      className={`font-orbitron text-xl font-bold text-white group-hover:text-variable-collection-link transition-colors line-clamp-2 ${className}`}
    >
      {children}
    </h3>
  );
}

/**
 * Renderiza la descripción de una tarjeta con truncamiento visual.
 * @param props - Descripción y clases opcionales.
 * @returns Un párrafo descriptivo.
 * @throws No lanza excepciones por sí mismo.
 */
export function CardDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-ubuntu text-sm text-white/60 line-clamp-3 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

/**
 * Agrupa etiquetas relacionadas con el contenido de una tarjeta.
 * @param props - Etiquetas y clases opcionales.
 * @returns Un contenedor flexible de etiquetas.
 * @throws No lanza excepciones por sí mismo.
 */
export function CardTags({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-wrap gap-2 pt-1 ${className}`}>{children}</div>;
}

/**
 * Renderiza una etiqueta individual de una tarjeta.
 * @param props - Texto o contenido de la etiqueta y clases opcionales.
 * @returns Una etiqueta visual `span`.
 * @throws No lanza excepciones por sí mismo.
 */
export function CardTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-ubuntu text-white/60 transition-colors group-hover:border-white/20 ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Renderiza la zona de acciones al final de una tarjeta.
 * @param props - Acciones y clases opcionales.
 * @returns Un contenedor separado visualmente para las acciones.
 * @throws No lanza excepciones por sí mismo.
 */
export function CardAction({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`pt-5 border-t border-white/5 ${className}`}>{children}</div>;
}
