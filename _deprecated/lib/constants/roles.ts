/**
 * User role constants
 * These should match the role names in the database
 */
export const UserRole = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];
