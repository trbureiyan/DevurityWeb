"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Obtener redirect URL desde query params o usar la sugerida por backend
  const redirectFromParam = searchParams.get("redirect");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login(email, password);

      // Redirigir según prioridad:
      // 1. Redirect desde query param (intento original)
      // 2. Redirect sugerido por backend (basado en rol)
      // 3. Por defecto a profile
      const redirectTo = redirectFromParam || result.redirectTo || "/profile";
      router.push(redirectTo);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error desconocido en el login");
      }
    }
  };

  return (
    <div className="min-h-screen bg-variable-collection-fondo flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-orbitron text-4xl font-bold text-white mb-2">
            DEVURITY
          </h1>
          <h2 className="font-ubuntu text-xl text-variable-collection-link">
            Iniciar Sesión
          </h2>
          {redirectFromParam && (
            <p className="text-sm text-gray-400 mt-2">
              Redirigiendo a: {redirectFromParam}
            </p>
          )}
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email universitario
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full px-3 py-3 border border-variable-collection-placeholder bg-variable-collection-fondo text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-variable-collection-botones focus:border-transparent"
                placeholder="u20231111111@usco.edu.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full px-3 py-3 border border-variable-collection-placeholder bg-variable-collection-fondo text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-variable-collection-botones focus:border-transparent"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-variable-collection-botones hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-variable-collection-botones disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Iniciando sesión...
                </div>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
