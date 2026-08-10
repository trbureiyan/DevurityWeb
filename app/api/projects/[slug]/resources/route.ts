import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { requireProjectLeaderOrAdmin } from "@/lib/auth/projectAuth";
import { getProjectIdBySlug } from "@/repositories/projects/projects.repositories";
import { addResource, listResources } from "@/repositories/projects/projectResources.repositories";
import supabaseStorage, { PROJECT_MEDIA_BUCKET } from "@/lib/supabaseStorage";
import { MAX_RESOURCE_BYTES, isPdf, sniffImage } from "@/lib/uploadValidation";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const projectId = await getProjectIdBySlug(slug);
    if (!projectId) {
      return NextResponse.json({ success: false, error: "Proyecto no encontrado" }, { status: 404 });
    }
    const resources = await listResources(projectId);
    return NextResponse.json({ success: true, data: resources });
  } catch (error) {
    console.error("Error listing project resources:", error);
    return NextResponse.json({ success: false, error: "Failed to list resources" }, { status: 500 });
  }
}

function sanitizeFilename(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9.-]/g, "-").slice(-80);
}

// Alta incremental: a diferencia del banner/contenido, nunca reemplaza recursos existentes.
// Acepta imagen/documento (multipart, campo "file") o enlace externo (JSON, kind: "link").
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

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      const url = typeof body.url === "string" ? body.url.trim() : "";
      if (!url) {
        return NextResponse.json({ success: false, error: "url es obligatoria para un recurso tipo enlace" }, { status: 400 });
      }
      try {
        new URL(url);
      } catch {
        return NextResponse.json({ success: false, error: "url invalida" }, { status: 400 });
      }

      const resource = await addResource(projectId, {
        kind: "link",
        title: typeof body.title === "string" ? body.title : null,
        externalUrl: url,
        uploadedBy: BigInt(auth.userId),
      });
      return NextResponse.json({ success: true, data: resource }, { status: 201 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "Falta el archivo" }, { status: 400 });
    }
    if (file.size > MAX_RESOURCE_BYTES) {
      return NextResponse.json({ success: false, error: "El archivo supera el limite de 10MB" }, { status: 400 });
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const sniffedImage = sniffImage(bytes);
    const kind: "image" | "document" = sniffedImage ? "image" : "document";
    const mime = sniffedImage?.mime ?? (isPdf(bytes) ? "application/pdf" : null);

    if (!mime) {
      return NextResponse.json(
        { success: false, error: "Tipo de archivo no soportado (usa imagen o PDF)" },
        { status: 400 },
      );
    }

    const path = `projects/${slug}/resources/${randomUUID()}-${sanitizeFilename(file.name)}`;
    const { error: uploadError } = await supabaseStorage.storage
      .from(PROJECT_MEDIA_BUCKET)
      .upload(path, bytes, { contentType: mime });

    if (uploadError) {
      console.error("Error uploading resource:", uploadError);
      return NextResponse.json({ success: false, error: "Failed to upload resource" }, { status: 502 });
    }

    const title = typeof formData.get("title") === "string" ? (formData.get("title") as string) : file.name;
    const resource = await addResource(projectId, {
      kind,
      title,
      storagePath: path,
      mimeType: mime,
      sizeBytes: file.size,
      uploadedBy: BigInt(auth.userId),
    });

    return NextResponse.json({ success: true, data: resource }, { status: 201 });
  } catch (error) {
    console.error("Error adding project resource:", error);
    return NextResponse.json({ success: false, error: "Failed to add resource" }, { status: 500 });
  }
}
