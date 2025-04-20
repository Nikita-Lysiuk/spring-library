import { useMutation } from '@tanstack/react-query';
import { ResetPasswordType } from '@/features/auth/types';
import { resetPassword } from '@/features/auth/api/auth-api';
import toast from 'react-hot-toast';

const UseResetPassword = () => {
  const mutation = useMutation({
    mutationFn: (data: ResetPasswordType) => resetPassword(data),
    onMutate: () => {
      toast.loading('Resetting password...');
    },
    onError: (error: any) => {
      console.error('Error:', error);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const handleResetPassword = async (data: ResetPasswordType) => {
    const response = await mutation.mutateAsync(data);
    response.success
      ? toast.success(response.message)
      : toast.error(response.message);

    return response.success;
  };

  return { handleResetPassword };
};

export default UseResetPassword;
