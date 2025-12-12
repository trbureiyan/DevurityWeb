import prisma from "@/lib/postgresDriver";
import logger from "@/lib/logger";

export type RecentUser = {
  id: string;
  name: string;
  last_name: string;
  email: string;
  joined_at: Date;
  is_active: boolean;
};

export type DashboardStats = {
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  attendanceToday: number;
  eventsCount: number;
  projectsCount: number;
  recentUsers: RecentUser[];
};

export async function getAdminDashboardStats(): Promise<DashboardStats> {
  // Calcula el rango de tiempo para las asistencias de hoy
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfToday.getDate() + 1);

  logger.debug("[Dashboard Stats] Buscando asistencias", {
    from: startOfToday.toISOString(),
    to: startOfTomorrow.toISOString(),
  });

  // Ejecuta en paralelo los conteos necesarios para el dashboard
  const [
    totalUsers,
    activeUsers,
    pendingUsers,
    attendanceRecordsToday,
    recentUsersData,
  ] = await Promise.all([
    prisma.users.count(),
    prisma.users.count({ where: { is_active: true } }),
    prisma.users.count({ where: { is_active: false } }),
    prisma.attendances.findMany({
      where: {
        attendance_date: {
          gte: startOfToday,
          lt: startOfTomorrow,
        },
      },
      select: {
        id: true,
        user_id: true,
        attendance_date: true,
      },
    }),
    prisma.users.findMany({
      orderBy: {
        joined_at: 'desc',
      },
      take: 5,
      select: {
        id: true,
        name: true,
        last_name: true,
        email: true,
        joined_at: true,
        is_active: true,
      },
    }),
  ]);

  logger.debug("[Dashboard Stats] Registros de asistencia encontrados", {
    count: attendanceRecordsToday.length,
  });

  // Cuenta usuarios únicos y registros sin usuario asociado
  const uniqueAttendanceUsers = new Set<string>();
  let attendanceWithoutUser = 0;

  for (const record of attendanceRecordsToday) {
    if (record.user_id) {
      uniqueAttendanceUsers.add(record.user_id.toString());
    } else {
      attendanceWithoutUser += 1;
    }
  }

  // Suma asistencias únicas con entradas anónimas
  const attendanceToday = uniqueAttendanceUsers.size + attendanceWithoutUser;
  
  logger.debug("[Dashboard Stats] Resumen de asistencias", {
    uniqueUsers: uniqueAttendanceUsers.size,
    withoutUser: attendanceWithoutUser,
    totalToday: attendanceToday,
  });

  // TODO: Implementar consulta de proyectos y eventos reales cuando estén disponibles en DB o CMS
  const projectsCount = 0; 
  const eventsCount = 0;

  // Convertir los usuarios recientes al formato esperado
  const recentUsers: RecentUser[] = recentUsersData.map((user) => ({
    id: user.id.toString(),
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    joined_at: user.joined_at ?? new Date(),
    is_active: user.is_active,
  }));

  return {
    totalUsers,
    activeUsers,
    pendingUsers,
    attendanceToday,
    eventsCount,
    projectsCount,
    recentUsers,
  };
}
