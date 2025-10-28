"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCsrf } from "@/hooks/useCsrf";

interface Slide {
  title: string;
  image: string;
}

interface FormErrors {
  name?: string;
  lastname?: string;
  email?: string;
  general?: string;
}

export default function RegistroPage() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { fetchWithCsrf } = useCsrf();

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

    // Validar nombre
    if (!name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    // Validar apellidos
    if (!lastname.trim()) {
      newErrors.lastname = "Los apellidos son requeridos";
    } else if (lastname.trim().length < 2) {
      newErrors.lastname = "Los apellidos deben tener al menos 2 caracteres";
    }

    // Validar email
    if (!email.trim()) {
      newErrors.email = "El correo institucional es requerido";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Correo institucional inválido";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetchWithCsrf("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          lastname: lastname,
          email: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Manejar errores del backend
        if (data.error && data.field) {
          setErrors({
            [data.field === "nombre"
              ? "name"
              : data.field === "apellido"
                ? "lastname"
                : data.field === "correo"
                  ? "email"
                  : "general"]: data.message || "Error en el campo",
          });
        } else {
          setErrors({
            general:
              data.message ||
              "Error al crear la cuenta. Por favor, intenta nuevamente.",
          });
        }
        return;
      }

      // Registro exitoso
      console.log("Registro exitoso:", data);
      setIsSuccess(true);
      setErrors({
        general:
          "¡Registro exitoso! Verifica tu correo para completar el registro.",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      setErrors({
        general: "Error de conexión. Por favor, intenta nuevamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
                        ÚNETE A LA INNOVACIÓN
                      </h1>
                      <h2 className="font-ubuntu font-bold text-3xl md:text-4xl lg:text-5xl tracking-wide">
                        CREA TU CUENTA
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

          {/* Panel Derecho - Formulario de registro */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#1A1616]">
            <div className="max-w-md mx-auto w-full">
              {/* Contenedor del formulario */}
              <div className="bg-[#2A2525] rounded-2xl p-8 md:p-10 border border-white/10 shadow-2xl">
                <h1 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-3 text-center">
                  Registro
                </h1>

                <p className="font-ubuntu text-white/70 mb-8 text-center">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                    href="/auth/login"
                    className="text-red-500 hover:underline font-semibold"
                  >
                    Loguéate aquí
                  </Link>
                </p>

                {errors.general && (
                  <div
                    className={`mb-6 p-4 rounded-lg border ${
                      isSuccess
                        ? "bg-green-500/20 border-green-500/50"
                        : "bg-red-500/20 border-red-500/50"
                    }`}
                  >
                    <p
                      className={`text-sm font-ubuntu ${
                        isSuccess ? "text-green-300" : "text-red-300"
                      }`}
                    >
                      {errors.general}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Nombre y Apellidos en línea */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nombre */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-ubuntu text-white mb-3 text-sm"
                      >
                        Nombre
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Juan Camilo"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name)
                            setErrors({ ...errors, name: undefined });
                        }}
                        autoComplete="given-name"
                        className={`w-full bg-[#1A1616] text-white font-ubuntu px-4 py-3 rounded-lg border ${
                          errors.name
                            ? "border-red-500 focus:ring-red-500"
                            : "border-white/10 focus:ring-red-500"
                        } focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-white/40 text-sm`}
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          className="mt-2 text-red-400 text-xs font-ubuntu"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Apellidos */}
                    <div>
                      <label
                        htmlFor="lastname"
                        className="block font-ubuntu text-white mb-3 text-sm"
                      >
                        Apellidos
                      </label>
                      <input
                        id="lastname"
                        type="text"
                        placeholder="Apellidos"
                        value={lastname}
                        onChange={(e) => {
                          setLastname(e.target.value);
                          if (errors.lastname)
                            setErrors({ ...errors, lastname: undefined });
                        }}
                        autoComplete="family-name"
                        className={`w-full bg-[#1A1616] text-white font-ubuntu px-4 py-3 rounded-lg border ${
                          errors.lastname
                            ? "border-red-500 focus:ring-red-500"
                            : "border-white/10 focus:ring-red-500"
                        } focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-white/40 text-sm`}
                        aria-invalid={errors.lastname ? "true" : "false"}
                        aria-describedby={
                          errors.lastname ? "lastname-error" : undefined
                        }
                      />
                      {errors.lastname && (
                        <p
                          id="lastname-error"
                          className="mt-2 text-red-400 text-xs font-ubuntu"
                        >
                          {errors.lastname}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Correo Institucional */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-ubuntu text-white mb-3 text-sm"
                    >
                      Correo Institucional
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Correo Institucional"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email)
                          setErrors({ ...errors, email: undefined });
                      }}
                      autoComplete="email"
                      className={`w-full bg-[#1A1616] text-white font-ubuntu px-4 py-3 rounded-lg border ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/10 focus:ring-red-500"
                      } focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-white/40 text-sm`}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        className="mt-2 text-red-400 text-xs font-ubuntu"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Línea divisoria */}
                  <div className="border-t border-white/10 my-6"></div>

                  {/* Botón de registro */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-ubuntu font-bold py-4 rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-lg"
                  >
                    {isLoading ? (
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
                        Creando cuenta...
                      </>
                    ) : (
                      "Siguiente →"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
