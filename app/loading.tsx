export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-buttons mx-auto"></div>
        <p className="mt-4 text-foreground/60">Cargando...</p>
      </div>
    </div>
  );
}
