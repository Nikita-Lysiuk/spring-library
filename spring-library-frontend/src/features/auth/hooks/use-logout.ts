import { useMutation } from '@tanstack/react-query';
import { logout } from '@/features/auth/api/auth-api';
import { LogoutType } from '@/features/auth/types';
import toast from 'react-hot-toast';

const useLogout = () => {
  const mutation = useMutation({
    mutationFn: (data: LogoutType) => logout(data),
    onMutate: () => {
      toast.loading('Logging out...');
    },
    onSuccess: () => {
      console.log('Logout successful!');
    },
    onError: (error: any) => {
      console.error('Logout failed!' + error.message);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const handleLogout = async (data: LogoutType) => {
    await mutation.mutateAsync(data);
  };

  return { handleLogout };
};

export default useLogout;
