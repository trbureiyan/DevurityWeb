"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

interface QRData {
  userId: string;
  timestamp: number;
  token: string;
  expiresAt: number;
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

const SCAN_COOLDOWN = 3000; // ms

export default function AttendancesPage() {
  const [scanning, setScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [duplicateInfo, setDuplicateInfo] = useState<DuplicateInfo | null>(
    null,
  );
  const [lastScanned, setLastScanned] = useState<LastScanned | null>(null);
  const [csrfToken, setCsrfToken] = useState("");
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const lastScanTimeRef = useRef(0);
  const isStoppingRef = useRef(false);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Detiene y limpia el scanner de forma segura
   */
  const safeStopAndClear = useCallback(async () => {
    if (!scannerRef.current || isStoppingRef.current) return;

    isStoppingRef.current = true;
    try {
      try {
        await scannerRef.current.stop();
      } catch {}
      try {
        await scannerRef.current.clear();
      } catch {}
    } finally {
      scannerRef.current = null;
      setCameraActive(false);
      setScanning(false);
      isStoppingRef.current = false;
    }
  }, []);

  /**
   * Manejo principal del QR
   */
  const handleScan = useCallback(
    async (decodedText: string) => {
      const now = Date.now();

      if (scanning) return;
      if (now - lastScanTimeRef.current < SCAN_COOLDOWN) return;

      lastScanTimeRef.current = now;
      setScanning(true);
      setError("");
      setSuccess("");
      setDuplicateInfo(null);

      setCooldownRemaining(SCAN_COOLDOWN);
      cooldownTimerRef.current = setInterval(() => {
        const remaining = Math.max(0, SCAN_COOLDOWN - (Date.now() - now));
        setCooldownRemaining(remaining);
        if (remaining === 0 && cooldownTimerRef.current) {
          clearInterval(cooldownTimerRef.current);
          cooldownTimerRef.current = null;
        }
      }, 100);

      try {
        const qrData: QRData = JSON.parse(decodedText);

        if (Date.now() > qrData.expiresAt) {
          setError("QR expirado");
          return;
        }

        const res = await fetch("/api/admin/attendances", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          credentials: "include",
          body: JSON.stringify({ qrData }),
        });

        const data = await res.json();

        if (res.ok) {
          setSuccess("Asistencia registrada");
          setLastScanned({
            id: data.id,
            usuario: data.usuario?.nombre ?? "Usuario",
            correo: data.usuario?.correo ?? "",
            fecha: new Date().toLocaleString("es-CO"),
          });
        } else if (res.status === 409) {
          setDuplicateInfo(data);
          setError("Asistencia duplicada");
        } else {
          setError(data.error ?? "Error");
        }
      } catch {
        setError("QR inválido");
      } finally {
        setScanning(false);
      }
    },
    [scanning, csrfToken],
  );

  /**
   * Inicia el scanner
   */
  const startScanner = useCallback(async () => {
    await safeStopAndClear();

    const scanner = new Html5Qrcode("reader", {
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    });

    scannerRef.current = scanner;

    await scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      handleScan,
      () => {},
    );

    setCameraActive(true);
  }, [handleScan, safeStopAndClear]);

  useEffect(() => {
    fetch("/api/auth/csrf-token", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setCsrfToken(d.csrfToken));
  }, []);

  useEffect(() => {
    return () => {
      safeStopAndClear();
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    };
  }, [safeStopAndClear]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Registro de Asistencias</h1>

      <div id="reader" className="w-full max-w-md aspect-square bg-black" />

      <div className="mt-4 flex gap-2">
        <button onClick={startScanner} disabled={cameraActive}>
          Iniciar cámara
        </button>
        <button onClick={safeStopAndClear} disabled={!cameraActive}>
          Detener
        </button>
      </div>

      {cooldownRemaining > 0 && (
        <p>Cooldown: {Math.ceil(cooldownRemaining / 1000)}s</p>
      )}

      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
