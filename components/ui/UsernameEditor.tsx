"use client";
import { useState, useEffect } from "react";
import { Tooltip } from "../ui/Tooltip";
import { USERNAME } from "@/lib/constants/validation";

interface UsernameEditorProps {
  currentUsername: string;
  usernameLastChanged: string | null;
  isEditing: boolean;
  onUsernameChange: (username: string) => void;
}

// Editor de username (controlado por el padre):
// - Muestra el username estático cuando isEditing es false.
// - Al editar, valida en vivo el formato con reglas de USERNAME y sólo propaga cambios válidos vía onUsernameChange.
// - Impone cooldown de 1 semana usando usernameLastChanged para bloquear entradas hasta la fecha permitida.
export function UsernameEditor({
  currentUsername,
  usernameLastChanged,
  isEditing,
  onUsernameChange,
}: UsernameEditorProps) {
  const [username, setUsername] = useState(currentUsername);
  const [error, setError] = useState<string | null>(null);
  const [canChange, setCanChange] = useState(true);
  const [nextChangeDate, setNextChangeDate] = useState<Date | null>(null);

  useEffect(() => {
    setUsername(currentUsername);
  }, [currentUsername]);

  useEffect(() => {
    // Calcula si se puede cambiar (cooldown semanal) y fecha del próximo cambio; el padre decide cuándo persistir
    if (usernameLastChanged) {
      const lastChanged = new Date(usernameLastChanged);
      const oneWeekLater = new Date(lastChanged.getTime() + USERNAME.CHANGE_COOLDOWN);
      const now = new Date();

      if (now < oneWeekLater) {
        setCanChange(false);
        setNextChangeDate(oneWeekLater);
      } else {
        setCanChange(true);
        setNextChangeDate(null);
      }
    }
  }, [usernameLastChanged]);

  const validateUsername = (value: string): string | null => {
    // Sanitiza y aplica reglas de longitud/patrón
    const sanitized = value.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '');
    
    if (sanitized.length < USERNAME.MIN_LENGTH) {
      return `El username debe tener al menos ${USERNAME.MIN_LENGTH} caracteres`;
    }
    if (sanitized.length > USERNAME.MAX_LENGTH) {
      return `El username no puede exceder ${USERNAME.MAX_LENGTH} caracteres`;
    }
    if (!/^[a-z0-9]/.test(sanitized)) {
      return "El username debe comenzar con una letra o número";
    }
    if (!/[a-z0-9]$/.test(sanitized)) {
      return "El username debe terminar con una letra o número";
    }
    if (value !== sanitized) {
      return "Solo se permiten letras, números, guiones y guiones bajos";
    }
    
    return null;
  };

  const handleChange = (value: string) => {
    setUsername(value);
    // Valida en vivo y solo propaga cuando es válido
    const validationError = validateUsername(value);
    setError(validationError);
    
    if (!validationError) {
      onUsernameChange(value);
    }
  };

  if (!isEditing) {
    return (
      <Tooltip
        content="Tu username es tu identificador único en Devurity. Aparece en la URL de tu perfil y es como otros te encontrarán."
        position="right"
      >
        <span className="text-white/60 text-sm">@{currentUsername}</span>
      </Tooltip>
    );
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <Tooltip
          content={
            canChange
              ? "⚠️ IMPORTANTE: Sólo puedes cambiar tu username una vez por semana. Elige con cuidado, ya que este será tu identificador público en Devurity."
              : `No puedes cambiar tu username hasta el ${nextChangeDate?.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}`
          }
          position="top"
        >
          <div className="flex items-center gap-2">
            <span className="text-white/60">@</span>
            <input
              type="text"
              value={username}
              onChange={(e) => handleChange(e.target.value)}
              disabled={!canChange}
              className={`bg-white/5 border ${
                error ? "border-red-500" : "border-white/10"
              } rounded px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !canChange ? "opacity-50 cursor-not-allowed" : ""
              }`}
              placeholder="tu-username"
              maxLength={30}
              pattern="[a-z0-9_-]+"
            />
            {!canChange && (
              <svg
                className="size-5 text-yellow-500"
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
            )}
          </div>
        </Tooltip>
      </div>
      {error && (
        <p className="text-red-500 text-xs animate-shake">{error}</p>
      )}
      {!canChange && nextChangeDate && (
        <p className="text-yellow-500 text-xs">
          Próximo cambio disponible: {nextChangeDate.toLocaleDateString("es-ES", { 
            day: "numeric", 
            month: "long", 
            year: "numeric" 
          })}
        </p>
      )}
      <p className="text-white/40 text-xs">
        3-30 caracteres, solo letras, números, - y _
      </p>
    </div>
  );
}
