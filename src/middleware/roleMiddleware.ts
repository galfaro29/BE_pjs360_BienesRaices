import { Request, Response, NextFunction } from "express";
import { ApiErrorResponse } from "../types/index.js";

/**
 * roleMiddleware
 * ----------------
 * Middleware de autorización por roles.
 *
 * ¿Qué hace?
 * - Recibe una lista de roles permitidos.
 * - Verifica que el usuario esté autenticado (req.user).
 * - Valida que el rol del usuario esté incluido en los roles permitidos.
 * - Si no cumple, corta la petición con error.
 */
export const roleMiddleware =
  (...allowedRoles: string[]) =>
  (
    req: Request,
    res: Response<ApiErrorResponse>,
    next: NextFunction
  ): void => {
    // Verificar que authMiddleware haya establecido req.user
    if (!req.user) {
      res.status(401).json({
        code: "ERR_AUTH_REQUIRED_USER",
        message: "Authentication required",
      });
      return;
    }

    const { role } = req.user;

    // Denegar acceso si el rol del usuario no está entre los permitidos
    if (!allowedRoles.includes(role)) {
      res.status(403).json({
        code: "ERR_FORBIDDEN_ROLE",
        message: "User role not allowed",
      });
      return;
    }

    next();
  };
