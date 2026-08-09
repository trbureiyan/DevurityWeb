"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

export interface AuthSlide {
  title: string;
  image: string;
}

interface AuthCarouselProps {
  slides: readonly AuthSlide[];
  autoAdvanceInterval?: number;
}

/**
 * Componente AuthCarousel accesible para las vistas de autenticación.
 * - Pausa el autoavance durante hover (`mouseenter`) y foco (`focusin`).
 * - Respeta la preferencia `prefers-reduced-motion: reduce`.
 * - Proporciona controles accesibles con `aria-label` y `aria-current`.
 * - Mantiene el texto del slide sincronizado para lectores de pantalla.
 */
export default function AuthCarousel({
  slides,
  autoAdvanceInterval = 5000,
}: AuthCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Detectar preferencia del usuario sobre animaciones reducidas
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Timer de autoavance condicionado a pausa y reduced-motion
  useEffect(() => {
    if (isPaused || prefersReducedMotion || slides.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoAdvanceInterval);

    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion, slides.length, autoAdvanceInterval, nextSlide]);

  if (!slides || slides.length === 0) return null;

  const activeSlideData = slides[currentSlide];

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-full min-h-[400px] overflow-hidden bg-black/40 flex flex-col justify-end p-8 md:p-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(e) => {
        if (!carouselRef.current?.contains(e.relatedTarget as Node)) {
          setIsPaused(false);
        }
      }}
      aria-roledescription="carrusel"
      aria-label="Imágenes promocionales de Devurity"
    >
      {/* Imágenes de fondo con transición de opacidad */}
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
          aria-hidden={index !== currentSlide}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171212] via-[#171212]/50 to-transparent" />
        </div>
      ))}

      {/* Contenido flotante del slide activo */}
      <div className="relative z-10 space-y-6">
        <div className="space-y-2">
          <p className="font-ubuntu text-xs tracking-[0.25em] text-variable-collection-link uppercase">
            SEMILLERO DE INVESTIGACIÓN
          </p>
          <h2
            className="font-orbitron text-2xl md:text-3xl font-bold text-white tracking-wide"
            aria-live="polite"
          >
            {activeSlideData.title}
          </h2>
        </div>

        {/* Controles de navegación del carrusel */}
        {slides.length > 1 && (
          <div
            className="flex items-center gap-2 pt-2"
            role="tablist"
            aria-label="Seleccionar diapositiva"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`Ir a la diapositiva ${index + 1} de ${slides.length}: ${slide.title}`}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-variable-collection-link ${
                  index === currentSlide
                    ? "w-8 bg-variable-collection-link"
                    : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
