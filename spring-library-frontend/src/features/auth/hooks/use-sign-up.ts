import { useAuthStore } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { signUp, SignUpType } from '@/features/auth/api/auth-api';
import toast from 'react-hot-toast';

const useSignUp = () => {
  const { login } = useAuthStore();

  const mutation = useMutation({
    mutationFn: (data: SignUpType) => signUp(data),
    onMutate: () => {
      toast.loading('Register user...');
    },
    onSuccess: data => {
      login(data.token);
    },
    onError: error => {
      console.error('useSignUp Error: ', error);
    },
  });

  const onSubmit = async (
    data: SignUpType
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const registerData: SignUpType = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };
      await mutation.mutateAsync(registerData);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'An error occurred',
      };
    } finally {
      toast.dismiss();
    }
  };

  return { onSubmit };
};

export default useSignUp;
