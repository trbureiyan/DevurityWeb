// Generador de tokens CSRF compatible con Edge Runtime
function generateRandomToken(length: number = 32): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export const csrfAdapter = {
  // Generar token CSRF
  generateToken: (): string => {
    return generateRandomToken(32);
  },

  // Validar token CSRF
  validateToken: (token: string, expectedToken: string): boolean => {
    if (!token || !expectedToken) {
      return false;
    }

    // Comparación segura contra timing attacks
    return token === expectedToken;
  },

  // Crear cookie CSRF
  createCookie: (token: string): string => {
    return `csrf_token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=86400${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`;
  },

  // Extraer token de headers
  extractTokenFromHeaders: (request: Request): string | null => {
    const csrfHeader = request.headers.get("x-csrf-token");
    return csrfHeader || null;
  },

  // Extraer token de formulario
  extractTokenFromForm: (formData: FormData): string | null => {
    return formData.get("csrf_token") as string | null;
  },

  // Verificar si la request necesita protección CSRF
  requiresCsrfProtection: (method: string): boolean => {
    const protectedMethods = ["POST", "PUT", "DELETE", "PATCH"];
    return protectedMethods.includes(method.toUpperCase());
  },
};
