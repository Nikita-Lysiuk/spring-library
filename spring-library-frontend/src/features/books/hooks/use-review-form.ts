import { useAuthStore } from '@/store';
import { z } from 'zod';
import { reviewSchema } from '@/features/books/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib';
import toast from 'react-hot-toast';

const useReviewForm = (bookId: string) => {
  const token = useAuthStore.getState().accessToken;

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async ({
      data,
      bookId,
    }: {
      data: z.infer<typeof reviewSchema>;
      bookId: string;
    }) => {
      return await axiosInstance.post(
        '/api/reviews',
        {
          bookId,
          rating: data.rating,
          comment: data.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onMutate: () => {
      toast.loading('Submitting review...');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const onSubmit = async (data: z.infer<typeof reviewSchema>) => {
    if (!token) {
      throw new Error('You are not logged in!');
    }

    try {
      const response = await mutation.mutateAsync({ data, bookId });
      if (response.status === 200) {
        toast.success('Review submitted successfully!');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    }

    form.reset();
  };

  return { form, onSubmit };
};

export default useReviewForm;
