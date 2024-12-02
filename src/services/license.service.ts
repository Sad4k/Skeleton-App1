import api from '../lib/axios';

export interface License {
  id: string;
  type: string;
  status: 'active' | 'expired' | 'suspended';
  expiresAt: string;
  features: string[];
}

export async function getLicenseDetails() {
  const response = await api.get<License>('/license');
  return response.data;
}

export async function activateLicense(licenseKey: string) {
  const response = await api.post('/license/activate', { licenseKey });
  return response.data;
}