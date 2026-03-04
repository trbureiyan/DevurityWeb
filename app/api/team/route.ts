import { NextResponse } from "next/server";
import { findActiveUsersForTeam } from "@/repositories/users/users.repositories";
import logger from "@/lib/logger";

export const dynamic = "force-dynamic";

// GET /api/team
// Devuelve todos los usuarios activos para la página del equipo

export async function GET() {
  try {
    const users = await findActiveUsersForTeam();
    
    // Transform data for frontend consumption
    const teamMembers = users.map((user) => {
      // Recopilar links de redes sociales desde user_platforms (máximo 3)
      const socialLinks: Array<{ icon: string; url: string; label: string }> = [];
      
      // Agregar plataformas desde user_platforms
      if (user.platforms && user.platforms.length > 0) {
        user.platforms.forEach((platform) => {
          const platformName = platform.name.toLowerCase();
          socialLinks.push({
            icon: platformName,
            url: platform.link,
            label: platform.name
          });
        });
      }
      
      return {
        id: user.id,
        name: `${user.name} ${user.last_name}`,
        username: user.username,
        role: user.role,
        bio: user.motivation || "Miembro del equipo Devurity",
        avatar: undefined, // No hay avatar aun
        skills: user.skills,
        tagline: user.skills.length > 0 
          ? `${user.skills.slice(0, 3).join(" • ")}` 
          : undefined,
        socialLinks: socialLinks.slice(0, 3), // Máximo 3 links
      };
    });

    return NextResponse.json({ 
      success: true, 
      members: teamMembers 
    });
  } catch (error) {
    logger.error("Error fetching team members:", { error });
    return NextResponse.json(
      { 
        success: false, 
        error: "Error al obtener los miembros del equipo" 
      },
      { status: 500 }
    );
  }
}
