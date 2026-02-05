import express from "express";

// ⬇️ AHORA VIENE DESDE MIDDLEWARES
import { uploadProfileImage } from "../middleware/uploads.js";

import {
  authMiddleware,
  roleMiddleware,
  ensureRequestContext,
} from "../middleware/index.js";

import {
  getClientDashboard,
  updateClientProfile,
  getClientProfile,
  getClientProfileByUserId,
} from "../controllers/clientController.js";

const router = express.Router();

/* =========================
   📊 CLIENT DASHBOARD
========================= */
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("client"),
  getClientDashboard
);

/* =========================
   📝 UPDATE CLIENT PROFILE
========================= */
router.post(
  "/profile",
  authMiddleware,
  roleMiddleware("client"),
  uploadProfileImage.single("image"), // 🖼️ Multer middleware
  ensureRequestContext,               // 🔧 Mantiene AsyncLocalStorage
  updateClientProfile
);

/* =========================
   👤 GET CLIENT PROFILE
========================= */
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("client"),
  getClientProfile
);

/* =========================
   🔍 GET CLIENT PROFILE BY USER ID
========================= */
router.get(
  "/profile/:id",
  authMiddleware,
  roleMiddleware("client"),
  getClientProfileByUserId
);

export default router;
