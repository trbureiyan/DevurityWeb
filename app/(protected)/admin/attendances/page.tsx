"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

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
  const [cameraActive, setCameraActive] = useState(false);
  const [waitingForPermission, setWaitingForPermission] = useState(false);
  const [availableCameras, setAvailableCameras] = useState<string[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>("");
  const [showCameraSelector, setShowCameraSelector] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const handleScan = useCallback(
    async (decodedText: string) => {
      // Prevent multiple simultaneous scans
      if (scanning) {
        console.log("Scan already in progress, skipping...");
        return;
      }

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

        try {
          try {
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
            console.error("Error during fetch:", err);
            setError("Error de conexión al registrar asistencia");
          } finally {
            setScanning(false);
          }
        } catch (err) {
          console.error("Error scanning QR:", err);
          setError("Error interno del servidor");
          setScanning(false);
        }
      } catch (err) {
        console.error("Error scanning QR:", err);
        setError("Error interno del servidor");
        setScanning(false);
      }
    },
    [scanning],
  );

  const stopScanner = useCallback(() => {
    if (scannerRef.current) {
      try {
        scannerRef.current.stop().catch((err) => {
          console.log("Error stopping scanner:", err);
        });
      } catch {
        console.log("Scanner already stopped");
      }
      scannerRef.current = null;
    }
    setScanning(false);
    setCameraActive(false);
  }, []);

  const getAvailableCameras = useCallback(async () => {
    try {
      // Get available cameras - this may trigger permission dialog in some browsers
      const devices = await Html5Qrcode.getCameras();
      console.log("Available cameras found:", devices?.length || 0);
      console.log("Camera devices:", devices);

      if (devices && devices.length > 0) {
        const cameraIds = devices.map((device) => device.id);
        setAvailableCameras(cameraIds);
        if (!selectedCameraId && cameraIds.length > 0) {
          setSelectedCameraId(cameraIds[0]);
        }
        return cameraIds; // Return camera IDs for further processing
      } else {
        // No cameras found initially - this is normal before permission is granted
        console.log(
          "No cameras found initially - waiting for permission dialog...",
        );
        return [];
      }
    } catch (error) {
      console.error("Error getting cameras:", error);
      if (error instanceof Error && error.name === "NotAllowedError") {
        setCameraError(
          "Permiso de cámara denegado. Por favor, permite el acceso a la cámara cuando el navegador lo solicite.",
        );
      } else {
        setCameraError("Error al acceder a las cámaras: " + error);
      }
      return [];
    }
  }, [selectedCameraId]);

  const startScanner = useCallback(async () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }

    setCameraError("");
    setScanning(false);
    setError("");
    setSuccess("");
    setDuplicateInfo(null);
    setLastScanned(null);

    // Get available cameras first and wait for the result
    const cameras = await getAvailableCameras();

    if (cameras.length === 0) {
      // This is normal - cameras may not be detected until after permission is granted
      console.log(
        "No cameras detected before permission - proceeding with scanner initialization...",
      );
    }

    console.log(
      "Starting scanner with camera:",
      selectedCameraId,
      "Available cameras:",
      cameras.length,
    );

    // Ensure we have a valid selected camera
    if (!selectedCameraId || !cameras.includes(selectedCameraId)) {
      setSelectedCameraId(cameras[0]);
    }

    setWaitingForPermission(true);
    setCameraError("");

    // Clear any previous scanner container content
    const readerElement = document.getElementById("reader");
    if (readerElement) {
      // SEGURIDAD: Usar replaceChildren() en lugar de innerHTML para evitar riesgos XSS
      readerElement.replaceChildren();
    }

    try {
      const scanner = new Html5Qrcode("reader", {
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        verbose: true, // Enable verbose for debugging
      });
      scannerRef.current = scanner;

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        videoConstraints: {
          deviceId: selectedCameraId ? { exact: selectedCameraId } : undefined,
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
          facingMode: "environment",
          frameRate: { ideal: 30, min: 15 },
        },
      };

      console.log("Starting scanner with config:", config);

      // This is where the browser will show the permission dialog
      await scanner.start(
        selectedCameraId || { facingMode: "environment" },
        config,
        async (decodedText) => {
          console.log("QR detected:", decodedText.substring(0, 50) + "...");
          await handleScan(decodedText);
        },
        (errorMessage) => {
          // Errores de escaneo silenciosos mientras busca QR
          console.log("Scanner error (normal):", errorMessage);
        },
      );

      console.log("Scanner started successfully");
      setCameraActive(true);
      setWaitingForPermission(false);

      // Check camera status after permission is granted
      setTimeout(async () => {
        try {
          // Re-check available cameras after permission
          const devices = await Html5Qrcode.getCameras();
          console.log("Cameras after permission:", devices?.length || 0);

          const videoElement = document.querySelector("#reader video");
          if (videoElement) {
            console.log("Video element found:", videoElement);
            console.log(
              "Video dimensions:",
              videoElement.clientWidth,
              "x",
              videoElement.clientHeight,
            );
            console.log(
              "Video src:",
              (videoElement as HTMLVideoElement).srcObject,
            );

            // Check if video is actually playing
            const video = videoElement as HTMLVideoElement;
            if (video.videoWidth > 0 && video.videoHeight > 0) {
              console.log("Video is playing successfully");
            } else {
              console.log("Video element exists but not playing");
              // Try to restart scanner if video isn't playing
              setTimeout(() => {
                if (!video.videoWidth && !video.videoHeight) {
                  console.log("Video still not playing - attempting restart");
                  handleRetry();
                }
              }, 2000);
            }
          } else {
            console.log("No video element found in reader container");
            // If no video element after permission, try restart
            setTimeout(() => {
              const stillNoVideo = document.querySelector("#reader video");
              if (!stillNoVideo) {
                console.log("Still no video - attempting restart");
                handleRetry();
              }
            }, 1500);
          }
        } catch (error) {
          console.error("Error checking camera status:", error);
        }
      }, 1500);
    } catch (err) {
      console.error("Error initializing scanner:", err);
      let errorMessage = "No se pudo acceder a la cámara. ";

      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          errorMessage +=
            "Permiso de cámara denegado. Por favor, recarga la página y haz clic en 'Iniciar Cámara (Solicitar Permiso)' nuevamente. Cuando el navegador muestre el diálogo, selecciona 'Permitir' o 'Allow' para dar acceso a la cámara.";
        } else if (err.name === "NotFoundError") {
          errorMessage += "No se encontró ninguna cámara disponible.";
        } else if (err.name === "NotSupportedError") {
          errorMessage += "Tu navegador no soporta el acceso a la cámara.";
        } else {
          errorMessage += "Error: " + err.message;
        }
      } else {
        errorMessage += "Error desconocido: " + err;
      }

      setCameraError(errorMessage);
      setCameraActive(false);
      setWaitingForPermission(false);

      // If it's a permission error, provide clearer instructions
      if (err instanceof Error && err.name === "NotAllowedError") {
        setTimeout(() => {
          setCameraError(
            "Permiso de cámara denegado. Por favor, recarga la página y cuando hagas clic en 'Iniciar Cámara', selecciona 'Permitir' en el diálogo del navegador.",
          );
        }, 500);
      } else if (err instanceof Error && err.name === "NotFoundError") {
        // If no cameras found after permission, suggest checking device
        setTimeout(() => {
          setCameraError(
            "No se encontraron cámaras disponibles después de conceder permisos. Verifica que tu dispositivo tenga cámara y que no esté siendo usada por otra aplicación.",
          );
        }, 500);
      }
    }
  }, [handleScan, selectedCameraId, getAvailableCameras]);

  const handleRetry = useCallback(async () => {
    setError("");
    setSuccess("");
    setDuplicateInfo(null);
    setLastScanned(null);
    setCameraError("");
    setWaitingForPermission(false);

    // Clear any existing scanner first
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (err) {
        console.log("Error stopping existing scanner:", err);
      }
      scannerRef.current = null;
    }

    // Clear the reader container
    const readerElement = document.getElementById("reader");
    if (readerElement) {
      // SEGURIDAD: Usar replaceChildren() en lugar de innerHTML para evitar riesgos XSS
      readerElement.replaceChildren();
    }

    // Small delay to ensure cleanup is complete and browser is ready
    setTimeout(() => {
      startScanner();
    }, 800);
  }, [startScanner]);

  const toggleCameraSelector = useCallback(() => {
    setShowCameraSelector(!showCameraSelector);
  }, [showCameraSelector]);

  const handleCameraChange = useCallback(
    (cameraId: string) => {
      setSelectedCameraId(cameraId);
      setShowCameraSelector(false);
      if (cameraActive) {
        // Reiniciar escáner con la nueva cámara seleccionada
        setTimeout(() => {
          startScanner();
        }, 100);
      }
    },
    [cameraActive, startScanner],
  );

  useEffect(() => {
    // No iniciar automáticamente - esperar que el usuario haga clic
    return () => {
      stopScanner();
    };
  }, [stopScanner]);

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
        <div className="bg-[#1A1515] border border-[#2E2E2E] rounded-lg p-4 sm:p-6 mb-6">
          <div className="flex flex-col gap-4 mb-6">
            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-2xl font-semibold text-white mb-1">
                Escanear QR
              </h2>
              <p className="text-gray-400 text-sm">
                Escanea los códigos QR para registrar asistencia
              </p>
            </div>

            {/* Botones principales - Grid responsivo */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={startScanner}
                disabled={waitingForPermission}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-3 py-3 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {waitingForPermission
                  ? "Esperando permiso..."
                  : "Iniciar Cámara"}
              </button>
              <div className="relative">
                <button
                  onClick={toggleCameraSelector}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-3 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 w-full"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                  <span className="hidden xs:inline">Seleccionar Cámara</span>
                </button>

                {showCameraSelector && availableCameras.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#1A1515] border border-[#2E2E2E] rounded-lg shadow-lg z-10 max-h-32 overflow-y-auto">
                    {availableCameras.map((cameraId, index) => (
                      <button
                        key={cameraId}
                        onClick={() => handleCameraChange(cameraId)}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-600 transition-colors ${
                          selectedCameraId === cameraId
                            ? "bg-blue-700 text-white"
                            : "text-gray-300"
                        }`}
                      >
                        Cámara {index + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={stopScanner}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-3 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                  />
                </svg>
                <span className="hidden xs:inline">Detener</span>
              </button>
              <button
                onClick={handleRetry}
                className="bg-variable-collection-botones text-white px-3 py-3 sm:px-4 sm:py-2 rounded-lg hover:bg-variable-collection-botones/90 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="hidden xs:inline">Reiniciar</span>
              </button>
            </div>

            {/* Indicador de cámara activa */}
            {cameraActive && (
              <div className="text-center">
                <p className="text-green-400 text-sm font-medium">
                  📸 Cámara{" "}
                  {selectedCameraId
                    ? `#${availableCameras.indexOf(selectedCameraId) + 1}`
                    : "1"}{" "}
                  activa
                </p>
                {availableCameras.length > 1 && (
                  <p className="text-gray-400 text-xs mt-1">
                    {availableCameras.length} cámaras disponibles
                  </p>
                )}
              </div>
            )}
          </div>

          {cameraError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-red-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <p className="text-red-400 text-sm">{cameraError}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleRetry}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    Reintentar
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    Recargar Página
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* QR Scanner Container */}
          <div className="relative bg-black rounded-lg overflow-hidden">
            <div
              id="reader"
              className="w-full max-w-md mx-auto min-h-[200px] sm:min-h-[300px] bg-black [&_video]:!block [&_video]:!w-full [&_video]:!h-auto [&_video]:!object-cover [&_video]:!max-w-full"
            ></div>

            {/* Camera Status Overlay */}
            {!cameraActive && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
                <div className="text-white text-center p-6">
                  {waitingForPermission ? (
                    <>
                      <div className="w-12 h-12 mx-auto mb-3 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-lg font-medium mb-2">
                        Esperando permiso...
                      </p>
                      <p className="text-gray-300 text-sm mb-4">
                        Por favor, permite el acceso a la cámara en el diálogo
                        del navegador.
                      </p>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-12 h-12 mx-auto mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p className="text-lg font-medium mb-2">
                        Cámara Inactiva
                      </p>
                      <p className="text-gray-300 text-sm mb-4">
                        Haz clic en &quot;Iniciar Cámara&quot; para comenzar a
                        escanear. El navegador te pedirá permiso para acceder a
                        tu cámara. Por favor, selecciona &quot;Permitir&quot; o
                        &quot;Allow&quot; para continuar. Si no ves el diálogo,
                        verifica la barra de direcciones de tu navegador.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Scanning Indicator - Positioned to not block camera */}
            {scanning && cameraActive && (
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/80 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg flex items-center gap-2 text-xs sm:text-sm">
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                <span className="font-medium">Procesando...</span>
              </div>
            )}

            {/* Camera Frame Overlay */}
            {cameraActive && (
              <div className="absolute inset-0 pointer-events-none border-2 border-white/30 rounded-lg m-4">
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-white"></div>
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-white"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-white"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-white"></div>
              </div>
            )}
          </div>

          <div className="mt-4 text-center">
            <p className="text-blue-400 font-medium text-sm">
              📱 Coloca el código QR dentro del marco
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Usa los botones para controlar la cámara
            </p>
          </div>
        </div>

        {/* Status Messages */}
        <div className="space-y-4">
          {/* Success Message */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
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
                  <p className="text-green-400 font-medium text-lg">
                    {success}
                  </p>
                  {lastScanned && (
                    <div className="mt-3 p-3 bg-green-500/5 rounded-lg border border-green-500/10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-green-300 text-sm">
                        <div>
                          <span className="font-semibold">👤 Usuario:</span>{" "}
                          {lastScanned.usuario}
                        </div>
                        <div>
                          <span className="font-semibold">📧 Correo:</span>{" "}
                          {lastScanned.correo}
                        </div>
                        <div className="sm:col-span-2">
                          <span className="font-semibold">🕒 Hora:</span>{" "}
                          {lastScanned.fecha}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
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
                  <p className="text-red-400 font-medium text-lg">{error}</p>
                  {duplicateInfo && (
                    <div className="mt-3 p-3 bg-red-500/5 rounded-lg border border-red-500/10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-red-300 text-sm">
                        <div>
                          <span className="font-semibold">👤 Usuario:</span>{" "}
                          {duplicateInfo.usuario}
                        </div>
                        <div>
                          <span className="font-semibold">
                            📅 Fecha registrada:
                          </span>{" "}
                          {duplicateInfo.fecha}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-[#1A1515] border border-[#2E2E2E] rounded-lg p-6 mt-6">
          <h3 className="text-white font-semibold mb-4 text-lg">
            📋 Instrucciones de Uso
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Asegúrate de tener buena iluminación
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Mantén el código QR estable frente a la cámara
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Los códigos QR expiran después de 2 minutos
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Cada código solo puede ser usado una vez por día
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
