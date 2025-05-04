import { useAuthStore } from '@/store';
import { Navigate, Outlet } from 'react-router';

const AdminProtected = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !(user?.role === 'ROLE_ADMIN')) {
    console.log('User is not authenticated or not an admin');
    return <Navigate to={'/dashboard'} replace />;
  }

  return <Outlet />;
};

export default AdminProtected;
