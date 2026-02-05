// **LIBRERÍAS**  
import bcrypt from "bcrypt";  // Para encriptar contraseñas si fuera necesario

// **MODELO Y HELPERS**  
import { User } from "../models/index.js";  // Modelo Sequelize de usuarios  
import { generarJWT, generarId } from "../helpers/tokens.js"; // Funciones para crear JWT y IDs únicos  
import { confirmEmailToken, resetPasswordToken } from "../helpers/email.js"; // Envío de emails

/**
 * getDashboardAdmin
 * — Devuelve datos mínimos del admin (req.user viene de authMiddleware)
 */
const getAdminDashboard = (req: any, res: any) => {
  res.json({
    code: "SUCCESS_ADMIN_DASHBOARD",
    user: req.user,                                       // Información del admin autenticado
  });
};

/**
 * createInitialAdmin
 * — Crea el primer admin si no existe ninguno
 * — Genera token de confirmación y envía el email correspondiente
 */
const createInitialAdminAccount = async (req: any, res: any) => {
  try {
    // Verificar si ya hay un admin existente
    const existing = await User.findOne({ where: { role: "admin" } });
    if (existing) {
      return res.status(400).json({ code: "ERR_ADMIN_EXISTS" });
    }

    // Generar token de confirmación
    const token = generarId();

    // Crear usuario con rol 'admin'
    const admin = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // El hook beforeCreate encripta la contraseña
      role: "admin",
      token,
      confirmado: false,
      confirmedAt: null,
      isActive: true,             // Los admins se activan automáticamente
    });

    // Enviar email de confirmación al admin creado
    await confirmEmailToken({
      email: admin.email,
      name: admin.name,
      token: admin.token,
      role: admin.role,
    });

    // Responder con datos del admin creado
    res.status(201).json({ code: "SUCCESS_ADMIN_CREATED", admin });
  } catch (error) {
    console.error("Error al crear admin:", error);
    res.status(500).json({ code: "ERR_CREATE_ADMIN" });
  }
};

/**
 * getProfessionals
 * — Recupera todos los usuarios con rol 'professional'
 * — Excluye password gracias al scope 'eliminarPassword'
 */
const listProfessionals = async (req: any, res: any) => {
  try {
    const professionals = await User.scope("eliminarPassword").findAll({
      where: { role: "professional" },
    });
    res.json({ code: "SUCCESS_FETCH_PROFESSIONALS", professionals });
  } catch (error) {
    console.error("Error al obtener profesionales:", error);
    res.status(500).json({ code: "ERR_FETCH_PROFESSIONALS" });
  }
};

/**
 * activateProfessional
 * — Activa un profesional (isActive = true) por su ID
 * — Solo afecta a usuarios con rol 'professional'
 */
const activateProfessionalAccount = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user || user.role !== "professional") {
      return res.status(404).json({ code: "ERR_PROFESSIONAL_NOT_FOUND" });
    }

    user.isActive = true;
    await user.save();

    res.json({ code: "SUCCESS_PROFESSIONAL_ACTIVATED", user });
  } catch (error) {
    console.error("Error al activar profesional:", error);
    res.status(500).json({ code: "ERR_ACTIVATE_PROFESSIONAL" });
  }
};

/**
 * deleteProfessional
 * — Elimina permanentemente un profesional de la base de datos
 */
const deleteProfessionalAccount = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user || user.role !== "professional") {
      return res.status(404).json({ code: "ERR_PROFESSIONAL_NOT_FOUND" });
    }

    await user.destroy();
    res.json({ code: "SUCCESS_PROFESSIONAL_DELETED" });
  } catch (error) {
    console.error("Error al eliminar profesional:", error);
    res.status(500).json({ code: "ERR_DELETE_PROFESSIONAL" });
  }
};

export {
  getAdminDashboard,
  createInitialAdminAccount,
  listProfessionals,
  activateProfessionalAccount,
  deleteProfessionalAccount,

};
