"use client";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-variable-collection-fondo py-12">
      <div className="container mx-auto px-6">
        <p className="text-white">Bienvenido {user?.name}</p>
      </div>
    </div>
  );
}
