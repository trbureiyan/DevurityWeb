"use client";

import React, { useState, useEffect, useDeferredValue, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCsrf } from "@/hooks/useCsrf";
import { useTokenValidation } from "@/hooks/useTokenValidation";
import { useSkillObjects } from "@/hooks/useSkillObjects";
import { IMAGES } from "@/public/images";
import ProgramSelector from "@/components/ui/ProgramSelector";
import Button from "@/components/ui/Button";
import StatusModal from "@/components/ui/StatusModal";
import ValidationStepIndicator from "@/components/auth/ValidationStepIndicator";
import {
  validateRegistrationStep,
  parseBackendError,
  REGISTRATION_RULES,
  type Skill,
  type RegistrationFormData,
} from "@/lib/auth/register-validation";

const STEPS = ["Información Académica", "Perfil", "Acceso"] as const;

export default function ValidacionPage() {
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0);
  const [formData, setFormData] = useState<RegistrationFormData>({
    semester: "",
    motivation: "",
    program: "",
    skills: [],
    password: "",
    confirmPassword: "",
  });

  const availableSkills = useSkillObjects();
  const [skillInput, setSkillInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const deferredSkillInput = useDeferredValue(skillInput);

  const filteredSkills = useMemo(() => {
    if (deferredSkillInput.trim() === "") return availableSkills;
    return availableSkills.filter((skill) =>
      skill.name.toLowerCase().includes(deferredSkillInput.toLowerCase()),
    );
  }, [deferredSkillInput, availableSkills]);

  const {
    tokenValid,
    isLoading: isTokenLoading,
    submissionError: tokenError,
    showErrorModal: tokenErrorModal,
    setShowErrorModal: setTokenErrorModal,
  } = useTokenValidation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [stepError, setStepError] = useState("");
  const [submissionError, setSubmissionError] = useState("");

  const router = useRouter();
  const { fetchWithCsrf } = useCsrf();

  // Avanzar al siguiente paso del wizard con validación preventiva
  const handleNextStep = () => {
    const error = validateRegistrationStep(currentStep, formData);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError("");
    setCurrentStep((prev) => (prev < 2 ? ((prev + 1) as 0 | 1 | 2) : prev));
  };

  // Retroceder de paso manteniendo los datos intactos
  const handlePrevStep = () => {
    setStepError("");
    setCurrentStep((prev) => (prev > 0 ? ((prev - 1) as 0 | 1 | 2) : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStepError("");

    // Validar el paso final antes del envío
    const step2Error = validateRegistrationStep(2, formData);
    if (step2Error) {
      setStepError(step2Error);
      return;
    }

    setIsSubmitting(true);

    try {
      const token = window.location.pathname.split("/").pop();
      const response = await fetchWithCsrf(`/api/auth/register/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          semester: parseInt(formData.semester, 10),
          motivation: formData.motivation.trim(),
          skills: formData.skills.map((skill) => skill.id),
          program: formData.program.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = parseBackendError(data as Record<string, unknown>);
        setSubmissionError(errorMessage);
        setShowErrorModal(true);
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setShowSuccessModal(true);
    } catch {
      setSubmissionError("Error de conexión. Por favor intenta nuevamente.");
      setShowErrorModal(true);
      setIsSubmitting(false);
    }
  };

  // Autonavigación a la home tras éxito
  useEffect(() => {
    if (!showSuccessModal) return;
    const timer = setTimeout(() => {
      router.replace("/");
    }, 4000);
    return () => clearTimeout(timer);
  }, [showSuccessModal, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (stepError) setStepError("");
  };

  const handleSkillSelect = (skill: Skill) => {
    if (!formData.skills.some((s) => s.id === skill.id)) {
      if (formData.skills.length >= REGISTRATION_RULES.MAX_SKILLS_COUNT) {
        setStepError(
          `Puedes seleccionar máximo ${REGISTRATION_RULES.MAX_SKILLS_COUNT} habilidades.`,
        );
        return;
      }
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
    setSkillInput("");
    if (stepError) setStepError("");
  };

  const handleRemoveSkill = (skillToRemove: Skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== skillToRemove.id),
    }));
  };

  if (isTokenLoading) {
    return (
      <div className="min-h-screen bg-[#171212] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-variable-collection-link border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-ubuntu text-white/70 text-sm">
            Validando token de admisión...
          </p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <main className="min-h-screen bg-[#171212] flex items-center justify-center p-4">
        <StatusModal
          open={tokenErrorModal}
          variant="error"
          title="Enlace Inválido o Expirado"
          message={
            tokenError ||
            "El enlace de registro no es válido o ha expirado. Solicita un nuevo correo de verificación."
          }
          actionLabel="Ir al Inicio"
          onClose={() => {
            setTokenErrorModal(false);
            router.push("/");
          }}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#171212] flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-2xl bg-[#1f1a1a] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-10 space-y-8">
        {/* Cabecera institucional */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link href="/" className="flex items-center gap-3">
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
            className="text-xs font-ubuntu text-white/60 hover:text-white transition-colors"
          >
            Volver al sitio
          </Link>
        </div>

        {/* Título e Indicador de Pasos */}
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h1 className="font-orbitron font-bold text-2xl sm:text-3xl text-white">
              Admisión Académica
            </h1>
            <p className="font-ubuntu text-xs sm:text-sm text-white/60">
              Completa la información requerida para tu perfil de semillero
            </p>
          </div>

          <ValidationStepIndicator
            currentStep={currentStep}
            steps={STEPS}
          />
        </div>

        {/* Alerta de error de paso */}
        {stepError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm font-ubuntu animate-fade-in flex items-center gap-3">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{stepError}</span>
          </div>
        )}

        {/* Formulario Wizard por pasos */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* PASO 0: Información Académica */}
          {currentStep === 0 && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-2">
                <label htmlFor="semester" className="block font-ubuntu text-white text-sm">
                  Semestre Actual<span className="text-[#CA2B26]">*</span>
                </label>
                <input
                  id="semester"
                  name="semester"
                  type="number"
                  placeholder={`Indica el semestre que cursas (${REGISTRATION_RULES.MIN_SEMESTER}–${REGISTRATION_RULES.MAX_SEMESTER})`}
                  value={formData.semester}
                  onChange={handleChange}
                  min={REGISTRATION_RULES.MIN_SEMESTER}
                  max={REGISTRATION_RULES.MAX_SEMESTER}
                  className="w-full bg-[#171212] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-variable-collection-link transition-colors placeholder:text-white/30"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="program" className="block font-ubuntu text-white text-sm">
                  Programa Académico<span className="text-[#CA2B26]">*</span>
                </label>
                <ProgramSelector
                  value={formData.program || null}
                  onChange={(programName) => {
                    setFormData((prev) => ({ ...prev, program: programName || "" }));
                    if (stepError) setStepError("");
                  }}
                />
              </div>
            </div>
          )}

          {/* PASO 1: Perfil */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fade-in">
              {/* Motivación */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="motivation" className="block font-ubuntu text-white text-sm">
                    Motivación de Ingreso<span className="text-[#CA2B26]">*</span>
                  </label>
                  <span
                    className={`text-xs font-ubuntu ${
                      formData.motivation.length > REGISTRATION_RULES.MAX_MOTIVATION_LENGTH
                        ? "text-red-400 font-semibold"
                        : "text-white/40"
                    }`}
                  >
                    {formData.motivation.length}/{REGISTRATION_RULES.MAX_MOTIVATION_LENGTH}
                  </span>
                </div>
                <textarea
                  id="motivation"
                  name="motivation"
                  rows={4}
                  placeholder="Explica brevemente por qué deseas ingresar al semillero Devurity y qué áreas de investigación te interesan..."
                  value={formData.motivation}
                  onChange={handleChange}
                  maxLength={REGISTRATION_RULES.MAX_MOTIVATION_LENGTH}
                  className="w-full bg-[#171212] border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-variable-collection-link transition-colors placeholder:text-white/30 resize-none"
                />
              </div>

              {/* Habilidades */}
              <div className="space-y-2">
                <label htmlFor="skills-input" className="block font-ubuntu text-white text-sm">
                  Habilidades Técnicas<span className="text-[#CA2B26]">*</span>
                </label>
                <p className="text-xs text-white/50">
                  Selecciona al menos una habilidad. (Máximo {REGISTRATION_RULES.MAX_SKILLS_COUNT})
                </p>

                {/* Tags de habilidades seleccionadas */}
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-[#171212] border border-white/10 rounded-xl">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-variable-collection-link/20 border border-variable-collection-link/40 text-variable-collection-link rounded-full text-xs font-ubuntu"
                      >
                        {skill.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-white transition-colors"
                          aria-label={`Eliminar habilidad ${skill.name}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Input con auto-completado */}
                <div className="relative">
                  <input
                    id="skills-input"
                    type="text"
                    placeholder="Escribe para buscar habilidades (ej: Python, Ciberseguridad)..."
                    value={skillInput}
                    onChange={(e) => {
                      setSkillInput(e.target.value);
                      setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="w-full bg-[#171212] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-variable-collection-link transition-colors placeholder:text-white/30"
                  />

                  {/* Dropdown de sugerencias */}
                  {isOpen && filteredSkills.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-[#1f1a1a] border border-white/10 rounded-xl shadow-2xl z-30 divide-y divide-white/5">
                      {filteredSkills.map((skill) => {
                        const isSelected = formData.skills.some((s) => s.id === skill.id);
                        return (
                          <button
                            key={skill.id}
                            type="button"
                            disabled={isSelected}
                            onClick={() => {
                              handleSkillSelect(skill);
                              setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs font-ubuntu transition-colors flex items-center justify-between ${
                              isSelected
                                ? "text-white/30 bg-white/5 cursor-not-allowed"
                                : "text-white/80 hover:bg-variable-collection-link/20 hover:text-white"
                            }`}
                          >
                            <span>{skill.name}</span>
                            {isSelected && <span className="text-[10px]">Añadida</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PASO 2: Acceso */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fade-in">
              {/* Reglas de la contraseña */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                <p className="text-xs font-semibold text-white font-ubuntu">
                  Requisitos de Seguridad de la Contraseña:
                </p>
                <ul className="text-xs text-white/60 space-y-1 font-ubuntu list-disc list-inside">
                  <li>Mínimo 8 caracteres</li>
                  <li>Al menos una letra mayúscula y una minúscula</li>
                  <li>Al menos un número</li>
                  <li>Al menos un símbolo especial (!@#$%^&*...)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block font-ubuntu text-white text-sm">
                  Contraseña<span className="text-[#CA2B26]">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#171212] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-variable-collection-link transition-colors placeholder:text-white/30"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block font-ubuntu text-white text-sm">
                  Confirmar Contraseña<span className="text-[#CA2B26]">*</span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#171212] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-variable-collection-link transition-colors placeholder:text-white/30"
                />
              </div>

              {/* Aviso institucional de revisión */}
              <div className="bg-variable-collection-selected/30 border border-white/10 rounded-xl p-4 text-xs text-white/70 font-ubuntu space-y-1">
                <p className="font-semibold text-white">Aviso de Admisión:</p>
                <p>
                  Al completar este formulario, tu solicitud quedará registrada en el sistema y pasará a revisión por los coordinadores del semillero Devurity.
                </p>
              </div>
            </div>
          )}

          {/* Botones de navegación del Wizard */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {currentStep > 0 ? (
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handlePrevStep}
              >
                ← Anterior
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 2 ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNextStep}
              >
                Siguiente →
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
              >
                Completar Registro
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Modales de estado accesibles */}
      <StatusModal
        open={showErrorModal}
        variant="error"
        title="Error en el Registro"
        message={submissionError}
        actionLabel="Reintentar"
        onClose={() => setShowErrorModal(false)}
      />

      <StatusModal
        open={showSuccessModal}
        variant="success"
        title="¡Solicitud Completada!"
        message="Tu registro ha sido enviado exitosamente. Redirigiendo a la página principal..."
        actionLabel="Ir al Inicio"
        onClose={() => router.replace("/")}
      />
    </main>
  );
}
