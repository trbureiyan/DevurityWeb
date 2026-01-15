import { requireAuth } from "@/lib/auth/require-auth";
import prisma from "@/lib/postgresDriver";
import { supabaseAdmin } from "@/lib/supabase/supabase";
import { normalizeSpace } from "@/lib/utils/normalize.space";
import { NextRequest, NextResponse } from "next/server";
const supabase = supabaseAdmin;
const MAX_SIZE_MD = 1024 * 1024; // 1MB
const ValidExtensions = ["md"];
interface Params {
  projectid: string;
}
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<Params> },
) {
  const user = await requireAuth(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectid } = await params;
  const project = await prisma.projects.findUnique({
    where: {
      id: projectid,
      user_projects: {
        some: {
          user_id: user.userId,
        },
      },
    },
  });
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_SIZE_MD) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  if (!ValidExtensions.includes(file.name.split(".").pop()!)) {
    return NextResponse.json(
      { error: "Invalid file extension" },
      { status: 400 },
    );
  }

  const buffer: ArrayBuffer = await file.arrayBuffer();
  const bytes: Uint8Array = new Uint8Array(buffer);
  if (bytes.includes(0)) {
    return NextResponse.json(
      { error: "File contains null bytes" },
      { status: 400 },
    );
  }
  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid file encoding" },
      { status: 500 },
    );
  }

  const resultado = await supabase.storage
    .from("devurity")
    .upload(
      `projects/${normalizeSpace(project.title.toLocaleLowerCase())}/${normalizeSpace(project.title.toLocaleLowerCase())}.md`,
      text,
      {
        upsert: true,
      },
    );

  //update project
  await prisma.projects.update({
    where: {
      id: project.id,
    },
    data: {
      updated_at: new Date(),
    },
  });

  return NextResponse.json(
    { message: "File uploaded successfully" },
    { status: 200 },
  );
}
