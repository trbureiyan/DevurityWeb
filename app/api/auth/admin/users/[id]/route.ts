import { NextRequest, NextResponse } from "next/server";
import {
  activateUser,
  deleteInactiveUser,
  findById,
} from "@/repositories/users/users.repositories";

// Helper function to serialize BigInt values
function serializeBigInt(obj: any): any {
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
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = serializeBigInt(value);
    }
    return result;
  }

  return obj;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "ID de usuario es requerido",
        },
        { status: 400 },
      );
    }

    const result = await activateUser(userId);

    if (result) {
      return NextResponse.json({
        success: true,
        message: "Usuario aprobado exitosamente",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error:
            "No se pudo aprobar el usuario. Puede que ya esté activo o no exista",
        },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error approving user:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor al aprobar el usuario",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "ID de usuario es requerido",
        },
        { status: 400 },
      );
    }

    const result = await deleteInactiveUser(userId);

    if (result) {
      return NextResponse.json({
        success: true,
        message: "Usuario rechazado y eliminado exitosamente",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error:
            "No se pudo rechazar el usuario. Puede que ya esté activo o no exista",
        },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error rejecting user:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor al rechazar el usuario",
      },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "ID de usuario es requerido",
        },
        { status: 400 },
      );
    }

    const user = await findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Usuario no encontrado",
        },
        { status: 404 },
      );
    }

    // Convertir todos los BigInt a string para serialización
    const serializedUser = serializeBigInt(user);

    return NextResponse.json({
      success: true,
      data: serializedUser,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor al obtener el usuario",
      },
      { status: 500 },
    );
  }
}
