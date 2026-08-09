import LinkButton from "./LinkButton";

interface LoginButtonProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

/**
 * Componente especializado de botón de inicio de sesión.
 * Consume `LinkButton` para mantener la coherencia semántica y el diseño del sistema.
 */
export default function LoginButton({
  variant = "desktop",
  className = "",
}: LoginButtonProps) {
  const isDesktop = variant === "desktop";
  const size = isDesktop ? "sm" : "sm";

  return (
    <LinkButton
      href="/auth/login"
      variant="primary"
      size={size}
      className={`font-ubuntu font-bold whitespace-nowrap ${
        isDesktop ? "px-5 py-1.5 text-sm" : "px-3 py-1 text-xs"
      } ${className}`}
      aria-label="Iniciar Sesión"
    >
      Iniciar Sesión
    </LinkButton>
  );
}
