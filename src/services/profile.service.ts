import api from '../lib/axios';
import { ProfileInput, PasswordInput } from '../lib/validation/profile.schema';

export async function updateProfile(data: ProfileInput) {
  const response = await api.put('/profile', data);
  return response.data;
}

export async function updatePassword(data: PasswordInput) {
  const response = await api.put('/profile/password', data);
  return response.data;
}

export async function getProfile() {
  const response = await api.get('/profile');
  return response.data;
}