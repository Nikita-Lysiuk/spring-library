import { axiosInstance } from '@/lib';
import { useAuthStore } from '@/store';
import { ApiResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { UserBookPdfDto } from '@/features/user-books/types';

const useGetBookPdf = (bookId: string) => {
  const accessToken = useAuthStore(state => state.accessToken);

  return useQuery({
    queryKey: ['book-pdf', bookId],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error('No token while fetching book PDF');
      }

      const response = await axiosInstance.get<ApiResponse<UserBookPdfDto>>(
        `/api/user-books/pdf/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.data.success)
        throw new Error(response.data.message || 'Failed to fetch book PDF');
      return response.data.data;
    },
    enabled: !!bookId && !!accessToken,
  });
};

export default useGetBookPdf;
