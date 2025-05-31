import { axiosInstance } from '@/lib';
import { useAuthStore } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteCartItem = () => {
  const accessToken = useAuthStore(state => state.accessToken);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (bookId: string) => {
      console.log('Deleting book with ID:', bookId);

      await axiosInstance.delete(`/api/cart/items/${bookId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    onError: (error: any) => {
      throw new Error(
        error?.response?.data?.message || 'Failed to delete cart item'
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const deleteCartItem = (bookId: string): void => {
    mutation.mutate(bookId);
  };

  return { deleteCartItem };
};

export default useDeleteCartItem;
