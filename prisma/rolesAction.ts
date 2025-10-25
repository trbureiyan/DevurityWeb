// lib/rolesAction.ts
"use server";

import { z } from "zod";
import prisma from "../../prisma/repository/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Schema de validación para un rol
 * - name: nombre del rol (obligatorio, máximo 50 caracteres)
 * - is_deleted: opcional, indica si el rol está eliminado (default false)
 */
const RoleSchema = z.object({
  name: z.string().min(1, "El nombre del rol es obligatorio").max(50, "Máximo 50 caracteres"),
  is_deleted: z.boolean().optional().default(false),
});

/** Tipo TypeScript inferido a partir del schema */
export type RoleInput = z.infer<typeof RoleSchema>;

/**
 * createRole
 * ----------
 * Crea un nuevo rol en la base de datos.
 * Revalida la caché de la lista de roles después de la creación.
 *
 * @param formData FormData con los campos del rol (`name` obligatorio)
 * @returns { success: true } si se creó correctamente,
 *          { error: Record<string, string[]> } si hay error de validación o duplicado
 */
export async function createRole(formData: FormData) {
  const parsed = RoleSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const { name, is_deleted } = parsed.data;

  try {
    await prisma.roles.create({ data: { name, is_deleted } });

    // Revalida la caché de la lista de roles
    revalidatePath("/admin/roles");

    // Devuelve resultado manejable por el cliente
    return { success: true };
  } catch (err: any) {
    console.error("Error crear rol:", err);

    if (err?.code === "P2002") {
      // Error de clave única (nombre duplicado)
      return { error: { general: ["El nombre del rol ya existe"] } };
    }

    return { error: { general: ["Error al crear el rol"] } };
  }
}

/**
 * getRoles
 * --------
 * Obtiene todos los roles no eliminados de la base de datos.
 * Incluye los usuarios asociados (solo first_name y last_name).
 * Convierte el ID a string para compatibilidad con React.
 *
 * @returns Array de roles [{ id, name, is_deleted, users }]
 */
export async function getRoles() {
  const roles = await prisma.roles.findMany({
    where: { is_deleted: false },
    orderBy: { id: "asc" },
    include: {
      users: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  });

  // Convertir BigInt id a string para React
  return roles.map(r => ({ ...r, id: r.id.toString() }));
}

/**
 * updateRole
 * ----------
 * Actualiza un rol existente.
 * Convierte el ID recibido como string a BigInt para Prisma.
 * Revalida la caché de la lista de roles después de la actualización.
 *
 * @param idStr ID del rol como string
 * @param formData FormData con los campos a actualizar (parcialmente)
 * @returns { success: true } si se actualizó correctamente,
 *          { error: Record<string, string[]> } si ocurre un error
 */
export async function updateRole(idStr: string, formData: FormData) {
  const parsed = RoleSchema.partial().safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const id = BigInt(idStr);
  try {
    await prisma.roles.update({ where: { id }, data: parsed.data });
    revalidatePath("/admin/roles");
    return { success: true };
  } catch (err) {
    console.error("Error actualizar rol:", err);
    return { error: { general: ["Error al actualizar el rol"] } };
  }
}

/**
 * deleteRole
 * ----------
 * Elimina (marca como eliminado) un rol existente.
 * Revalida la caché de la lista de roles después de la eliminación.
 *
 * @param idStr ID del rol como string
 * @returns { success: true } si se eliminó correctamente,
 *          { error: Record<string, string[]> } si ocurre un error o el rol no existe
 */
export async function deleteRole(idStr: string) {
  try {
    const id = BigInt(idStr);

    const role = await prisma.roles.findUnique({ where: { id } });
    if (!role) {
      return { error: { general: ["El rol no existe o ya fue eliminado."] } };
    }

    await prisma.roles.update({
      where: { id },
      data: { is_deleted: true },
    });

    revalidatePath("/admin/roles");
    return { success: true };
  } catch (err: any) {
    console.error("Error eliminar rol:", err);

    if (err?.code === "P2025") {
      // Registro no encontrado en Prisma
      return { error: { general: ["El rol no existe o ya fue eliminado."] } };
    }

    return { error: { general: ["Error al eliminar el rol."] } };
  }
}
