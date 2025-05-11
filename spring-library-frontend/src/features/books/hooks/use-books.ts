import { axiosInstance } from '@/lib';
import { useAuthStore } from '@/store';
import { ApiResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

const useBooks = () => {
  const token = useAuthStore(state => state.accessToken);
  const [searchParams] = useSearchParams();

  return useQuery({
    queryKey: ['books', searchParams.toString()],
    queryFn: async () => {
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axiosInstance.get<ApiResponse>(
        '/api/books/filter',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: searchParams,
        }
      );
      console.log('response', response.data.data);
      return response.data as ApiResponse;
    },
  });
};

export default useBooks;
