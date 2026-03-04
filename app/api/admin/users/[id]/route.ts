import { NextRequest, NextResponse } from "next/server";
import { deleteUserCompletely } from "@/repositories/admin/users.repositories";
import { extractTokenFromCookies, validateAuthToken } from "@/lib/auth/utils";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Prevent self-deletion
        const token = extractTokenFromCookies(request);
        if (!token) {
            return NextResponse.json({ error: "No autenticado" }, { status: 401 });
        }

        const decoded = await validateAuthToken(token);
        if (decoded.sub === id) {
            return NextResponse.json({ error: "No puedes eliminar tu propia cuenta" }, { status: 403 });
        }

        await deleteUserCompletely(id);
        return NextResponse.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: "Error interno del servidor al eliminar usuario" }, { status: 500 });
    }
}
