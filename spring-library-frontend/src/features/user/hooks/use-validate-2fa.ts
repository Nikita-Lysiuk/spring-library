import { useAuthStore, useModalStore } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { validate2FAType } from '@/features/user/types';
import { validate2FA } from '@/features/user/api/user-api';
import toast from 'react-hot-toast';

const useValidate2FA = () => {
  const { accessToken } = useAuthStore.getState();
  const { close, isOpen } = useModalStore.getState();

  const mutation = useMutation({
    mutationFn: async (data: validate2FAType) => validate2FA(data),
    onMutate: () => {
      toast.loading('Validating 2FA...');
    },
    onSettled: () => {
      toast.dismiss();
      if (isOpen) {
        close();
      }
    },
  });

  const handleValidate2FA = async (pin: string) => {
    if (!accessToken) return;

    const response = await mutation.mutateAsync({
      token: accessToken,
      pin,
    });

    response.success
      ? toast.success(response.message)
      : toast.error(response.message);
  };

  return { handleValidate2FA };
};

export default useValidate2FA;
