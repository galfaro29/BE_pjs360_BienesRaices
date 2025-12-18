import express from 'express';
import {
  authMiddleware,
  roleMiddleware,
} from '../middleware/index.js';
import { 
  getDashboardAdmin,
  createInitialAdmin,
  getProfessionals,
  activateProfessional,
  deleteProfessional,
} from '../controllers/adminController.js';

const router = express.Router();

// Crea el primer usuario admin al iniciar la app
router.post('/init', createInitialAdmin);

// Devuelve estadísticas y datos clave del dashboard (solo para admins)
// - authMiddleware: verifica token JWT
// - roleMiddleware('admin'): solo usuarios con rol "admin"
router.get(
  '/dashboard',
  authMiddleware,
  roleMiddleware('admin'),
  getDashboardAdmin
);


// Lista todos los profesionales registrados
router.get('/professionals', getProfessionals);

// Activa o desactiva a un profesional (solo admins)
// - authMiddleware + roleMiddleware('admin')
router.put(
  '/professionals/:id/activate',
  authMiddleware,
  roleMiddleware('admin'),
  activateProfessional
);

// Elimina completamente a un profesional de la plataforma
router.delete('/professionals/:id', deleteProfessional);

export default router;
