import { z } from 'zod';
import { bookSchema } from './schema';

export const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Polish', value: 'pl' },
  { label: 'Ukrainian', value: 'uk' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const;

export type BookFormValues = z.infer<typeof bookSchema>;

export type Tag = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Author = {
  id: string;
  name: string;
};

export type Review = {
  id: string;
  rating: number;
  content: string;
  createdAt: string;
};

export type SearchBook = {
  id: string;
  title: string;
  coverUrl: string;
};
