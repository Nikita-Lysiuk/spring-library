import { useAuthStore } from '@/store';
import { redirect } from 'react-router';

const isAuthenticated = () => {
  const { isAuthenticated } = useAuthStore.getState();

  if (isAuthenticated) throw redirect('/dashboard');
  return null;
};

export default isAuthenticated;
