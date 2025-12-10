import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/jwt";
import { 
  findByIdWithFullProfile, 
  updateUserProfile,
  findByIdWithRole,
  findByUsername
} from "@/repositories/users/users.repositories";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    // Verificar autenticación
    const cookies = request.headers.get("cookie");
    if (!cookies) {
      return NextResponse.json(
        { error: "No autenticado - Sin cookies" },
        { status: 401 },
      );
    }

    const token = cookies
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { error: "No autenticado - Token no encontrado" },
        { status: 401 },
      );
    }

    // Validar token
    const _decoded = (await validateToken(token)) as { sub: string };

    // Intentar obtener usuario (primero por ID, luego por username si falla)
    let user = null;
    
    // Verificar si el parámetro es un número (ID) o un string (username)
    const isNumericId = /^\d+$/.test(id);
    console.log(`[API] Buscando usuario con parámetro: ${id}, es numérico: ${isNumericId}`);
    
    if (isNumericId) {
      user = await findByIdWithFullProfile(id);
      console.log(`[API] Usuario encontrado por ID:`, user ? "Sí" : "No");
    } else {
      // Intentar buscar por username
      console.log(`[API] Buscando por username: ${id}`);
      const userByUsername = await findByUsername(id);
      console.log(`[API] Usuario encontrado por username:`, userByUsername ? "Sí" : "No", userByUsername);
      if (userByUsername) {
        // Si encontramos el usuario por username, obtener su perfil completo
        user = await findByIdWithFullProfile(userByUsername.id.toString());
        console.log(`[API] Perfil completo obtenido:`, user ? "Sí" : "No");
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    if (!user.is_active) {
      return NextResponse.json({ error: "Cuenta inactiva" }, { status: 403 });
    }

    // Extraer skills del usuario
    const skills = user.user_skills
      .map((userSkill) => userSkill.skills?.name)
      .filter((name): name is string => name !== undefined && name !== null);

    // Helper para encontrar links de plataformas específicas
    const getPlatformLink = (platformName: string) => {
      const platform = user.user_platforms.find(
        (up) => up.platforms?.name.toLowerCase() === platformName.toLowerCase()
      );
      return platform?.link || "";
    };

    const program = user.programs?.name || null;

    // Transform data to match frontend UserData interface
    const userData = {
      id: user.id.toString(),
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      username: user.username || user.email.split("@")[0],
      username_last_changed: user.username_last_changed?.toISOString() || null,
      personal_email: user.personal_email || null,
      role: user.roles?.name || "Member",
      motivation: user.motivation || "",
      bio: user.motivation || "", // Mapping motivation to bio
      semester: user.semester,
      program,
      joined_at: user.joined_at?.toISOString() || null,
      skills: skills,
      working_on: user.user_projects.map((up) => ({
        title: up.projects?.title || "Proyecto",
        link: "#", // Schema doesn't have link for projects
      })),
      social_links: user.user_platforms.map((up) => ({
        label: up.platforms?.name || "Link",
        url: up.link,
        icon: up.platforms?.name.toLowerCase() || "link",
      })),
      github: getPlatformLink("github"),
      website: getPlatformLink("website") || getPlatformLink("portfolio"),
      created_at: null,
    };

    return NextResponse.json({
      user: userData,
    });
  } catch (error) {
    console.error("Error obteniendo datos del usuario:", error);

    if (error instanceof Error) {
      if (
        error.message.includes("invalid signature") ||
        error.message.includes("jwt expired") ||
        error.message.includes("jwt malformed")
      ) {
        return NextResponse.json(
          { error: "Token inválido o expirado" },
          { status: 401 },
        );
      }
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
// Actualiza el perfil de un usuario específico (dinamicamente por ID numérico o username)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Verificar autenticación
    const cookies = request.headers.get("cookie");
    if (!cookies) {
      return NextResponse.json(
        { error: "No autenticado - Sin cookies" },
        { status: 401 }
      );
    }

    const token = cookies
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { error: "No autenticado - Token no encontrado" },
        { status: 401 }
      );
    }

    // Validar token
    const decoded = (await validateToken(token)) as { sub: string };
    const authenticatedUserId = decoded.sub;

    // Resolver el ID del perfil a actualizar (puede ser username o ID numérico)
    let targetUserId: string;
    const isNumericId = /^\d+$/.test(id);
    
    console.log(`[API PUT] Authenticated user: ${authenticatedUserId}, Target: ${id} (numeric: ${isNumericId})`);
    
    if (isNumericId) {
      targetUserId = id;
    } else {
      // Buscar por username
      const userByUsername = await findByUsername(id);
      if (!userByUsername) {
        return NextResponse.json(
          { error: "Usuario no encontrado" },
          { status: 404 }
        );
      }
      targetUserId = userByUsername.id.toString();
    }

    console.log(`[API PUT] Resolved target user ID: ${targetUserId}`);

    // Verificar que el usuario autenticado está actualizando su propio perfil o es admin
    if (authenticatedUserId !== targetUserId) {
      const currentUser = await findByIdWithRole(authenticatedUserId);
      
      if (!currentUser || currentUser.roles.name !== "admin") {
        console.log(`[API PUT] Authorization failed: User ${authenticatedUserId} cannot edit profile ${targetUserId}`);
        return NextResponse.json(
          { error: "No autorizado para modificar este perfil" },
          { status: 403 }
        );
      }
      console.log(`[API PUT] Admin ${authenticatedUserId} editing profile ${targetUserId}`);
    } else {
      console.log(`[API PUT] User editing own profile: ${authenticatedUserId}`);
    }

    // Obtener datos del body
    const body = await request.json();

    console.log("[API PUT /users/[id]] Updating profile for user:", targetUserId, "with data:", body);

    // Actualizar perfil usando el repositorio
    try {
      await updateUserProfile(targetUserId, body);
      
      return NextResponse.json({
        success: true,
        message: "Perfil actualizado correctamente",
      });
    } catch (updateError) {
      // Errores específicos de updateUserProfile
      if (updateError instanceof Error) {
        throw updateError; // Re-lanzar para que sea capturado por el catch principal
      }
      throw new Error("Error desconocido al actualizar perfil");
    }
    // Debugging info
  } catch (error) {
    console.error("Error actualizando perfil del usuario:", error);

    if (error instanceof Error) {
      // Errores de validación específicos
      if (error.message.includes("Username can only be changed once per week")) {
        return NextResponse.json(
          { error: error.message, field: "username" },
          { status: 400 }
        );
      }
      
      if (error.message.includes("Username is already taken")) {
        return NextResponse.json(
          { error: "Este nombre de usuario ya está en uso", field: "username" },
          { status: 409 }
        );
      }
      
      if (error.message.includes("Username must be")) {
        return NextResponse.json(
          { error: error.message, field: "username" },
          { status: 400 }
        );
      }
      
      if (error.message.includes("Skill") && error.message.includes("does not exist")) {
        return NextResponse.json(
          { error: error.message, field: "skills" },
          { status: 400 }
        );
      }

      if (error.message.includes("Programa") && error.message.includes("no existe")) {
        return NextResponse.json(
          { error: error.message, field: "program" },
          { status: 400 }
        );
      }
      
      // Errores de token
      if (
        error.message.includes("invalid signature") ||
        error.message.includes("jwt expired") ||
        error.message.includes("jwt malformed")
      ) {
        return NextResponse.json(
          { error: "Token inválido o expirado" },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
