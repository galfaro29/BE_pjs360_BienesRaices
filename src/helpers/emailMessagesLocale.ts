/**
 * EMAIL_MESSAGES
 * ----------------
 * Mensajes de correo electrónico por idioma (i18n).
 *
 * Uso:
 * EMAIL_MESSAGES[locale].subjectConfirm(role)
 * EMAIL_MESSAGES[locale].saludo(name)
 */
import { SupportedLocale, EmailMessages } from "../types/index.js";

const getAppUrl = () => process.env.APP_URL || '';
const getAppDomain = () => getAppUrl().replace(/^https?:\/\//, '').replace(/\/$/, '');

export const EMAIL_MESSAGES: Record<SupportedLocale, EmailMessages> = {
  es: {
    subjectConfirm: (rol: string) =>
      `Confirma tu cuenta (${rol}) en ${getAppDomain()}`,
    saludo: (nombre: string) => `Hola ${nombre},`,
    mensaje: (rol: string) =>
      `Gracias por registrarte como <strong>${rol}</strong> en <strong>${getAppDomain()}</strong>. Para activar tu cuenta, haz clic en el siguiente botón:`,
    boton: "🔒 Confirmar Cuenta",
    aviso: "Si tú no creaste esta cuenta, puedes ignorar este mensaje.",

    get subjectResetPassword() { return `Restablece tu contraseña en ${getAppDomain()}`; },
    get textResetPassword() { return `Restablece tu contraseña en ${getAppDomain()}`; },
    get mensajeResetPassword() {
      return `Has solicitado restablecer tu contraseña en ${getAppDomain()}. Para generar una nueva contraseña, haz clic en el botón de abajo:`;
    },
    botonResetPassword: "🔐 Restablecer Contraseña",
    avisoResetPassword:
      "Si tú no solicitaste este cambio, puedes ignorar este mensaje.",
  },

  en: {
    subjectConfirm: (role: string) =>
      `Confirm your account (${role}) at ${getAppDomain()}`,
    saludo: (name: string) => `Hi ${name},`,
    mensaje: (role: string) =>
      `Thanks for registering as a <strong>${role}</strong> at <strong>${getAppDomain()}</strong>. To activate your account, click the button below:`,
    boton: "🔒 Confirm Account",
    aviso:
      "If you didn't create this account, you can safely ignore this message.",

    get subjectResetPassword() { return `Reset your password at ${getAppDomain()}`; },
    get textResetPassword() { return `Reset your password at ${getAppDomain()}`; },
    get mensajeResetPassword() {
      return `You requested to reset your password on ${getAppDomain()}. To create a new one, click the button below:`;
    },
    botonResetPassword: "🔐 Reset Password",
    avisoResetPassword:
      "If you did not request this, please ignore this email.",
  },
};
