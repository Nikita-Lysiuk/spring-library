import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store';
import { SearchBook } from '@/features/books/types';
import { searchBooks } from '@/features/books/api/book-api';

const useSearchBook = (searchQuery: string) => {
  const token = useAuthStore(state => state.accessToken);

  return useQuery({
    queryKey: ['searchBooks', searchQuery],
    queryFn: async () => {
      if (!token) return;
      const response = await searchBooks({
        token,
        query: searchQuery,
      });

      if (response.success && response.data) {
        return response.data as SearchBook[];
      } else {
        throw new Error(response.message);
      }
    },
  });
};

export default useSearchBook;
