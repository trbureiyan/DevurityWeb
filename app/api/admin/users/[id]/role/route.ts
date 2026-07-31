import { NextRequest, NextResponse } from "next/server";
import { updateUserRole } from "@/repositories/admin/users.repositories";
import { csrfAdapter } from "@/lib/csrf";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // el middleware ya verifica CSRF; este guard añade rechazo explícito si llega sin token
        const csrfHeader = request.headers.get("x-csrf-token");
        const csrfCookie = request.cookies.get("csrf_token")?.value;
        if (!csrfHeader || !csrfCookie || !csrfAdapter.validateToken(csrfHeader, csrfCookie)) {
            return NextResponse.json({ error: "Token CSRF requerido" }, { status: 403 });
        }

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
