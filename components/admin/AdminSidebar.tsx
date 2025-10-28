"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

interface AdminSidebarProps {
  user?: {
    name: string
    lastName?: string
    avatar?: string
  }
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { label: "Panel de control", href: "/admin" },
    { label: "Solicitudes de registro", href: "/admin/solicitudes" },
    { label: "Proyectos", href: "/admin/proyectos" },
    { label: "Eventos y noticias", href: "/admin/eventos" },
    { label: "Perfiles", href: "/admin/perfiles" },
    { label: "Contenidos pagina", href: "/admin/contenidos" },
    { label: "Configuracion pagina", href: "/admin/configuracion" },
  ]

  const bottomMenuItems = [
    { label: "Editar perfil", href: "/admin/editar-perfil", icon: "🟡" },
    { label: "Editar pag. proyecto", href: "/admin/editar-proyecto", icon: "" },
  ]

  return (
    <aside className="w-[200px] h-screen bg-[#1a1515] border-r border-[#b3b5b7] flex flex-col sticky top-0">
      {/* User Profile Section */}
      <div className="p-4 border-b border-[#b3b5b7]">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative w-[50px] h-[50px] rounded-lg overflow-hidden bg-white">
            <Image
              src="/images/logo/RoundyBIGLogoWBgOnly.png"
              alt="User Avatar"
              width={50}
              height={50}
              className="object-cover"
            />
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-tr-3xl" />
        </div>
        <h2 className="font-ubuntu font-bold text-white text-sm leading-tight">
          {user?.name || "Brayan Toro"}
          <br />
          {user?.lastName || "Bustos"}
        </h2>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`block font-ubuntu text-sm py-2 px-3 rounded transition-colors ${
                    isActive
                      ? "bg-variable-collection-selected text-white font-medium"
                      : "text-white/90 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-[#b3b5b7]">
        {/* Logout Button */}
        <button className="w-full font-ubuntu font-medium text-white text-sm py-3 px-4 text-left hover:bg-white/5 transition-colors border-b border-[#b3b5b7]">
          Salir
        </button>

        {/* Bottom Menu Items */}
        <ul className="py-2 px-2 space-y-1">
          {bottomMenuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-2 font-ubuntu text-xs py-2 px-3 text-white/90 hover:bg-white/5 rounded transition-colors"
              >
                {item.icon && <span className="text-xs">{item.icon}</span>}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
