"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCsrf } from "@/hooks/useCsrf";
import { IMAGES } from "@/public/images";
import ProgramSelector from "@/components/ui/ProgramSelector";

// Types para las habilidades con id y nombre
interface Skill {
  id: number;
  name: string;
}

export default function ValidacionPage() {
  const [formData, setFormData] = useState({
    semester: "",
    motivation: "",
    program: "",
    skills: [] as string[],
    password: "",
    confirmPassword: "",
  });
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [originalFormData, setOriginalFormData] = useState({
    semester: "",
    motivation: "",
    program: "",
    skills: [] as string[],
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const { fetchWithCsrf, loading: csrfLoading } = useCsrf();

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

  // Validar token al cargar la página
  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = window.location.pathname.split("/").pop();
        const response = await fetch(`/api/auth/register/${token}`);
        const data = await response.json();

        if (!response.ok) {
          setTokenValid(false);
          if (response.status === 409) {
            setSubmissionError(
              "Este enlace de registro ya ha sido utilizado. Por favor solicita un nuevo enlace.",
            );
            setShowErrorModal(true);
          } else if (response.status === 422) {
            setSubmissionError(
              "Este enlace de registro ha expirado o es inválido. Por favor solicita un nuevo enlace.",
            );
            setShowErrorModal(true);
          } else {
            setSubmissionError(
              "Error al validar el enlace de registro. Por favor intenta nuevamente.",
            );
            setShowErrorModal(true);
          }
        } else {
          setTokenValid(true);
        }
      } catch (error) {
        setSubmissionError(
          "Error de conexión al validar el enlace. Por favor intenta nuevamente.",
        );
        setShowErrorModal(true);
        setTokenValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  // Cargar habilidades disponibles
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/auth/skills");
        const data = await response.json();
        if (response.ok) {
          // Normalizar los datos de skills a objetos { id, name }
          const normalizedSkills: Skill[] = (data.skills || []).map(
            (skill: { id: number; name: string }) => ({
              id: skill.id,
              name: skill.name,
            })
          );
          setAvailableSkills(normalizedSkills);
          setFilteredSkills(normalizedSkills);
        }
      } catch (error) {
        // Error fetching skills - no mostrar modal para este error
      }
    };

    fetchSkills();
  }, []);

  // Debounce para detectar cuando el usuario deja de escribir
  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (skillInput.trim() === "") {
      setFilteredSkills(availableSkills);
      setShowSuggestions(false);
    } else {
      const timeout = setTimeout(() => {
        const filtered = availableSkills.filter((skill) =>
          skill.name.toLowerCase().includes(skillInput.toLowerCase()),
        );
        setFilteredSkills(filtered);
        setShowSuggestions(true);
      }, 300);

      setTypingTimeout(timeout);
    }

    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [skillInput, availableSkills]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Guardar datos originales antes del envío
    setOriginalFormData({
      semester: formData.semester,
      motivation: formData.motivation,
      program: formData.program,
      skills: [...formData.skills],
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    // Validaciones frontend
    if (!formData.program || formData.program.trim().length === 0) {
      setSubmissionError("Selecciona tu programa académico");
      setShowErrorModal(true);
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setSubmissionError("Las contraseñas no coinciden");
      setShowErrorModal(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const token = window.location.pathname.split("/").pop();
      const response = await fetchWithCsrf(`/api/auth/register/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          semester: parseInt(formData.semester),
          motivation: formData.motivation,
          skills: formData.skills,
          program: formData.program,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Mapear códigos de error a mensajes genéricos
        let errorMessage =
          "Error al procesar la solicitud. Por favor intenta nuevamente.";

        if (response.status === 422) {
          // Detectar tipo específico de error 422
          if (data.Error) {
            if (data.Error.includes("semestre")) {
              errorMessage =
                "Semestre no válido. Por favor ingresa un semestre entre 1 y 10.";
            } else if (data.Error.toLowerCase().includes("programa")) {
              errorMessage =
                "Debes seleccionar un programa válido de la lista.";
            } else if (data.Error.includes("Motivacion")) {
              errorMessage =
                "La motivación es requerida. Por favor explica tu motivación para ingresar al semillero.";
            } else if (data.Error.includes("Contraseña")) {
              if (data.Error.includes("mínimo 8 caracteres")) {
                errorMessage =
                  "La contraseña no cumple con los requisitos de seguridad. Debe tener mínimo 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos especiales.";
              } else {
                errorMessage = "La contraseña es requerida.";
              }
            } else if (data.Error.includes("habilidades")) {
              errorMessage =
                "Error en la selección de habilidades. Por favor intenta nuevamente.";
            } else {
              errorMessage =
                "Datos del formulario no válidos. Por favor verifica la información ingresada.";
            }
          } else {
            errorMessage =
              "Datos del formulario no válidos. Por favor verifica la información ingresada.";
          }
        } else if (response.status === 409) {
          errorMessage =
            "Ya existe un usuario registrado con este correo electrónico.";
        } else if (response.status === 500) {
          errorMessage =
            "Error interno del servidor. Por favor intenta más tarde.";
        }

        setSubmissionError(errorMessage);
        setShowErrorModal(true);
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setShowSuccessModal(true);
      // Registro completado exitosamente
    } catch (error) {
      // Error submitting form
      setSubmissionError("Error de conexión. Por favor intenta nuevamente.");
      setShowErrorModal(true);
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  const handleSkillSelect = (skill: Skill) => {
    if (!formData.skills.some((s) => s.id === skill.id)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
    setSkillInput("");
    // No ocultar las sugerencias al seleccionar una habilidad
  };

  const handleRemoveSkill = (skillToRemove: Skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill.id !== skillToRemove.id),
    });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim() && filteredSkills.length > 0) {
      e.preventDefault();
      handleSkillSelect(filteredSkills[0]);
    } else if (
      e.key === "Backspace" &&
      !skillInput &&
      formData.skills.length > 0
    ) {
      handleRemoveSkill(formData.skills[formData.skills.length - 1]);
    }
  };

  // Prevenir scroll del contenedor padre cuando se hace scroll en el dropdown
  const handleDropdownScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // Frontend JSX

  return (
    <div className="min-h-screen bg-[#171212] flex items-center justify-center p-4">
      {/* Main Card Container */}
      <div className="w-full max-w-3xl bg-[#1f1a1a] rounded-2xl overflow-hidden shadow-2xl">
        {/* Hero Banner with Logo and Back Button */}
        <div className="relative w-full h-48">
          <Image
            src={IMAGES.register.background}
            alt="Hero"
            fill
            className="object-cover"
          />
          {/* Overlay oscuro para mejorar contraste */}
          <div className="absolute inset-0 bg-black/27"></div>

          {/* Logo and Back Button overlaid on banner */}
          <div className="absolute inset-0 flex items-start justify-between p-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded">
              <Image
                src={IMAGES.login.logo}
                alt="Devurity Logo"
                width={32}
                height={32}
                className="bg-white/10 rounded"
              />
              </div>
              <h1 className="font-orbitron font-bold text-white text-lg tracking-[5px] leading-[23px] whitespace-nowrap">
                DEVURITY
              </h1>
            </Link>
            <Link
              href="/"
              className="bg-white/90 hover:bg-white text-[#171212] px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Volver al sitio
            </Link>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-8 py-10">
          <h1 className="text-3xl font-orbitron text-center mb-8 font-bold text-white tracking-[5px] leading-[23px] whitespace-nowrap">
            Validacion
          </h1>

          {isLoading && (
            <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
              <p className="text-blue-300 text-sm font-ubuntu text-center">
                Validando enlace de registro...
              </p>
            </div>
          )}

          {!isLoading && tokenValid && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Semestre */}
              <div className="space-y-2">
                <label htmlFor="semester" className="block text-sm text-white">
                  Semestre actual<span className="text-[#CA2B26]">*</span>
                </label>
                <input
                  id="semester"
                  name="semester"
                  type="number"
                  placeholder="Indica el semestre que cursas (ej: 5)"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                  min="1"
                  max="20"
                  className="w-full bg-[#2e2e2e] border-none text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CA2B26] rounded-lg px-4 py-3"
                />
              </div>

              {/* Programa académico */}
              <div className="space-y-2">
                <label htmlFor="program" className="block text-sm text-white">
                  Programa que cursas<span className="text-[#CA2B26]">*</span>
                </label>
                <ProgramSelector
                  value={formData.program || null}
                  onChange={(programName) =>
                    setFormData({ ...formData, program: programName || "" })
                  }
                  placeholder="Escribe para buscar tu programa"
                  helperText="Solo se aceptan programas de la lista oficial."
                />
              </div>

              {/* Motivación */}
              <div className="space-y-2">
                <label
                  htmlFor="motivation"
                  className="block text-sm text-white"
                >
                  Motivación o propósito para entrar
                  <span className="text-[#CA2B26]">*</span>
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  placeholder="Ej: Soy estudiante de Ingeniería de Software y quiero desarrollar mis habilidades en desarrollo web. Me gustaría aprender más sobre el diseño de interfaces y la experiencia de usuario, así como mejorar mis habilidades de programación y trabajo en equipo."
                  value={formData.motivation}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-[#2e2e2e] border-none text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CA2B26] rounded-lg px-4 py-3 resize-none"
                />
              </div>

              {/* Habilidades e intereses */}
              <div className="space-y-2">
                <label htmlFor="skills" className="block text-sm text-white">
                  Habilidades e intereses
                </label>

                {/* Tags container */}
                <div className="w-full bg-[#2e2e2e] border-none text-white focus-within:ring-2 focus-within:ring-[#CA2B26] rounded-lg px-4 py-3 min-h-12 flex flex-wrap gap-2 items-center">
                  {/* Tags existentes */}
                  {formData.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-[#CA2B26] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-white hover:text-gray-200 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {/* Input para nuevas habilidades */}
                  <input
                    type="text"
                    value={skillInput}
                    onChange={handleSkillInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() =>
                      setTimeout(() => setShowSuggestions(false), 150)
                    }
                    placeholder={
                      formData.skills.length === 0
                        ? "Escribe para buscar habilidades..."
                        : ""
                    }
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 min-w-32"
                  />
                </div>

                {/* Sugerencias */}
                {showSuggestions && filteredSkills.length > 0 && (
                  <div
                    className="bg-[#2e2e2e] border border-gray-600 rounded-lg mt-1 max-h-48 overflow-y-auto"
                    onTouchStart={(e) => e.stopPropagation()} // Prevenir scroll del padre en móviles
                    onTouchMove={(e) => e.stopPropagation()} // Prevenir scroll del padre en móviles
                    onWheel={handleDropdownScroll} // Prevenir scroll del padre en desktop
                  >
                    {filteredSkills.map((skill) => (
                      <div
                        key={skill.id}
                        onClick={() => handleSkillSelect(skill)}
                        onMouseDown={(e) => e.preventDefault()} // Prevenir blur inmediato
                        onTouchStart={(e) => e.stopPropagation()} // Prevenir scroll en móviles
                        className="px-4 py-2 text-white hover:bg-[#3a3a3a] cursor-pointer border-b border-gray-600 last:border-b-0"
                      >
                        {skill.name}
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-gray-400 text-xs">
                  Escribe para buscar habilidades y haz clic para agregarlas.
                  Presiona Enter para seleccionar la primera sugerencia.
                </p>
              </div>

              {/* Contraseña y Confirmación */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm text-white"
                  >
                    Contraseña<span className="text-[#CA2B26]">*</span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#2e2e2e] border-none text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CA2B26] rounded-lg px-4 py-3"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm text-white"
                  >
                    Confirmar contraseña
                    <span className="text-[#CA2B26]">*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirma tu contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#2e2e2e] border-none text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CA2B26] rounded-lg px-4 py-3"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${
                    isSubmitting
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-[#CA2B26] hover:bg-[#a82320]"
                  } text-white px-12 py-6 text-base font-medium rounded-lg transition-colors flex items-center gap-2`}
                >
                  {isSubmitting ? (
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
                      Enviando...
                    </>
                  ) : (
                    "Enviar solicitud"
                  )}
                </button>
              </div>
            </form>
          )}

          {!isLoading && !tokenValid && (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm mb-4">
                No puedes completar el registro con este enlace.
              </p>
              <Link
                href="/auth/register"
                className="text-white bg-[#CA2B26] hover:bg-[#a82320] px-6 py-3 rounded-lg font-ubuntu transition-colors"
              >
                Volver al registro
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Chat Button */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#555555] hover:bg-[#666666] rounded-full flex items-center justify-center transition-colors shadow-lg"
        aria-label="Chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
          />
        </svg>
      </button>

      {/* Modal de Éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1f1a1a] rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">¡Éxito!</h3>
            <p className="text-gray-300 mb-6">
              Tu solicitud ha sido enviada exitosamente. Un administrador
              revisará tu registro y te notificará cuando sea aprobado.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                // Restablecer el formulario con los datos originales
                setFormData({
                  semester: originalFormData.semester,
                  motivation: originalFormData.motivation,
                  program: originalFormData.program,
                  skills: [...originalFormData.skills],
                  password: originalFormData.password,
                  confirmPassword: originalFormData.confirmPassword,
                });
              }}
              className="bg-[#CA2B26] hover:bg-[#a82320] text-white px-8 py-3 rounded-lg font-medium transition-colors w-full"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

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
            <h3 className="text-2xl font-bold text-white mb-2">Error</h3>
            <p className="text-gray-300 mb-6">{submissionError}</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="bg-[#CA2B26] hover:bg-[#a82320] text-white px-8 py-3 rounded-lg font-medium transition-colors w-full"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
