import api from '../../../lib/axios';
import type { LoginInput, RegisterInput, AuthResponse } from '../types';

export async function login(data: LoginInput): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
}

export async function register(data: RegisterInput): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}