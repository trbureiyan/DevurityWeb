import { NextResponse } from "next/server";
import logger from "./logger";

export enum ErrorCode {
  // Authentication & Authorization
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  INVALID_TOKEN = "INVALID_TOKEN",

  // Validation
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INVALID_INPUT = "INVALID_INPUT",

  // Resources
  NOT_FOUND = "NOT_FOUND",
  ALREADY_EXISTS = "ALREADY_EXISTS",

  // Server
  INTERNAL_ERROR = "INTERNAL_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
}

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    public message: string,
    public statusCode: number = 500,
    public details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export function handleApiError(error: unknown): NextResponse<ErrorResponse> {
  // Log error para debugging
  logger.error("API Error:", error);

  // AppError personalizado
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: {
          code: error.code,
          message: error.message,
          details: process.env.NODE_ENV === "development" ? error.details : undefined,
        },
      },
      { status: error.statusCode },
    );
  }

  // JWT Errors
  if (error instanceof Error) {
    if (
      error.message.includes("jwt expired") ||
      error.message.includes("invalid signature") ||
      error.message.includes("jwt malformed")
    ) {
      return NextResponse.json(
        {
          error: {
            code: ErrorCode.INVALID_TOKEN,
            message: "Token inválido o expirado",
          },
        },
        { status: 401 },
      );
    }
  }

  // Prisma Errors
  if (error && typeof error === "object" && "code" in error) {
    const prismaError = error as { code: string; meta?: unknown };
    
    switch (prismaError.code) {
      case "P2002":
        return NextResponse.json(
          {
            error: {
              code: ErrorCode.ALREADY_EXISTS,
              message: "El recurso ya existe",
              details: process.env.NODE_ENV === "development" ? prismaError.meta : undefined,
            },
          },
          { status: 409 },
        );
      case "P2025":
        return NextResponse.json(
          {
            error: {
              code: ErrorCode.NOT_FOUND,
              message: "Recurso no encontrado",
            },
          },
          { status: 404 },
        );
      default:
        return NextResponse.json(
          {
            error: {
              code: ErrorCode.DATABASE_ERROR,
              message: "Error en la base de datos",
              details: process.env.NODE_ENV === "development" ? prismaError : undefined,
            },
          },
          { status: 500 },
        );
    }
  }

  // Error genérico
  return NextResponse.json(
    {
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: "Error interno del servidor",
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
    },
    { status: 500 },
  );
}

// Helper para validación
export function validateRequired(
  value: unknown,
  fieldName: string,
): asserts value is NonNullable<typeof value> {
  if (value === null || value === undefined || value === "") {
    throw new AppError(
      ErrorCode.VALIDATION_ERROR,
      `El campo ${fieldName} es requerido`,
      400,
    );
  }
}

// Helper para recursos no encontrados
export function assertResourceExists<T>(
  resource: T | null | undefined,
  resourceName: string,
): asserts resource is T {
  if (!resource) {
    throw new AppError(
      ErrorCode.NOT_FOUND,
      `${resourceName} no encontrado`,
      404,
    );
  }
}
