"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCsrf } from "@/hooks/useCsrf";
import { IMAGES } from "@/public/images";
import AuthCarousel, { type AuthSlide } from "@/components/auth/AuthCarousel";
import Button from "@/components/ui/Button";
import StatusModal from "@/components/ui/StatusModal";

// [DECISION] Definir slides en el ámbito de módulo previene recreación en cada render.
const REGISTER_SLIDES: readonly AuthSlide[] = [
  {
    title: "TRAZANDO HORIZONTES DIGITALES",
    image: IMAGES.login.slide0,
  },
  {
    title: "INNOVACIÓN Y TECNOLOGÍA",
    image: IMAGES.login.slide1,
  },
  {
    title: "DESARROLLANDO EL FUTURO",
    image: IMAGES.login.slide2,
  },
] as const;

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { fetchWithCsrf } = useCsrf();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    if (!lastname.trim()) {
      newErrors.lastname = "Los apellidos son requeridos";
    } else if (lastname.trim().length < 2) {
      newErrors.lastname = "Los apellidos deben tener al menos 2 caracteres";
    }

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
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetchWithCsrf("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          lastname: lastname.trim(),
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Ocurrió un error al procesar la solicitud.";
        if (response.status === 409) {
          errorMessage = "Ya existe un usuario registrado con este correo.";
        } else if (data && data.Error) {
          errorMessage = data.Error;
        }

        setModalMessage(errorMessage);
        setShowErrorModal(true);
        setIsSubmitting(false);
        return;
      }

      setModalMessage(
        "Se ha enviado un correo electrónico de verificación. Por favor revisa tu bandeja de entrada para continuar con el registro.",
      );
      setShowSuccessModal(true);
      setIsSubmitting(false);

      setName("");
      setLastname("");
      setEmail("");
    } catch {
      setModalMessage("Error de conexión. Por favor intenta nuevamente.");
      setShowErrorModal(true);
      setIsSubmitting(false);
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <main className="min-h-screen bg-[#171212] flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-6xl bg-[#1f1a1a] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <div className="grid lg:grid-cols-2">
          {/* Panel Izquierdo - Carrusel accesible con controles y logo */}
          <div className="relative min-h-[450px] lg:min-h-[600px] flex flex-col">
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

            <AuthCarousel slides={REGISTER_SLIDES} />
          </div>

          {/* Panel Derecho - Formulario de Registro */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#171212]">
            <div className="max-w-md mx-auto w-full">
              <div className="bg-[#1f1a1a] rounded-2xl p-8 md:p-10 border border-white/10 shadow-xl space-y-6">
                <div className="text-center space-y-2">
                  <h1 className="font-orbitron font-bold text-3xl text-white">
                    Solicitud de Registro
                  </h1>
                  <p className="font-ubuntu text-white/70 text-sm">
                    ¿Ya tienes cuenta?{" "}
                    <Link
                      href="/auth/login"
                      className="text-variable-collection-link hover:underline font-semibold"
                    >
                      Inicia Sesión
                    </Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Nombres */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block font-ubuntu text-white text-sm"
                    >
                      Nombres<span className="text-[#CA2B26]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Juan Andrés"
                      className={`w-full bg-[#171212] border ${
                        errors.name ? "border-red-500" : "border-white/10"
                      } rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-variable-collection-link transition-colors placeholder:text-white/30`}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-400 text-xs font-ubuntu">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Apellidos */}
                  <div className="space-y-2">
                    <label
                      htmlFor="lastname"
                      className="block font-ubuntu text-white text-sm"
                    >
                      Apellidos<span className="text-[#CA2B26]">*</span>
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      placeholder="Pérez Gómez"
                      className={`w-full bg-[#171212] border ${
                        errors.lastname ? "border-red-500" : "border-white/10"
                      } rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-variable-collection-link transition-colors placeholder:text-white/30`}
                      aria-invalid={errors.lastname ? "true" : "false"}
                      aria-describedby={errors.lastname ? "lastname-error" : undefined}
                    />
                    {errors.lastname && (
                      <p id="lastname-error" className="text-red-400 text-xs font-ubuntu">
                        {errors.lastname}
                      </p>
                    )}
                  </div>

                  {/* Correo institucional */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block font-ubuntu text-white text-sm"
                    >
                      Correo Institucional<span className="text-[#CA2B26]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="u20241234567@usco.edu.co"
                      className={`w-full bg-[#171212] border ${
                        errors.email ? "border-red-500" : "border-white/10"
                      } rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-variable-collection-link transition-colors placeholder:text-white/30`}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-400 text-xs font-ubuntu">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full mt-4"
                  >
                    Enviar Solicitud
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
        title="Error de Registro"
        message={modalMessage}
        actionLabel="Reintentar"
        onClose={handleCloseErrorModal}
      />

      <StatusModal
        open={showSuccessModal}
        variant="success"
        title="Solicitud Enviada"
        message={modalMessage}
        actionLabel="Entendido"
        onClose={handleCloseSuccessModal}
      />
    </main>
  );
}
