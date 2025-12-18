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


export const EMAIL_MESSAGES: Record<SupportedLocale, EmailMessages> = {
  es: {
    subjectConfirm: (rol: string) =>
      `Confirma tu cuenta (${rol}) en PJS360.com`,
    saludo: (nombre: string) => `Hola ${nombre},`,
    mensaje: (rol: string) =>
      `Gracias por registrarte como <strong>${rol}</strong> en <strong>PJS360.com</strong>. Para activar tu cuenta, haz clic en el siguiente botón:`,
    boton: "🔒 Confirmar Cuenta",
    aviso: "Si tú no creaste esta cuenta, puedes ignorar este mensaje.",

    subjectResetPassword: "Restablece tu contraseña en PJS360.com",
    textResetPassword: "Restablece tu contraseña en PJS360.com",
    mensajeResetPassword:
      "Has solicitado restablecer tu contraseña en PJS360.com. Para generar una nueva contraseña, haz clic en el botón de abajo:",
    botonResetPassword: "🔐 Restablecer Contraseña",
    avisoResetPassword:
      "Si tú no solicitaste este cambio, puedes ignorar este mensaje.",
  },

  en: {
    subjectConfirm: (role: string) =>
      `Confirm your account (${role}) at PJS360.com`,
    saludo: (name: string) => `Hi ${name},`,
    mensaje: (role: string) =>
      `Thanks for registering as a <strong>${role}</strong> at <strong>PJS360.com</strong>. To activate your account, click the button below:`,
    boton: "🔒 Confirm Account",
    aviso:
      "If you didn't create this account, you can safely ignore this message.",

    subjectResetPassword: "Reset your password at PJS360.com",
    textResetPassword: "Reset your password at PJS360.com",
    mensajeResetPassword:
      "You requested to reset your password on PJS360.com. To create a new one, click the button below:",
    botonResetPassword: "🔐 Reset Password",
    avisoResetPassword:
      "If you did not request this, please ignore this email.",
  },
};
