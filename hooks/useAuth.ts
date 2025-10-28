"use client";
import { useState, useEffect, useCallback } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  role: string;
  isActive: boolean;
}

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

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
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
      if (refreshInterval) {
        clearInterval(refreshInterval);
        setRefreshInterval(null);
      }

      // Actualizar estado local
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error("Error en logout:", error);
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, [refreshInterval]);

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
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
      console.error("Error renovando token:", error);
      logout();
    }
  }, [logout]);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me");

      if (response.ok) {
        const data = await response.json();
        setAuthState({
          user: data.user,
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
      console.error("Error verificando autenticación:", error);
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

    return {
      success: true,
      redirectTo: data.redirectTo,
      user: data.user,
    };
  };

  // Configurar refresh automático cuando el usuario está autenticado
  useEffect(() => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }

    if (authState.isAuthenticated && authState.user) {
      // Renovar token cada 3.5 horas (antes de que expire a las 4 horas)
      const interval = setInterval(refreshToken, 3.5 * 60 * 60 * 1000);
      setRefreshInterval(interval);
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [
    authState.isAuthenticated,
    authState.user,
    refreshToken,
    refreshInterval,
  ]);

  // Verificar autenticación solo una vez al montar el componente
  useEffect(() => {
    if (!hasCheckedAuth) {
      checkAuth();
    }
  }, [checkAuth, hasCheckedAuth]);

  return {
    ...authState,
    login,
    logout,
    checkAuth,
  };
}
