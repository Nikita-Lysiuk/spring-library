import { useForm } from 'react-hook-form';
import { bookSchema } from '@/features/books/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CreateBookType } from '@/features/books/types/api-types';
import { uploadBook } from '@/features/books/api/book-api';
import { useAuthStore } from '@/store';
import toast from 'react-hot-toast';
import { z } from 'zod';

const useBookForm = () => {
  const token = useAuthStore.getState().accessToken;

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      description: '',
      publishedDate: undefined,
      publisher: '',
      pdf: undefined,
      language: 'en',
      price: 0,
      categories: [],
      authors: [],
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CreateBookType) => uploadBook(data),
    onMutate: () => {
      toast.loading('Adding book...');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const onSubmit = async (data: z.infer<typeof bookSchema>) => {
    if (!token) {
      toast.error('You are not logged in!');
      return;
    }

    const { categories, authors, ...rest } = data;

    const requestData: CreateBookType = {
      ...rest,
      publishedDate: rest.publishedDate?.toISOString().split('T')[0],
      token: token,
      price: rest.price.toString(),
      categoryIds: categories.map(category => category.id),
      authorIds: authors.map(author => author.id),
    };

    try {
      const response = await mutation.mutateAsync(requestData);
      if (response.success) {
        toast.success('Book added successfully!');
      } else {
        toast.error(response.message || 'Failed to add book!');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error('Failed to add book!');
    }

    form.reset({
      title: '',
      description: '',
      publishedDate: undefined,
      publisher: '',
      pdf: undefined,
      language: 'en',
      price: 0,
      categories: [],
      authors: [],
    });
  };

  return { form, onSubmit };
};

export default useBookForm;
