import Link from "next/link";
import type { ComponentProps } from "react";
import {
  BUTTON_BASE,
  BUTTON_SIZE_CLASSES,
  BUTTON_VARIANT_CLASSES,
  type ButtonSize,
  type ButtonVariant,
} from "./button-styles";

export type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/**
 * Enlace de navegación con la apariencia del sistema de botones.
 *
 * @param props - Destino de navegación, variante, tamaño y props de `Link`.
 * @returns Un componente `Link` de Next.js con estilos de botón.
 * @throws No lanza excepciones por sí mismo.
 */
export default function LinkButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      {...props}
      className={`${BUTTON_BASE} ${BUTTON_VARIANT_CLASSES[variant]} ${BUTTON_SIZE_CLASSES[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
