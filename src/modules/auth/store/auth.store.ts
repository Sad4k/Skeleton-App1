import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { type User } from '../types';

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>((set) => {
  // Initialize state from localStorage
  const token = localStorage.getItem('token');
  let user = null;
  let isAuthenticated = false;

  if (token) {
    try {
      user = jwtDecode<User>(token);
      isAuthenticated = true;
    } catch (error) {
      localStorage.removeItem('token');
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    setToken: (token: string) => {
      localStorage.setItem('token', token);
      const user = jwtDecode<User>(token);
      set({ token, user, isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem('token');
      set({ token: null, user: null, isAuthenticated: false });
    },
  };
});