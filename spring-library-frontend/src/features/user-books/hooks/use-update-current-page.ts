import { axiosInstance } from '@/lib';
import { useAuthStore } from '@/store';
import { ApiResponse } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateCurrentPage = () => {
  const accessToken = useAuthStore(state => state.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookId,
      newCurrentPage,
    }: {
      bookId: string;
      newCurrentPage: number;
    }) => {
      const response = await axiosInstance.patch<ApiResponse<void>>(
        `/api/user-books/update-current-page/${bookId}`,
        {},
        {
          params: { newCurrentPage },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || 'Failed to update current page'
        );
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-books'] });
    },
  });
};

export default useUpdateCurrentPage;
