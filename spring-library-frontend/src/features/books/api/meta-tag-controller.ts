import {
  fetchCategories,
  createCategory,
  fetchAuthors,
  createAuthor,
} from '@/features/books/api/meta-api';
import { useAuthStore } from '@/store';

const withAuth = <T extends (args: any) => any>(fn: T) => {
  return (args: Omit<Parameters<T>[0], 'token'>) => {
    const token = useAuthStore.getState().accessToken;
    const page = 0;
    const size = 5;

    if (!token) {
      throw new Error('No access token found');
    }

    return fn({ ...args, token, page, size });
  };
};

export const metaTagController = {
  categories: {
    fetch: withAuth(fetchCategories),
    create: withAuth(createCategory),
  },
  authors: {
    fetch: withAuth(fetchAuthors),
    create: withAuth(createAuthor),
  },
};
