import { NextRequest, NextResponse } from "next/server";
import { requireProjectLeaderOrAdmin } from "@/lib/auth/projectAuth";
import { getProjectIdBySlug, updateContentMarkdown } from "@/repositories/projects/projects.repositories";
import supabaseStorage, { PROJECT_MEDIA_BUCKET } from "@/lib/supabaseStorage";
import { MAX_MARKDOWN_BYTES, hasMarkdownExtension, isValidMarkdownBuffer } from "@/lib/uploadValidation";

// Reemplazo completo del contenido de la pagina: el lider/admin sube un .md que
// reemplaza todo lo anterior (sin editor WYSIWYG).
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const projectId = await getProjectIdBySlug(slug);
    if (!projectId) {
      return NextResponse.json({ success: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    const auth = await requireProjectLeaderOrAdmin(request, projectId);
    if (auth instanceof NextResponse) return auth;

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "Falta el archivo .md" }, { status: 400 });
    }
    if (!hasMarkdownExtension(file.name)) {
      return NextResponse.json({ success: false, error: "El archivo debe tener extension .md o .markdown" }, { status: 400 });
    }
    if (file.size > MAX_MARKDOWN_BYTES) {
      return NextResponse.json({ success: false, error: "El archivo supera el limite de 2MB" }, { status: 400 });
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!isValidMarkdownBuffer(bytes)) {
      return NextResponse.json({ success: false, error: "El archivo no es texto UTF-8 valido" }, { status: 400 });
    }

    const path = `projects/${slug}/content.md`;
    const { error: uploadError } = await supabaseStorage.storage
      .from(PROJECT_MEDIA_BUCKET)
      .upload(path, bytes, { contentType: "text/markdown", upsert: true });

    if (uploadError) {
      console.error("Error uploading content.md:", uploadError);
      return NextResponse.json({ success: false, error: "Failed to upload content" }, { status: 502 });
    }

    const markdown = new TextDecoder("utf-8").decode(bytes);
    const project = await updateContentMarkdown(slug, markdown, path);

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("Error replacing project content:", error);
    return NextResponse.json({ success: false, error: "Failed to replace content" }, { status: 500 });
  }
}
