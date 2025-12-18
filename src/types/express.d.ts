import { AuthUser } from "./auth/auth.types.ts";

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
    dbUser?: import("../models/User").UserInstance;
  }
}