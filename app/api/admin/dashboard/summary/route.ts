import { NextResponse } from "next/server";
import prisma from "@/lib/postgresDriver";
// import { getUpdatesFeed } from "@/lib/data/updates";
// import { getProjectsCatalog } from "@/lib/data/projects";
// import type { ProjectItem } from "@/lib/data/projects";

export async function GET() {
  try {
    // Calcula el rango de tiempo para las asistencias de hoy
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfToday.getDate() + 1);
    
    // Ejecuta en paralelo los conteos necesarios para el dashboard
    const [
      totalUsers,
      activeUsers,
      attendanceRecordsToday,
      // updatesFeed,
      // projectsCatalog,
    ] = await Promise.all([
      prisma.users.count(),
      prisma.users.count({ where: { is_active: true } }),
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
        },
      }),
      // getUpdatesFeed(),
      // getProjectsCatalog(),
    ]);

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

    // TODO: Implementar consulta de proyectos
    // const catalogProjects =
    //   Array.isArray(projectsCatalog)
    //     ? projectsCatalog
    //     : ((projectsCatalog as { projects?: ProjectItem[] }).projects ?? []);
    const projectsCount = 0; // Placeholder

    // TODO: Implementar conteo de publicaciones vigentes en updates
    // const eventsCount = updatesFeed.filter(Boolean).length;
    const eventsCount = 0; // Placeholder

    return NextResponse.json({
      stats: {
        totalUsers,
        activeUsers,
        attendanceToday,
        eventsCount,
        projectsCount,
      },
    });
  } catch (error) {
    console.error("Error fetching admin dashboard summary", error);
    return NextResponse.json(
      { error: "No fue posible obtener las estadísticas." },
      { status: 500 },
    );
  }
}