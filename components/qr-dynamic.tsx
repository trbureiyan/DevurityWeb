"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
}

export default function QRDynamic({ userId }: QRDynamicProps) {
  const [qrData, setQrData] = useState<QRData | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutos en segundos
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { fetchWithCsrf } = useCsrf();
  const generateNewQRRef = useRef<() => Promise<void>>(null);

  // Función para generar nuevo QR dinámico
  const generateNewQR = useCallback(async () => {
    if (!userId || isGenerating) {
      console.log("❌ No se puede generar QR - sin userId o ya generando");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetchWithCsrf("/api/qr-dinamico", {
        method: "POST",
        body: JSON.stringify({ userId: userId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        setQrData(data);
        setTimeLeft(120); // Reiniciar contador a 2 minutos
      } else {
        console.error("Error al generar QR:", data.error);
        setError(data.error || "Error al generar QR");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setError("Error de conexión al generar QR");
    } finally {
      setIsGenerating(false);
    }
  }, [userId, isGenerating, fetchWithCsrf]);

  // Actualizar la referencia cuando generateNewQR cambia
  useEffect(() => {
    generateNewQRRef.current = generateNewQR;
  }, [generateNewQR]);

  // Iniciar temporizador
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!);
          // Usar la referencia para generar nuevo QR cuando expire
          if (generateNewQRRef.current) {
            generateNewQRRef.current();
          }
          return 120;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, []);

  // Formatear tiempo en minutos y segundos
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    // Generar QR inicial cuando el componente se monta
    if (userId) {
      generateNewQR();
    }

    return () => {
      // Limpiar intervalo al desmontar
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [userId]);

  useEffect(() => {
    // Iniciar temporizador cuando se genera nuevo QR
    if (qrData) {
      startTimer();
    }
  }, [qrData]);

  if (error) {
    return (
      <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
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
    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
      <h2 className="font-bold text-white text-lg md:text-xl mb-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-variable-collection-botones rounded-full"></div>
        Código QR Dinámico
      </h2>

      <div className="text-center">
        {qrData ? (
          <>
            {/* QR Image */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Image
                  src={qrData.qr}
                  alt="Código QR dinámico"
                  width={200}
                  height={200}
                  className="rounded-lg border-2 border-white/20"
                />
                {/* Overlay cuando está generando nuevo QR */}
                {isGenerating && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <div className="text-white text-sm">Generando...</div>
                  </div>
                )}
              </div>
            </div>

            {/* Timer */}
            <div className="mb-4">
              <div className="text-gray-400 text-sm mb-1">Expira en:</div>
              <div
                className={`text-2xl font-bold ${
                  timeLeft <= 30 ? "text-red-400" : "text-green-400"
                }`}
              >
                {formatTime(timeLeft)}
              </div>
              {timeLeft <= 30 && (
                <div className="text-red-400 text-xs mt-1">
                  ¡QR por expirar! Se renovará automáticamente
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="text-xs text-gray-400 space-y-1">
              <div>Usuario: {qrData.usuario.nombre}</div>
              <div>ID: {qrData.usuario.id}</div>
            </div>
          </>
        ) : (
          // Loading state
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-32 h-32 bg-gray-700 rounded-lg animate-pulse mb-4"></div>
            <div className="text-gray-400 text-sm">Generando código QR...</div>
          </div>
        )}

        {/* Manual Refresh Button */}
        <button
          onClick={generateNewQR}
          disabled={isGenerating}
          className="w-full mt-4 bg-variable-collection-botones hover:bg-variable-collection-botones/90 disabled:bg-gray-600 text-white font-bold rounded-lg h-12 transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          {isGenerating ? "Generando..." : "Generar Nuevo QR"}
        </button>
      </div>
    </div>
  );
}
