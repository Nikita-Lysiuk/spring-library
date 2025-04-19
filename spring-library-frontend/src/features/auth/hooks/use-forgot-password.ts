import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '@/features/auth/api/auth-api';
import toast from 'react-hot-toast';

const useForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onMutate: () => {
      toast.loading('Sending password reset email...');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const handleForgotPassword = async (email: string) => {
    try {
      const response = await mutation.mutateAsync(email);
      if (response.success) {
        toast.success('Check your email for password reset instructions!');
      } else {
        toast.error('Failed to send password reset email. Please try again.');
      }
    } catch (error) {
      console.error('Error in handleForgotPassword:', error);
      toast.error('An error occurred while sending the password reset email.');
    }
  };

  return { handleForgotPassword };
};

export default useForgotPassword;
