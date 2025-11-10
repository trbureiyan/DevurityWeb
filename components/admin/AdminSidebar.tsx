"use client";

import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ComponentType, SVGProps } from "react";
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftOnRectangleIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  FolderIcon,
  PencilSquareIcon,
  Squares2X2Icon,
  UserCircleIcon,
  UsersIcon,
  BoltIcon
} from "@heroicons/react/24/outline";

interface AdminSidebarProps {
  pathname: string;
  isMobileMenuOpen: boolean;
  onClose: () => void;
  onLogout: () => Promise<void> | void;
  user: { name: string; lastName?: string | null } | null;
  isLoading: boolean;
  initials: string;
}

type NavIcon = ComponentType<SVGProps<SVGSVGElement>>;

type MenuItem = {
  label: string;
  href: string;
  icon: NavIcon;
  isActive: (pathname: string) => boolean;
};

const menuItems: MenuItem[] = [
  {
    label: "Panel de control",
    href: "/admin",
    icon: Squares2X2Icon,
    isActive: (pathname) => pathname === "/admin",
  },
  {
    label: "Solicitudes de registro",
    href: "/admin/users/confirm",
    icon: ClipboardDocumentListIcon,
    isActive: (pathname) => pathname.startsWith("/admin/solicitudes"),
  },
  {
    label: "Proyectos",
    href: "/admin/projects",
    icon: FolderIcon,
    isActive: (pathname) =>
      pathname.startsWith("/admin/projects") || pathname.startsWith("/admin/proyectos"),
  },
  {
    label: "Eventos y noticias",
    href: "/admin/updates",
    icon: CalendarDaysIcon,
    isActive: (pathname) => pathname.startsWith("/admin/eventos"),
  },
  {
    label: "Perfiles",
    href: "/admin/users",
    icon: UsersIcon,
    isActive: (pathname) => pathname.startsWith("/admin/perfiles"),
  },
  {
    label: "Habilidades",
    href: "/admin/skills",
    icon: BoltIcon,
    isActive: (pathname) => pathname.startsWith("/admin/perfiles"),
  },
  {
    label: "Contenidos pagina",
    href: "/admin/contents",
    icon: DocumentTextIcon,
    isActive: (pathname) => pathname.startsWith("/admin/contenidos"),
  },
  {
    label: "Configuracion pagina",
    href: "/admin/settings",
    icon: AdjustmentsHorizontalIcon,
    isActive: (pathname) => pathname.startsWith("/admin/configuracion"),
  },
];

const bottomMenuItems: Array<{ label: string; href: string; icon: NavIcon }> = [
  { label: "Editar perfil", href: "/profile", icon: UserCircleIcon },
  { label: "Editar pag. proyecto", href: "/admin/editar-proyecto", icon: PencilSquareIcon },
];

export default function AdminSidebar({
  pathname,
  isMobileMenuOpen,
  onClose,
  onLogout,
  user,
  isLoading,
  initials,
}: AdminSidebarProps) {
  const handleNavigation = () => {
    onClose();
  };

  const handleLogoutClick = async () => {
    onClose();
    await onLogout();
  };

  return (
    <aside
      className={`w-[225px] bg-[#221b1b] border border-[rgba(140,140,140,0.2)] flex flex-col fixed top-6 left-6 h-[calc(100vh-48px)] z-50 transition-transform duration-300 lg:relative lg:top-0 lg:left-0 lg:h-auto lg:translate-x-0 shadow-[0px_0px_0px_1px_rgba(140,140,140,0.2)] rounded-lg ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="relative pb-14">
        <div className="h-[72px] relative overflow-hidden rounded-tl-lg rounded-tr-lg">
          <Image
            src="/images/landing/wave-background.jpg"
            alt="Cover"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute left-4 -bottom-6">
          <Avatar className="!size-24 !rounded-lg border-2 border-[#0c0103] bg-variable-collection-botones text-white shadow-lg">
            <AvatarFallback className="bg-variable-collection-botones text-white text-3xl font-semibold !rounded-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="mt-12 px-4 mb-6">
        <h2 className="text-[rgba(255,255,255,0.9)] font-semibold text-[24px] leading-[30px]">
          {isLoading ? "Cargando..." : user ? `${user.name} ${user.lastName ?? ""}`.trim() : "Usuario"}
        </h2>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const active = item.isActive(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavigation}
              className={`flex items-center gap-3 px-4 py-3 text-white font-semibold text-[16px] leading-[20px] relative transition-colors ${
                active
                  ? "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[#01754f] text-white"
                  : "hover:bg-[rgba(255,255,255,0.05)] text-white"
              }`}
            >
              <item.icon className="w-5 h-5" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[rgba(140,140,140,0.2)] mt-auto">
        {bottomMenuItems.map((item) => (
          <Link
        key={item.href}
        href={item.href}
        onClick={handleNavigation}
        className="flex items-center gap-2 px-4 py-3 text-white font-semibold text-[16px] leading-[20px] hover:bg-[rgba(255,255,255,0.05)] border-b border-[rgba(140,140,140,0.2)]"
          >
        <item.icon className="w-5 h-5" aria-hidden="true" />
        <span>{item.label}</span>
          </Link>
        ))}

        <Link
          href="/"
          onClick={handleNavigation}
          className="flex items-center gap-2 px-4 py-3 text-white font-semibold text-[16px] leading-[20px] hover:bg-[rgba(255,255,255,0.05)] border-b border-[rgba(140,140,140,0.2)]"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" aria-hidden="true" />
          <span>Salir al home</span>
        </Link>

        <button
          type="button"
          onClick={() => void handleLogoutClick()}
          className="w-full px-4 py-3 text-white font-semibold text-[16px] leading-[20px] text-left hover:bg-[rgba(255,255,255,0.05)] flex items-center gap-2"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" aria-hidden="true" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
