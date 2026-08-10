/**
 * Autorizacion con alcance por proyecto para el modulo de Proyectos.
 *
 * middleware.ts solo puede autorizar por prefijo de URL leyendo el rol global del JWT
 * (Edge runtime, sin acceso a BD). Este modulo es el primero que necesita responder
 * "es este usuario el lider de ESTE proyecto en particular" — algo que Edge no puede
 * resolver. Por eso la autorizacion de casi todas las rutas de /api/projects/** vive
 * DENTRO del handler, usando los helpers de este archivo, en vez de un prefijo de
 * middleware. Unica excepcion: /api/projects/dashboard/summary (ver middleware.ts),
 * que no tiene scoping por proyecto y si puede resolverse por prefijo.
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/postgresDriver";
import { extractTokenFromCookies } from "@/lib/auth/utils";
import { verifyJwtPayload } from "@/lib/auth/jwt-edge";
import { GLOBAL_ROLES, PROJECT_ROLES, type ProjectRoleName } from "@/lib/constants/roles";

export interface Actor {
  userId: string;
  globalRole: string;
}

function unauthorized(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 401 });
}

function forbidden(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 403 });
}

/** Extrae { userId, globalRole } del JWT en la cookie de sesion, o null si no hay sesion valida. */
export async function getActor(request: NextRequest): Promise<Actor | null> {
  const token = extractTokenFromCookies(request);
  if (!token) return null;

  const decoded = await verifyJwtPayload(token);
  if (!decoded?.sub) return null;

  return { userId: decoded.sub, globalRole: decoded.role ?? GLOBAL_ROLES.USER };
}

/** Rol del usuario en un proyecto especifico (null si no es integrante activo). */
export async function getProjectRole(
  userId: string,
  projectId: bigint,
): Promise<ProjectRoleName | null> {
  const row = await prisma.user_projects.findFirst({
    where: { user_id: BigInt(userId), project_id: projectId, is_active: true },
    select: { project_role: true },
  });
  return row?.project_role ?? null;
}

/** admin | lider-de-ese-proyecto. Usado para editar contenido/banner/recursos/integrantes de UN proyecto. */
export async function requireProjectLeaderOrAdmin(
  request: NextRequest,
  projectId: bigint,
): Promise<Actor | NextResponse> {
  const actor = await getActor(request);
  if (!actor) return unauthorized("No autenticado");
  if (actor.globalRole === GLOBAL_ROLES.ADMIN) return actor;

  const projectRole = await getProjectRole(actor.userId, projectId);
  if (projectRole === PROJECT_ROLES.LEADER) return actor;

  return forbidden("Solo el lider del proyecto o un administrador pueden realizar esta accion");
}

/** admin unicamente. Usado para crear proyectos, archivar, y asignar/cambiar el lider. */
export async function requireAdmin(request: NextRequest): Promise<Actor | NextResponse> {
  const actor = await getActor(request);
  if (!actor) return unauthorized("No autenticado");
  if (actor.globalRole === GLOBAL_ROLES.ADMIN) return actor;
  return forbidden("Solo administradores pueden realizar esta accion");
}

/** admin | auditor. Usado para trazabilidad (escritura) y el dashboard general. */
export async function requireAdminOrAuditor(request: NextRequest): Promise<Actor | NextResponse> {
  const actor = await getActor(request);
  if (!actor) return unauthorized("No autenticado");
  if (actor.globalRole === GLOBAL_ROLES.ADMIN || actor.globalRole === GLOBAL_ROLES.AUDITOR) {
    return actor;
  }
  return forbidden("Solo administradores o auditores pueden realizar esta accion");
}

/** admin | auditor | lider-de-ese-proyecto (solo lectura para el lider — el handler debe rechazar escrituras). */
export async function requireTraceabilityReadAccess(
  request: NextRequest,
  projectId: bigint,
): Promise<Actor | NextResponse> {
  const actor = await getActor(request);
  if (!actor) return unauthorized("No autenticado");
  if (actor.globalRole === GLOBAL_ROLES.ADMIN || actor.globalRole === GLOBAL_ROLES.AUDITOR) {
    return actor;
  }

  const projectRole = await getProjectRole(actor.userId, projectId);
  if (projectRole === PROJECT_ROLES.LEADER) return actor;

  return forbidden("No tienes acceso a la trazabilidad de este proyecto");
}
