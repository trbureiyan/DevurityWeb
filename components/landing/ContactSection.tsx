"use client";

import { useState, FormEvent, useEffect } from "react";
import { useCsrf } from "@/hooks/useCsrf";

// Iconos SVG para redes sociales
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="18" r="18" fill="#5B616E" />
      <path
        d="M12 14h3v10h-3V14zm1.5-4.5c1 0 1.8.8 1.8 1.8s-.8 1.7-1.8 1.7-1.8-.8-1.8-1.7.8-1.8 1.8-1.8zM17 14h2.9v1.4h.1c.4-.8 1.4-1.6 2.8-1.6 3 0 3.6 2 3.6 4.6V24h-3v-5.2c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7V24h-3V14z"
        fill="white"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="18" r="18" fill="#5B616E" />
      <path
        d="M18 10c-4.42 0-8 3.58-8 8 0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0026 18c0-4.42-3.58-8-8-8z"
        fill="white"
      />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="18" r="18" fill="#5B616E" />
      <path
        d="M26 12H10c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 4l-8 5-8-5v-2l8 5 8-5v2z"
        fill="white"
      />
    </svg>
  );
}

// Segmento form de contacto

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const { fetchWithCsrf, refetch, hasToken, error: csrfError } = useCsrf();

  useEffect(() => {
    if (!hasToken) {
      void refetch();
    }
  }, [hasToken, refetch]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    if (!trimmedPayload.name || !trimmedPayload.email || !trimmedPayload.message) {
      setSubmitStatus({
        type: "error",
        message: "Por favor completa todos los campos antes de enviar.",
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedPayload.email)) {
      setSubmitStatus({
        type: "error",
        message: "Ingresa un correo electrónico válido.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetchWithCsrf("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimmedPayload),
      });

      const data = await response
        .json()
        .catch(() => ({ message: "Error desconocido al procesar la respuesta." }));

      if (response.status === 403) {
        await refetch();
      }

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "¡Mensaje enviado con éxito!",
        });
        // Limpiar el formulario
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        const errorMessage =
          data?.message ||
          data?.error ||
          data?.Error ||
          "Error al enviar el mensaje. Intenta de nuevo.";
        setSubmitStatus({
          type: "error",
          message: errorMessage,
        });
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitStatus({
        type: "error",
        message: "Error de conexión. Por favor, verifica tu conexión a internet.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <section id="contacto" className="container mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
      {/* Título principal */}
      <div className="mb-8 md:mb-12">
        <h2 className="font-orbitron font-extrabold text-3xl md:text-[40px] leading-tight md:leading-[56px] tracking-[0.15em] text-white px-4 md:px-7">
          ¿Tienes un proyecto, empresa o inquietud? Contáctanos
        </h2>
      </div>

      {/* Contenedor principal con dos columnas */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
        {/* Columna izquierda - Formulario */}
        <div className="flex-1 lg:max-w-[850px]">
          {/* Texto descriptivo */}
          <div className="mb-8 md:mb-10 px-4 md:px-5">
            <p className="font-ubuntu text-white text-base leading-normal tracking-[0.02em]">
              En Devurity creemos en el poder de la colaboración.
              <br />
              Ya seas estudiante, investigador o empresa, este es un espacio para compartir ideas, explorar proyectos y generar conexiones.
              <br />
              <br />
              Escríbenos si quieres presentar un proyecto, unirte al semillero o proponer una colaboración: juntos podemos transformar el aprendizaje en impacto real.
            </p>
          </div>

          {/* Formulario */}
          <form className="space-y-5 md:space-y-6 px-4 md:px-5" onSubmit={handleSubmit}>
            {/* Mensaje de estado */}
            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg border-2 ${
                  submitStatus.type === "success"
                    ? "bg-green-900/20 border-green-500 text-green-300"
                    : "bg-red-900/20 border-red-500 text-red-300"
                }`}
              >
                <p className="font-ubuntu text-sm">{submitStatus.message}</p>
              </div>
            )}
            {csrfError && !submitStatus.type && (
              <div className="p-4 rounded-lg border-2 bg-red-900/20 border-red-500 text-red-300">
                <p className="font-ubuntu text-sm">
                  No pudimos preparar el envío seguro del formulario. Intenta nuevamente en unos segundos.
                </p>
              </div>
            )}

            {/* Campo Nombre */}
            <div className="space-y-1">
              <label 
                htmlFor="name" 
                className="block font-orbitron font-extrabold text-white text-base tracking-[0.02em]"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full max-w-[506px] h-[40px] bg-transparent border-2 border-[#5b616e] rounded-[15px] px-4 text-white font-ubuntu text-base focus:outline-none focus:border-variable-collection-link transition-colors"
                required
              />
            </div>

            {/* Campo Correo */}
            <div className="space-y-1">
              <label 
                htmlFor="email" 
                className="block font-orbitron font-extrabold text-white text-base tracking-[0.02em]"
              >
                Correo
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full max-w-[506px] h-[40px] bg-transparent border-2 border-[#5b616e] rounded-[15px] px-4 text-white font-ubuntu text-base focus:outline-none focus:border-variable-collection-link transition-colors"
                required
              />
            </div>

            {/* Campo Mensaje */}
            <div className="space-y-1">
              <label 
                htmlFor="message" 
                className="block font-orbitron font-extrabold text-white text-base tracking-[0.02em]"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full max-w-[506px] h-[137px] bg-transparent border-2 border-[#5b616e] rounded-[15px] px-4 py-3 text-white font-ubuntu text-base resize-none focus:outline-none focus:border-variable-collection-link transition-colors"
                required
              ></textarea>
            </div>

            {/* Botón Enviar */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="border-[3px] border-[#3d3d3d] rounded-lg px-5 py-2 min-w-[100px] hover:border-variable-collection-link transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-ubuntu font-bold text-white text-base leading-[21px] group-hover:text-variable-collection-link transition-colors">
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Columna derecha - Información de contacto */}
        <div className="flex-shrink-0 lg:w-[431px] px-4 md:px-8 py-8">
          <div className="space-y-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/devurity"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-4 hover:bg-white/5 rounded-lg transition-colors group"
            >
              <LinkedInIcon className="flex-shrink-0" />
              <div className="border-b border-[#5b616e] flex-1 pb-1">
                <p className="font-ubuntu text-[#faf8f8] text-base tracking-[0.02em] group-hover:text-variable-collection-link transition-colors">
                  LinkedIn.com/company/devurity
                </p>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/SemilleroInvestigacionDevurity"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-4 hover:bg-white/5 rounded-lg transition-colors group"
            >
              <GitHubIcon className="flex-shrink-0" />
              <div className="border-b border-[#5b616e] flex-1 pb-1">
                <p className="font-ubuntu text-white text-base tracking-[0.02em] group-hover:text-variable-collection-link transition-colors">
                  Github.com/SemilleroInvestigacionDevurity
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:devurity@usco.edu.co"
              className="flex items-center gap-3 px-3 py-4 hover:bg-white/5 rounded-lg transition-colors group"
            >
              <EmailIcon className="flex-shrink-0" />
              <div className="border-b border-[#5b616e] flex-1 pb-1">
                <p className="font-ubuntu text-white text-base tracking-[0.02em] group-hover:text-variable-collection-link transition-colors">
                  devurity@usco.edu.co
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
