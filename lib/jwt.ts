import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

export const generateToken = async (
  payload: object,
  expiresIn: number = 86400 /* expira en 24 horas */,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn }, (err, token) => {
      if (err) return reject(err);

      resolve(token as string);
    });
  });
};

export const validateToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};
