import { useAuthStore } from '@/store';
import { SignInType, signIn } from '@/features/auth/api/auth-api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useSignIn = () => {
  const { login } = useAuthStore();

  const mutation = useMutation({
    mutationFn: (data: SignInType) => signIn(data),
    onMutate: () => {
      toast.loading('Signing in...');
    },
    onSuccess: data => {
      login(data.token);
    },
    onError: error => {
      console.error('Error: ', error);
    },
  });

  const onSubmit = async (
    data: SignInType
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      await mutation.mutateAsync(data);
      return { success: true };
    } catch (error: any) {
      console.error('Error: ', error);
      return {
        success: false,
        error: error.response?.data?.message || 'An error occurred',
      };
    } finally {
      toast.dismiss();
    }
  };

  return { onSubmit };
};

export default useSignIn;
