"use client";

import React, { useState, useEffect } from "react";

interface SkillSelectorProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
  maxSkills?: number;
}

export default function SkillSelector({
  selectedSkills,
  onChange,
  maxSkills = 15,
}: SkillSelectorProps) {
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Cargar habilidades disponibles
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/auth/skills");
        const data = await response.json();
        if (response.ok) {
          // Normalizar skills: el API puede devolver strings o { id, name } objetos
          const normalizedSkills: string[] = (data.skills || []).map(
            (skill: string | { id: number; name: string }) =>
              typeof skill === "string" ? skill : skill.name
          );
          setAvailableSkills(normalizedSkills);
          setFilteredSkills(normalizedSkills);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
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
          skill.toLowerCase().includes(skillInput.toLowerCase())
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

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  const handleSkillSelect = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      if (maxSkills && selectedSkills.length >= maxSkills) {
        // Opcional: Mostrar mensaje de límite alcanzado
        return;
      }
      onChange([...selectedSkills, skill]);
    }
    setSkillInput("");
    // No ocultar las sugerencias al seleccionar una habilidad para permitir selección múltiple rápida
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange(selectedSkills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (skillInput.trim() && filteredSkills.length > 0) {
        handleSkillSelect(filteredSkills[0]);
      }
    } else if (
      e.key === "Backspace" &&
      !skillInput &&
      selectedSkills.length > 0
    ) {
      handleRemoveSkill(selectedSkills[selectedSkills.length - 1]);
    }
  };

  // Prevenir scroll del contenedor padre cuando se hace scroll en el dropdown
  const handleDropdownScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="space-y-2">
      {/* Tags container */}
      <div className="w-full bg-black/30 border border-white/20 focus-within:border-[#da292e] focus-within:ring-1 focus-within:ring-[#da292e] rounded-lg px-4 py-3 min-h-12 flex flex-wrap gap-2 items-center transition-colors">
        {/* Tags existentes */}
        {selectedSkills.map((skill) => (
          <div
            key={skill}
            className="bg-[#da292e] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 animate-in fade-in zoom-in duration-200"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-white hover:text-gray-200 text-xs rounded-full p-0.5 hover:bg-white/20 transition-colors"
              aria-label={`Eliminar ${skill}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
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
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={
            selectedSkills.length === 0
              ? "Escribe para buscar habilidades..."
              : ""
          }
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 min-w-[150px] text-sm"
        />
      </div>

      {/* Sugerencias */}
      {showSuggestions && filteredSkills.length > 0 && (
        <div
          className="absolute z-50 w-full max-w-md bg-[#1f1a1a] border border-white/10 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-xl"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onWheel={handleDropdownScroll}
        >
          {filteredSkills.map((skill) => (
            <div
              key={skill}
              onClick={() => handleSkillSelect(skill)}
              onMouseDown={(e) => e.preventDefault()} // Prevenir blur inmediato
              className="px-4 py-2 text-white/90 hover:bg-[#da292e]/20 hover:text-white cursor-pointer border-b border-white/5 last:border-b-0 transition-colors text-sm"
            >
              {skill}
            </div>
          ))}
        </div>
      )}
      
      <p className="text-white/40 text-xs">
        Selecciona de la lista o escribe para filtrar. Solo se permiten habilidades existentes.
      </p>
    </div>
  );
}
