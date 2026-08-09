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
 * Componente de navegación semántico (renderiza Next.js <Link>).
 * Comparte exactamente el mismo diseño que <Button> mediante `button-styles.ts`,
 * pero no maneja lógica asíncrona ni estados de carga.
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
