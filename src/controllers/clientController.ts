// **LIBRERÍAS NPM**  
import bcrypt from 'bcrypt';
import fs from "fs";
import path from "path";

// **MODELO DE USUARIO**  
import { Client, User } from '../models/index.js';
import { requestContext } from '../helpers/requestContext.js';

// GET /client/dashboard
const getClientDashboard = (req: any, res: any) => {

  res.json({
    code: 'SUCCESS_CLIENT_DASHBOARD',
    user: req.user
  });
};
// GET /client/profile
// Este endpoint devuelve el perfil del cliente
// Se asume que el middleware authMiddleware ya ha verificado la autenticación y el rol
// y que el usuario está disponible en req.user
const getClientProfile = async (req: any, res: any) => {

  res.json({
    code: "SUCCESS_CLIENT_PROFILE",
    user: req.user,
  });
};

// GET /client/profile/:id   -> :id = User.id
const getClientProfileById = async (req: any, res: any) => {
  const { id } = req.params;
  const userId = Number(id);

  if (!id || Number.isNaN(userId)) {
    return res.status(400).json({ code: "ERR_VALIDATION_ID" });
  }

  try {
    const client = await Client.findOne({
      where: { userId },
      // Si necesitas algo del usuario, déjalo minimalista:
      include: [
        {
          model: User,
          as: "user",
          attributes: ["email"], // agrega más si lo requieres (email, customId, etc.)
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] }, // opcional
    });

    // 🔍 Verificar que el usuario existe y no es nula
    if (!client) {
      return res.status(404).json({ code: "ERR_CLIENT_NOT_FOUND" });
    }
    return res.json({ code: "SUCCESS_QUERY_USER_ALL_CLIENT", client });
  } catch (err) {
    console.error("❌ ERR_QUERY_USER_ALL_CLIENT:", err);
    return res.status(500).json({ code: "ERR_QUERY_USER_ALL_CLIENT" });
  }
};

const updateClientProfile = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const customId = req.user.customId;

    console.log(`👤 [updateClientProfile] START: userId=${userId}, customId=${customId}, storeFound=${!!requestContext.getStore()}`);

    const {
      // Identificación
      fullName,
      birthDate,
      documentType,
      documentNumber,

      // Contacto
      phone,
      altPhone,
      preferredContact,

      // Dirección internacional
      address,
      countryCode,
      administrativeAreaLevel1,
      administrativeAreaLevel2,
      city,
      state,
      postalCode,
      lat,
      lng,

      // Perfil y notas
      notes,
      marketingOptIn,

      // Devoluciones bancarias
      bankName,
      accountNumber,
      accountHolder,
      updatedAt = new Date(),
    } = req.body || {};

    const profileImage = req.file ? req.file.filename : null;

    // 🔍 Verificar que el usuario exista
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ code: "ERR_USER_NOT_FOUND" });
    }

    // 🧼 Obtener perfil actual (si existe) para eliminar imagen anterior
    const existingProfile = await Client.findOne({ where: { userId } });

    if (req.file && existingProfile?.profileImage) {
      const oldImagePath = path.join("public", "uploads", "perfil", existingProfile.profileImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // 📝 Crear o actualizar perfil (simple, solo lo que venga en el body)
    //console.log(`🚀 [updateClientProfile] PRE-UPSERT: storeFound=${!!requestContext.getStore()}`);
    await Client.upsert({
      userId,
      fullName,
      birthDate,
      documentType,
      documentNumber,
      phone,
      altPhone,
      preferredContact,
      address,
      countryCode: countryCode || existingProfile?.countryCode || 'CR',
      administrativeAreaLevel1,
      administrativeAreaLevel2,
      city,
      state,
      postalCode,
      lat,
      lng,
      notes,
      marketingOptIn,
      bankName,
      accountNumber,
      accountHolder,
      profileImage: profileImage || existingProfile?.profileImage || null,
      updatedAt,
      // 👇 aseguramos categoryCode aunque el cliente no lo mande
      categoryCode: existingProfile?.categoryCode || 'C'
    });

    return res.json({ code: "SUCCESS_PROFILE_UPDATED" });

  } catch (err) {
    console.error("❌ Error al actualizar perfil:", err);
    return res.status(500).json({ code: "ERR_UPDATE_PROFILE" });
  }
};

export {
  getClientDashboard,
  getClientProfile,
  getClientProfileById,
  updateClientProfile,
};
