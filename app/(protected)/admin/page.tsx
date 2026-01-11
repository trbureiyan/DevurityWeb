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

// Resumen numérico que devuelve el endpoint de dashboard
type DashboardStats = {
  totalUsers: number;
  activeUsers: number;
  attendanceToday: number;
  eventsCount: number;
  projectsCount: number;
};

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

export default function AdminDashboard() {
  // Estados principales del panel
  const [stats, setStats] = React.useState<DashboardStats | null>(null);
  const [loadingStats, setLoadingStats] = React.useState(true);
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
    // Carga inicial de estadísticas
    refreshStats().catch((error) => {
      console.error("Error inicial al cargar estadísticas", error);
    });

    return () => {
      isMountedRef.current = false;
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

  // Tarjeta placeholder para accesos ocultos
  const QuickAccessPlaceholder = ({
    label,
    onRestore,
  }: {
    label: string;
    onRestore: () => void;
  }) => (
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

  // Resuelve el valor que se mostrará en cada tarjeta de estadística
  const renderStatValue = (value: number | null) => {
    if (loadingStats) {
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
  };

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
                {renderStatValue(stat.value)}
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

            <div className="flex flex-col items-center justify-center gap-6 px-6 py-16 text-center">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[rgba(255,255,255,0.1)]" />
                <div className="absolute inset-3 rounded-full border border-[rgba(202,43,38,0.3)]" />
                <span className="relative text-[15px] font-semibold text-[rgba(255,255,255,0.7)]">
                  Sin solicitudes en revisión
                </span>
              </div>
              <div className="space-y-3">
                <p className="text-[22px] font-semibold text-white">
                  No se registraron nuevas solicitudes en los últimos 90 días
                </p>
                <p className="text-[14px] text-[rgba(255,255,255,0.65)]">
                  Mantén habilitadas notificaciones para recibir alertas inmediatas cuando llegue un nuevo registro.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/admin/users/confirm"
                  className="inline-flex items-center gap-2 rounded-full border border-[#ca2b26] px-6 py-2 text-[15px] font-semibold text-[#fca5a5] transition-colors hover:bg-[rgba(202,43,38,0.15)]"
                >
                  Abrir gestor de solicitudes
                </Link>
                <Link
                  href="/admin/users/confirm"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Ajustar filtros
                </Link>
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          {/* Lista de actividad reciente */}
          <div className="rounded-2xl border border-[rgba(140,140,140,0.2)] bg-[#221b1b] p-5 shadow-[0px_0px_0px_1px_rgba(140,140,140,0.2)]">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-semibold text-white">Actividad reciente</h3>
              <span className="text-[12px] font-medium text-[rgba(255,255,255,0.6)]">Actualizado ahora</span>
            </div>
            <ul className="mt-5 space-y-5">
              {[
                {
                  title: "Nueva cuenta verificada",
                  description: "Julián Pérez completó el formulario de registro.",
                  time: "Hace 2 h",
                },
                {
                  title: "Actualización de proyecto",
                  description: "Se añadió documentación al proyecto Devurity Campus.",
                  time: "Hace 5 h",
                },
                {
                  title: "Evento próximo",
                  description: "Recordatorio para confirmar logística del meetup semestral.",
                  time: "Mañana",
                },
              ].map((item) => (
                <li key={item.title} className="relative pl-6 text-left">
                  <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#0a66c2]" />
                  <p className="text-[15px] font-semibold text-[rgba(255,255,255,0.9)]">
                    {item.title}
                  </p>
                  <p className="text-[13px] text-[rgba(255,255,255,0.65)]">{item.description}</p>
                  <span className="text-[12px] text-[rgba(255,255,255,0.5)]">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
