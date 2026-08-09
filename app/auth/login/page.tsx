"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { IMAGES } from "@/public/images";
import AuthCarousel from "@/components/auth/AuthCarousel";
import { AUTH_SLIDES } from "@/components/auth/auth-slides";
import Button from "@/components/ui/Button";
import StatusModal from "@/components/ui/StatusModal";
import { getSafeInternalRedirect } from "@/lib/routing/public-routes";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#171212]" />}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(
    "Credenciales incorrectas o cuenta pendiente de aprobación. Verifica tus datos e intenta nuevamente.",
  );
  const { login, isLoading } = useAuthContext();

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectFromParam = getSafeInternalRedirect(searchParams.get("redirect"));

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "El email o usuario es requerido";
    } else if (email.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Email inválido";
      }
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await login(email, password);
      const redirectTo = redirectFromParam || result.redirectTo || "/profile";
      router.push(redirectTo);
    } catch (error) {
      const isNetworkError =
        error instanceof TypeError ||
        (error instanceof Error &&
          (error.message.toLowerCase().includes("fetch") ||
            error.message.toLowerCase().includes("network")));
      setModalMessage(
        isNetworkError
          ? "Error de conexión. Por favor verifica tu acceso a internet e intenta nuevamente."
          : "Credenciales incorrectas o cuenta pendiente de aprobación. Verifica tus datos e intenta nuevamente.",
      );
      setShowErrorModal(true);
      setIsSubmitting(false);
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <main className="min-h-screen bg-[#171212] flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-6xl bg-[#1f1a1a] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <div className="grid lg:grid-cols-2">
          {/* Panel Izquierdo - Carrusel accesible con controles y logo */}
          <div className="relative min-h-[450px] lg:min-h-[600px] flex flex-col">
            {/* Header del carrusel */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-8 h-8 rounded overflow-hidden">
                  <Image
                    src={IMAGES.login.logo}
                    alt="Devurity Logo"
                    width={32}
                    height={32}
                    className="bg-white/10 rounded"
                  />
                </div>
                <span className="font-orbitron font-bold text-white text-sm tracking-[3px]">
                  DEVURITY
                </span>
              </Link>

              <Link
                href="/"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-ubuntu rounded-full transition-all duration-300 border border-white/10"
              >
                Volver al sitio
              </Link>
            </div>

            <AuthCarousel slides={AUTH_SLIDES} />
          </div>

          {/* Panel Derecho - Formulario de Iniciar Sesión */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#171212]">
            <div className="max-w-md mx-auto w-full">
              <div className="bg-[#1f1a1a] rounded-2xl p-8 md:p-10 border border-white/10 shadow-xl space-y-6">
                <div className="text-center space-y-2">
                  <h1 className="font-orbitron font-bold text-3xl text-white">
                    Iniciar Sesión
                  </h1>
                  <p className="font-ubuntu text-white/70 text-sm">
                    ¿Aún no tienes cuenta?{" "}
                    <Link
                      href="/auth/register"
                      className="text-variable-collection-link hover:underline font-semibold"
                    >
                      Regístrate Aquí
                    </Link>
                  </p>
                </div>

                {redirectFromParam && (
                  <p className="text-xs text-white/50 text-center bg-white/5 py-2 px-3 rounded-lg border border-white/10">
                    Redirigiendo a: <span className="text-white">{redirectFromParam}</span>
                  </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Email/Usuario */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block font-ubuntu text-white text-sm"
                    >
                      Email o Usuario<span className="text-[#CA2B26]">*</span>
                    </label>
                    <input
                      id="email"
                      type="text"
                      autoComplete="username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu.usuario@usco.edu.co"
                      className={`w-full bg-[#171212] border ${
                        errors.email ? "border-red-500" : "border-white/10"
                      } rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-variable-collection-link transition-colors placeholder:text-white/30`}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="text-red-400 text-xs font-ubuntu">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Contraseña */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block font-ubuntu text-white text-sm"
                    >
                      Contraseña<span className="text-[#CA2B26]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full bg-[#171212] border ${
                          errors.password ? "border-red-500" : "border-white/10"
                        } rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-variable-collection-link transition-colors placeholder:text-white/30 pr-12`}
                        aria-invalid={errors.password ? "true" : "false"}
                        aria-describedby={
                          errors.password ? "password-error" : undefined
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                        aria-label={
                          showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                        }
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p id="password-error" role="alert" className="text-red-400 text-xs font-ubuntu">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <Link
                      href="/forgot-password"
                      className="text-variable-collection-link hover:underline text-xs font-ubuntu"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading || isSubmitting}
                    className="w-full"
                  >
                    Iniciar Sesión
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatusModal
        open={showErrorModal}
        variant="error"
        title="Error de inicio de sesión"
        message={modalMessage}
        actionLabel="Reintentar"
        onClose={handleCloseErrorModal}
      />
    </main>
  );
}