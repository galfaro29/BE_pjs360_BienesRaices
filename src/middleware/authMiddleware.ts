import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ApiErrorResponse } from "../types/index.js";
import { requestContext } from "../helpers/requestContext.js";

interface JwtUserPayload extends JwtPayload {
  id: number;
  customId: string;
  role: string;
}

export const authMiddleware = (
  req: Request,
  res: Response<ApiErrorResponse>,
  next: NextFunction
): void => {
  const cookieName = process.env.COOKIE_NAME;
  const token = cookieName ? req.cookies?.[cookieName] : undefined;

  if (!token) {
    res.status(401).json({
      code: "ERR_TOKEN_REQUIRED",
      message: "Authentication token is missing",
    });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtUserPayload;

    req.user = {
      id: decoded.id,
      customId: decoded.customId,
      role: decoded.role,
    };

    // Actualizar el contexto de la solicitud con el customId del usuario
    const store = requestContext.getStore();
    console.log(`🔒 [authMiddleware] Found store: ${!!store}, updating userId to: ${decoded.customId}`);
    if (store) {
      store.userId = decoded.customId;
    }

    next();
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "TokenExpiredError") {
      res.status(401).json({
        code: "ERR_TOKEN_EXPIRED",
        message: "Authentication token expired",
      });
      return;
    }

    res.status(401).json({
      code: "ERR_TOKEN_INVALID",
      message: "Invalid authentication token",
    });
  }
};