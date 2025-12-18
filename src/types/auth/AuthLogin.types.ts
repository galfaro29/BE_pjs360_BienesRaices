export interface AuthLoginBody {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  success: boolean;
  token: string;
  userId: number;
}