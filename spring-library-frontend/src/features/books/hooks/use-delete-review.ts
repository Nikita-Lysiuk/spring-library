import { axiosInstance } from '@/lib';
import { useAuthStore } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useDeleteReview = (bookId: string) => {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore(state => state.accessToken);

  const mutation = useMutation({
    mutationFn: async (reviewId: string) => {
      if (!accessToken) {
        throw new Error('Access token is required to delete a review.');
      }

      const response = await axiosInstance.delete(`/api/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.data.success) {
        throw new Error(`Failed to delete review: ${response.data.message}`);
      }
    },
    onError: (error: Error) => {
      console.error('Error deleting review:', error);
    },
    onMutate: () => {
      toast.loading('Deleting review...');
    },
    onSettled: () => {
      toast.dismiss();
    },
    onSuccess: () => {
      toast.success('Review deleted successfully');

      queryClient.invalidateQueries({
        queryKey: ['reviews', bookId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ['book', bookId],
        exact: true,
      });
    },
  });

  const onDelete = (reviewId: string) => {
    mutation.mutate(reviewId);
  };

  return {
    onDelete,
  };
};

export default useDeleteReview;
