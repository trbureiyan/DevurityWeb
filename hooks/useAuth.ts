"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import logger from "@/lib/logger";
import type { AuthUserDTO } from "@/lib/types/user.types";

// Re-export AuthUserDTO as User for backward compatibility
export type User = AuthUserDTO;

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface LoginResponse {
  success: boolean;
  redirectTo?: string;
  user?: User;
}

type AuthCheckResult =
  | { ok: true; data: { user: User } }
  | { ok: false; data: unknown };

type AuthGlobals = {
  __authPromise: Promise<AuthCheckResult> | null;
};

// se conserva entre renders y HMR para no duplicar llamadas simultaneas
const authGlobals = globalThis as typeof globalThis & AuthGlobals;
if (!authGlobals.__authPromise) authGlobals.__authPromise = null;

export function useAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  const logout = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Error al cerrar sesión");
      }

      // Limpiar intervalo de refresh
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }

      // Actualizar estado local
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      // Remove session flag
      try {
        localStorage.removeItem("has_session");
      } catch {
        /* ignore */
      }

      // Redirigir a login después de cerrar sesión
      router.push("/auth/login");
    } catch (error) {
      logger.error("Error en logout:", { error });
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      // Redirigir a login incluso en caso de error
      router.push("/auth/login");
    }
  }, [router]);

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAuthState({
          user: data.user,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        // Si el refresh falla, forzar logout
        logout();
      }
    } catch (error) {
      logger.error("Error renovando token:", { error });
      logout();
    }
  }, [logout]);

  const checkAuth = useCallback(async () => {
    try {
      // Quick check: if we know there's no session flag locally, skip the /me call
      let hasSession = true;
      try {
        hasSession = !!localStorage.getItem("has_session");
      } catch {
        // If localStorage isn't available, fall back to calling /me
        hasSession = true;
      }

      if (!hasSession) {
        setAuthState({ user: null, isLoading: false, isAuthenticated: false });
        setHasCheckedAuth(true);
        return;
      }

      // Deduplicate concurrent refresh calls using a global promise
      if (authGlobals.__authPromise) {
        const result = await authGlobals.__authPromise;
        if (result.ok) {
          setAuthState({ user: result.data.user, isLoading: false, isAuthenticated: true });
        } else {
          setAuthState({ user: null, isLoading: false, isAuthenticated: false });
        }
        setHasCheckedAuth(true);
        return;
      }

      // Refresh also replaces the HttpOnly cookie with the current DB role.
      authGlobals.__authPromise = (async (): Promise<AuthCheckResult> => {
        try {
          const resp = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
          });
          if (resp.ok) {
            const data = (await resp.json()) as { user: User };
            return { ok: true, data };
          }
          // Try to parse error body if any
          let errData = null;
          try {
            errData = await resp.json();
          } catch {
            /* ignore parse error */
          }
          return { ok: false, data: errData };
        } catch {
          return { ok: false, data: null };
        }
      })();

      try {
        const result = await authGlobals.__authPromise;
        if (result.ok) {
          setAuthState({ user: result.data.user, isLoading: false, isAuthenticated: true });
        } else {
          setAuthState({ user: null, isLoading: false, isAuthenticated: false });
        }
      } finally {
        authGlobals.__authPromise = null;
      }
    } catch (error) {
      logger.error("useAuth: Error verificando autenticación:", { error });
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } finally {
      setHasCheckedAuth(true);
    }
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<LoginResponse> => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error en login");
    }

    // Actualizar estado con datos del usuario
    setAuthState({
      user: data.user,
      isLoading: false,
      isAuthenticated: true,
    });

    // Set session flag so client knows we have a session
    try {
      localStorage.setItem("has_session", "1");
    } catch {
      /* ignore */
    }

    return {
      success: true,
      redirectTo: data.redirectTo,
      user: data.user,
    };
  };

  // Configurar refresh automático cuando el usuario está autenticado
  useEffect(() => {
    // Limpiar intervalo existente
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    if (authState.isAuthenticated && authState.user) {
      // Renovar token cada 3.5 horas (antes de que expire a las 4 horas)
      const interval = setInterval(refreshToken, 3.5 * 60 * 60 * 1000);
      refreshIntervalRef.current = interval;

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
          refreshIntervalRef.current = null;
        }
      };
    }
  }, [authState.isAuthenticated, authState.user, refreshToken]);

  useEffect(() => {
    if (!authState.isAuthenticated) return;

    const refreshOnFocus = () => {
      void refreshToken();
    };

    window.addEventListener("focus", refreshOnFocus);
    return () => window.removeEventListener("focus", refreshOnFocus);
  }, [authState.isAuthenticated, refreshToken]);

  // Verificar autenticación solo una vez al montar el componente
  useEffect(() => {
    if (!hasCheckedAuth) {
      checkAuth();
    }
  }, [checkAuth, hasCheckedAuth]);

  // Función para verificar si el usuario tiene un rol específico
  const hasRole = (role: string): boolean => {
    return authState.user?.role?.toLowerCase() === role.toLowerCase();
  };

  // Función para verificar si el usuario es admin
  const isAdmin = (): boolean => {
    return hasRole("admin") || hasRole("administrador");
  };

  return {
    ...authState,
    login,
    logout,
    checkAuth,
    hasRole,
    isAdmin,
  };
}
