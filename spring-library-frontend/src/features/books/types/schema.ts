import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z
    .string()
    .and(
      z
        .string()
        .max(3000, { message: 'Description must be less than 3000 characters' })
    ),
  publishedDate: z.date({ message: 'Published date is required' }),
  publisher: z.string({ message: 'Publisher is required' }),
  pdf: z
    .instanceof(File, { message: 'File is required' })
    .refine(file => file.type === 'application/pdf', {
      message: 'File must be a PDF',
    })
    .refine(file => file.size <= 50 * 1024 * 1024, {
      message: 'File size must be less than 50MB',
    }),
  language: z.string({
    required_error: 'Please select a language.',
  }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  categories: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
  authors: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5, {
    message: 'Rating must be between 1 and 5',
  }),
  comment: z.string().optional(),
});
