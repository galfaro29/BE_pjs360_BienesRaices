// Lo que recibe el backend en req.body
export interface AuthRegisterBody {
  name: string;
  email: string;
  password: string;
  role: "client" | "professional";
  engagementModel?: "commission" | "subscription";
  locale?: string;
  country?: string;
}

// Respuesta exitosa
export interface AuthRegisterResponseSuccess {
  code: "SUCCESS_USER_REGISTERED";
  user: {
    id: number;
    email: string;
    locale: "es" | "en";
  };
  needsManualConfirm: boolean;
  confirmUrl: string | null;
}

// Respuesta en caso de error
export interface AuthRegisterResponseError {
  code:
  | "ERR_INVALID_ROLE"
  | "ERR_INVALID_PASSWORD"
  | "ERR_EMAIL_EXISTS"
  | "ERR_INTERNAL_SERVER";
}

// Express request tipado
export interface RegisterRequest extends Express.Request {
  body: AuthRegisterBody;
}

// Express response tipado
export interface RegisterResponse extends Express.Response { }