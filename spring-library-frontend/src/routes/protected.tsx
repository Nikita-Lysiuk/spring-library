import { Spinner } from '@/components';
import { useRefreshToken, useValidateToken } from '@/features/auth/hooks';
import { useAuthStore } from '@/store';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

const Protected = () => {
  const { isAuthenticated, accessToken, refreshToken, login, logout } =
    useAuthStore();
  const { onSubmit: refreshTokenHandler } = useRefreshToken();
  const { validate } = useValidateToken();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      if (!isAuthenticated) {
        setIsValid(false);
        return;
      }

      if (accessToken && refreshToken) {
        try {
          const isValid = await validate(accessToken);
          if (!isValid) {
            console.error('Token is invalid, refreshing...');
            const { tokens, error } = await refreshTokenHandler(refreshToken);

            console.log('Tokens after refresh:', tokens);

            if (error) {
              console.error('Error refreshing token:', error);
              setIsValid(false);
              logout();
              return;
            }

            if (tokens) {
              login(tokens.accessToken, tokens.refreshToken);
              setIsValid(true);
            } else {
              setIsValid(false);
            }
          } else {
            setIsValid(true);
          }
        } catch (error: any) {
          console.error('Error validating token:', error);
          setIsValid(false);
          logout();
          return;
        }
      }
    };

    checkToken();
  }, [accessToken, refreshToken, isAuthenticated]);

  if (isValid === null) {
    return <Spinner />; // or a loading spinner
  }

  return isValid ? <Outlet /> : <Navigate to={'/sign-in'} replace />;
};

export default Protected;
