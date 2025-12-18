import express from 'express';
import {
  authMiddleware,
  roleMiddleware,
} from '../middleware/index.js';
import {
  getProfessionalDashboard,
  createProfessionalApplication,
} from '../controllers/professionalController.js';

const router = express.Router();

/**
 * 📊 Devuelve el panel de control del profesional con sus métricas
 * - authMiddleware: valida que el usuario esté autenticado
 * - roleMiddleware('professional'): restringe acceso a rol 'professional'
 */
router.get(
  '/dashboard',
  authMiddleware,
  roleMiddleware('professional'),
  getProfessionalDashboard
);

/**
 * 📝 Crea una nueva solicitud profesional
 * - Ruta pública (sin login previo)
 * - Recibe los datos del formulario de aplicación
 */
router.post('/application', createProfessionalApplication);


export default router;