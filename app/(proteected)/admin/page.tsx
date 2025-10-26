"use client";
import { useAuth } from "@/hooks/useAuth";

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-variable-collection-fondo py-12">
      <div className="container mx-auto px-6">
        <h1 className="font-orbitron text-3xl text-white mb-6">
          Panel de Administración
        </h1>
        <p className="text-white">Bienvenido administrador: {user?.name}</p>
      </div>
    </div>
  );
}
