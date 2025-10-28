import { NextRequest, NextResponse } from "next/server";
import {
  getAllSkills,
  createSkill,
} from "@/repositories/skills/skills.repositories";

export async function GET(request: NextRequest) {
  try {
    const skills = await getAllSkills();
    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch skills" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Skill name is required" },
        { status: 400 },
      );
    }

    const newSkill = await createSkill({ name: name.trim() });
    return NextResponse.json(
      { success: true, data: newSkill },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error creating skill:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "A skill with this name already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to create skill" },
      { status: 500 },
    );
  }
}
