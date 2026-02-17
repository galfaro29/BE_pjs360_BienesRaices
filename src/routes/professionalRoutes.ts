import express from 'express';
import {
  authMiddleware,
  roleMiddleware,
} from '../middleware/index.js';
import {
  getProfessionalDashboard,
  createProfessionalApplication,
  getCountry,
  getProfessionalTypes,
  getCountryTypeProfessional,
  getProfessionalProfileByUserId
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
 * 🌍 Obtener países habilitados
 */
router.get('/countries', getCountry);

/**
 * 🛠 Obtener tipos de profesionales habilitados
 */
router.get('/professional-types', getProfessionalTypes);

/**
 * ⚙️ Endpoint combinado (países + tipos de profesionales)
 */
router.get('/country-professional', getCountryTypeProfessional);

/**
 * 📝 Crea una nueva solicitud profesional
 * - Ruta pública (sin login previo)
 * - Recibe los datos del formulario de aplicación
 */
router.post('/application', createProfessionalApplication);

/* =========================
   🔍 GET PROFESSIONAL PROFILE BY USER ID
========================= */
router.get(
  "/profile/:id",
  authMiddleware,
  roleMiddleware("professional"),
  getProfessionalProfileByUserId
);


export default router;