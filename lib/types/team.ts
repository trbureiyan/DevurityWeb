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
