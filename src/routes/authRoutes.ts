import express from "express";
import { authMiddleware,loadUserMiddleware } from "../middleware/index.js";


import {
  login,
  register,
  confirmAccount,
  forgotPassword,
  verifyToken,
  resetPassword,
  checkAuth,
  logout,
  resetPasswordWithCustomId,
} from "../controllers/authController.js";

const router = express.Router();

// Crea un nuevo usuario y envía email de confirmación
router.post("/register", register);

// Inicia sesión y devuelve JWT
router.post("/login", login);

// Cierra la sesión/destruye el token
router.post("/logout", logout);

// Verifica que el JWT siga siendo válido y devuelve datos de usuario
router.get("/check", authMiddleware,loadUserMiddleware, checkAuth);

// Envía email con token para restablecer contraseña
router.post("/forgotPassword", forgotPassword);

// Comprueba que el token de recuperación sea válido
router.get("/verifyToken/:token", verifyToken);

// Cambia la contraseña usando el token enviado por email
router.post("/resetPassword/:token", resetPassword);

// Cambia la contraseña usando el id del cliente 
router.post("/changePassword/:id", resetPasswordWithCustomId);

// Confirma la cuenta de usuario tras activar el enlace de registro
// — debe ir al final para no chocar con otras rutas
router.get("/:token", confirmAccount);

export default router;
