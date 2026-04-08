import { NextRequest, NextResponse } from "next/server";
import { findInactiveUsersWithPagination } from "@/repositories/users/users.repositories";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // If userId is provided, return single user
    if (userId) {
      const result = await findInactiveUsersWithPagination(1, 1000); // Get all inactive users
      const user = result.users.find((u: { id: unknown }) => u.id === userId);

      if (!user) {
        return NextResponse.json(
          {
            success: false,
            error: "Usuario no encontrado o ya está activo",
          },
          { status: 404 },
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          users: [serializeBigInt(user)],
          total: 1,
          page: 1,
          limit: 1,
          totalPages: 1,
        },
      });
    }

    // Otherwise return paginated list
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    // Validar parámetros
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Parámetros de paginación inválidos. Page debe ser >= 1 y limit entre 1 y 100",
        },
        { status: 400 },
      );
    }

    const result = await findInactiveUsersWithPagination(page, limit);

    // Serialize all BigInt values recursively to avoid JSON serialization errors
    const serializedResult = serializeBigInt(result);

    return NextResponse.json({
      success: true,
      data: serializedResult,
    });
  } catch (error) {
    console.error("Error fetching pending users:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor al obtener usuarios pendientes",
      },
      { status: 500 },
    );
  }
}

// Helper function to recursively serialize BigInt values to strings
function serializeBigInt(obj: unknown): unknown {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === "bigint") {
    return obj.toString();
  }

  if (Array.isArray(obj)) {
    return obj.map(serializeBigInt);
  }

  if (typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = serializeBigInt(value);
    }
    return result;
  }

  return obj;
}
