import Image from "next/image";
import Link from "next/link";
import type { SocialLink } from "./team.types";
import { getInitials } from "@/lib/utils/getInitials";

interface TeamMemberCardProps {
  id: string;
  name: string;
  username?: string;
  role: string;
  tagline?: string;
  bio: string;
  avatar?: string;
  socialLinks?: SocialLink[];
  program?: string;
  semester?: number;
}

const SocialIcon = ({ icon }: { icon: string }) => {
  const iconClass = "w-5 h-5";

  switch (icon.toLowerCase()) {
    case "github":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "twitter":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      );
    case "website":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      );
  }
};

export default function TeamMemberCard({
  id,
  name,
  username,
  role,
  tagline,
  bio,
  avatar,
  socialLinks = [],
  program,
  semester,
}: TeamMemberCardProps) {
  const profileUrl = username ? `/profile/${username}` : `/profile/${id}`;

  return (
    <div className="group relative min-h-[340px]">
      <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/40 hover:shadow-[0_0_40px_rgba(178,4,3,0.12)]">
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-transparent via-transparent to-red-600/0 transition-all duration-500 group-hover:to-red-600/5" />

        <Link
          href={profileUrl}
          aria-label={`Ver perfil de ${name}, ${role}`}
          className="absolute inset-0 z-10 rounded-2xl"
        />

        <div className="relative z-0">
          <div className="mb-6 flex items-start gap-5">
            <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-inner transition-colors duration-300 group-hover:border-red-500/30">
              {avatar ? (
                <Image src={avatar} alt={`${name} avatar`} fill sizes="80px" className="object-cover" />
              ) : (
                <span className="font-orbitron text-2xl font-bold text-zinc-600 transition-colors duration-300 group-hover:text-red-500">
                  {getInitials(name)}
                </span>
              )}
            </div>

            <div className="space-y-1.5 overflow-hidden pt-1">
              <h4 className="truncate font-orbitron text-xl font-bold leading-tight tracking-wide text-zinc-100 transition-colors group-hover:text-white lg:text-2xl">
                {name}
              </h4>
              {username && <p className="truncate font-mono text-sm text-zinc-500">@{username}</p>}
            </div>
          </div>

          <div className="mb-5 h-px w-full bg-gradient-to-r from-zinc-800 via-zinc-800/40 to-transparent" />
          <p className="mb-6 min-h-[72px] line-clamp-3 text-base leading-relaxed text-zinc-400">{bio}</p>

          {tagline && (
            <div className="mb-6">
              <p className="mb-2 font-mono text-[10px] tracking-widest text-zinc-500">{"// TECH_STACK"}</p>
              <p className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 px-3 py-2.5 font-mono text-sm tracking-wide text-zinc-300">
                {tagline}
              </p>
            </div>
          )}
        </div>

        <div className="relative z-20 mt-auto flex items-center justify-between border-t border-zinc-800/50 pt-4">
          <div className="max-w-[70%] text-left">
            {program && <p className="truncate text-xs font-medium text-zinc-400" title={program}>{program}</p>}
            {semester && <p className="mt-0.5 font-mono text-xs text-zinc-500">{semester}° Semestre</p>}
          </div>

          <div className="relative z-20 flex items-center gap-2.5">
            {socialLinks.slice(0, 3).map((link) => (
              <a
                key={`${link.icon}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                aria-label={link.label}
                onClick={(event) => event.stopPropagation()}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-200 hover:bg-white hover:text-black"
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
