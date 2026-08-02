"use client";
import { useState, useMemo, useEffect } from "react";
import { m, LazyMotion, domAnimation, useReducedMotion } from "framer-motion";
import TeamMemberCard from "./TeamMemberCard";

import type { TeamMember, RoleGroup } from "./team.types";
import { ROLE_LABELS, ROLE_SINGULAR_LABELS } from "./team.types";
import { groupTeamMembers, getPaginatedMembers, getTotalPages } from "@/lib/utils/teamUtils";

interface TeamSectionProps {
  members: TeamMember[];
}

/**
 * Renders team members grouped by role with accessible role tabs and pagination.
 * @param members Active team members to group and display.
 * @returns The team section, including role navigation, member cards, and pagination when needed.
 * Empty role groups are omitted and the first non-empty group is selected when the default is unavailable.
 */
export default function TeamSection({ members }: TeamSectionProps) {
  const [activeTab, setActiveTab] = useState<RoleGroup>("admin");
  const [page, setPage] = useState(1);
  const shouldReduceMotion = useReducedMotion();


  // Agrupar miembros por rol
  const groupedMembers = useMemo(() => groupTeamMembers(members), [members]);

  // When the active tab becomes empty (e.g. after data changes), fall back to
  // the first non-empty group and reset pagination to avoid a blank page.
  useEffect(() => {
    if (groupedMembers[activeTab].length === 0) {
      const firstNonEmpty = (Object.keys(groupedMembers) as RoleGroup[]).find(
        (key) => groupedMembers[key].length > 0
      );
      if (firstNonEmpty) {
        setActiveTab(firstNonEmpty);
        setPage(1);
      }
    }
  }, [activeTab, groupedMembers]);

  const activeMembers = groupedMembers[activeTab] || [];
  const totalPages = getTotalPages(activeMembers.length);
  const safePage = Math.max(1, Math.min(page, totalPages || 1));
  const currentMembers = getPaginatedMembers(activeMembers, safePage);

  const handleTabChange = (tab: RoleGroup) => {
    if (groupedMembers[tab].length === 0) return;

    if (tab !== activeTab) {
      setActiveTab(tab);
      setPage(1); // Reset page on tab change
    }
  };

  return (
    <section className="relative bg-black py-24 border-t border-zinc-900">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-bold tracking-wider mb-6">NUESTRO EQUIPO</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-1">
              <div className="w-12 h-1 bg-white"></div>
              <div className="w-12 h-1 bg-white"></div>
              <div className="w-12 h-1 bg-white"></div>
              <div className="w-6 h-1 bg-white/40"></div>
              <div className="w-6 h-1 bg-white/40"></div>
            </div>
          </div>
        </div>

        {/* Sliders Navigation */}
        <div className="flex flex-col items-center mb-16 space-y-8">
          <div
            className="flex flex-col md:flex-row gap-4 items-center justify-center w-full max-w-4xl mx-auto"
            role="tablist"
            aria-label="Roles del equipo"
          >
            {(Object.keys(ROLE_LABELS) as RoleGroup[]).map((roleKey) => {
              const isActive = activeTab === roleKey;
              const hasMembers = groupedMembers[roleKey].length > 0;

              return (
                <button
                  key={roleKey}
                  type="button"
                  disabled={!hasMembers}
                  className="group flex flex-1 cursor-pointer flex-col items-center border-0 bg-transparent p-0 disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() => handleTabChange(roleKey)}
                  role="tab"
                  id={`team-tab-${roleKey}`}
                  aria-selected={isActive}
                  aria-controls="team-members-panel"
                >
                  <span className={`text-2xl md:text-3xl font-bold mb-3 text-center transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    {ROLE_LABELS[roleKey]}
                  </span>
                  <div
                    className={`w-full rounded-full transition-all duration-300 ${
                      isActive
                        ? 'h-2 bg-[#ca2b26] opacity-100 shadow-[0_0_15px_rgba(202,43,38,0.5)]'
                        : 'h-1.5 bg-gray-600 opacity-40 group-hover:opacity-70 group-hover:bg-gray-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid and Animation Provider */}
        <LazyMotion features={domAnimation}>
          <div className="min-h-[400px]">
            <m.div
              key={activeTab + page}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={shouldReduceMotion ? { duration: 0.05 } : { duration: 0.3 }}
              role="tabpanel"
              id="team-members-panel"
              aria-labelledby={`team-tab-${activeTab}`}
            >
              {/* Role header con separador y contador */}
              {activeMembers.length > 0 && (
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="font-orbitron text-2xl md:text-3xl font-bold tracking-widest text-white uppercase">
                    {ROLE_SINGULAR_LABELS[activeTab]}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#ca2b26]/50 via-zinc-800 to-transparent"></div>
                  <span className="font-mono text-xs text-zinc-500 bg-zinc-900 px-3 py-1 rounded border border-zinc-800">
                    {activeMembers.length} {activeMembers.length === 1 ? 'integrante' : 'integrantes'}
                  </span>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {currentMembers.length > 0 ? (
                currentMembers.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    id={member.id}
                    name={member.name}
                    username={member.username}
                    role={ROLE_SINGULAR_LABELS[member.role as RoleGroup] || member.role}
                    bio={member.bio || "Miembro del equipo Devurity"}
                    avatar={member.avatar}
                    socialLinks={member.socialLinks}
                    tagline={member.tagline}
                    program={member.program}
                    semester={member.semester}
                  />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-400 py-12">
                  <p className="text-lg">No hay miembros disponibles en esta categoría.</p>
                </div>
              )}
              </div>
            </m.div>
          </div>
        </LazyMotion>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Anterior"
            >
              &larr;
            </button>
            <span className="text-gray-400 font-mono text-sm">
              {safePage} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Siguiente"
            >
              &rarr;
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
