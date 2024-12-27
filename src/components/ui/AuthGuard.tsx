import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@stores/Auth.store';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token && location.pathname !== '/signin') {
      navigate('/signin', { replace: true });
    }
  }, [token, navigate, location]);

  if (!token && location.pathname !== '/signin') {
    return null;
  }

  return <>{children}</>;
}