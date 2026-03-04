import prisma from "../../lib/postgresDriver";

export async function getAdminUsersPaginated(params: {
    page: number;
    limit: number;
    search?: string;
    role?: string;
    status?: string;
    program?: string;
}) {
    const { page, limit, search, role, status, program } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { username: { contains: search, mode: "insensitive" } },
        ];
    }

    if (role) {
        where.roles = { name: role };
    }

    if (status !== undefined && status !== "") {
        where.is_active = status === "active" ? true : false;
    }

    if (program) {
        where.programs = { name: program };
    }

    const [users, total] = await Promise.all([
        prisma.users.findMany({
            where,
            include: {
                roles: { select: { id: true, name: true } },
                programs: { select: { id: true, name: true } },
            },
            skip,
            take: limit,
            orderBy: { id: "desc" },
        }),
        prisma.users.count({ where }),
    ]);

    return {
        users: users.map((user) => ({
            ...user,
            id: user.id.toString(),
            role_id: user.role_id.toString(),
            program_id: user.program_id?.toString() || null,
            roles: {
                id: user.roles.id.toString(),
                name: user.roles.name,
            },
            programs: user.programs ? {
                id: user.programs.id.toString(),
                name: user.programs.name,
            } : null,
            username_last_changed: user.username_last_changed?.toISOString() ?? null,
            joined_at: user.joined_at?.toISOString() ?? null,
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
}

export async function updateUserRole(userId: string, roleName: string) {
    const role = await prisma.roles.findUnique({ where: { name: roleName } });
    if (!role) throw new Error("Rol no encontrado");

    const updated = await prisma.users.update({
        where: { id: BigInt(userId) },
        data: { role_id: role.id },
        include: { roles: true }
    });

    return {
        ...updated,
        id: updated.id.toString(),
        role_id: updated.role_id.toString(),
        roles: {
            id: updated.roles.id.toString(),
            name: updated.roles.name
        }
    };
}

export async function updateUserStatus(userId: string, isActive: boolean) {
    const updated = await prisma.users.update({
        where: { id: BigInt(userId) },
        data: { is_active: isActive },
    });
    return { ...updated, id: updated.id.toString(), role_id: updated.role_id.toString() };
}

export async function deleteUserCompletely(userId: string) {
    await prisma.$transaction(async (tx) => {
        const id = BigInt(userId);
        await tx.user_skills.deleteMany({ where: { user_id: id } });
        await tx.user_platforms.deleteMany({ where: { user_id: id } });
        await tx.user_projects.deleteMany({ where: { user_id: id } });
        await tx.attendances.deleteMany({ where: { user_id: id } });
        await tx.users.delete({ where: { id } });
    });
    return true;
}
