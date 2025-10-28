import { NextRequest, NextResponse } from "next/server";
import {
  activateUser,
  deleteInactiveUser,
} from "@/repositories/users/users.repositories";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;

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
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;

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
