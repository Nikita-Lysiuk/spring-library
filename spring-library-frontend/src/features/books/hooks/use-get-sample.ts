import { axiosInstance } from '@/lib';
import { useAuthStore } from '@/store';
import { ApiResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useGetSample = (bookId: string, enabled: boolean) => {
  const accessToken = useAuthStore(state => state.accessToken);

  return useQuery({
    queryKey: ['book-sample', bookId],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error('Access token is required to fetch book sample');
      }

      const response = await axiosInstance.get<ApiResponse<string>>(
        `/api/books/${bookId}/sample`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch book sample');
      }

      return response.data.data;
    },
    enabled: enabled && !!bookId && !!accessToken,
  });
};

export default useGetSample;
