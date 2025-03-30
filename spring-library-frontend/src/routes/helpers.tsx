import { useAuthStore } from '@/store';
import { redirect } from 'react-router';

const isAuthenticated = () => {
  const { isAuthenticated, isTokenExpired } = useAuthStore.getState();

  if (isAuthenticated && !isTokenExpired()) throw redirect('/dashboard');
  return null;
};

export default isAuthenticated;
