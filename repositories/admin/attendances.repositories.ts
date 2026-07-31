import prisma from "../../lib/postgresDriver";
import { Prisma } from "../../lib/generated/prisma";

interface AttendanceFilters {
    dateFrom?: string;
    dateTo?: string;
    search?: string;
    program?: string;
}

// máximo de filas por exportación para evitar materializar todo el histórico en memoria
const MAX_EXPORT_ROWS = 1000;

function buildWhere(filters: AttendanceFilters): Prisma.attendancesWhereInput {
    const { dateFrom, dateTo, search, program } = filters;
    const where: Prisma.attendancesWhereInput = {};

    if (dateFrom || dateTo) {
        where.attendance_date = {
            ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
            ...(dateTo ? { lte: new Date(dateTo + "T23:59:59.999Z") } : {}),
        };
    }

    const userFilter: Prisma.usersWhereInput = {};

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

/**
 * Retorna asistencias paginadas aplicando filtros opcionales de fecha, búsqueda y programa.
 *
 * @param params - Filtros de búsqueda más `page` (≥ 1) y `limit` (1–100).
 * @returns Objeto con la lista de asistencias, total, página actual, límite y totalPages.
 * @throws Si la consulta a Prisma falla.
 */
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

/**
 * Retorna hasta MAX_EXPORT_ROWS asistencias para exportación.
 * Si hay más registros que el límite, `isTruncated` es `true`.
 *
 * @param filters - Filtros opcionales de fecha, búsqueda y programa.
 * @returns `{ data, isTruncated }` donde `data` es el listado serializado.
 * @throws Si la consulta a Prisma falla.
 */
export async function getAttendancesForExport(filters: AttendanceFilters) {
    const where = buildWhere(filters);

    // pedimos un registro extra para detectar truncamiento sin contar toda la tabla
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
        take: MAX_EXPORT_ROWS + 1,
    });

    const isTruncated = attendances.length > MAX_EXPORT_ROWS;
    const rows = isTruncated ? attendances.slice(0, MAX_EXPORT_ROWS) : attendances;

    return {
        data: rows.map((a) => ({
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
        isTruncated,
    };
}
