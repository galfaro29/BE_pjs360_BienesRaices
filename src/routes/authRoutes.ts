import express from "express";
import { authMiddleware, loadUserMiddleware } from "../middleware/index.js";


import {
  authenticateUser,
  registerUser,
  confirmUserAccount,
  requestPasswordReset,
  verifyPasswordResetToken,
  resetUserPassword,
  checkAuthentication,
  logoutUser,
  resetUserPasswordById,
} from "../controllers/authController.js";

const router = express.Router();

// Crea un nuevo usuario y envía email de confirmación
router.post("/register", registerUser);

// Inicia sesión y devuelve JWT
router.post("/login", authenticateUser);

// Cierra la sesión/destruye el token
router.post("/logout", logoutUser);

// Verifica que el JWT siga siendo válido y devuelve datos de usuario
router.get("/check", authMiddleware, loadUserMiddleware, checkAuthentication);

// Envía email con token para restablecer contraseña
router.post("/forgotPassword", requestPasswordReset);

// Comprueba que el token de recuperación sea válido
router.get("/verifyToken/:token", verifyPasswordResetToken);

// Cambia la contraseña usando el token enviado por email
router.post("/resetPassword/:token", resetUserPassword);

// Cambia la contraseña usando el id del cliente 
router.post("/changePassword/:id", resetUserPasswordById);

// Confirma la cuenta de usuario tras activar el enlace de registro
// — debe ir al final para no chocar con otras rutas
router.get("/:token", confirmUserAccount);

export default router;
