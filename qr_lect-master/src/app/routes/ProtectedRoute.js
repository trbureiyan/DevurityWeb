"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children, requiredRole }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('userData');
        
        if (!userData) {
          router.push('/login');
          return;
        }

        const { usuario } = JSON.parse(userData);
        const userRole = usuario?.role;

        // Si se requiere un rol específico
        if (requiredRole) {
          if (Array.isArray(requiredRole)) {
            // Si requiredRole es un array, verificar si el rol está incluido
            if (!requiredRole.includes(userRole)) {
              router.push(userRole === 'ADMIN' ? '/asistencias' : '/perfil');
              return;
            }
          } else {
            // Si requiredRole es un string
            if (userRole !== requiredRole) {
              router.push(userRole === 'ADMIN' ? '/asistencias' : '/perfil');
              return;
            }
          }
        }

        setIsAuthorized(true);
        setLoading(false);
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700 mb-4"></div>
          <p className="text-slate-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  return isAuthorized ? children : null;
}