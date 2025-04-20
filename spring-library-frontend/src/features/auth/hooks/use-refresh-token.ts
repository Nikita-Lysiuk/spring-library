import { useMutation } from '@tanstack/react-query';
import { refreshToken } from '@/features/auth/api/auth-api';
import { JwtAuthResponse } from '@/features/auth/types';

const useRefreshToken = () => {
  const mutation = useMutation({
    mutationFn: (data: string) => refreshToken(data),
    onSuccess: data => {
      console.log('Token refreshed successfully: ', data);
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        console.log('Refresh token expired, logging out ...');
      } else {
        console.log('Error refreshing token', error.response?.data);
      }
    },
  });

  const onSubmit = async (
    data: string
  ): Promise<{
    tokens: JwtAuthResponse | undefined;
    error?: string;
  }> => {
    try {
      const response = await mutation.mutateAsync(data);
      return { tokens: response };
    } catch (error: any) {
      console.log('Error refreshing token', error);
      return { tokens: undefined, error: error.response?.data };
    }
  };

  return { onSubmit };
};

export default useRefreshToken;
