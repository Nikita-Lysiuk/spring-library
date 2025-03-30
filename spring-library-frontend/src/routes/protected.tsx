import { useAuthStore } from '@/features/auth/hooks/use-auth-store';
import { Navigate, Outlet } from 'react-router';

const Protected = () => {
  const { isAuthenticated, isTokenExpired } = useAuthStore(state => ({
    isAuthenticated: state.isAuthenticated,
    isTokenExpired: state.isTokenExpired,
  }));

  if (!isAuthenticated || isTokenExpired()) {
    return <Navigate to={'/sign-in'} replace />;
  }

  return <Outlet />;
};

export default Protected;
