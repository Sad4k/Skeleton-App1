import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

export function useAuth(requireAuth = true) {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      navigate('/register');
    } else if (!requireAuth && isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, requireAuth]);

  return { isAuthenticated };
}