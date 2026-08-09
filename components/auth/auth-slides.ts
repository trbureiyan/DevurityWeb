import { IMAGES } from "@/public/images";
import type { AuthSlide } from "./AuthCarousel";

/**
 * [DECISION] Definir slides centralizados para las vistas de autenticación (Login/Register).
 * Previene la recreación del array en cada render y elimina la duplicación entre páginas.
 */
export const AUTH_SLIDES: readonly AuthSlide[] = [
  {
    title: "TRAZANDO HORIZONTES DIGITALES",
    image: IMAGES.login.slide0,
  },
  {
    title: "INNOVACIÓN Y TECNOLOGÍA",
    image: IMAGES.login.slide1,
  },
  {
    title: "DESARROLLANDO EL FUTURO",
    image: IMAGES.login.slide2,
  },
] as const;
