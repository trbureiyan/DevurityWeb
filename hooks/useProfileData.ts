"use client";

import { useState, useEffect } from "react";
import logger from "@/lib/logger";

interface ProjectData {
  title: string;
  link: string;
}

interface SocialLinkData {
  icon: string;
  url: string;
  label: string;
}

export interface UserData {
  id: string;
  name: string;
  last_name: string;
  email: string;
  skills: string[];
  role: string;
  motivation: string;
  semester: number;
  program?: string | null;
  username?: string;
  username_last_changed?: string;
  created_at?: string;
  createdAt?: string;
  joined_at?: string;
  joinedAt?: string;
  website?: string;
  github?: string;
  bio?: string;
  avatar?: string;
  avatar_url?: string;
  profile_image?: string;
  profileImage?: string;
  image?: string;
  photo?: string;
  working_on?: ProjectData[];
  social_links?: SocialLinkData[];
}

interface UseProfileDataResult {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  currentUserId: string | null;
  loading: boolean;
  error: string | null;
}

export function useProfileData(id: string): UseProfileDataResult {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const abortController = new AbortController();

    async function fetchUserData() {
      try {
        setLoading(true);
        setError(null);

        console.log("Cargando datos para ID:", id);

        // PRIMERO obtener el usuario autenticado
        try {
          const meResponse = await fetch("/api/auth/me", {
            signal: abortController.signal,
          });

          if (meResponse.ok) {
            const meData = await meResponse.json();
            setCurrentUserId(meData.user.id.toString());
            logger.debug("Usuario autenticado cargado", {
              userId: meData.user.id,
            });
          } else {
            logger.warn("No se pudo obtener usuario autenticado", {
              status: meResponse.status,
            });
          }
        } catch (err) {
          if (err instanceof Error && err.name === "AbortError") return;
          logger.error("Error obteniendo usuario autenticado", { error: err });
        }

        // DESPUÉS cargar el perfil
        const response = await fetch(`/api/auth/users/${id}`, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        logger.debug("Datos de perfil recibidos", { userId: id });

        // El API ahora retorna { user: {...} }
        const user = data.user || data;

        if (!abortController.signal.aborted) {
          setUserData(user);
          logger.debug("Perfil cargado correctamente", { userId: user.id });
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          logger.debug("Fetch de perfil cancelado");
          return;
        }

        logger.error("Error cargando datos del usuario", {
          error: err,
          userId: id,
        });
        if (!abortController.signal.aborted) {
          setError(err instanceof Error ? err.message : "Error desconocido");
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchUserData();

    return () => {
      abortController.abort();
    };
  }, [id]);

  return { userData, setUserData, currentUserId, loading, error };
}
