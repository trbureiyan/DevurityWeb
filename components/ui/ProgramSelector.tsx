"use client";

import React, { useState, useDeferredValue, useMemo } from "react";
import { usePrograms } from "@/hooks/usePrograms";

interface ProgramSelectorProps {
  value: string | null;
  onChange: (program: string | null) => void;
  placeholder?: string;
  helperText?: string;
  maxHeight?: string;
}

// Selector de programas académicos (controlado):
// - Usa value/onChange para integrarlo en formularios (Formik, RHF o useState propio).
// - Carga opciones desde /api/auth/programs al montar y aplica filtro local con debounce de 250ms.
// - Devuelve null cuando se limpia, útil para resetear el campo en la capa superior.
export default function ProgramSelector({
  value,
  onChange,
  placeholder = "Escribe para buscar tu programa...",
  helperText = "Selecciona un programa de la lista desplegable.",
  maxHeight = "max-h-48",
}: ProgramSelectorProps) {
  const programs = usePrograms();
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Sync local input value from parent prop without useEffect (derived state pattern)
  const [prevValue, setPrevValue] = useState<string | null | undefined>(undefined);
  if (value !== prevValue) {
    setPrevValue(value);
    setInputValue(value ?? "");
  }

  // Derive filtered programs using deferred value for smooth typing
  const deferredInput = useDeferredValue(inputValue);
  const filteredPrograms = useMemo(() => {
    if (!deferredInput.trim()) return programs;
    return programs.filter((program) =>
      program.toLowerCase().includes(deferredInput.toLowerCase()),
    );
  }, [deferredInput, programs]);

  const showSuggestions = isOpen && filteredPrograms.length > 0;

  const handleSelect = (programName: string) => {
    // Selecciona y cierra el dropdown
    setInputValue(programName);
    onChange(programName);
    setIsOpen(false);
  };

  const handleClear = () => {
    // Limpia selección y restablece listado completo
    setInputValue("");
    onChange(null);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter selecciona la primera sugerencia para flujo rápido con teclado
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredPrograms.length > 0) {
        handleSelect(filteredPrograms[0]);
      }
    }
  };

  return (
    <div className="space-y-2 relative">
      <div className="w-full bg-black/30 border border-white/20 focus-within:border-[#da292e] focus-within:ring-1 focus-within:ring-[#da292e] rounded-lg px-4 py-3 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 150)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent border-none outline-none text-white placeholder-white/40 text-sm"
          />
        </div>
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="text-white/70 hover:text-white text-xs rounded-full px-2 py-1 hover:bg-white/10 transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>

      {showSuggestions && filteredPrograms.length > 0 && (
        <div
          className={`absolute z-50 w-full bg-[#1f1a1a] border border-white/10 rounded-lg mt-1 overflow-y-auto shadow-xl ${maxHeight}`}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
        >
          {filteredPrograms.map((program) => (
            <div
              key={program}
              role="option"
              tabIndex={0}
              aria-selected={false}
              onClick={() => handleSelect(program)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(program); }}
              onMouseDown={(e) => e.preventDefault()}
              className="px-4 py-2 text-white/90 hover:bg-[#da292e]/20 hover:text-white cursor-pointer border-b border-white/5 last:border-b-0 transition-colors text-sm"
            >
              {program}
            </div>
          ))}
        </div>
      )}

      <p className="text-white/40 text-xs">{helperText}</p>
    </div>
  );
}
