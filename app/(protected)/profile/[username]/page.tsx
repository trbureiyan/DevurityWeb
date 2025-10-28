"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ProfilePage() {
  const params = useParams()
  const username = params.username as string

  // Mock data - esto vendría de la base de datos
  const profileData = {
    name: "Brayan Toro Bustos",
    skills: ["Java", "PHP", "Python", "JavaScript", "React", "Figma", "MySQL", "Axios SQL", "MySQL"],
    workingOn: [
      { title: "Desarrollo de Aplicación Agrícola - MinAg", link: "#" },
      { title: "Security Web", link: "#" },
    ],
    socialLinks: [
      { icon: "discord", url: "https://discord.gg/2001-c875-d12x", label: "https://discord.gg/2001-c875-d12x" },
      { icon: "twitter", url: "#", label: "@mrsmalltowngram" },
      { icon: "instagram", url: "http://instagram.com/breyantoro", label: "http://instagram.com/breyantoro" },
    ],
  }

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="min-h-screen bg-variable-collection-fondo">
      {/* Profile Card Container */}
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-[#2A2520] rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative pt-12 pb-8 px-4 md:px-8 bg-[#2A2520]">
            {/* Chat Button */}
            <button
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center hover:bg-[#3A3A3A] transition-colors"
              aria-label="Enviar mensaje"
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>

            {/* Profile Photo */}
            <div className="flex justify-center mb-6">
              <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-white shadow-lg">
                <AvatarFallback className="bg-variable-collection-botones text-white text-4xl md:text-5xl font-orbitron font-bold">
                  {getInitial(profileData.name)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Name Only */}
            <div className="text-center">
              <h1 className="font-orbitron font-bold text-xl md:text-2xl text-white">{profileData.name}</h1>
            </div>
          </div>

          <div className="bg-[#1A1A1A] px-4 md:px-8 py-6 md:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Left Column - Skills & Working On */}
              <div className="space-y-6">
                {/* Skills / Lenguajes */}
                <div>
                  <h2 className="font-orbitron font-bold text-white text-base md:text-lg mb-3">Skills / Lenguajes</h2>
                  <p className="font-ubuntu text-sm text-[#CCCCCC] leading-relaxed">{profileData.skills.join(", ")}</p>
                </div>

                {/* Trabajando en */}
                <div>
                  <h2 className="font-orbitron font-bold text-white text-base md:text-lg mb-3">Trabajando en</h2>
                  <ul className="space-y-2">
                    {profileData.workingOn.map((project, index) => (
                      <li key={index}>
                        <Link
                          href={project.link}
                          className="font-ubuntu text-sm text-variable-collection-link hover:text-variable-collection-botones transition-colors flex items-start gap-2"
                        >
                          <span className="text-variable-collection-link">•</span>
                          <span>{project.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Social Links & QR Code */}
              <div className="space-y-6">
                {/* Social & Links */}
                <div>
                  <h2 className="font-orbitron font-bold text-white text-base md:text-lg mb-3">Social & Links</h2>
                  <div className="space-y-3">
                    {profileData.socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-[#CCCCCC] hover:text-white transition-colors group"
                      >
                        <div className="w-8 h-8 bg-[#2A2A2A] rounded-full flex items-center justify-center group-hover:bg-[#3A3A3A] transition-colors flex-shrink-0">
                          {social.icon === "discord" && (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                          )}
                          {social.icon === "twitter" && (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.244 2.25h3.308l-7.227 8.26l8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          )}
                          {social.icon === "instagram" && (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.771 1.691 4.919 4.919c.058 1.265.069 1.645.069 4.849c0 3.205-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919c-1.266.058-1.644.07-4.85.07c-3.204 0-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92c-.058-1.265-.07-1.644-.07-4.849c0-3.204.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919c1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072C2.695.272.273 2.69.073 7.052C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98c.059-1.28.073-1.689.073-4.948c0-3.259-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324a6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8a4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881a1.44 1.44 0 0 0 0-2.881z" />
                            </svg>
                          )}
                        </div>
                        <span className="font-ubuntu text-sm break-all">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Codigo QR */}
                <div>
                  <h2 className="font-orbitron font-bold text-white text-base md:text-lg mb-3">Codigo QR</h2>
                  <Button className="w-full bg-variable-collection-botones hover:bg-variable-collection-botones/90 text-white font-ubuntu font-bold rounded-lg h-11 md:h-12">
                    Ver Código QR
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
