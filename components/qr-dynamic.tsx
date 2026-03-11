"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Image from "next/image";
import { useCsrf } from "@/hooks/useCsrf";

interface QRData {
  qr: string;
  expiresAt: number;
  userId: string;
  usuario: {
    id: string;
    nombre: string;
    correo: string;
    role: string;
  };
}

interface QRDynamicProps {
  userId: string;
  className?: string;
}

const mergeClassNames = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(" ");

// Componente para mostrar y gestionar un código QR dinámico
export default function QRDynamic({ userId, className }: QRDynamicProps) {
  const [qrData, setQrData] = useState<QRData | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutos en segundos
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { fetchWithCsrf } = useCsrf();
  const generateNewQRRef = useRef<() => Promise<void>>(null);
  const isGeneratingRef = useRef(false);
  const isMountedRef = useRef(true);

  // Limpiar temporizador
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Iniciar temporizador
  const startTimer = useCallback(() => {
    clearTimer();

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearTimer();
          // Usar la referencia para generar nuevo QR cuando expire
          if (generateNewQRRef.current) {
            generateNewQRRef.current();
          }
          return 120;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, [clearTimer]);

  // Función para generar nuevo QR dinámico
  const generateNewQR = useCallback(async () => {
    if (!userId || isGeneratingRef.current) {
      return;
    }

    isGeneratingRef.current = true;
    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetchWithCsrf("/api/qr-dinamico", {
        method: "POST",
        body: JSON.stringify({ userId: userId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!isMountedRef.current) return;

      if (res.ok) {
        setQrData(data);
        setTimeLeft(120);
        startTimer();
      } else {
        console.error("Error al generar QR:", data.error);
        setError(data.error || "Error al generar QR");
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      console.error("Error de conexión:", error);
      setError("Error de conexión al generar QR");
    } finally {
      isGeneratingRef.current = false;
      if (isMountedRef.current) {
        setIsGenerating(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, fetchWithCsrf]);
  // startTimer excluido intencionalmente para evitar loop infinito

  // Mantener la referencia actualizada (asignación en render, válido para refs no-DOM)
  generateNewQRRef.current = generateNewQR;

  useEffect(() => {
    isMountedRef.current = true;

    if (!userId) {
      return undefined;
    }

    // setTimeout para evitar doble invocación en StrictMode
    const timeoutId = setTimeout(() => {
      if (isMountedRef.current && !isGeneratingRef.current) {
        generateNewQRRef.current?.();
      }
    }, 0);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timeoutId);
      clearTimer();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Formatear tiempo en minutos y segundos
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Clases combinadas para el contenedor del componente
  const cardClassName = mergeClassNames(
    "rounded-[28px] border border-white/5 bg-[#221b1b] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
    className,
  );

  if (error) {
    return (
      <div className={cardClassName}>
        {/* Estado de error con acción de reintento */}
        <h2 className="font-bold text-white text-lg md:text-xl mb-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          Código QR
        </h2>
        <div className="text-center">
          <div className="text-red-400 mb-4">{error}</div>
          <button
            onClick={generateNewQR}
            disabled={isGenerating}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-bold rounded-lg h-12 transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            {isGenerating ? "Generando..." : "Reintentar"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClassName}>
      {/* Título del componente */}
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
        <div className="h-2 w-2 rounded-full bg-variable-collection-botones" />
        Código QR Dinámico
      </h2>

      <div className="text-center">
        {qrData ? (
          <>
            {/* QR Image */}
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <Image
                  src={qrData.qr}
                  alt="Código QR dinámico"
                  width={220}
                  height={220}
                  className="rounded-2xl border-2 border-white/20 shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
                />
                {/* Overlay cuando está generando nuevo QR */}
                {isGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/60">
                    <div className="text-sm text-white">Generando...</div>
                  </div>
                )}
              </div>
            </div>

            {/* Timer */}
            <div className="mb-4">
              <div className="mb-1 text-sm text-white/50">Expira en:</div>
              <div
                className={`text-2xl font-bold ${
                  timeLeft <= 30 ? "text-red-400" : "text-green-400"
                }`}
              >
                {formatTime(timeLeft)}
              </div>
              {timeLeft <= 30 && (
                <div className="mt-1 text-xs text-red-400">
                  ¡QR por expirar! Se renovará automáticamente
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="space-y-1 text-xs text-white/60">
              <div>Usuario: {qrData.usuario.nombre}</div>
              <div>ID: {qrData.usuario.id}</div>
            </div>
          </>
        ) : (
          // Loading state
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 h-32 w-32 animate-pulse rounded-2xl bg-black/30" />
            <div className="text-sm text-white/60">Generando código QR...</div>
          </div>
        )}

        {/* Manual Refresh Button */}
        <button
          onClick={generateNewQR}
          disabled={isGenerating}
          className="mt-5 flex h-12 w-full items-center justify-center rounded-2xl bg-variable-collection-botones text-sm font-semibold text-white transition-all hover:bg-variable-collection-botones/90 disabled:cursor-not-allowed disabled:bg-gray-600"
        >
          {isGenerating ? "Generando..." : "Generar Nuevo QR"}
        </button>
      </div>
    </div>
  );
}
