import { Request, Response, NextFunction } from "express";
import { User } from "../models/index.js";
import { ApiErrorResponse } from "../types/index.js";

export const loadUserMiddleware = async (
  req: Request,
  res: Response<ApiErrorResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        code: "ERR_NO_AUTH_CONTEXT",
        message: "Authentication context not found",
      });
      return;
    }

    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role", "isActive"],
    });

    if (!user) {
      res.status(401).json({
        code: "ERR_USER_NOT_FOUND",
        message: "User not found",
      });
      return;
    }

    if (user.isActive === false) {
      res.status(403).json({
        code: "ERR_USER_INACTIVE",
        message: "User is inactive",
      });
      return;
    }

    // 👉 usuario real desde BD
    req.dbUser = user;

    next();
  } catch (error) {
    res.status(500).json({
      code: "ERR_LOAD_USER",
      message: "Error loading user from database",
    });
  }
};