"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface Slide {
  title: string;
  image: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const { login, isLoading } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();

  // Obtener redirect URL desde query params o usar la sugerida por backend
  const redirectFromParam = searchParams.get("redirect");

  useEffect(() => {
    // Ocultar elementos con type casting
    const header = document.querySelector(
      'header, [class*="header"], nav',
    ) as HTMLElement | null;
    const footer = document.querySelector(
      'footer, [class*="footer"]',
    ) as HTMLElement | null;

    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";

    // Limpiar al desmontar
    return () => {
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);

  const slides: Slide[] = [
    {
      title: "TRAZANDO HORIZONTES DIGITALES",
      image: "/images/login/slide1.jpeg",
    },
    {
      title: "INNOVACIÓN Y TECNOLOGÍA",
      image: "/images/login/slide2.jpeg",
    },
    {
      title: "DESARROLLANDO EL FUTURO",
      image: "/images/login/a.jpeg",
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar email
    if (!email.trim()) {
      newErrors.email = "El email o usuario es requerido";
    } else if (email.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Email inválido";
      }
    }

    // Validar contraseña
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

      // Redirigir según prioridad:
      // 1. Redirect desde query param (intento original)
      // 2. Redirect sugerido por backend (basado en rol)
      // 3. Por defecto a profile
      const redirectTo = redirectFromParam || result.redirectTo || "/profile";
      router.push(redirectTo);
    } catch (error) {
      if (error instanceof Error) {
        setShowErrorModal(true);
      } else {
        setShowErrorModal(true);
      }
      setIsSubmitting(false);
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl bg-[#1A1616] rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid lg:grid-cols-2">
          {/* Panel Izquierdo - Carrusel */}
          <div className="relative min-h-[500px] lg:min-h-[600px] overflow-hidden">
            {/* Logo y botón volver */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-8 h-8 rounded">
                  <Image
                    src="/images/login/Logo WoBg.png"
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
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-ubuntu rounded-full transition-all duration-300"
              >
                Volver al sitio
              </Link>
            </div>

            {/* Carrusel de imágenes */}
            <div className="relative w-full h-full">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {/* Imagen de fondo */}
                  <div className="absolute inset-0">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>

                  {/* Overlay oscuro para mejor legibilidad */}
                  <div className="absolute inset-0 bg-black/30"></div>

                  {/* Título del slide en dos líneas */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-8">
                      <h1 className="font-ubuntu font-bold text-3xl md:text-4xl lg:text-5xl mb-2 tracking-wide">
                        TRAZANDO HORIZONTES
                      </h1>
                      <h2 className="font-ubuntu font-bold text-3xl md:text-4xl lg:text-5xl tracking-wide">
                        DIGITALES
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controles del carrusel */}
            <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Panel Derecho - Formulario con contenedor */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#1A1616]">
            <div className="max-w-md mx-auto w-full">
              {/* Contenedor del formulario */}
              <div className="bg-[#2A2525] rounded-2xl p-8 md:p-10 border border-white/10 shadow-2xl">
                <h1 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-3 text-center">
                  Iniciar Sesión
                </h1>

                <p className="font-ubuntu text-white/70 mb-8 text-center">
                  Aún no tienes cuenta?{" "}
                  <Link
                    href="/auth/register"
                    className="text-red-500 hover:underline font-semibold"
                  >
                    Regístrate Aquí
                  </Link>
                </p>

                {redirectFromParam && (
                  <p className="text-sm text-gray-400 mb-4 text-center">
                    Redirigiendo a: {redirectFromParam}
                  </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Email/Usuario */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-ubuntu text-white mb-3 text-lg"
                    >
                      Email/Usuario
                    </label>
                    <input
                      id="email"
                      type="text"
                      placeholder="Ingresa tu email o usuario"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email)
                          setErrors({ ...errors, email: undefined });
                      }}
                      autoComplete="email"
                      className={`w-full bg-[#1A1616] text-white font-ubuntu px-5 py-4 rounded-lg border ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/10 focus:ring-red-500"
                      } focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-white/40`}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        className="mt-2 text-red-400 text-sm font-ubuntu"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block font-ubuntu text-white mb-3 text-lg"
                    >
                      Contraseña
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password)
                            setErrors({ ...errors, password: undefined });
                        }}
                        autoComplete="current-password"
                        className={`w-full bg-[#1A1616] text-white font-ubuntu px-5 py-4 rounded-lg border ${
                          errors.password
                            ? "border-red-500 focus:ring-red-500"
                            : "border-white/10 focus:ring-red-500"
                        } focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-white/40`}
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
                          showPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"
                        }
                      >
                        {showPassword ? (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
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
                    {errors.password && (
                      <p
                        id="password-error"
                        className="mt-2 text-red-400 text-sm font-ubuntu"
                      >
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Olvidé mi contraseña */}
                  <div className="text-right">
                    <Link
                      href="/forgot-password"
                      className="text-red-500 hover:underline text-sm font-ubuntu"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  {/* Botón de iniciar sesión */}
                  <button
                    type="submit"
                    disabled={isLoading || isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-ubuntu font-bold py-4 rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-lg"
                  >
                    {isLoading || isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Iniciando...
                      </>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal de Error */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1f1a1a] rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Error de Login
            </h3>
            <p className="text-gray-300 mb-6">
              Credenciales incorrectas o cuenta pendiente de aprobación.
              Verifica tus datos e intenta nuevamente.
            </p>
            <button
              onClick={handleCloseErrorModal}
              className="bg-[#CA2B26] hover:bg-[#a82320] text-white px-8 py-3 rounded-lg font-medium transition-colors w-full"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
