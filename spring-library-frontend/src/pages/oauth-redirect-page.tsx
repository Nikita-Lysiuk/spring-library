import { useAuthStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const OAuthRedirectPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
  const { login } = useAuthStore();

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      console.error('Access token or refresh token is missing in the URL.');
      navigate('/sign-in', { replace: true });
      return;
    }

    login(accessToken, refreshToken);
    console.log('Access token:', accessToken);
    console.log('Refresh token:', refreshToken);

    navigate('/dashboard', { replace: true });
  }, []);

  return <></>;
};

export default OAuthRedirectPage;
