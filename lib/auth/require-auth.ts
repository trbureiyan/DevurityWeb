import { NextRequest } from "next/server";
import { validateToken } from "@/lib/jwt";

export async function requireAuth(
  req: NextRequest,
): Promise<{ userId: string } | null> {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) {
    return null;
  }

  try {
    const decoded = (await validateToken(token)) as { sub: string };

    if (!decoded.sub) {
      return null;
    }

    return { userId: decoded.sub };
  } catch (error) {
    console.error("Error validating token:", error);
    return null;
  }
}
