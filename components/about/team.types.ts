/**
 * Shared types for the about/team section.
 * Extracted into a plain module so they can be imported without pulling in
 * the "use client" TeamSection component.
 */

export type SocialLink = {
  icon: string;
  url: string;
  label: string;
};

export type TeamMember = {
  id: string;
  name: string;
  username?: string;
  role: string;
  tagline?: string;
  bio?: string;
  avatar?: string;
  socialLinks?: SocialLink[];
};

export type RoleGroup = "admin" | "lead_project" | "content_manager" | "user";

export const ROLE_LABELS: Record<RoleGroup, string> = {
  admin: "Administradores del Semillero",
  lead_project: "Líderes de proyectos",
  content_manager: "Content Managers",
  user: "Integrantes del semillero",
};

export const ROLE_SINGULAR_LABELS: Record<RoleGroup, string> = {
  admin: "Administrador",
  lead_project: "Líder de Proyecto",
  content_manager: "Content Manager",
  user: "Integrante",
};
