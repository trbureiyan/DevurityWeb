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
  variant: _variant = "desktop",
  className = "",
}: LoginButtonProps) {
  return (
    <LinkButton
      href="/auth/login"
      variant="primary"
      size="sm"
      className={`font-ubuntu font-bold whitespace-nowrap ${className}`}
      aria-label="Iniciar Sesión"
    >
      Iniciar Sesión
    </LinkButton>
  );
}
