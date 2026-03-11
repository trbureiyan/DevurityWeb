"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IMAGES } from "@/public/images";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const header = document.querySelector('header, [class*="header"]') as HTMLElement | null;
    const footer = document.querySelector('footer, [class*="footer"]') as HTMLElement | null;
    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";
    return () => {
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || 'Error al enviar solicitud');
      } else {
        setMessage(data?.message || 'Si el correo existe, recibirás un enlace para restablecer la contraseña.');
      }
    } catch {
      setError('Error de red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl bg-[#1A1616] rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid lg:grid-cols-2">
          {/* Left visual panel - nice image and messaging */}
          <div className="relative min-h-[320px] lg:min-h-[600px] hidden lg:block">
            <Image src={IMAGES.login.slide1} alt="Recuperar" fill sizes="50vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex flex-col items-start justify-center p-12">
              <h2 className="text-white font-orbitron text-4xl mb-2">Recupera tu acceso</h2>
              <p className="text-white/80 max-w-lg font-ubuntu">
                Ingresa el correo asociado a tu cuenta y te enviaremos un enlace seguro para crear una nueva contraseña.
              </p>
            </div>
          </div>

          {/* Form panel */}
          <div className="p-8 md:p-12 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-[#2A2525] rounded-2xl p-8 md:p-10 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center">
                    <Image src={IMAGES.login.logo} alt="logo" width={32} height={32} />
                  </div>
                  <div>
                    <h1 className="font-orbitron text-2xl text-white -mb-1">Recuperar contraseña</h1>
                    <p className="text-white/70 text-sm">Te ayudamos a recuperar el acceso a tu cuenta</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
                  <div>
                    <label htmlFor="recovery-email" className="text-white font-ubuntu block mb-2">Correo electrónico</label>
                    <div className="relative">
                      <input
                        id="recovery-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className="w-full bg-[#1A1616] text-white font-ubuntu px-5 py-4 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">@</div>
                    </div>
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  {message && <p className="text-green-400 text-sm">{message}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-ubuntu font-bold py-4 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                    ) : (
                      'Enviar enlace de recuperación'
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center text-sm text-white/70">
                  <Link href="/auth/login" className="text-red-500 hover:underline">Volver al inicio de sesión</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
