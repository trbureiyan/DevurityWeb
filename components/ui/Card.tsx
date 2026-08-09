import type { ReactNode, CSSProperties } from "react";

interface BaseCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Primitiva Card base con composición explícita (CardHeader, CardMeta, CardBody, CardTags, CardAction).
 * Evita props booleanas sobrecargadas y proporciona tokens de superficie unificados:
 * - Borde base: `border border-white/10`
 * - Fondo: `bg-black/40`
 * - Radio: `rounded-3xl`
 * - Padding: `px-6 pb-6 pt-8`
 * - Hover: `hover:border-variable-collection-link/60 hover:shadow-[0_25px_60px_-30px_rgba(202,43,38,0.35)]`
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

export function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-between flex-wrap gap-2 ${className}`}>
      {children}
    </div>
  );
}

export function CardMeta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`uppercase tracking-[0.22em] text-[13px] text-white/60 font-ubuntu ${className}`}>
      {children}
    </p>
  );
}

export function CardBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h3
      className={`font-orbitron text-xl font-bold text-white group-hover:text-variable-collection-link transition-colors line-clamp-2 ${className}`}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-ubuntu text-sm text-white/60 line-clamp-3 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

export function CardTags({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-wrap gap-2 pt-1 ${className}`}>{children}</div>;
}

export function CardTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-ubuntu text-white/60 transition-colors group-hover:border-white/20 ${className}`}
    >
      {children}
    </span>
  );
}

export function CardAction({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`pt-5 border-t border-white/5 ${className}`}>{children}</div>;
}
