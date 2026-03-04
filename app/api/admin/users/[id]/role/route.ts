import { NextRequest, NextResponse } from "next/server";
import { updateUserRole } from "@/repositories/admin/users.repositories";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { role } = body;

        if (!role) {
            return NextResponse.json({ error: "El rol es requerido" }, { status: 400 });
        }

        const updatedUser = await updateUserRole(id, role);
        return NextResponse.json({ message: "Rol actualizado exitosamente", user: updatedUser });
    } catch (error) {
        console.error("Error updating user role:", error);
        if (error instanceof Error && error.message === "Rol no encontrado") {
            return NextResponse.json({ error: error.message }, { status: 404 });
        }
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
