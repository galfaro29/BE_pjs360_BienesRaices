import express from "express";
import upload from "../helpers/multer.js";

import { authMiddleware, roleMiddleware, ensureRequestContext } from "../middleware/index.js";
import {
  getClientDashboard,
  updateClientProfile,
  getClientProfile,
  getClientProfileByUserId
} from "../controllers/clientController.js";

const router = express.Router();

// 🧠 Dashboard del cliente
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("client"),
  getClientDashboard
);

// 📝 Actualización de perfil del cliente
router.post(
  "/profile",
  authMiddleware,
  roleMiddleware("client"),
  upload.single("image"), // Maneja una sola imagen con campo "image"
  ensureRequestContext,    // 🔧 Asegura que el contexto sobreviva a multer
  updateClientProfile
);

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("client"),
  getClientProfile
);

router.get(
  "/profile/:id",
  authMiddleware,
  roleMiddleware("client"),
  getClientProfileByUserId
);



export default router;
