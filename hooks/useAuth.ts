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

type MeResult = { ok: true; data: { user: User } } | { ok: false };

export function useAuth() {
  const router = useRouter();

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Global promise to dedupe concurrent /api/auth/me calls (dev + prod safe)
  const globalAny = global as any;
  if (!globalAny.__mePromise) {
    globalAny.__mePromise = null as Promise<MeResult> | null;
  }

  /* =========================
   * Logout
   * ========================= */
  const logout = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        throw new Error("Error al cerrar sesión");
      }
    } catch (error) {
      logger.error("useAuth: error en logout", { error });
    } finally {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }

      try {
        localStorage.removeItem("has_session");
      } catch {
        /* ignore */
      }

      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });

      router.push("/auth/login");
    }
  }, [router]);

  /* =========================
   * Refresh token
   * ========================= */
  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/refresh", { method: "POST" });

      if (!response.ok) {
        logout();
        return;
      }

      const data = await response.json();
      setAuthState({
        user: data.user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      logger.error("useAuth: error renovando token", { error });
      logout();
    }
  }, [logout]);

  /* =========================
   * Check authentication
   * ========================= */
  const checkAuth = useCallback(async () => {
    try {
      // Fast-path: si sabemos que no hay sesión, no llamar /me
      let hasSession = true;
      try {
        hasSession = !!localStorage.getItem("has_session");
      } catch {
        hasSession = true;
      }

      if (!hasSession) {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }

      // Deduplicar llamadas concurrentes
      if (globalAny.__mePromise) {
        const result = await globalAny.__mePromise;
        if (result.ok) {
          setAuthState({
            user: result.data.user,
            isLoading: false,
            isAuthenticated: true,
          });
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
        return;
      }

      globalAny.__mePromise = (async (): Promise<MeResult> => {
        try {
          const resp = await fetch("/api/auth/me");
          if (!resp.ok) return { ok: false };
          const data = await resp.json();
          return { ok: true, data };
        } catch {
          return { ok: false };
        }
      })();

      const result = await globalAny.__mePromise;

      if (result.ok) {
        setAuthState({
          user: result.data.user,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      logger.error("useAuth: error verificando autenticación", { error });
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } finally {
      globalAny.__mePromise = null;
      setHasCheckedAuth(true);
    }
  }, []);

  /* =========================
   * Login
   * ========================= */
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

    try {
      localStorage.setItem("has_session", "1");
    } catch {
      /* ignore */
    }

    setAuthState({
      user: data.user,
      isLoading: false,
      isAuthenticated: true,
    });

    return {
      success: true,
      redirectTo: data.redirectTo,
      user: data.user,
    };
  };

  /* =========================
   * Auto refresh
   * ========================= */
  useEffect(() => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    if (authState.isAuthenticated && authState.user) {
      refreshIntervalRef.current = setInterval(
        refreshToken,
        3.5 * 60 * 60 * 1000,
      );
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [authState.isAuthenticated, authState.user, refreshToken]);

  /* =========================
   * Initial auth check
   * ========================= */
  useEffect(() => {
    if (!hasCheckedAuth) {
      checkAuth();
    }
  }, [checkAuth, hasCheckedAuth]);

  /* =========================
   * Helpers
   * ========================= */
  const hasRole = (role: string): boolean => {
    return authState.user?.role?.toLowerCase() === role.toLowerCase();
  };

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
