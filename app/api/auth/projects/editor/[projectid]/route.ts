import { requireAuth } from "@/lib/auth/require-auth";
import prisma from "@/lib/postgresDriver";
import { supabaseAdmin, supabaseClient } from "@/lib/supabase/supabase";
import { normalizeSpace } from "@/lib/utils/normalize.space";
import { NextRequest, NextResponse } from "next/server";
const supabase = supabaseAdmin;
export async function POST(
  request: NextRequest,
  { params }: { params: { projectid: string } },
) {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📥 REQUEST RECIBIDO");
  console.log("🍪 Todas las cookies:", request.cookies.getAll());
  console.log(
    "🔑 auth_token específico:",
    request.cookies.get("auth_token")?.value,
  );
  console.log("🔐 CSRF header:", request.headers.get("x-csrf-token"));
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  // Token que viste en los logs:
  const token = request.cookies.get("auth_token")?.value;
  // Decodificar la parte del payload (segunda parte)
  const payload = JSON.parse(atob(token!.split(".")[1]));
  console.log(payload);

  // Ver si ya expiró
  const now = Math.floor(Date.now() / 1000);
  console.log("Ahora:", now);
  console.log("Expira:", payload.exp);
  console.log("¿Expirado?", now > payload.exp);

  const user = await requireAuth(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectid } = await params;
  const formData = await request.formData();
  const content = formData.get("content"); // Esto obtiene el valor del campo "content"
  if (!content)
    return NextResponse.json({ error: "Content is required" }, { status: 400 });

  const project = await prisma.projects.findUnique({
    where: { id: projectid },
  });
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const fileProject = {
    folderName: project.title,
    nameFile: `${project.title}.md`,
    content: content,
  };

  const resultado = await supabase.storage
    .from("devurity")
    .upload(
      `project/${normalizeSpace(fileProject.folderName).toLocaleLowerCase()}/${normalizeSpace(fileProject.nameFile).toLocaleLowerCase()}`,
      fileProject.content,
      {
        upsert: true,
      },
    );

  return NextResponse.json({ resultado });
}
