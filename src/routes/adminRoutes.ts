import express from 'express';
import {
  authMiddleware,
  roleMiddleware,
} from '../middleware/index.js';
import {
  getAdminDashboard,
  createInitialAdminAccount,
  listProfessionals,
  activateProfessionalAccount,
  deleteProfessionalAccount,
} from '../controllers/adminController.js';

const router = express.Router();

// Crea el primer usuario admin al iniciar la app
router.post('/init', createInitialAdminAccount);

// Devuelve estadísticas y datos clave del dashboard (solo para admins)
// - authMiddleware: verifica token JWT
// - roleMiddleware('admin'): solo usuarios con rol "admin"
router.get(
  '/dashboard',
  authMiddleware,
  roleMiddleware('admin'),
  getAdminDashboard
);


// Lista todos los profesionales registrados
router.get('/professionals', listProfessionals);

// Activa o desactiva a un profesional (solo admins)
// - authMiddleware + roleMiddleware('admin')
router.put(
  '/professionals/:id/activate',
  authMiddleware,
  roleMiddleware('admin'),
  activateProfessionalAccount
);

// Elimina completamente a un profesional de la plataforma
router.delete('/professionals/:id', deleteProfessionalAccount);

export default router;
