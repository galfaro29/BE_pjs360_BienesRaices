// **MODELO DE USUARIO**  
import { User,ProfessionalApplication } from '../models/index.js';  
// El modelo Sequelize de usuarios permite extender lógica y futuras consultas si es necesario

/**
 * getProfessionalDashboard
 * — Controlador para GET /professional/dashboard
 * — Devuelve un JSON con:
 *    • code: 'SUCCESS_PROFESSIONAL_DASHBOARD'
 *    • user: datos del profesional autenticado (req.user inyectado por authMiddleware)
 */
const getProfessionalDashboard = (req: any , res : any) => {
  // Envía la respuesta con los datos del profesional
  res.json({
    code: 'SUCCESS_PROFESSIONAL_DASHBOARD',
    user: req.user
  });
};

/**
 * createProfessionalApplication
 * — Controlador para POST /professional/applications
 * — Guarda los datos enviados por el formulario de aplicación profesional
 */
const createProfessionalApplication = async (req: any , res: any) => {

  try {
    // Desestructura datos del formulario
    const {
      fullName,
      phone,
      email,
      locale,
      serviceCategoryId,
      serviceId,
      countryCode
    } = req.body;
    

    // 🧩 Validaciones básicas
    if (!fullName || !email || !phone || !serviceCategoryId || !countryCode || !serviceId || !locale ) {
      return res.status(400).json({
        code: 'ERR_PROFESSIONAL_APPLICATION_VALIDATION'
      });
    }

    // 📧 Verifica si ya existe una solicitud con ese correo
    const existing = await ProfessionalApplication.findOne({
      where: { email },
    });

    if (existing) {
      return res.status(409).json({
        code: 'ERR_PROFESSIONAL_APPLICATION_EXISTS'
      });
    }

    // 📝 Crea la solicitud profesional
    const newApplication = await ProfessionalApplication.create({
      fullName,
      phone,
      email,
      locale,
      serviceCategoryId,
      serviceId,
      countryCode,
      state: 'pending' // Pendiente de revisión
    });

    // ✅ Respuesta exitosa
    return res.status(201).json({
      code: 'SUCCESS_PROFESSIONAL_APPLICATION'
    });
  } catch (error) {
    console.error('❌ Error al crear la aplicación profesional:', error);
    return res.status(500).json({
      code: 'ERROR_PROFESSIONAL_APPLICATION'
    });
  }
};


export {
  getProfessionalDashboard,  // Exporta la función para usarla en las rutas de profesionales
  createProfessionalApplication, // Solicitud de información para registro de profesionales
};
