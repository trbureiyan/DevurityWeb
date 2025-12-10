import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { validateToken } from "@/lib/jwt";

// Página que redirige al perfil del usuario autenticado usando su username o ID

export default async function ProfileRedirectPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  let userSlug: string | null = null;

  try {
    const decoded = (await validateToken(token)) as { sub: string };
    const userId = decoded?.sub;
    
    if (userId) {
      // Intentar obtener el username del usuario
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/auth/users/${userId}`, {
          headers: {
            cookie: `auth_token=${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          userSlug = data.user?.username || userId;
        } else {
          userSlug = userId; // Fallback al ID
        }
      } catch {
        userSlug = userId; // Fallback al ID en caso de error
      }
    }
  } catch (error) {
    console.error("Error validating token in profile page:", error);
  }

  // redirect() está correctamente fuera del try/catch
  if (userSlug) {
    redirect(`/profile/${userSlug}`);
  } else {
    redirect("/auth/login");
  }
}
