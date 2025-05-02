import { useMutation } from '@tanstack/react-query';
import { disable2FA } from '@/features/user/api/user-api';
import { useAuthStore } from '@/store';
import toast from 'react-hot-toast';
import { Disable2FAType } from '@/features/user/types';

const useDisable2FA = () => {
  const { accessToken } = useAuthStore();

  const mutation = useMutation({
    mutationFn: (data: Disable2FAType) => disable2FA(data),
    onMutate: () => {
      toast.loading('Disabling two-factor authentication...');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const handleDisable2FA = async (code: string) => {
    if (!accessToken) return;

    const response = await mutation.mutateAsync({
      token: accessToken,
      code,
    });

    response.success
      ? toast.success('Two-factor authentication disabled successfully')
      : console.log(response.message);
  };

  return { handleDisable2FA };
};

export default useDisable2FA;
