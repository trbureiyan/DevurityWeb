"use client";

import React, { useState, use } from "react";
import Link from "next/link";

export default function RecoveryPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);

  return <RecoveryForm token={token} />;
}

function RecoveryForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || 'Error al actualizar la contraseña');
      } else {
        setSuccess('Contraseña actualizada correctamente.');
      }
    } catch (err) {
      setError('Error de red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1A1616] rounded-2xl p-8">
        <h1 className="text-white font-orbitron text-2xl mb-4">Establecer nueva contraseña</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white block mb-2">Nueva contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#121212] text-white px-4 py-3 rounded border border-white/10"
            />
          </div>
          <div>
            <label className="text-white block mb-2">Confirmar contraseña</label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full bg-[#121212] text-white px-4 py-3 rounded border border-white/10"
            />
          </div>

          {error && <p className="text-red-400">{error}</p>}
          {success && <p className="text-green-400">{success}</p>}

          <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-medium">
            {loading ? 'Procesando...' : 'Cambiar contraseña'}
          </button>
        </form>

        {success && (
          <div className="mt-4 text-sm text-white/70">
            <Link href="/auth/login" className="text-red-500 hover:underline">Ir al login</Link>
          </div>
        )}
      </div>
    </main>
  );
}
