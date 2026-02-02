import jwt, { SignOptions } from "jsonwebtoken";
import { JwtUserData } from "../types/index.js";
/**
 * Datos necesarios para generar un JWT
 */


export const generarJWT = (datos: JwtUserData): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET no está definido");
  }

  const expiresIn =
    (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) ?? "1d";

  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(
    {
      id: datos.id,
      customId: datos.customId,
      name: datos.name,
      role: datos.role,
    },
    secret,
    options
  );
};

export const generarId = (): string =>
  Math.random().toString(32).substring(2) + Date.now().toString(32);