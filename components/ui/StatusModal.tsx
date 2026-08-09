"use client";

import { useEffect, useRef, useId } from "react";
import Button from "./Button";

export type StatusModalVariant = "success" | "error" | "info";

interface StatusModalProps {
  open: boolean;
  variant: StatusModalVariant;
  title: string;
  message: string;
  actionLabel: string;
  onAction?: () => void;
  onClose: () => void;
}

const ICON = {
  success: (
    <svg
      className="w-8 h-8 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
  ),
  error: (
    <svg
      className="w-8 h-8 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  info: (
    <svg
      className="w-8 h-8 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01"
      />
    </svg>
  ),
};

const ICON_BG = {
  success: "bg-green-600 shadow-[0_0_20px_rgba(22,163,74,0.4)]",
  error:
    "bg-variable-collection-botones shadow-[0_0_20px_rgba(202,43,38,0.4)]",
  info: "bg-variable-collection-selected shadow-[0_0_20px_rgba(85,85,85,0.4)]",
};

/**
 * Componente StatusModal accesible de alto estándar.
 * - Utiliza `useId` para generar IDs únicos de accesibilidad.
 * - Captura `document.activeElement` y restaura el foco al cerrarse.
 * - Implementa un Focus Trap nativo que previene el escape de Tab / Shift+Tab.
 * - Preserva el `body.style.overflow` anterior al abrirse.
 * - Maneja Escape cerrando mediante `onClose`.
 */
export default function StatusModal({
  open,
  variant,
  title,
  message,
  actionLabel,
  onAction,
  onClose,
}: StatusModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const actionButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const uniqueId = useId();

  const titleId = `status-modal-title-${uniqueId}`;
  const descId = `status-modal-desc-${uniqueId}`;

  // Gestión de foco inicial, restauración y bloqueo de scroll
  useEffect(() => {
    if (!open) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // Foco al botón de acción principal al abrirse
    const timer = setTimeout(() => {
      actionButtonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      previousActiveElement.current?.focus();
    };
  }, [open]);

  // Manejo de eventos de teclado (Escape y Tab Trap)
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        if (!containerRef.current) return;
        const focusableElements = containerRef.current.querySelectorAll<
          HTMLAnchorElement | HTMLButtonElement | HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
        >(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex="0"]',
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
    >
      <div className="bg-[#1f1a1a] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl space-y-5 animate-fade-up">
        <div
          className={`w-16 h-16 ${ICON_BG[variant]} rounded-full flex items-center justify-center mx-auto transition-transform`}
        >
          {ICON[variant]}
        </div>

        <div className="space-y-2">
          <h2
            id={titleId}
            className="font-orbitron text-xl font-bold text-white tracking-wide"
          >
            {title}
          </h2>
          <p id={descId} className="font-ubuntu text-white/70 text-sm leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          <Button
            ref={actionButtonRef}
            variant="primary"
            size="md"
            className="w-full"
            onClick={onAction || onClose}
          >
            {actionLabel}
          </Button>

          {onAction && (
            <Button
              variant="ghost"
              size="md"
              className="w-full text-xs"
              onClick={onClose}
            >
              Cancelar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
