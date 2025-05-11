export type FetchCategoryRequest = {
  page?: number;
  size?: number;
  query?: string;
  token: string;
};

export type CreateCategoryRequest = {
  name: string;
  token: string;
};

export type FetchAuthorRequest = {
  page?: number;
  size?: number;
  query?: string;
  token: string;
};

export type CreateAuthorRequest = {
  name: string;
  token: string;
};

export type FetchBookSearchRequest = {
  query: string;
  token: string;
};

export type CreateBookType = {
  title: string;
  description: string | null;
  publishedDate: string;
  publisher: string;
  language: string;
  price: string;
  categoryIds: string[];
  authorIds: string[];
  token: string;
  pdf: File;
};
