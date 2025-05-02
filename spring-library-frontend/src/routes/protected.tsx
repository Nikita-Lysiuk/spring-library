import { useAuthStore } from '@/store';
import { Navigate, Outlet } from 'react-router';

const Protected = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={'/sign-in'} replace />;
  }

  return <Outlet />;
};

export default Protected;
