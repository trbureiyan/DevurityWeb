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
  totalUsers: number | null;
  activeUsers: number | null;
  pendingUsers: number | null;
  attendanceToday: number | null;
  eventsCount: number | null;
  projectsCount: number | null;
  recentUsers: RecentUser[];
};

export async function getAdminDashboardStats(): Promise<DashboardStats> {
  const now = new Date();

  const startOfToday = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0, 0, 0
  ));

  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setUTCDate(startOfToday.getUTCDate() + 1);

  logger.debug("[Admin Dashboard] Rango asistencias", {
    from: startOfToday.toISOString(),
    to: startOfTomorrow.toISOString(),
  });

  let totalUsers: number | null = null;
  let activeUsers: number | null = null;
  let pendingUsers: number | null = null;
  let attendanceToday: number | null = null;
  let recentUsers: RecentUser[] = [];

  try {
    const [
      totalUsersResult,
      activeUsersResult,
      pendingUsersResult,
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
        select: { user_id: true },
      }),

      prisma.users.findMany({
        orderBy: { joined_at: "desc" },
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

    totalUsers = totalUsersResult;
    activeUsers = activeUsersResult;
    pendingUsers = pendingUsersResult;

    const uniqueUsers = new Set<string>();
    for (const record of attendanceRecordsToday) {
      if (record.user_id) uniqueUsers.add(record.user_id.toString());
    }
    attendanceToday = uniqueUsers.size;

    recentUsers = recentUsersData.map(user => ({
      id: user.id.toString(),
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      joined_at: user.joined_at ?? new Date(),
      is_active: user.is_active,
    }));

  } catch (error) {
    logger.error("[Admin Dashboard] Error usuarios/asistencias", error);
  }

  let eventsCount: number | null = null;
  try {
    eventsCount = await prisma.updates.count({
      where: {
        status: "published",
        published_at: { lte: new Date() },
      },
    });
  } catch (error) {
    logger.error("[Admin Dashboard] Error eventos", error);
  }

  let projectsCount: number | null = null;
  try {
    projectsCount = await prisma.projects.count({
      where: { is_archived: false },
    });
  } catch (error) {
    logger.error("[Admin Dashboard] Error proyectos", error);
  }

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