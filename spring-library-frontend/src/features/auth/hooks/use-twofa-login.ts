import { useAuthStore } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { send2FACode } from '@/features/auth/api/auth-api';
import { TwoFALoginType } from '@/features/auth/types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const useTwoFaLogin = () => {
  const { userId, login } = useAuthStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: TwoFALoginType) => send2FACode(data),
    onMutate: () => {
      toast.loading('Verifying...');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const handleTwoFALogin = async (code: string) => {
    try {
      if (!userId) return;

      const response = await mutation.mutateAsync({
        pin: code,
        userId,
      });

      if (response.accessToken && response.refreshToken) {
        login(response.accessToken, response.refreshToken);
        toast.success('Login successful!');
        navigate('/dashboard', { replace: true });
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Error during 2FA login:', error);
      toast.error('Invalid code. Please try again.');
    }
  };

  return { handleTwoFALogin };
};

export default useTwoFaLogin;
