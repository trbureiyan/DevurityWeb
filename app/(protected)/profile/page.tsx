"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileRedirectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function redirectToUserProfile() {
      try {
        // Obtener datos del usuario autenticado
        const response = await fetch("/api/auth/profile");

        if (!response.ok) {
          throw new Error("No se pudo obtener la información del usuario");
        }

        const data = await response.json();

        if (data.user) {
          // Obtener datos completos del usuario para obtener el ID
          const userResponse = await fetch("/api/auth/users/me");

          if (userResponse.ok) {
            const userData = await userResponse.json();
            router.push(`/profile/${userData.user.id}`);
          } else {
            // Si no podemos obtener el ID, mostrar error
            setError("No se pudo determinar tu perfil");
            setLoading(false);
          }
        } else {
          setError("Usuario no autenticado");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error redirigiendo al perfil:", err);
        setError("Error al cargar el perfil");
        setLoading(false);
      }
    }

    redirectToUserProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-variable-collection-fondo flex items-center justify-center">
        <div className="text-white text-xl">Redirigiendo a tu perfil...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-variable-collection-fondo flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-variable-collection-botones text-white px-6 py-2 rounded-lg hover:bg-variable-collection-botones/90 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }
}
