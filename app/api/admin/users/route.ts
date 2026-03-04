import { NextRequest, NextResponse } from "next/server";
import { getAdminUsersPaginated } from "@/repositories/admin/users.repositories";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || undefined;
        const role = searchParams.get("role") || undefined;
        const status = searchParams.get("status") || undefined;
        const program = searchParams.get("program") || undefined;

        const result = await getAdminUsersPaginated({
            page: isNaN(page) ? 1 : page,
            limit: isNaN(limit) ? 10 : limit,
            search, role, status, program
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching admin users:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
