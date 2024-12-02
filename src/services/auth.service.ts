import api from '../lib/axios';
import { LoginInput, RegisterInput } from '../lib/validation/auth.schema';

export async function login(data: LoginInput) {
  const response = await api.post('/auth/login', data);
  return response.data;
}

export async function register(data: RegisterInput) {
  const response = await api.post('/auth/register', data);
  return response.data;
}

export async function logout() {
  const response = await api.post('/auth/logout');
  return response.data;
}