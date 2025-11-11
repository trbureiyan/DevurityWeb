import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/jwt";
import { findByIdWithRole } from "@/repositories/users/users.repositories";
import logger from "@/lib/logger";

// Cache en memoria (process-local)
type CacheEntry = { value: any; expiresAt: number };

const ME_CACHE: Map<string, CacheEntry> =
  (global as any).__meCache || new Map();

(global as any).__meCache = ME_CACHE;

const ME_CACHE_TTL = 30 * 1000; // 30s

export async function GET(request: NextRequest) {
  try {
    logger.debug("API /me: iniciando verificación de autenticación");

    const token = request.cookies.get("auth_token")?.value;
    logger.debug("API /me: token presente", { hasToken: !!token });

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const decoded = (await validateToken(token)) as { sub: string };
    logger.debug("API /me: token validado", { userId: decoded.sub });

    const cacheKey = `user:${decoded.sub}`;
    const cached = ME_CACHE.get(cacheKey);

    let user;

    if (cached && cached.expiresAt > Date.now()) {
      user = cached.value;
      logger.debug("API /me: usando cache en memoria", { userId: decoded.sub });
    } else {
      user = await findByIdWithRole(decoded.sub);

      if (user) {
        ME_CACHE.set(cacheKey, {
          value: user,
          expiresAt: Date.now() + ME_CACHE_TTL,
        });
      }
    }

    if (!user) {
      logger.debug("API /me: usuario no encontrado", { userId: decoded.sub });
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    if (!user.is_active) {
      logger.debug("API /me: usuario inactivo", { userId: user.id });
      return NextResponse.json({ error: "Cuenta inactiva" }, { status: 403 });
    }

    logger.debug("API /me: retornando datos del usuario", { userId: user.id });

    return NextResponse.json(
      {
        user: {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          last_name: user.last_name,
          role: user.roles.name,
          is_active: user.is_active,
        },
      },
      {
        headers: {
          "Cache-Control": "private, max-age=30, stale-while-revalidate=60",
        },
      },
    );
  } catch (error) {
    logger.error("API /me: error obteniendo datos del usuario", error);

    if (
      error instanceof Error &&
      (error.message.includes("invalid signature") ||
        error.message.includes("jwt expired") ||
        error.message.includes("jwt malformed"))
    ) {
      return NextResponse.json(
        { error: "Token inválido o expirado" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
