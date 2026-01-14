import prisma from "@/lib/postgresDriver";
import { supabaseAdmin, supabaseClient } from "@/lib/supabase/supabase";
import { normalizeSpace } from "@/lib/utils/normalize.space";
import { NextRequest, NextResponse } from "next/server";
const supabase = supabaseAdmin;
export async function POST(
  request: NextRequest,
  { params }: { params: { projectid: string } },
) {
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
