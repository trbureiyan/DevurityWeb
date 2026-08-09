"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getPublicRouteSuggestions } from "@/lib/routing/public-routes";

export default function NotFound() {
  const pathname = usePathname() ?? "/";
  const suggestions = getPublicRouteSuggestions(pathname);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <p className="font-orbitron text-sm tracking-[0.3em] text-link">ERROR 404</p>
        <h1 className="mt-4 text-4xl font-bold text-buttons">Página no encontrada</h1>
        <p className="mt-4 text-base text-foreground/70">
          No encontramos una página para esta dirección.
        </p>
        {suggestions.length > 0 && (
          <div className="mt-8">
            <p className="text-sm text-foreground/70">Tal vez buscabas:</p>
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              {suggestions.map((suggestion) => (
                <Link
                  key={suggestion}
                  href={suggestion}
                  className="rounded border border-link/50 px-4 py-2 text-link transition hover:border-link hover:bg-link/10"
                >
                  {suggestion === "/" ? "Inicio" : suggestion.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        )}
        <Link href="/" className="mt-8 inline-block text-link hover:underline">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
