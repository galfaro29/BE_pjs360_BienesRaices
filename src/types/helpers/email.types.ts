export type SupportedLocale = "es" | "en";

export interface EmailMessages {
  subjectConfirm: (role: string) => string;
  saludo: (name: string) => string;
  mensaje: (role: string) => string;
  boton: string;
  aviso: string;

  subjectResetPassword: string;
  textResetPassword: string;
  mensajeResetPassword: string;
  botonResetPassword: string;
  avisoResetPassword: string;
}