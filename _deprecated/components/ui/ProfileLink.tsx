import Link from "next/link";

interface ProfileLinkProps {
  userId?: string;
  username?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Componente helper para links de perfil que prefiere username sobre ID
 * Acepta username con o sin @, genera la URL correcta
 * Uso: <ProfileLink userId="123" username="trbureiyan">Ver perfil</ProfileLink>
 */
export default function ProfileLink({ userId, username, children, className }: ProfileLinkProps) {
  let href = `/profile/${userId}`;
  
  if (username) {
    // Limpiar @ si está presente y construir la URL
    const cleanUsername = username.startsWith('@') ? username.slice(1) : username;
    href = `/profile/${cleanUsername}`;
  }
  
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
