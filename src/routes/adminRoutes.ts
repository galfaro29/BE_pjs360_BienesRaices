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

// Devuelve estadísticas y datos clave del dashboard (compartido)
router.get(
  '/dashboard',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  getAdminDashboard
);

// Lista todos los profesionales registrados (compartido)
router.get(
  '/professionals',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  listProfessionals
);

// Activa o desactiva a un profesional (compartido)
router.put(
  '/professionals/:id/activate',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  activateProfessionalAccount
);

// Elimina completamente a un profesional (Solo Admin)
router.delete(
  '/professionals/:id',
  authMiddleware,
  roleMiddleware('admin'),
  deleteProfessionalAccount
);

export default router;
