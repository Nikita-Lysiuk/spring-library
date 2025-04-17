import { Spinner } from '@/components';
import { useRefreshToken } from '@/features/auth/hooks';
import { useAuthStore } from '@/store';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

const Protected = () => {
  const { isAuthenticated, isTokenExpired } = useAuthStore();
  const { onSubmit: refreshTokenHandler } = useRefreshToken();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      if (!isAuthenticated) {
        setIsValid(false);
        return;
      }

      const isExpired = await isTokenExpired(refreshTokenHandler);
      setIsValid(!isExpired);
    };

    checkToken();
  }, []);

  if (isValid === null) {
    return <Spinner />; // or a loading spinner
  }

  return isValid ? <Outlet /> : <Navigate to={'/sign-in'} replace />;
};

export default Protected;
