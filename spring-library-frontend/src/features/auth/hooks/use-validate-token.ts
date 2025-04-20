import { useMutation } from '@tanstack/react-query';
import { validateToken } from '@/features/auth/api/auth-api';

const useValidateToken = () => {
  const mutation = useMutation({
    mutationFn: (token: string) => validateToken(token),
    onSuccess: data => {
      console.log('Token validation successful: ', data);
    },
    onError: error => {
      console.error('Token validation failed:', error);
    },
  });

  const validate = async (token: string): Promise<boolean> => {
    try {
      const response = await mutation.mutateAsync(token);
      return response.isValid;
    } catch (error: any) {
      console.error('Error validating token:', error);
      return false;
    }
  };

  return { validate };
};

export default useValidateToken;
