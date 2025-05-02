import { useMutation } from '@tanstack/react-query';
import { enable2FA } from '@/features/user/api/user-api';
import { useAuthStore } from '@/store';
import toast from 'react-hot-toast';

const useEnable2FA = () => {
  const { accessToken } = useAuthStore();

  const mutation = useMutation({
    mutationFn: (token: string) => enable2FA(token),
    onMutate: () => {
      toast.loading('Generating qr code...');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const handleEnable2FA = async () => {
    if (!accessToken) return;

    const response = await mutation.mutateAsync(accessToken);

    !response.success && toast.error(response.message);

    return response.data?.qrCodeImageBase64;
  };

  return { handleEnable2FA };
};

export default useEnable2FA;
