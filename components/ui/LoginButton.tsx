import Link from "next/link";

interface LoginButtonProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

/**
 * Reusable login button component
 * @param variant - 'desktop' for larger button, 'mobile' for compact version
 * @param className - Additional CSS classes
 */
export default function LoginButton({ 
  variant = "desktop", 
  className = "" 
}: LoginButtonProps) {
  const isDesktop = variant === "desktop";
  
  const baseClasses = "flex items-center justify-center px-4 bg-variable-collection-botones rounded-lg overflow-hidden hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-variable-collection-link focus:ring-offset-2 focus:ring-offset-variable-collection-fondo";
  
  const sizeClasses = isDesktop 
    ? "w-[105px] h-[30px]" 
    : "w-[90px] h-[30px]";
  
  const textClasses = isDesktop
    ? "font-ubuntu font-bold text-white text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap"
    : "font-ubuntu font-bold text-white text-xs text-center tracking-[0] leading-[21px] whitespace-nowrap";

  return (
    <Link
      href="/auth/login"
      className={`${baseClasses} ${sizeClasses} ${className}`}
      aria-label="Iniciar Sesión"
    >
      <span className={textClasses}>
        Iniciar Sesión
      </span>
    </Link>
  );
}
