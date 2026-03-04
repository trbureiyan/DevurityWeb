import { NextRequest, NextResponse } from "next/server";
import { updateUserStatus } from "@/repositories/admin/users.repositories";
import { extractTokenFromCookies, validateAuthToken } from "@/lib/auth/utils";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Prevent self-deactivation
        const token = extractTokenFromCookies(request);
        if (!token) {
            return NextResponse.json({ error: "No autenticado" }, { status: 401 });
        }

        const decoded = await validateAuthToken(token);
        if (decoded.sub === id) {
            return NextResponse.json({ error: "No puedes desactivar tu propia cuenta" }, { status: 403 });
        }

        const { is_active } = await request.json();

        if (typeof is_active !== "boolean") {
            return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
        }

        const updatedUser = await updateUserStatus(id, is_active);
        return NextResponse.json({ message: "Estado actualizado", user: updatedUser });
    } catch (error) {
        console.error("Error updating user status:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
