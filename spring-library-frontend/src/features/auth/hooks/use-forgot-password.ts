import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '@/features/auth/api/auth-api';
import toast from 'react-hot-toast';

const useForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onMutate: () => {
      toast.loading('Sending password reset email...');
    },
    onError: (error: any) => {
      console.error('Error:', error);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const handleForgotPassword = async (email: string) => {
    const response = await mutation.mutateAsync(email);
    response.success
      ? toast.success(response.message)
      : toast.error(response.message);

    return response.success;
  };

  return { handleForgotPassword };
};

export default useForgotPassword;
