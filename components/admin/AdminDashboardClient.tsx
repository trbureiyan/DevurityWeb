"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowPathIcon,
  BoltIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  SquaresPlusIcon,
  UserGroupIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { DashboardStats } from "@/lib/data/admin";

// Configuración necesaria para cada tarjeta de estadísticas
type StatCard = {
  id: string;
  label: string;
  value: number | null;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor: string;
  iconBackground: string;
};

// Normaliza cantidades para la región
const numberFormatter = new Intl.NumberFormat("es-CO");

// Tarjeta placeholder para accesos ocultos.
// Extraído al nivel de módulo para evitar el antipatrón de "componente dentro de componente":
// si se definiera dentro de AdminDashboardClient, React crearía un tipo de componente nuevo
// en cada render del padre, forzando unmount + remount completo en cada actualización
// de estado — destruyendo animaciones y estado local del placeholder.
function QuickAccessPlaceholder({
  label,
  onRestore,
}: {
  label: string;
  onRestore: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-[rgba(140,140,140,0.3)] bg-[#1b1414] p-5 shadow-[0px_0px_0px_1px_rgba(140,140,140,0.1)]">
      <div>
        <p className="text-[15px] font-semibold text-[rgba(255,255,255,0.9)]">
          {label} oculto
        </p>
        <p className="text-[13px] text-[rgba(255,255,255,0.7)]">
          Recupera el acceso rápido cuando lo necesites.
        </p>
      </div>
      <button
        onClick={onRestore}
        className="inline-flex items-center gap-2 rounded-md bg-[#0a66c2] px-3 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#0a66c2]/90"
      >
        <ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
        Restaurar
      </button>
    </div>
  );
}

// Muestra el valor de una estadística con sus estados de carga y error.
// Extraído como componente propio en lugar de la función `renderStatValue` anterior:
// una función que retorna JSX y se llama como `{renderStatValue(x)}` es un componente
// disfrazado de función helper — no puede tener hooks, no aparece en DevTools y
// no se beneficia de la memoización de React. Declararla como componente es la forma
// idiomática y habilita optimizaciones futuras con React.memo si el grid crece.
function StatValue({ value, loading }: { value: number | null; loading: boolean }) {
  if (loading) {
    return <span className="h-8 w-20 animate-pulse rounded bg-white/10" />;
  }

  if (value === null || Number.isNaN(value)) {
    return <span className="text-[15px] text-[rgba(255,255,255,0.6)]">--</span>;
  }

  return (
    <span className="text-[30px] font-semibold tracking-tight text-white">
      {numberFormatter.format(value)}
    </span>
  );
}

interface AdminDashboardClientProps {
  initialStats: DashboardStats;
}

// Panel admin (cliente): muestra métricas agregadas, accesos rápidos y colas de aprobación usando datos iniciales + refrescos periódicos contra /api/admin/dashboard/summary.
export default function AdminDashboardClient({ initialStats }: AdminDashboardClientProps) {
  // Estados principales del panel
  const [stats, setStats] = React.useState<DashboardStats | null>(initialStats);
  const [loadingStats, setLoadingStats] = React.useState(false);
  const [statsError, setStatsError] = React.useState<string | null>(null);
  const [showAttendanceCard, setShowAttendanceCard] = React.useState(true);
  const [showSkillsCard, setShowSkillsCard] = React.useState(true);
  const isMountedRef = React.useRef(true);

  // Permite refrescar los datos desde la API administrativamente
  const refreshStats = React.useCallback(async () => {
    if (!isMountedRef.current) {
      return;
    }

    setLoadingStats(true);
    setStatsError(null);

    try {
      const response = await fetch("/api/admin/dashboard/summary", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("La API devolvió un estado inesperado");
      }

      const { stats: payload } = (await response.json()) as {
        stats: DashboardStats;
      };

      if (isMountedRef.current) {
        setStats(payload);
      }
    } catch (error) {
      console.error("Error loading dashboard stats", error);
      if (isMountedRef.current) {
        setStatsError("No se pudieron cargar las estadísticas. Intenta nuevamente.");
      }
    } finally {
      if (isMountedRef.current) {
        setLoadingStats(false);
      }
    }
  }, []);

  React.useEffect(() => {
    isMountedRef.current = true;
    // Auto-refresh cada 30 segundos mientras el componente esté montado
    const intervalId = setInterval(() => {
      refreshStats().catch((error) => {
        console.error("Error in auto-refresh", error);
      });
    }, 30000); // 30 segundos

    return () => {
      isMountedRef.current = false;
      clearInterval(intervalId);
    };
  }, [refreshStats]);

  // Mapea las estadísticas en tarjetas reutilizables
  const statCards: StatCard[] = React.useMemo(
    () => [
      {
        id: "total-users",
        label: "Personas registradas",
        value: stats?.totalUsers ?? null,
        description: stats
          ? `${numberFormatter.format(stats.activeUsers)} activas`
          : "Usuarios activos",
        icon: UserGroupIcon,
        iconColor: "text-[#60a5fa]",
        iconBackground: "bg-[rgba(96,165,250,0.12)]",
      },
      {
        id: "attendance-today",
        label: "Asistencias validadas hoy",
        value: stats?.attendanceToday ?? null,
        description: "Registros con QR dinámico",
        icon: ClipboardDocumentCheckIcon,
        iconColor: "text-[#34d399]",
        iconBackground: "bg-[rgba(52,211,153,0.12)]",
      },
      {
        id: "events",
        label: "Eventos publicados",
        value: stats?.eventsCount ?? null,
        description: "Fuente: módulo de updates",
        icon: CalendarDaysIcon,
        iconColor: "text-[#fcd34d]",
        iconBackground: "bg-[rgba(252,211,77,0.12)]",
      },
      {
        id: "projects",
        label: "Proyectos activos",
        value: stats?.projectsCount ?? null,
        description: "Catálogo interno",
        icon: SquaresPlusIcon,
        iconColor: "text-[#86efac]",
        iconBackground: "bg-[rgba(134,239,172,0.12)]",
      },
    ],
    [stats],
  );

  return (
    <div className="space-y-8 p-6">
      {/* Hero del panel con accesos directos principales */}
      <section className="relative overflow-hidden rounded-2xl border border-[rgba(140,140,140,0.2)] bg-gradient-to-r from-[#241c1c] via-[#1f1818] to-[#1a1313] p-6 md:p-8 shadow-[0px_0px_0px_1px_rgba(140,140,140,0.2)]">
        <div
          className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,rgba(10,102,194,0.15),transparent_60%)] blur-3xl"
          aria-hidden="true"
        />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-3">
            <p className="text-[13px] uppercase tracking-[0.18em] text-[rgba(255,255,255,0.6)]">
              Panel de administración
            </p>
            <h1 className="text-[28px] font-semibold tracking-tight text-[rgba(255,255,255,0.92)]">
              Da seguimiento a la comunidad y mantén el ritmo del proyecto
            </h1>
            <p className="text-[15px] text-[rgba(255,255,255,0.75)]">
              Gestiona contenidos, verifica solicitudes y coordina iniciativas desde un solo lugar
            </p>
          </div>
          <div className="grid w-full max-w-sm gap-3 sm:grid-cols-2">
            <Link
              href="/admin/attendances"
              className="flex items-center justify-between rounded-xl border border-[rgba(96,165,250,0.2)] bg-[rgba(96,165,250,0.08)] px-4 py-3 text-left text-[15px] font-semibold text-[#bfdbfe] transition-transform hover:-translate-y-0.5 hover:bg-[rgba(96,165,250,0.12)]"
            >
              Control asistencias
              <CalendarDaysIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/admin/skills"
              className="flex items-center justify-between rounded-xl border border-[rgba(1,117,79,0.25)] bg-[rgba(1,117,79,0.12)] px-4 py-3 text-left text-[15px] font-semibold text-[#bbf7d0] transition-transform hover:-translate-y-0.5 hover:bg-[rgba(1,117,79,0.2)]"
            >
              Habilidades
              <BoltIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tarjetas de estado general */}
      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[20px] font-semibold text-[rgba(255,255,255,0.9)]">
              Estado general
            </h2>
            <p className="text-[14px] text-[rgba(255,255,255,0.65)]">
              Revisa indicadores clave
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                refreshStats().catch((error) => {
                  console.error("Error refreshing dashboard stats", error);
                });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.2)] px-4 py-2 text-[14px] font-semibold text-[rgba(255,255,255,0.85)] transition-colors hover:bg-white/10"
            >
              Actualizar datos
              <ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        {statsError && (
          <p className="rounded-lg border border-[#ca2b26]/40 bg-[#ca2b26]/10 px-4 py-3 text-[14px] text-[#fca5a5]">
            {statsError}
          </p>
        )}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => (
            <article
              key={stat.id}
              className="relative overflow-hidden rounded-2xl border border-[rgba(140,140,140,0.2)] bg-[#221b1b] p-5 shadow-[0px_0px_0px_1px_rgba(140,140,140,0.15)] transition-transform hover:-translate-y-0.5"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />
              <div className="flex items-start justify-between gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconBackground}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} aria-hidden="true" />
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-[12px] font-semibold text-[rgba(255,255,255,0.75)]">
                  {stat.description}
                </span>
              </div>
              <div className="mt-6 space-y-1">
                <StatValue value={stat.value} loading={loadingStats} />
                <p className="text-[15px] text-[rgba(255,255,255,0.7)]">{stat.label}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

  {/* Configuración de accesos personalizados para asistencias y habilidades */}
      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[20px] font-semibold text-[rgba(255,255,255,0.9)]">
              Accesos rápidos
            </h2>
            <p className="text-[14px] text-[rgba(255,255,255,0.65)]">
              Controla qué avisos necesitas tener visibles según tus prioridades.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowAttendanceCard(true);
              setShowSkillsCard(true);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.2)] px-4 py-2 text-[14px] font-semibold text-[rgba(255,255,255,0.85)] transition-colors hover:bg-white/10"
          >
            Restaurar accesos
            <ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {showAttendanceCard ? (
            <div className="relative overflow-hidden rounded-2xl border border-[rgba(96,165,250,0.2)] bg-gradient-to-r from-[rgba(96,165,250,0.08)] to-[rgba(96,165,250,0.15)] p-5 shadow-[0px_10px_40px_rgba(96,165,250,0.1)]">
              <button
                onClick={() => setShowAttendanceCard(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[rgba(255,255,255,0.75)] transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Descartar acceso rápido a asistencias"
              >
                <XMarkIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="flex flex-col gap-5 pr-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(10,102,194,0.18)] text-[#bfdbfe]">
                    <CalendarDaysIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[12px] font-semibold text-[#bfdbfe]">
                      Escáner QR
                    </span>
                    <h3 className="text-[18px] font-semibold text-white">
                      Registrar asistencias con códigos dinámicos
                    </h3>
                    <p className="text-[14px] text-[rgba(255,255,255,0.85)]">
                      Activa el lector y valida la asistencia de manera segura durante tus actividades.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[14px] font-semibold">
                  <Link
                    href="/admin/attendances"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0a66c2] px-4 py-2 text-white transition-colors hover:bg-[#0a66c2]/90"
                  >
                    Abrir lector QR
                  </Link>
                  <Link
                    href="/help/faq"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[#bfdbfe] transition-colors hover:bg-white/10"
                  >
                    Ver instrucciones
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <QuickAccessPlaceholder
              label="Asistencias"
              onRestore={() => setShowAttendanceCard(true)}
            />
          )}

          {showSkillsCard ? (
            <div className="relative overflow-hidden rounded-2xl border border-[rgba(34,197,94,0.2)] bg-gradient-to-r from-[rgba(34,197,94,0.1)] to-[rgba(1,117,79,0.2)] p-5 shadow-[0px_10px_40px_rgba(1,117,79,0.1)]">
              <button
                onClick={() => setShowSkillsCard(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[rgba(255,255,255,0.75)] transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Descartar acceso rápido a habilidades"
              >
                <XMarkIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="flex flex-col gap-5 pr-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(1,117,79,0.2)] text-[#bbf7d0]">
                    <SquaresPlusIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[12px] font-semibold text-[#bbf7d0]">
                      Catálogo de habilidades
                    </span>
                    <h3 className="text-[18px] font-semibold text-white">
                      Actualizar habilidades disponibles
                    </h3>
                    <p className="text-[14px] text-[rgba(255,255,255,0.85)]">
                      Agrega, edita o elimina habilidades para mantener actualizado el formulario de registro.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[14px] font-semibold">
                  <Link
                    href="/admin/skills"
                    className="inline-flex items-center gap-2 rounded-full bg-[#01754f] px-4 py-2 text-white transition-colors hover:bg-[#01754f]/90"
                  >
                    Gestionar habilidades
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[#bbf7d0] transition-colors hover:bg-white/10"
                  >
                    Ver proyectos
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <QuickAccessPlaceholder
              label="Habilidades"
              onRestore={() => setShowSkillsCard(true)}
            />
          )}
        </div>
      </section>

      {/* Contenido adicional con gestión de usuarios y checklist */}
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-[rgba(140,140,140,0.2)] bg-[#221b1b] shadow-[0px_0px_0px_1px_rgba(140,140,140,0.2)]">
            <div className="flex flex-col gap-4 border-b border-[rgba(140,140,140,0.2)] p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3 text-[rgba(255,255,255,0.9)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(202,43,38,0.12)] text-[#fca5a5]">
                    <UsersIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-[20px] font-semibold">
                      Gestionar solicitudes recientes
                    </h2>
                    <p className="text-[14px] text-[rgba(255,255,255,0.65)]">
                      Monitoriza nuevos registros y decide quién obtiene acceso al panel.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-white/10">
                    Últimos 30 días
                  </button>
                  <Link
                    href="/admin/users/confirm"
                    className="inline-flex items-center gap-2 rounded-full bg-[#ca2b26] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#b52521]"
                  >
                    Revisar solicitudes
                  </Link>
                </div>
              </div>
              <Link
                href="/help/reglamentos"
                className="text-[14px] font-semibold text-[#fca5a5] transition-colors hover:text-[#f87171]"
              >
                Ver guía completa en el centro de ayuda
              </Link>
            </div>

            {loadingStats ? (
              <div className="flex flex-col items-center justify-center gap-6 px-6 py-16 text-center">
                <div className="animate-pulse space-y-4 w-full max-w-md">
                  <div className="h-32 w-32 mx-auto bg-white/10 rounded-full" />
                  <div className="h-6 bg-white/10 rounded w-3/4 mx-auto" />
                  <div className="h-4 bg-white/5 rounded w-full" />
                </div>
              </div>
            ) : stats && stats.pendingUsers > 0 ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(202,43,38,0.15)]">
                      <span className="text-[20px] font-bold text-[#fca5a5]">
                        {stats.pendingUsers}
                      </span>
                    </div>
                    <div>
                      <p className="text-[18px] font-semibold text-white">
                        {stats.pendingUsers} {stats.pendingUsers === 1 ? 'solicitud pendiente' : 'solicitudes pendientes'}
                      </p>
                      <p className="text-[13px] text-[rgba(255,255,255,0.6)]">
                        Usuarios esperando aprobación
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/admin/users/confirm"
                    className="inline-flex items-center gap-2 rounded-full bg-[#ca2b26] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#b52521]"
                  >
                    Revisar ahora
                  </Link>
                </div>
                
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {stats.recentUsers
                    .filter(user => !user.is_active)
                    .slice(0, 3)
                    .map((user) => {
                      const joinedDate = new Date(user.joined_at);
                      const timeAgo = (() => {
                        const now = new Date();
                        const diffMs = now.getTime() - joinedDate.getTime();
                        const diffMins = Math.floor(diffMs / 60000);
                        const diffHours = Math.floor(diffMs / 3600000);
                        const diffDays = Math.floor(diffMs / 86400000);
                        
                        if (diffMins < 60) return `Hace ${diffMins} min`;
                        if (diffHours < 24) return `Hace ${diffHours} h`;
                        if (diffDays < 7) return `Hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
                        return joinedDate.toLocaleDateString('es-CO', { month: 'short', day: 'numeric' });
                      })();

                      return (
                        <Link
                          key={user.id}
                          href={`/admin/users/confirm/${user.id}`}
                          className="group relative overflow-hidden rounded-xl border border-[rgba(202,43,38,0.2)] bg-[rgba(202,43,38,0.05)] p-4 transition-all hover:bg-[rgba(202,43,38,0.1)] hover:border-[rgba(202,43,38,0.3)]"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(202,43,38,0.2)] text-[#fca5a5] font-semibold">
                              {user.name.charAt(0)}{user.last_name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[14px] font-semibold text-white truncate group-hover:text-[#fca5a5] transition-colors">
                                {user.name} {user.last_name}
                              </p>
                              <p className="text-[12px] text-[rgba(255,255,255,0.6)] truncate">
                                {user.email}
                              </p>
                              <span className="text-[11px] text-[rgba(255,255,255,0.5)]">
                                {timeAgo}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </div>

                {stats.pendingUsers > 3 && (
                  <div className="mt-4 text-center">
                    <Link
                      href="/admin/users/confirm"
                      className="text-[14px] font-semibold text-[#fca5a5] hover:text-[#f87171] transition-colors"
                    >
                      Ver todas las {stats.pendingUsers} solicitudes pendientes →
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-6 px-6 py-16 text-center">
                <div className="relative flex h-32 w-32 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[rgba(255,255,255,0.1)]" />
                  <div className="absolute inset-3 rounded-full border border-[rgba(34,197,94,0.3)]" />
                  <span className="relative text-[15px] font-semibold text-[rgba(52,211,153,0.9)]">
                    ✓ Todo al día
                  </span>
                </div>
                <div className="space-y-3">
                  <p className="text-[22px] font-semibold text-white">
                    No hay solicitudes pendientes
                  </p>
                  <p className="text-[14px] text-[rgba(255,255,255,0.65)]">
                    Todos los registros han sido revisados y procesados.
                  </p>
                </div>
                <Link
                  href="/admin/users/confirm"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Ver historial completo
                </Link>
              </div>
            )}
          </div>
        </section>

        <aside className="space-y-6">
          {/* Lista de actividad reciente */}
          <div className="rounded-2xl border border-[rgba(140,140,140,0.2)] bg-[#221b1b] p-5 shadow-[0px_0px_0px_1px_rgba(140,140,140,0.2)]">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-semibold text-white">Últimos perfiles registrados</h3>
              <span className="text-[12px] font-medium text-[rgba(255,255,255,0.6)]">
                {loadingStats ? "Actualizando..." : "Actualizado ahora"}
              </span>
            </div>
            {loadingStats ? (
              <div className="mt-5 space-y-4">
                {["skeleton-recent-1", "skeleton-recent-2", "skeleton-recent-3"].map((id) => (
                  <div key={id} className="animate-pulse">
                    <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-white/5 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : stats?.recentUsers && stats.recentUsers.length > 0 ? (
              <ul className="mt-5 space-y-5">
                {stats.recentUsers.map((user) => {
                  const joinedDate = new Date(user.joined_at);
                  const now = new Date();
                  const diffMs = now.getTime() - joinedDate.getTime();
                  const diffMins = Math.floor(diffMs / 60000);
                  const diffHours = Math.floor(diffMs / 3600000);
                  const diffDays = Math.floor(diffMs / 86400000);
                  
                  let timeAgo = "Hace un momento";
                  if (diffMins < 60) {
                    timeAgo = `Hace ${diffMins} min`;
                  } else if (diffHours < 24) {
                    timeAgo = `Hace ${diffHours} h`;
                  } else if (diffDays < 7) {
                    timeAgo = `Hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
                  } else {
                    timeAgo = joinedDate.toLocaleDateString('es-CO', { 
                      month: 'short', 
                      day: 'numeric' 
                    });
                  }

                  return (
                    <li key={user.id} className="relative pl-6 text-left">
                      <span 
                        className={`absolute left-0 top-2 h-2 w-2 rounded-full ${
                          user.is_active ? 'bg-[#34d399]' : 'bg-[#fbbf24]'
                        }`} 
                      />
                      <p className="text-[15px] font-semibold text-[rgba(255,255,255,0.9)]">
                        {user.name} {user.last_name}
                      </p>
                      <p className="text-[13px] text-[rgba(255,255,255,0.65)]">
                        {user.email}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[12px] text-[rgba(255,255,255,0.5)]">
                          {timeAgo}
                        </span>
                        {user.is_active ? (
                          <span className="text-[11px] bg-[rgba(52,211,153,0.15)] text-[#34d399] px-2 py-0.5 rounded-full">
                            Activo
                          </span>
                        ) : (
                          <span className="text-[11px] bg-[rgba(251,191,36,0.15)] text-[#fbbf24] px-2 py-0.5 rounded-full">
                            Pendiente
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="mt-5 text-center py-8">
                <p className="text-[14px] text-[rgba(255,255,255,0.5)]">
                  No hay registros recientes
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
