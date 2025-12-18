import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import {SupportedLocale} from "../types/index.js";
import { EMAIL_MESSAGES } from "./emailMessagesLocale.js";

/**
 * Configuración del transportador SMTP
 */
const transporter: Transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: Number(process.env.EMAIL_PORT) === 465,
});

/**
 * Datos base para enviar correos
 */
interface SendEmailData extends SendMailOptions {
  to: string;
}

/**
 * Enviar correo
 */
const sendEmail = async (emailData: SendEmailData): Promise<void> => {
  try {
    const info = await transporter.sendMail(emailData);
    console.log("📧 Correo enviado:", info.messageId);
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    throw new Error("No se pudo enviar el correo electrónico");
  }
};

/**
 * Datos para confirmación de cuenta
 */
interface ConfirmEmailData {
  email: string;
  name: string;
  token: string;
  role?: "admin" | "professional" | "client" | "user";
  locale?: SupportedLocale;
}

/**
 * Enviar correo de confirmación
 */
export const confirmEmailToken = async ({
  email,
  name,
  token,
  role = "user",
  locale = "es",
}: ConfirmEmailData): Promise<void> => {
  const t = EMAIL_MESSAGES[locale];

  const roleTextMap: Record<SupportedLocale, Record<string, string>> = {
    es: {
      admin: "Administrador",
      professional: "Profesional",
      client: "Cliente",
      user: "Usuario",
    },
    en: {
      admin: "Administrator",
      professional: "Professional",
      client: "Client",
      user: "User",
    },
  };

  const roleText = roleTextMap[locale][role] ?? "Usuario";

  const emailData: SendEmailData = {
    from: `"PJS360" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: t.subjectConfirm(roleText),
    text: "Confirma tu cuenta en PJS360.com",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
        <div style="text-align: center;">
          <img src="https://cdn-icons-png.flaticon.com/512/69/69524.png" width="80" />
        </div>

        <h2>${t.saludo(name)}</h2>
        <p>${t.mensaje(roleText)}</p>

        <div style="text-align:center;margin:30px 0">
          <a
            href="${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/${locale}/auth/confirm/${token}"
            style="background:#28a745;color:#fff;padding:14px 25px;border-radius:5px;text-decoration:none;font-weight:bold"
          >
            ${t.boton}
          </a>
        </div>

        <p style="font-size:14px;color:#999">${t.aviso}</p>
      </div>
    `,
  };

  await sendEmail(emailData);
};

/**
 * Datos para reset de contraseña
 */
interface ResetPasswordEmailData {
  email: string;
  name: string;
  token: string;
  locale?: SupportedLocale;
}

/**
 * Enviar correo de restablecimiento de contraseña
 */
export const resetPasswordToken = async ({
  email,
  name,
  token,
  locale = "es",
}: ResetPasswordEmailData): Promise<void> => {
  const t = EMAIL_MESSAGES[locale];

  const emailData: SendEmailData = {
    from: `"PJS360" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: t.subjectResetPassword,
    text: t.textResetPassword,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
        <div style="text-align: center;">
          <img src="https://cdn-icons-png.flaticon.com/512/69/69524.png" width="80" />
        </div>

        <h2>${t.saludo(name)}</h2>
        <p>${t.mensajeResetPassword}</p>

        <div style="text-align:center;margin:30px 0">
          <a
            href="${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/${locale}/auth/reset-password/${token}"
            style="background:#dc3545;color:#fff;padding:14px 25px;border-radius:5px;text-decoration:none;font-weight:bold"
          >
            ${t.botonResetPassword}
          </a>
        </div>

        <p style="font-size:14px;color:#999">${t.avisoResetPassword}</p>
      </div>
    `,
  };

  await sendEmail(emailData);
};