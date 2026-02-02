import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import { SupportedLocale } from "../types/index.js";
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
 * Genera el template HTML premium para los correos
 */
const getHtmlTemplate = (title: string, message: string, buttonText: string, buttonUrl: string, footerText: string) => {
  const appName = process.env.APP_NAME || "PJS360";
  // Imagen de cabecera (Casa moderna similar a referencia - Blue hour/Pool)
  const heroImage = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  const logoUrl = "https://cdn-icons-png.flaticon.com/512/69/69524.png";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f7; color: #51545E; }
        .email-wrapper { width: 100%; background-color: #f4f4f7; padding: 20px; }
        .email-content { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .email-header { background-color: #2D3748; padding: 20px; text-align: center; }
        .email-header img { max-width: 50px; vertical-align: middle; }
        .email-header h2 { color: #ffffff; margin: 10px 0 0; font-size: 20px; font-weight: 600; }
        .email-hero { width: 100%; height: 200px; background-image: url('${heroImage}'); background-size: cover; background-position: center; position: relative; }
        .email-hero-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(45,55,72,0) 0%, rgba(45,55,72,0.6) 100%); }
        .email-hero-text { position: absolute; bottom: 20px; left: 20px; color: #ffffff; font-size: 24px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
        .email-body { padding: 40px 30px; font-size: 16px; line-height: 1.6; color: #333333; }
        .email-button { display: inline-block; background-color: #0056b3; color: #ffffff; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold; margin-top: 20px; text-align: center; }
        .email-footer { padding: 20px; text-align: center; font-size: 12px; color: #6b6e76; background-color: #fafafa; border-top: 1px solid #eaeaec; }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="email-content">
          <!-- Header con Marca -->
          <div class="email-header">
            <img src="${logoUrl}" alt="${appName}" />
            <h2>${appName}</h2>
          </div>
          
          <!-- Hero Image con Texto -->
          <div class="email-hero">
            <div class="email-hero-overlay"></div>
            <div class="email-hero-text">${title}</div>
          </div>

          <!-- Cuerpo del Mensaje -->
          <div class="email-body">
            ${message}
            <div style="text-align: center; margin-top: 30px;">
              <a href="${buttonUrl}" class="email-button">${buttonText}</a>
            </div>
          </div>

          <!-- Footer -->
          <div class="email-footer">
            <p>${footerText}</p>
            <p>&copy; ${new Date().getFullYear()} ${appName}. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
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
  const appName = process.env.APP_NAME;
  const appUrl = process.env.APP_URL;

  // Construir la URL completa para el botón
  const confirmUrl = `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/${locale}/auth/confirm/${token}`;

  // Construir el mensaje completo con el saludo
  const fullMessage = `<p><strong>${t.saludo(name)}</strong></p><p>${t.mensaje(roleText)}</p>`;

  const emailHtml = getHtmlTemplate(
    t.subjectConfirm(roleText), // Título en la imagen Hero
    fullMessage,
    t.boton,
    confirmUrl,
    t.aviso
  );

  const emailData: SendEmailData = {
    // @ts-ignore
    from: `"${appName}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: t.subjectConfirm(roleText),
    text: `Confirma tu cuenta en ${(appUrl || '').replace(/^https?:\/\//, '')}`,
    html: emailHtml,
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
  const appName = process.env.APP_NAME;

  // Construir la URL completa para el botón
  const resetUrl = `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/${locale}/auth/reset-password/${token}`;

  const fullMessage = `<p><strong>${t.saludo(name)}</strong></p><p>${t.mensajeResetPassword}</p>`;

  const emailHtml = getHtmlTemplate(
    t.subjectResetPassword, // Título en la imagen Hero
    fullMessage,
    t.botonResetPassword,
    resetUrl,
    t.avisoResetPassword
  );

  const emailData: SendEmailData = {
    // @ts-ignore
    from: `"${appName}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: t.subjectResetPassword,
    text: t.textResetPassword,
    html: emailHtml,
  };

  await sendEmail(emailData);
};