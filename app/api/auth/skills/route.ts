import { getAllSkills } from "@/repositories/skills/skills.repositories";
import { errorRequest } from "@/lib/error";

export async function GET() {
  try {
    const skills = await getAllSkills();

    return new Response(
      JSON.stringify({
        skills: skills.map((skill) => ({ id: skill.id, name: skill.name })),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error fetching skills:", error);
    return new Response(
      JSON.stringify(
        errorRequest("skills", "Error al obtener las habilidades"),
      ),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
