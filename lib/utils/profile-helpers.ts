/**
 * Profile utility functions
 * Extracted from app/(protected)/profile/[id]/page.tsx
 * 
 * @module profile-helpers
 */

import logger from "@/lib/logger";

/**
 * Project data structure for "working on" section
 */
export interface ProjectData {
  title: string;
  link: string;
}

/**
 * Social link data structure
 */
export interface SocialLinkData {
  label?: string;
  icon?: string;
  url: string;
}

/**
 * Allowed social platforms
 */
export const ALLOWED_PLATFORMS = [
  "github",
  "linkedin",
  "youtube",
  "twitter",
  "facebook",
  "instagram",
  "orcid",
  "bento.me",
  "linktree",
  "website",
] as const;

/**
 * Platform display names mapping
 */
export const PLATFORM_DISPLAY_MAP: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  twitter: "Twitter",
  facebook: "Facebook",
  instagram: "Instagram",
  orcid: "ORCID",
  "bento.me": "Bento.me",
  linktree: "Linktree",
  website: "Website",
};

/**
 * Maximum number of custom website links allowed
 */
export const MAX_CUSTOM_WEBSITES = 3;

/**
 * Blocked domain keywords for content filtering
 */
const BLOCKED_HOSTS = ["porn", "adult", "xxx", "sex", "nsfw"];

/**
 * Normalize platform name to lowercase match
 * 
 * @param platform - Platform identifier (can be null/undefined)
 * @returns Normalized platform name or "website" as fallback
 */
export function normalizePlatformName(platform?: string | null): string {
  if (!platform) return "website";
  const lowered = platform.trim().toLowerCase();
  const match = ALLOWED_PLATFORMS.find((p) => p === lowered);
  return match || "website";
}

/**
 * Get display label for a platform
 * 
 * @param platform - Platform identifier
 * @returns Display name for the platform
 */
export function getDisplayLabelForPlatform(platform: string): string {
  return PLATFORM_DISPLAY_MAP[platform] || PLATFORM_DISPLAY_MAP.website;
}

/**
 * Validate and normalize URL with security checks
 * 
 * @param url - Raw URL string
 * @param label - Label for error messages
 * @returns Normalized URL with protocol
 * @throws Error if URL is invalid or blocked
 */
export function validateAndNormalizeUrl(url: string, label: string): string {
  if (!url || url.trim().length === 0) {
    throw new Error(`URL vacía para ${label}`);
  }

  const trimmed = url.trim();

  // Bloquear strings sin dominio
  if (!trimmed.includes(".")) {
    throw new Error(
      `URL debe incluir un dominio válido para ${label}. Ej: midominio.com o https://midominio.com`
    );
  }

  // Rechazar caracteres no válidos
  if (/[^\w\d-._~:/?#\[\]@!$&'()*+,;=%]/.test(trimmed)) {
    throw new Error(`URL contiene caracteres no permitidos para ${label}`);
  }

  // Normalizar protocolo
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    // Validar construyendo URL
    const parsed = new URL(withProtocol);

    // Validar contra dominios bloqueados
    if (BLOCKED_HOSTS.some((bad) => parsed.hostname.toLowerCase().includes(bad))) {
      throw new Error("Este dominio no está permitido");
    }

    return parsed.toString();
  } catch {
    throw new Error(`URL inválida para ${label}`);
  }
}

/**
 * Normalize and validate social links array
 * Merges GitHub if provided separately
 * 
 * @param links - Array of social links
 * @param github - GitHub URL (optional, merged if not in links)
 * @returns Cleaned and validated social links array
 */
export function normalizeSocialLinks(
  links: SocialLinkData[],
  github: string
): SocialLinkData[] {
  const cleaned: SocialLinkData[] = [];
  let customWebsiteCount = 0;

  const merged = [...links];

  // Asegurar GitHub si viene aparte
  if (github) {
    const hasGithub = merged.some(
      (l) =>
        l.label?.toLowerCase() === "github" || l.icon?.toLowerCase() === "github"
    );
    if (!hasGithub) {
      merged.push({ label: "GitHub", icon: "github", url: github });
    }
  }

  for (const link of merged) {
    const rawUrl = link.url?.trim();
    if (!rawUrl) continue;

    const platform = normalizePlatformName(link.label || link.icon || "website");

    if (platform === "website") {
      customWebsiteCount += 1;
      if (customWebsiteCount > MAX_CUSTOM_WEBSITES) {
        logger.warn("Límite de links personalizados excedido", {
          limit: MAX_CUSTOM_WEBSITES,
          platform,
        });
        continue;
      }
    }

    try {
      const normalizedUrl = validateAndNormalizeUrl(
        rawUrl,
        platform === "website" ? "Website" : platform
      );

      cleaned.push({
        label: getDisplayLabelForPlatform(platform),
        icon: platform,
        url: normalizedUrl,
      });
    } catch (err) {
      logger.warn("Link social inválido omitido", {
        platform,
        url: rawUrl,
        error: err instanceof Error ? err.message : "URL inválida",
      });
      continue;
    }
  }

  return cleaned;
}

/**
 * Convert array of projects to "working on" text format
 * Format: "Project Title | https://link.com"
 * 
 * @param projects - Array of project objects
 * @returns Multi-line string with pipe-separated values
 */
export function workingOnArrayToText(projects: ProjectData[]): string {
  return projects.map((p) => `${p.title} | ${p.link}`).join("\n");
}

/**
 * Parse "working on" text field to array of projects
 * Format: "Project Title | https://link.com" (one per line)
 * 
 * @param text - Multi-line text with pipe-separated projects
 * @returns Array of project objects
 */
export function workingOnTextToArray(text: string): ProjectData[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const parts = line.split("|").map((p) => p.trim());
      return {
        title: parts[0] || "Nuevo Proyecto",
        link: parts[1] || "#",
      };
    });
}

/**
 * Get profile image URL from multiple possible fields
 * Handles legacy field names and fallbacks
 * 
 * @param user - User object with potential image fields
 * @returns Image URL or undefined if none found
 */
export function getProfileImage(
  user: {
    avatar_url?: string;
    profile_image?: string;
    profileImage?: string;
    image?: string;
    photo?: string;
    avatar?: string;
  } | null
): string | undefined {
  if (!user) return undefined;

  return (
    user.avatar_url ||
    user.profile_image ||
    user.profileImage ||
    user.image ||
    user.photo ||
    user.avatar
  );
}
