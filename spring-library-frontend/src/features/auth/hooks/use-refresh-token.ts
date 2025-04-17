import { useAuthStore } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { refreshTokenApi } from '@/features/auth/api/auth-api';

const useRefreshToken = () => {
  const { refreshToken, login, logout } = useAuthStore();

  const mutation = useMutation({
    mutationFn: (data: string) => refreshTokenApi(data),
    onMutate: () => {
      console.log('Refreshing token...');
    },
    onSuccess: data => {
      login(data.accessToken, data.refreshToken);
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        console.log('Refresh token expired, logging out ...');
      } else {
        console.log('Error refreshing token', error.response?.data);
      }
      logout();
    },
  });

  const onSubmit = async (): Promise<{ success: boolean; error?: string }> => {
    if (!refreshToken) {
      logout();
      return { success: false, error: 'No refresh token available' };
    }

    await mutation.mutateAsync(refreshToken);
    return mutation.isSuccess
      ? { success: true }
      : { success: false, error: mutation.error as string };
  };

  return { onSubmit };
};

export default useRefreshToken;
