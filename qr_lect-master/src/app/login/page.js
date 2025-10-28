"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleChange = (e) => {
    setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setError("");

    if (!formData.correo || !formData.password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();

      console.log("=== DEBUG LOGIN ===");
      console.log("Status de respuesta:", res.status);
      console.log("Respuesta completa:", json);
      console.log("Usuario:", json.usuario);
      console.log("Role:", json.usuario?.role);

      if (res.ok) {
        // Verificar que tengamos los datos del usuario
        if (!json.usuario) {
          console.error("Faltan datos en la respuesta");
          setError("Error en la respuesta del servidor");
          setLoading(false);
          return;
        }

        // Guardar datos del usuario en localStorage (sin QR estático)
        const userData = {
          usuario: json.usuario,
        };

        console.log("Guardando en localStorage:", userData);
        localStorage.setItem("userData", JSON.stringify(userData));

        // Verificar si el usuario es administrador
        const role = json.usuario.role;

        console.log("Verificando role:", role);
        console.log("Es ADMIN?", role === "ADMIN");

        if (role === "ADMIN") {
          console.log("→ Redirigiendo a /asistencias");
          setTimeout(() => {
            window.location.href = "/asistencias";
          }, 100);
        } else {
          console.log("→ Redirigiendo a /perfil");
          setTimeout(() => {
            window.location.href = "/perfil";
          }, 100);
        }
      } else {
        console.error("Error en login:", json.error);
        setError(json.error || "Credenciales incorrectas");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error de conexión. Intente nuevamente.");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-8 py-6">
            <h1 className="text-2xl font-semibold text-white text-center">
              Iniciar Sesión
            </h1>
            <p className="text-slate-300 text-sm text-center mt-2">
              Accede a tu cuenta del Semillero
            </p>
          </div>

          <div className="px-8 py-6">
            <div className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <div className="flex">
                    <svg
                      className="h-5 w-5 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="ml-3 text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Correo institucional
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    name="correo"
                    type="email"
                    value={formData.correo}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="u201912345@usco.edu.co"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    name="password"
                    type={mostrarPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none"
                  >
                    {mostrarPassword ? (
                      // Icono de ojo cerrado (ocultar)
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      // Icono de ojo abierto (mostrar)
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-slate-700 to-slate-900 text-white py-3 rounded-md font-medium hover:from-slate-800 hover:to-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verificando..." : "Iniciar sesión"}
              </button>

              <div className="text-center">
                <a
                  href="/registro"
                  className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
                >
                  ¿No tienes cuenta? Regístrate aquí
                </a>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 px-8 py-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">
              Semillero Devurity - Universidad Surcolombiana
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
