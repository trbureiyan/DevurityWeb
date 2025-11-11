import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { validateToken } from "@/lib/jwt";

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
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        const response = await fetch(`${baseUrl}/api/auth/users/${userId}`, {
          headers: {
            cookie: `auth_token=${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          userSlug = data.user?.username || userId;
        } else {
          userSlug = userId;
        }
      } catch {
        userSlug = userId;
      }
    }
  } catch (error) {
    console.error("Error validating token in profile page:", error);
  }

  if (userSlug) {
    redirect(`/profile/${userSlug}`);
  }

  redirect("/auth/login");
}
