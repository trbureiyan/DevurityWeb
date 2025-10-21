import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

export const generateToken = async (
  payload: object,
  expiresIn: number = 3600 /* expira en 1 horas*/,
) => {
  return new Promise((resolve) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn }, (err, token) => {
      if (err) return resolve(null);

      resolve(token);
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
