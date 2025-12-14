/**
 * Centralized user type definitions
 * 
 * @module user.types
 */

/**
 * Base user entity from database
 * Matches Prisma schema for users table
 */
export interface User {
  id: string | bigint;
  name: string;
  last_name: string;
  email: string;
  password: string;
  personal_email: string | null;
  is_active: boolean;
  role_id: number;
  motivation: string;
  semester: number;
  updated_at?: string | null;
  joined_at?: string | null;
  username?: string | null;
  username_last_changed?: string | null;
  working_on?: string | null;
  program_id?: string | bigint | number | null;
  program?: string | null;
}

/**
 * User with role information included
 * Used when role details are needed
 */
export interface UserWithRole extends Omit<User, 'role_id'> {
  roles: {
    id: number;
    name: string;
  };
}

/**
 * DTO for creating new user (registration)
 * Contains required fields for user creation
 */
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  last_name: string;
  motivation: string;
  skills: number[];
  semester: number;
  roleId?: number;
  personal_email?: string | null;
  program?: string | null;
}

/**
 * DTO for updating user profile
 * All fields optional for partial updates
 */
export interface UpdateUserDTO {
  name?: string;
  last_name?: string;
  bio?: string | null;
  username?: string | null;
  avatar?: string | null;
  avatar_url?: string | null;
  website?: string | null;
  github?: string | null;
  linkedin_url?: string | null;
  twitter_url?: string | null;
  skills?: string[];
  working_on?: string | null;
  semester?: number;
  personal_email?: string | null;
  program?: string | null;
  social_links?: Array<{
    label?: string;
    icon?: string;
    url: string;
  }>;
}

/**
 * DTO for authentication response
 * Lightweight user data for JWT payload and client state
 */
export interface AuthUserDTO {
  id: string;
  name: string;
  last_name: string;
  email: string;
  role: string;
  is_active: boolean;
  username?: string;
}

/**
 * DTO for paginated users response
 */
export interface PaginatedUsersResponse {
  users: UserWithRole[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
