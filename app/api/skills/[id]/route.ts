import { NextRequest, NextResponse } from "next/server";
import {
  getSkillById,
  updateSkill,
  deleteSkill,
  UpdateSkillData,
} from "@/repositories/skills/skills.repositories";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid skill ID" },
        { status: 400 },
      );
    }

    const skill = await getSkillById(id);

    if (!skill) {
      return NextResponse.json(
        { success: false, error: "Skill not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: skill });
  } catch (error) {
    console.error("Error fetching skill:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch skill" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid skill ID" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { name } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Skill name is required" },
        { status: 400 },
      );
    }

    const updateData: UpdateSkillData = {
      name: name.trim(),
    };

    const updatedSkill = await updateSkill(id, updateData);
    return NextResponse.json({ success: true, data: updatedSkill });
  } catch (error: any) {
    console.error("Error updating skill:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "A skill with this name already exists" },
        { status: 409 },
      );
    }

    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "Skill not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to update skill" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid skill ID" },
        { status: 400 },
      );
    }

    const deletedSkill = await deleteSkill(id);
    return NextResponse.json({
      success: true,
      message: "Skill deleted successfully",
      data: deletedSkill,
    });
  } catch (error: any) {
    console.error("Error deleting skill:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "Skill not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to delete skill" },
      { status: 500 },
    );
  }
}
