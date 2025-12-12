"use client";
import { ReactNode, useState } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

// Tooltip ligero reutilizable:
// - Envuelve cualquier nodo y muestra content al hover/focus; útil para inputs, badges o iconos.
// - Usa prop position para elegir la dirección; pensado para UI accesible sin dependencias externas.
export function Tooltip({ content, children, position = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={`absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-normal max-w-xs ${positionClasses[position]} animate-fade-in`}
          role="tooltip"
        >
          {content}
          <div className={`absolute w-2 h-2 bg-gray-900 rotate-45 ${
            position === "top" ? "bottom-[-4px] left-1/2 -translate-x-1/2" :
            position === "bottom" ? "top-[-4px] left-1/2 -translate-x-1/2" :
            position === "left" ? "right-[-4px] top-1/2 -translate-y-1/2" :
            "left-[-4px] top-1/2 -translate-y-1/2"
          }`}></div>
        </div>
      )}
    </div>
  );
}
