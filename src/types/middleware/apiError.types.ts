export interface ApiErrorResponse {
  code: string;
  message?: string;
}

export interface ApiSuccessResponse<T = unknown> {
  code: string;
  data?: T;
}