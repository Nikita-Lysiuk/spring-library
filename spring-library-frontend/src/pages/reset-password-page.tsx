import { useModalStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const ResetPasswordPage = () => {
  const { open } = useModalStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      console.error('Token is missing in the URL.');

      navigate('/', { replace: true });
      return;
    }

    localStorage.setItem('resetPasswordToken', token);
    open('resetPassword');
    navigate('/', { replace: true });
  }, [open, navigate, token]);

  return <></>;
};

export default ResetPasswordPage;
