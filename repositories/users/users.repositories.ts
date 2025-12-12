import prisma from "../../lib/postgresDriver";
import logger from "../../lib/logger";
import type { CreateUserDTO, PaginatedUsersResponse } from "../../lib/types/user.types";

function toBigInt(id: string | number): bigint {
  logger.debug("toBigInt: Converting ID:", { id, type: typeof id });
  try {
    const result = BigInt(id);
    logger.debug("toBigInt: Conversion successful:", { result: result.toString() });
    return result;
  } catch (error) {
    logger.error("toBigInt: Error converting ID:", { id, error });
    throw error;
  }
}

// PaginatedUsersResponse imported from lib/types/user.types.ts

// User interface imported from lib/types/user.types.ts

// CreateUserDTO imported from lib/types/user.types.ts
export async function findByEmailWithRole(email: string) {
  return await prisma.users.findUnique({
    where: { email },
    include: {
      roles: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function findByUsername(username: string) {
  logger.debug("findByUsername: Searching for user with username:", username);
  try {
    const user = await prisma.users.findUnique({
      where: { username },
      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
    });
    logger.debug("findByUsername: User found:", !!user);
    return user;
  } catch (error) {
    logger.error("findByUsername: Error finding user:", { username, error });
    throw error;
  }
}

export async function findByIdWithRole(id: string) {
  logger.debug("findByIdWithRole: Searching for user with ID:", id);
  try {
    const bigIntId = toBigInt(id);
    const user = await prisma.users.findUnique({
      where: { id: bigIntId },
      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
    });
    logger.debug("findByIdWithRole: User found:", !!user);
    return user;
  } catch (error) {
    logger.error("findByIdWithRole: Error finding user:", { id, error });
    throw error;
  }
}

export async function findByIdWithSkills(id: string) {
  return await prisma.users.findUnique({
    where: { id: toBigInt(id) },
    include: {
      roles: {
        select: {
          name: true,
        },
      },
      user_skills: {
        include: {
          skills: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function findByIdWithFullProfile(id: string) {
  return await prisma.users.findUnique({
    where: { id: toBigInt(id) },
    select: {
      id: true,
      email: true,
      name: true,
      last_name: true,
      username: true,
      username_last_changed: true,
      personal_email: true,
      motivation: true,
      semester: true,
      program_id: true,
      joined_at: true,
      is_active: true,
      roles: {
        select: {
          name: true,
        },
      },
      programs: {
        select: {
          id: true,
          name: true,
        },
      },
      user_skills: {
        select: {
          skills: {
            select: {
              name: true,
            },
          },
        },
      },
      user_projects: {
        select: {
          projects: {
            select: {
              id: true,
              title: true,
              description: true,
            },
          },
        },
      },
      user_platforms: {
        select: {
          link: true,
          platforms: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function findById(id: string) {
  logger.debug("findById: Searching for user with ID:", id);
  try {
    const bigIntId = toBigInt(id);
    const user = await prisma.users.findUnique({
      where: { id: bigIntId },
      select: {
        id: true,
        name: true,
        email: true,
        last_name: true,
        motivation: true,
        semester: true,
        user_skills: {
          include: {
            skills: {
              select: {
                name: true,
              },
            },
          },
        },
        roles: {
          select: {
            name: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    logger.error("findById: Error:", { id, error });
    throw error;
  }
}
export async function createUser(users: CreateUserDTO) {
  const { name, password, email, last_name, skills, motivation, semester, program } =
    users;
  
  logger.info("[REPO] Creating user:", { name, email, last_name, semester, skillsCount: skills.length });
  
  try {
    return await prisma.$transaction(async (tx) => {
      // 0. Obtener todos los roles disponibles para debugging
      const allRoles = await tx.roles.findMany();
      logger.debug("[REPO] Available roles in database:", { roles: allRoles.map(r => ({ id: r.id.toString(), name: r.name })) });

      // 1. Buscar el rol "member" o similar
      const memberRole = await tx.roles.findFirst({
        where: {
          OR: [
            { name: "user" },
            { name: "User" },
            { name: "member" },
            { name: "Member" },
            { name: "miembro" },
            { name: "Miembro" }
          ]
        }
      });

      if (!memberRole) {
        logger.error("[REPO] No member role found. Available roles:", { availableRoles: allRoles.map(r => r.name) });
        throw new Error("No se encontró un rol válido para usuarios. Contacta al administrador.");
      }
      
      logger.debug("[REPO] Using role:", { id: memberRole.id.toString(), name: memberRole.name });

      // 2. Crear el usuario con username generado automáticamente
      logger.debug("[REPO] Step 1: Creating user record");
      
      // Generar username único basado en email con sufijo aleatorio
      const baseUsername = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
      let username = baseUsername;
      
      // Configuration constants for username generation
      const USERNAME_BATCH_SIZE = 5;
      const MAX_GENERATION_ATTEMPTS = 3;
      
      // Try base username first
      const existingBase = await tx.users.findUnique({ where: { username: baseUsername } });
      
      if (existingBase) {
        // If base username exists, generate batch of candidates with random suffixes
        let found = false;
        
        // Limit attempts to prevent infinite loops
        for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS && !found; attempt++) {
          // Generate multiple unique username candidates with random suffixes
          const candidatesSet = new Set<string>();
          let iterations = 0;
          const MAX_CANDIDATE_ITERATIONS = USERNAME_BATCH_SIZE * 10; // Safety limit
          
          while (candidatesSet.size < USERNAME_BATCH_SIZE && iterations < MAX_CANDIDATE_ITERATIONS) {
            const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            candidatesSet.add(`${baseUsername}${randomSuffix}`);
            iterations++;
          }
          const candidates = Array.from(candidatesSet);
          
          // Batch check all candidates in a single query
          const existing = await tx.users.findMany({
            where: { username: { in: candidates } },
            select: { username: true }
          });
          
          const existingUsernames = new Set(existing.map(u => u.username));
          const available = candidates.find(c => !existingUsernames.has(c));
          
          if (available) {
            username = available;
            found = true;
          }
        }
        
        // Fallback: if still not found (extremely rare), use timestamp + random + unique check
        if (!found) {
          let fallbackFound = false;
          for (let i = 0; i < 10 && !fallbackFound; i++) {
            const timestampSuffix = Date.now().toString().slice(-6);
            const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            const fallbackUsername = `${baseUsername}${timestampSuffix}${randomSuffix}`;
            
            const existingFallback = await tx.users.findUnique({ 
              where: { username: fallbackUsername } 
            });
            
            if (!existingFallback) {
              username = fallbackUsername;
              fallbackFound = true;
            }
          }
          
          // Ultimate fallback if even timestamp+random fails (virtually impossible)
          if (!fallbackFound) {
            username = `${baseUsername}${Date.now()}${Math.floor(Math.random() * 1000000)}`;
          }
        }
      }
      
      logger.debug("[REPO] Generated username:", { username });
      
      // Resolver programa académico
      let programId: bigint | null = null;
      if (program && program.trim().length > 0) {
        const programRecord = await tx.programs.findUnique({ where: { name: program } });

        if (!programRecord) {
          throw new Error(`Programa "${program}" no existe en la base de datos`);
        }

        programId = programRecord.id;
      }

      const nuevoUsuario = await tx.users.create({
        data: {
          name,
          last_name: last_name,
          email,
          password,
          program_id: programId,
          role_id: memberRole.id,
          motivation,
          semester,
          username, // Asignar username automáticamente
          username_last_changed: new Date(), // Establecer fecha inicial
        },
      });
      logger.info("[REPO] User created with ID:", { userId: nuevoUsuario.id.toString(), username });

      // 3. Si hay skills, procesarlas
      if (skills && skills.length > 0) {
        logger.debug("[REPO] Step 2: Processing skills:", { skills });
        
        const skillsDB = await tx.skills.findMany({
          where: {
            name: { in: skills },
          },
          select: { id: true, name: true },
        });
        
        logger.debug("[REPO] Found skills in DB:", { foundCount: skillsDB.length, totalRequested: skills.length });
        
        if (skillsDB.length === 0) {
          logger.warn("[REPO] No matching skills found in database");
          // No lanzar error, continuar sin skills
        } else {
          const foundSkillNames = skillsDB.map(s => s.name);
          const missingSkills = skills.filter(s => !foundSkillNames.includes(s));
          
          if (missingSkills.length > 0) {
            logger.warn("[REPO] Some skills not found:", { missingSkills });
          }

          logger.debug("[REPO] Step 3: Creating user_skills relations");
          await tx.user_skills.createMany({
            data: skillsDB.map((skill) => ({
              user_id: nuevoUsuario.id,
              skill_id: skill.id,
            })),
          });
          logger.debug("[REPO] Created user_skills relations", { count: skillsDB.length });
        }
      } else {
        logger.debug("[REPO] No skills to process");
      }

      logger.info("[REPO] Transaction completed successfully");
      return nuevoUsuario;
    });
  } catch (error) {
    logger.error("[REPO] Error in createUser transaction:", {
      error,
      details: {
        message: error instanceof Error ? error.message : "Unknown error",
        name: error instanceof Error ? error.name : undefined,
        code: typeof error === 'object' && error !== null && 'code' in error ? (error as { code: unknown }).code : undefined,
        meta: typeof error === 'object' && error !== null && 'meta' in error ? (error as { meta: unknown }).meta : undefined,
      }
    });
    throw error;
  }
}

export async function findPasswordByEmail(email: string) {
  const user = await prisma.users.findUnique({
    where: { email },
    select: {
      password: true,
    },
  });
  return user?.password;
}

export async function existUserByEmail(email: string) {
  const user = await prisma.users.findUnique({
    where: { email },
    select: { id: true },
  });
  return !!user;
}

export async function findActiveUsersForTeam() {
  try {
    logger.debug("findActiveUsersForTeam: Starting query");
    
    const users = await prisma.users.findMany({
      where: {
        is_active: true,
      },
      select: {
        id: true,
        name: true,
        last_name: true,
        username: true,
        motivation: true,
        user_skills: {
          include: {
            skills: true,
          },
        },
        roles: true,
        user_platforms: {
          include: {
            platforms: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    logger.debug(`findActiveUsersForTeam: Found ${users.length} users`);

    // Convert BigInt IDs to strings and safely handle relations
    const result = users.map((user) => {
      logger.debug("Processing user:", { 
        id: user.id.toString(), 
        username: user.username,
        hasRoles: !!user.roles,
        skillsCount: user.user_skills?.length ?? 0
      });
      
      return {
        ...user,
        id: user.id.toString(),
        skills: user.user_skills?.map((us) => us.skills?.name ?? 'Unknown') ?? [],
        role: user.roles?.name ?? 'Member',
        platforms: user.user_platforms?.map((up) => ({
          name: up.platforms?.name ?? 'Link',
          link: up.link,
        })) ?? [],
      };
    });

    logger.debug("findActiveUsersForTeam: Completed successfully");
    return result;
  } catch (error) {
    logger.error("findActiveUsersForTeam: Error occurred", { 
      error,
      message: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}

export async function findInactiveUsersWithPagination(
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedUsersResponse> {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.users.findMany({
      where: {
        is_active: false,
      },
      include: {
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
        user_skills: {
          select: {
            skills: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        id: "desc",
      },
    }),
    prisma.users.count({
      where: {
        is_active: false,
      },
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  // Convert BigInt IDs to strings for JSON serialization
  const usersWithStringIds = users.map((user) => ({
    ...user,
    id: user.id.toString(),
    role_id: user.role_id.toString(),
    roles: {
      id: Number(user.roles.id),
      name: user.roles.name,
    },
    username_last_changed: user.username_last_changed?.toISOString() ?? null,
    joined_at: user.joined_at?.toISOString() ?? null,
  }));

  return {
    users: usersWithStringIds,
    total,
    page,
    limit,
    totalPages,
  };
}

export async function activateUser(userId: string): Promise<boolean> {
  try {
    const result = await prisma.users.update({
      where: {
        id: toBigInt(userId),
        is_active: false, // Solo actualizar si está inactivo
      },
      data: {
        is_active: true,
      },
    });
    return !!result;
  } catch (error) {
    logger.error("Error activating user:", { error });
    return false;
  }
}

export async function deleteInactiveUser(userId: string): Promise<boolean> {
  try {
    // Usar transacción para asegurar que todas las dependencias se eliminen correctamente
    await prisma.$transaction(async (tx) => {
      // Eliminar relaciones primero
      await tx.user_skills.deleteMany({
        where: { user_id: toBigInt(userId) },
      });

      await tx.user_platforms.deleteMany({
        where: { user_id: toBigInt(userId) },
      });

      await tx.user_projects.deleteMany({
        where: { user_id: toBigInt(userId) },
      });

      await tx.attendances.deleteMany({
        where: { user_id: toBigInt(userId) },
      });

      // Finalmente eliminar el usuario
      await tx.users.delete({
        where: {
          id: toBigInt(userId),
          is_active: false, // Solo eliminar usuarios inactivos
        },
      });
    });
    return true;
  } catch (error) {
    logger.error("Error deleting inactive user:", { error });
    return false;
  }
}

export interface UpdateUserProfileData {
  bio?: string;
  username?: string;
  personal_email?: string;
  skills?: string[];
  program?: string | null;
  working_on?: Array<{ title: string; link: string }>;
  social_links?: Array<{ label: string; url: string; icon: string }>;
  github?: string;
}

// Helper function to sanitize username
function sanitizeUsername(username: string): string {
  return username
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]/g, '') // Solo letras, números, guiones y guiones bajos
    .slice(0, 30); // Máximo 30 caracteres
}

// Helper function to validate username
function isValidUsername(username: string): boolean {
  const sanitized = sanitizeUsername(username);
  if (sanitized.length < 3) return false; // Mínimo 3 caracteres
  if (sanitized.length > 30) return false; // Máximo 30 caracteres
  if (!/^[a-z0-9]/.test(sanitized)) return false; // Debe empezar con letra o número
  if (!/[a-z0-9]$/.test(sanitized)) return false; // Debe terminar con letra o número
  return true;
}

// Helper function to validate and normalize URLs
function validateAndNormalizeUrl(url: string, label: string): string {
  if (!url || url.trim().length === 0) {
    throw new Error(`URL vacía para ${label}`);
  }

  const trimmed = url.trim();
  
  // If it already has a protocol, validate it
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      new URL(trimmed);
      return trimmed;
    } catch {
      throw new Error(`URL inválida para ${label}: ${trimmed}`);
    }
  }
  
  // If it starts with www. or looks like a domain, add https://
  if (/^(www\.|[a-z0-9-]+\.[a-z]{2,})/i.test(trimmed)) {
    const withProtocol = `https://${trimmed}`;
    try {
      new URL(withProtocol);
      return withProtocol;
    } catch {
      throw new Error(`URL inválida para ${label}: ${trimmed}`);
    }
  }
  
  // For short strings without dots, they might be usernames or handles
  // Require proper URL format
  if (trimmed.length >= 3 && !trimmed.includes('.')) {
    throw new Error(`URL debe incluir un dominio válido para ${label}. Recibido: "${trimmed}". Ejemplo: midominio.com o https://midominio.com`);
  }
  
  // Last attempt: add https:// and validate
  const withProtocol = `https://${trimmed}`;
  try {
    new URL(withProtocol);
    return withProtocol;
  } catch {
    throw new Error(`Formato de URL inválido para ${label}. Recibido: "${trimmed}". Debe ser una URL válida como https://ejemplo.com`);
  }
}

export async function updateUserProfile(
  userId: string,
  data: UpdateUserProfileData
): Promise<boolean> {
  try {
    const userIdBigInt = toBigInt(userId);

    await prisma.$transaction(async (tx) => {
      // 1. Update basic info (bio -> motivation, username, personal_email)
      const updateData: Record<string, unknown> = {};
      
      if (data.bio !== undefined) {
        updateData.motivation = data.bio;
      }
      
      if (data.personal_email !== undefined) {
        updateData.personal_email = data.personal_email;
      }

      if (data.program !== undefined) {
        const programName = data.program?.trim() || "";

        if (!programName) {
          updateData.program_id = null;
        } else {
          const programRecord = await tx.programs.findUnique({ where: { name: programName } });

          if (!programRecord) {
            throw new Error(`Programa "${programName}" no existe en la base de datos`);
          }

          updateData.program_id = programRecord.id;
        }
      }
      
      // 2. Handle username change with validation and 1-week delay
      if (data.username !== undefined) {
        // Sanitize username
        const sanitizedUsername = sanitizeUsername(data.username);
        
        // Validate username format
        if (!isValidUsername(sanitizedUsername)) {
          throw new Error("Username must be 3-30 characters, start and end with letter/number, and contain only letters, numbers, hyphens, and underscores");
        }
        
        const currentUser = await tx.users.findUnique({
          where: { id: userIdBigInt },
          select: { username: true, username_last_changed: true },
        });

        // Check if username is actually changing
        if (currentUser?.username === sanitizedUsername) {
          // Username hasn't changed, skip validation
          logger.debug("Username unchanged, skipping validation", { username: sanitizedUsername });
        } else {
          // Check if username can be changed (1 week = 604800000 ms)
          if (currentUser?.username_last_changed) {
            const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            if (currentUser.username_last_changed > oneWeekAgo) {
              const nextChangeDate = new Date(currentUser.username_last_changed.getTime() + 7 * 24 * 60 * 60 * 1000);
              throw new Error(`Username can only be changed once per week. Next change available: ${nextChangeDate.toLocaleDateString()}`);
            }
          }

          // Check if username is already taken
          const existingUser = await tx.users.findUnique({
            where: { username: sanitizedUsername },
          });

          if (existingUser && existingUser.id !== userIdBigInt) {
            throw new Error("Username is already taken");
          }

          updateData.username = sanitizedUsername;
          updateData.username_last_changed = new Date();
        }
      }

      // Apply basic updates if any
      if (Object.keys(updateData).length > 0) {
        await tx.users.update({
          where: { id: userIdBigInt },
          data: updateData,
        });
      }

      // 3. Update Skills
      if (data.skills && Array.isArray(data.skills)) {
        await tx.user_skills.deleteMany({
          where: { user_id: userIdBigInt },
        });

        for (const skillName of data.skills) {
          if (!skillName) continue;

          // Only allow existing skills (validation against DB)
          const skill = await tx.skills.findUnique({
            where: { name: skillName },
          });

          if (!skill) {
            throw new Error(`Skill "${skillName}" does not exist in the database`);
          }

          await tx.user_skills.create({
            data: {
              user_id: userIdBigInt,
              skill_id: skill.id,
            },
          });
        }
      }

      // 4. Update Projects (working_on)
      if (data.working_on && Array.isArray(data.working_on)) {
        await tx.user_projects.deleteMany({
          where: { user_id: userIdBigInt },
        });

        for (const proj of data.working_on) {
          if (!proj.title || proj.title.trim().length === 0) {
            continue; // Skip empty projects
          }

          // Validate project URL if provided
          let projectLink = proj.link || '#';
          if (projectLink !== '#' && projectLink.trim().length > 0) {
            try {
              projectLink = validateAndNormalizeUrl(projectLink, `Proyecto "${proj.title}"`);
            } catch (error) {
              throw new Error(`${error instanceof Error ? error.message : 'Error validando URL del proyecto'}`);
            }
          }

          let project = await tx.projects.findFirst({
            where: { title: proj.title },
          });

          if (!project) {
            project = await tx.projects.create({
              data: {
                title: proj.title,
                description: projectLink !== '#' ? projectLink : "Created from profile",
              },
            });
          }

          const existingLink = await tx.user_projects.findFirst({
            where: {
              user_id: userIdBigInt,
              project_id: project.id,
            },
          });

          if (!existingLink) {
            await tx.user_projects.create({
              data: {
                user_id: userIdBigInt,
                project_id: project.id,
                project_role: "Member",
              },
            });
          }
        }
      }

      // 5. Update Social Links (user_platforms) with validation
      if (data.social_links && Array.isArray(data.social_links)) {
        await tx.user_platforms.deleteMany({
          where: { user_id: userIdBigInt },
        });

        const allowedPlatforms = [
          "GitHub",
          "ORCID",
          "Bento.me",
          "Linktree",
          "YouTube",
          "Twitter",
          "Facebook",
          "LinkedIn",
          "Website",
        ];

        const linksToSave = [...data.social_links];

        // Add github if provided and missing
        if (data.github) {
          const hasGithubInLinks = linksToSave.some(
            (l) =>
              l.label?.toLowerCase() === "github" ||
              l.icon?.toLowerCase() === "github",
          );
          if (!hasGithubInLinks) {
            linksToSave.push({ label: "GitHub", url: data.github, icon: "github" });
          }
        }

        for (const link of linksToSave) {
          // Skip empty links
          if (!link.url || link.url.trim().length === 0) {
            continue;
          }

          // Determine platform name
          let platformName = link.label || link.icon || "Website";
          const normalizedPlatform = allowedPlatforms.find(
            (p) => p.toLowerCase() === platformName.toLowerCase(),
          );
          platformName = normalizedPlatform ?? "Website";

          // Validate and normalize URL, but skip invalid ones instead of failing the whole request
          let normalizedUrl: string | null = null;
          try {
            normalizedUrl = validateAndNormalizeUrl(link.url, platformName);
          } catch (err) {
            logger.warn(
              "Skipping invalid social link",
              {
                platform: platformName,
                url: link.url,
                reason: err instanceof Error ? err.message : "Invalid URL"
              }
            );
            continue;
          }

          if (!normalizedUrl) {
            continue;
          }

          let platform = await tx.platforms.findFirst({
            where: { name: platformName },
          });

          if (!platform) {
            platform = await tx.platforms.create({
              data: { name: platformName },
            });
          }

          await tx.user_platforms.create({
            data: {
              user_id: userIdBigInt,
              platform_id: platform.id,
              link: normalizedUrl,
            },
          });
        }
      }
    });

    return true;
  } catch (error) {
    logger.error("Error updating user profile:", { error });
    // Propagar el error en lugar de solo retornar false
    throw error;
  }
}
