export interface User {
  id: string;
  email: string;
  role: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}