import { NextRequest, NextResponse } from "next/server";
import { requireProjectLeaderOrAdmin } from "@/lib/auth/projectAuth";
import { getProjectIdBySlug, updateBannerPath } from "@/repositories/projects/projects.repositories";
import supabaseStorage, { PROJECT_MEDIA_BUCKET } from "@/lib/supabaseStorage";
import { MAX_BANNER_BYTES, sniffImage } from "@/lib/uploadValidation";

// Reemplazo completo del banner: nombre de archivo deterministico (projects/{slug}/banner.<ext>),
// upsert:true para que la nueva subida sobreescriba la anterior.
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
      return NextResponse.json({ success: false, error: "Falta el archivo de banner" }, { status: 400 });
    }
    if (file.size > MAX_BANNER_BYTES) {
      return NextResponse.json({ success: false, error: "La imagen supera el limite de 5MB" }, { status: 400 });
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const sniffed = sniffImage(bytes);
    if (!sniffed) {
      return NextResponse.json(
        { success: false, error: "Formato de imagen no soportado (usa PNG, JPEG, WEBP o GIF)" },
        { status: 400 },
      );
    }

    const path = `projects/${slug}/banner.${sniffed.extension}`;
    const { error: uploadError } = await supabaseStorage.storage
      .from(PROJECT_MEDIA_BUCKET)
      .upload(path, bytes, { contentType: sniffed.mime, upsert: true });

    if (uploadError) {
      console.error("Error uploading banner:", uploadError);
      return NextResponse.json({ success: false, error: "Failed to upload banner" }, { status: 502 });
    }

    const project = await updateBannerPath(slug, path);
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("Error replacing project banner:", error);
    return NextResponse.json({ success: false, error: "Failed to replace banner" }, { status: 500 });
  }
}
