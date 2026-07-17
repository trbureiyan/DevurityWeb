import prisma from "../../lib/postgresDriver";

interface AttendanceFilters {
    dateFrom?: string;
    dateTo?: string;
    search?: string;
    program?: string;
}

function buildWhere(filters: AttendanceFilters) {
    const { dateFrom, dateTo, search, program } = filters;
    const where: Record<string, unknown> = {};

    if (dateFrom || dateTo) {
        where.attendance_date = {
            ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
            ...(dateTo ? { lte: new Date(dateTo + "T23:59:59.999Z") } : {}),
        };
    }

    const userFilter: Record<string, unknown> = {};

    if (search) {
        userFilter.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { last_name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
        ];
    }

    if (program) {
        userFilter.programs = { name: program };
    }

    if (Object.keys(userFilter).length > 0) {
        where.users = userFilter;
    }

    return where;
}

export async function getAttendancesPaginated(
    params: AttendanceFilters & { page: number; limit: number }
) {
    const { page, limit, ...filters } = params;
    const skip = (page - 1) * limit;
    const where = buildWhere(filters);

    const [attendances, total] = await Promise.all([
        prisma.attendances.findMany({
            where,
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        last_name: true,
                        email: true,
                        semester: true,
                        programs: { select: { name: true } },
                    },
                },
            },
            skip,
            take: limit,
            orderBy: { attendance_date: "desc" },
        }),
        prisma.attendances.count({ where }),
    ]);

    return {
        attendances: attendances.map((a) => ({
            id: a.id.toString(),
            attendance_date: a.attendance_date.toISOString(),
            user: a.users
                ? {
                      id: a.users.id.toString(),
                      name: a.users.name,
                      last_name: a.users.last_name,
                      email: a.users.email,
                      semester: a.users.semester,
                      program: a.users.programs?.name ?? null,
                  }
                : null,
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
}

export async function getAttendancesForExport(filters: AttendanceFilters) {
    const where = buildWhere(filters);

    const attendances = await prisma.attendances.findMany({
        where,
        include: {
            users: {
                select: {
                    id: true,
                    name: true,
                    last_name: true,
                    email: true,
                    semester: true,
                    programs: { select: { name: true } },
                },
            },
        },
        orderBy: { attendance_date: "desc" },
    });

    return attendances.map((a) => ({
        id: a.id.toString(),
        attendance_date: a.attendance_date.toISOString(),
        user: a.users
            ? {
                  id: a.users.id.toString(),
                  name: a.users.name,
                  last_name: a.users.last_name,
                  email: a.users.email,
                  semester: a.users.semester,
                  program: a.users.programs?.name ?? null,
              }
            : null,
    }));
}
