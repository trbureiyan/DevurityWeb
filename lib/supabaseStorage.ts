import { createClient } from "@supabase/supabase-js";

// Singleton pattern: mismo enfoque que lib/postgresDriver.ts, evita crear un cliente
// nuevo en cada hot-reload (dev) o invocación serverless.
// Servidor unicamente: usa la service-role key, nunca se expone al navegador.
// Todas las subidas/borrados pasan por rutas API de Next (CSRF + auth en servidor);
// las lecturas publicas usan directamente la URL publica del bucket, sin SDK en cliente.
const globalForSupabase = globalThis as unknown as {
  supabaseStorage: ReturnType<typeof createClient>;
};

const supabaseStorage =
  globalForSupabase.supabaseStorage ??
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

if (process.env.NODE_ENV !== "production") {
  globalForSupabase.supabaseStorage = supabaseStorage;
}

export default supabaseStorage;

export const PROJECT_MEDIA_BUCKET = "project-media";

export function getPublicMediaUrl(path: string, bucket: string = PROJECT_MEDIA_BUCKET): string {
  return supabaseStorage.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
