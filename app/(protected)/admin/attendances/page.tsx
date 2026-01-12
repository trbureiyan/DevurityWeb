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

interface _AttendanceResponse {
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
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [lastScanTime, setLastScanTime] = useState<number>(0);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isStoppingRef = useRef(false);
  const cooldownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const SCAN_COOLDOWN = 3000; // 3 seconds between scans

  // Detiene el scanner evitando race conditions y fugas de recursos.
  const safeStopAndClear = useCallback(async (clearInstance: boolean = true) => {
    if (!scannerRef.current || isStoppingRef.current) return;
    isStoppingRef.current = true;
    try {
      try {
        await scannerRef.current.stop();
      } catch (err) {
        console.log("Scanner stop warning:", err);
      }

      if (clearInstance) {
        try {
          await scannerRef.current.clear();
        } catch (err) {
          console.log("Scanner clear warning:", err);
        }
      }
    } finally {
      setScanning(false);
      setCameraActive(false);
      if (clearInstance) {
        scannerRef.current = null;
      }
      isStoppingRef.current = false;
    }
  }, []);

  const handleScan = useCallback(
    async (decodedText: string) => {
      const now = Date.now();
      
      // Check cooldown period
      if (now - lastScanTime < SCAN_COOLDOWN) {
        console.log("Scan cooldown active, skipping...");
        return;
      }
      
      // Prevent multiple simultaneous scans
      if (scanning) {
        console.log("Scan already in progress, skipping...");
        return;
      }

      setLastScanTime(now);
      setScanning(true);
      setError("");
      setSuccess("");
      setDuplicateInfo(null);
      
      // Start cooldown timer
      setCooldownRemaining(SCAN_COOLDOWN);
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
      }
      cooldownIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - now;
        const remaining = Math.max(0, SCAN_COOLDOWN - elapsed);
        setCooldownRemaining(remaining);
        if (remaining <= 0 && cooldownIntervalRef.current) {
          clearInterval(cooldownIntervalRef.current);
          cooldownIntervalRef.current = null;
        }
      }, 100);
      
      // Pause scanner during processing
      if (scannerRef.current && cameraActive) {
        try {
          await scannerRef.current.pause(true);
        } catch (err) {
          console.log("Could not pause scanner:", err);
        }
      }

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
            // Verificar que tengamos token CSRF
            if (!csrfToken) {
              setError("Token CSRF no disponible. Recargando...");
              setTimeout(() => window.location.reload(), 2000);
              setScanning(false);
              return;
            }
            
            // Registrar asistencia (requiere token CSRF y cookie de sesión)
            const res = await fetch("/api/admin/attendances", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
              },
              credentials: "include",
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
              
              // Resume scanner after delay
              setTimeout(() => {
                if (scannerRef.current && cameraActive) {
                  try {
                    scannerRef.current.resume();
                  } catch (err) {
                    console.log("Could not resume scanner:", err);
                  }
                }
              }, 2000);
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
              
              // Resume scanner after error with delay
              setTimeout(() => {
                if (scannerRef.current && cameraActive) {
                  try {
                    scannerRef.current.resume();
                  } catch (err) {
                    console.log("Could not resume scanner:", err);
                  }
                }
              }, 2000);
            }
          } catch (err) {
            console.error("Error during fetch:", err);
            setError("Error de conexión al registrar asistencia");
            
            // Resume scanner after error
            setTimeout(() => {
              if (scannerRef.current && cameraActive) {
                try {
                  scannerRef.current.resume();
                } catch (err) {
                  console.log("Could not resume scanner:", err);
                }
              }
            }, 2000);
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
    [scanning, lastScanTime, SCAN_COOLDOWN, csrfToken, cameraActive],
  );

  const stopScanner = useCallback(() => {
    void safeStopAndClear();
  }, [safeStopAndClear]);

  // Consulta cámaras disponibles y maneja errores de permisos.
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

  // Inicializa html5-qrcode y configura constraints, incluyendo manejo de permiso.
  const startScanner = useCallback(async () => {
    // Ensure any previous instance is fully stopped before re-initializing
    await safeStopAndClear();

    const readerElement = document.getElementById("reader");
    if (!readerElement) {
      console.error("Scanner element #reader not found; aborting start.");
      setCameraError("No se pudo inicializar la cámara. Intenta recargar la página.");
      return;
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
    readerElement.replaceChildren();

    try {
      const scanner = new Html5Qrcode("reader", {
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        verbose: true, // Enable verbose for debugging
      });
      scannerRef.current = scanner;

      
      const getQrBoxSize = () => {
        const w = Math.min(window.innerWidth, 800);
        // Keep box about 70% of available width but not too small
        const size = Math.max(200, Math.floor(w * 0.7));
        return { width: size, height: size };
      };

      const config = {
        fps: 10,
        qrbox: getQrBoxSize(),
        aspectRatio: 1.0,
        videoConstraints: {
          deviceId: selectedCameraId ? { exact: selectedCameraId } : undefined,
          // On mobile use lower ideal resolution to reduce camera handoffs
          width: { ideal: window.innerWidth > 720 ? 1280 : 640, min: 480 },
          height: { ideal: window.innerWidth > 720 ? 720 : 480, min: 320 },
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

      // Ensure video element has attributes that avoid iOS going fullscreen
      setTimeout(() => {
        try {
          const videoEl = document.querySelector<HTMLVideoElement>("#reader video");
          if (videoEl) {
            // Many browsers require playsInline to avoid fullscreen on iOS Safari
            videoEl.playsInline = true;
            videoEl.setAttribute("playsinline", "true");
            videoEl.muted = true; // allow autoplay without user gesture
            videoEl.setAttribute("muted", "true");
            videoEl.setAttribute("autoplay", "true");
            videoEl.style.objectFit = "cover";
            // Prevent accidental focus from buttons causing layout shift
            videoEl.setAttribute("tabindex", "-1");
          }
        } catch (e) {
          console.warn("Could not set video attributes:", e);
        }
      }, 300);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleScan, selectedCameraId, getAvailableCameras]);

  // Reinicia el flujo completo del escáner tras fallos o cambios.
  const handleRetry = useCallback(async () => {
    setError("");
    setSuccess("");
    setDuplicateInfo(null);
    setLastScanned(null);
    setCameraError("");
    setWaitingForPermission(false);

    // Clear any existing scanner first
    await safeStopAndClear();

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
  }, [startScanner, safeStopAndClear]);

  const toggleCameraSelector = useCallback(() => {
    setShowCameraSelector(!showCameraSelector);
  }, [showCameraSelector]);

  const handleCameraChange = useCallback(
    async (cameraId: string) => {
      setShowCameraSelector(false);
      
      if (!cameraActive) {
        setSelectedCameraId(cameraId);
        return;
      }
      
      // Stop and clear current scanner safely
      await safeStopAndClear();
      
      setCameraActive(false);
      setSelectedCameraId(cameraId);
      
      // Wait a bit then restart with new camera
      setTimeout(() => {
        startScanner();
      }, 300);
    },
    [cameraActive, startScanner, safeStopAndClear],
  );

  // Fetch CSRF token on mount
  useEffect(() => {
    const fetchCsrf = async () => {
      try {
        const response = await fetch("/api/auth/csrf-token", {
          method: "GET",
          credentials: "include",
        });
        
        if (response.ok) {
          const data = await response.json();
          setCsrfToken(data.csrfToken);
          console.log("CSRF token fetched successfully");
        } else {
          console.error("Failed to fetch CSRF token");
        }
      } catch (err) {
        console.error("Error fetching CSRF token:", err);
      }
    };
    
    fetchCsrf();
  }, []);

  useEffect(() => {
    // No iniciar automáticamente - esperar que el usuario haga clic
    // Cleanup: detener escáner y timers al desmontar
    return () => {
      void safeStopAndClear();
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
      }
    };
  }, [safeStopAndClear]);

  // Stop scanner when page is hidden to prevent camera issues on mobile (iOS)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        stopScanner();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [stopScanner]);

  return (
    <div className="min-h-screen bg-variable-collection-fondo p-2 sm:p-4 lg:p-8 font-sans">
      <style jsx global>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          50% { top: 90%; }
          90% { opacity: 1; }
          100% { top: 10%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          #reader {
            min-height: 250px !important;
            max-height: 60vh !important;
          }
          
          #reader video {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
        }
        
        /* Safe area support for iOS */
        @supports (padding: max(0px)) {
          .safe-bottom {
            padding-bottom: max(1rem, env(safe-area-inset-bottom));
          }
        }
      `}</style>
      
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-2 border-b border-[#2E2E2E]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
              Registro de Asistencias
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm">
              Panel de control para escaneo de códigos QR
            </p>
          </div>
          
          {/* Camera Status Badge */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors self-start sm:self-auto ${
            cameraActive 
              ? "bg-green-500/10 border-green-500/20 text-green-400" 
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}>
            <span className={`w-2 h-2 rounded-full ${cameraActive ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></span>
            {cameraActive ? "Cámara Activa" : "Cámara Inactiva"}
          </div>
        </div>

        {/* Main Scanner Card */}
        <div className="relative bg-[#1A1515] border border-[#2E2E2E] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5">
          
          {/* Camera Viewport */}
          <div className="relative aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/9] bg-black overflow-hidden group">
            <div
              id="reader"
              className="w-full h-full [&_video]:w-full [&_video]:h-full [&_video]:object-cover"
            ></div>

            {/* Active State Overlays */}
            {cameraActive && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Darkened edges to focus on center */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]"></div>
                
                {/* Scanning Frame */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 border border-white/20 rounded-xl backdrop-blur-[1px]">
                    {/* Corner Accents */}
                    <div className="absolute -top-0.5 -left-0.5 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-l-4 border-variable-collection-botones rounded-tl-xl"></div>
                    <div className="absolute -top-0.5 -right-0.5 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-r-4 border-variable-collection-botones rounded-tr-xl"></div>
                    <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-l-4 border-variable-collection-botones rounded-bl-xl"></div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-r-4 border-variable-collection-botones rounded-br-xl"></div>
                    
                    {/* Scanning Laser Effect */}
                    {scanning && (
                      <div className="absolute left-2 right-2 h-0.5 bg-variable-collection-botones shadow-[0_0_20px_rgba(202,43,38,0.8)] animate-scan rounded-full"></div>
                    )}
                    
                    {/* Processing Indicator */}
                    {scanning && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/80 backdrop-blur-md px-6 py-3 rounded-xl border border-variable-collection-botones/30 shadow-xl">
                          <div className="flex items-center gap-3">
                            <div className="relative w-5 h-5">
                              <div className="absolute inset-0 border-2 border-variable-collection-botones/30 rounded-full"></div>
                              <div className="absolute inset-0 border-2 border-variable-collection-botones border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <span className="text-sm font-medium text-white">Procesando...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Cooldown Indicator */}
                    {!scanning && cooldownRemaining > 0 && (
                      <div className="absolute -bottom-12 sm:-bottom-14 left-0 right-0 flex justify-center">
                        <div className="bg-amber-500/90 backdrop-blur-md px-4 py-2 rounded-full border border-amber-400/50 shadow-lg">
                          <div className="flex items-center gap-2 text-xs font-medium text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Espera {Math.ceil(cooldownRemaining / 1000)}s</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Helper Text */}
                    <div className="absolute -bottom-8 sm:-bottom-10 left-0 right-0 text-center hidden sm:block">
                      {!scanning && cooldownRemaining === 0 && (
                        <span className="text-xs font-medium text-white/90 bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                          Alinea el código QR dentro del marco
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Inactive State Overlay */}
            {!cameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121212] text-center p-4 sm:p-6 z-10">
                {waitingForPermission ? (
                  <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-500">
                    <div className="relative mx-auto w-12 h-12 sm:w-16 sm:h-16">
                      <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-variable-collection-botones border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-medium text-white mb-1">Solicitando acceso...</p>
                      <p className="text-xs sm:text-sm text-gray-400 max-w-xs mx-auto">
                        Por favor, permite el uso de la cámara en tu navegador para continuar.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-5 max-w-md animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-[#1A1515] rounded-full flex items-center justify-center mx-auto border border-[#2E2E2E] shadow-lg group-hover:border-variable-collection-botones/50 transition-colors duration-300">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500 group-hover:text-variable-collection-botones transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Cámara en espera</h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed px-2">
                        Para registrar asistencias, inicia la cámara y escanea el código QR del usuario.
                      </p>
                    </div>
                    <button
                      onClick={startScanner}
                      disabled={waitingForPermission}
                      className="inline-flex items-center gap-2 bg-variable-collection-botones hover:bg-red-700 disabled:bg-red-900 disabled:opacity-50 text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-900/20 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Iniciar Escáner
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Controls Toolbar - Only visible when camera is active */}
            {cameraActive && (
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 sm:pt-16 flex items-center justify-center gap-3 sm:gap-4 z-20 safe-bottom">
                
                {/* Camera Selector */}
                <div className="relative">
                  <button
                    onClick={toggleCameraSelector}
                    disabled={availableCameras.length <= 1}
                    className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95"
                    title="Cambiar cámara"
                    aria-label="Cambiar cámara"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  
                  {showCameraSelector && availableCameras.length > 0 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 sm:mb-3 w-40 sm:w-48 bg-[#1A1515] border border-[#2E2E2E] rounded-xl shadow-xl overflow-hidden py-1 z-30">
                      {availableCameras.map((cameraId, index) => (
                        <button
                          key={cameraId}
                          onClick={() => handleCameraChange(cameraId)}
                          className={`w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-colors flex items-center gap-2 ${
                            selectedCameraId === cameraId
                              ? "bg-variable-collection-botones/10 text-variable-collection-botones"
                              : "text-gray-300 hover:bg-white/5"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${selectedCameraId === cameraId ? "bg-variable-collection-botones" : "bg-transparent"}`}></span>
                          Cámara {index + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stop Button */}
                <button
                  onClick={stopScanner}
                  className="p-3 sm:p-4 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-500 backdrop-blur-md border border-red-500/30 transition-all hover:scale-105 active:scale-95 ring-4 ring-transparent hover:ring-red-500/10"
                  title="Detener cámara"
                  aria-label="Detener cámara"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Restart Button */}
                <button
                  onClick={handleRetry}
                  className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95"
                  title="Reiniciar escáner"
                  aria-label="Reiniciar escáner"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {cameraError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 sm:p-4 flex items-start gap-2 sm:gap-3 animate-in slide-in-from-top-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-red-400 text-xs sm:text-sm font-medium break-words">{cameraError}</p>
              <div className="mt-2 flex flex-wrap gap-2 sm:gap-3">
                <button onClick={handleRetry} className="text-xs text-red-300 hover:text-white underline">Reintentar</button>
                <button onClick={() => window.location.reload()} className="text-xs text-red-300 hover:text-white underline">Recargar página</button>
              </div>
            </div>
          </div>
        )}

        {/* Status Messages Area */}
        <div className="grid gap-3 sm:gap-4">
          {/* Success Message */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 sm:p-5 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-green-400 font-semibold text-base sm:text-lg mb-1">¡Asistencia Registrada!</h4>
                  <p className="text-green-400/80 text-xs sm:text-sm mb-2 sm:mb-3">{success}</p>
                  
                  {lastScanned && (
                    <div className="bg-[#1A1515] rounded-lg p-3 sm:p-4 border border-green-500/10 grid grid-cols-1 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Usuario</p>
                        <p className="text-white font-medium text-sm sm:text-base truncate">{lastScanned.usuario}</p>
                        <p className="text-gray-400 text-xs sm:text-sm truncate">{lastScanned.correo}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Día y hora de Registro</p>
                        <p className="text-white font-medium text-sm sm:text-base">{lastScanned.fecha}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 sm:p-5 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-red-400 font-semibold text-base sm:text-lg mb-1">Error al registrar</h4>
                  <p className="text-red-400/80 text-xs sm:text-sm mb-2 sm:mb-3 break-words">{error}</p>
                  
                  {duplicateInfo && (
                    <div className="bg-[#1A1515] rounded-lg p-3 sm:p-4 border border-red-500/10">
                      <div className="flex items-center gap-2 text-red-300 text-xs sm:text-sm mb-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Detalles del registro previo:</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm text-gray-300">
                        <p className="truncate"><span className="text-gray-500">Usuario:</span> {duplicateInfo.usuario}</p>
                        <p className="truncate"><span className="text-gray-500">Fecha:</span> {duplicateInfo.fecha}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-[#2E2E2E]">
          <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2E2E2E] flex items-center justify-center text-xs sm:text-sm font-bold text-white flex-shrink-0">1</div>
            <p className="text-xs sm:text-sm">Asegura buena iluminación</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2E2E2E] flex items-center justify-center text-xs sm:text-sm font-bold text-white flex-shrink-0">2</div>
            <p className="text-xs sm:text-sm">Mantén el código estable</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2E2E2E] flex items-center justify-center text-xs sm:text-sm font-bold text-white flex-shrink-0">3</div>
            <p className="text-xs sm:text-sm">QR válido por 2 minutos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
