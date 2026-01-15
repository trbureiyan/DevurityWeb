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

  const fileProject = {
    folderName: project.title,
    nameFile: `${project.title}.md`,
    content: content!,
  };

  const resultado = await supabase.storage
    .from("devurity")
    .upload(
      `projects/${normalizeSpace(fileProject.folderName).toLocaleLowerCase()}/${normalizeSpace(fileProject.nameFile).toLocaleLowerCase()}`,
      fileProject.content,
      {
        upsert: true,
      },
    );

  await prisma.projects.update({
    where: {
      id: project.id,
    },
    data: {
      updated_at: new Date(),
    },
  });
  return NextResponse.json({ resultado });
}
