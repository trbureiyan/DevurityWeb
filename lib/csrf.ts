// Generador de tokens CSRF criptográficamente seguro compatible con Edge Runtime
function generateRandomToken(length: number = 32): string {
  // Usar crypto.getRandomValues() que es criptográficamente seguro
  // y está disponible en Edge Runtime
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(array[i] % charactersLength);
  }

  return result;
}

// Comparación de tiempo constante para prevenir timing attacks
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  const aBytes = new TextEncoder().encode(a);
  const bBytes = new TextEncoder().encode(b);
  
  let result = 0;
  for (let i = 0; i < aBytes.length; i++) {
    result |= aBytes[i] ^ bBytes[i];
  }
  
  return result === 0;
}

export const csrfAdapter = {
  // Generar token CSRF
  generateToken: (): string => {
    return generateRandomToken(32);
  },

  // Validar token CSRF con comparación de tiempo constante
  validateToken: (token: string, expectedToken: string): boolean => {
    if (!token || !expectedToken) {
      return false;
    }

    // Usar comparación de tiempo constante para prevenir timing attacks
    return timingSafeEqual(token, expectedToken);
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
