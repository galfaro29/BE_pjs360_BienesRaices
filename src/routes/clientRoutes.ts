import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import { authMiddleware, roleMiddleware } from "../middleware/index.js";
import {
  getClientDashboard,
  updateClientProfile,
  getClientProfile,
  getClientProfileById
} from "../controllers/clientController.js";

const router = express.Router();

// 📁 Crear carpeta para imágenes si no existe
const uploadDir = path.join("public", "uploads", "perfil");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 📦 Configurar almacenamiento de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `perfil-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

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
  getClientProfileById
);



export default router;
