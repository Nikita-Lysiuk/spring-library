import { JwtAuthResponse, SignInType } from '@/features/auth/types';
import { signIn } from '@/features/auth/api/auth-api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useSignIn = () => {
  const mutation = useMutation({
    mutationFn: (data: SignInType) => signIn(data),
    onMutate: () => {
      toast.loading('Signing in...');
    },
    onSuccess: data => {
      console.log('Successfully signed in: ', data);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data || 'Error signing in';
      console.log('Error signing in: ', errorMessage);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const handleLogin = async (
    data: SignInType
  ): Promise<{
    success: boolean;
    error?: string;
    tokens: JwtAuthResponse | undefined;
  }> => {
    try {
      const result = await mutation.mutateAsync(data);
      return { success: true, tokens: result };
    } catch (error: any) {
      console.log('Error signing in', error);
      return { success: false, error: error.response?.data, tokens: undefined };
    }
  };

  return { handleLogin };
};

export default useSignIn;
