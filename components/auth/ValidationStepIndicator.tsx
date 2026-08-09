"use client";

interface ValidationStepIndicatorProps {
  currentStep: 0 | 1 | 2;
  steps: readonly string[];
}

/**
 * Componente accesible de indicador de pasos para el wizard de validación académica.
 * Usa `aria-current="step"` en el paso activo para accesibilidad en lectores de pantalla.
 */
export default function ValidationStepIndicator({
  currentStep,
  steps,
}: ValidationStepIndicatorProps) {
  return (
    <div className="w-full space-y-3" aria-label="Progreso del formulario de registro">
      {/* Barra de progreso visual */}
      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden flex">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-full flex-1 transition-all duration-500 ${
              index <= currentStep
                ? "bg-variable-collection-botones"
                : "bg-transparent"
            }`}
          />
        ))}
      </div>

      {/* Lista de pasos con aria-current */}
      <ol className="grid grid-cols-3 gap-2 text-center">
        {steps.map((label, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <li
              key={label}
              aria-current={isActive ? "step" : undefined}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive
                  ? "text-white font-semibold"
                  : isCompleted
                  ? "text-variable-collection-link"
                  : "text-white/40"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-orbitron transition-all ${
                  isActive
                    ? "bg-variable-collection-botones text-white shadow-[0_0_12px_rgba(202,43,38,0.5)]"
                    : isCompleted
                    ? "bg-variable-collection-link/20 text-variable-collection-link border border-variable-collection-link/40"
                    : "bg-white/5 text-white/40 border border-white/10"
                }`}
              >
                {isCompleted ? "✓" : index + 1}
              </span>
              <span className="font-ubuntu text-xs hidden sm:inline">{label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
