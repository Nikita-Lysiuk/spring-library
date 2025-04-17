import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/features/auth/api/auth-api';
import { JwtAuthResponse, SignUpType } from '@/features/auth/types';
import toast from 'react-hot-toast';

const useSignUp = () => {
  const mutation = useMutation({
    mutationFn: (data: SignUpType) => signUp(data),
    onMutate: () => {
      toast.loading('Register user...');
    },
    onSuccess: data => {
      console.log('Successfully signed up: ', data);
    },
    onError: (error: any) => {
      console.log('Error signing up: ', error.response?.data);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const handleRegister = async (
    data: SignUpType
  ): Promise<{
    success: boolean;
    error?: string;
    tokens: JwtAuthResponse | undefined;
  }> => {
    try {
      const result = await mutation.mutateAsync(data);
      return { success: true, tokens: result };
    } catch (error: any) {
      console.log('Error signing up', error);
      return { success: false, error: error.response?.data, tokens: undefined };
    }
  };

  return { handleRegister };
};

export default useSignUp;
