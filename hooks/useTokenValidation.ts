"use client";

import { useState, useEffect } from "react";

interface UseTokenValidationResult {
  tokenValid: boolean;
  isLoading: boolean;
  submissionError: string;
  showErrorModal: boolean;
  setShowErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useTokenValidation(): UseTokenValidationResult {
  const [tokenValid, setTokenValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [submissionError, setSubmissionError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = window.location.pathname.split("/").pop();
        const response = await fetch(`/api/auth/register/${token}`);
        await response.json();

        if (!response.ok) {
          setTokenValid(false);
          if (response.status === 409) {
            setSubmissionError(
              "Este enlace de registro ya ha sido utilizado. Por favor solicita un nuevo enlace.",
            );
          } else if (response.status === 422) {
            setSubmissionError(
              "Este enlace de registro ha expirado o es inválido. Por favor solicita un nuevo enlace.",
            );
          } else {
            setSubmissionError(
              "Error al validar el enlace de registro. Por favor intenta nuevamente.",
            );
          }
          setShowErrorModal(true);
        } else {
          setTokenValid(true);
        }
      } catch {
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

  return { tokenValid, isLoading, submissionError, showErrorModal, setShowErrorModal };
}
