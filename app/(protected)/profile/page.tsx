import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { validateToken } from "@/lib/jwt";
import prisma from "@/lib/postgresDriver";

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
      // Consulta directa a DB — sin self-fetch
      const user = await prisma.users.findUnique({
        where: { id: Number(userId) },
        select: { username: true },
      });
      userSlug = user?.username || userId;
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
