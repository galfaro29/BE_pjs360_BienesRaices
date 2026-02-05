// **LIBRERÍAS**  
import bcrypt from "bcrypt"; // Para encriptar y comparar contraseñas
import type { Response } from "express";

// **MODELO Y HELPERS**  
import { User, Client, Professional } from "../models/index.js"; // Modelo Sequelize de usuarios  
import { generarJWT, generarId } from "../helpers/tokens.js";  // Generar JWT y IDs únicos  
import { confirmEmailToken, resetPasswordToken } from "../helpers/email.js"; // Envío de emails
import { generateCustomId } from "../helpers/generator.js"; // Generación de ID personalizado
import { requestContext } from "../helpers/requestContext.js";
import { RegisterRequest, AuthRegisterResponseSuccess } from "../types/index.js";
import type { SupportedLocale } from "../types/index.js";


/**
 * register: crea un nuevo usuario (client o professional),
 * genera un token de confirmación y envía email.
 */
const registerUser = async (req: RegisterRequest, res: Response) => {
  const {
    name,
    email,
    password,
    role,
    locale: rawLocale,
    country = "CR",
  } = req.body;

  const locale: SupportedLocale =
    rawLocale === "en" ? "en" : "es";

  const emailDomain = email.split("@")[1]?.toLowerCase() || "";

  const riskyProviders = [
    "hotmail.com",
    "outlook.com",
    "live.com",
    "msn.com",
  ];

  const needsManualConfirm = riskyProviders.includes(emailDomain);

  try {
    // 1. Validar rol permitido
    if (!["client", "professional"].includes(role)) {
      return res.status(400).json({ code: "ERR_INVALID_ROLE" });
    }

    // 2. Validar contraseña
    if (!password || password.trim() === "") {
      return res.status(400).json({ code: "ERR_INVALID_PASSWORD" });
    }

    // 3. Verificar si ya existe el email
    const existeUsuario = await User.findOne({ where: { email } });
    if (existeUsuario) {
      return res.status(400).json({ code: "ERR_EMAIL_EXISTS" });
    }

    // 4. Generar customId
    const customId = generateCustomId(
      role === "client" ? "CLI" : role === "professional" ? "PRO" : "ADM"
    );

    // 5. Crear usuario
    const isActive = role === "client";

    // Actualizar el contexto de la solicitud con el customId generado para la auditoría
    const store = requestContext.getStore();
    if (store) {
      store.userId = customId;
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      isActive,
      locale,
      token: generarId(),
      confirmado: false,
      customId,
    });

    // 6. Crear perfil de cliente
    if (role === "client") {
      await Client.create({
        userId: user.id,
        fullName: null,
        birthDate: null,
        documentType: null,
        documentNumber: null,

        phone: null,
        altPhone: null,
        preferredContact: "WHATSAPP",

        categoryCode: "C",

        address: null,
        countryCode: country || "CR",
        administrativeAreaLevel1: null,
        administrativeAreaLevel2: null,
        city: null,
        state: null,
        postalCode: null,
        lat: null,
        lng: null,

        profileImage: null,
        notes: null,
        marketingOptIn: false,

        bankName: null,
        accountNumber: null,
        accountHolder: null,
      });
    }

    // 7. Crear perfil de profesional
    if (role === "professional") {
      await Professional.create({
        userId: user.id,
        firstName: null,
        secondName: null,
        lastName: null,
        secondLastName: null,
        phone: null,
        country: null,
        address: null,
        lat: null,
        lng: null,
        bankName: null,
        accountNumber: null,
        accountHolder: null,
        profileImage: null,
        hasVehicle: false,
        vehicleType: null,
        canTravel: false,
        available: true,
      });
    }

    // 8. Enviar email
    await confirmEmailToken({
      name: user.name,
      email: user.email,
      token: user.token,
      role: user.role,
      locale,
    });

    // 9. Respuesta exitosa
    return res.status(201).json({
      code: "SUCCESS_USER_REGISTERED",
      user: {
        id: user.id,
        email: user.email,
        locale: user.locale,
      },
      needsManualConfirm,
      confirmUrl: needsManualConfirm
        ? `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/${locale}/auth/confirm/${user.token}`
        : null,
    } satisfies AuthRegisterResponseSuccess);

  } catch (error) {
    console.error("❌ Error en register:", error);
    return res.status(500).json({ code: "ERR_INTERNAL_SERVER" });
  }
};

/**
 * confirmAccount: confirma la cuenta de un usuario
 * usando el token enviado por email.
 */
const confirmUserAccount = async (req: any, res: any) => {
  const { token } = req.params;

  try {
    // Buscar usuario por token de confirmación
    const user = await User.findOne({ where: { token } });
    if (!user) {
      return res.status(400).json({ code: "ERR_INVALID_CONFIRM_TOKEN" });
    }

    // Marcar la cuenta como confirmada y limpiar el token
    user.token = null;
    user.confirmado = true;
    user.confirmedAt = new Date();

    // Dependiendo del rol, activar inmediatamente o dejar pending approval
    if (["admin", "client"].includes(user.role)) {
      user.isActive = true;
    } else { // professional
      user.isActive = false;
    }

    // Actualizar el contexto de la solicitud con el customId para la auditoría
    const store = requestContext.getStore();
    if (store) {
      store.userId = user.customId;
    }

    await user.save();

    // Responder indicando si la cuenta está activa o pendiente de aprobación
    return res.json({
      code: user.isActive
        ? "SUCCESS_ACCOUNT_CONFIRMED"
        : "SUCCESS_ACCOUNT_PENDING_APPROVAL",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        locale: user.locale || "es",
        isActive: user.isActive,
      },
    });

  } catch (error) {
    console.error("Error al confirmar cuenta:", error);
    return res.status(500).json({ code: "ERR_INTERNAL_SERVER" });
  }
};

/**
 * login: autentica al usuario,
 * verifica estado y crea JWT enviado en cookie.
 */
const authenticateUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  // Validar que existan credenciales
  if (!email || !password) {
    console.log("login:", "ERR_INVALID_FIELDS");
    return res.status(400).json({ code: "ERR_INVALID_FIELDS" });
  }

  try {
    // Traer usuario con password incluido
    const user = await User.findOne({
      where: { email },
      attributes: { include: ["password"] },
    });


    // Validar que el usuario exista
    if (!user) {
      console.log("login:", "ERR_USER_NOT_FOUND");
      return res.status(401).json({ code: "ERR_USER_NOT_FOUND" });
    }

    // Validar que el usuario haya sido confirmado
    if (!user.confirmado) {
      console.log("login:", "ERR_NOT_CONFIRMED");
      return res.status(403).json({ code: "ERR_NOT_CONFIRMED" });
    }
    // Validar que el usuario haya sido activado
    if (!user.isActive) {
      console.log("login:", "ERR_NOT_ACTIVE");
      return res.status(403).json({ code: "ERR_NOT_ACTIVE" });
    }

    // Comparar contraseña con hash guardado
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("login:", "ERR_INVALID_PASSWORD");
      return res.status(401).json({ code: "ERR_INVALID_PASSWORD" });
    }

    // Generar JWT y enviarlo en cookie segura
    const token = generarJWT({ id: user.id, customId: user.customId, name: user.name, role: user.role });
    res.cookie(process.env.COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.COOKIE_HTTPS === "true",
      sameSite: "Strict",
      maxAge: parseInt(process.env.COOKIE_MAX_AGE ?? "86400000"), // 1 día por defecto
    });

    // Responder con datos de usuario (sin password ni token)
    res.json({
      code: "SUCCESS_LOGIN",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        locale: user.locale || "es",
      },
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ code: "ERR_INTERNAL_SERVER" });
  }
};

/**
 * logout: elimina la cookie de sesión en el cliente.
 */
const logoutUser = (req: any, res: any) => {
  res.clearCookie(process.env.COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.COOKIE_HTTPS === "true",
    sameSite: "Strict",
  });
  res.json({ code: "SUCCESS_LOGOUT" });
};

/**
 * forgotPassword: genera un token de restablecimiento
 * y envía email con instrucciones.
 */
const requestPasswordReset = async (req: any, res: any) => {
  const { email } = req.body;

  try {
    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ code: "ERR_USER_NOT_FOUND" });
    }

    // Validar que el usuario haya sido confirmado
    if (!user.confirmado) {
      console.log("login:", "ERR_NOT_CONFIRMED");
      return res.status(403).json({ code: "ERR_NOT_CONFIRMED" });
    }

    // Asignar nuevo token y guardarlo
    user.token = generarId();
    await user.save();

    // Enviar email con enlace de restablecimiento
    await resetPasswordToken({
      email: user.email,
      name: user.name,
      token: user.token,
      locale: user.locale || "es",
    });

    res.json({ code: "SUCCESS_PASSWORD_RESET_EMAIL_SENT" });

  } catch (error) {
    console.error("Error en forgotPassword:", error);
    res.status(500).json({ code: "ERR_INTERNAL_SERVER" });
  }
};

/**
 * verifyToken: valida que el token de restablecimiento exista.
 */
const verifyPasswordResetToken = async (req: any, res: any) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ where: { token } });
    if (!user) {
      return res.status(404).json({ code: "ERR_INVALID_RESET_TOKEN" });
    }
    res.json({ code: "SUCCESS_VALID_TOKEN" });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).json({ code: "ERR_INTERNAL_SERVER" });
  }
};

/**
 * resetPassword: actualiza la contraseña de un usuario
 * usando el token de restablecimiento.
 */
const resetUserPassword = async (req: any, res: any) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Buscar usuario por token
    const user = await User.findOne({ where: { token } });
    if (!user) {
      return res.status(404).json({ code: "ERR_INVALID_RESET_TOKEN" });
    }

    // Usar setter del modelo para hash automático
    user.set("password", password);
    user.token = null;
    await user.save();

    res.json({ code: "SUCCESS_PASSWORD_UPDATED" });

  } catch (error) {
    console.error("Error al actualizar contraseña:", error);
    res.status(500).json({ code: "ERR_INTERNAL_SERVER" });
  }
};


const resetUserPasswordById = async (req: any, res: any) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    // Buscar usuario por token
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ code: "ERR_USER_NOT_FOUND" });
    }

    // Usar setter del modelo para hash automático
    user.set("password", password);
    user.token = null;
    await user.save();

    res.json({ code: "SUCCESS_PASSWORD_UPDATED" });

  } catch (error) {
    console.error("Error al actualizar contraseña:", error);
    res.status(500).json({ code: "ERR_INTERNAL_SERVER" });
  }
};

/**
 * checkAuth: confirma que el JWT siga válido
 * y devuelve datos básicos del usuario.
 */
const checkAuthentication = async (req: any, res: any) => {
  try {
    // El usuario ya viene cargado desde loadUserMiddleware
    const user = req.dbUser;

    if (!user) {
      return res.status(401).json({ code: "ERR_USER_NOT_LOADED" });
    }

    return res.json({
      code: "SUCCESS_AUTH_CHECK",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        locale: user.locale || "es",
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Error en checkAuth:", error);
    return res.status(500).json({ code: "ERR_INTERNAL_SERVER" });
  }
};

export {
  registerUser,
  confirmUserAccount,
  authenticateUser,
  logoutUser,
  requestPasswordReset,
  verifyPasswordResetToken,
  resetUserPassword,
  checkAuthentication,
  resetUserPasswordById,
};
