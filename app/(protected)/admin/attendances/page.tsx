"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QRData {
  userId: string;
  timestamp: number;
  token: string;
  expiresAt: number;
}

interface AttendanceResponse {
  id: string;
  usuario?: {
    nombre: string;
    correo: string;
  };
}

interface DuplicateInfo {
  fecha: string;
  usuario: string;
}

interface LastScanned {
  id: string;
  usuario: string;
  correo: string;
  fecha: string;
}

export default function AttendancesPage() {
  const _router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [duplicateInfo, setDuplicateInfo] = useState<DuplicateInfo | null>(
    null,
  );
  const [lastScanned, setLastScanned] = useState<LastScanned | null>(null);
  const [cameraError, setCameraError] = useState("");
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const handleScan = useCallback(
    async (decodedText: string) => {
      if (scanning) return;

      setScanning(true);
      setError("");
      setSuccess("");
      setDuplicateInfo(null);

      try {
        // Parsear datos del QR dinámico
        let qrData: QRData;
        try {
          qrData = JSON.parse(decodedText);
        } catch {
          // QR inválido - debe ser JSON
          setError(
            "QR inválido. El usuario debe generar un nuevo código desde su perfil.",
          );
          setScanning(false);
          return;
        }

        // Validar estructura del QR
        if (
          !qrData.userId ||
          !qrData.timestamp ||
          !qrData.token ||
          !qrData.expiresAt
        ) {
          setError("QR inválido - faltan datos requeridos");
          setScanning(false);
          return;
        }

        // Verificar que el QR no haya expirado
        const now = Date.now();
        if (now > qrData.expiresAt) {
          setError("QR expirado. Por favor, genera uno nuevo desde tu perfil.");
          setScanning(false);
          return;
        }

        // Registrar asistencia
        const res = await fetch("/api/admin/attendances", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            qrData: qrData,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setSuccess("¡Asistencia registrada exitosamente!");
          setLastScanned({
            id: data.id || qrData.userId,
            usuario: data.usuario?.nombre || "Usuario",
            correo: data.usuario?.correo || "",
            fecha: new Date().toLocaleString("es-CO", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        } else {
          if (res.status === 409) {
            // Conflicto - asistencia duplicada
            setDuplicateInfo({
              fecha: data.fecha || new Date().toLocaleString("es-CO"),
              usuario: data.usuario || "Usuario",
            });
            setError("Esta asistencia ya fue registrada anteriormente");
          } else {
            setError(data.error || "Error al registrar asistencia");
          }
        }
      } catch (err) {
        console.error("Error scanning QR:", err);
        setError("Error interno del servidor");
      } finally {
        setScanning(false);
      }
    },
    [scanning],
  );

  const stopScanner = useCallback(() => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }
    setScanning(false);
  }, []);

  const startScanner = useCallback(() => {
    if (scannerRef.current) {
      scannerRef.current.clear();
    }

    setCameraError("");
    setScanning(false);

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
      facingMode: { exact: "environment" },
    };

    try {
      const scanner = new Html5QrcodeScanner("reader", config, false);
      scannerRef.current = scanner;

      scanner.render(
        async (decodedText) => {
          if (!scanning) {
            await handleScan(decodedText);
          }
        },
        () => {
          // Errores de escaneo silenciosos mientras busca QR
        },
      );
    } catch (err) {
      console.error("Error initializing scanner:", err);
      setCameraError(
        "No se pudo acceder a la cámara. Asegúrate de permitir el acceso a la cámara.",
      );
    }
  }, [scanning, handleScan]);

  const handleRetry = useCallback(() => {
    setError("");
    setSuccess("");
    setDuplicateInfo(null);
    setLastScanned(null);
    startScanner();
  }, [startScanner]);

  useEffect(() => {
    startScanner();

    return () => {
      stopScanner();
    };
  }, [startScanner, stopScanner]);

  return (
    <div className="min-h-screen bg-variable-collection-fondo p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            Registro de Asistencias
          </h1>
          <p className="text-gray-400">
            Escanea los códigos QR de los usuarios para registrar su asistencia
          </p>
        </div>

        {/* Scanner Section */}
        <div className="bg-[#1A1515] border border-[#2E2E2E] rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-2xl font-semibold text-white">
              Escanear QR
            </h2>
            <button
              onClick={handleRetry}
              className="bg-variable-collection-botones text-white px-4 py-2 rounded-lg hover:bg-variable-collection-botones/90 transition-colors text-sm font-medium"
            >
              Reiniciar Escáner
            </button>
          </div>

          {cameraError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
              <p className="text-red-400 text-sm">{cameraError}</p>
            </div>
          )}

          {/* QR Scanner Container */}
          <div className="relative">
            <div id="reader" className="w-full max-w-md mx-auto"></div>

            {/* Overlay cuando está escaneando */}
            {scanning && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <p className="text-sm">Procesando QR...</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-blue-800 font-medium">
              Coloca el código QR frente a la cámara
            </p>
          </div>
        </div>

        {/* Status Messages */}
        <div className="space-y-4">
          {/* Success Message */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-green-400 font-medium">{success}</p>
                  {lastScanned && (
                    <div className="mt-2 text-green-300 text-sm">
                      <p>
                        <strong>Usuario:</strong> {lastScanned.usuario}
                      </p>
                      <p>
                        <strong>Correo:</strong> {lastScanned.correo}
                      </p>
                      <p>
                        <strong>Hora:</strong> {lastScanned.fecha}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-red-400 font-medium">{error}</p>
                  {duplicateInfo && (
                    <div className="mt-2 text-red-300 text-sm">
                      <p>
                        <strong>Usuario:</strong> {duplicateInfo.usuario}
                      </p>
                      <p>
                        <strong>Fecha registrada:</strong> {duplicateInfo.fecha}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-[#1A1515] border border-[#2E2E2E] rounded-lg p-6 mt-6">
          <h3 className="text-white font-semibold mb-3">Instrucciones:</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>• Asegúrate de tener buena iluminación</li>
            <li>• Mantén el código QR estable frente a la cámara</li>
            <li>• Los códigos QR expiran después de 2 minutos</li>
            <li>• Cada código solo puede ser usado una vez por día</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
